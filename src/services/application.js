import axios from "axios";
import "utils/axios_configuration";
import * as APIRoutes from "constants/APIRoutes";

class ApplicationAPI {
  static postApplicationData(postData) {
    return axios
      .post(APIRoutes.APPLICATION_CREATE, postData)
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        throw error.response;
      });
  }
  static getApplicationsList() {
    return axios
      .get(APIRoutes.APPLICATION_LIST)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
  static getStatesOfCountry(countryID) {
    return axios
      .get(APIRoutes.STATES_FROM_COUNTRY + countryID)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
  static submitApplication(application_id) {
    return axios
      .post("/api/v1/application/" + application_id + "/submit", {})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
  static getApplicationDetails(application_id) {
    return axios
      .get("/api/v1/application/" + application_id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
  static applicationUpdate(data) {
    return axios
      .post("/api/v1/application/" + data.id, data)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error.response;
      });
  }
}

export default ApplicationAPI;
