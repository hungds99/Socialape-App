import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: actions.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: actions.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === actions.payload.screamId
      );
      state.screams[index] = actions.payload;
      if (state.scream.screamId === actions.payload.screamId) {
        state.scream.likeCount = actions.payload.likeCount;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      let delIndex = state.screams.findIndex(
        scream => scream.screamId === actions.payload
      );
      state.screams.splice(delIndex, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [actions.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      let screamIndex = state.screams.findIndex(
        scream => scream.screamId === actions.payload.screamId
      );
      state.screams[screamIndex].commentCount++;
      if (state.scream.screamId === actions.payload.screamId) {
        state.scream.commentCount++;
      }
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [actions.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
