import Sidebar from "../../_components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-7">
      <div className="hidden w-56 shrink-0 md:block">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};
export default DashboardLayout;
