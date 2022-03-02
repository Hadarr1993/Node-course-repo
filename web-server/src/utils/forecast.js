const request = require('request')

const forecast = (latitude, longtitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=7aa119c000c6da79b2d9487fdb8ec15a&query=${longtitude},${latitude}`
    request({url, json: true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,`the weather today is ${body.current.weather_descriptions[0]} with tempature of ${body.current.temperature} and feels like ${body.current.feelslike} with ${body.current.precip*100}% chance of raining`
            )
        }
    })
}
module.exports = forecast