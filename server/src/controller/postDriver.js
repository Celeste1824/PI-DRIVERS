const { Driver, Team } = require('../db');

const postDriver = async ({name, surname, description, image, nationality, birthdate, teams})=>{

        const driverCreated = await Driver.create({
            name,
            surname,
            description,
            image: image.url,
            nationality,
            birthdate
        })

        if (teams.length) {
            const setFromArray = new Set(teams);
            const unrepeatedTeams = [...setFromArray];
    
            await Promise.all(unrepeatedTeams.map(async team => {
                const selectedTeam = await Team.findOne({
                    where: { name: team }
                }); 
                if (selectedTeam) {
                    await driverCreated.addTeams(selectedTeam);
                }
            }));
        }
        
    return driverCreated;

}

module.exports = postDriver;