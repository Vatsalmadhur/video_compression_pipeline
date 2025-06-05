import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Watch from "./pages/Watch";

export default function App() {
  return (
<>
<Navbar/>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:hash" element={<Watch />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
