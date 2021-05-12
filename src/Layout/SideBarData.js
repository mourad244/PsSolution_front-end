import React from "react";
import {
  FaLayerGroup,
  FaUsersCog,
  FaRegObjectGroup,
  FaShoppingBag,
  FaSlidersH,
} from "react-icons/fa";
import { AiFillDashboard, AiFillDollarCircle } from "react-icons/ai";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

export const SideBarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiFillDashboard />,
    iconClosed: <RiArrowDownSFill />,
    iconOpned: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Users",
        path: "/users",
        icon: <FaUsersCog />,
      },
      {
        title: "Devis",
        path: "/devis",
        icon: <AiFillDollarCircle />,
      },
    ],
  },
  {
    title: "Services",
    path: "/services",
    icon: <FaSlidersH />,
    iconClosed: <RiArrowDownSFill />,
    iconOpned: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Categories",
        path: "/servicescategorie",
        icon: <FaLayerGroup />,
      },
    ],
  },
  {
    title: "Products",
    path: "/products",
    icon: <FaShoppingBag />,
    iconClosed: <RiArrowDownSFill />,
    iconOpned: <RiArrowUpSFill />,
    subNav: [
      {
        title: "Types",
        path: "/productstype",
        icon: <FaRegObjectGroup />,
      },
      {
        title: "Categories",
        path: "/productscategorie",
        icon: <FaLayerGroup />,
      },
    ],
  },
];
