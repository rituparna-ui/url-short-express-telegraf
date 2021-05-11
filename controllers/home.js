const urlSchema = require('./../model');
const random = require('randomstring');

const redirectFromHome = (req, res) => {
  res.redirect('/shortenit');
};

const shortParamControl = async (req, res) => {
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
    res.send('<h1>Error 404</h1>');
  }
};

module.exports = {
  redirectFromHome,
  shortParamControl,
};
