import { Link, useLocation } from 'react-router-dom';

//pics for navigation
import menuicon from '../assets/menuicon.png'
import aboutbutton from '../assets/aboutbutton.png'
import contacticon from '../assets/contacticon.png'

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
            <div className="nav-item">
                <Link
                    to="/Menu"
                    className={currentPage === '/Menu' ? 'nav-link active' : 'nav-link'}
                >
                    <img src={menuicon} />
                </Link>
            </div>
            <div className="nav-item">
                <Link
                    to="/Mission"
                    className={currentPage === '/Mission' ? 'nav-link active' : 'nav-link'}
                >
                    <img src={aboutbutton} />
                </Link>
            </div>
            <div className="nav-item">
                <Link
                    to="/Contact"
                    className={currentPage === '/Contact' ? 'nav-link active' : 'nav-link'}
                >
                    <img src={contacticon} />
                </Link>
            </div>
            <div className="nav-item">
                <Link
                    to="/Discount"
                    className={currentPage === '/Discount' ? 'nav-link active' : 'nav-link'}
                >
                    {/* Discount page is not clickable */}
                </Link>
            </div>
            <div className="nav-item">
                <Link
                    to="/Request"
                    className={currentPage === '/Request' ? 'nav-link active' : 'nav-link'}
                >
                    {/* Request page is not clickable */}
                </Link>
            </div>


        </div>
    );
}

export default NavTabs;
