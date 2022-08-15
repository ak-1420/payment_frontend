import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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


  const getTransactions = () => {
    axios.get(`http://localhost:5000/transactions`)
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
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.transfer_type_code}</TableCell>
              <TableCell align="right">{row.customer_id}</TableCell>
              <TableCell align="right">{row.receiver_bic}</TableCell>
              <TableCell align="right">{row.receiver_account_holder_name}</TableCell>
              <TableCell align="right">{row.receiver_account_holder_number}</TableCell>
              <TableCell align="right">{row.message_code}</TableCell>
              <TableCell align="right">{row.inr_amount}</TableCell>
              <TableCell align="right">{row.transfer_fees}</TableCell>
              <TableCell align="right">{formatDate(row.transfer_date)}</TableCell>
              <TableCell align="right">{row.status ? "SUCCESS" : "FAILED"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
