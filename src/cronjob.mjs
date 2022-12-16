import getServerTime from "./lib/services/getServerTime.mjs";
import cron from "cron";
import mongoose from 'mongoose'

const LIMIT = 20;
const connection = mongoose.connection;
let time = 0;
new cron.CronJob('* * * * * *', function(){
    getServerTime.getCurTime15M( (callback) => {
        time = callback;
    })
    console.log("time", time);
}).start();

const Job1 = async () => {
    const collection  = connection.db.collection("USDT");
    new cron.CronJob('*/2 * * * * *', function(){
        console.log("time2", time);
        collection.find({}).skip(0).limit(LIMIT).toArray().then(function(result){
            console.log("result",result.length);
        })
    }).start();
}

export default { Job1 };
