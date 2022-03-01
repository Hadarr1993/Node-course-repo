
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const input = process.argv[2]

if (input === undefined) {
    console.log('Provide a location');
} else {
    geocode(input, (error,{latitude,longtitude,location} = {}) => {
        if (error) {return console.log(error)}
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {return console.log(error)}
            console.log(`\n${location}\n ${forecastData}`);
          }) 
    })
}
