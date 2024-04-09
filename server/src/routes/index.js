const { Router } = require("express");
const driverRoutes = require("./driversRoutes");
const teamsRoutes = require("./teamsRoutes");


const router = Router();

router.use('/driver',driverRoutes)
router.use('/team', teamsRoutes)



module.exports = router;
