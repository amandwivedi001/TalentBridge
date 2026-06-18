import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, BriefcaseBusiness } from "lucide-react";

import AuthHero from "../../components/auth/AuthHero";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import Button from "../../components/ui/Button"; 
import { ROLES } from "../../constants/roles";

function Register() {
  const [role, setRole] = useState(ROLES.STUDENT);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="hidden lg:block">
          <AuthHero />
        </div>

        <div className="flex items-center justify-center px-6 py-12 lg:p-12">
          <AuthCard
            title="Create Account"
            subtitle="Start your placement journey today"
          >
            <form className="space-y-6">
              <AuthInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
              />

              <AuthInput
                label="Email Address"
                type="email"
                placeholder="Enter your email"
              />

              <AuthInput
                label="Password"
                type="password"
                placeholder="Create a secure password"
              />

              {/* Role Toggle Section */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Choose Your Role
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole(ROLES.STUDENT)}
                    className={`
                      flex h-14 items-center justify-center gap-2 rounded-2xl border font-medium transition-all duration-200
                      ${
                        role === ROLES.STUDENT
                          ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                      }
                    `}
                  >
                    <GraduationCap size={20} />
                    Student
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole(ROLES.RECRUITER)}
                    className={`
                      flex h-14 items-center justify-center gap-2 rounded-2xl border font-medium transition-all duration-200
                      ${
                        role === ROLES.RECRUITER
                          ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                      }
                    `}
                  >
                    <BriefcaseBusiness size={20} />
                    Recruiter
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit">
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-8">
              <p className="text-center text-slate-500 font-medium">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default Register;