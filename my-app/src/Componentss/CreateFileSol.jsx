// import { useState } from "react"


// function FileUploadPage(){
//   const [inputs, setInput] = useState(document.querySelector("#avatar"))
// 	function addFile(){
//     uploadFile(inputs.)
//   }

//   const uploadFile = file => {
//     // check file type
//   if (!['image/jpeg', 'image/gif', 'image/png', 'image/svg+xml'].includes(file.type)) {
//     console.log('Only images are allowed.')
//     return
//   }

//   // check file size (< 2MB)
//   if (file.size > 2 * 1024 * 1024) {
//     console.log('File must be less than 2MB.')
//     return
//   }

//     // add the file to the FormData object
//     const fd = new FormData()
//     fd.append('avatar', file)
  
//     // send `POST` request
//     fetch('http://localhost:8000/upload-avatar', {
//       method: 'POST',
//       body: fd
//     })
//       .then(res => res.json())
//       .then(json => console.log(json))
//       .catch(err => console.error(err))
//   }
// 	return(
//     <div>
// 			<input type="file" id="avatar" name="files[]" onChange={addFile}/>
// 		</div>
		
// 	)
// }

// export default FileUploadPage;




import React,{Component} from 'react';
import axios from 'axios'; 
class Appp extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      axios.post("http://localhost:8000/uploadfile", formData);
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
<p>File Type: {this.state.selectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h1>
              GeeksforGeeks
            </h1>
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default Appp;