const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibmFyYXN1IiwiYSI6ImNrdmsya3B4YjVhc2oyb3FwZTBtNmcyajIifQ.NkX3YpUsO-8odWXnv_zstw&limit=1';
    console.log(url);
    request({url,json:true},(error, {body})=>{
        if(error){
            callback('not able to reach weather service, try later', undefined);
        } else if (body.message) {
            callback('not able to get longitude and latitude', undefined);
        } else {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            });
        }

    });
};

module.exports = geocode;

