const Logo = ({
  size = 16,
  fontWeight = 460,
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
    text: {
      color: "var(--logo-green)",
    },
  };

  return (
    <div style={styles.logo}>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10.5" r="8.9" stroke="#04AB46" strokeWidth="1.8" />
      </svg>

      <span style={styles.text}>personalToken</span>
    </div>
  );
};

export default Logo;
