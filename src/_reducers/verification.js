import * as ActionTypes from "constants/ActionTypes";

var initialState = {
  phoneVerificationCodeSent: false,
  verification_success: {},
  verification_failed: {},
  authCodeResponse: {}
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SEND_VERIFICATION_SMS_SUCCESS:
      return {
        ...state,
        verification_success: action.payload
      };
    case ActionTypes.SEND_VERIFICATION_SMS_FAILURE:
      return {
        ...state,
        verification_failed: action.payload
      };
    case ActionTypes.AUTH_CODE_RESPONSE:
      return {
        ...state,
        authCodeResponse: action.payload
      };
    default:
      return state;
  }
}
