const request = require('request')
const chalk = require('chalk')

const url = 'http://api.weatherstack.com/current?access_key=7aa119c000c6da79b2d9487fdb8ec15a&query=32.064202869401484,34.769095878774706'

// request({url: url, json: true}, (error,response) => {
//     if (error) {
//         console.log('Unable to connect to weather service');
        
//     } else if (response.body.error) {
//         console.log('Unable to find location');
        
//     }   else {
//         const temp = response.body.current.temperature
//         const feels_temp = response.body.current.feelslike
//         const desc = response.body.current.weather_descriptions[0]
//         msg = `Hello this is danit roop, the weather today is ${chalk.green(desc)} with tempature of ${chalk.green(temp)} and feels like ${chalk.green(feels_temp)}`
//         console.log(msg);
//     }
// })

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/tel-aviv.json?access_token=pk.eyJ1IjoiaGFkYXJyMTk5MyIsImEiOiJja3pvNnJmc3IzNWExMnVueXBjazl4emd1In0.wbeQzfDsMQTR7OOIGGCYNQ&limit=1'
request({url: geocodeURL, json: true}, (error,response) => {
    if (error) {
        console.log('Unable to connect to location service');
    } else if (response.body.message === 'Not Found') {
        console.log('Unable to find location');
    } else {
        const latitude = response.body.features[0].center
        console.log(latitude);
    }
})