import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewSectionsPage from "./pages/NewSectionsPage";
import PersonalDataPage from "./pages/sectionPages/PersonalDataPage";
import EducationPage from "./pages/sectionPages/EducationPage";
import WorkExperiencePage from "./pages/sectionPages/ExperiencePage";
import LanguagesPage from "./pages/sectionPages/LanguagesPage";
import AchievementsPage from "./pages/sectionPages/AchievementsPage";
import PersonalProjectsPage from "./pages/sectionPages/PersonalProjects";
import FinalCV from "./pages/FinalCV";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<HomePage />} />
          <Route path="/final-cv" element={<FinalCV />} />
          <Route path="/add-sections" element={<NewSectionsPage />} />
          <Route
            path="/add-sections/personal-data"
            element={<PersonalDataPage />}
          />
          <Route path="/add-sections/education" element={<EducationPage />} />
          <Route
            path="/add-sections/experience"
            element={<WorkExperiencePage />}
          />
          <Route path="/add-sections/languages" element={<LanguagesPage />} />
          <Route
            path="/add-sections/achievements"
            element={<AchievementsPage />}
          />
          <Route
            path="/add-sections/projects"
            element={<PersonalProjectsPage />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
