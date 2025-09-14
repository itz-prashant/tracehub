"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  role: string;
  created_at: string;
  password: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);

  const fetchClients = async () => {
    const token = localStorage.getItem("authToken");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    const data: User[] = await res.json();
    const fliterClient = data.filter((user) => user.role !== "ADMIN");
    setClients(fliterClient);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button className=" bg-white px-2 py-1 text-black rounded cursor-pointer">
          Add client
        </button>
      </div>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="p-2 border">{client.id}</td>
              <td className="p-2 border">{client.email}</td>
              <td className="p-2 border">
                {new Date(client.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
