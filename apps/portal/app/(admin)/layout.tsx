import { requireAdmin } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen flex bg-parchment">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar email={user.email || ""} />
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
