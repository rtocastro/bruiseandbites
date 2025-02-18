import { Link, useLocation } from 'react-router-dom';

//pics for navigation
import menuicon from '../assets/menuicon.png'

function NavTabs() {
    const currentPage = useLocation().pathname;

    return (
        <div className="nav nav-tabs ">
            <div className="nav-item">
                <Link
                    to="/"
                    className={currentPage === '/Entry' ? 'nav-link active' : 'nav-link'}
                >
                    {/* no clickable link  */}
                </Link>
            </div>
            <div className="nav-item">
                <Link
                    to="/Home"
                    className={currentPage === '/Home' ? 'nav-link active' : 'nav-link'}
                >
                   {/* no clickable link */}
                </Link>
            </div>


        </div>
    );
}

export default NavTabs;
