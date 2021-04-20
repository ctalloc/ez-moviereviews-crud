/* eslint-disable no-unreachable */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data)
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    });
    setMovieList([
      ...movieReviewList,
      {movieName:movieName, movieReview:review},
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  };

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update/', {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview('')
  };  

  return (
    <div className="App">
      <h1>ez-crud</h1>
      <div className='form'>
        <label className='form__label' htmlFor='movieName'>Movie Name</label>
        <input className='form__input' type='text' name='movieName'
          onChange={(e) => { setMovieName(e.target.value) }} ></input>
        <label className='form__label' htmlFor='review'>Review</label>
        <input className='form__input  review' type='text' name='review'
          onChange={(e) => { setReview(e.target.value) }} ></input>
        <button onClick={submitReview} >Submit</button>
      </div>
      {movieReviewList.map((val) => {
        return (
          <div className='card'>
            <h1>{val.movieName}</h1>
            <p>{val.movieReview}</p>
            <button onClick={() => deleteReview(val.movieName)}>Delete</button>
            <input className='card__input' type='text' onChange={(e)=> {
              setNewReview(e.target.value)
            }} ></input>
            <button onClick={()=>{updateReview(val.movieName)}}>Update Review</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
