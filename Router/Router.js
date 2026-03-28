let express = require('express')
const { getData, getDataById, insertData, insertManyData, updateById, updateByUserName } = require('../Controller/AutoGetTest')
let TestRouter = express.Router()


TestRouter.get('/fetch',getData)
TestRouter.get('/fetch/:id',getDataById)
TestRouter.post('/insert',insertData)
TestRouter.post('/insertMany',insertManyData)
TestRouter.put('/updateById/:id',updateById)
TestRouter.put('/updateByUserName/:userName',updateByUserName)

module.exports = TestRouter