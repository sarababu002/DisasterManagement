import { useState } from 'react';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Transportation from './Transportation';
import Dashboard from './Dashboard';
import Incident from './Incident';
import NGO from './NGO';
import Responders from './Responders';
import Users from './Users';

function Admin() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  const navItems = [
    { name: 'Dashboard', url: '/' },
    { name: 'Incidents', url: '/incident' },
    { name: 'Responders', url: '/responders' },
    { name: 'NGO', url: '/ngo' },
    { name: 'Transportation', url: '/transportation' },
    { name: 'Users', url: '/users' },
  ];

  return (
    <Router>
      <div className="flex h-screen w-full bg-[#11003A]">
        {/* Sidebar */}
        <div className="flex flex-col items-start bg-[#11003A] p-4 w-52">
          <img className="w-48 h-48 mb-6" src="./images/logo.png" alt="logo" />
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`w-full text-white font-bold py-2 px-4 mb-2 rounded-lg cursor-pointer 
                ${activeNav === item.name ? 'bg-[#c13cff]' : 'bg-transparent'}`}
              onClick={() => handleNavClick(item.name)}
            >
              <Link to={item.url} className="block text-white no-underline">{item.name}</Link>
            </div>
          ))}
        </div>

        {/* Main content body */}
        <div className="flex-1 bg-white rounded-lg overflow-hidden p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/incident" element={<Incident />} />
            <Route path="/ngo" element={<NGO />} />
            <Route path="/responders" element={<Responders />} />
            <Route path="/users" element={<Users />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Admin;
