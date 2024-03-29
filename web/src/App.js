import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/icon/fontawesome.js";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Tutor from './views/Tutor';
import TalkRoom from './views/TalkRoom';
import Admin from './views/Admin';

import AuthContextProvider from './contexts/AuthContext';
import Room from "./views/Room.js";
// import TutorContextProvider from './contexts/TutorContext';
// import ProtectedRoute from './components/routing/ProtectedRoute';

function App() {
  return (
    <AuthContextProvider>      
      <Router>
        <Routes>          
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Auth authRoute="login" />} />
          <Route path='/forget-password' element={<Auth authRoute="forget-password" />} />
          <Route path='/verify-otp' element={<Auth authRoute="verify-otp" />} />
          <Route path='/change-password' element={<Auth authRoute="change-password" />} />

          {/* <Route path='/tutor' element={<RoomContextProvider><Tutor /></RoomContextProvider>} /> */}
          
          <Route path='/tutor' element={<Tutor />} />
          <Route path='/tutor/room' element={<TalkRoom />} />
          <Route path='/tutor/talkroom/:id' element={<Room />} />

          <Route path='/admin' element={<Admin adminRoute="main" />} />
          <Route path='/admin/manage-tutor' element={<Admin adminRoute="manage-tutor" />} />
          <Route path='/admin/manage-quiz' element={<Admin adminRoute="manage-quiz" />} />
          <Route path='/admin/manage-exercise' element={<Admin adminRoute="manage-exercise" />} />
          <Route path='/admin/manage-map' element={<Admin adminRoute="manage-map" />} />
        </Routes>
      </Router>
    </AuthContextProvider>
    // <Router>
    //   <Routes>
    //     <Route path='/tutor/room' element={<Room />} />
    //   </Routes>
    // </Router>

  );
}

export default App;
