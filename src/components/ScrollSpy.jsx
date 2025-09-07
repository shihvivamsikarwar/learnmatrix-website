// src/components/Navbar/ScrollSpy.js
import { useEffect, useState } from "react";

const ScrollSpy = () => {
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop;
        if (window.scrollY >= top - 60) {
          current = section.getAttribute("id");
        }
      });
      setActiveLink(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeLink;
};

export default ScrollSpy;
