import { Campaign } from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import HeaderWithUnderline from "../../common/HeaderWithUnderline";
import axios from "axios";

const Notice = () => {
  const [notices, setNotices] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/notices`);
      setNotices(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <HeaderWithUnderline text="Notice" />
      <h6 className="large">Today: {moment().format("MMM Do YY")}</h6>
      {notices?.map((notice, index) => {
        return (
          <Alert key={"success"} variant={"success"} className="large">
            <Campaign />
            NOTICE
            <br />
            {notice?.description}
          </Alert>
        );
      })}
    </>
  );
};

export default Notice;
