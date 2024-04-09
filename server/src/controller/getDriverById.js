const { Driver, Team }  = require('../db');
const axios = require('axios')

const getDriverByid = async (id) => {
    const defaultImage = 'https://st.depositphotos.com/1003711/1972/i/950/depositphotos_19720535-stock-photo-no-face-man.jpg'

    if (!id) {
        throw new Error('Please put an id Driver to find');
    }
    
    if (typeof +id !== 'number' && typeof id !== 'string') {
        throw new Error('Invalid type of id');
    }

    if (!isNaN(id)) {
        const { name, number, image, dob, nationality, teams, description, driverRef } = (await axios.get("http://localhost:5000/drivers/" + id)).data;
        return {
            id: +id,
            name: `${name.forename} ${name.surname}`,
            number,
            image: image.url,
            birthdate: dob,
            nationality,
            teams,
            description,
            driverRef
        };
    } else if (isNaN(id)) {
        const soughDB = await Driver.findByPk(id, {
            include: Team
        });
        if (!soughDB) {
            throw new Error('Driver not found');
        }
        const { name, surname, number, image, birthdate, nationality, Teams, description } = soughDB;
        const responseName = `${name} ${surname}`;
        const teamsString = Teams.map(team => team.name);
        return {
            name: responseName,
            number,
            image: image || defaultImage,
            birthdate,
            nationality,
            teams: teamsString.join(', '),
            description
        };
    } else {
        throw new Error('Invalid id format');
    }
}

module.exports = getDriverByid;
