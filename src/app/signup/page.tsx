"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import app from "../../lib/firebaseConfig"; // Firebase configuration
import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";

const SignUp = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        uid: user.uid,
      });

      // Send verification email
      await sendEmailVerification(user);
      toast.success("Verification email sent! Please check your inbox.");

      setTimeout(() => {
        toast.success("Redirecting to Login page.");
      }, 3000);
      setTimeout(() => {
        router.push("/login");
      }, 6000);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
      handleAuthError(error);
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
  
      // Prepare user data for Firestore
      const userData = {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ")[1] || "",
        email: user.email,
        uid: user.uid,
        image: user.photoURL,
        token, // Include the token in user data
      };
  
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), userData);
  
      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify(userData));
  
      // Log user data to the console
      console.log("User Data:", userData);
      // Redirect after a timeout
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
      handleAuthError(error);
    }
  };
  
  const handleAuthError = (error: any) => {
    switch (error.code) {
      case "auth/invalid-email":
        toast.error("Invalid email format.");
        break;
      case "auth/email-already-in-use":
        toast.error("This email is already in use.");
        break;
      case "auth/weak-password":
        toast.error("Password should be at least 6 characters.");
        break;
      case "auth/network-request-failed":
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
        break;
      case "auth/popup-closed-by-user":
        toast.error("Sign-in popup closed before completion.");
        break;
      case "auth/operation-not-allowed":
        toast.error("Google sign-in is not enabled.");
        break;
      default:
        toast.error("An error occurred. Please try again.");
        break;
    }
  };
  return (
    <Wrapper className="flex w-full !h-screen lg:h-full  !p-2 gap-6 bg-white">
      <section
        className="hidden
        h-auto lg:h-auto sm:flex flex-col gap-4 font-sans rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
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
      <section className="p-5 lg:p-10 pb-32 flex flex-col h-full gap-5 md:gap-6 w-full md:w-1/2">
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
            Already have an account ?{" "}
            <Link href={`/login`} className="text-secondary underline ">
              Log in{" "}
            </Link>
          </Typography.p>
        </div>
        <div className="flex flex-col gap-5">
          <button
            onClick={handleGoogleSignIn}
            className="w-full text-primary-2/70 flex justify-center gap-2 items-center py-3 bg-gray-1 hover:bg-gray-2 transition rounded-[50px]"
          >
            <img src="/googleg logo 1.svg" />
            Continue with Google
          </button>
        </div>
        <div className="flex gap-2 w-full items-center">
          <hr className=" w-full bg-primary-2" />
          <p className="text-xs text-primary-2/40">OR</p>
          <hr className="w-full !bg-primary-2/40" />
        </div>
        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          <div className="flex sm:flex-row flex-col gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field w-full px-5 py-3.5 placeholder:text-sm focus:outline-0 text-sm bg-gray-1 border border-gray-1 rounded-[50px]"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field w-full py-3.5 placeholder:text-sm focus:outline-0 text-sm bg-gray-1 border border-gray-1 px-5  rounded-[50px]"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <div className=" relative flex justify-start border border-gray-1 items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
              <span className="bg absolute left-5">
                <img src="/mail-01.svg" />
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <div className=" relative flex justify-start  items-center w-full  gap-2  rounded-[50px] h-12 transition-all  ">
              <span className="bg absolute left-5">
                <img src="/lock-key.svg" alt="Lock Icon" />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
                required
              />
              <span
                className="absolute right-5 text-[#1e1e1e85] !text-base cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <IoEyeOffOutline className="" />
                ) : (
                  <IoEyeOutline />
                )}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center ">
            <input type="checkbox" required />
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
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center items-center py-3.5 bg-secondary hover:bg-green-dark transition rounded-[60px] text-white text-base"
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="4"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Create account"
            )}
          </button>
        </form>
      </section>
      
    </Wrapper>
  );
};

export default SignUp;
