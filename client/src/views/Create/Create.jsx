import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams,postDriver } from "../../redux/actions";
import './Create.css'
import validation from './validation'


const Create =()=>{
    const [errors , setErrors]= useState({})
    const dispatch= useDispatch()
    const teams = useSelector(state=>state.teams);
    const [ submit , setSubmit ] = useState(false)
    const [driverData , setdriverData]= useState({
        name: "",
        surname: '',
        image: "",
        nationality: "",
        birthdate: "",
        description: "",
        teams: [],
    });
    const [touched , setTouched]= useState({
        name: false,
        surname: false,
        image: false,
        nationality: false,
        birthdate: false,
        description: false,
        teams: false,
    })
    
    const handleChange=(event)=>{
        setdriverData({...driverData,
            [event.target.name]: event.target.value
        })
        setErrors(
            validation({    
                ...driverData,
                [event.target.name]: event.target.value
            })
            )
        setTouched({
            ...touched,
            [event.target.name]: true
        })
        }
        
    const handleSelect=(event)=>{
        setdriverData(prevData=>{
            if(prevData.teams.some(team=> team === event.target.value)){
                return {...driverData}
            }

            return {...driverData, teams:[...driverData.teams,event.target.value]}
        })
        setErrors(validation({
            ...driverData,
            teams: [...driverData.teams,event.target.value]
        }))
        setTouched({
            ...touched,
            teams: true
        })
    }

    useEffect(()=>{
        !teams.length && dispatch(getTeams())
    }, [])

    const handleSubmit=(event)=>{
        event.preventDefault()
        const {name, surname, image, nationality, birthdate, description, teams} = driverData

        const ultValidation = validation(driverData)
        if(Object.keys(ultValidation).length===0){
            dispatch(postDriver({
                name,
                surname, 
                image, 
                nationality, 
                birthdate, 
                description, 
                teams
            }))
            setSubmit(true)
        } else{
            setErrors({...errors, submit: 'No pueden estar todos los campos vacíos.'})
        }
    }
    
    const onClose=(nameCLose)=>{
        const newteams= driverData.teams.filter(teams=>teams!==nameCLose)
        setdriverData({...driverData , teams:newteams})
    }

    return (
        <>
            {
                submit
                ? <img src="https://c1.klipartz.com/pngpicture/372/913/sticker-png-check-mark-logo-checkbox-drawing-line-blackandwhite-symbol-line-art-circle.png" className="correct-image" />
                :(
                    <div className="content-page-form">
                    <form onSubmit={handleSubmit} className="form">
                        <h4>DRIVER FORM</h4>
            
                        <div>
                        <label htmlFor="name">NAME:</label>
                        <input onChange={handleChange} value={driverData.name} type="text" name="name"/>
                        {touched.name &&  errors.name ? <p>{errors.name}</p> : null}
                        </div>
                        
                        <div>
                        <label htmlFor="surname">SURNAME:</label>
                        <input onChange={handleChange} value={driverData.surname} type="text" name="surname"/>
                        {touched.surname &&  errors.surname ? <p>{errors.surname}</p> : null}
                        </div>
                          
                        <div>
                        <label htmlFor="nationality">NATIONALITY:</label>
                        <input onChange={handleChange} name="nationality" value={driverData.nationality}/>
                        {touched.nationality && errors.nationality ? <p>{errors.nationality}</p> : null}
                        </div>
            
                        <div>
                        <label htmlFor="image">IMAGE:</label>
                        <div id="button-wrapper">
                            {driverData.image ? 'Uploaded' : 'Upload link Image...'}
                        </div>
                        <input onChange={handleChange} name="image" value={driverData.image} type="file" className="upload-box" placeholder="Upload File" id="upload"/>
                        {touched.image && errors.image ? <p>{errors.image}</p> : null}
                        </div>
                        
                        <div>
                        <label htmlFor="birthdate">birthdate:</label>
                        <input onChange={handleChange}  name="birthdate" value={driverData.birthdate} type="date"/>
                        {touched.birthdate && errors.birthdate ? <p>{errors.birthdate}</p> : null}
                        </div>
                          
                        <div>
                            <label htmlFor="teams">TEAMS:</label>
                            <select onChange={handleSelect} id="teams">
                                <option className="select" value="">Select a team</option>
                                {teams?.map(elm=>{
                                    return <option value={elm.name} key={elm.name}>{elm.name}</option>
                                })}
                            </select>
                            <ul>
                                {driverData.teams.map(teams=>{
                                    return <li key={teams}>
                                        <button onClick={()=>onClose(teams)} id="button-ul">x</button>
                                        {teams}
                                    </li>
                                })}
                            </ul>
                        {touched.teams && errors.teams ? <p>{errors.teams}</p> : null}
                        </div>
                        
                        <div>
                        <label htmlFor="description">DESCRIPTION:</label>
                        <textarea onChange={handleChange}  name="description" value={driverData.description}/>
                        {touched.description && errors.description ? <p>{errors.description}</p> : null}
                        </div>
                        {errors.submit && <p className="submit-error">{errors.submit}</p>}
                        <button type="submit" >CREATE DRIVER</button>
                    </form>
            
                    </div>
                )
            }
        </>

    )
}

export default Create