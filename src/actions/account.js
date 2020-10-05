import UPDATE_ACCOUNT_DATA from "../helpers/help";

const updateAccountData = (accountData) => ({
  type: UPDATE_ACCOUNT_DATA,
  accountData,
});

export { updateAccountData };
