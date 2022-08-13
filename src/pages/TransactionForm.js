import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateInput from '../components/DateInput';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function TransactionForm() {
  return (
      <div style={{padding: '20px'}}>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        {/* Booking Date Input  */}
       <DateInput label="Booking Date" />


        {/* sender details */}
       <div>
         <h4>Sender Details</h4>

         {/* input customer Id */}
         <TextField
          id="input-customer-id"
          label="Customer Id"
          type="text"
        />

        {/* input customer accound holder name */}
          <TextField
          id="input-account-holder-name"
          label="Account Holder Name"
          type="text"
          inputProps={{
            readOnly:true
          }}
        />

        {/* input customer clear balance */}
        <TextField
          id="input-clear-balance"
          label="Clear Balance"
          type="number"
          inputProps={{
            readOnly:true
          }}
        />

         <TextField
          id="input-currency"
          label="Currency"
          type="text"
          inputProps={{
            readOnly:true
          }}
        />     

       </div>



       {/* receiver details */}
       <div>
         <h4>Receiver Details</h4>

         {/* input bic*/}
         <TextField
          id="input-bic"
          label="BIC"
          type="text"
        />

        {/* input institution name*/}
          <TextField
          id="input-institution-name"
          label="Institution Name"
          type="text"
          inputProps={{
            readOnly:true
          }}
        />

        {/* input Account Holder Name */}
        <TextField
          id="input-receiver-ac-name"
          label="Account Holder name"
          type="text"
          
        />

         {/* input receiver account holder number */}
         <TextField
          id="input-account-holder-number-receiver"
          label="Acccount Holder Number"
          type="text"
        />     

       </div>

        
        {/* Transaction Details */}
        
        <div>
         <h4>Transaction Details</h4>

        {/* input transfer type */}
        <FormControl fullWidth sx={{m : 2}}>
        <InputLabel id="transfer-type">Transfer type</InputLabel>
        <Select
          labelId="transfer-type"
          id="select-transfer-type"
          value={""}
          label="Transfer type"
          onChange={() => {}}
        >
          <MenuItem value={"Bank"}>Bank Transfer</MenuItem>
          <MenuItem value={"Customer"}>Customer Transfer</MenuItem>
          
        </Select>
      </FormControl>


      {/* input message code */}

      <FormControl fullWidth sx={{m: 2}} >
        <InputLabel id="message-code">Message code</InputLabel>
        <Select
          labelId="message-code"
          id="select-message-code"
          value={""}
          label="Message code"
          onChange={() => {}}
        >
          <MenuItem value={"beneficiary customer must be paid by cheque only."}>CHQB</MenuItem>
          <MenuItem value={"Payment is made in settlement for a trade."}>CORT</MenuItem>
          <MenuItem value={"Beneficiary customer or claimant will call upon identification."}>HOLD</MenuItem>
          <MenuItem value={"Payment between two companies that belongs to the same group."}>INTC</MenuItem>
          <MenuItem value={"Please advise the intermediary institution by phone."}>PHOB</MenuItem>
          <MenuItem value={"Please advise the intermediary by phone."}>PHOI</MenuItem>
          <MenuItem value={"Please advise the account with institution by phone."}>PHON</MenuItem>
          <MenuItem value={"Payments has a related e-Payments reference."}>REPA</MenuItem>
          <MenuItem value={"Payment must be executed with same day value to the"}>SDVA</MenuItem>
          
        </Select>
      </FormControl>


      {/* input amount */}
      <TextField
          id="input-transaction-amount"
          label="Amount"
          type="number"
        />   

      {/* input transfer fees */}
      <TextField
          id="input-transfer-fees"
          label="Transfer fees"
          type="number"
          iputProps={{
            readOnly : true
          }}
        />  

      {/* input clear balance */}
      <TextField
          id="input-clear-balance-txn"
          label="Clear balance"
          type="number"
          inputProps={{
            readOnly:true
          }}
        />  
  

       </div>
           
       <Button variant="contained" sx={{m:2}}>Proceed </Button>
  
      </div>
    </Box>
    </div>
  );
}

