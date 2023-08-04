import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewForm from "./pages/ViewForm";
import EditForm from "./pages/EditForm";
import CreateForm from "./pages/CreateForm";
import DeletePopup from "./components/DeletePopup";
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./components/AuthLayout";
import Navbar from "./components/Navbar";
import SharedForm from "./pages/SharedForm";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path=":formId">
            <Route index element={<ViewForm />} />
            <Route path="edit" element={<EditForm />} />
            <Route path="delete" element={<DeletePopup />} />
          </Route>
          <Route path="create" element={<CreateForm />} />
        </Route>

        <Route path="/shared-form/:shareableLink" element={<SharedForm />} />
      </Route>
    </Route>
  )
);
