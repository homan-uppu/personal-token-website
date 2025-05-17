import React from "react";

interface LogoCircleProps {
  size?: number;
}

const LogoCircle: React.FC<LogoCircleProps> = ({ size = 16 }) => {
  // The original SVG is 20x21, so scale accordingly
  const width = size * 1.25; // 20/16 = 1.25
  const height = size * 1.3125; // 21/16 = 1.3125
  const circleRadius = (8.9 / 20) * width;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={logoCircleStyles.svg}
    >
      <circle cx="10" cy="10.5" r="8.9" stroke="#04AB46" strokeWidth="1.8" />
    </svg>
  );
};

const Logo = ({
  size = 16,
  fontWeight = 460,
  noCircle = false,
}: {
  size?: number;
  fontWeight?: number;
  noCircle?: boolean;
}) => {
  return (
    <div style={logoStyles.logo(size, fontWeight)}>
      {!noCircle && <LogoCircle size={size} />}
      <span style={logoStyles.text}>personalToken</span>
    </div>
  );
};

// Styles
const logoStyles = {
  logo: (size: number, fontWeight: number) => ({
    display: "flex",
    alignItems: "center",
    gap: `${size / 4}px`,
    fontWeight,
  }),
  text: {
    color: "var(--logo-green)",
    fontSize: 15,
  },
};

const logoCircleStyles = {
  svg: {
    display: "block",
  },
};

export { LogoCircle };
export default Logo;
