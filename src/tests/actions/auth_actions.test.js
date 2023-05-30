import configureStore from "redux-mock-store";
import * as authActions from "_actions/auth";

const mockStore = configureStore();
const store = mockStore();

describe("auth_actions", () => {
  // Runs before each test in the suite
  beforeEach(() => {
    store.clearActions();
  });

  test("Dispatches the correct action and payload", () => {
    var postData = {
      email: "sriram@welathtab.com",
      password: "secret"
    };
    store.dispatch(authActions.userLogin(postData));
    expect(store.getActions()).toMatchSnapshot();
  });
});
