const axios = require('axios');
const { Driver } = require('../db');
const { Op } = require("sequelize");

const getDriverByName = async (name) => {
    const allDrivers = [];

    const driversFromDb = await Driver.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
        limit: 15
    });

    const driverFromApi = (await axios.get(`http://localhost:5000/drivers?name.forename=${name}`)).data;

    allDrivers.push(...driverFromApi, ...driversFromDb);

    if (allDrivers.length < 15) {
        const allDriversFromApi = (await axios.get('http://localhost:5000/drivers')).data;
        const regex = new RegExp(name, 'i');
        for (const driver of allDriversFromApi) {
            let nameComplete = `${driver.name.forename} ${driver.name.surname}`;
            if (regex.test(nameComplete)) {
                const { id, image, nationality, teams, description, dob } = driver;
                allDrivers.push({
                    id,
                    name: nameComplete,
                    image: image.url,
                    nationality,
                    teams,
                    description,
                    birthday: dob
                });
                if (allDrivers.length >= 15) break;
            }
        }
    }

    return allDrivers;
}

module.exports = getDriverByName;
