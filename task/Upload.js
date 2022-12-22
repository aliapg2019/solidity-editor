const express = require('express');
const upload = require('express-fileupload')
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
// const bodyParser = require("body-parser");
var Files;
// app.use(bodyParser.json());
app.use(upload());
app.use(cors({
    origin: "*",
    methods: "*",
    }));
app.post('/upload', (req,res)=>{
    
    try {
        if(req.files){
            // console.log(req.files);
            var file = req.files.File;
            var fileName = file.name;
             Files = fileName;
            file.mv('./upload/'+fileName , (err)=>{
            
                if(err){
                    res.send(err)
                }else{
                    const fd = fs.readFile('./upload/'+fileName,{encoding:'utf8'} , (err , data)=>{
                        if(err){ 
                        }
                        console.log("data",data);
                        const dataa = data;
                        res.send({ success: true, data:dataa , filename: fileName});
                    })
                    // res.send("file uploaded.");
                     
                }
            });
            
          
        }
    } catch (error) {
        console.log(error);
    }
   
});

app.get('/getFilename', (req , res)=>{
    //joining path of directory 
var directoryPath = path.join(__dirname, './upload');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    let listContracts=[];
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    
    //listing all files using forEach
    files.forEach(function (file , inedex ,list) {
        // Do whatever you want to do with the file
        if(file.endsWith(".sol"))
        listContracts.push(file)

      
        // list[inedex] =file;

        // listContracts = list;
        
    });
    console.log(listContracts);
    res.send({List:listContracts})

    
});
})

app.get('/getSource', (req,res)=>{
    const nameFile = req.query.id;
    console.log(nameFile);
    
            const fd = fs.readFile('./upload/'+nameFile,{encoding:'utf8'} , (err , data)=>{
                if(err){ 
                }
                console.log("data",data);
                const code = data;
                res.send({ success: true, data:code});
            });
            // res.send("file uploaded.");
             
    
    
});

app.listen(5000, ()=>{
    console.log("server started.");
});