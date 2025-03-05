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
}: {
  children: React.ReactNode;
  width?: string;
  height?: string;
  borderRight?: boolean;
  gap?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      style={{
        ...blockStyles.block,
        width: width || "50%",
        height: height || "300px",
        gap: gap || "0.5rem",
        borderRight: borderRight ? "1px dashed rgba(0, 0, 0, 0.035)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
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
    alignItems: "center",
    gap: "0.5rem",
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
    fontWeight: 500,
  },
  colors: {
    primary: "rgba(0, 0, 0, 0.9)",
    secondary: "rgba(0, 0, 0, 0.5)",
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
    fontWeight: 500,
  },
};

const primaryStyles = {
  base: {
    color: subHeaderStyles.colors.primary,
    fontWeight: 500,
  },
};
