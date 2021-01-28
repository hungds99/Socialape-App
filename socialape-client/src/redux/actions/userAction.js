import axios from "axios";
import {
	CLEAR_ERRORS,
	LOADING_UI,
	LOADING_USER,
	MARK_NOTIFICATIONS_READ,
	SET_ERRORS,
	SET_UNAUTHENTICATED,
	SET_USER
} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/login", userData)
        .then((res) => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem("FBIdToken", FBIdToken);
            axios.defaults.headers.common["Authorization"] = FBIdToken;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/signup", newUserData)
        .then((res) => {
            dispatch({ type: CLEAR_ERRORS });
            history.push("/login");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({
        type: SET_UNAUTHENTICATED,
    });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });

    axios
        .get("/user")
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const uploadImage = (formData) => (dispatch) => {
    axios
        .post("/user/image", formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
    axios
        .post("/user", userDetails)
        .then(() => {
            dispatch(getUserData());
        })
        .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationId) => (dispatch) => {
    axios
        .post("/notifications", notificationId)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICATIONS_READ,
            });
        })
        .catch((err) => console.log(err));
};
