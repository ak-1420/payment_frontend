import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateInput from '../components/DateInput';
import { Button, FormControl, InputLabel, MenuItem, Select , Alert, Grid, Divider} from '@mui/material';
import axios from 'axios';



export default function TransactionForm() {

  const [bookingDate , setBookingDate] = React.useState(null)

  const [customers , setCustomers] = React.useState([])

  const [receivers , setReceivers] = React.useState([])

  const [messages , setMessages] = React.useState([])

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/message/all`).then((res) => {
      setMessages(res.data)
      console.log('message codes data :',res.data)
    }).catch((err) => {
      console.log('unable to fetch message codes')
    })
  },[])


  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/bank/all`).then((res) => {
      setReceivers(res.data)
      console.log(res.data , 'receivers data')
    }).catch((err) => {
      console.log('unable to fetch receivers data')
    })
  },[])

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/customer/all`).then((res) => {
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


  const [message , setMessage] = React.useState({
    id:"",
    msg: ""
  })

  const handleMessageCodeChange = (e) => {
    const {value} = e.target
    const data = messages?.find((m) => m.messageCode === value)
    setMessage({
      id: data?.messageCode,
      msg : data?.instruction
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
    const record = customers?.find((c) => c.customerId == sender?.customer_id)
    
    if(record){
       setSender((prev) => ({
         customer_id : record.customerId,
         account_holder_name: record.accountHolderName,
         clear_balance : record.clearBalance,
         overdraft : record.overDraftFlag ? "YES" : "NO"
       }))
       setError({
        isError: false ,
        message : ""
      })
    }
    else
    {

      if(sender.customer_id != ""){
      setError({
        isError: true ,
        message : "Customer Account Not Found"
      })
    }
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
    const record = receivers?.find((r) => r.bic == receiver?.bic)
    if(record){

      setReceiver((prev) => ({
        ...prev,
        institution : record.bankName
      }))

      setError({
        isError: false,
        message: ""
      })
    }
    else{
      if(receiver.bic != ""){
      setError({
        isError: true,
        message: "Receiver Account Not Found"
      })
    }
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

  const checkPayload = (p) => {
    return (p.customerId && p.receiverBIC && p.receiverAccountHolderName
          && p.receiverAccountHolderNumber && p.transferTypeCode && p.messageCode
          && p.transferFees && p.inrAmount && p.transferDate)
  }

  const makeTransaction = () => {
   
    const payload = {
      customerId : sender?.customer_id,
      receiverBIC : receiver?.bic,
      receiverAccountHolderName : receiver?.account_holder_name,
      receiverAccountHolderNumber : receiver?.account_holder_number,
      transferTypeCode : transferType,
      messageCode : message?.id,
      transferFees : transferFees ,
      inrAmount : amount ,
      transferDate : bookingDate,
      status: (isValid()) ? true : false,
    
    }

    if(!isValid() && checkPayload(payload)){
      console.log('inside invalid condition')
      axios.post(`http://localhost:5000/api/v1/transaction/add`,payload)
      .then((res) => {
        console.log('failed transaction saved in the database')
      }).catch((err) => console.log('unable to save the failed transaction details'))
      return
    }
     
    if(isValid()){
       console.log('inside else condition')
    axios.post(`http://localhost:5000/api/v1/transaction/add`,payload)
    .then((res) => {
      console.log(res.data)
      axios.patch(`http://localhost:5000/api/v1/customer/${sender?.customer_id}`,{
          customerId: sender?.customer_id,
          accountHolderName: sender?.account_holder_name,
          overDraftFlag: sender?.overdraft?.toUpperCase() === "YES" ? 1 : 0,
          clearBalance: clearBalance,
          transferType: null
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
      <Grid container spacing={2}>
        
        <Grid item xs={12}>
        {(error?.isError && error?.message != "") && <Alert severity="error">{error?.message}</Alert>}
        </Grid>
     

        <Grid item xs ={12}sx={{mr : "auto"}} >
         <h4 style={{textAlign:'left'}}>Sender Details</h4>
         </Grid>

        {/* sender details */}
       <Grid container item xs={12}>
         
         

         <Grid item xs={12} md={3} >
         {/* input customer Id */}
         <TextField
          id="input-customer-id"
          label="Customer Id"
          type="text"
          value={sender?.customer_id ?? ""}
          onChange={handleCustomerIdChange}
        />
        </Grid>
 
        <Grid item xs={12} md={3} >
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
        </Grid>

        <Grid item xs={12} md={3} >
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
        </Grid>

        <Grid item xs={12} md={3} >
         <TextField
          id="input-currency"
          label="Overdraft"
          type="text"
          value={sender?.overdraft}
          inputProps={{
            readOnly:true
          }}
        />     
        </Grid>

       </Grid>



       {/* receiver details */}
       <Grid container item xs={12}>

         <Grid item xs={12}>
         <h4 style={{textAlign:'left'}}>Receiver Details</h4>
         </Grid>
        

          <Grid container item xs={12}>
         <Grid item xs={12} md={3}>
         {/* input bic*/}
         <TextField
          id="input-bic"
          label="BIC"
          type="text"
          value={receiver?.bic}
          onChange={handleBicChange}
        />
        </Grid>

        <Grid item xs={12} md={3}>
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
        </Grid>

        <Grid item xs={12} md={3}>
        {/* input Account Holder Name */}
        <TextField
          id="input-receiver-ac-name"
          label="Account Holder name"
          type="text"
          value={receiver?.account_holder_name}
          onChange={handleReceiverAcNameChange}
        />
        </Grid>

        <Grid item xs={12} md={3}>
         {/* input receiver account holder number */}
         <TextField
          id="input-account-holder-number-receiver"
          label="Acccount Holder Number"
          type="text"
          value={receiver?.account_holder_number}
          onChange={handleReceiverAcNoChange}
        />     
        </Grid>
        </Grid>

       </Grid>

        
        {/* Transaction Details */}
        
        <Grid item container xs={12}>
          <Grid item xs={12}>
          <h4 style={{textAlign:'left'}}>Transaction Details</h4>
          </Grid>

          <Grid container item xs={12} spacing={1}>

             <Grid item xs={12} md={4}>
                 {/* input transfer type */}
        <FormControl fullWidth >
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
             </Grid>

             <Grid item xs={12} md={4}>
                   {/* input amount */}
      <TextField
          id="input-transaction-amount"
          label="Amount"
          value={amount}
          onChange={handleAmountChange}
          type="number"
        />  
                </Grid>


                <Grid item xs={12} md={4}>
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
                </Grid>


               
             <Grid item xs={12} md={4}>
                  {/* input message code */}

      <FormControl fullWidth  >
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
              return <MenuItem key ={m.messageCode} value={m.messageCode}>{m.messageCode}</MenuItem>
            })
          }
          
        </Select>
      </FormControl>
             </Grid>

             <Grid item xs={12} md={4}>
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
                </Grid>

                <Grid item xs={12} md={4}>
                <DateInput label="Booking Date" defaultDate={bookingDate} setDate={setBookingDate} />
                </Grid>
         
          </Grid>
         

            

       </Grid>

       <Grid item xs={12}>
       <Button onClick={makeTransaction} variant="contained" sx={{m:2}}>Proceed </Button>
       </Grid>

      </Grid>
    </Box>
    </div>
  );
}

