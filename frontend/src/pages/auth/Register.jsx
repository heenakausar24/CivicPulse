import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const GREEN = "#00b050";
const GREEN_DARK = "#009940";
const GREEN_FOCUS_SHADOW = "rgba(0,176,80,0.12)";

const styles = {
  page: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
  },

  // LEFT PANEL — image side
  left: {
    flex: "1 1 48%",
    minWidth: "320px",
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

  // RIGHT PANEL — form side
  right: {
    flex: "1 1 52%",
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: "80px 40px",
    backgroundColor: "#ffffff",
  },

  formCard: {
    width: "100%",
    maxWidth: "750px",
    backgroundColor: "#f9fafb",
    borderRadius: "20px",
    padding: "42px 32px",
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

  // Two-column row for Name + Phone
  fieldRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "24px",
  },
  fieldHalf: {
    flex: "1 1 300px",
    minWidth: "0",
  },

  fieldGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "20px",
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
    fontSize: "17px",
    pointerEvents: "none",
    lineHeight: 1,
  },
  input: {
    width: "100%",
    padding: "14px 16px 14px 46px",
    fontSize: "18px",
    color: "#111827",
    backgroundColor: "#ffffff",
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },

  // Password strength bar
  strengthWrap: {
    marginTop: "10px",
    display: "flex",
    gap: "6px",
  },
  strengthBar: (filled, color) => ({
    flex: 1,
    height: "4px",
    borderRadius: "99px",
    backgroundColor: filled ? color : "#e5e7eb",
    transition: "background-color 0.25s",
  }),
  strengthLabel: (color) => ({
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: "500",
    color: color,
  }),

  termsRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "28px",
    marginTop: "4px",
  },
  checkbox: {
    width: "17px",
    height: "17px",
    marginTop: "2px",
    accentColor: GREEN,
    cursor: "pointer",
    flexShrink: 0,
  },
  termsText: {
    fontSize: "15px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  termsLink: {
    color: GREEN,
    fontWeight: "500",
    textDecoration: "none",
  },

  btn: {
    width: "100%",
    padding: "15px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#ffffff",
    backgroundColor: GREEN,
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    letterSpacing: "0.2px",
    transition: "background-color 0.15s",
  },

  signinText: {
    marginTop: "28px",
    fontSize: "20px",
    color: "#6b7280",
    textAlign: "center",
  },
  signinLink: {
    color: GREEN,
    fontWeight: "600",
    textDecoration: "none",
  },
};

// ── Password strength helper ──────────────────────────────────────────────────
function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "", color: "" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f59e0b" },
    { label: "Good", color: "#3b82f6" },
    { label: "Strong", color: GREEN },
  ];
  return { score, ...map[score] };
}



// ── Component ─────────────────────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const strength = getStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return alert("Please accept the Terms & Privacy Policy to continue.");

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok) {
        return alert(result?.message || "Sign up failed. Please try again.");
      }

      const token = result?.data?.accessToken;
      if (token) localStorage.setItem("accessToken", token);

      alert(`Account created for ${form.name}. Redirecting to Home.`);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Unable to complete signup. Check your network and try again.");
    }
  };

  const inputStyle = (field) => ({
    ...styles.input,
    borderColor: focused === field ? GREEN : "#e5e7eb",
    boxShadow: focused === field ? `0 0 0 3px ${GREEN_FOCUS_SHADOW}` : "none",
  });

  const focus = (f) => () => setFocused(f);
  const blur = () => setFocused(null);

  return (
    <div style={styles.page}>
      {/* ── LEFT: IMAGE PANEL ── */}
      <div style={styles.left}>
        {/* Replace src with your image, e.g. src="/register-bg.jpg" */}
        <img src="" alt="" style={styles.image} />
      </div>

      {/* ── RIGHT: FORM ── */}
      <div style={styles.right}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#111827' }}>
            Public Research Platform
          </div>
          <div style={{ marginTop: '8px', color: '#6b7280' }}>
            Register to start managing your literature and experiments.
          </div>
        </div>
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Create account</h1>
          <p style={styles.subheading}>Create an account — it's free to get started.</p>

          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" name="username" autoComplete="username" value="" style={{ display: 'none' }} readOnly />
            <input type="password" name="password" autoComplete="new-password" value="" style={{ display: 'none' }} readOnly />

            {/* Name + Phone — side by side */}
            <div style={styles.fieldRow}>
              {/* Full Name */}
              <div style={styles.fieldHalf}>
                <label style={styles.label} htmlFor="name">Full name</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>👤</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={set("name")}
                    onFocus={focus("name")}
                    onBlur={blur}
                    style={inputStyle("name")}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div style={styles.fieldHalf}>
                <label style={styles.label} htmlFor="phone">Phone</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.icon}>📞</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 xxxxx xxxxx"
                    value={form.phone}
                    onChange={set("phone")}
                    onFocus={focus("phone")}
                    onBlur={blur}
                    style={inputStyle("phone")}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <div style={styles.inputWrapper}>
                <span style={styles.icon}>✉</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  onFocus={focus("email")}
                  onBlur={blur}
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
                  name="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={set("password")}
                  onFocus={focus("password")}
                  onBlur={blur}
                  style={{ ...inputStyle("password"), paddingRight: "48px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#9ca3af",
                    padding: 0,
                    lineHeight: 1,
                  }}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>

              {/* Strength meter */}
              {form.password && (
                <>
                  <div style={styles.strengthWrap}>
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        style={styles.strengthBar(strength.score >= n, strength.color)}
                      />
                    ))}
                  </div>
                  <p style={styles.strengthLabel(strength.color)}>{strength.label}</p>
                </>
              )}
            </div>

            {/* Terms */}
            <div style={styles.termsRow}>
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="terms" style={styles.termsText}>
                I agree to the{" "}
                <a href="#" style={styles.termsLink}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" style={styles.termsLink}>Privacy Policy</a>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={styles.btn}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
            >
              Create account
            </button>

            

          </form>

          <p style={styles.signinText}>
  Already have an account?{" "}
  <span
    style={{ ...styles.signinLink, cursor: "pointer" }}
    onClick={() => navigate("/login")}
  >
    Sign in
  </span>
</p>
        </div>
      </div>
    </div>
  );
}