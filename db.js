const mongoose = require('mongoose');

const Connect = () => {
  return mongoose.connect(
    'mongodb+srv://elicon:Fp4KUihvP3yBNiws@cluster0ritu.adt1u.mongodb.net/shortenit?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};

module.exports = {
  Connect,
};
