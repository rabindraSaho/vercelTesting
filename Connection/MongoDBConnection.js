const mongoose = require('mongoose')

const ConnectDB = async ()=>{
    try {
        let MONGO_URI = process.env.MONGO_URI
        if(!MONGO_URI){
            console.error('Hi, MONGO_URI variable is not defined in environment file ')
            process.exit(1)
            return ''
        }
        let conn = await mongoose.connect(MONGO_URI)
        console.log('Server Connected to Database : '+conn.connection.host)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = ConnectDB