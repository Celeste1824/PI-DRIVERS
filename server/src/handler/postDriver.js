const postDriver = require("../controller/postDriver");


const postDriverHandler = async (req, res) => {
    try {
        const { name, surname, description, image, nationality, birthdate, teams } = req.body;
        const driver = await postDriver({ name, surname, description, image, nationality, birthdate, teams });
        return res.status(200).json(driver);
    } catch (error) {
        console.error("Error in postDriverHandler:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = postDriverHandler;

