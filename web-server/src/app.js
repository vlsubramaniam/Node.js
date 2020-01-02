const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Subramaniam'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Subramaniam'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Subramaniam'
  });
});

app.get('/help/*', (req, res) => {
  res.render('pagenotfound', {
    title: 'Error 404',
    errorMessage: 'Cannot find the help article',
    name: 'Subramaniam'
  });
});

app.get('*', (req, res) => {
  res.render('pagenotfound', {
    title: 'Error 404',
    errorMessage: 'Page not found',
    name: 'Subramaniam'
  });
});

app.listen('3000', () => {
  console.log('Server started at port 3000!');
});
