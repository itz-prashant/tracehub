"use client"
import AdminView from "./_components/AdminView"
import ClientView from "./_components/ClientView"


const page = () => {
const userRole = localStorage.getItem('userRole')
 
  return userRole === 'ADMIN' ? <AdminView /> : <ClientView />
}

export default page
