const getTeams = require("../controller/getTeams");

const getTeamsHandler = async (req, res) => {
    try {
        const teams = await getTeams();
        return res.status(200).json(teams);
    } catch (error) {
        console.error("Error in getTeamsHandler:", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getTeamsHandler;
