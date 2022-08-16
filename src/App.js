import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header';
import TransactionsList from './pages/TransactionList';
import CustomersList from './pages/CustomersList';
import TransactionForm from './pages/TransactionForm';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/signin" element={<SignIn />} />
           {/* <Route path="/signup" element={<SignUp />} /> */}
           <Route path="/transactions" element={<TransactionsList/>} />
           <Route path="/customers" element={<CustomersList/>}/>
           <Route path="/make-transaction" element={<TransactionForm />} />
        </Routes>
    </div>
  );
}

export default App;
