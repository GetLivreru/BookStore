import React, {useEffect, useState} from 'react';
import Spinner from '../components/Spinner';
import BooksTable from '../components/home/BooksTable';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('');
  useEffect( () => {
    setLoading(true);
    const handleFetch = async () => {
      try {
        const resp = await fetch('http://localhost:5555/books')
        const { data } = await resp.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    handleFetch()
  }, []);

  return (
    <main className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sly-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('table')}>
          Table
        </button>
        <button className='bg-sly-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('card')}>
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books list</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (<Spinner />) : showType === 'table' ? <BooksTable books={books} /> : <BooksCard  books={books} />}
    </main>
  )
}

export default Home
