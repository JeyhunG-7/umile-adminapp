import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Drawer,
    ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import MapIcon from '@material-ui/icons/Map';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { makeStyles } from '@material-ui/core/styles';

import { logoutAsync } from './Helpers/Authenticator';


const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        display: "flex"
    }
    ,
    docked: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        borderColor: 'rgb(235, 238, 240)'
    },
    mainDrawerItems: {
        flexGrow: 1
    }
}));

export const PAGES = Object.freeze({
    newCustomer: {
        id: 0,
        route: '/newcustomer'
    },
    activeOrders: {
        id: 1,
        route: '/activeorders'
    },
    routes: {
        id: 2,
        route: '/routes'
    }
});


function SidebarComponent(props) {
    const [selectedPage, setSelectedPage] = useState(-1);

    const classes = useStyles();

    useEffect(function () {
        let pathname = window.location.pathname;
        if (pathname === PAGES.newCustomer.route) {
            setSelectedPage(PAGES.newCustomer.id); 
        } else if (pathname === PAGES.activeOrders.route) {
            setSelectedPage(PAGES.activeOrders.id);
        } else if (pathname === PAGES.routes.route) {
            setSelectedPage(PAGES.routes.id)
        }
    }, []);

    function navigateTo(page) {
        setSelectedPage(page.id)
        props.history.push(page.route);
    }

    async function logout() {
        await logoutAsync();
        console.log(props.history);
        window.location.reload();
    }

    return (
        <>
            <Drawer
                variant="permanent"
                anchor="left"
                className={`${classes.drawer} sidebar`}
                classes={{ paper: classes.drawerPaper, docked: classes.docked }}
            >
                <div className="sb-header">
                    <ListItem button selected={selectedPage === PAGES.newCustomer.id} onClick={e => navigateTo(PAGES.newCustomer)}>
                        <ListItemIcon>
                            <PersonAddIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add Customer" style={{ letterSpacing: '0.025em' }} />
                    </ListItem>
                </div>
                <div className={`sb-body ${classes.mainDrawerItems}`}>
                    <ListItem button selected={selectedPage === PAGES.activeOrders.id} onClick={e => navigateTo(PAGES.activeOrders)}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Active Orders" />
                    </ListItem>
                    <ListItem button selected={selectedPage === PAGES.routes.id} onClick={e => navigateTo(PAGES.routes)}>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Routes" />
                    </ListItem>
                </div>
                <div className="sb-footer">
                    <ListItem button onClick={e => logout()}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItem>
                </div>
            </Drawer>
        </>
    );
}

export const Sidebar = withRouter(SidebarComponent);