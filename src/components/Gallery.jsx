import React from "react";
import CircularGallery from "./CircularGallery";
function Gallery() {
  return (
    <section id="numbers" className="s-numbers">
      <div className="row">
        <div className="column xl-12">
          <div className="section-header" data-num="03">
            <h2 className="text-display-title">Gallery.</h2>
          </div>
        </div>
      </div>
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery
          bend={0}
          textColor="#000000ff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}

export default Gallery;
