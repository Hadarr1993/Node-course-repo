
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Hadar'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        page: 'Help',
        name: 'Hadar',
        title: "Help"
    })
})

app.get('/about',(req , res) => {
    res.render('about', {
        name: 'Hadar',
        job: 'Head of Kings',
        title: "About"
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must search for an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longtitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        }) 
    })
})

app.get('/help/*', (req,res) => {
    res.send('Page not found')
})

app.get('*', (req,res) => {
    res.render('404', {
        name: "Hadar",
        title: "Page not Found",
        ErrorMessage: '404 - No page exist'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
})