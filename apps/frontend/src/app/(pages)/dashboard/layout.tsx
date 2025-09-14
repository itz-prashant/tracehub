import AuthGuard from "@/components/AuthGuard"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 h-[100vh]">
          <Header />
          <main className="p-4 h-[90vh]">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
