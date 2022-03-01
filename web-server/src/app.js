const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

app.set('view engine','hbs')
app.set('views', viewsPath)
app.use(express.static(publicPath))



app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Droka'
    })
})
app.get('/help',(req,res) => {
    res.render('help', {
        page: 'Help',
        name: 'Dorka'
    })
})
app.get('/about',(req , res) => {
    res.render('about', {
        name: 'Dorka',
        job: 'Head of Proffesional Minds Confusers'
    })
})
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