import { useState } from "react";
import { Eye, LockKeyhole } from "lucide-react";

function AuthLayout({ type, setActivePage }) {
  const isSignup = type === "signup";
  const isLogin = type === "login";
  const isRecover = type === "recover";
  const isReset = type === "reset";

  return (
    <div className="min-h-screen bg-[#199a42] px-10 py-10">
      <div className="grid min-h-[calc(100vh-80px)] grid-cols-2 items-center gap-10">
        <AuthIllustration />

        <div className="flex justify-center">
          <div
            className={`w-[540px] rounded-xl bg-white px-16 shadow-xl ${
              isSignup || isLogin ? "py-20" : "py-24"
            }`}
          >
            {(isRecover || isReset) && (
              <div className="mb-10 flex justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-50">
                  <LockKeyhole size={62} className="text-yellow-500" />
                </div>
              </div>
            )}

            <h1 className="mb-8 text-center text-[28px] font-bold text-gray-800">
              {isSignup && "Create Account"}
              {isLogin && "Login To Your Account"}
              {isRecover && "Recover Your Password"}
              {isReset && "Reset Your Password"}
            </h1>

            {(isSignup || isLogin) && (
              <>
                <button className="mb-7 flex h-11 w-full items-center justify-center gap-4 rounded-xl border border-gray-200 text-[14px] font-semibold text-gray-600">
                  <span className="text-lg font-bold text-blue-500">G</span>
                  {isSignup ? "Sign Up with Google" : "Login with Google"}
                </button>

                <div className="mb-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[11px] uppercase text-gray-300">
                    {isSignup ? "Or sign up with email" : "Or login with email"}
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
              </>
            )}

            {isSignup && (
              <InputBox label="Full Name" value="Regina Cooper" />
            )}

            <InputBox label="Email" value="cooper@example.com" />

            {(isSignup || isLogin || isReset) && (
              <PasswordBox label="Password" value="••••••••" />
            )}

            {(isSignup || isReset) && (
              <PasswordBox label="Confirm Password" value="••••••••" />
            )}

            {isSignup && (
              <label className="mb-6 mt-5 flex items-center gap-2 text-[13px] text-gray-500">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-[#199a42]"
                />
                I accept{" "}
                <span className="font-medium text-[#199a42]">
                  Terms and Conditions
                </span>
              </label>
            )}

            {isLogin && (
              <div className="mb-6 mt-5 flex items-center justify-between text-[13px]">
                <label className="flex items-center gap-2 text-gray-500">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-[#199a42]"
                  />
                  Remember Me
                </label>

                <button
                  type="button"
                  onClick={() => setActivePage("recover")}
                  className="font-medium text-[#199a42]"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (isRecover) setActivePage("reset");
                else setActivePage("dashboard");
              }}
              className="h-12 w-full rounded-xl bg-[#199a42] text-[14px] font-bold text-white"
            >
              {isSignup && "Create Account"}
              {isLogin && "Log In"}
              {isRecover && "Recover Password"}
              {isReset && "Reset Password"}
            </button>

            <div className="mt-24 text-center text-[13px] text-gray-400">
              {isSignup && (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActivePage("login")}
                    className="font-medium text-[#199a42]"
                  >
                    Login
                  </button>
                </>
              )}

              {isLogin && (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActivePage("signup")}
                    className="font-medium text-[#199a42]"
                  >
                    Sign Up
                  </button>
                </>
              )}

              {(isRecover || isReset) && (
                <>
                  Go back to{" "}
                  <button
                    type="button"
                    onClick={() => setActivePage("login")}
                    className="font-medium text-[#199a42]"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputBox({ label, value }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-[13px] font-medium text-gray-400">
        {label}
      </label>

      <input
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[14px] text-gray-700 outline-none"
      />
    </div>
  );
}

function PasswordBox({ label, value }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-5">
      <label className="mb-2 block text-[13px] font-medium text-gray-400">
        {label}
      </label>

      <div className="flex h-11 items-center rounded-xl border border-gray-200 px-4">
        <input
          type={show ? "text" : "password"}
          defaultValue={value}
          className="flex-1 text-[14px] text-gray-700 outline-none"
        />

        <button type="button" onClick={() => setShow(!show)}>
          <Eye size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

function AuthIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative h-[520px] w-[620px]">
        <div className="absolute left-[120px] top-[130px] h-[230px] w-[360px] -rotate-12 rounded-xl bg-[#dfe5f1] shadow-2xl">
          <div className="mx-auto mt-6 h-[160px] w-[300px] rounded-lg bg-white p-5">
            <div className="mb-3 h-4 w-40 rounded bg-gray-200" />
            <div className="mb-3 h-4 w-56 rounded bg-gray-200" />
            <div className="mb-3 h-4 w-44 rounded bg-gray-200" />
            <div className="mt-8 flex items-end gap-3">
              <span className="h-10 w-5 rounded bg-yellow-400" />
              <span className="h-20 w-5 rounded bg-yellow-400" />
              <span className="h-14 w-5 rounded bg-yellow-400" />
              <span className="h-28 w-5 rounded bg-yellow-400" />
            </div>
          </div>

          <div className="absolute bottom-[-80px] left-0 h-[90px] w-[360px] rounded-b-xl bg-[#1f2937]" />
        </div>

        <div className="absolute bottom-[40px] left-[270px] h-[95px] w-[250px] rotate-[-18deg] rounded-lg bg-white shadow-xl">
          <div className="m-5 h-3 w-40 rounded bg-gray-200" />
          <div className="mx-5 h-3 w-28 rounded bg-gray-200" />
        </div>

        <Person className="left-[45px] top-[230px]" />
        <Person className="left-[120px] bottom-[20px]" />
        <Person className="right-[80px] top-[230px]" />
        <Person className="right-[140px] bottom-[35px]" />

        <div className="absolute left-[40px] top-[320px] h-14 w-14 bg-yellow-400" />
        <div className="absolute left-[85px] top-[250px] h-24 w-14 bg-yellow-400" />
      </div>
    </div>
  );
}

function Person({ className }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="mx-auto h-8 w-8 rounded-full bg-[#2f275f]" />
      <div className="mt-1 h-20 w-8 rounded-t-full bg-white" />
      <div className="h-16 w-3 bg-[#263238]" />
    </div>
  );
}

function SignupPage({ setActivePage }) {
  return <AuthLayout type="signup" setActivePage={setActivePage} />;
}

function LoginPage({ setActivePage }) {
  return <AuthLayout type="login" setActivePage={setActivePage} />;
}

function RecoverPasswordPage({ setActivePage }) {
  return <AuthLayout type="recover" setActivePage={setActivePage} />;
}

function ResetPasswordPage({ setActivePage }) {
  return <AuthLayout type="reset" setActivePage={setActivePage} />;
}

export { SignupPage, LoginPage, RecoverPasswordPage, ResetPasswordPage };