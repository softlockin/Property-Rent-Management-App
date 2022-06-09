import React from 'react'
import PropTypes from 'prop-types';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Link, Typography } from '@mui/material';

export const MuiLink = ({ to, variant, text, sx }) => {

    function Router(props) {
        const { children } = props;
        if (typeof window === 'undefined') {
            return <StaticRouter location="/">{children}</StaticRouter>;
        }
        
        return <MemoryRouter>{children}</MemoryRouter>;
        }
        
        Router.propTypes = {
        children: PropTypes.node,
        };



    return (
        
        <Link component={RouterLink} to={to} sx={{color:"#000"}} underline="always">
            {<Typography
                variant={variant}
                >
                {text}
            </Typography>}
        </Link>
    )
}
