import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const onLogoClick = () => {
    router.push("/");
  };

  return (
    <div className="header">
      <div className="header-logo" onClick={onLogoClick}>
        D&D
      </div>
      <div className="header-profile"></div>
    </div>
  );
};

export default Header;
