"use client"

import { useState } from "react";

interface AddWebsiteFormProps {
  onWebsiteAdded: () => void;
}

export default function AddWebsiteForm({ onWebsiteAdded }: AddWebsiteFormProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ name, url }),
      });
      console.log(res, "adadas")
      if (!res.ok) throw new Error("Failed to add website");

      setName("");
      setUrl("");
      onWebsiteAdded();
    } catch (err) {
        if(err instanceof Error){
      setError(err.message);
        }else{
            setError("Failed to add website")
        }

    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 w-96 text-black">
        <h2 className="text-xl font-bold">Add New Website</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Website Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border rounded w-full"
          required
        />
<div className="flex justify-between items-center">
            <button type="submit" className="bg-black text-white p-2 rounded ">Add Website</button>
        <button onClick={onWebsiteAdded}  className="bg-gray-300 p-2 rounded cursor-pointer">Cancel</button>
</div>
      </form>
    </div>
  );
}
