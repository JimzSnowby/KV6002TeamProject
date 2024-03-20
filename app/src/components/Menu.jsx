import { Link } from 'react-router-dom';

function Menu(props) {
    return (
        <ul className="flex flex-col md:flex-row justify-evenly text-lg font-semibold bg-blue-200">
            <li>
                <Link to="/" className="px-8 hover:text-blue-500 transition duration-300">Home</Link>
            </li>
            <li>
                <Link to="/about" className="px-8 hover:text-blue-500 transition duration-300">About Us</Link>
            </li>
            <li>
                <Link to="/profile" className="px-8 hover:text-blue-500 transition duration-300">Profile</Link>
            </li>
            <li>
                {!props.signedIn && <Link to="/volunteer-sign-up" className="px-8 hover:text-blue-500 transition duration-300">Become a Volunteer</Link>}
            </li>
            <li>
                <Link to="/register" className="px-8 hover:text-blue-500 transition duration-300">Become a Participant</Link>
                {props.signedIn && props.roletype === 'participant' && <Link to="/participant" className="px-8 hover:text-blue-500 transition duration-300">My Profile</Link>}
            </li>
            <li>
                {props.signedIn && props.roletype === 'volunteer' && <Link to="/volunteer" className="px-8 hover:text-blue-500 transition duration-300">Volunteer</Link>}
            </li>
        
            <li>
            {props.signedIn && props.roletype === 'admin' && props.position ==="head" && <Link to="/admin-sign-up" className="px-8 hover:text-blue-500 transition duration-300">Add New Admin</Link>}
            </li>
            <li>
            {props.signedIn && props.roletype === 'admin'  && <Link to="/new-event" className="px-8 hover:text-blue-500 transition duration-300">Post Event</Link>}
            </li>

        </ul>
    );
}

export default Menu;
