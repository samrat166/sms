import React from "react";

const HeaderWithUnderline = ({ text, id }) => {
  return (
    <>
      <h5 id={id} className="mb-1 xxxlarge text-center">
        <b>{text}</b>
      </h5>
    </>
  );
};

export default HeaderWithUnderline;
