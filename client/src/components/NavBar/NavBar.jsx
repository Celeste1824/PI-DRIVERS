import { Link } from 'react-router-dom';
import './NavBar.css'


const NavBar = () =>{
    return (
        <nav className='container-navbar'>
            <h2> PI_DRIVERS</h2>
            <Link to='/home' key='home-button'><button>HOME</button></Link>
            <Link className='opt' to= '/options' key='contact-button'><button>OPCIONES</button></Link>
            <Link to='/createdriver' key='create-button'><button>CREAR DRIVER</button></Link>
            
        </nav>
    )
}

export default NavBar;
