import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../../utils/MyButton";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { connect } from "react-redux";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const styles = {
  card: {
    // display: "flex",
    marginBottom: 20,
    position: "relative"
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25
  }
};

export class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream,
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && scream.userHandle === handle ? (
        <DeleteScream screamId={scream.screamId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={scream.userImage} alt="" />
            </Avatar>
          }
          action={<IconButton aria-label="settings">{deleteButton}</IconButton>}
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
        {/* <CardMedia
          image={scream.userImage}
          title="Contemplative Reptile"
          className={classes.image}
        /> */}
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/user/${scream.userHandle}`}
            color="primary"
          >
            {scream.userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(scream.createdAt).fromNow()}
          </Typography>
          <Typography variant="subtitle1">{scream.body}</Typography>
          <LikeButton screamId={scream.screamId} />
          <Typography variant="body1" component="span">
            {scream.likeCount} Likes
          </Typography>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <Typography variant="body1" component="span">
            {scream.commentCount} Comments
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
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(withStyles(styles)(Scream));
