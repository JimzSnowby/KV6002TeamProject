import { Link } from 'react-router-dom'

/**
 * The menu component for the application.
 * 
 * @author James Sowerby w21023500
 */
function Menu() {
    return (
        <ul className='container'>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/volunteer">Volunteer</Link>
            </li>
        </ul>
    )
}

export default Menu