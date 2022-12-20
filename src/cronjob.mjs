import getServerTime from "./lib/services/getServerTime.mjs";
import cron from "cron";
import mongoose from 'mongoose'
import database from "./lib/helpers/database.mjs";

const LIMIT = 40;
const connection = mongoose.connection;
let time = 0;
new cron.CronJob('* * * * * *', function(){
    getServerTime.getCurTime15M( (callback) => {
        time = callback;
    })
    // console.log("time", time);
}).start();

let arrTable = [];
const InitTable = async() => {
    const collection  = connection.db.collection("TABLE");
    collection.find({}).skip(0).limit(LIMIT).toArray()
        .then(function(result){
            result.forEach( (item) => {
                arrTable.push({ "name": item.name });
            });
        });
}

const Job1 = async () => {
    let MainName = "USDT1";

    const collection  = connection.db.collection(MainName);
    new cron.CronJob('1/5 * * * * *', function(){
        // var currTime = new Date();
        // console.log("time1", currTime);
        collection.find({}).skip(0).limit(LIMIT).toArray()
        .then(function(result){
            // console.log("result",result.length);
            result.forEach( async (item) => {
                // database.deleteRecord(MainName, item._id);
                let check_ = arrTable.some(v => v.name == item.s) 
                if(check_)
                {
                    // database.deleteRecord(MainName, item._id);



                    // let tableName = item.s + "_15M";
                    // let collectDetail  = connection.db.collection(tableName);
                    // collectDetail.findOne({E: time }, {}, function(err, res){
                    //     if(err){
                    //         console.log(err);
                    //     }
                    //     else{
                    //         if(res == null){
                    //             //insert
                    //             database.addRecord = (item.s, time, item.c, item.o, item.h, item.l, item.v, item.q, item.E)
                    //         }
                    //         else{
                    //             //update
                    //             let high = item.h;
                    //             if(res.h > item.h)
                    //                 high = res.h;
                    //             let low = item.l;
                    //             if(res.l < item.l)
                    //                 low = res.l;

                    //             database.updateRecord(item.s, res._id, time, res.c, high, low, item.v + res.v, item.q + res.q, res.E);
                    //         }

                    //         database.deleteRecord(MainName, item._id);
                    //     }
                    // });
                }
            });
        })
    }).start();
}

const Job2 = async () => {
    const collection  = connection.db.collection("USDT2");
    new cron.CronJob('2/5 * * * * *', function(){
        var currTime = new Date();
        console.log("time2", currTime);
        // collection.find({}).skip(0).limit(LIMIT).toArray()
        // .then(function(result){
        //     console.log("result",result.length);
        // })
    }).start();
}

const Job3 = async () => {
    const collection  = connection.db.collection("USDT3");
    new cron.CronJob('3/5 * * * * *', function(){
        var currTime = new Date();
        console.log("time3", currTime);
        // collection.find({}).skip(0).limit(LIMIT).toArray()
        // .then(function(result){
        //     console.log("result",result.length);
        // })
    }).start();
}

const Job4 = async () => {
    const collection  = connection.db.collection("USDT4");
    new cron.CronJob('4/5 * * * * *', function(){
        var currTime = new Date();
        console.log("time4", currTime);
        // collection.find({}).skip(0).limit(LIMIT).toArray()
        // .then(function(result){
        //     console.log("result",result.length);
        // })
    }).start();
}

const Job5 = async () => {
    const collection  = connection.db.collection("USDT5");
    new cron.CronJob('5/5 * * * * *', function(){
        var currTime = new Date();
        console.log("time5", currTime);
        // collection.find({}).skip(0).limit(LIMIT).toArray()
        // .then(function(result){
        //     console.log("result",result.length);
        // })
    }).start();
}

export default { InitTable, Job1, Job2, Job3, Job4, Job5 };
