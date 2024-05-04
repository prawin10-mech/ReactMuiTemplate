// routes
// import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";
import Image from "../../../components/image";

// ----------------------------------------------------------------------

export const pngIcon = (name) => (
  <Image
    src={`/assets/icons/nav_icons/${name}.png`}
    sx={{ width: 60, height: 60 }}
  />
);

export const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 60, height: 60 }}
  />
);
export const ICONS = {
  dashboard: pngIcon("dashboard"),
  help_center: pngIcon("help_center"),
  customers: pngIcon("customers"),
  pricing: pngIcon("pricing"),
  notification: pngIcon("notification"),
  marketing: pngIcon("marketing"),
  bookings: pngIcon("bookings"),
  customer_support: pngIcon("customer_support"),
  properties: pngIcon("properties"),
  statistics: pngIcon("statistics"),
  transaction: pngIcon("transaction"),
  membership: pngIcon("membership"),
  event: icon("event"),
  gsc_team: icon("gsc_team"),
};
const navConfig = [
  {
    subheader: "Chose country for data",
    items: [
      {
        title: "HOME",
        path: "/home",
        // icon: ICONS.dashboard,
      },
      {
        title: "FAQ",
        path: "/faq",
      },
      {
        title: "POST",
        path: "/post",
      },
      {
        title: "SEARCH",
        path: "/search",
      },
    ],
  },
];

export default navConfig;
