import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Localization from "../../localization";
import { postScream } from "../../redux/actions/dataAction";
import MyButton from "../common/MyButton";

const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: "relative",
    },
    progressSpinner: {
        position: "absolute",
    },
    closeButton: {
        position: "absolute",
        left: "90%",
        top: "5%",
    },
});

class PostScream extends Component {
    state = {
        open: false,
        body: "",
        errors: {},
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, body: "", errors: {} });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.body.trim() === "") {
            this.setState({
                errors: {
                    body: Localization.valid.noEmpty
                },
            });
        } else {
            this.props.postScream({ body: this.state.body });
            this.handleClose();
            this.setState({
                body: "",
                errors: {},
            });
        }
    };

    render() {
        const { errors } = this.state;
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip={Localization.common.createPost}>
                    <AddIcon color="primary" />
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
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>{Localization.common.postNew}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label={Localization.common.post}
                                multiline
                                rows="3"
                                placeholder={Localization.common.mindPost}
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
								disableElevation
                            >
                                {Localization.common.createPost}
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
    classes: PropTypes.object.isRequired,
};

export default connect(null, { postScream })(withStyles(styles)(PostScream));
