"use client";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const [user] = useUser();
  useEffect(() => {
    if (!user) return;
    if (user === "no user") redirect("/signin");
  }, [user]);
  if (user === "no user") return <></>;
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* <aside className="w-64 bg-emerald-500 p-6 text-white min-h-screen hidden md:flex flex-col">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav className="mt-4 flex flex-col space-y-2">
          <Link href="/" className="hover:bg-emerald-600 p-2 rounded-lg">
            Home
          </Link>
          <Link href="/add" className="hover:bg-emerald-600 p-2 rounded-lg">
            Add Website
          </Link>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Websites</h2>
            <Link href="/add">
              <Button className="flex items-center bg-black text-white hover:bg-slate-700">
                <Plus className="mr-2" /> Add New
              </Button>
            </Link>
          </div>

          {/* Website Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* {websites.map((website) => (
              <Link key={website.id} to={`/w/${website.website_name}`}>
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-gray-800">{website.website_name}</h3>
                  <p className="text-sm text-gray-500 truncate">{website.url}</p>
                </div>
              </Link>
            ))} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
