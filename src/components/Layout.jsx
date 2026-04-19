import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, isStylesPage = false }) {
  return (
    <div id="page" className="s-pagewrap">
      <Header isStylesPage={isStylesPage} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
