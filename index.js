const express = require('express');
const { Telegraf } = require('telegraf');

const db = require('./db');

// Routers
const homeRoute = require('./routes/home');
const shortRoute = require('./routes/shortenit');

// Bot Controller
const botControllers = require('./controllers/bot');

const TOKEN = '1747699706:AAHwvrWDMt3PQEYwmh4LQUw-D4m2yweLyXo';
const PORT = process.env.PORT;

const bot = new Telegraf(TOKEN);
const secret = '/' + TOKEN;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(bot.webhookCallback(`${secret}`));

app.use('/', homeRoute);
app.use('/', shortRoute);

bot.start(botControllers.start);

bot.command('short', botControllers.commandShort);

bot.telegram.setWebhook(`https://webhooktestte.herokuapp.com${secret}`);

db.Connect().then(() => {
  app.listen(PORT);
});
