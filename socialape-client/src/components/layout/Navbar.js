import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RouteConfig } from "../../configs";
import Localization from "../../localization";
import MyButton from "../common/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

const styles = (theme) => ({
    ...theme.spreadThis,
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
});
class Navbar extends Component {
    render() {
        const { authenticated, classes } = this.props;
        return (
            <div className={classes.grow}>
                <AppBar>
                    <Toolbar className="nav-container">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            {Localization.common.title}
                        </Typography>
                        <div className={classes.grow} />
                        {authenticated ? (
                            <div className={classes.sectionDesktop}>
                                <PostScream />
                                <Link to={RouteConfig.home}>
                                    <MyButton tip="Home">
                                        <HomeIcon color="primary" />
                                    </MyButton>
                                </Link>
                                <Notifications />
                            </div>
                        ) : (
                            <Fragment>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={RouteConfig.home}
                                >
                                    {Localization.common.home}
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={RouteConfig.login}
                                >
                                    {Localization.common.login}
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={RouteConfig.signup}
                                >
                                    {Localization.common.register}
                                </Button>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
