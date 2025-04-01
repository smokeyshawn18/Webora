"use client";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/Subabase_Client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

function AddPage() {
  const router = useRouter();
  const [User] = useUser();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const addWebsite = async () => {
    if (!User?.id || website.trim() === "" || loading) {
      setError("User must be logged in.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("websites")
      .insert({
        website_name: website.trim(),
        user_id: User.id,
      })
      .select();

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setStep(2);
    setLoading(false);
  };

  const existingDomains = async () => {
    const { data: websites } = await supabase.from("websites").select("*");
    if (websites?.filter((item) => item.website_name === website).length > 0) {
      setError("Website already exists.");
    } else {
      setError("");
      addWebsite();
    }
  };

  useEffect(() => {
    if (
      website.includes("http") ||
      website.includes("https") ||
      website.includes("www") ||
      website.includes("://") ||
      website.includes(":") ||
      website.includes("/")
    ) {
      setError(
        "Please enter only the domain (e.g., example.com), without http/https/www."
      );
    } else {
      setError("");
    }
  }, [website]);

  const script = `<script defer data-domain="${website}" src="https://localhost:3000/tracking-script.js"></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-zinc-800">
      <Logo size="lg" />

      <div className="w-full max-w-2xl bg-zinc-900 p-10 md:p-16 rounded-3xl shadow-2xl mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Add Your Website
        </h1>

        {step === 1 ? (
          <div className="mt-10 space-y-6">
            <label className="block text-white text-lg font-semibold">
              Domain Name
            </label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value.trim().toLowerCase())}
              className="w-full p-5 text-lg text-white bg-black rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-600 placeholder:text-gray-500"
              placeholder="example.com"
            />
            {error && (
              <p className="text-red-400 font-semibold text-base">{error}</p>
            )}
            {!error && (
              <p className="text-gray-400 text-base">
                Only enter your domain (e.g. <strong>example.com</strong>).
              </p>
            )}
            <Button
              onClick={existingDomains}
              className="w-full py-5 text-lg font-bold bg-black hover:bg-zinc-700 rounded-xl transition"
            >
              {loading ? "Adding..." : "Add Website"}
            </Button>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <div className="relative">
              <textarea
                readOnly
                className="w-full text-white bg-black p-5 text-lg rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-zinc-600"
                rows={3}
                value={script}
              />
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 flex items-center gap-2 text-white bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-lg text-sm transition"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-400 text-base">
              Paste the above script into the <strong>&lt;head&gt;</strong> of
              your website for analytics.
            </p>
            <Button
              onClick={() => router.push(`/w/${website.trim()}`)}
              className="w-full py-5 text-lg font-bold bg-black hover:bg-zinc-700 rounded-xl transition"
            >
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPage;
