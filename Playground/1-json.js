const fs = require('fs')

const parsData = fs.readFileSync('1-json.json')
const dataJSON = parsData.toString()
const data = JSON.parse(dataJSON);
 data.name = 'david'
 data.age = 23

const newDataJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', newDataJSON)