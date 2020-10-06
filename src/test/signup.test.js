import deepFreeze from "deep-freeze";
import signup from "../reducers/signup";
import { updateSignupEmail } from "../actions/index";

it("updates email available result", () => {
  const stateBefore = {};
  const payload = {
    email_available: "email@email.com",
  };
  const stateAfter = {
    email_available: "email@email.com",
  };

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(updateSignupEmail); // makes sure reducer is pure function

  expect(signup(stateBefore, updateSignupEmail(payload))).toEqual(stateAfter);
});
