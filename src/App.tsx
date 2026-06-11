import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/HomePage/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
