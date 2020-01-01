const request = require('request');

const foreCast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/2d5c8d64cf99fdf331b0b97dcedc0963/${long},${lat}`;
  request({ url: url, json: true }, (errror, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(
        undefined,
        `It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability} % chance of rain`
      );
    }
  });
};

module.exports = foreCast;
