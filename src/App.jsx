import { data, p } from 'motion/react-client';
import React, { useRef, useState } from 'react';

function App() {
  // Create a reference to access the hidden file input element
  const fileInputRef = useRef(null);

  const [error ,seterror]= useState('')

  // Store the name of the selected file
  const [fileName, setFileName] = useState('');

  // Handle file selection
  const handleFileChange = async(e) => {
    seterror('')
    const file = e.target.files[0]; // Get the first file
     const fileName = file.name.toLowerCase();
  if (!fileName.endsWith(".csv")) {
    
    seterror('Only CSV files are allowed.')
    return;
  }
    if (file) {
      
      setFileName(file.name); // Update state with the file name
      console.log("Selected file:", file.name);
      console.log(file)
      const formData=new FormData
      formData.append('file',file)

      try {
        const respons = await fetch('http://localhost:5000/upload',{
          method:'POST',
          body:formData
        })
        if(respons.ok){
          const data= await respons.json()
          console.log('respose from the server');
          

            
  
        }

        
      } catch (error) {
        console.log('error while cathcing ',error);
        
        
      }

    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black gap-4 p-6">
      {/* Upload button that triggers the hidden file input */}
    <h1 className='text-white text-5xl font-extrabold font-serif ' >TIMBER<span className='' >TREK</span></h1>

      <h1 className='text-white text-3xl' >uploade the file in csv formate </h1>
      <h2  className='text-white' >make sure csv file is preprocessed </h2>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        onClick={() => fileInputRef.current.click()} // Trigger file input when clicked
      >
        📁 Upload File
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange} // Call function on file selection
        className="hidden"
      />

      {/* Display selected file name */}
      {fileName && (
        <p className="text-sm text-gray-400">
          Selected: {fileName}
        </p>
        
      )}
      {
        error && ( <p className='text-sm text-gray-400' >
          {error}
        </p> )
        

      }
      
    </div>
  );
}

export default App;
