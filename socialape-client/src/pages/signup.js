import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RouteConfig } from '../configs';
import Localization from '../localization';
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
          <Typography component="p">{Localization.common.welcome}</Typography>
          <Typography variant="h4">{Localization.common.register}</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              type="email"
              name="email"
              label={Localization.common.email}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email && Localization.valid.email}
              error={errors.email ? true : false}
            />
            <TextField
              type="password"
              name="password"
              label={Localization.common.password}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password && Localization.valid.password}
              error={errors.password ? true : false}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label={Localization.common.confirmPassword}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword && Localization.valid.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField
              type="handle"
              name="handle"
              label={Localization.common.userName}
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              helperText={errors.handle && Localization.valid.userName}
              error={errors.handle ? true : false}
            />

            {errors.general && (
              <Typography variant="body2" className={classes.textError}>
                {errors.general  && Localization.valid.infor}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
              disableElevation
            >
              {loading ? <CircularProgress size="1.5rem" /> : Localization.common.register}
            </Button>
            <br />
            <br />
            <small>
              {Localization.message.haveAccount} <Link to={RouteConfig.login}>{Localization.common.login}</Link>
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
