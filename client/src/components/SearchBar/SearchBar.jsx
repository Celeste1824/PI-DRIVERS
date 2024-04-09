import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";
import './SearchBar.css'


const SearchBar = ({from}) =>{
    const [ name , setName ] = useState('')
    const dispatch= useDispatch();

    const handleClick=()=>{
        from 
        ? dispatch(searchByName(name.toLocaleLowerCase(), from))
        : dispatch(searchByName(name.toLocaleLowerCase()))
    }

    const handleChange=(event)=>{
        setName(event.target.value);
        event.target.value==='' && dispatch(searchByName('deleted'))
    }

    return(
        <nav className="search-bar-container">
            <input className="input-searchBar" type="search" onChange={handleChange} value={name} placeholder="Buscar piloto" />
            <button className="search-button" onClick={handleClick}>Buscar</button>
        </nav>
    )
}

export default SearchBar;