import React from "react";
import Link from "next/link";

import Button from "../components/Button";

const Main = () => {
  return (
    <div className="main">
      <Link href={{ pathname: "/doctor/model" }}>
        <Button primary="primary" size="large" label="Doctor" />
      </Link>
      <Link href={{ pathname: "/developer/result_list" }}>
        <Button primary="secondary" size="large" label="Developer" />
      </Link>
    </div>
  );
};

export default Main;
