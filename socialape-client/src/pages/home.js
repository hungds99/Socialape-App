import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";

import Scream from "../components/Scream";
import Profile from "../components/Profile";

export class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axios
      .get("/screams")
      .then(res => {
        this.setState({
          screams: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => (
        <Scream key={scream.screamId} scream={scream} />
      ))
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

export default home;
