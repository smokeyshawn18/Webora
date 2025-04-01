"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Subabase_Client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function SignInPage() {
  const router = useRouter();

  const signin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const catchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (user.role === "authenticated") router.push("/dashboard");
    }
  };

  useEffect(() => {
    if (!supabase) return;
    catchUser();
  }, [supabase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 px-4 sm:px-6 md:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-semibold text-white">
          Welcome to{" "}
          <span className="text-blue-600">Webora - Your Website Analyzer</span>
        </h1>
      </div>

      <Button
        onClick={signin}
        className="flex items-center cursor-pointer justify-center space-x-3 px-8 py-8 bg-blue-800 text-xl text-white font-semibold rounded-xl shadow-xl transition duration-300 hover:bg-blue-700 active:scale-95 focus:ring-4 focus:ring-blue-300"
      >
        <span>Sign in with Google</span>
      </Button>

      <p className="text-sm sm:text-base mt-6 text-center text-gray-400">
        By signing in, you agree to our{" "}
        <span className="text-blue-500">terms</span> and{" "}
        <span className="text-blue-500">privacy policy</span>.
      </p>
    </div>
  );
}

export default SignInPage;
