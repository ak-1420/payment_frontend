import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function Header() {

    const navigate = useNavigate();

    const navigateToSignInPage = () => {
           navigate('/signin')
    }

    const navigateToSignUpPage = () => {
        navigate('/signup')
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
          
        <Toolbar >

         <Typography sx={{cursor:'pointer'}} variant="h6" component="div" onClick={navigateToHome}>
             Payment
          </Typography>
          <Box sx={{marginLeft : 'auto'}}>
          <Button color="inherit" >Make a Transaction</Button>
          <Button color="inherit" onClick={navigateToTransactionList} >Transactions List</Button>
          <Button color="inherit" onClick={navigateToCustomerList} >Customers List</Button>
          <Button color="inherit" onClick={navigateToSignInPage}>Sign In</Button>
          <Button color="inherit" onClick={navigateToSignUpPage}>Sign Up</Button>
          </Box>
          
        </Toolbar>
         
      </AppBar>
    </Box>
  );
}

