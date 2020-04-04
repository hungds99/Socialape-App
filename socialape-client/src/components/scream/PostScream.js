import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { connect } from "react-redux";
import { postScream } from "../../redux/actions/dataAction";

const styles = theme => ({
  ...theme.spreadThis,
  submitButton: {
    position: "relative"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "5%"
  }
});

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, body: "", errors: {} });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.body.trim() === "") {
      this.setState({
        errors: {
          body: "Must not be empty !"
        }
      });
    } else {
      this.props.postScream({ body: this.state.body });
      this.handleClose();
      this.setState({
        body: "",
        errors: {}
      });
    }
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post a scream">
          <AddIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Scream"
                multiline
                rows="3"
                placeholder="Scream at your apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(null, { postScream })(withStyles(styles)(PostScream));
