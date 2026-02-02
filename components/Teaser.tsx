import React from "react";

const Teaser: React.FC<{ blok?: any }> = ({ blok }) => {
  return (
    <section className="teaser">
      <h2 className="font-bold text-2xl">{blok?.headline}</h2>
      <p className="text-sm text-white/70">{blok?.description}</p>
    </section>
  );
};

export default Teaser;
