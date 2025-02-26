import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EmailCapture: React.FC = () => {
  const [state, setState] = useState<"button" | "input" | "success">("button");
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state === "input" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state]);

  const handleButtonClick = () => {
    setState("input");
  };

  const handleSubmit = () => {
    if (email.trim() !== "") {
      setState("success");
      // Here you would typically send the email to your backend
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {state === "button" && (
          <motion.button
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.button}
            onClick={handleButtonClick}
          >
            Stay Updated
          </motion.button>
        )}

        {state === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, width: 120 }}
            animate={{ opacity: 1, width: 240 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.inputContainer}
          >
            <input
              ref={inputRef}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              style={styles.input}
            />
            <motion.button
              onClick={handleSubmit}
              style={styles.iconButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.6738 8.43445H0V6.69664H12.6738L7.20582 1.22863L8.43445 0L16 7.56555L8.43445 15.1311L7.20582 13.9025L12.6738 8.43445Z"
                  fill="black"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}

        {state === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            style={styles.successContainer}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              style={styles.checkmark}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  fill="#4CAF50"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  } as const,
  button: {
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    transition: "background-color 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  } as const,
  inputContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  } as const,
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "#f0f0f0",
  } as const,
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    backgroundColor: "#e0e0e0",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as const,
  successContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  } as const,
  checkmark: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as const,
};

export default EmailCapture;
