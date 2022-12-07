import mongoose, { isObjectIdOrHexString } from 'mongoose'

const URL = 'mongodb+srv://asutaka:ZLlbiAccbRTwGXpr@datadb0.svcfiir.mongodb.net/?retryWrites=true&w=majority'
const conn = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(
        URL,
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log('Connected to mongoDB');
        // mongoose.getCollection('hello').exists()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
};

const create = (name) => {
    checkConnection((callback) => {
        if(!callback){
            conn();
        }

        mongoose.connection.createCollection(name, function (err, res) {
            if (err) throw err;
            console.log("collection " + name + " created!");
        });
    });
};

const findOne = (table) =>{
    checkConnection((callback) => {
        if(!callback){
            conn();
        }
        
        mongoose.connection.collection(table).findOne({}, { sort: { _id: -1 } }, function(err, res){
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }
        });
    });
};

const find = (table, from, to, callback) =>{
    checkConnection((callback) => {
        if(!callback){
            conn();
        }
        
        mongoose.connection.collection(table).find({}, function(err, res){
            if(err){
                console.log(err);
            }
            else{
                return callback(res);
            }
        });

        // mongoose.connection.collection(table).find({$and: [{ T: { $gt: from } }, { T: { $lt: to } }] }, function(err, res){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         res.foreach(function(tmp){
        //             console.log(tmp);
        //         })
        //     }
        // });
    });
};

const addRecord = (table, e, c, o, h, l, v, q) => {
    checkConnection((callback) => {
        if(!callback){
            conn();
        }
        
        var dat = {
            T : e,
            C : c,
            O : o,
            H : h,
            L : l,
            V : v,
            Q : q
        };

        mongoose.connection.collection(table).insertOne(dat);
    });
};

const updateRecord = (table, id, e, c, o, h, l, v, q) =>{
    checkConnection((callback) => {
        if(!callback){
            conn();
        }
        
        mongoose.connection.collection(table).findOneAndUpdate({ _id: -1 }, { T : e, C : c, O : o, H : h, L : l, V : v, Q : q }, {new: true}, function(err, res){
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }
        });
    });
};

const deleteRecord = (table, id) =>{
    checkConnection((callback) => {
        if(!callback){
            conn();
        }

        if(id == null)
        {
            console.log("id is null");
            return;
        }
        
        mongoose.connection.collection(table).findOneAndDelete({_id: id}, function(err, res){
            if(err){
                console.log(err);
            }
            else{
                console.log("Deleted Record:", id);
                console.log(res);
            }
        });
    });
};



function checkConnection(callback) {
    //0: disconnected
    //1: connected
    //2: connecting
    //3: disconnecting
    return callback(mongoose.connection.readyState == 1);
}

export default {conn, create, findOne, find, addRecord, updateRecord, deleteRecord};
