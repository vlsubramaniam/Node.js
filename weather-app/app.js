const geoCode = require('./Utils/geocode.js');
const forecast = require('./Utils/forecast');

const address = process.argv[2];
if (!address) {
  console.log('Please provide an address!');
} else {
  geoCode('Chennai', (error, { longitude, latitude, location }) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
}
