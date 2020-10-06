import deepFreeze from "deep-freeze";
import secure from "../reducers/secure";
import { updateAuthToken } from "../actions/index";

it("updates email available result", () => {
  const stateBefore = {};
  const payload = {
    id: 2,
    now: "now",
    then: "then",
    token: "alsdjflajksdfasdf.oijh8283eujds.iuwsdknoijcowdc",
  };
  const stateAfter = {
    id: 2,
    now: "now",
    then: "then",
    token: "alsdjflajksdfasdf.oijh8283eujds.iuwsdknoijcowdc",
  };

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(updateAuthToken); // makes sure reducer is pure function

  expect(secure(stateBefore, updateAuthToken(payload))).toEqual(stateAfter);
});
