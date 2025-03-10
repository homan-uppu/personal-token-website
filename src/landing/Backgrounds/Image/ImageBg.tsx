export const ImageBg = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      // backgroundImage: "url(/images/sky.png)",
      // background: "rgba(0, 0, 0, 0.025)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.7,
      zIndex: -1,
      // filter: "invert(1) grayscale(1)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle at center, transparent 50%, rgba(255, 255, 255, 0.5) 100%)",
        zIndex: 1,
      }}
    ></div>
  </div>
);
