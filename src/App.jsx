import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import Dashboard from './components/Dashbord'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupForm from './components/Signup'
import StudentForm from './components/Studentform'
import Contact from './components/Contact'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Footer from './components/Footer'
import AllstudentDetails from './components/AllstudentDetails'
import ForgetPassword from './components/ForgetPassword'
import { ToastContainer } from 'react-toastify'
import UserSettings from './components/UserSettings'
import { UserProvider } from './Context/userContext'
import Blogs from './components/Blogs'
import ProfilePage from './components/ProfilePage'



function App() {
  
  return (
    <UserProvider>
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
      <Router>
        {/* The <Profile/> component has been removed from here */}
        <Navbar/> 
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/studentform" element={<StudentForm />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/allstudentdetails" element={<AllstudentDetails/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  )
}

export default App
