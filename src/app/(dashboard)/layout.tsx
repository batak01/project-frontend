import Sidebar from "@/features/admin/components/Sidebar";
import Footer from "@/features/admin/components/Footer";

import RequireAdmin from "@/features/admin/components/RequireAdmin";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <RequireAdmin>

      <div className="min-h-screen bg-slate-100 flex">


        <Sidebar />


        <div className="flex-1 flex flex-col">


          <main className="flex-1 p-6 lg:p-10 overflow-auto">

            {children}

          </main>


          <Footer />


        </div>


      </div>


    </RequireAdmin>
  );
}