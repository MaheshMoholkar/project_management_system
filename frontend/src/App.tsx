import { Route, Routes } from "react-router-dom";
import Projects from "./pages/ProjectList";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="project-list" element={<Projects />} />
            <Route path="create-project" element={<CreateProject />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
