import { LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditButton from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import LinkIcon from "@material-ui/icons/Link";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RouteConfig } from "../../configs/routeConfig";
import Localization from "../../localization";
import { logoutUser, uploadImage } from "../../redux/actions/userAction";
import MyButton from "../common/MyButton";
import EditDetails from "./EditDetails";

const styles = (theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& .button": {
                position: "absolute",
                top: "80%",
                left: "70%",
            },
        },
        "& .profile-image": {
            width: 180,
            height: 180,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
        },
        "& .profile-details": {
            textAlign: "center",
            "& .span, svg": {
                verticalAlign: "middle",
            },
            "& a": {
                color: theme.palette.primary.main,
            },
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0",
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    buttons: {
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        marginTop: "10px",
        textAlign: "center",
        "$ a": {
            margin: "20px 10px",
        },
    },
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        let formDataImage = new FormData();
        formDataImage.append("image", image, image.name);
        this.props.uploadImage(formDataImage);
    };

    handleEditPicture = () => {
        const imageInput = document.getElementById("imageInput");
        imageInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes,
            user: {
                credentials: {
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location,
                },
                authenticated,
                loading,
            },
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img
                                className="profile-image"
                                src={imageUrl}
                                alt=""
                            />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip={Localization.common.editImage}
                                onClick={this.handleEditPicture}
                                btnClassName="button"
                            >
                                <EditButton color="primary" />
                            </MyButton>
                        </div>
                        <div className="profile-details">
                            <MuiLink
                                component={Link}
                                to={RouteConfig.user.getHandle.replace(
                                    "{handle}",
                                    handle
                                )}
                                color="primary"
                                variant="h5"
                            >
                                @{handle}
                            </MuiLink>
                            <hr />
                            {bio && (
                                <Typography variant="body2">{bio}</Typography>
                            )}
                            <hr />
                            {location && (
                                <Fragment>
                                    <LocationOnIcon color="primary" />{" "}
                                    <Typography
                                        variant="body1"
                                        component="span"
                                    >
                                        {location}
                                    </Typography>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <LinkIcon color="primary" />
                                    <Typography
                                        variant="body1"
                                        component="span"
                                    >
                                        <a
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {" "}
                                            {website}
                                        </a>
                                    </Typography>
                                    <hr />
                                </Fragment>
                            )}
                            <CalendarToday color="primary" />{" "}
                            <Typography variant="body1" component="span">
                                {Localization.common.joined} :{" "}
                                {dayjs(createdAt).format("MMM YYYY")}
                            </Typography>
                        </div>
                        <MyButton
                            tip={Localization.common.logout}
                            onClick={this.handleLogout}
                        >
                            <KeyboardReturn color="primary"></KeyboardReturn>
                        </MyButton>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="subtitle2" align="center">
                        {Localization.valid.noProfile}
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={RouteConfig.login}
                            size="small"
                            disableElevation
                        >
                            {Localization.common.login}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to={RouteConfig.signup}
                            size="small"
                            disableElevation
                        >
                            {Localization.common.register}
                        </Button>
                    </div>
                </Paper>
            )
        ) : (
            <>
                <p>{Localization.common.loading}</p>
                <LinearProgress />
            </>
        );

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));
