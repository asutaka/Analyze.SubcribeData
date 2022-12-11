import time from './lib/services/getServerTime.mjs';
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

// await db.conn();

// app.get('/:name', function(req, res) {
//     let name = req.params.name;
//     const collection  = connection.db.collection(name);
//     collection.count({}, function( err, count){
//         var skip = 0;
//         if(count > LIMIT){
//             skip = count - LIMIT;
//         }
//         var promise = collection.find({}).skip(skip).limit(LIMIT).toArray();
//         promise.then(function(result){
//             res.status(200).json({data: result }); 
//         })
//     });
// });

// app.get('/:name/:from', function(req, res) {
//     let name = req.params.name;
//     let from = req.params.from;

//     const collection  = connection.db.collection(name);
//     collection.find({ T: { $gte: parseFloat(from) } }).count({}, function( err, count){
//         var skip = 0;
//         if(count > LIMIT){
//             skip = count - LIMIT;
//         }
//         collection.find({ T: { $gte: parseFloat(from) } }).skip(skip).limit(LIMIT).toArray().then(function(result){
//             res.status(200).json({data: result }); 
//         })
//     });
// });

// app.get('/:name/:from/:to', function(req, res) {
//     let name = req.params.name;
//     let from = req.params.from;
//     let to = req.params.to;
    
//     const collection  = connection.db.collection(name);
//     collection.find({ T: { $gte: parseFloat(from), $lt: parseFloat(to) } }).count({}, function( err, count){
//         var skip = 0;
//         if(count > LIMIT){
//             skip = count - LIMIT;
//         }
//         collection.find({ T: { $gte: parseFloat(from), $lt: parseFloat(to) } }).skip(skip).limit(LIMIT).toArray().then(function(result){
//             res.status(200).json({data: result }); 
//         })
//     });
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const socketClient = new SocketClient('ws/!miniTicker@arr');



// db.createCollection("C98USDT");
time.getNextTime15M(function(res){
    console.log(res);
});

// const socketClient = new SocketClient('ws/!miniTicker@arr');
// socketClient.setHandler('depthUpdate', (params) => console.log(JSON.stringify(params)));
