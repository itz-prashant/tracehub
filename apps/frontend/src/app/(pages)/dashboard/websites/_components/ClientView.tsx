import React, { useEffect, useState } from 'react'
import AddWebsiteForm from './AddWebsiteForm';
import { API_URL } from '@/config/constant';

interface Website {
  id: number;
  name: string;
  url: string;
  script_key: string;
}

const ClientView = () => {
    const [websites, setWebsites] = useState<Website[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchWebsites = async () => {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/websites`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    const data: Website[] = await res.json();
    setWebsites(data);
  };

  useEffect(() => {
    fetchWebsites();
  }, []);
  return (
    <div className="p-8">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold">Websites</h1>


        <button
          className="bg-white px-2 py-1 text-black rounded cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          Add Website
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">URL</th>
            <th className="p-2 border">Script Key</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((site) => (
            <tr key={site.id}>
              <td className="p-2 border">{site.name}</td>
              <td className="p-2 border">{site.url}</td>
              <td className="p-2 border">
                <code>{`<script src="${API_URL}/tracking.js?id=${site.script_key}"></script>`}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <AddWebsiteForm
          onWebsiteAdded={() => {
            fetchWebsites();
            setShowForm(false);
          }}
        />
      )}
    </div>
  )
}

export default ClientView
