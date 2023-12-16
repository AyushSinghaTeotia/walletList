const express=require("express");
const app=express();
const nodemailer = require('nodemailer');
app.use(express.json())

const {Web3}=require("web3");
const Abi=require("./Abi.json");
const web3= new Web3("https://sepolia.infura.io/v3/0f1d34179ba34aedad509904d800610f");
const contractAddress="0x154DF4F70c39ea4576498f47990B470dDc292806";
const contractInstance= new web3.eth.Contract(Abi,contractAddress)

//for sent wallet events as a notification
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hubert.bednar6@ethereal.email',
        pass: 'dEr731zHTj6U8eeE5F'
    }
});


const sendNotificationEmail = async(WalletAdded) => {
    const response = await transporter.sendMail({
        from: '"Ayush" <hubert.bednar6@ethereal.email>', // sender address
        to: "sayush497@gmail.com", // list of receivers
        subject: "New Wallet Added", // Subject line
        text: `A new wallet has been added: ${JSON.stringify(WalletAdded)}`, 
      });

    console.log(response);
};
//fetching notifiction from sepolia network
const FetchingEvents = async() => {
    const WalletAdded = await contractInstance.getPastEvents('WalletAdded',{
                        fromBlock:4889222,
                        toBlock:'latest'
                    },
                    (events)=>{console.log(events)}
                    
    )
    console.log("fetched events ==>", WalletAdded); //for only address feth [0].returnValues.wallet
    sendNotificationEmail(WalletAdded);
            
}

FetchingEvents();

app.listen(3000,()=>{
    console.log('server started');
});
