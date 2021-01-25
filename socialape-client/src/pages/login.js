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
import { loginUser } from "../redux/actions/userAction";
import Localization from '../localization';
import { RouteConfig } from "../configs";

const styles = (theme) => ({ ...theme.spreadThis });

export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const {
            classes,
            UI: { loading, errors },
        } = this.props;

        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
				<Typography component="p">{Localization.common.welcome}</Typography>
                    <Typography variant="h4">{Localization.common.login}</Typography>
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
                        {errors.general && (
                            <Typography
                                variant="body2"
                                className={classes.textError}
                            >
                                {errors.general && Localization.valid.infor}
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
                            {loading ? (
                                <CircularProgress size="1.5rem" />
                            ) : (
                                Localization.common.login
                            )}
                        </Button>
                        <br />
						<br />
                        <small>
                            {Localization.message.havenotAccount}{" "}
                            <Link to={RouteConfig.signup}>{Localization.common.register}</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProps = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(login));
