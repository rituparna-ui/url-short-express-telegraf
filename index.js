const express = require('express');
const mongoose = require('mongoose');
const random = require('randomstring');
const { Telegraf } = require('telegraf');

const urlSchema = require('./model');

const TOKEN = '1747699706:AAHwvrWDMt3PQEYwmh4LQUw-D4m2yweLyXo';
const PORT = process.env.PORT;

const app = express();
const bot = new Telegraf(TOKEN);
app.use(express.urlencoded({ extended: false }));
const secert = '/' + TOKEN;
app.use(bot.webhookCallback(`${secret}`));

app.get('/', (req, res) => {
  res.redirect('/shortenit');
});

app.get('/shortenit', (req, res) => {
  res.send(
    '<form action="/shortenit" method="post"><input type="text" name="url" id="url" /><br /><button type="submit">Generate</button></form>'
  );
});

app.post('/shortenit', async (req, res) => {
  const short = random.generate(6);
  const toSave = new urlSchema({
    original: req.body.url,
    short: short,
  });
  const saved = await toSave.save();
  res.json({
    shorted: saved.short,
  });
});

app.get('/:short', async (req, res) => {
  const toFind = req.params.short;
  try {
    const fromDB = await urlSchema.find({ short: toFind });
    const originalUri = fromDB[0].original;
    const temp =
      originalUri.startsWith('http://') || originalUri.startsWith('https://');
    if (temp) {
      res.redirect(originalUri);
    } else {
      const realUrl = 'http://' + originalUri;
      res.redirect(realUrl);
    }
  } catch (error) {
    res.redirect('/error');
  }
});

bot.start((ctx) => {
  ctx.reply('Shorten URLs by sending\n/short <url>');
});

bot.command('short', async (ctx) => {
  const income = ctx.message.text;
  const url = income.split(' ')[1];
  if (url) {
    const short = random.generate(6);
    const toSave = new urlSchema({
      original: url,
      short: short,
    });
    const saved = await toSave.save();
    ctx.reply(saved.short);
  } else {
    ctx.reply(
      'Please use the command properly\nShorten URLs by sending\n/short <url>'
    );
  }
});

bot.telegram.setWebhook('https://webhooktestte.herokuapp.com/');

mongoose.connect(
  'mongodb://localhost:27017/shortenit',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(PORT);
  }
);
