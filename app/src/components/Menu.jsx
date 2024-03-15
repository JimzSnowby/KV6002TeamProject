import { Link } from 'react-router-dom'

/**
 * The menu component for the application.
 * 
 * @author James Sowerby w21023500
 */
function Menu() {
    return (
        <ul className="flex flex-col md:flex-row justify-evenly text-lg font-semibold bg-blue-200">
            <li>
                <Link to="/" className="px-8 hover:text-blue-500 transition duration-300">Home</Link>
            </li>
            <li>
                <Link to="/about" className="px-8 hover:text-blue-500 transition duration-300">About</Link>
            </li>
            <li>
                <Link to="/profile" className="px-8 hover:text-blue-500 transition duration-300">Profile</Link>
            </li>
            <li>
                <Link to="/participant" className="px-8 hover:text-blue-500 transition duration-300">Profile</Link>
            </li>
            <li>
                <Link to="/volunteer" className="px-8 hover:text-blue-500 transition duration-300">Volunteer</Link>
            </li>
        </ul>
    )
}

export default Menu