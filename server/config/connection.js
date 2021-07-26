const mongoose = require("mongoose");

mongoose.connect(
  'mongodb+srv://joseph:DRUNJGW9BrfxgTA7@cluster0.bpxwl.mongodb.net/booksearchengine?retryWrites=true&w=majority'
  || process.env.MONGODB_URI
  || "mongodb://localhost/googlebooks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
