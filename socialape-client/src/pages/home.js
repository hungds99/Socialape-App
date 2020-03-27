import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";

import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";

export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    let { screams, loading } = this.props.data;

    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <div>
        <p>loading..</p>
        <LinearProgress></LinearProgress>
      </div>
    );

    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getScreams })(home);
