import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import SLUGS from "../../resources/slugs";
import {
  IconAgents,
  IconArticles,
  IconContacts,
  IconIdeas,
  IconLogout,
  IconOverview,
  IconSettings,
  IconSubscription,
  IconTickets,
} from "../../assets/icons";
import {
  faTag,
  faCube,
  faCubes,
  faCompass,
  faArchive,
  faSitemap,
  faProjectDiagram,
  faTachometerAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { convertSlugToUrl } from "../../resources/utilities";
import LogoComponent from "./LogoComponent";
import Menu from "./MenuComponent";
import MenuItem from "./MenuItemComponent";

const useStyles = createUseStyles({
  separator: {
    borderTop: ({ theme }) => `1px solid ${theme.color.lightGrayishBlue}`,
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06,
  },
});

function SidebarComponent() {
  const { push } = useHistory();
  const theme = useTheme();
  const classes = useStyles({ theme });
  const isMobile = window.innerWidth <= 1080;
  console.log(isMobile);
  async function logout() {
    console.log("logout");
  }

  function onClick(slug, parameters = {}) {
    push(convertSlugToUrl(slug, parameters));
  }

  return (
    <Menu isMobile={true}>
      <div style={{ paddingTop: 30, paddingBottom: 30, textAlign: "center" }}>
        <img src={logo} alt="logo" width={100} height={50} />
      </div>
      <MenuItem
        id={SLUGS.dashboard}
        title="Dashboard"
        onClick={() => onClick(SLUGS.dashboard)}
        faw={faTachometerAlt}
      />
      <MenuItem
        id={SLUGS.services}
        items={[SLUGS.servicesOne, SLUGS.servicesTwo]}
        title="Services"
        faw={faTag}
      >
        <MenuItem
          id={SLUGS.servicesOne}
          title="Services"
          level={2}
          onClick={() => onClick(SLUGS.servicesOne)}
          faw={faCube}
        />
        <MenuItem
          id={SLUGS.servicesTwo}
          title="Categories"
          level={2}
          onClick={() => onClick(SLUGS.servicesTwo)}
          faw={faCubes}
        />
      </MenuItem>
      <MenuItem
        id={SLUGS.products}
        items={[SLUGS.productsOne, SLUGS.productstwo, SLUGS.productsThree]}
        title="Products"
        faw={faCompass}
      >
        <MenuItem
          id={SLUGS.productsOne}
          title="Products"
          level={2}
          onClick={() => onClick(SLUGS.productsOne)}
          faw={faArchive}
        />
        <MenuItem
          id={SLUGS.productsThree}
          title="Types"
          level={2}
          onClick={() => onClick(SLUGS.productsThree)}
          faw={faSitemap}
        />
        <MenuItem
          id={SLUGS.productstwo}
          title="Categories"
          level={2}
          onClick={() => onClick(SLUGS.productstwo)}
          faw={faProjectDiagram}
        />
      </MenuItem>
      <MenuItem
        id={SLUGS.ideas}
        items={[SLUGS.ideasTwo, SLUGS.ideasThree]}
        title="Ideas"
      >
        <MenuItem
          id={SLUGS.ideas}
          title="Sub Item 1"
          level={2}
          onClick={() => onClick(SLUGS.ideas)}
        />
        <MenuItem
          id={SLUGS.ideasTwo}
          title="Sub Item 2"
          level={2}
          onClick={() => onClick(SLUGS.ideasTwo)}
        />
        <MenuItem
          id={SLUGS.ideasThree}
          title="Sub Item 3"
          level={2}
          onClick={() => onClick(SLUGS.ideasThree)}
        />
      </MenuItem>

      <div className={classes.separator}></div>
      <MenuItem
        id={SLUGS.settings}
        title="Settings"
        onClick={() => onClick(SLUGS.settings)}
      />

      <MenuItem
        id="logout"
        title="Logout"
        faw={faSignOutAlt}
        onClick={logout}
      />
    </Menu>
  );
}

export default SidebarComponent;
