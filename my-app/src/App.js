import { useState, useRef } from 'react';
import {ethers} from 'ethers';

// import "./Componentss/Upload.css";
import './App.css';
import React from 'react';



function App() {
  const [codes,setCodes]=useState(`//SPDX-License-Identifier: UNLICENSED
  pragma solidity ^0.8.0;
  
  contract FirstContract {
      // declaring a variable
      uint public x;
      
      // writing a constructor
      constructor() {
          x = 10;
      }
      
      // setting the variable 
      function setData(uint _x) public {
          x = _x;
      }
      
      // getting the variable
      function getData() public view returns (uint) {
          return x;
      }
  }`);

  const txtRef = useRef();
  const fileRef = useRef();
  const listRef = useRef();
  const [Bytecode , setBytecode] = useState(null);
  const [abi , setAbi] = useState(null);
  const [contractsName , setContractsName] = useState([]);
  
  function handle_compile() {
      fetch("http://localhost:8000/compile", {
        method: "post",
        body: JSON.stringify({source: codes}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res) => res.json())
      .then((res) => {
        console.log(JSON.parse(res.abi) );
        setAbi(JSON.parse(res.abi));
        setBytecode(res.bytcode);
        // const contracts = res.output.contracts["../my-app/src/abi/contracts/MyContract.sol"];
        // const contractClass = Object.keys(contracts)[0];
        // setBytecode(contracts[contractClass].evm.bytecode.object);
        // setAbi(contracts[contractClass].abi);
        // console.log( Bytecode , abi);
      });
      
  }
  
  
  async function handle_deploy() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    
    const signer = provider.getSigner();
    
    const accounts = await provider.listAccounts();
    console.log("deploying from", accounts[0]);

    const factoty = new ethers.ContractFactory(abi, Bytecode, signer);
    const contract = await factoty.deploy();
    
    console.log("deployed to", contract.address);
  }
 
  

  async function handle_upload() {
    
    const formData = new FormData();
		formData.append('File', fileRef.current.files[0]);
    
    
		fetch(
			'http://localhost:5000/upload',
			{
				method: 'POST',
				body: formData
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
        setCodes(result.dataa);
        
        
        
        
			})
			.catch((error) => {
				console.error('Error:', error);
			});
  }
  function getFilename(){
    const formData = new FormData();
		formData.append('File', fileRef.current.files[0]);
    fetch('http://localhost:5000/getFilename').then(Name => Name.json()).then(res =>{
      // let contract = JSON.parse(res);
      setContractsName(res.List);
      // console.log(contractsName);
      // console.log(contract.List);
    })
  }

  function codeContract(item){
    console.log(item);
    let items = item;
    fetch("http://localhost:5000/getSource?id="+items, {
        // method: "post",
        // body: JSON.stringify({Name: items}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setCodes(res.data);
      });
    
      
  }
    
  
  return (
    <>
      <div className="all">
      {/* <div className='upload'>
            <UploadSol />
          </div> */}
        <div className="list-bar-contracts">
            
            <ul >
                {contractsName != undefined && contractsName.map((item,index) =><li  key={index}  style={{color:"black"}}><button onClick={()=>{codeContract(item);}}>{item}</button></li>)}
            </ul>
            
        </div>
        {/* <div className='right-content'>
            <div className="codding">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro in laudantium, totam dolorem repudiandae, laboriosam quo quae laborum debitis dolore eos, ducimus libero cupiditate odit id quis velit sequi! Deserunt. 
             </div>
            
            <div className='err-box'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore eos velit accusamus assumenda maiores harum, nulla iusto voluptatum error labore, id illo sapiente ad voluptatibus dolor, laborum doloremque vitae eligendi.
            </div>
        </div> */}
        <div className="CCO">
        <textarea ref={txtRef} className="code-input" value={codes} onChange={e => setCodes(e.target.value)}></textarea>
        <div className='float-buttons'>
        <button className="float-btn" onClick={handle_compile}>Compile</button>
        <button className="float-btn" onClick={handle_deploy}>Deploy</button>
        <input type="file" ref={fileRef} className="float-btn" name='file'/>
        <button className="float-btn" onClick={handle_upload}>Upload</button>
        <button className="float-btn" onClick={getFilename}>list</button>
    </div>
        </div>
        </div>
    
    {/* <textarea ref={txtRef} className="code-input" value={codes} onChange={e => setCodes(e.target.value)}></textarea>
    <div className='float-buttons'>
      <button className="float-btn" onClick={handle_compile}>Compile</button>
      <button className="float-btn" onClick={handle_deploy}>Deploy</button>
      
    </div> */}
    
    </>
  );
}

export default App;
