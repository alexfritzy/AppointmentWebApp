import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/';
import Appointments from './pages/appointments';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/appointments' element={<Appointments />} />
            </Routes>
        </Router>
    );
}

export default App;