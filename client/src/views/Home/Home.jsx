import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers,getTeams } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";
import Filter from "../../components/Filters/Filter";
import './Home.css'


const Home = () =>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDrivers());
        dispatch(getTeams());
    },[])


    return(
        <div className="container-home" >
            <Filter/>
            <Cards/>
        </div>
    )
}


export default Home;