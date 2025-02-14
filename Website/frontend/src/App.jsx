import '../src/CSS/App.css'
import { Routes, Route, Link } from "react-router-dom"

import NavBar from './Components/Sections/Navbar'
import PredictionPage from './Pages/Prediction'
import Footer from './Components/Sections/Footer'
import ProjectDetails from './Pages/ProjectDetails'
import Home from './Pages/Home'
import AnalysisPage from './Pages/AnalysisPage'
import PropertyDetailsPage from './Pages/PropertyDetailsPage'
import WishList from './Pages/WishList'
import './CSS/index.css'



function App() {
  return (
    <>
      <div className="dark-theme">
        <NavBar />
        

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/Project_DEtails" element={<ProjectDetails />} />
        <Route path="/Project_DEtails" element={<ProjectDetails />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/flats/:id" element={<PropertyDetailsPage />} />
        </Routes>
        
        <Footer/>
        </div>
    </>
  )
}

export default App
