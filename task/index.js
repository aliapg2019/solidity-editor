const solc = require("solc");
const solcImport = require("solc-import");
const path = require("path");
const fs = require("fs");
const {exec} = require("child_process");
//const { accounts, defaultSender, Contract, web3, provider, isHelpersConfigured } = require('@openzeppelin/test-environment');
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const formidable = require('formidable');



app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
origin: "*",
methods: "*",
}));


const ABI_FILE_NAME = "../my-app/src/abi/MyContract.json";
// "MyContract_sol.abi";
const BYTECODE_FILE_NAME = "../my-app/src/abi/MyContract.bin";
//  "MyContract_sol.bin";
const SOLIDITY_FILE_NAME = "MyContract.sol";
//  "../my-app/src/abi/contracts/MyContract.sol";
//"MyContract.sol";

app.post("/compile", async (req, res) => {
    
    const solidity_text = req.body.source;
    // console.log(solidity_text);
    const store_path = path.resolve(__dirname, SOLIDITY_FILE_NAME);
    fs.writeFileSync(store_path, solidity_text);
//======================== Get Name Contract ============================================================
    const IMPORT = solidity_text.match("contract ").index +9;
    let className =""; 
    for(let index = IMPORT ; index<= solidity_text.length ; index++){
      if(solidity_text[index] == " " && solidity_text[index+1] == "i" && solidity_text[index+2] == "s"){
        break;
      }
      if(solidity_text[index] == " " && solidity_text[index+1] == "{"){
        break;
      }
      if(solidity_text[index+1] == "{"){
        break;
      }
      className += solidity_text[index];
      console.log(solidity_text[index]);
    }
    
    console.log(className.endsWith(" "));
    //=========================== Compile ===================================================================================================================
    
      await exec(`npx solcjs --bin --abi --include-path node_modules/ --base-path . ${SOLIDITY_FILE_NAME} -o contracts`, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
          
//====================search abi and bytcode ======================================================================================= 
          var directoryPath = path.join(__dirname, './contracts');
    
    fs.readdir(directoryPath, function (err, files) {
        let listContracts , abi , bytcode;
        
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        
        files.forEach(function (file , inedex ,list) {
            list[inedex] =file;
            listContracts = list;

        });

        listContracts.forEach(element => {
          if (element == `MyContract_sol_${className}.abi`){
            const fd = fs.readFile('./contracts/'+element,{encoding:'utf8'} , (err , data)=>{
              if(err){ 
              }
              
               abi = data;
              
              console.log("abi:",abi);
              
            });
          }

          if (element == `MyContract_sol_${className}.bin`){
            const fd = fs.readFile('./contracts/'+element,{encoding:'utf8'} , (err , data)=>{
              if(err){ 
              }
              
               bytcode = data;
              
              console.log("bytcode:",bytcode);
              
              res.send({ success: true, abi , bytcode});
            });
          }
          
        });
        
          
           
        });
        
      });
    


      
     
    
    
   //================================================================================================ 
    // const input = {
    //   language: "Solidity",
    //   sources: {
    //     [SOLIDITY_FILE_NAME]: {
    //       content: solidity_text,
    //     },
    //   },
    //   settings: {
    //     outputSelection: {
    //       "*": {
    //         "*": ["*"],
    //       },
    //     },
    //   },
    // };
     
        // const output = JSON.parse(solc.compile(JSON.stringify(input)));
      
      
      
    //   console.log('output:', output);
    //   const contract = output.contracts[SOLIDITY_FILE_NAME];
    //   const contractClass = Object.keys(contract)[0];

    //   const abi = contract[contractClass].abi;
    //   const bytecode = contract[contractClass].evm.bytecode.object;
      
    // const store_abi_path = path.resolve(__dirname, ABI_FILE_NAME);
    // fs.writeFileSync(store_abi_path, JSON.stringify(abi));
    

    // const store_bin_path = path.resolve(__dirname, BYTECODE_FILE_NAME);
    // fs.writeFileSync(store_bin_path, bytecode);
    
    // res.send({ success: true, output});
});

app.post('/uploadfile', async (req, res) => {
  console.log(req.files);
})

app.listen(8000, () => {
    console.log("server started");
});
