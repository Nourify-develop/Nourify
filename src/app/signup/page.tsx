"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import app from "../../lib/firebaseConfig";
import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { registerUser } from "@/api/Register";
import FormInput from "@/components/auth/FormInput";
import AuthButton from "@/components/auth/AuthButton";
import SocialAuthButton from "@/components/auth/SocialAuthButton";
import {
  validateEmail,
  validatePassword,
  validateName,
  setCookie,
  handleAuthError,
} from "@/utils/auth-helper";

const SignUp = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);

  // Form validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: "",
    form: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {
      firstName: validateName(firstName, "First name"),
      lastName: validateName(lastName, "Last name"),
      email: validateEmail(email),
      password: validatePassword(password),
      terms: !agreeToTerms ? "You must agree to the terms and conditions" : "",
      form: "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        agreeToTerms,
      };

      const response = await registerUser(userData);

      // Show success message
      toast.success("Account created, routing to login", {
        duration: 3000,
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setAgreeToTerms(false);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error: any) {
      const errorMessage =
        typeof error === "string" ? error : handleAuthError(error);
      setErrors({ ...errors, form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const googleSigninData = await signInWithPopup(auth, provider);
      const user = googleSigninData.user;

      // Get the Firebase ID token
      const token = await user.getIdToken();
      const uid = user.uid;

      // Store token and ID in cookies
      setCookie("NOURIFY_TOKEN", token);
      setCookie("NOURIFY_ID", uid);

      // Prepare user data for Firestore
      const userData = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        uid: user.uid,
        image: user.photoURL,
        token,
      };

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      toast.success("Account created successfully!");

      // Redirect after a timeout
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      toast.error(errorMessage);
    }
  };

  return (
    <Wrapper className="flex w-full !h-screen lg:h-full !p-2 gap-6 bg-white">
      <section
        className="hidden h-auto lg:h-auto sm:flex flex-col gap-4 font-sans rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
        style={{
          backgroundImage: "url('/images/bg-1.jpg')",
        }}
      >
        <Typography.p className="text-white !text-2xl xl:!text-3xl font-bold">
          Welcome to Nourify, your trusted source for fresh groceries and
          pastries. Creating an account with us is the first step to enjoying a
          seamless shopping experience.
        </Typography.p>
        <Typography.s className="!text-sm text-white/80 pl-2.5 flex justify-start items-center gap-2.5 transition-opacity duration-1000">
          <img src="/general.svg" alt="General Icon" />
          Used by <span className="font-bold">15,000+</span> worldwide
        </Typography.s>
      </section>
      <section className="p-5 lg:p-7 pb-32 flex flex-col h-full gap-5 md:gap-6 w-full md:w-1/2">
        <Link href={`/`}>
          <Image
            src={`/NOURIFY.svg`}
            alt="Nourify logo"
            width={128}
            height={40}
          />
        </Link>
        <div className="flex flex-col w-full gap-3">
          <Typography.h2 className="!text-3xl !text-primary-2/90 !font-bold">
            Create an account
          </Typography.h2>
          <Typography.p className="!text-primary-2/70 !text-base font-medium ">
            Already have an account?{" "}
            <Link href={`/login`} className="text-secondary underline ">
              Log in{" "}
            </Link>
          </Typography.p>
        </div>
        <div className="flex flex-col gap-5">
          <SocialAuthButton
            onClick={handleGoogleSignIn}
            icon="/googleg logo 1.svg"
          >
            Continue with Google
          </SocialAuthButton>
        </div>
        <div className="flex gap-2 w-full items-center">
          <hr className=" w-full bg-primary-2" />
          <p className="text-xs text-primary-2/40">OR</p>
          <hr className="w-full !bg-primary-2/40" />
        </div>

        {errors.form && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          <div className="flex sm:flex-row flex-col gap-5 w-full">
            <FormInput
              label="First name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
              error={errors.firstName}
            />
            <FormInput
              label="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
              error={errors.lastName}
            />
          </div>

          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            icon="/mail-01.svg"
            error={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            icon="/lock-key.svg"
            isPassword
            passwordVisible={passwordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
            error={errors.password}
          />

          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <label className="text-gray text-sm leading-[16px]">
              I agree with Nourify's{" "}
              <Link href={``} className="text-secondary underline ">
                Terms of Service{" "}
              </Link>{" "}
              and{" "}
              <Link href={``} className="text-secondary underline ">
                Privacy Policy{" "}
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}

          <AuthButton type="submit" loading={loading}>
            Create account
          </AuthButton>
        </form>
      </section>
    </Wrapper>
  );
};

export default SignUp;
