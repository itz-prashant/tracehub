"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    router.push("/auth/login");
  };
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  return (
    <aside className="w-64 bg-black border-r border-white text-white h-screen">
      <h1 className="text-3xl font-bold mb-12 border-b p-6">Trace Hub</h1>
      <div className="flex flex-col justify-between h-[80vh]">
        <nav className="flex flex-col gap-5">
          <Link href="/dashboard" className="border-b pb-5 px-5">
            Home
          </Link>
          {/* Admin sees these links */}
          {userRole === "ADMIN" && (
            <>
              <Link href="/dashboard/clients" className="border-b pb-5 px-5">
                Clients
              </Link>
              <Link href="/dashboard/websites" className="border-b pb-5 px-5">
                Websites
              </Link>
              <Link href="/dashboard/analytics" className="border-b pb-5 px-5">
                Analytics
              </Link>
              <Link href="/dashboard/settings" className="border-b pb-5 px-5">
                Settings
              </Link>
            </>
          )}

          {/* Client sees only limited links */}
          {userRole === "CLIENT" && (
            <>
              <Link href="/dashboard/websites" className="border-b pb-5 px-5">
                Websites
              </Link>
              <Link href="/dashboard/analytics" className="border-b pb-5 px-5">
                Analytics
              </Link>
            </>
          )}
        </nav>
        <button
          onClick={handleLogout}
          className=" bg-white p-2 text-black rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
