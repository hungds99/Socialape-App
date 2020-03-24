import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { signupUser } from "../redux/actions/userAction";

const styles = theme => ({ ...theme.spreadThis });

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading, errors }
    } = this.props;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <p>Yooo !</p>
          <Typography variant="h4">Signup</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              type="email"
              id="email"
              name="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email ? true : false}
            />
            <TextField
              type="password"
              id="password"
              name="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password ? true : false}
            />
            <TextField
              type="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              label="ConfirmPassword"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              type="handle"
              id="handle"
              name="handle"
              label="Handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              helperText={errors.handle}
              error={errors.handle ? true : false}
            />

            {errors.general && (
              <Typography variant="body2" className={classes.textError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {loading ? <CircularProgress size="1.5rem" /> : "Signup"}
            </Button>
            <br />
            <small>
              do have an account login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

const mapActionsToProps = {
  signupUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
