import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";


function BookList() {
    const [books, setBooks] = useState([]);
    const [records, setRecords] = useState(books);

  
    useEffect(() => {
      fetch('https://localhost:7088/api/Book/GetBook')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);
  
    const Filter=(event)=>{
      setRecords(books.filter(f=>f.name.toLowerCase().includes(event.target.value)))
  }

    return (
      <div>

      <input type='next' className='form-control' onChange={Filter} placeholder='Search by lower letters of the book names'></input>
        <table style={{marginTop:"100px",marginLeft:"100px", wordSpacing:"1px"}}>
        <thead>
          <tr style={{fontWeight:"revert-layer", backgroundColor:"blue"}}>
            <th>Name</th>
            <th>Description</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Image</th>

          </tr>
        </thead>
        <tbody>
          {records.map((d) => (
            <tr  key={d.id}>
              <td>{d.name}</td>
              <td>{d.description}</td>
              <td>{d.author}</td>
              <td>{d.publishDate}</td>
              <td>
                <img style={{width:"200px" ,height:"150px"}} src={d.imageUrl}></img></td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
  
  export default BookList;