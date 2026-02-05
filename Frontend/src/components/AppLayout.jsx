import Navbar from "./Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
