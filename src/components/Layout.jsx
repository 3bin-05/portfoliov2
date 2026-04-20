import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ContactStepper from "./ContactStepper";

function Layout({ children, isStylesPage = false }) {
  const [isStepperOpen, setIsStepperOpen] = useState(false);

  const openStepper = () => setIsStepperOpen(true);
  const closeStepper = () => setIsStepperOpen(false);

  return (
    <div id="page" className="s-pagewrap">
      <Header isStylesPage={isStylesPage} />
      <main>{children}</main>
      <Footer onOpenStepper={openStepper} />
      
      <ContactStepper 
        isOpen={isStepperOpen} 
        onClose={closeStepper} 
      />
    </div>
  );
}

export default Layout;
