import React from "react";
import { useNavigate } from "react-router";
import Book from "../assets/book-open.png";

function BorrowedByMe({books}) {
    const navigate = useNavigate();
    return (
        <div>
            <p className="font-bold text-2xl">Books borrowed by me</p>
            {books.map((b) => (
                <div key={b._id} className="bg-white w-full p-5 shadow-lg rounded border-b-[4px] border-transparent hover:border-orange-500 text-gray-700 text-center mt-4">
                    <div>{b.title}</div>
                    <img
                                            onClick={()=>navigate(`/catalogue/${b._id}`)}
                                            src={!b.image || b.image === "none" ? Book :b.image }
                                            alt='book cover'
                                            className='h-[200px] m-auto mb-4'
                                        />
                    <div>Borrowed until {b.btime.slice(8, 10)}.{b.btime.slice(5, 7)}.
                    {b.btime.slice(0, 4)}</div>
                   {" "}
                    <button
                        onClick={() => navigate(`/catalogue/${b.book_id}`)}
                        className=' bg-white bg-opacity-60 px-6 py-2 border-2 border-white-500  font-medium text-xs leading-tight  rounded-full  hover:bg-orange-400  focus:outline-none focus:ring-0 transition duration-150 ease-in-out cursor:pointer'>
                        More Info
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BorrowedByMe;
