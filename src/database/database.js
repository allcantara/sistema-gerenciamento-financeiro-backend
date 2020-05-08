const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://allcantara:allcantara@sigef-w4pyr.gcp.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

module.exports = mongoose;
