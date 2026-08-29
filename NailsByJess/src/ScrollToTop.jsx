import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant"
        });
      });
    });
  }, [pathname]);

  return null;
}