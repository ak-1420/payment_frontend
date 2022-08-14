import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';



export default function CustomersList() {

  const [rows , setRows] = React.useState([])

  React.useEffect(() => {
     getCustomers()
  },[])

  const getCustomers = () => {
    axios.get(`http://localhost:5000/customers`)
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
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.clear_balance}</TableCell>
              <TableCell align="right">{row.transfer_type}</TableCell>
              <TableCell align="right">{row.overdraft}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
