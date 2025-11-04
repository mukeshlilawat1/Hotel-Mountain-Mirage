import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import HomePage from './component/home/Home';
import FooterComponent from './component/common/Footer';
import AllRoomsPage from './component/booking_rooms/AllRoomsPage';
import FindBookingPage from './component/booking_rooms/FindBookingPage';
import RoomDetailsPage from './component/booking_rooms/RoomDetailsPage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ProfilePage from './component/profile/Profile';
import EditProfilePage from './component/profile/EditProfile';
import { ProtectedRoute, AdminRoute } from './service/guard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className='content'>
          <Routes>
            {/* public routes */}
            <Route exact path='/home' element={<HomePage />} />
            <Route exact path='/rooms' element={<AllRoomsPage />} />
            <Route path='/find-booking' element={<FindBookingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />


            {/* protected users routes */}
            <Route path='/room-details-book/:roomId' element={<ProtectedRoute element={<RoomDetailsPage />} />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/edit-profile' element={<EditProfilePage />} />

          </Routes>

        </div>


      </div>

      <FooterComponent />
    </BrowserRouter>

  );
}

export default App;
