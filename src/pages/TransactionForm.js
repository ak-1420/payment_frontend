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

  const [messages , setMessages] = React.useState([])

  React.useEffect(() => {
    axios.get(`http://localhost:5000/messages`).then((res) => {
      setMessages(res.data)
      console.log('message codes data :',res.data)
    }).catch((err) => {
      console.log('unable to fetch message codes')
    })
  },[])


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

  const [transferType , setTransferType] = React.useState("")

  const handleTransferType = (e) => {
    setTransferType(e.target.value)
  }

  
  const [transaction , setTransaction] = React.useState({
    transfer_type : "",
    message_code : "",
    amount : "",
    transfer_fees : "",
    currency : ""
  })

  const [message , setMessage] = React.useState({
    id:"",
    msg: ""
  })

  const handleMessageCodeChange = (e) => {
    const {value} = e.target
    const data = messages?.find((m) => m.id === value)
    setMessage({
      id: data?.id,
      msg : data?.message
    })
  }

  const [amount , setAmount] = React.useState(0)
  const [transferFees , setTransferFees] = React.useState(0)
  const [clearBalance , setClearBalance] = React.useState(0)

  React.useEffect(() => {
    const fee = 0.25 * parseFloat(amount)
    const totalFee = amount + fee
    setTransferFees(fee)
    setClearBalance(parseFloat(sender?.clear_balance) - totalFee)

    if(totalFee > parseFloat(sender?.clear_balance) && sender?.overdraft?.toUpperCase() == "NO"){
      // set an error
      setError({
        isError: true ,
        message: "Insufficient funds to make a transaction"
      })
    }
    else
    {
      setError({
        isError: false ,
        message: ""
      })
    }
  },[amount])

  const handleAmountChange = (e) => {
    const {value} = e.target
    setAmount(parseFloat(value))
  }

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


  React.useEffect(() => {
       // check the name is in sdn list
       fetch('./../../sdnlist.txt')
    .then((r) => r.text())
    .then(text  => {
      console.log(text);
    })  
  },[receiver?.account_holder_name])

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

  const isValid = () => {
    if(sender?.customer_id == ""){
      setError({isError: true , message : " customer id is required"})
      return false;
    }

    if(sender?.overdraft == "" || sender?.account_holder_name == ""){
      setError({isError: true , message : "valid customer id required"})
      return false;
    }

    if(receiver?.bic == "" || receiver?.institution == "" ){
      setError({isError: true , message: "valid receiver bic is required"})
      return false;
    }

    if(receiver?.account_holder_name == ""){
      setError({isError : true , message : "account holder name is required"})
      return false;
    }

    if(receiver?.account_holder_number == ""){
      setError({isError: true , message: "account holder number is required"})
      return false;
    }

    if(bookingDate == null || bookingDate == ""){
      setError({isError: true , message: "booking date is required"})
      return false;
    }

    if(transferType == ""){
      setError({isError: true , message : "transfer type is required"})
      return
    }

    if(message.id == "" || message.msg == ""){
      setError({isError: true , message : "message code is required"})
      return false;
    } 

    if(amount == 0){
      setError({isError: true , message: "amount is required"})
      return false;
    }

    if(transferFees == 0){
      setError({isError : true , message : "transfer fees must be > 0"})
      return false;
    }
   
    if(clearBalance < 0 && sender?.overdraft?.toUpperCase() == "NO"){
      setError({isError: true , message : "transaction rejected due to insufficent funds"})
      return false;
    }

    return true;

  }

  const cleanTransactionState = () => {
    setSender({
      customer_id : "",
      account_holder_name : "",
      clear_balance : 0,
      overdraft : ""
    })
    setReceiver({
      bic : "",
      institution : "",
      account_holder_name : "",
      account_holder_number : ""
    })
   setTransferType("")
   setTransferFees(0)
   setAmount(0)
   setClearBalance(0)
   setMessage({id : "" , msg : ""})
   setBookingDate(null)
  }

  const makeTransaction = () => {
    if(!isValid()){
      return
    }

    const payload = {
      id: new Date().getTime() + sender?.customer_id,
      customer_id : sender?.customer_id,
      receiver_bic : receiver?.bic,
      receiver_account_holder_name : receiver?.account_holder_name,
      receiver_account_holder_number : receiver?.account_holder_number,
      transfer_type_code : transferType,
      message_code : message?.id,
      transfer_fees : transferFees ,
      inr_amount : amount ,
      transfer_date : bookingDate,
      // sender_bic : "sender_bic",
      // currency_amount : "amount",
      // currency_code : "code"
    }

    axios.post(`http://localhost:5000/transactions`,payload)
    .then((res) => {
      console.log(res.data)
      axios.patch(`http://localhost:5000/customers/${sender?.customer_id}`,{
        clear_balance : clearBalance
      }).then((r) => {
        console.log('sender clear balance also updated')
        cleanTransactionState()
        alert('transaction completed successfully!')
      }).catch((e) => {
        console.log('sender clear balance is not updated')
      })
    }).catch((err)=>{
      console.log(err)
      alert('transaction failed!')
    })
  }

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
          value={transferType}
          label="Transfer type"
          onChange={handleTransferType}
        >
          <MenuItem value={"BANK"}>Bank Transfer</MenuItem>
          <MenuItem value={"CUSTOMER"}>Customer Transfer</MenuItem>
          
        </Select>
      </FormControl>


      {/* input message code */}

      <FormControl fullWidth sx={{m: 2}} >
        <InputLabel id="message-code">Message code</InputLabel>
        <Select
          labelId="message-code"
          id="select-message-code"
          value={message.id}
          label="Message code"
          onChange={handleMessageCodeChange}
        >
          {
            messages.length > 0 && messages.map((m) => {
              return <MenuItem key ={m.id} value={m.id}>{m.id}</MenuItem>
            })
          }
          
        </Select>
      </FormControl>


      {/* input amount */}
      <TextField
          id="input-transaction-amount"
          label="Amount"
          value={amount}
          onChange={handleAmountChange}
          type="number"
        />   

      {/* input transfer fees */}
      <TextField
          id="input-transfer-fees"
          label="Transfer fees"
          value={transferFees}
          type="number"
          inputProps={{
            readOnly : true
          }}
        />  

      {/* input clear balance */}
      <TextField
          id="input-clear-balance-txn"
          label="Clear balance"
          value={clearBalance}
          type="number"
          inputProps={{
            readOnly:true
          }}
        />  
  

       </div>
           
       <Button onClick={makeTransaction} variant="contained" sx={{m:2}}>Proceed </Button>
  
      </div>
    </Box>
    </div>
  );
}

