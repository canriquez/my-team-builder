import "regenerator-runtime";

const backEndSignup = async ({ email, name, role, avatar, password }) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/signup";
  const a = `?email=${email}`;
  const b = `&name=${name}`;
  const c = `&role=${role}`;
  const d = `&avatar=${avatar}`;
  const e = `&password=${password}`;
  const appURL = [baseUrl + endpoint + a + b + c + d + e];
  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    // return complete list
    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

const backEndSignin = async ({ email, password }) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/auth/login";
  const a = `?email=${email}`;
  const e = `&password=${password}`;
  const appURL = [baseUrl + endpoint + a + e];
  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    // return complete list
    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

const backendCheckEmail = async ({ email }) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/adhome/check";
  const a = `?email=${email}`;
  const appURL = [baseUrl + endpoint + a];
  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    // return complete list
    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

export { backEndSignup, backendCheckEmail, backEndSignin };
