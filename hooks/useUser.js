"use client";
import { supabase } from "@/config/Subabase_Client";
import { useEffect, useState } from "react";

const useUser = () => {
  const [currentUser, setCurrentUser] = useState(null); // Set to null initially

  const catchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user ?? "no user");
  };

  useEffect(() => {
    if (!supabase) return;
    catchUser();
  }, []);

  return [currentUser];
};

export default useUser;
