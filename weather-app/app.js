const request = require('request');
const mapBoxUrl =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Chennai.json?access_token=pk.eyJ1IjoidmxzdWJyYW1hbmlhbSIsImEiOiJjazRyMmc2YmYwOGd2M2RsaXlzeGVqbno1In0.9CiLfNBYZ4BCzbde5cfsOQ';

request({ url: mapBoxUrl, json: true }, (error, response) => {
  if (error) {
    console.error('Unable to connect to DarkSky(Weather) Service');
  } else if (response.body.features.length === 0) {
    console.error('Unable to find city');
  } else {
    const [lat, long] = response.body.features[0].center;
    const city = response.body.features[0].place_name;
    const darSkyUrl = `https://api.darksky.net/forecast/2d5c8d64cf99fdf331b0b97dcedc0963/${long},${lat}`;
    request({ url: darSkyUrl, json: true }, (error, response) => {
      if (error) {
        console.error('Unable to connect to Map-Box (Geolocation) Service');
      } else if (response.body.error) {
        console.error('Unable to find location');
      } else {
        console.log(
          `${city}
        ${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability} % chance of rain`
        );
      }
    });
  }
});
