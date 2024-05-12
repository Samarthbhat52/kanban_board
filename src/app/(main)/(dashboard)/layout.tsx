import Sidebar from "../_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto px-4 pt-20 md:pt-24">
      <div className="flex gap-7">
        <div className="hidden w-64 shrink-0 md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};
export default DashboardLayout;
