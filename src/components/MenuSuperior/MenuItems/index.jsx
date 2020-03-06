import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import data from './data';

const MenuItems = () => {
    return (
        <>
            {data.map(x => (
                <Nav.Link
                    key={x.name}
                    name={x.name}
                    className="link"
                    to={x.to}
                    as={NavLink}
                    activeClassName="active"
                >
                    {x.titulo}
                </Nav.Link>
            ))}
        </>
    )
}

export default MenuItems;
