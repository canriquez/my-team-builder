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

const backendAdminEvals = async ({ id, auth }) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/adhome/evals";
  const a = `?id=${id}`;
  const appURL = [baseUrl + endpoint + a];
  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    // return complete list
    console.log("AT API checking evaluations -- Result");
    console.log({ obj });
    console.log({ id });
    console.log({ auth });
    console.log({ appURL });
    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

const backendAdHome = async (auth) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/adhome";
  const appURL = [baseUrl + endpoint];
  const request = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`,
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    //console.log(obj);
    // return complete list
    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

/* Like actions */

const backendDestroyLikes = async ({ id, token }) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/likes/";
  const a = `${id}`;
  const appURL = [baseUrl + endpoint + a];
  const request = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    // return complete list
    console.log("AT API DELETING LIKE -- Result");
    console.log({ obj });
    console.log({ id });
    console.log({ token });
    console.log({ appURL });
    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

const backendUpdateLikes = async ({
  admin_id,
  evaluation_id,
  evaluation,
  token,
}) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/likes/";
  const a = `${evaluation_id}`;
  const b = `?application_id${evaluation_id}`;
  const c = `&admin_id=${admin_id}`;
  const e = `&evaluation=${evaluation}`;
  const appURL = [baseUrl + endpoint + a + b + c + e];
  const request = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

const backendCreatesLikes = async ({
  admin_id,
  application_id,
  evaluation,
  token,
}) => {
  //const baseUrl = "https://anriquez-my-team-api.herokuapp.com";
  const baseUrl = "http://127.0.0.1:5000";
  const endpoint = "/likes";
  const a = `?application_id=${application_id}`;
  const b = `&admin_id=${admin_id}`;
  const c = `&evaluation=${evaluation}`;
  const appURL = [baseUrl + endpoint + a + b + c];
  const request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(appURL, request);
    const obj = await response.json();

    return obj;
  } catch (err) {
    throw ("Something went wrong with fetching book list ", err);
  }
};

export {
  backEndSignup,
  backendCheckEmail,
  backEndSignin,
  backendAdHome,
  backendAdminEvals,
  backendDestroyLikes,
  backendUpdateLikes,
  backendCreatesLikes,
};
