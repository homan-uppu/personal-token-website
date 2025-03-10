interface LinesProps {
  width?: number;
  height?: number;
  lineSpacing?: number;
  lineColor?: string;
  direction?: boolean; // true = 45deg, false = -45deg
}

export const Lines = ({
  width = 400,
  height = 400,
  lineSpacing = 20,
  lineColor = "rgba(0, 0, 0, 0.025)",
  direction = true,
}: LinesProps) => {
  const angle = direction ? "45deg" : "-45deg";

  // Calculate background position to ensure the center line goes through corners
  // For a diagonal line to go from corner to corner, we need to adjust the background position
  const backgroundSize = `${lineSpacing * 2}px ${lineSpacing * 2}px`;
  const backgroundPosition = direction
    ? `${-lineSpacing}px ${-lineSpacing}px` // For 45deg (top-right to bottom-left)
    : `0px 0px`; // For -45deg (top-left to bottom-right)

  return (
    <div
      style={{
        ...styles.container,
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `repeating-linear-gradient(
          ${angle},
          ${lineColor} 0px,
          ${lineColor} 1px,
          transparent 1px,
          transparent ${lineSpacing}px
        )`,
        backgroundSize,
        backgroundPosition,
      }}
    >
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
    zIndex: 10,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    pointerEvents: "none" as const,
  },
};
