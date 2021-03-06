import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Localization from "../../localization";
import { getScream } from "../../redux/actions/dataAction";
import Comment from "../comment/Comment";
import CommentForm from "../comment/CommentForm";
import LikeButton from "../common/LikeButton";
import MyButton from "../common/MyButton";

const styles = (theme) => ({
    ...theme.spreadThis,
    profileImage: {
        display: "block",
        margin: "auto",
        width: 150,
        height: 150,
        borderRadius: "50%",
        objectFit: "cover",
    },
    dialogContent: {
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        left: "90%",
    },
    expandButton: {
        position: "absolute",
        left: "90%",
    },
    spinnerDiv: {
        textAlign: "center",
        marignTop: 50,
        marginBotton: 50,
    },
});

export class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: "",
        newPath: "",
    };

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;
        const newPath = `/user/${userHandle}/scream/${screamId}`;
        window.history.pushState(null, null, newPath);
        this.setState({ open: true, oldPath: oldPath });
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
    };

    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments,
            },
            UI: { loading },
        } = this.props;

        const screamDialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={1}>
                <Grid item sm={5}>
                    <img
                        src={userImage}
                        alt=""
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/user/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <Typography variant="body1" component="span">
                        {likeCount} {Localization.common.like}
                    </Typography>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <Typography variant="body1" component="span">
                        {commentCount} {Localization.common.comment}
                    </Typography>
                </Grid>
                {/* <hr className={classes.visibleSeparator} /> */}
                <CommentForm screamId={screamId} />
                <Comment comments={comments} />
            </Grid>
        );
        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip={Localization.common.expandPost}
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip={Localization.common.close}
                        onClick={this.handleClose}
                        btnClassName={classes.closeButton}
                    >
                        <CloseIcon color="secondary" />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {screamDialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI,
});

const mapActionsToProps = {
    getScream,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(ScreamDialog));
