import { LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import StaticProfile from "../components/profile/StaticProfile";
import Scream from "../components/scream/Scream";
import Localization from "../localization";
import { getUserData } from "../redux/actions/dataAction";
export class user extends Component {
    state = {
        profile: null,
        screamIdParam: null,
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;
        console.log("Component Did Mount !");

        if (screamId) {
            this.setState({
                screamIdParam: screamId,
            });
        }
        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user,
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { screams, loading } = this.props.data;
        const { profile, screamIdParam } = this.state;

        let screamsMarkup = loading ? (
            <>
                <p>{Localization.common.loading}</p>
                <LinearProgress />
            </>
        ) : screams === null ? (
            <p>{Localization.common.noPost}</p>
        ) : !screamIdParam ? (
            screams.map((scream) => (
                <Scream key={scream.screamId} scream={scream} />
            ))
        ) : (
            screams.map((scream) => {
                if (scream.screamId !== screamIdParam)
                    return <Scream key={scream.screamId} scream={scream} />;
                else
                    return (
                        <Scream
                            key={scream.screamId}
                            scream={scream}
                            openDialog
                        />
                    );
            })
        );

        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <>
                            <p>{Localization.common.loading}</p>
                            <LinearProgress />
                        </>
                    ) : (
                        <StaticProfile profile={profile} />
                    )}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
