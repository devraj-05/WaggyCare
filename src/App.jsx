import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter}  from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Profile from './components/Profile';
import DogWalkersPage from './components/DogWalkersPage';
import BookingPage from './components/BookingPage';
import PaymentPage from './components/PaymentPage';
import ReviewsPage from './components/ReviewsPage';
import NotificationsPage from './components/NotificationsPage';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import RoleBasedAuth from "./components/RoleBasedAuth";
import DogOwner from './components/DogOwner';
import DogWalkerForm from './components/DogWalkerForm';


const App = () => {
    return (
        
         <BrowserRouter>
         <div className='page-wrapper'>
        <Header/>
    <main className="main-content">
        
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                     <Route path="/contact" element={<Contact />} />
                     <Route path="/loginpage" element={<LoginPage />} />
                     <Route path="/registerpage" element={<RegisterPage />} />
                     <Route path="/profile" element={<Profile/>}/>
                     <Route path="/dogwalkerspage" element={<DogWalkersPage/>}/>
                     <Route path="/bookingpage" element={<BookingPage/>}/>
                     <Route path="/paymentpage" element={<PaymentPage/>}/>
                     <Route path="/reviewspage" element={<ReviewsPage/>}/>
                     {/* <Route path="/notificationspage" element={<NotificationsPage/>}/> */}
                     <Route path="/rolebasedauth" element={<RoleBasedAuth/>}/>
                     <Route path="/dashboard" element={<Dashboard/>}/> 
                     <Route path="/dogowner" element={<DogOwner/>}/>
                     <Route path="/dogWalkerForm" element={<DogWalkerForm/>}/>
                 </Routes>
            
          </main> 
         <Footer /> 
         </div>
        </BrowserRouter>
    )
}

export default App;
