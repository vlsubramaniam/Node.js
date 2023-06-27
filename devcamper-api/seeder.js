const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Bootcamp = require('./models/Bootcamp');

mongoose.connect(process.env.MONGO_URI);

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data imported...'.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('Data deleted...'.red.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  // node seeder -i
  importData();
} else if (process.argv[2] === '-d') {
  // node seeder -d
  deleteData();
}