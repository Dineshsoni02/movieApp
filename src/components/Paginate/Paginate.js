import React, { useRef, useEffect } from "react";

const Paginate = (props) => {
  const observingDiv = useRef();

  useEffect(() => {
    const observingElement = observingDiv.current;
    if (!observingElement) return;
    const observer = new IntersectionObserver((data) => {
      const isIntersecting = data[0].isIntersecting;
      if (props.onIntersection) props.onIntersection(isIntersecting);
    });

    observer.observe(observingElement);
    return () => {
      observer.unobserve(observingElement);
    };
  }, []);

  return (
    <div style={{ position: "relative", marginTop: "2rem" }}>
      {props.children}
      <div
        ref={observingDiv}
        style={{
          height: `${window.innerHeight * 0.5}px`,
          position: "absolute",
          bottom: "0",
        }}
      ></div>
    </div>
  );
};

export default Paginate;
