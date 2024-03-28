import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { tableDataAction } from "../store/strore";
import * as XLSX from 'xlsx';

export default function Home(){
  const [selectedFile,setSelectedFile] = useState(null)
  const [showTable,setShowTable] = useState(false)
  const {tableData} = useSelector((store)=>store.tableDataStore)
  // console.log("table data ... : ",tableData);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutBtnHandler = ()=>{
        localStorage.removeItem("user")
        navigate('/login')
    }
    
//
const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedFile(file)
  }

  const uploadBtnHandler = ()=>{
    if (!selectedFile) return;

    // Check if the file is in Excel format
    if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // console.log(sheet);
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        // console.log(jsonData); 
        dispatch(tableDataAction.addData(jsonData))
        
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      alert('Please upload an Excel file.');
    }
  }
//
const showBtnHandler = ()=>{
     setShowTable((state)=>!state)
}


    return <div className="home">
    <nav className="nav">
        <h3>Home</h3>
        <button onClick={logoutBtnHandler} className="logout">logout</button>
    </nav>
    <div className="uploadSec">
    <input onChange={fileChangeHandler} type="file" /> <button onClick={uploadBtnHandler}>Upload</button>
    </div>
    
    {showTable?<button onClick={showBtnHandler}>Hide Table</button>:<button onClick={showBtnHandler}>Show Table</button>}
    <div className="table" style={showTable?{display:"block"}:{display:"none"}}>
      {tableData.length>0? <table border={1}>
      <thead>
      <tr>
        {Object.keys(tableData[0]).map((key)=><th key={key}>{key}</th>)}
      </tr>
      </thead>
      <tbody>
      {tableData.map((data,idx)=><tr key={idx}>
        {
          Object.values(data).map((elm)=><td key={elm}>{elm}</td>)
        }   
      </tr>)}
      </tbody>
    </table> : <p>No table data Please upload a XL file</p>}
    
    </div>
    </div>
     
}