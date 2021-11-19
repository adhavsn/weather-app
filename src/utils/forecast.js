const request = require('request');
const forecast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bce970577ddfcad3800f02f6b55dc06b&query=' + lat + ',' + long + '&limit=1';
    request({url, json:true},(error, {body})=> {
        if(error){
               callback('not able to reach weather service, try later', undefined);
           } else if (body.error){
              callback('Not known location', undefined);
           } else {
            //   callback(undefined, {temp: response.body.current.temperature, humidity:response.body.current.humidity});
            // callback(undefined, 'In ' + body.location.region + ' temperature is ' + body.current.temperature + ' and humidity is ' + body.current.humidity);
            callback(undefined, {
                region: body.location.region,
                forecast: 'In ' + body.location.region + ' temperature is ' + body.current.temperature + ' and humidity is : ' + body.current.humidity + ' and the local time is : ' + body.location.localtime
            });
        }
});
};
module.exports = forecast;