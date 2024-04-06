import { AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";

function BookModal({ book, onClose }) {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(event) => event.stopPropagation()}
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          
          <h2 className="my-1">{book.genre}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
       
          <h2 className="my-1">{book.price}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
         
          <h2 className="my-1">{book.quantity}</h2>
        </div>
        <p className="my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aut
          atque culpa molestias reiciendis praesentium possimus nihil alias
          pariatur sunt. Harum consectetur modi exercitationem quaerat quae et
          provident eligendi omnis?
        </p>
      </div>
    </div>
  );
}

export default BookModal;
