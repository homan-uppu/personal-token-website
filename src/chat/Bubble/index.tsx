import React from "react";
import { Sender } from "@/util/chat";

interface BubbleFooter {
  label: string;
  link?: string;
}

interface BubbleProps {
  children?: React.ReactNode;
  footer: BubbleFooter;
  sender: Sender;
  isLoading?: boolean;
  showFooter?: boolean;
}

const Bubble: React.FC<BubbleProps> = ({
  children,
  footer,
  sender,
  isLoading = false,
  showFooter = false,
}) => {
  if (isLoading) {
    return (
      <div style={bubbleWrapperStyle}>
        <div style={bubbleStyle(sender)}>
          <div style={spinnerContainerStyle}>
            <div style={spinnerStyle} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={bubbleWrapperStyle}>
      <div style={bubbleStyle(sender)}>
        <div>{children}</div>
      </div>
      {showFooter && (
        <div style={footerContainerStyle}>
          {footer.link ? (
            <a href={footer.link} style={footerLabelStyle}>
              {footer.label}
            </a>
          ) : (
            <span style={footerLabelStyle}>{footer.label}</span>
          )}
        </div>
      )}
    </div>
  );
};

// ================== Styles ==================

const bubbleWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 480,
  marginBottom: 16,
};

const bubbleStyle = (sender: Sender): React.CSSProperties => ({
  background: sender === Sender.Homan ? "#fafafa" : "#fff",
  border: sender === Sender.Homan ? "none" : "1px solid rgba(0,0,0,0.03)",
  borderRadius: 16,
  padding: 16,
  boxShadow: sender === Sender.Homan ? undefined : "0 1px 2px rgba(0,0,0,0.03)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const footerContainerStyle: React.CSSProperties = {
  marginTop: 4,
};

const footerLabelStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#909093",
  textDecoration: "none",
  fontWeight: 400,
  marginLeft: 16,
};

const spinnerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 32,
  width: "100%",
};

const spinnerStyle: React.CSSProperties = {
  width: 24,
  height: 24,
  border: "3px solid #e0e0e0",
  borderTop: "3px solid #bdbdbd",
  borderRadius: "50%",
  animation: "bubble-spin 1s linear infinite",
};

export default Bubble;

// Add keyframes for spinner animation
const styleSheet =
  typeof window !== "undefined" ? document.createElement("style") : null;
if (styleSheet) {
  styleSheet.innerHTML = `
    @keyframes bubble-spin {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  `;
  document.head.appendChild(styleSheet);
}
