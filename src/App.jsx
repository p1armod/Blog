import "./App.css";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;