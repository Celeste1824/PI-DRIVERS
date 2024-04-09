const {Router}= require ('express');
//const postDriver = require('../controller/postDriver');
//const getDrivers = require('../controller/getDriver');
//const getDriverByName = require('../controller/getDriverByName');
//const getDriverByid = require('../controller/getDriverById');
const getDriversHandler = require('../handler/getDriver');
const postDriverHandler = require('../handler/postDriver');
const getDriverByNameHandler = require('../handler/getNameHandler');
const getDriverByidHandler = require('../handler/getDriverByIdHandler');


const driverRoutes = Router();

driverRoutes.get('/',getDriversHandler)
driverRoutes.get('/name',getDriverByNameHandler)
driverRoutes.get('/:id',getDriverByidHandler)
driverRoutes.post('/',postDriverHandler)

module.exports = driverRoutes;