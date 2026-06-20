import React from "react";

 export default function ThreatMap() {
  return (
    <section id="threatmap" className="threatmap">
  <div className="threatmap__container">

    {/* Canvas background */}
    <ThreatMapCanvas />

    {/* Iframe */}
    <iframe
      src="https://threatmap.bitdefender.com/"
      title="Live Cyber Threat Map"
      className="threatmap__iframe"
    />


  </div>
</section>
  );
}