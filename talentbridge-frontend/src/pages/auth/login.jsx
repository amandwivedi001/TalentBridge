import { Link } from "react-router-dom";
import AuthHero from "../../components/auth/AuthHero";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import Button from "../../components/ui/Button";

function Login() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:block">
          <AuthHero />
        </div>

        <div className="flex items-center justify-center px-6 py-12 lg:p-12">
          <AuthCard
            title="Welcome Back"
            subtitle="Sign in to continue your placement journey"
          >
            <form className="space-y-6">
              <AuthInput
                label="Email Address"
                type="email"
                placeholder="Enter your email"
              />

              <AuthInput
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

              <div className="flex justify-end -mt-2.5 mb-2">
                <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              <Button type="submit">
                Login
              </Button>
            </form>

            <p className="mt-8 text-center text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default Login;