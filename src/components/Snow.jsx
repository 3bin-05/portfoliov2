import React, { useMemo } from 'react';

const Snow = ({ count = 50 }) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        "--i": i,
        "--j": Math.floor(Math.random() * 20),
      },
    }));
  }, [count]);

  return (
    <div className="snow-container">
      {snowflakes.map((flake) => (
        <span key={flake.id} style={flake.style}></span>
      ))}
    </div>
  );
};

export default React.memo(Snow);
