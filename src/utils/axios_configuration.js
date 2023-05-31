import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "https://ivy-lender-server.herokuapp.com";
} else {
  axios.defaults.baseURL = "http://ivylender.local";
}

(function() {
  var token = sessionStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
})();

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log(response.data);
    return response;
  },
  function(error) {
    // Do something with response error
    console.log(error.response);
    return Promise.reject(error);
  }
);
