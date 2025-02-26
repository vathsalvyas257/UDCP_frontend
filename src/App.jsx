import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ChatRoom from './components/Dashboard/ChatRoom'
import AuthSuccess from "./components/AuthSuccess";
import ServicesPage from "./components/ServicesPage";
import Dashboard from "./components/Dashboard/Dashboard";
import RewardsPage from "./components/RewardsPage";

import Header from "./components/Header"; // Ensure Header is included
import Auth from "./components/Auth";
import ListOfSchedules from "./components/Dashboard/ListOfSchedules";
import ProfilePage from "./components/Dashboard/ProfilePage";
import ThreadList from "./components/threads/ThreadList";
import CreateThreadForm from "./components/threads/CreateThreadForm";
import ThreadDetails from "./components/threads/ThreadDetails";
function App() {
  return (
    <Router>
      <Header /> {/* Persistent Navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/auth" element={<Auth />}/>
        <Route path='/auth-success' element={<AuthSuccess/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path='schedules' element={<ListOfSchedules/>}/>
          <Route path='profile' element={<ProfilePage/>}/>



        
        </Route>
        <Route path="/threads" element={<ThreadList />} />
            <Route path="/thread/:id" element={<ThreadDetails />} />
            <Route path="/thread/create" element={<CreateThreadForm />} />
      </Routes>
    
    </Router>
  );
}

export default App;
