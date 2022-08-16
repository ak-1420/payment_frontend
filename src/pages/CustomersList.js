import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function CustomersList() {

  const [rows , setRows] = React.useState([])

  let navigate = useNavigate()

  React.useEffect(() => {
    if(localStorage.getItem("emp_id") === null){
      navigate('/signin')
    }
   },[localStorage.getItem("emp_id")])

  React.useEffect(() => {
     getCustomers()
  },[])

  const getCustomers = () => {
    axios.get(`http://localhost:5000/api/v1/customer/all`)
    .then((res) => {
      setRows(res.data)
    }).catch((err) => {
      console.log('unable to fetch customers list')
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell>Customer Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Clear balance</TableCell>
            <TableCell align="right">Transfer type</TableCell>
            <TableCell align="right">Overdraft</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.customerId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.customerId}
              </TableCell>
              <TableCell align="right">{row.accountHolderName}</TableCell>
              <TableCell align="right">{row.clearBalance}</TableCell>
              <TableCell align="right">{row.transferType}</TableCell>
              <TableCell align="right">{row.overDraftFlag ? "YES" : "NO"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
