import React from "react";
// React bootstrap
import Form from "react-bootstrap/Form";
// Importing commonApi
import ApplicationAPI from "services/application";
import PropTypes from "prop-types";
import _ from "lodash";

function StateSelectBox({ countryCode, ...props }) {
  var [countryData, setCountryData] = React.useState({
    states: []
  });

  React.useEffect(() => {
    if (!_.isUndefined(countryCode)) {
      ApplicationAPI.getStatesOfCountry(countryCode).then(function(data) {
        setCountryData(data.data.collection);
      });
    }
  }, [countryCode]);

  var options = countryData.states.map(function(item) {
    return (
      <option value={item.id} key={item.id}>
        {item.name}
      </option>
    );
  });

  return (
    <Form.Control as="select" {...props}>
      <option value="" defaultValue hidden>
        Choose Here...
      </option>
      {options}
    </Form.Control>
  );
}

StateSelectBox.propTypes = {
  countryCode: PropTypes.number
};

export default StateSelectBox;
