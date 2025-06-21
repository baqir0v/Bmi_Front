import { Outlet } from "react-router";
import ScrollButton from "../components/ScrollUpButton";

const SiteRoot = () => {
  return (
    <div>
      <Outlet />
      <ScrollButton />
    </div>
  );
};

export default SiteRoot;
