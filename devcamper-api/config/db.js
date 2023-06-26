const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    `MongoDB connected: ${conn.connection.host}`.blue.bgWhite.underline.bold
  ); // ac-5pk8b1l-shard-00-00.a7kwrtj.mongodb.net
};

module.exports = connectDB;
