import React from "react";
import { connect } from "react-redux";
import styles from "../styles/AdminIndexList.module.css";
import ApplicationCard from "../components/ApplicationCard";

const AdminIndexList = ({ admin }) => {
  return <ApplicationCard />;
};

const mapStateToProps = (state) => ({
  account: state.account,
  secure: state.secure,
  admin: state.admin,
});

export default connect(mapStateToProps, null)(AdminIndexList);
