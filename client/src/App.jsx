import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import Home from "./components/home";
import AdminHomepage from "./components/AdminHomepage";
import Dashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 👇 separate pages */}
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
         <Route path="/dashboard" element={<Dashboard />} />
        {/* 👇 home or protected page */}
        <Route path="/" element={<AdminHomepage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
