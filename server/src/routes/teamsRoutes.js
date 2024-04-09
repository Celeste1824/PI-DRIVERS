const {Router} = require ('express');
const getTeamsHandler = require('../handler/getTeamsHandler');
//const getTeams = require('../controller/getTeams')

const teamsRoutes = Router();

teamsRoutes.get('/', getTeamsHandler)

module.exports = teamsRoutes
