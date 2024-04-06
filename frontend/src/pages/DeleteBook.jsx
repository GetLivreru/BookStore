import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method:'DELETE'
      })
      const data = await response.json();
      setLoading(false);
      navigate('/');
      enqueueSnackbar('Book delete successfully', {variant:'info'});
    } catch (error) {
      setLoading(false);
      console.error(error);
      enqueueSnackbar(error, {variant:'error'});
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white text-2xl m-4 w-full' onClick={handleDeleteBook}>Yes, delete it</button>
        <button className='p-4 bg-blue-600 text-white w-full' onClick={() => navigate('/')}>No, cancel and go back</button>
      </div>
    </div>
  )
}

export default DeleteBook
