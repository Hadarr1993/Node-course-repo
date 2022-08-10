const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const generateMessage = require('./utils/messages')
const generateLocation = require('./utils/generateLocationMessage')
const { addUser, getUser, removeUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))


io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('join', (options, callback) => {
        const { error , user } = addUser({id: socket.id, ...options })
        const { username, room} = user
        if (error) {
           return callback(error) 
        }

        socket.join(room)

        socket.emit('message', generateMessage('Admin','Welcome'))
        socket.broadcast.to(room).emit('message', generateMessage('Admin' ,`${username} has joined!`))

        io.to(room).emit('roomData',{
            room,
            users: getUsersInRoom(room)
        })
        callback()
    })

    socket.on('sendMessage', (message , callback) => {
        const filter = new Filter()
        const user = getUser(socket.id)
        const { username, room} = user

        if (filter.isProfane(message)) {
            return callback('bad language is not allowed')
        }

        io.to(room).emit('message',generateMessage(username ,message))
        callback('Delivered')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            const { username, room} = user
            io.to(room).emit('message', generateMessage( 'Admin',`${username} has left!`))
            io.to(room).emit('roomData', {
                room,
                users: getUsersInRoom(username)
            })
        }
    })
    socket.on('sendLocation', ({longtitude, latitude} , callback) => {
        const user = getUser(socket.id)
        const { username, room} = user

        io.to(room).emit('locationMessage', generateLocation(username,`https://google.com/maps?q=${latitude},${longtitude}`))
        callback()
    })
})
 
server.listen(port, () => {
    console.log('Server is up on port ' + port)
})