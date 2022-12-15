import mongoose from 'mongoose'

const URL = 'mongodb+srv://asutaka:ZLlbiAccbRTwGXpr@datadb0.svcfiir.mongodb.net/?retryWrites=true&w=majority'
const conn = async () => {
    try {
        //0: disconnected
        //1: connected
        //2: connecting
        //3: disconnecting
        if(mongoose.connection.readyState == 1)
            return;

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
    conn();
    mongoose.connection.createCollection(name, function (err, res) {
        if (err) throw err;
        console.log("collection " + name + " created!");
    });
};

const findOne = (table) =>{
    conn();
    mongoose.connection.collection(table).findOne({}, { sort: { _id: -1 } }, function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    });
};

const addRecord = (table, e, c, o, h, l, v, q) => {
    conn();
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
};

const addMultiRecord = (table, data) => {
    conn();
    console.log('dat',data);
    mongoose.connection.collection(table).insertMany(data);
};

const updateRecord = (table, id, e, c, o, h, l, v, q) =>{
    conn();
    mongoose.connection.collection(table).findOneAndUpdate({ _id: -1 }, { T : e, C : c, O : o, H : h, L : l, V : v, Q : q }, {new: true}, function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    });
};

const deleteRecord = (table, id) =>{
    if(id == null)
    {
        console.log("id is null");
        return;
    }
    conn();
    mongoose.connection.collection(table).findOneAndDelete({_id: id}, function(err, res){
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted Record:", id);
            console.log(res);
        }
    });
};

export default {conn, create, findOne, addRecord, addMultiRecord, updateRecord, deleteRecord};
