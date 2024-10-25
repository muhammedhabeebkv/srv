const mongoose = require("mongoose");

const connect = (callback) => {
  const url = process.env.DB_URL;

  mongoose
    .connect(url)
    .then(() => callback("Database Connection Established!"))
    .catch((err) => callback("Database Connection Not Established! \n" + err.message));
};

module.exports = connect;
