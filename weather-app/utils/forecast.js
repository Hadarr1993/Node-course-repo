const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longtitude, callback ) => {
    const url = `http://api.weatherstack.com/current?access_key=7aa119c000c6da79b2d9487fdb8ec15a&query=${longtitude},${latitude}`
    request({url, json: true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to weather service',undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,`
                the weather today is ${chalk.green(body.current.weather_descriptions[0])}
                with tempature of ${chalk.green(body.current.temperature)}
                and feels like ${chalk.green(body.current.feelslike)}
                with ${chalk.green(body.current.precip*100)}% chance of raining`
            )
        }
    })
}
module.exports = forecast
// tempature: response.body.current.temperature,
// feels_tempature: response.body.current.feelslike,
// description: response.body.current.weather_descriptions[0],
// raining_chance: response.body.current.precip