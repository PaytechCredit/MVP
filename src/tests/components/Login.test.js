import React from "react";
// enzyme imports for smoke testing
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
// Redux Mock Store
import configureStore from "redux-mock-store";
// Testing Components
import Login from "pages/auth/LogIn";

const mockStore = configureStore();
const initialState = {
  auth: {
    isAuthenticated: false,
    loginError: {
      status: 0
    }
  }
};
const store = mockStore(initialState);

describe("Test case for testing login", () => {
  let wrapper;
  let testProps;

  beforeEach(() => {
    testProps = { store };
    wrapper = mount(<Login {...testProps} />, {
      disableLifecycleMethods: true
    });
  });

  // test("email check", () => {
  //   const email_input = wrapper.find('input[type="email"]');
  //   const instance = wrapper.instance();
  //   console.log(wrapper.props().store.getState("email"));
  //   email_input.simulate("change", {
  //     target: { name: "email", value: "johnsmith@ivylender.com" }
  //   });
  //   expect(wrapper.props()).toEqual("johnsmith@ivylender.com");
  // });
  test("renders the component", () => {
    const wrapper = shallow(<Login {...testProps} />);
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});
