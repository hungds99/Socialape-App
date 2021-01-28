import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Localization from "../../localization";
import LikeButton from "../common/LikeButton";
import MyButton from "../common/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

const styles = {
    card: {
        marginBottom: 20,
        position: "relative",
    },
    content: {
        padding: "0 50px 0 70px",
    },
    image: {
        width: "100%",
        height: "100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
};

export class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream,
            user: {
                authenticated,
                credentials: { handle },
            },
        } = this.props;

        const deleteButton =
            authenticated && scream.userHandle === handle ? (
                <DeleteScream screamId={scream.screamId} />
            ) : null;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            <img
                                src={scream.userImage}
                                alt=""
                                className={classes.image}
                            />
                        </Avatar>
                    }
                    action={deleteButton}
                    title={
                        <Typography
                            variant="h5"
                            component={Link}
                            to={`/user/${scream.userHandle}`}
                            color="primary"
                        >
                            {scream.userHandle}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(scream.createdAt).fromNow()}
                        </Typography>
                    }
                />
                <CardContent className={classes.content}>
                    <Typography variant="subtitle1">{scream.body}</Typography>
                    <LikeButton screamId={scream.screamId} />
                    <Typography variant="body1" component="span">
                        {scream.likeCount} {Localization.common.like}
                    </Typography>
                    <MyButton tip={Localization.common.comment}>
                        <ChatIcon color="primary" />
                    </MyButton>
                    <Typography variant="body1" component="span">
                        {scream.commentCount} {Localization.common.comment}
                    </Typography>
                    <ScreamDialog
                        screamId={scream.screamId}
                        userHandle={scream.userHandle}
                        openDialog={this.props.openDialog}
                    />
                </CardContent>
            </Card>
        );
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Scream));
