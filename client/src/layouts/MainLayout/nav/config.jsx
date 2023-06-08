// component
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = name => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Content",
    path: "/home/content",
    requiredType: 4,
    target: "_self"
  },
  {
    title: "Room",
    path: "/home/room",
    requiredType: 4,
    target: "_self"
  },

  {
    title: "Profile",
    path: "/home/profile",
    requiredType: 2,
    target: "_self"
  },
  {
    title: "User",
    path: "/home/user",
    requiredType: 5,
    target: "_self"
  }
];

export default navConfig;
