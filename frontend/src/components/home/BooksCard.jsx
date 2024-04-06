import BookSingleCard from './BookSingleCard';

function BooksCard({ books }) {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
        {books.map((item) => (
            <BookSingleCard key={item._id} book={item} />
        ))}
    </div>
  )
}

export default BooksCard