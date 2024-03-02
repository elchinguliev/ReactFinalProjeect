import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from "react-router-dom";


function BookList({addToFavourites}) {
    const [books, setBooks] = useState([]);
    const [records, setRecords] = useState(books);
    const [comments, setComments] = useState({});

  
    useEffect(() => {
      fetch('https://localhost:7088/api/Book/GetBook')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }, []);
  
    // const handleClick = () => {
    //   addToFavourites({ books });
    // };
    const handleCommentAdd = (bookId, comment) => {
      const updatedComments = { ...comments };
      if (!updatedComments[bookId]) {
        updatedComments[bookId] = [];
      }
      updatedComments[bookId].push(comment);
      setComments(updatedComments);
    };

    const handleCommentRemove = (bookId, index) => {
      const updatedComments = { ...comments };
      updatedComments[bookId].splice(index, 1);
      setComments(updatedComments);
  };
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
                <img style={{width:"200px" ,height:"150px"}} src={d.imageUrl}></img>
              </td>

              <td>
                  {/* Render comments for this book */}
                  {/* {comments[d.id] && comments[d.id].map((comment, index) => (
                  <div key={index}>
                       {comment}
                        <button style={{marginLeft:"100px"}} onClick={() => handleCommentRemove(d.id, index)}>Remove</button>
                                    </div>
                         ))}
                        Add comment form */}
                        <form onSubmit={(e) => {
                        e.preventDefault();
                        const newComment = e.target.comment.value;
                       if (newComment.trim() !== '') {
                         handleCommentAdd(d.id, newComment);
                          e.target.reset();
                           }
                                }}>
                       <input style={{width:"100%", fontSize:"20px", marginLeft:"5px"}} type="text" name="comment" placeholder="Add a comment" />
                        <button className='addBtn'  type="submit">Add</button>
                        {comments[d.id] && comments[d.id].map((comment, index) => (
                  <div key={index}>
                       {comment}
                        <button className='removeBtn'  onClick={() => handleCommentRemove(d.id, index)}>Remove</button>
                                    </div>
                         ))}
                          </form>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
  
  export default BookList;