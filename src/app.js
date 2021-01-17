const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const staticPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
//Can do this even by adding 'templates'

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(staticPathDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anubhav',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Robot'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: "Sorry we don't address any problem here",
        title: 'help page',
        name: 'Anubhav'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide your address"
        });
    }
    var address = req.query.address;
    geocode(address, (error, { place, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location: place,
                forecast: forecastData,
                address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help Article Not Found',
        name: 'Anubhav'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Anubhav'
    });
})

app.listen(3000, () => {
    console.log('Server up and runnig on port 3000');
});