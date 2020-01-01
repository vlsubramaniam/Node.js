const geoCode = require('./Utils/geocode.js');
const forecast = require('./Utils/forecast');

const address = process.argv[2];
if (!address) {
  console.log('Please provide an address!');
} else {
  geoCode('Chennai', (error, data) => {
    if (error) {
      return console.log(error);
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(data.location);
      console.log(forecastData);
    });
  });
}
