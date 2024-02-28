import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";


function BookList() {
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);

  
    useEffect(() => {
      fetch('https://localhost:7088/api/Book/GetBook')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);
  
    return (
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
          {books.map(book => (
            <tr  key={book.id}>
              <td>{book.name}</td>
              <td>{book.description}</td>
              <td>{book.author}</td>
              <td>{book.publishDate}</td>
              <td>
                <img style={{width:"200px" ,height:"150px"}} src={book.imageUrl}></img></td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
  
  export default BookList;