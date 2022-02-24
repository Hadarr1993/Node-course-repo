const http = require('http')
const url =  `http://api.weatherstack.com/current?access_key=7aa119c000c6da79b2d9487fdb8ec15a&query=34,32`

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })
    response.on('end' , () => {
        const body = JSON.parse(data)
        console.log(body.current);
    })
})
request.on('error', (error) => {
    console.log('Something went wrong' , error);
})
request.end()