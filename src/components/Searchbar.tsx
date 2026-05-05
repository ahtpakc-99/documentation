import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    PagefindUI?: any;
  }
}


const CustomSearchBar: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-initialization in Strict Mode
    if (initialized.current) return;

    const initPagefind = () => {
      if (window.PagefindUI) {
        new window.PagefindUI({
          element: "#docusaurus-pagefind-search",
          showSubResults: true,
          // Add this to ensure it finds the index during dev/prod
          bundlePath: "/docs/pagefind/" 
        });
        initialized.current = true;
      } else {
        // If script hasn't loaded yet, try again in 500ms
        setTimeout(initPagefind, 500);
      }
    };

    initPagefind();
  }, []);

  return <div id="docusaurus-pagefind-search" className="mb-10" style={{ minHeight: '40px' }} />;
};

export default CustomSearchBar;