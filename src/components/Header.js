import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function Header() {

    const navigate = useNavigate();

    const [user , setUser] = React.useState({
      empId:null,
      isLogged: null
    })

    React.useEffect(() => {
      const empId = localStorage.getItem("emp_id")
      const isLogged = localStorage.getItem("is_logged")
      setUser({
        empId,
        isLogged
      })
    },[user.empId])

    const navigateToSignInPage = () => {
           navigate('/signin')
    }

    const navigateToSignUpPage = () => {
        navigate('/signup')
 }


 const signOut = () => {
   localStorage.clear()
   setUser({
     empId: null,
     isLogged: null
   })
   navigate('/signin')
 }

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToTransactionList = () => {
      navigate('/transactions')
    }

    const navigateToCustomerList = () => {
      navigate('/customers')
    }

    const navigateToMakeTransaction = () => {
      navigate('/make-transaction')
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          
        <Toolbar >

         <Typography sx={{cursor:'pointer'}} variant="h6" component="div" onClick={navigateToHome}>
             Payment
          </Typography>
          <Box sx={{marginLeft : 'auto'}}>
          {(localStorage.getItem('emp_id') !== null) && <Button color="inherit" onClick={navigateToMakeTransaction}>Make a Transaction</Button>}
          { (localStorage.getItem('emp_id') !== null) && <Button color="inherit" onClick={navigateToTransactionList} >Transactions List</Button>}
          {(localStorage.getItem('emp_id') !== null) && <Button color="inherit" onClick={navigateToCustomerList} >Customers List</Button>}
          {(localStorage.getItem('emp_id') === null) && <Button color="inherit" onClick={navigateToSignInPage}>Sign In</Button>}
          {(localStorage.getItem('emp_id') !== null) && <Button color="inherit" onClick={signOut}>Sign out</Button>}
          </Box>
          
        </Toolbar>
         
      </AppBar>
    </Box>
  );
}

