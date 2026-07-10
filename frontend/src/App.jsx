import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";

import Analytics from "./pages/Analytics";


function App() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>

        <Route index element={<Dashboard />} />

        <Route
          path="analytics/:id"
          element={<Analytics />}
        />

      </Route>

    </Routes>
  );
}

export default App;
