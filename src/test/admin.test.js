import deepFreeze from "deep-freeze";
import admin from "../reducers/admin";
import { updateAdmIndexReport, killAdmIndexReport } from "../actions/index";

it("updates admin index report array data", () => {
  const stateBefore = {
    other_property: null,
  };
  const payload = [
    {
      report: "first",
    },
    {
      report: "second",
    },
  ];
  const stateAfter = {
    other_property: null,
    index_report: [
      {
        report: "first",
      },
      {
        report: "second",
      },
    ],
  };

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(updateAdmIndexReport); // makes sure reducer is pure function

  expect(admin(stateBefore, updateAdmIndexReport(payload))).toEqual(stateAfter);
});

it("kills admin index report array data", () => {
  const stateBefore = {
    other_property: null,
    index_report: [
      {
        report: "first",
      },
      {
        report: "second",
      },
    ],
  };

  const stateAfter = {
    other_property: null,
    index_report: null,
  };

  /* inmmutability check */
  deepFreeze(stateBefore); // makes sure reducer is pure function
  deepFreeze(killAdmIndexReport); // makes sure reducer is pure function

  expect(admin(stateBefore, killAdmIndexReport())).toEqual(stateAfter);
});
