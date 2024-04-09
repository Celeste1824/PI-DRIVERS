const getDriverByid = require("../controller/getDriverById");

const getDriverByidHandler = async (req,res) =>{
    try {
        const { id } = req.params;
        const driver = await getDriverByid(id);
        return res.status(200).json(driver);
    } catch (error) {
        console.error("Error in getDriverByIdHandler:", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getDriverByidHandler