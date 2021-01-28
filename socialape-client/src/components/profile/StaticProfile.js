import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React from "react";
import Localization from "../../localization";

const styles = (theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
        },
        "& .profile-image": {
            width: 200,
            height: 200,
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
    },
});

function StaticProfile(props) {
    const {
        classes,
        profile: { handle, createdAt, imageUrl, bio, website, location },
    } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img className="profile-image" src={imageUrl} alt="" />
                </div>
                <div className="profile-details">
                    <Typography color="primary" variant="h5">
                        @{handle}
                    </Typography>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <>
                            <LocationOnIcon color="primary" />{" "}
                            <span>{location}</span>
                            <hr />
                        </>
                    )}
                    {website && (
                        <>
                            <LinkIcon color="primary" />
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {" "}
                                {website}
                            </a>
                            <hr />
                        </>
                    )}
                    <CalendarToday color="primary" />{" "}
                    <span>{Localization.common.join}: {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
            </div>
        </Paper>
    );
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
