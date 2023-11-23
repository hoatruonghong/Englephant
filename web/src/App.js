import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/icon/fontawesome.js";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import Tutor from './views/Tutor';
import TalkRoom from './views/TalkRoom';

// import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    // <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/tutor' element={<Tutor />} />
          <Route path='/talkroom' element={<TalkRoom />} />
          <Route path='/login' element={<Auth authRoute="login" />} />
          <Route path='/forget-password' element={<Auth authRoute="forget-password" />} />
          <Route path='/verify-otp' element={<Auth authRoute="verify-otp" />} />
          <Route path='/change-password' element={<Auth authRoute="change-password" />} />
        </Routes>
    </Router>
    // </AuthContextProvider>
  );
}

export default App;
