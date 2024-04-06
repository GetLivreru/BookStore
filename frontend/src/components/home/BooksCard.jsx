import React, { useState } from 'react';
import BookSingleCard from './BookSingleCard';

function BooksCard({ books }) {
  const [genreSearch, setGenreSearch] = useState('');
  const [priceSearch, setPriceSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAttribute, setSortAttribute] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const booksPerPage = 10;

  const filteredBooks = books
    .filter(book =>
      book.genre.toLowerCase().includes(genreSearch.toLowerCase()) &&
      book.price.toString().includes(priceSearch)
    )
    .sort((a, b) => {
      if (sortAttribute === 'price') {
        return sortDirection === 'asc'
          ? a[sortAttribute] - b[sortAttribute]
          : b[sortAttribute] - a[sortAttribute];
      } else {
        return sortDirection === 'asc'
          ? a[sortAttribute].localeCompare(b[sortAttribute])
          : b[sortAttribute].localeCompare(a[sortAttribute]);
      }
    });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div>
      <div className='mb-4'>
        <input
          type="text"
          value={genreSearch}
          onChange={e => setGenreSearch(e.target.value)}
          placeholder="Search by genre"
        />
        <input
          type="text"
          value={priceSearch}
          onChange={e => setPriceSearch(e.target.value)}
          placeholder="Search by price"
        />
        <select value={sortAttribute} onChange={e => setSortAttribute(e.target.value)}>
          <option value="title">Title</option>
          <option value="price">Price</option>
        </select>
        <select value={sortDirection} onChange={e => setSortDirection(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
        {currentBooks.map((item) => (
          <BookSingleCard key={item._id} book={item} />
        ))}
      </div>
      <div className='mt-4'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'bg-blue-500 text-white' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BooksCard;