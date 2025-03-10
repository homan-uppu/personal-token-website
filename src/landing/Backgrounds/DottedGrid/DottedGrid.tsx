interface DottedGridProps {
  width?: number;
  height?: number;
  dotSpacing?: number;
}

export const DottedGrid = ({
  width = 800,
  height = 600,
  dotSpacing = 20,
}: DottedGridProps) => {
  // Calculate background position to ensure dots are equally spaced from edges
  const bgPositionX = dotSpacing / 2 + "px";
  const bgPositionY = dotSpacing / 2 + "px";

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.dotsContainer,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          backgroundPosition: `${bgPositionX} ${bgPositionY}`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {/* The dots are created using a background pattern */}
      </div>
      <div
        style={{
          ...styles.overlay,
          width: `${width}px`,
          height: `${height}px`,
        }}
      ></div>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    overflow: "hidden",
  },
  dotsContainer: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    backgroundImage: `
      radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)
    `,
    opacity: 0.7,
  },
  overlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    background: "rgba(255, 255, 255, 0.3)",
    pointerEvents: "none" as const,
  },
};
