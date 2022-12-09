import getServerTime from './lib/services/getServerTime.mjs';
import SocketClient from './lib/socketClient.mjs';
import db from './lib/helpers/database.mjs';
import mongoose from 'mongoose'
import express from "express";
const app = express();
const connection = mongoose.connection;
const LIMIT = 2;

app.get('/', async (req, res)  => {
    res.status(200).json({msg: "hello world" });
})

app.listen(3000, () => console.log('server running!'));

await db.conn();

app.get('/:name', function(req, res) {
    let name = req.params.name;
    const collection  = connection.db.collection(name);
    collection.count({}, function( err, count){
        var skip = 0;
        if(count > LIMIT){
            skip = count - LIMIT;
        }
        var promise = collection.find({}).skip(skip).limit(LIMIT).toArray();
        promise.then(function(result){
            res.status(200).json({data: result }); 
        })
    });
});

app.get('/:name/:from', function(req, res) {
    let name = req.params.name;
    let from = req.params.from;

    const collection  = connection.db.collection(name);
    collection.find({ T: { $gte: parseInt(from) } }).count({}, function( err, count){
        var skip = 0;
        if(count > LIMIT){
            skip = count - LIMIT;
        }
        collection.find({ T: { $gte: parseInt(from) } }).skip(skip).limit(LIMIT).toArray().then(function(result){
            res.status(200).json({data: result }); 
        })
    });
});

app.get('/:name/:from/:to', function(req, res) {
    let name = req.params.name;
    let from = req.params.from;
    let to = req.params.to;
    
    const collection  = connection.db.collection(name);
    collection.find({ T: { $gte: parseInt(from), $lt: parseInt(to) } }).count({}, function( err, count){
        var skip = 0;
        if(count > LIMIT){
            skip = count - LIMIT;
        }
        collection.find({ T: { $gte: parseInt(from), $lt: parseInt(to) } }).skip(skip).limit(LIMIT).toArray().then(function(result){
            res.status(200).json({data: result }); 
        })
    });
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