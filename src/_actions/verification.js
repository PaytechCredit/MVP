import VerificationService from "services/verification";
import {
  receiveUserData,
  receiveUserDataError,
  handleIsUserAuthenticated,
  setAuthTokenInSession
} from "_actions/auth";
import * as actionTypes from "constants/ActionTypes";

/* ========================================================================== */
/* Email Code Verification */
/* ========================================================================== */
/**
 * Verifying code sent to the email
 * @param {*} code
 */
export function authCodeVerification(code) {
  return function(dispatch) {
    return VerificationService.verifyAuthCode(code)
      .then(responseData => {
        dispatch(authCodeResponse(responseData));
        dispatch(receiveUserData(responseData.data.result.user));
        if (responseData.data.result.access_token) {
          dispatch(
            setAuthTokenInSession(
              "token",
              responseData.data.result.access_token.accessToken
            )
          );
          dispatch(handleIsUserAuthenticated(true));
        }
      })
      .catch(errorData => {
        dispatch(receiveUserDataError(errorData));
        dispatch(handleIsUserAuthenticated(false));
      });
  };
}
/**
 * On Auth code Response Success
 * @param {*} data
 */
export function authCodeResponse(data) {
  return {
    type: actionTypes.AUTH_CODE_RESPONSE,
    payload: data
  };
}
/* ========================================================================== */
/* Phone Code Verification */
/* ========================================================================== */
/**
 * Takes the phone numbers and sends Verification Text Message.
 * @param {*} data
 */
export function sendVerificationTextMessage(data) {
  return function(dispatch) {
    return VerificationService.sendVerificationCodeToPhone(data)
      .then(responseData => {
        // console.log(response.data);
        dispatch(phoneVerificationSuccess(responseData));
      })
      .catch(errorData => {
        dispatch(phoneVerificationError(errorData));
      });
  };
}
/**
 * When verification code sent successfully
 * @param {*} responseData
 */
export function phoneVerificationSuccess(responseData) {
  return {
    type: actionTypes.SEND_VERIFICATION_SMS_SUCCESS,
    payload: responseData
  };
}
/**
 * When Verification Code Failed to sent
 * @param {*} errorData
 */
export function phoneVerificationError(errorData) {
  return {
    type: actionTypes.SEND_VERIFICATION_SMS_FAILURE,
    payload: errorData
  };
}
/* ========================================================================== */
/* Resent Verification code */
/* ========================================================================== */
/**
 * Resending the verification code to Email or phone
 */
export function resendVerificationEmail(data) {
  return function(dispatch) {
    return VerificationService.resendVerificationEmail(data)
      .then(responseData => {
        return responseData;
      })
      .catch(errorData => {
        return errorData;
      });
  };
}
/**
 * Resending the Verification Code to Phone
 * @param {*} data
 */
export function resendVerificationSMS(data) {
  return function(dispatch) {
    return VerificationService.resendVerificationSMS(data)
      .then(responseData => {
        return responseData;
      })
      .catch(errorData => {
        return errorData;
      });
  };
}
