const { default: mongoose } = require("mongoose")
const Test = require("../Models/Test")
const sendResponse = require("../Utils/SendResponse")


const getData = async (req, res) => {
    try {
        const data = await Test.find().sort({ createdAt: -1 })
        return sendResponse(res, 200, true, 'Data fetched', data, null)
    } catch (error) {
        return sendResponse(res, 500, false, 'Found Some Internal Error', null, error.message)
    }
}

const getDataById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return sendResponse(res, 400, false, 'Bad request : id not found', null, 'Kindly mention id in params')
        }
        const data = await Test.findById(id);
        if (!data) {
            return sendResponse(res, 404, false, 'provided id not avaialbel in Database', null, 'Check ID if Wrong')
        }
        return sendResponse(res, 200, true, 'Data fetched', data, null)
    } catch (error) {
        return sendResponse(res, 500, false, 'Found Some Internal Error', null, error.message)
    }
}

const insertData = async (req, res) => {
    try {
        let { userName, userRegisteredName, phoneNumber, emailID, projectList, description } = req.body
        if (!userName || !userRegisteredName || !phoneNumber) {
            return sendResponse(res, 404, false, 'userName , userRegisteredName and phoneNumber field are required', null, 'Some required Fields are Missing')
        }
        const obj = { userName, userRegisteredName, phoneNumber, emailID, projectList, description }
        const response = await Test.insertOne(obj);
        return sendResponse(res, 200, true, 'Inserted data', response, false)
    } catch (error) {
        return sendResponse(res, 500, false, 'Found Some internal Error', null, error.message)
    }
}


const insertManyData = async (req, res) => {
    try {
        let Data = req.body
        if (!Data || Data.lenght) {
            return sendResponse(res, 400, false, 'Insert Many Failed', false, 'Kindly send proper Data')
        }
        const response = await Test.insertMany(Data);
        return sendResponse(res, 200, true, 'Inserted Many Sucessfully', response, null)

    } catch (error) {
        return sendResponse(res, 500, false, 'Found Some Internal Error', null, error.message)
    }
}

const updateById = async (req, res) => {
    try {
        const { id } = req.params
        const { userRegisteredName, phoneNumber, emailID, projectList, description } = req.body;
        let updateObject = {}
        if (userRegisteredName) updateObject.userRegisteredName = userRegisteredName
        if (phoneNumber) updateObject.phoneNumber = phoneNumber
        if (emailID) updateObject.emailID = emailID
        if (projectList) updateObject.projectList = projectList
        if (description) updateObject.description = description

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return sendResponse(res, 404, false, 'Bad Request', null, 'Provided ID is not Correct')
        }

        const response = await Test.findByIdAndUpdate(id, updateObject, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return sendResponse(res, 400, false, 'Provided ID not Found in Database', null, null)
        }
        return sendResponse(res, 200, true, 'Data Updated', response, null)
    } catch (error) {
        return sendResponse(res, 500, false, 'Found Some Internal Error', null, error.message)
    }
}

const updateByUserName = async (req, res) => {
    try {
        const { userName } = req.params
        if (!userName) {
            return sendResponse(res, 404, false, 'Bad Request', null, 'userName not Found')
        }
        const { userRegisteredName, phoneNumber, emailID, projectList, description } = req.body
        let updateObject = {}
        if (userRegisteredName) updateObject.userRegisteredName = userRegisteredName
        if (phoneNumber) updateObject.phoneNumber = phoneNumber
        if (emailID) updateObject.emailID = emailID
        if (projectList) updateObject.projectList = projectList
        if (description) updateObject.description = description
        
        const response = await Test.findOneAndUpdate({userName},{$set : updateObject },{
            new : true,
            runValidators : true
        })

        if(!response){
            return sendResponse(res,400,false,'Provided User Name not Found',null,`User if Not found : ${userName} `)
        }

        return sendResponse(res,200,true,'Data Updated Sucessfully!',response,null)

    } catch (error) {
        return sendResponse(res, 500, false, 'Found Some Error', null, error.message)
    }
}



module.exports = { getData, getDataById, insertData, insertManyData, updateById,updateByUserName }



