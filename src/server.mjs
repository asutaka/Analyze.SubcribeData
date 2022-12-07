import getServerTime from './lib/services/getServerTime.mjs';
import SocketClient from './lib/socketClient.mjs';
import db from './lib/helpers/database.mjs';
import express from "express";
const app = express();

app.get('/', async (req, res)  => {
    res.status(200).json({msg: "hello world" });
})

app.listen(3000, () => console.log('server running!'));

// db.findOne("C98USDT");
// db.find("C98USDT", 1,11, callback);



// db.createCollection("C98USDT");
// getServerTime().then(data => console.log(data));

// const socketClient = new SocketClient('ws/!miniTicker@arr');
// socketClient.setHandler('depthUpdate', (params) => console.log(JSON.stringify(params)));