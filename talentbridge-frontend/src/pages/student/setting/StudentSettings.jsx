import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../../../services/settings.service";

import SettingsSkeleton from "../../../components/settings/SettingsSkeleton";
import PersonalInformationCard from "../../../components/settings/PersonalInformationCard";
import StudentAcademicCard from "../../../components/settings/StudentAcademicCard";
import PasswordCard from "../../../components/settings/PasswordCard";

function StudentSettings() {

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [passwordLoading, setPasswordLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            name: "",
            email: "",

            phone: "",
            bio: "",

            college: "",
            degree: "",
            branch: "",

            graduationYear: "",

            skills: [],

            linkedinUrl: "",
            githubUrl: "",
            portfolioUrl: "",

        });

    const [passwordData, setPasswordData] =
        useState({

            currentPassword: "",

            newPassword: "",

            confirmPassword: "",

        });

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getProfile();

                setFormData({

                    name:
                        data.user.name,

                    email:
                        data.user.email,

                    ...data.profile,

                });

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load profile."

                );

            }

            finally {

                setLoading(false);

            }

        };

    const handleChange =
        (e) => {

            const {

                name,

                value,

            } = e.target;

            setFormData(

                (prev) => ({

                    ...prev,

                    [name]:

                        name === "skills"

                            ? value
                                .split(",")

                                .map(
                                    (skill) =>
                                        skill.trim()
                                )

                                .filter(Boolean)

                            : value,

                })

            );

        };

    const handlePasswordChange =
        (e) => {

            const {

                name,

                value,

            } = e.target;

            setPasswordData(

                (prev) => ({

                    ...prev,

                    [name]: value,

                })

            );

        };

    const handleProfileSave =
        async () => {

            try {

                setSaving(true);

                await updateProfile(
                    formData
                );

                toast.success(
                    "Profile updated successfully."
                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to update profile."

                );

            }

            finally {

                setSaving(false);

            }

        };

    const handlePasswordSave =
        async () => {

            if (

                passwordData.newPassword !==

                passwordData.confirmPassword

            ) {

                return toast.error(
                    "Passwords do not match."
                );

            }

            try {

                setPasswordLoading(
                    true
                );

                await changePassword({

                    currentPassword:
                        passwordData.currentPassword,

                    newPassword:
                        passwordData.newPassword,

                });

                toast.success(
                    "Password updated successfully."
                );

                setPasswordData({

                    currentPassword: "",

                    newPassword: "",

                    confirmPassword: "",

                });

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to update password."

                );

            }

            finally {

                setPasswordLoading(
                    false
                );

            }

        };

    if (loading) {

        return (
            <SettingsSkeleton />
        );

    }

    return (

        <div
            className="
                max-w-5xl
                space-y-8
            "
            style={{
                margin: "0 auto",
            }}
        >

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-slate-900
                    "
                >
                    Settings
                </h1>

                <p
                    className="
                        text-slate-500
                    "
                    style={{
                        marginTop: "0.5rem",
                    }}
                >
                    Manage your profile and account settings.
                </p>

            </div>

            <PersonalInformationCard

                role="STUDENT"

                formData={formData}

                onChange={handleChange}

            />

            <StudentAcademicCard

                formData={formData}

                onChange={handleChange}

            />

            <div
                className="
                    flex
                    justify-end
                "
            >

                <button
                    onClick={
                        handleProfileSave
                    }
                    disabled={saving}
                    className="
                        rounded-xl
                        bg-indigo-600
                        font-semibold
                        text-white
                        transition
                        hover:bg-indigo-700
                        disabled:opacity-50
                    "
                    style={{
                        padding: "0.75rem 1.5rem",
                    }}
                >

                    {saving

                        ? "Saving..."

                        : "Save Profile"}

                </button>

            </div>

            <PasswordCard

                passwordData={
                    passwordData
                }

                onChange={
                    handlePasswordChange
                }

                onSubmit={
                    handlePasswordSave
                }

                loading={
                    passwordLoading
                }

            />

        </div>

    );

}

export default StudentSettings;