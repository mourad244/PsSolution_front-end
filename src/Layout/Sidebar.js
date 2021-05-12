import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";

const Nav = styled.div`
  background: #ffc107;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;
const NavIcon = styled(Link)`
  height: 80px;
  align-items: center;
  justify-content: flex-end;
  font-size: 2rem;
  color: black;
  text-decoration: none;
  display: flex;
`;
const SideBarNav = styled.nav`
  background: #ffc107;
  width: 250px;
  height: 100vh;

  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
const SidebarWrap = styled.div`
  width: "100%";
`;
const Sidebar = () => {
  const [sidebar, setsidebar] = useState(false);
  const showSideBar = () => setsidebar(!sidebar);
  return (
    <>
      <Nav>
        <NavIcon>
          <FaBars onClick={showSideBar} />{" "}
        </NavIcon>
        <NavIcon>
          <h3>PS-Admin</h3>{" "}
        </NavIcon>

        <NavIcon>
          <FaSignOutAlt />{" "}
        </NavIcon>
      </Nav>
      <SideBarNav sidebar={sidebar}>
        <SidebarWrap>
          <NavIcon>
            <AiOutlineClose onClick={showSideBar} />
          </NavIcon>
          {SideBarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SideBarNav>
    </>
  );
};

export default Sidebar;
