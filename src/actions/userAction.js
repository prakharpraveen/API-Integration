import axios from "axios";

export const registerAction = formData => dispatch => {
  axios
    .post("https://reqres.in/api/register", {
      ...formData
    })
    .then(function (response) {
      dispatch({
        type: "LOGIN_USER",
        payload: response.data.token
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const loginAction = (formData, closeCallBack) => dispatch => {
  axios
    .post("https://reqres.in/api/login", {
      ...formData
    })
    .then(function (response) {
      dispatch({
        type: "LOGIN_USER",
        payload: response.data.token
      });
      closeCallBack();
    })
    .catch(function (error) {
      console.log(error);
    });
};



export const fetchUsersAction = (urlSlug = '') => (dispatch) => {
  dispatch({
    type: "USER_IS_FETCHING",
    payload: true
  });
  axios
    .get("https://reqres.in/api/users" + urlSlug)
    .then(function (response) {
      dispatch({
        type: "USERS",
        payload: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const updateAction = (formData) => (dispatch) => {
  axios
    .put("https://reqres.in/api/users/" + formData.id, { ...formData })
    .then(function (response) {
      console.log("response");
      console.log(response);
      
      if (response.data) {
        // dispatch({
        //   type: "DELETE_USER",
        //   payload: id
        // });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


export const deleteUserAction = (_id) => (dispatch) => {
  axios
    .delete("https://reqres.in/api/users/" + _id, {})
    .then(function (response) {
      if (response.data) {
        dispatch({
          type: "DELETE_USER",
          payload: _id
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


export const logoutAction = (_id) => (dispatch) => {
  dispatch({
    type: "LOGIN_USER",
    payload: ""
  });
}



export const addUserAction = (formData, closeCallBack) => dispatch => {
  axios
    .post("https://reqres.in/api/users", {
      ...formData
    })
    .then(function (response) {
      console.log(response);
      
      dispatch({
        type: "ADD_USER",
        payload: response.data
      });
      closeCallBack();
    })
    .catch(function (error) {
      console.log(error);
      closeCallBack();
    });
};