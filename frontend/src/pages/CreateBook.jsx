import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const CreateBook = () => {
  const [newBook, setNewBook]=useState({
    title:'',
    author:'', 
    publishYear:'',
    genre:'',
    quantity:'',
    price:''
  });
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook(prevState => {
      return { ...prevState, [name]:value }
    });
  }

  const handleRequest = async() => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5555/books`, {
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(newBook)
      });
      const data = await response.json();
      setLoading(false);
      navigate('/');
      enqueueSnackbar('Book created successfully', {variant:'success'})
    } catch (error) {
      setLoading(false);
      console.error(error);
      enqueueSnackbar(error, {variant:'error'});
    }
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-lg w-[600px] p-4 mx-auto'>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input type='text' name='title' onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type='text' name='author' onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input type='number' name='publishYear' onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Genre </label>
            <input type='text' name='genre' onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Quantity</label>
            <input type='number' name='quantity' onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>
          <div className='my-2'>
            <label className='text-xl mr-4 text-gray-500'>Price</label>
            <input type='number' name='price' onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full' />
          </div>

          <button className='p-2 bg-sky-300 m-8' onClick={handleRequest}>Save</button>
        </div>
      )}
    </div>
  )
}

export default CreateBook
