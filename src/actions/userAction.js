import axios from "axios";
export const registerAction = formData => dispatch => {
  axios
    .post("https://reqres.in/api/register", {
      ...formData
    })
    .then(function (response) {
      console.log("IN registerAction ");
      console.log(response);

      dispatch({
        type: "LOGIN_USER",
        payload: response.data.token
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const loginAction = formData => dispatch => {
  axios
    .post("https://reqres.in/api/login", {
      ...formData
    })
    .then(function (response) {
      console.log("IN loginAction ");
      console.log(response);

      dispatch({
        type: "LOGIN_USER",
        payload: response.data.token
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};



export const fetchUsersAction = (urlSlug = '') => (dispatch) => {
  axios
    .get("https://reqres.in/api/users" + urlSlug)
    .then(function (response) {
      console.log("IN loginAction ");
      console.log(response);

      dispatch({
        type: "USERS",
        payload: response.data
      });
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