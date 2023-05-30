import * as ActionTypes from "constants/ActionTypes";
import ApplicationService from "services/application";
import history from "utils/history";
import { replaceNulls } from "utils/helper";
import axios from "axios";
import _ from "lodash";

/* ================================================================= */
/* Application Step */
/* ================================================================= */
/**
 * Handling Application Steps in the Application walk-through
 * @param {*} index
 */
export function handleApplicationStep(index) {
  return {
    type: ActionTypes.HANDLE_APPLICATION_STEP,
    payload: index
  };
}
/**
 * To Reset the application walk through step to "ZERO"
 */
export function resetApplicationStep() {
  return {
    type: ActionTypes.RESET_APPLICATION_STEP,
    payload: 0
  };
}
/* ================================================================= */
/* Reset Application Details*/
/* ================================================================= */
/**
 * Reset the application Details with the initial State values
 */
export function resetApplicationDetails() {
  return {
    type: ActionTypes.RESET_APPLICATION_DETAILS
  };
}
/* ================================================================= */
/* Application Submit*/
/* ================================================================= */
/**
 * Application Save and Submit
 * Here we save application first and submits it if the create is successful
 * @param {*} postData
 */
export function applicationSubmit(application_id) {
  return function(dispatch) {
    ApplicationService.submitApplication(application_id)
      .then(responseData => {
        dispatch(applicationSubmitSuccess(responseData));
        history.push("application-success");
      })
      .catch(errorData => {
        dispatch(applicationSubmitError(errorData));
      });
  };
}
/**
 * Application Submit Success
 * @param {*} data
 */
export function applicationSubmitSuccess(data) {
  return {
    type: ActionTypes.APPLICATION_SUBMIT_SUCCESS,
    payload: data
  };
}
/**
 * Application Submit Error
 * @param {*} data
 */
export function applicationSubmitError(data) {
  return {
    type: ActionTypes.APPLICATION_SUBMIT_ERROR,
    payload: data
  };
}
/* ================================================================= */
/* Application Save */
/* ================================================================= */
/**
 * Application Create or Save
 * @param {*} data
 */
export function applicationSave(data) {
  return function(dispatch) {
    // console.log(JSON.stringify(data));
    return ApplicationService.postApplicationData(data)
      .then(responseData => {
        dispatch(applicationSaveResponse(responseData));
        return responseData;
      })
      .catch(errorData => {
        dispatch(applicationSaveError(errorData));
        throw errorData;
      });
  };
}
/**
 * Application Save Success Response
 * @param {*} data
 */
export function applicationSaveResponse(data) {
  return {
    type: ActionTypes.APPLICATION_SAVE_RESPONSE,
    payload: data
  };
}
/**
 * Application Save Failed Response
 * @param {*} data
 */
export function applicationSaveError(data) {
  return {
    type: ActionTypes.APPLICATION_SAVE_ERROR,
    payload: data
  };
}
/* ================================================================= */
/* Application List*/
/* ================================================================= */
/**
 * Gets List of all Applications
 */
export function getApplicationsList() {
  return function(dispatch) {
    return ApplicationService.getApplicationsList()
      .then(responseData => {
        if (responseData.data.collection === null) {
          dispatch(applicationList([]));
        } else {
          dispatch(applicationList(responseData.data.collection));
        }
        return responseData;
      })
      .catch(errorData => {
        dispatch(applicationListError(errorData));
      });
  };
}
/**
 * Applications List
 * @param {*} applicationList
 */
export function applicationList(applicationList) {
  return {
    type: ActionTypes.APPLICATION_LIST,
    payload: applicationList
  };
}
/**
 * Application List Failed Response
 * @param {*} errorData
 */
export function applicationListError(errorData) {
  return {
    type: ActionTypes.APPLICATION_LIST_ERROR,
    payload: errorData
  };
}
/* ================================================================= */
/* Application Details*/
/* ================================================================= */
/**
 * Get the Detail View of Application using application_id
 * @param {*} application_id
 */
export function getApplicationDetails(application_id) {
  return function(dispatch) {
    return ApplicationService.getApplicationDetails(application_id)
      .then(responseData => {
        dispatch(applicationDetailsResponse(responseData));
        dispatch(
          replaceApplicationDetails(replaceNulls(responseData.data.model))
        );
        dispatch(transformApplicationDetails(responseData.data.model));
        return responseData.data.model;
      })
      .catch(errorData => {
        dispatch(applicationDetailsError(errorData));
      });
  };
}
/**
 * Application Details Success Response
 * @param {*} responseData
 */
export function applicationDetailsResponse(responseData) {
  return {
    type: ActionTypes.APPLICATION_DETAILS_RESPONSE,
    payload: responseData
  };
}
/**
 * Application Details Failed Response
 * @param {*} errorData
 */
export function applicationDetailsError(errorData) {
  return {
    type: ActionTypes.APPLICATION_DETAILS_ERROR,
    payload: errorData
  };
}
/**
 * Replace Application Details with the
 * existing application from the server
 * @param {*} data
 */
export function replaceApplicationDetails(data) {
  return {
    type: ActionTypes.REPLACE_APPLICATION_DETAILS,
    payload: data
  };
}

export function transformApplicationDetails(applicationData) {
  return function(dispatch) {
    dispatch(handleApplicationDetails("new_business_current", false));

    if (
      _.isUndefined(
        applicationData.type.business_current.credit_card_acceptance_id
      ) ||
      _.isNull(applicationData.type.business_current.credit_card_acceptance_id)
    ) {
      dispatch(handleApplicationDetails("is_credit_card_acceptance", false));
      dispatch(
        handleBusinessCurrent("credit_card_acceptance", {
          processor: "",
          average_monthly_volume: "",
          average_monthly_volume_american_express: "",
          average_ticket: ""
        })
      );
    } else {
      dispatch(handleApplicationDetails("is_credit_card_acceptance", true));
    }

    if (
      _.isUndefined(applicationData.type.cash_advance_id) ||
      _.isNull(applicationData.type.cash_advance_id)
    ) {
      dispatch(handleApplicationDetails("is_cash_advance", false));
      dispatch(
        handleApplicationType("cash_advance", {
          provider: "",
          standing_balance: ""
        })
      );
    } else {
      dispatch(handleApplicationDetails("is_cash_advance", true));
    }
    if (applicationData.type.location.name) {
      dispatch(
        handleApplicationDetails(
          "location_type",
          applicationData.type.location.name
        )
      );
    }
  };
}
/* ================================================================= */
/* Application Update*/
/* ================================================================= */
/**
 * Updates an existing application
 * @param {*} data
 */
export function applicationUpdate(data) {
  return function(dispatch) {
    return ApplicationService.applicationUpdate(data)
      .then(responseData => {
        dispatch(getApplicationDetails(responseData.data.model.id));
        return responseData;
      })
      .catch(errorData => {
        throw errorData;
      });
  };
}
/* ================================================================= */
/* Media Actions */
/* ================================================================= */
export function mediaDelete(file_id, application_id) {
  return function(dispatch) {
    return axios
      .delete("/api/v1/media/" + file_id + "/delete")
      .then(response => {
        console.log(response.data);
        dispatch(getApplicationDetails(application_id));
      })
      .catch(error => {
        throw error;
      });
  };
}
/* ================================================================= */
/* Handling Application Details Change Actions from the Form */
/* ================================================================= */
/**
 * Update Application Details
 * @param {purpose} key_name
 * @param {1000} data
 */
export function handleApplicationDetails(key_name, data) {
  return {
    type: ActionTypes.HANDLE_APPLICATION_DETAILS,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Application Business type
 * @param {gross_annual_sale} key_name
 * @param {9090090} data
 */
export function handleApplicationType(key_name, data) {
  return {
    type: ActionTypes.HANDLE_APPLICATION_TYPE,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Business Owner Information
 * @param {*} key_name
 * @param {*} data
 */
export function handleBusinessOwnership(key_name, data) {
  return {
    type: ActionTypes.HANDLE_BUSINESS_OWNERSHIP,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Business Owner Address
 * @param {*} key_name
 * @param {*} data
 */
export function handleBusinessOwnerAddress(key_name, data) {
  return {
    type: ActionTypes.HANDLE_BUSINESS_OWNER_ADDRESS,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Cash Advance
 * @param {*} key_name
 * @param {*} data
 */
export function handleCashAdvance(key_name, data) {
  return {
    type: ActionTypes.HANDLE_CASH_ADVANCE,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Business Current
 * @param {*} key_name
 * @param {*} data
 */
export function handleBusinessCurrent(key_name, data) {
  return {
    type: ActionTypes.HANDLE_BUSINESS_CURRENT,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Business Address
 * @param {*} key_name
 * @param {*} data
 */
export function handleBusinessAddress(key_name, data) {
  return {
    type: ActionTypes.HANDLE_BUSINESS_ADDRESS,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating Business Credit Card Acceptance
 * @param {*} key_name
 * @param {*} data
 */
export function handleCreditCardAcceptance(key_name, data) {
  return {
    type: ActionTypes.HANDLE_CREDIT_CARD_ACCEPTANCE,
    payload: data,
    key_name: key_name
  };
}
/**
 * Updating business Location
 * @param {*} key_name
 * @param {*} data
 */
export function handleBusinessLocation(key_name, data) {
  return {
    type: ActionTypes.HANDLE_BUSINESS_LOCATION,
    payload: data,
    key_name: key_name
  };
}
/**
 * Update Application Signature
 * @param {*} data
 */
export function handleApplicationSignature(data) {
  return {
    type: ActionTypes.HANDLE_APPLICATION_SIGNATURE,
    payload: data
  };
}
