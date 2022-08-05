import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/signin" element={<SignIn />} />
           <Route path="/signup" element={<SignUp />} />
        </Routes>
    </div>
  );
}

export default App;
