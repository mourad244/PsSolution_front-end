import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 40px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    color: white;
    background-color: #252831;
    border-left: 4px solid white;
    cursor: pointer;
  }
`;
const SidebarLabel = styled.span`
  margin-left: 16px;
`;
const DrpodownLink = styled(Link)`
  background-color: black;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subNav, setsubNav] = useState(false);
  const showSubNav = () => setsubNav(!subNav);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubNav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subNav
            ? item.iconOpned
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subNav &&
        item.subNav.map((it, i) => {
          return (
            <DrpodownLink to={it.path} key={i}>
              {it.icon}
              <SidebarLabel>{it.title}</SidebarLabel>
            </DrpodownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
