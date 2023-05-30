import axios from "axios";
import "utils/axios_configuration";
import * as APIRoutes from "constants/APIRoutes";

class VerificationAPI {
  static verifyAuthCode(code) {
    return axios
      .get(APIRoutes.VERIFY_CODE + code)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        throw error.response;
      });
  }
  static sendVerificationCodeToPhone(data) {
    return axios
      .post(APIRoutes.SEND_PHONE_VERIFICATION, data)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        throw error.response;
      });
  }
  static resendVerificationEmail(data) {
    return axios
      .post(APIRoutes.RESEND_VERIFICATION_EMAIL, data)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
  static resendVerificationSMS(data) {
    return axios
      .post(APIRoutes.RESEND_VERIFICATION_SMS, data)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
}

export default VerificationAPI;
