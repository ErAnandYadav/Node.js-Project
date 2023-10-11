const mongoose = require('mongoose')
const mongoURI = 'mongodb://0.0.0.0:27017/MyDatabase';
console.log(mongoURI)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

