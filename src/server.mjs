import getServerTime from './lib/services/getServerTime.mjs';
import SocketClient from './lib/socketClient.mjs';
import db from './lib/helpers/database.mjs';
import mongoose from 'mongoose'
import express from "express";
const app = express();
const connection = mongoose.connection;

app.get('/', async (req, res)  => {
    res.status(200).json({msg: "hello world" });
})

app.listen(3000, () => console.log('server running!'));

await db.conn();


app.get('/data', function(req, res) {
    const collection  = connection.db.collection("C98USDT");
    var promise = collection.find({}).toArray();
    promise.then(function(contacts){
        res.status(200).json({data: contacts }); 
        // console.log(contacts);
    })
});




// db.createCollection("C98USDT");
// getServerTime().then(data => console.log(data));

// const socketClient = new SocketClient('ws/!miniTicker@arr');
// socketClient.setHandler('depthUpdate', (params) => console.log(JSON.stringify(params)));

// app.get('/test', function(req, res) {
//     connection.collection("C98USDT").findOne({}, { sort: { _id: -1 } }, function(err, result){
//         if(err){
//             console.log(err);
//             res.status(200).json({data: null });  
//         }
//         res.status(200).json({data: result });  
//     });
// });