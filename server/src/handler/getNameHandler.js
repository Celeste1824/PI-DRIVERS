const getDriverByName = require("../controller/getDriverByName");


const getDriverByNameHandler = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Please enter a Name' });
        }
        if (!isNaN(name)) {
            return res.status(400).json({ message: 'Please enter a String' });
        }

        const allDrivers = await getDriverByName(name);

        if (allDrivers.length === 0) {
            return res.status(404).json({ message: 'Driver Not Found' });
        }

        return res.status(200).json(allDrivers);
    } catch (error) {
        console.error("Error in getDriverByNameHandler:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getDriverByNameHandler;