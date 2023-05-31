import React from "react";
// enzyme imports for smoke testing
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
// Redux Mock Store
import configureStore from "redux-mock-store";
// Testing Components
import App from "containers/App";

const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe("Testing App Container Rendering", () => {
  test("render() renders the component", () => {
    const wrapper = shallow(<App store={store} />);
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});
