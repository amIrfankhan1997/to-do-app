import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Login</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/register" style={styles.navLink}>Register</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#333',
        padding: '10px 0',
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
    },
    navItem: {
        margin: '0 15px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '18px',
    },
};

export default Navigation;
