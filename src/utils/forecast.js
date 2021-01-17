const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=ca00670ecc9ff890c1decc7e269ec6ed&query=" + latitude + "," + longitude + '&units=f';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect due to some unforeseen reason', undefined);
        } else if (body.error) {
            callback('Wrong location value is given', undefined);
        } else {
            const ctemp = body.current.temperature;
            const ftemp = body.current.feelslike;
            callback(undefined, 'It is ' + ctemp + 'degrees. But it feels like ' + ftemp + 'degrees fahreneit');
        }
    });
}
module.exports = forecast;