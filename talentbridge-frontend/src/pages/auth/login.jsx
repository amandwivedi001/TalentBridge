import { Link, useNavigate } from "react-router-dom";
import AuthHero from "../../components/auth/AuthHero";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import Button from "../../components/ui/Button";
import {
    loginUser,
    getCurrentUser,
} from "../../services/auth.service";

import {
    setUser,
} from "../../features/auth/authSlice";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";


function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await loginUser({
                email,
                password,
            });

            const user =
                await getCurrentUser();

            dispatch(setUser(user));

            toast.success(
                "Login successful"
            );

            if (
                user.role === "STUDENT"
            ) {
                navigate(
                    "/student/dashboard"
                );
            } else if (
                user.role === "RECRUITER"
            ) {
                navigate(
                    "/recruiter/dashboard"
                );
            }

        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Login failed"
            );
        }
    }
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AuthInput
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <AuthInput
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
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