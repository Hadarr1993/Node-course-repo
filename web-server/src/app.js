const path = require('path')
const express = require('express')
const app = express()
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

app.get('/weather', (req,res) => {
    res.send([{
        location: 'Tel-Aviv Yafo'
    }, {
        tempature: '17 degrees',
        feels_like: '15 degrees',
        chance_to_rain: '3% chance of raining'
    }])
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
})