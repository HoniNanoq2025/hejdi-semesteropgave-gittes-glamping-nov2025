import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Activities from "./pages/Activities/Activities";
import Contact from "./pages/Contact/Contact";
import Stays from "./pages/Stays/Stays";
import StayDetails from "./pages/StayDetails/StayDetails";
import MyList from "./pages/MyList/MyList";
import Backoffice from "./pages/BackOffice/Backoffice";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stays" element={<Stays />} />
          <Route path="/stay/:id" element={<StayDetails />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/backoffice" element={<Backoffice />} />
        </Routes>
      </main>
    </div>
  );
}
