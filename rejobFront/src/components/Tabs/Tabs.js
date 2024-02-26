import "./Tabs.css";

import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full pt-2">
      <div className="tab-buttons">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => changeTab(index)}
            className={index === activeTab ? "active" : ""}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
