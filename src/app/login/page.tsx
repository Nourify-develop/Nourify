"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "@/lib/firebaseConfig";
import { signinUser } from "@/api/Signin";
import FormInput from "@/components/auth/FormInput";
import AuthButton from "@/components/auth/AuthButton";
import SocialAuthButton from "@/components/auth/SocialAuthButton";
import {
  validateEmail,
  validatePassword,
  setCookie,
  handleAuthError,
} from "@/utils/auth-helper";

const Login = () => {
  // State declarations
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  const router = useRouter();
  const auth = getAuth(app);

  // Form validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
      form: "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = { email, password };
      const response = await signinUser(userData);

      if (response?.message === "Success") {
        // Store ID and Token in cookies
        setCookie("NOURIFY_ID", response.data._id);
        setCookie("NOURIFY_TOKEN", response.token);

        toast.success("Login successful");
        router.push("/");
      } else {
        setErrors({ ...errors, form: response?.message || "Login failed" });
        toast.error(response?.message || "Login failed");
      }
    } catch (err: any) {
      const errorMessage =
        typeof err === "string" ? err : "An error occurred while logging in.";
      setErrors({ ...errors, form: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle login with Google
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

      // Reference to Firestore document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData;

      if (userDoc.exists()) {
        // If user data exists in Firestore, get it
        userData = { ...userDoc.data(), token };
      } else {
        // If user data does not exist, prepare new data
        userData = {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
          token,
        };
        // Save this new data to Firestore
        await setDoc(userDocRef, userData);
      }

      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      toast.success("Login successful!");

      // Redirect after a timeout
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setErrors({ ...errors, form: errorMessage });
      toast.error(errorMessage);
    }
  };

  return (
    <Wrapper className="flex w-full !h-screen lg:h-full !p-2 gap-6 bg-white">
      <section
        className="hidden h-auto lg:h-auto md:flex flex-col gap-4 rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
        style={{
          backgroundImage: "url('/images/bg-login.png')",
        }}
      >
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/50 top-0 left-0 rounded-xl z-0"></div>

        <div className="relative z-10 space-y-4">
          <Typography.p className="text-white !text-3xl font-bold">
            Log in to continue your journey with fresh groceries and delicious
            pastries delivered straight to your door.
          </Typography.p>
          <Typography.s className="!text-sm !text-white/80 pl-2.5 !font-medium flex justify-start items-center gap-2.5 transition-opacity duration-1000">
            <img src="/general.svg" alt="General Icon" />
            Used by<span className="font-bold">15,000+</span>worldwide
          </Typography.s>
        </div>
        <div className="relative z-10 flex gap-1 justify-center items-center">
          <div className="w-10 h-1 rounded-full bg-gray-3"></div>
          <div className="w-36 h-1 rounded-full bg-white"></div>
        </div>
      </section>

      <section className="p-5 lg:p-10 pb-32 flex flex-col h-full gap-5 md:gap-6 w-full md:w-1/2">
        <Link href={"/"}>
          <Image
            src={`/NOURIFY.svg`}
            alt="Nourify logo"
            width={128}
            height={40}
          />
        </Link>
        <div className="flex flex-col w-full gap-3">
          <Typography.h2 className="!text-3xl !text-primary-2/90 !font-bold">
            Log into your account
          </Typography.h2>
          <Typography.p className="text-primary-2/70 text-base font-medium">
            Don't have an account?{" "}
            <Link href={`/signup`} className="text-secondary underline ">
              Sign Up{" "}
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
          <hr className="w-full bg-primary-2" />
          <p className="text-xs text-primary-2/40">OR</p>
          <hr className="w-full !bg-primary-2/40" />
        </div>

        {errors.form && (
          <div
            className=" border border-red text-red px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <FormInput
            label="Email Address"
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

          <div className="flex gap-2 items-center text-sm justify-end text-secondary font-medium hover:underline hover:underline-offset-1">
            <Link href={``}>Forgot Password?</Link>
          </div>

          <AuthButton type="submit" loading={loading}>
            Log in
          </AuthButton>
        </form>
      </section>
    </Wrapper>
  );
};

export default Login;
