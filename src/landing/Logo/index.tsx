const Logo = () => {
  const styles = {
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontWeight: 460,
    },
    circle: {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      border: "2px solid var(--logo-green)",
    },
    text: {
      color: "var(--logo-green)",
    },
  };

  return (
    <div style={styles.logo}>
      <span style={styles.circle}></span>
      <span style={styles.text}>PersonalToken</span>
    </div>
  );
};

export default Logo;
