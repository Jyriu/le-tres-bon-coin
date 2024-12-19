import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/auth/Register/Register.tsx';
import Login from './pages/auth/Login/Login.tsx';
import AnnounceCreate from './pages/announces/Create/AnnounceCreate.tsx';
import AnnounceList from './pages/announces/List/AnnounceList.tsx';
import AnnounceEdit from './pages/announces/Edit/AnnounceEdit.tsx';
import AnnounceDetail from './pages/announces/Detail/AnnounceDetail.tsx';
import UserList from './pages/users/List/UserList.tsx';
import UserCreate from './pages/users/Create/UserCreate.tsx';
import UserEdit from './pages/users/Edit/UserEdit.tsx';
import Home from './pages/Home/Home.tsx';
import Navbar from './components/Navbar/Navbar.tsx';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="App">
      {!isAuthPage && <Navbar />}
      <div className={!isAuthPage ? 'content-with-navbar' : ''}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/announces/create" element={<AnnounceCreate />} />
          <Route path="/announces/edit/:id" element={<AnnounceEdit />} />
          <Route path="/announces/:id" element={<AnnounceDetail />} />
          <Route path="/announces" element={<AnnounceList />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
