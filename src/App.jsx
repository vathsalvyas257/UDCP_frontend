import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import AuthSuccess from "./components/AuthSuccess";
import ServicesPage from "./components/ServicesPage";
import Dashboard from "./components/Dashboard/Dashboard";
import RewardsPage from "./components/RewardsPage";
import Header from "./components/Header"; 
import Auth from "./components/Auth";
import ListOfSchedules from "./components/Dashboard/ListOfSchedules";
import ProfilePage from "./components/Dashboard/ProfilePage";
import ThreadList from "./components/threads/ThreadList";
import CreateThreadForm from "./components/threads/CreateThreadForm";
import ThreadDetails from "./components/threads/ThreadDetails";
import Clubs from "./components/Dashboard/Clubs";
import Homepage from "./components/Dashboard/HomePage";
import Jobs from "./components/Dashboard/Jobs";
import ProtectedRoutes from "./components/ProtectedRoutes";
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
          <Route path='home' element={
            <ProtectedRoutes>
            <Homepage />
            </ProtectedRoutes>
          }
            />
          <Route path='schedules' element={
            <ProtectedRoutes>
            <ListOfSchedules/>
            </ProtectedRoutes>
            }/>
          <Route path='profile' element={
            <ProtectedRoutes>
            <ProfilePage/>
            </ProtectedRoutes>
            }/>
          <Route path='clubs' element={
            <ProtectedRoutes>
            <Clubs/> 
            </ProtectedRoutes>
            }/>
          <Route path='jobs' element={
            <ProtectedRoutes>
            <Jobs/>
            </ProtectedRoutes>
            
            }/>
          <Route path="threads" element={
            <ProtectedRoutes>

            <ThreadList />
            </ProtectedRoutes>

            } />
            <Route path="thread/:id" element={
            <ProtectedRoutes>

              <ThreadDetails />
            </ProtectedRoutes>

              } />
            <Route path="thread/create" element={
            <ProtectedRoutes>

              <CreateThreadForm />
            </ProtectedRoutes>

              } />
        </Route>
        {/* <Route path="/threads" element={<ThreadList />} />
            <Route path="/thread/:id" element={<ThreadDetails />} />
            <Route path="/thread/create" element={<CreateThreadForm />} /> */}
      </Routes>
    
    </Router>
  );
}

export default App;