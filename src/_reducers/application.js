import * as ActionTypes from "constants/ActionTypes";

var initialState = {
  applicationList: [],
  applicationListError: {},
  applicationStep: 0,
  applicationSuccess: {},
  applicationError: {},
  // application Save
  application_save_response: {},
  application_save_error: {},
  // application details
  application_details_response: {},
  application_details_error: {},
  current_application_id: null,
  // Each Application Contains all these fields
  application_details: {
    purpose: "",
    borrow_amount: "",
    pending_claims: false,
    pending_bankruptcy: false,
    client_id: 0,
    first_name: "",
    last_name: "",
    // location
    location_type: "leased",
    is_cash_advance: false,
    new_business_current: true,
    is_credit_card_acceptance: false,
    loan_type: "",
    // Business Loan
    type: {
      gross_annual_sale: null,
      business_owned: false,
      home_owned: false,
      federal_tax_number: "",
      business_owner: {
        dob: "1990-07-12",
        phone_number: "",
        sin: "",
        driver_license: "",
        driver_license_state_id: "",
        years_at_address: null,
        // Business Owner Address
        address: {
          street_address: "",
          city: "",
          zip_code: "",
          state_id: ""
        }
      },
      cash_advance: {
        provider: "",
        standing_balance: null
      },
      business_current: {
        type: "",
        if_other_business_type: "",
        legal_name: "",
        dba_name: "",
        ein: "",
        legal_structure: "",
        years_in_business: null,
        phone_number: "",
        email: "",
        company_website: "http://",
        years_at_address: null,
        country_id: 1,
        // Business Address
        address: {
          street_address: "",
          city: "",
          zip_code: "",
          state_id: ""
        },
        credit_card_acceptance: {
          processor: "",
          average_monthly_volume: null,
          average_monthly_volume_american_express: null,
          average_ticket: null
        }
      },
      location: {
        monthly_mortgage_amount: null,
        mortgage_company: "",
        term: "",
        monthly_leased_amount: null,
        landlord_email: "",
        landlord_phone: "",
        landlord_name: ""
      }
    },
    signature: {
      value: ""
    }
  }
};

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HANDLE_APPLICATION_STEP:
      return {
        ...state,
        applicationStep: action.payload
      };
    case ActionTypes.RESET_APPLICATION_STEP:
      return {
        ...state,
        applicationStep: action.payload
      };
    case ActionTypes.HANDLE_APPLICATION_DETAILS:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          [action.key_name]: action.payload
        }
      };
    case ActionTypes.HANDLE_APPLICATION_TYPE:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            [action.key_name]: action.payload
          }
        }
      };
    case ActionTypes.HANDLE_BUSINESS_OWNERSHIP:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            business_owner: {
              ...state.application_details.type.business_owner,
              [action.key_name]: action.payload
            }
          }
        }
      };
    case ActionTypes.HANDLE_BUSINESS_OWNER_ADDRESS:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            business_owner: {
              ...state.application_details.type.business_owner,
              address: {
                ...state.application_details.type.business_owner.address,
                [action.key_name]: action.payload
              }
            }
          }
        }
      };
    case ActionTypes.HANDLE_CASH_ADVANCE:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            cash_advance: {
              ...state.application_details.type.cash_advance,
              [action.key_name]: action.payload
            }
          }
        }
      };
    case ActionTypes.HANDLE_BUSINESS_CURRENT:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            business_current: {
              ...state.application_details.type.business_current,
              [action.key_name]: action.payload
            }
          }
        }
      };
    case ActionTypes.HANDLE_BUSINESS_ADDRESS:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            business_current: {
              ...state.application_details.type.business_current,
              address: {
                ...state.application_details.type.business_current.address,
                [action.key_name]: action.payload
              }
            }
          }
        }
      };
    case ActionTypes.HANDLE_CREDIT_CARD_ACCEPTANCE:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            business_current: {
              ...state.application_details.type.business_current,
              credit_card_acceptance: {
                ...state.application_details.type.business_current
                  .credit_card_acceptance,
                [action.key_name]: action.payload
              }
            }
          }
        }
      };
    case ActionTypes.HANDLE_BUSINESS_LOCATION:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          type: {
            ...state.application_details.type,
            location: {
              ...state.application_details.type.location,
              [action.key_name]: action.payload
            }
          }
        }
      };
    case ActionTypes.HANDLE_APPLICATION_SIGNATURE:
      return {
        ...state,
        application_details: {
          ...state.application_details,
          signature: {
            value: action.payload
          }
        }
      };
    case ActionTypes.APPLICATION_SUBMIT_SUCCESS:
      return {
        ...state,
        applicationSuccess: action.payload
      };
    case ActionTypes.APPLICATION_SUBMIT_ERROR:
      return {
        ...state,
        applicationError: action.payload
      };
    case ActionTypes.APPLICATION_LIST:
      return {
        ...state,
        applicationList: action.payload
      };
    case ActionTypes.APPLICATION_LIST_ERROR:
      return {
        ...state,
        applicationListError: action.payload
      };
    case ActionTypes.APPLICATION_DETAILS_RESPONSE:
      return {
        ...state,
        application_details_response: action.payload
      };
    case ActionTypes.APPLICATION_DETAILS_ERROR:
      return {
        ...state,
        application_details_error: action.payload
      };
    case ActionTypes.RESET_APPLICATION_DETAILS:
      return {
        ...state,
        application_details: initialState.application_details
      };

    case ActionTypes.APPLICATION_SAVE_RESPONSE:
      return {
        ...state,
        application_save_response: action.payload
      };
    case ActionTypes.APPLICATION_SAVE_ERROR:
      return {
        ...state,
        application_save_error: action.payload
      };
    case ActionTypes.REPLACE_APPLICATION_DETAILS:
      return {
        ...state,
        application_details: action.payload
      };
    default:
      return state;
  }
}
