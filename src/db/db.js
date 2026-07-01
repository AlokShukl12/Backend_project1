const mongoose = require('mongoose');

async function mongoDB() {
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("DataBase is connected")
    }catch(e){
        console.log(e)
    }
}

module.exports = mongoDB;