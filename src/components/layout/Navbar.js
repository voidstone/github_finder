import React from 'react';
import PropTypes from 'prop-types';

const  Navbar = ({icon, title}) =>  {
    return (
            <div className="navbar bg-primary" style={{backgroundColor:"#F99E4C"}} >
                <h1>
                    <i className={icon} style={{ paddingRight: "10px" }}></i>{title}
                </h1>
            </div>
        )
   
}


Navbar.defaultProps = {
    title :'Github Finder',
    icon : 'fab fa-github'
};
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar


