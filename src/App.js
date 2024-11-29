import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Test from './pages/Test.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Plan from './pages/Plan.jsx';
import Month from './pages/Month.jsx';
import SignUp from './pages/SignUp.jsx';
import { PlanProvider } from './store/PlanContext.js';

function App() {
  return (
    <>
      <div style={{ backgroundColor: '#e8f0ff' }}>
        <PlanProvider>
          <Router>
            <Routes>
              <Route path="/test" element={<Test />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/month/:monthID" element={<Month />} />
              <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
          </Router>
        </PlanProvider>
      </div>
    </>
  );
}

export default App;
