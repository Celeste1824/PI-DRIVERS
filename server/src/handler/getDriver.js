const getDrivers = require("../controller/getDriver");
 
const getDriversHandler = async (req,res) => {
try{
    const drivers = await getDrivers();
    return res.status(200).json(drivers)
} catch(error){
    console.error("Error in getDriversHandler:", error);
    return res.status(500).json({ error: "Internal server error" });

}
}

module.exports = getDriversHandler