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
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientName, setClientName] = useState("");
  const [error, setError] = useState("");

  const fetchUserClients = async () => {
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

  // const fetchClients = async () => {
  //   const token = localStorage.getItem("authToken");

  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${token}`,
  //     },
  //   });

  //   const data = await res.json();
  //   console.log("data",data)
  // };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          email,
          clientName,
          password,
        }),
      });

      if (!userRes.ok) throw new Error("Failed to add client");

      // const userData = await userRes.json();

      // const clientRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients/`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `${token}`,
      //   },
      //   body: JSON.stringify({ clientName, user_id: userData.id }),
      // });

      // if (!clientRes.ok) throw new Error("Failed to create client");

      setEmail("");
      setPassword("");
      setClientName("");
      setShowForm(false);
      fetchUserClients();
    } catch (err) {
      if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong");
  }
    }
  };

  useEffect(() => {
    fetchUserClients();
    // fetchClients()
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button onClick={() => setShowForm(true)} className=" bg-white px-2 py-1 text-black rounded cursor-pointer">
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

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-black">
            <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleAddClient} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Client Name"
                className="p-2 border rounded"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Client Email"
                className="p-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Client Password"
                className="p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex justify-between">
                <button type="submit" className="bg-black cursor-pointer text-white p-2 rounded">
                  Create
                </button>

                <button
                  type="button"
                  className="bg-gray-300 p-2 rounded cursor-pointer"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
