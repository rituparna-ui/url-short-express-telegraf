const urlSchema = require('./../model');
const random = require('randomstring');

const start = (ctx) => {
  ctx.reply('Shorten URLs by sending\n/short <url>');
};

const commandShort = async (ctx) => {
  const income = ctx.message.text;
  const url = income.split(' ')[1];
  if (url) {
    const short = random.generate(6);
    const toSave = new urlSchema({
      original: url,
      short: short,
    });
    const saved = await toSave.save();
    ctx.reply('https://webhooktestte.herokuapp.com/' + saved.short);
  } else {
    ctx.reply(
      'Please use the command properly\nShorten URLs by sending\n/short <url>'
    );
  }
};

module.exports = {
  start,
  commandShort,
};
