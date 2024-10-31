import React from "react";

const HeaderBox = ({ type = "title", title, subtext, user }) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === 'greeting' && (
          <span className="2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#333c5f] to-[#1dbef5]">
            &nbsp;{user}
          </span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
