const express = require('express');
const router = express.Router();

router.get('/shortenit', (req, res) => {
  res.send(
    '<form action="/shortenit" method="post"><input type="text" name="url" id="url" /><br /><button type="submit">Generate</button></form>'
  );
});

router.post('/shortenit', async (req, res) => {
  const short = random.generate(6);
  const toSave = new urlSchema({
    original: req.body.url,
    short: short,
  });
  const saved = await toSave.save();
  const url = `https://webhooktestte.herokuapp.com/${short}`;
  res.json({
    url: url,
  });
});

module.exports = router;
