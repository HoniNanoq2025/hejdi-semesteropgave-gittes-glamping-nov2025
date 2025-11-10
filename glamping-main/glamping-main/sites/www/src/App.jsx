import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/CSSFooter";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import Activities from "./pages/Activities/Activities";
import Contact from "./pages/Contact/Contact";
import Stays from "./pages/Stays/Stays";
import StayDetails from "./pages/StayDetails/StayDetails";
import ActivityDetails from "./pages/ActivityDetails/ActivityDetails";
import MyList from "./pages/MyList/MyList";
import Backoffice from "./pages/BackOffice/Backoffice";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import MessageSent from "./components/MessageSent/MessageSent";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

export default function App() {
  const location = useLocation();
  const hideHeaderFooter = [
    "/message-sent",
    "/backoffice",
    "/unauthorized",
  ].includes(location.pathname);
  return (
    <div className={styles.app}>
      {/* ! = hvis du er på message-sent eller backoffice er hideHeaderFooter = true, ellers er den false */}
      {!hideHeaderFooter && <Header />}

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activity/:id" element={<ActivityDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/stay/:id" element={<StayDetails />} />
          <Route
            path="/mylist"
            element={
              <ProtectedRoute allowedRoles={["guest", "admin"]}>
                <MyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/backoffice"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Backoffice />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/message-sent" element={<MessageSent />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}
