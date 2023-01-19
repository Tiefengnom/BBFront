import React, { useState } from "react";

const DeleteBook = ({ id, didDelete, setDidDelete, port}) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        if (!window.confirm("Do you really want to delete this book?")) {
            return;
        }

        const url = `https://sore-visor-dove.cyclic.app/bookbandits/user/user_collection/${id}`;

        const response = await fetch(url, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            setDidDelete(!didDelete);
            setError(null);
            console.log("book deleted", json);
        } else {
            setError(json.error);
            console.log(error);
        }
    };

    return (
        <div>
            <button
                onClick={handleDelete}
                className='bg-orange bg-opacity-[45%]  mb-3 mr-4 inline-block px-6 py-2 border-2 border-white-500 font-medium text-xs leading-tight  rounded-full  hover:bg-orange-400  focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                Delete
            </button>
        </div>
    );
};

export default DeleteBook;
