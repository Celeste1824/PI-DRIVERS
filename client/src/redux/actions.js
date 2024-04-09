export const SEARCHBYNAME = 'SEARCHBYNAME'
export const GETDRIVERS= 'GETDRIVERS'
export const GETTEAM = 'GETTEAM'
export const FILTER = 'FILTER'
export const ORDER= 'ORDER'
export const POSTDRIVER= 'POSTDRIVER'
export const SEARCHBYID = 'SEARCHBYID'

import axios from 'axios'



export const searchByName= (inputName, from)=>{
    return async (dispatch)=>{
        try {
            if(from === 'cards'){
                return dispatch({
                    type: SEARCHBYNAME,
                    payload: {from, inputName}
                })
            }
            if(inputName ==='deleted'){
                return dispatch({
                    type: SEARCHBYNAME,
                    payload: 'deleted'
                })
            }
            if(!inputName) throw Error('Ingrese un nombre porfavor');
            const { data } = await axios.get(`${'http://localhost:3001/driver'}/name?name=${inputName}`)

            if(!data) throw Error('Algo salio mal')
            return dispatch({
                type: SEARCHBYNAME,
                payload: {
                    data,
                    name: inputName
                }
            })
        }
        catch (error) {
            return error.message
        }
    }
}

export const getDrivers=()=>{
    return async (dispatch)=>{
        try {
            const { data }= await axios.get('http://localhost:3001/driver');
            if(!data) throw Error('Algo salio mal')

            return dispatch({
                type: GETDRIVERS,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const getTeams=()=>{
    const endpoint='http://localhost:3001/team'
    return async (dispatch)=>{
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GETTEAM,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const filter=(value, filterActives)=>{
    return async (dispatch)=>{
        try {
            return dispatch({
                type: FILTER,
                payload: {
                    value,
                    filterActives
                }
            })
        } catch (error) {
            return error.message
        }
    }
}

export const orderBy=(instructions)=>{
    return async (dispatch)=>{
        try {
            return dispatch({
                type: ORDER,
                payload: instructions
            })
        } catch (error) {
            return error.message
        }
    }
}

export const postDriver= (driver)=>{
    return  async(dispatch)=>{
        try {
            const { data }= await axios.post('http://localhost:3001/driver', driver);
            if(!data) throw Error('algo paso')

            return dispatch({
                type: POSTDRIVER,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const searchById = (id)=>{
    return async(dispatch)=>{
        try {
            const { data } = await axios.get('http://localhost:3001/driver'+"/"+id);

            return dispatch({
                type: SEARCHBYID,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}