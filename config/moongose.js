const mongoose = require("mongoose");
const uri = process.env.DATABASE_URI;

const connect = (uri) => {
  mongoose
    .connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

module.exports = { connect };
