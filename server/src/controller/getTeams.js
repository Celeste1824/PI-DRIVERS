const axios = require('axios')
const { Team, conn } = require('../db');

const getTeams = async () => {
    let transaction;
    try {
        transaction = await conn.transaction();
        const allTeams = await Team.findAll();

        if (!allTeams.length) {
            const teams = {};
            const driversFromApi = (await axios.get("http://localhost:5000/drivers")).data;

            for (const driver of driversFromApi) {
                if (driver.teams) {
                    const teamNames = driver.teams.split(',');
                    for (const teamName of teamNames) {
                        const name = teamName.trim();
                        if (!teams[name]) {
                            teams[name] = name;
                            const newTeam = await Team.create({ name: name }, { transaction });
                            allTeams.push(newTeam.toJSON());
                        }
                    }
                }
            }
        }
        
        await transaction.commit();
        return allTeams;
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
} 

module.exports = getTeams;
