import AuthService from "services/auth";
import axios from "axios";
import * as ActionTypes from "constants/ActionTypes";

/* ================================================================== */
/* User Registration */
/* ================================================================== */
/**
 * User Registration
 * On registration is success - User Details
 * On registration Failed  - handling user registration error
 * @param {*} postData
 */
export function userRegistration(postData) {
  return function(dispatch) {
    return AuthService.postSignUpDetails(postData)
      .then(responseData => {
        dispatch(receiveUserData(responseData.data.user));
        return responseData;
      })
      .catch(errorData => {
        dispatch(handleRegisterError(errorData));
      });
  };
}
/**
 * User Registration Failed Response
 * @param {*} error
 */
export function handleRegisterError(error) {
  return {
    type: ActionTypes.HANDLE_REGISTER_ERROR,
    payload: error
  };
}
/**
 * Clearing Register Error Response
 */
export function clearRegisterError() {
  return {
    type: ActionTypes.HANDLE_REGISTER_ERROR,
    payload: {}
  };
}

/* ================================================================== */
/* User Login */
/* ================================================================== */
/**
 * User Login with email and password
 * common for all the user (broker, admin, client)
 * @param {*} postData
 */
export function userLogin(postData) {
  return function(dispatch) {
    return AuthService.postLoginDetails(postData)
      .then(responseData => {
        dispatch(handleLoginSuccess(responseData));
        dispatch(receiveUserData(responseData.data.user));
        if (responseData.data.access_token) {
          dispatch(
            setAuthTokenInSession(
              "token",
              responseData.data.access_token.accessToken
            )
          );
          dispatch(handleIsUserAuthenticated(true));
        }
        return responseData.data.user;
      })
      .catch(errorData => {
        dispatch(handleLoginError(errorData));
      });
  };
}
/**
 * Login Success Response
 * @param {*} loginResponse
 */
export function handleLoginSuccess(loginResponse) {
  return {
    type: ActionTypes.HANDLE_LOGIN_SUCCESS,
    payload: loginResponse
  };
}
/**
 * Login Error Response
 * @param {*} error
 */
export function handleLoginError(error) {
  return {
    type: ActionTypes.HANDLE_LOGIN_ERROR,
    payload: error
  };
}
/**
 * Clearing Login Failed Response
 */
export function clearLoginError() {
  return {
    type: ActionTypes.HANDLE_LOGIN_ERROR,
    payload: {}
  };
}
/* ================================================================== */
/* User Data */
/* ================================================================== */
/**
 * Storing User Details to access across the App
 * @param {*} userData
 */
export function receiveUserData(userData) {
  return {
    type: ActionTypes.RECEIVE_USER_DATA,
    payload: userData
  };
}
/**
 * Error response when getting the user details from  the user
 * @param {*} error
 */
export function receiveUserDataError(error) {
  return {
    type: ActionTypes.RECEIVE_USER_DATA_ERROR,
    payload: error
  };
}
/* ================================================================== */
/* User Auth Token Handling */
/* ================================================================== */
/**
 * After the user login handling user auth token handling
 * using axios request Header
 * @param {*} payload
 */
export function handleIsUserAuthenticated(payload) {
  var token = sessionStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
  return {
    type: ActionTypes.HANDLE_IS_USER_AUTHENTICATED,
    payload: payload
  };
}
/**
 * Set the auth Token in the session storage with key and value
 * @param {*} key
 * @param {*} value
 */
export function setAuthTokenInSession(key, value) {
  return function(dispatch) {
    sessionStorage.setItem(key, value);
  };
}
/* ================================================================== */
/* User auth token validation */
/* ================================================================== */
/**
 * Validating the existing user auth token is valid or not
 */
export function validateAuthToken() {
  return function(dispatch) {
    return AuthService.validateAuthToken()
      .then(responseData => {
        dispatch(receiveUserData(responseData.data.user));
      })
      .catch(errorData => {
        dispatch(userSignOut());
      });
  };
}
/* ================================================================== */
/* User sign out */
/* ================================================================== */
/**
 * User Sign out by setting isAuthenticated false
 * and clearing session storage
 */
export function userSignOut() {
  return function(dispatch) {
    sessionStorage.clear();
    dispatch(handleIsUserAuthenticated(false));
  };
}
/* ================================================================== */
/* Forgot Password */
/* ================================================================== */
/**
 * Requesting forgot password with email
 * @param {*} postData
 */
export function forgetPassword(postData) {
  return function(dispatch) {
    return AuthService.forgetPassword(postData)
      .then(responseData => {
        dispatch(receiveForgotPasswordToken(responseData));
        dispatch(forgotPasswordToggle(true));
      })
      .catch(errorData => {
        dispatch(receiveForgotPasswordError(errorData.data));
        dispatch(forgotPasswordToggle(false));
      });
  };
}
/**
 * On Success Receives Reset Token
 * @param {*} data
 */
export function receiveForgotPasswordToken(data) {
  return {
    type: ActionTypes.RECEIVE_PASSWORD_RESET_TOKEN,
    payload: data
  };
}
/**
 * ON Failure while resetting password
 * @param {*} error
 */
export function receiveForgotPasswordError(error) {
  return {
    type: ActionTypes.RECEIVE_PASSWORD_RESET_TOKEN_ERROR,
    payload: error
  };
}
/* ================================================================== */
/* Reset Password */
/* ================================================================== */
/**
 * For resetting the password using the token
 * @param {*} data
 */
export function resetPassword(data) {
  return function(dispatch) {
    return AuthService.resetPassword(data)
      .then(responseData => {
        dispatch(receiveResetPassword(responseData));
      })
      .catch(errorData => {
        dispatch(receiveResetPasswordError(errorData));
      });
  };
}
/**
 * When reset password is successful
 * @param {*} data
 */
export function receiveResetPassword(data) {
  return {
    type: ActionTypes.RESET_PASSWORD_TOKEN,
    payload: data
  };
}
/**
 * When reset password receives and failed response.
 * @param {*} error
 */
export function receiveResetPasswordError(error) {
  return {
    type: ActionTypes.RESET_PASSWORD_ERROR,
    payload: error
  };
}
/**
 * Reset password toggle for switching views
 * @param {*} data
 */
export function forgotPasswordToggle(data) {
  return {
    type: ActionTypes.FORGOT_PASSWORD_TOGGLE,
    payload: data
  };
}
