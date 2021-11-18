
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

const publicDirPath = path.join(__dirname,  '../public');
const viewsPath = path.join(__dirname,  '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res)=>{
    res.render('index', {title: 'Weather', author: 'Nadavarasu'});
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About Me', author: 'Nadavarasu'});
});

app.get('/help', (req, res)=>{
    res.render('help', {title: 'Help', author: 'Nadavarasu', mesg: 'this page use weather stack api to provide weather'});
});

app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({error: 'Must provide address'});
    }
    console.log(req.query.address);
    geocode(req.query.address,(error, {latitude, longitude} = {})=>{
        if (error) {
            return res.send(error);
        }
        forecast(latitude, longitude, (err, data)=> {
            if (err) {
                return res.send(err);
            }
            res.send({
                region: data.region,
                forecast: data.forecast,
                address: req.query.address});
        });
    });         
});

app.get('/help/*', (req, res)=>{
    res.render('pageNotFound', {title: 'Error', author: 'Nadavarasu', errorMesg: 'Help articke not found!'});
});

app.get('*', (req, res)=>{
    res.render('pageNotFound', {title: 'Error', author: 'Nadavarasu', errorMesg: '404 Page not found!'});
});

app.listen(3000, ()=> {
    console.log('Webserver started at port 3000');

});