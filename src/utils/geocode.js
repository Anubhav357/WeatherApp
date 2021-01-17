const request = require('request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibG9yZC1hbnViaGF2IiwiYSI6ImNramdtdTk0NjByaHUycm83c2lkM3E3eG8ifQ.G5JiXxB3unbgrt8MGlmcWQ";
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Sorry for the inconvenience.Right Now we are unable to connect you to the internet');
        } else if (body.features.length === 0) {
            callback('The city with given name does not exist');
        } else {
            callback(undefined, {
                place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
}
module.exports = geocode;