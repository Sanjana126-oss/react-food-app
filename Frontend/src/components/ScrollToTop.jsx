import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This line forces the browser to jump to the top (0,0)
    window.scrollTo(0, 0);
  }, [pathname]); // This runs every time the URL path changes

  return null;
};

export default ScrollToTop;