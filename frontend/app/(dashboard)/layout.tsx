import { Navbar } from '@/app/components/layout/navbar';
import { Sidebar } from '@/app/components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          {children}
        </main>
      </div>
    </>
  );
}
