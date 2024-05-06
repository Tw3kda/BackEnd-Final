const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("WELCOME TO MY FiNAL PROJECT API ------ NAVARRO-MORENO")
    

}) 



// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});