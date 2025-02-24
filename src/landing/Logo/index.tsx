const Logo = ({
  size = 16,
  fontWeight = 540,
  noCircle = false,
}: {
  size?: number;
  fontWeight?: number;
  noCircle?: boolean;
}) => {
  const styles = {
    logo: {
      display: "flex",
      alignItems: "center",
      gap: `${size / 4}px`,
      fontWeight,
    },
    circle: {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      border: `${size / 8}px solid var(--logo-green)`,
    },
    text: {
      color: "var(--logo-green)",
    },
  };

  return (
    <div style={styles.logo}>
      {!noCircle && <span style={styles.circle}></span>}
      <span style={styles.text}>PersonalToken</span>
    </div>
  );
};

export default Logo;
