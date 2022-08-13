import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateInput from '../components/DateInput';
import { Button, FormControl, InputLabel, MenuItem, Select , Alert} from '@mui/material';
import axios from 'axios';


export default function TransactionForm() {

  const [bookingDate , setBookingDate] = React.useState(null)

  const [customers , setCustomers] = React.useState([])

  const [receivers , setReceivers] = React.useState([])


  React.useEffect(() => {
    axios.get(`http://localhost:5000/receivers`).then((res) => {
      setReceivers(res.data)
      console.log(res.data , 'receivers data')
    }).catch((err) => {
      console.log('unable to fetch receivers data')
    })
  },[])

  React.useEffect(() => {
    axios.get(`http://localhost:5000/customers`).then((res) => {
      setCustomers(res.data)
      console.log(res.data , 'customers data')
    }).catch((err) => {
      console.log('unable to fetch customers data')
    })
  },[])

  const [sender , setSender] = React.useState({
    customer_id : "",
    account_holder_name : "",
    clear_balance : 0,
    overdraft : ""
  })

  const [receiver , setReceiver] = React.useState({
    bic : "",
    institution : "",
    account_holder_name : "",
    account_holder_number : ""
  })

  const [transaction , setTransaction] = React.useState({
    transfer_type : "",
    message_code : "",
    amount : "",
    transfer_fees : "",
    currency : ""
  })

  const [message , setMessage] = React.useState({})
  const [amount , setAmount] = React.useState(null)
  const [error , setError] = React.useState({
    isError : null ,
    message : ""
  })

  React.useEffect(() => {
    // get customer record with the given 
    const record = customers?.find((c) => c.id == sender?.customer_id)
    
    if(record){
       setSender((prev) => ({
         customer_id : record.id,
         account_holder_name: record.name,
         clear_balance : record.clear_balance,
         overdraft : record.overdraft
       }))
       setError({
        isError: false ,
        message : ""
      })
    }
    else
    {
      setError({
        isError: true ,
        message : "Customer Not Found"
      })
      setSender((prev) => ({
        ...prev,
        account_holder_name: "",
        clear_balance : 0,
        overdraft : ""
      }))
    }
   
    
  },[sender.customer_id])

  
  const handleCustomerIdChange = (e) => {

    const {value} = e.target

    setSender((prev)=> ({
      ...prev,
      customer_id : value
    }))
  }

  React.useEffect(() => {
    // get receiver record with the given bic
    const record = receivers?.find((r) => r.id == receiver?.bic)
    if(record){

      setReceiver((prev) => ({
        ...prev,
        institution : record.institution
      }))

      setError({
        isError: false,
        message: ""
      })
    }
    else{
      setError({
        isError: true,
        message: "Account Not Found"
      })
      setReceiver((prev) => ({
        ...prev,
        institution : ""
      }))
    }
  },[receiver.bic])

  const handleReceiverAcNameChange = (e) => {
        const {value} = e.target
        setReceiver((prev) => ({
          ...prev,
          account_holder_name : value
        }))
  }

  const handleReceiverAcNoChange = (e) => {
       const {value} = e.target
       setReceiver((prev) => ({
         ...prev,
         account_holder_number : value
       }))
  }

  const handleBicChange = (e) => {
    const {value} = e.target 
    setReceiver((prev) =>({
      ...prev,
      bic : value
    }))
  }

  console.log(error , 'error data')
  
  console.log(receiver , 'receiver data')

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
       <DateInput label="Booking Date" defaultDate={bookingDate} setDate={setBookingDate} />


        {/* sender details */}
       <div>
         <h4>Sender Details</h4>
         {(error?.isError && error?.message != "") && <Alert severity="error">{error?.message}</Alert>}
         {/* input customer Id */}
         <TextField
          id="input-customer-id"
          label="Customer Id"
          type="text"
          value={sender?.customer_id ?? ""}
          onChange={handleCustomerIdChange}
        />

        {/* input customer accound holder name */}
          <TextField
          id="input-account-holder-name"
          label="Account Holder Name"
          type="text"
          value={sender?.account_holder_name ?? ""}
          inputProps={{
            readOnly:true
          }}
        />

        {/* input customer clear balance */}
        <TextField
          id="input-clear-balance"
          label="Clear Balance"
          type="number"
          value={parseFloat(sender?.clear_balance) ?? 0}
          inputProps={{
            readOnly:true
          }}
        />

         <TextField
          id="input-currency"
          label="Overdraft"
          type="text"
          value={sender?.overdraft}
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
          value={receiver?.bic}
          onChange={handleBicChange}
        />

        {/* input institution name*/}
          <TextField
          id="input-institution-name"
          label="Institution Name"
          type="text"
          value={receiver?.institution ?? ""}
          inputProps={{
            readOnly:true
          }}
        />

        {/* input Account Holder Name */}
        <TextField
          id="input-receiver-ac-name"
          label="Account Holder name"
          type="text"
          value={receiver?.account_holder_name}
          onChange={handleReceiverAcNameChange}
        />

         {/* input receiver account holder number */}
         <TextField
          id="input-account-holder-number-receiver"
          label="Acccount Holder Number"
          type="text"
          value={receiver?.account_holder_number}
          onChange={handleReceiverAcNoChange}
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
          inputProps={{
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

