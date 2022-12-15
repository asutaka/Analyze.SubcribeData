import mongoose from 'mongoose'
let count = 0;
const handleData = async (data) => {
    if(data.length > 0)
    {
        count++;
        if(count == 1){
            mongoose.connection.collection("USDT1").insertMany(data);
        }
        else if(count == 2){
            mongoose.connection.collection("USDT2").insertMany(data);
        }
        else if(count == 3){
            mongoose.connection.collection("USDT3").insertMany(data);
        }
        else if(count == 4){
            mongoose.connection.collection("USDT4").insertMany(data);
        }
        else if(count == 5){
            count = 0;
            mongoose.connection.collection("USDT5").insertMany(data);
        }
    }
}

export default { handleData };