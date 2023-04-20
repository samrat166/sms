import { Campaign } from "@mui/icons-material";
import moment from "moment";
import React from "react";
import Alert from "react-bootstrap/Alert";
import HeaderWithUnderline from "../../common/HeaderWithUnderline";

const Notice = () => {
  const noticeList = [
    "This is the notice to say that we are doing our work in correct way doing our work in correct way doing our work in correct way!",
    "This is the notice to say that we are doing our work in correct way!",
    "This is the notice to say that we are doing our work doing our work in correct way in correct way!",
  ];
  return (
    <>
      <HeaderWithUnderline text="Notice" />
      <h6 className="large">Today: {moment().format("MMM Do YY")}</h6>
      {noticeList?.map((notice, index) => {
        return (
          <Alert key={"success"} variant={"success"} className="large">
            <Campaign />
            NOTICE
            <br />
            {notice}
          </Alert>
        );
      })}
    </>
  );
};

export default Notice;
