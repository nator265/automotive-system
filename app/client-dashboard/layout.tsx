import ClientSideNav from "../components/ClientSideNav";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <ClientSideNav />
      <main className="flex-1 md:ml-64 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}
