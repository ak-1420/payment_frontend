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

const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('-');
}


export default function TransactionsList() {

  const [rows , setRows] = React.useState([])

  React.useEffect(() => {
      getTransactions()
  },[])

  let navigate = useNavigate()

  React.useEffect(() => {
    if(localStorage.getItem("emp_id") === null){
      navigate('/signin')
    }
   },[localStorage.getItem("emp_id")])


  const getTransactions = () => {
    axios.get(`http://localhost:5000/api/v1/transaction/all`)
    .then((res) => {
      setRows(res.data)
    }).catch((err) => {
      console.log('unable to fetch transactions list')
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction Id</TableCell>
            <TableCell align="right">Transaction Type</TableCell>
            <TableCell align="right">Customer Id</TableCell>
            <TableCell align="right">Receiver BIC</TableCell>
            <TableCell align="right">Receiver Account Name</TableCell>
            <TableCell align="right">Receiver Account Number</TableCell>
            <TableCell align="right">Message Code</TableCell>
            <TableCell align="right">Transfer Amount</TableCell>
            <TableCell align="right">Transfer Fees</TableCell>
            <TableCell align="right">Transaction Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.transactionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.transactionId}
              </TableCell>
              <TableCell align="right">{row.transferTypeCode}</TableCell>
              <TableCell align="right">{row.customerId}</TableCell>
              <TableCell align="right">{row.receiverBIC}</TableCell>
              <TableCell align="right">{row.receiverAccountHolderName}</TableCell>
              <TableCell align="right">{row.receiverAccountHolderNumber}</TableCell>
              <TableCell align="right">{row.messageCode}</TableCell>
              <TableCell align="right">{row.inrAmount}</TableCell>
              <TableCell align="right">{row.transferFees}</TableCell>
              <TableCell align="right">{formatDate(row.transferDate)}</TableCell>
              <TableCell align="right">{row.status ? "SUCCESS" : "FAILED"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
