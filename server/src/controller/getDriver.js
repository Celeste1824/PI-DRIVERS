const { Driver, Team } = require('../db');
const axios = require('axios');

const getDrivers = async ()=>{
    
        const defaultImage = 'https://st.depositphotos.com/1003711/1972/i/950/depositphotos_19720535-stock-photo-no-face-man.jpg'
        
        let driversFromDb = await Driver.findAll({
            include: Team,
        })

        driversFromDb = driversFromDb.map(({id, name, surname, image,birthdate, Teams})=>{
            return {
                id,
                name: `${name} ${surname}`,
                image: image || defaultImage,
                teams: Teams.map(team=> team.name).join(', '),
                birthdate
            }
        })
        
        const driversFromApi = (await axios.get("http://localhost:5000/drivers")).data
            
        const allDriversInfo = driversFromApi.map(({id, name, image, teams, dob,})=>{
            return {
                id,
                name: `${name.forename} ${name.surname}`,
                image: image.url || defaultImage,
                teams,
                birthdate: dob
            }
        })
        
        return driversFromDb.concat(allDriversInfo);
}

module.exports = getDrivers;