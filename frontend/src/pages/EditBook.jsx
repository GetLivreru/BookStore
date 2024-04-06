import React, {useEffect, useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const EditBook = () => {
  const [book, setBook]=useState({title:'',author:'', publishYear:'', genre:'', quantity:'', price:''});
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect( () => {
    setLoading(true);
    const handleRequestToGetBook = async () => {
      try {
        const response = await fetch(`http://localhost:5555/books/${id}`)
        const { title, author, publishYear, genre, quantity, price } = await response.json();
        const requestedBook = { title, author, publishYear, genre, quantity, price };
        setBook(requestedBook);
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant:'info' })
      } catch (error) {
        setLoading(false);
        console.error(error);
        enqueueSnackbar(error, {variant:'error'});
      }
    }
    handleRequestToGetBook();
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook(prevState => {
      return { ...prevState, [name]:value }
    });
  }

  const handleRequest = async() => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method:'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(book)
      });
      const data = await response.json();
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-lg w-[600px] p-4 mx-auto'>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type='text' name='title' value={book.title} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type='text' name='author' value={book.author} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input type='number' name='publishYear' value={book.publishYear} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Genre </label>
            <input type='text' name='genre' value={book.genre} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Quantity </label>
            <input type='number' name='quantity' value={book.quantity} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Price </label>
            <input type='number' name='price' value={book.price} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <button className='p-2 bg-sky-300 m-8' onClick={handleRequest}>Save</button>
        </div>
      )}
    </div>
  )
}

export default EditBook
