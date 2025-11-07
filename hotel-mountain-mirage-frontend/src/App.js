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
import AdminPage from './component/admin/AdminPage';
import ManageRoomPage from './component/admin/ManageRoomPage';
import ManageBookingsPage from './component/admin/ManageBookingPage';
import AddRoomPage from './component/admin/AddRoomPage';
import EditRoomPage from './component/admin/EditRoomPage';
import EditBookingPage from './component/admin/EditBookingPage';

// 👇 Import About Us Page
import AboutUs from './component/common/About';  // <-- Make sure this file exists
import ContactUs from './component/common/ContactUs';  // <-- Make sure this file exists
import Gallery from './component/common/Gallery';
import EventsCelebrations from './component/common/EventsCelebrations';
import SpecialOffers from './component/common/SpecialOffers';
import OurBlog from './component/common/OurBlog';
import Careers from './component/common/Careers';
import TravelAgents from './component/common/TravelAgents';
import PartnerWithUs from './component/common/PartnerWithUs';
import GiftCards from './component/common/GiftCards';
import AccessibilityPage from './component/common/Accessibility';
import RefundPolicy from './component/common/RefundPolicy';
import PrivacyPolicy from './component/common/PrivacyPolicy';
import TermsAndConitons from './component/common/TermsAndConditions';
import SupportPage from './component/common/Support';
import FAQs from './component/common/FAQs';

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


            {/* 👇 Added About Us Page Route */}
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/events' element={<EventsCelebrations />} />
            <Route path='/blog' element={<OurBlog />} />
            <Route path='/careers' element={<Careers />} />
            <Route path='/travel-agents' element={<TravelAgents />} />
            <Route path='/partner-with-us' element={<PartnerWithUs />} />
            <Route path='/accessibility' element={<AccessibilityPage />} />
            <Route path='/refund' element={<RefundPolicy />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/terms' element={<TermsAndConitons />} />
            <Route path='/support' element={<SupportPage />} />
            <Route path='/faq' element={<FAQs />} />

            {/* protected users routes */}
            <Route path='/room-details-book/:roomId' element={<ProtectedRoute element={<RoomDetailsPage />} />} />
            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path='/edit-profile' element={<ProtectedRoute element={<EditProfilePage />} />} />
            <Route path='/offers' element={<ProtectedRoute element={<SpecialOffers />} />} />
            <Route path='/gift-cards' element={<ProtectedRoute element={<GiftCards />} />} />

            {/* Admin Auth Router */}
            <Route path='/admin' element={<AdminRoute element={<AdminPage />} />} />
            <Route path='/admin/manage-rooms' element={<AdminRoute element={<ManageRoomPage />} />} />
            <Route path='/admin/manage-bookings' element={<AdminRoute element={<ManageBookingsPage />} />} />
            <Route path='/admin/add-room' element={<AdminRoute element={<AddRoomPage />} />} />
            <Route path='/admin/edit-room/:roomId' element={<AdminRoute element={<EditRoomPage />} />} />
            <Route path='/admin/edit-booking/:bookingCode' element={<AdminRoute element={<EditBookingPage />} />} />

            <Route path='*' element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </div>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
