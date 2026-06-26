import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-12 py-6 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">CivicPulse</span>
        </div>
        <span className="text-base text-gray-400">AI-powered Grievance Management</span>
      </header>

      {/* Split body */}
      <main className="flex flex-1 flex-col md:flex-row">

        {/* LEFT — Citizen */}
        <div className="flex-1 flex flex-col items-center justify-center px-20 py-28 bg-white border-b md:border-b-0 md:border-r border-gray-100">
          {/* Badge */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-5 py-2 text-sm font-medium text-blue-700 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Citizen
          </span>

          <h2 className="text-5xl font-semibold text-gray-900 text-center leading-tight mb-4">
            For <span className="italic font-serif">Citizens</span>
          </h2>

          <p className="text-lg text-gray-500 text-center max-w-sm leading-relaxed mb-12">
            Report civic issues, track complaint status, and help build a better city — all in one place.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-xl bg-gray-900 text-white text-base font-medium py-4 hover:bg-gray-800 active:bg-black transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-full rounded-xl border border-gray-200 text-gray-700 text-base font-medium py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Create account
            </button>
          </div>

          <p className="mt-10 text-sm text-gray-400 text-center">
            Free to use · No approval needed
          </p>
        </div>

        {/* RIGHT — Authority */}
        <div className="flex-1 flex flex-col items-center justify-center px-20 py-28 bg-gray-50">
          {/* Badge */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full bg-gray-200 border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" />
            Authority
          </span>

          <h2 className="text-5xl font-semibold text-gray-900 text-center leading-tight mb-4">
            For <span className="italic font-serif">Authorities</span>
          </h2>

          <p className="text-lg text-gray-500 text-center max-w-sm leading-relaxed mb-12">
            Manage complaints, update statuses, view analytics, and resolve civic issues across your jurisdiction.
          </p>

          {/* CTA — sign in only */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-xl bg-gray-900 text-white text-base font-medium py-4 hover:bg-gray-800 active:bg-black transition-colors"
            >
              Sign in
            </button>
          </div>

          <p className="mt-10 text-sm text-gray-400 text-center">
            Authority accounts are provisioned by admins
          </p>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;