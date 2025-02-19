"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "@/components/typography";
import Wrapper from "@/layout/wrapper";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from "firebase/auth"; // Importing Firebase methods
import app from "@/lib/firebaseConfig"; // Firebase configuration
import { TailSpin } from "react-loader-spinner"; // Loading spinner component
//import { console } from "inspector";
import { signinUser } from "@/api/Signin";

const Login = () => {
  // State declarations
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);
  // Router and auth initialization
  const router = useRouter();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const userData = { email, password };
      const response = await signinUser(userData);
  
      if (response?.message === "success") {
        console.log("Login successful:", response);
  
        // Store ID and Token in cookies
        document.cookie = `NOURIFY_ID=${response.data._id}; path=/`;
        document.cookie = `NOURIFY_TOKEN=${response.token}; path=/`;
  
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(response?.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in.");
      toast.error("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };
  
  // Handle login with email and password
  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;

  //     if (!user.emailVerified) {
  //       await auth.signOut();
  //       toast.error("Please verify your email before logging in.");
  //       setLoading(false);
  //       return;
  //     }

  //     // Get the Firebase ID token
  //     const token = await user.getIdToken();

  //     // Fetch user data from Firestore
  //     const userDoc = await getDoc(doc(db, "users", user.uid));
  //     if (userDoc.exists()) {
  //       const userData = userDoc.data();

  //       // Add the token to the user data object
  //       const userDataWithToken = { ...userData, token };

  //       // Store the updated user data with the token in localStorage
  //       localStorage.setItem("userData", JSON.stringify(userDataWithToken));

  //       toast.success("Login successful!");

  //       setTimeout(() => {
  //         router.push("/");
  //       }, 2000);
  //     } else {
  //       throw new Error("User data not found.");
  //     }
  //   } catch (error: any) {
  //     handleError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle login with Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const googleSigninData = await signInWithPopup(auth, provider);
      const user = googleSigninData.user;

      // Get the Firebase ID token
      const token = await user.getIdToken();

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
        // Optionally save this new data to Firestore
        await setDoc(userDocRef, userData);
      }

      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Log user data to the console
      console.log("User Data:", userData);

      // Redirect after a timeout
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      toast.error("An error occurred while logging in with Google.");
    }
  };

  // Handle error messages based on error code
  const handleError = (error: any) => {
    switch (error.code) {
      case "auth/invalid-email":
        toast.error("Invalid email format.");
        break;
      case "auth/invalid-credential":
        toast.error("Invalid Credentials.");
        break;
      case "auth/user-not-found":
        toast.error("No user found with this email.");
        break;
      case "auth/wrong-password":
        toast.error("Incorrect password.");
        break;
      case "auth/network-request-failed":
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
        break;
      default:
        toast.error("An error occurred. Please try again.");
        break;
    }
  };
  return (
    <Wrapper className="flex w-full !h-screen lg:h-full  !p-2 gap-6 bg-white">
      <section
        className="hidden h-auto lg:h-auto md:flex flex-col gap-4 rounded-xl justify-end w-1/2 bg-cover bg-center p-7 relative"
        style={{
          backgroundImage: "url('/images/bg-login.png')",
        }}
      >
        <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black/50   top-0 left-0 rounded-xl z-0"></div>

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
            Don't have an account ?{" "}
            <Link href={`/signup`} className="text-secondary underline ">
              Sign Up{" "}
            </Link>
          </Typography.p>
        </div>
        <div className="flex flex-col gap-5">
          <button
            onClick={handleGoogleSignIn} // Handle Google sign-in
            className="w-full text-primary-2/70 flex justify-center gap-2 items-center py-3 bg-gray-1 hover:bg-gray-2 duration-300 rounded-[50px]"
          >
            <img src="/googleg logo 1.svg" alt="Google Logo" />
            Continue with Google
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className=" input-container flex flex-col gap-2 ">
            <label htmlFor="">Email Address</label>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" input-field placeholder:text-sm text-sm  px-12 w-full h-full rounded-[50px] focus:outline-0 appearance-none "
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
          <div className="flex gap-2 items-center text-sm justify-end text-secondary font-medium hover:underline hover:underline-offset-1">
            <Link href={``}>Forgot Password?</Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center items-center py-3.5 bg-secondary hover:bg-green-dark transition rounded-[60px] text-white "
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
              "Log in"
            )}
          </button>
        </form>
      </section>
    </Wrapper>
  );
};

export default Login;
