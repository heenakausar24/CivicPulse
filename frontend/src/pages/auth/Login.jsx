import { useState } from "react";

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
  },

  // LEFT PANEL — form side
  left: {
    flex: "0 0 52%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "80px 96px",
    backgroundColor: "#ffffff",
  },

  logo: {
    marginBottom: "64px",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    color: "#1a1a1a",
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  logoAccent: {
    color: "#00b050",
  },
  logoSquare: {
    display: "inline-block",
    width: "13px",
    height: "13px",
    backgroundColor: "#00b050",
    marginLeft: "4px",
    borderRadius: "3px",
  },

  formCard: {
    width: "100%",
    maxWidth: "650px",
    backgroundColor: "#f9fafb",
    borderRadius: "20px",
    padding: "52px 48px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)",
  },

  heading: {
    fontSize: "40px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
    letterSpacing: "-0.3px",
  },
  subheading: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "40px",
  },

  fieldGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "25px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: "16px",
    color: "#9ca3af",
    fontSize: "18px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "14px 16px 14px 46px",
    fontSize: "15px",
    color: "#111827",
    backgroundColor: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },

  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "28px",
    marginTop: "6px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: "#374151",
    cursor: "pointer",
  },
  checkbox: {
    width: "17px",
    height: "17px",
    accentColor: "#00b050",
    cursor: "pointer",
  },
  forgotLink: {
    fontSize: "20px",
    color: "#00b050",
    textDecoration: "none",
    fontWeight: "500",
  },

  btn: {
    width: "100%",
    padding: "15px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    backgroundColor: "#00b050",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    letterSpacing: "0.2px",
    transition: "background-color 0.15s",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    margin: "24px 0",
    color: "#9ca3af",
    fontSize: "14px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e5e7eb",
  },

  googleBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#374151",
    backgroundColor: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "border-color 0.15s, background-color 0.15s",
  },

  signupText: {
    marginTop: "28px",
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
  },
  signupLink: {
    color: "#00b050",
    fontWeight: "600",
    textDecoration: "none",
  },

  // RIGHT PANEL — image only
  right: {
    flex: "0 0 48%",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#f0f4f1",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in as ${email}`);
  };

  const inputStyle = (field) => ({
    ...styles.input,
    borderColor: focusedField === field ? "#00b050" : "#e5e7eb",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(0,176,80,0.1)" : "none",
  });

  return (
    <div style={styles.page}>
      {/* ── LEFT: FORM ── */}
      <div style={styles.left}>
        {/* Logo */}
        

        {/* Form card */}
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Welcome back</h1>
          <p style={styles.subheading}>Sign in to CivicPulse </p>

          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Email */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <div style={styles.inputWrapper}>
                <span style={styles.icon}>✉</span>
                <input
                  id="email"
                  type="email"
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("email")}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="password">Password</label>
              <div style={styles.inputWrapper}>
                <span style={styles.icon}>🔒</span>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle("password"), paddingRight: "48px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#9ca3af",
                    padding: "0",
                    lineHeight: 1,
                  }}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember + forgot */}
            <div style={styles.row}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={styles.checkbox}
                />
                Remember me
              </label>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            <button
              type="submit"
              style={styles.btn}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#009940")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00b050")}
            >
              Sign in
            </button>

            {/* <div style={styles.divider}>
              <div style={styles.dividerLine} />
              or
              <div style={styles.dividerLine} />
            </div>

            <button
              type="button"
              style={styles.googleBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
            >
              <GoogleIcon />
              Continue with Google
            </button> */}
          </form>

          <p style={styles.signupText}>
            Don't have an account?{" "}
            <a href="#" style={styles.signupLink}>Sign up free</a>
          </p>
        </div>
      </div>

      {/* ── RIGHT: IMAGE PANEL ── */}
      <div style={styles.right}>
        {/* Replace the src below with your image path, e.g. src="/your-image.jpg" */}
        <img
          src=""
          alt=""
          style={styles.image}
        />
      </div>
    </div>
  );
}