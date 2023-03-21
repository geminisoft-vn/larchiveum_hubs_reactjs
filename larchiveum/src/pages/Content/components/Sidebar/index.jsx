import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const { items, selectedTab } = props;
  return (
    <ul className="-mb-px flex flex-col">
      {items &&
        items.length > 0 &&
        items.map((item) => {
          return (
            <li
              className={clsx(
                `inline-block cursor-pointer rounded-t-lg p-4`,
                item.key === selectedTab &&
                  "border-b-2 border-blue-500 text-blue-500"
              )}
              onClick={item.onClick}>
              {item.label}
            </li>
          );
        })}
    </ul>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array,
  selectedTab: PropTypes.string,
};

export default Sidebar;
