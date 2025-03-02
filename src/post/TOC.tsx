"use client";

import fileStyles from "./TOC.module.css";

interface TOCProps {
  labels: string[];
}

const TOC = ({ labels }: TOCProps) => {
  const handleClick = (label: string) => {
    const id = label.toLowerCase().replace(/ /g, "-");
    const element = document.getElementById(id);
    if (element) {
      const offset = 96;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={styles.container}>
      {labels.map((label) => (
        <div
          key={label}
          onClick={() => handleClick(label)}
          className={fileStyles.label}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
};

export default TOC;
