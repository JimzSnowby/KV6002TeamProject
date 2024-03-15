import { Link } from 'react-router-dom';

function Menu(props) {
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
                    <Link to="/register" className="px-8 hover:text-blue-500 transition duration-300">Participant</Link>
                </li>
           
            <li>
                <Link to="/volunteer" className="px-8 hover:text-blue-500 transition duration-300">Volunteer</Link>
            </li>
        </ul>
    );
}

export default Menu;
