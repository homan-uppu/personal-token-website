import Image from "next/image";

export const Row = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return <div style={{ ...styles.row, ...style }}>{children}</div>;
};

const styles = {
  row: {
    position: "relative" as const,
    display: "flex",
    flexDirection: "row" as const,
    width: "100%",
    borderTop: "1px solid rgba(0, 0, 0, 0.035)",
  },
};
export const Block = ({
  children,
  width,
  height,
  borderRight,
  gap,
  style,
  centered,
  noPadding,
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  borderRight?: boolean;
  gap?: string;
  style?: React.CSSProperties;
  centered?: boolean;
  noPadding?: boolean;
}) => {
  return (
    <div
      style={{
        ...blockStyles.block,
        width: width || "50%",
        height: height || "300px",
        gap: gap || "0.5rem",
        borderRight: borderRight ? "1px dashed rgba(0, 0, 0, 0.035)" : "none",
        alignItems: centered ? "center" : "start",
        padding: noPadding ? "2rem" : "3rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const LandingImage = ({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div style={{ ...landingImageStyles.container, ...style }}>
      <Image src={src} alt={alt} fill style={landingImageStyles.image} />
    </div>
  );
};

const landingImageStyles = {
  container: {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
    objectPosition: "center",
    // objectFit: "cover" as const,
    // objectPosition: "center",
  },
};

// Update styles object to include block styles
const blockStyles = {
  block: {
    height: "300px",
    width: "50%",
    padding: "3rem",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "start",
    gap: "1rem",
  },
};

export const SubHeader = ({
  children,
  isPrimary = false,
  style,
}: {
  children: React.ReactNode;
  isPrimary?: boolean;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        ...subHeaderStyles.base,
        color: isPrimary
          ? subHeaderStyles.colors.primary
          : subHeaderStyles.colors.secondary,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const subHeaderStyles = {
  base: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 460,
  },
  colors: {
    primary: "rgba(0, 0, 0, 0.9)",
    secondary: "rgb(143 153 168)",
  },
};

export const Primary = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      style={{
        ...primaryStyles.base,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const GreenSpan = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      style={{
        ...greenSpanStyles.base,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const greenSpanStyles = {
  base: {
    color: "var(--logo-green)",
    fontWeight: 460,
  },
};

const primaryStyles = {
  base: {
    color: subHeaderStyles.colors.primary,
    fontWeight: 460,
  },
};

export const Body = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <span
      style={{
        ...bodyStyles.base,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

const bodyStyles = {
  base: {
    fontSize: "1rem",
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: 500,
  },
};
