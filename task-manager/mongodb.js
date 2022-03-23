
const { MongoClient , ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error,client) => {
    if (error) {
        return console.log('Unable to connect to Database');
    }
    
    const db = client.db(databaseName)
    
    // db.collection('tasks').updateMany({
    //    completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })
    db.collection('tasks').deleteOne({
        description: "Finish tasks"
    }).then((result) => {
        console.log('Success!' , result);
    }).catch((error) => {
        console.log('Something went wrong' , error);
    })
})