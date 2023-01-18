import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
// import { useUBContext } from "../hooks/useUBContext";

import BorrowedByMe from "../components/BorrowedByMe";
import BorrowedFromMe from "../components/BorrowedFromMe";

const AccountLanding = ({port}) => {
    const { user } = useUserContext();
    // const { bBooks, setbBooks } = useUBContext();
    const navigate = useNavigate();
    const borrowedByMe = user.rbooks;
    //user.rbooks fehtl das owner feld
    //bei bbooks sind 2 bücher dabei die ich von mir selbst geliehen habe
    //wozu gibt es use ub context?
    const borrowedFromMe = user.bbooks;

    const [enabledBy, setEnabledBy] = useState(false);
    const [enabledFrom, setEnabledFrom] = useState(false);

    console.log(borrowedByMe);
    console.log(borrowedFromMe);
   
    const lentBook = async (b) => {
       await fetch('https://sore-visor-dove.cyclic.app/bookbandits/lentbook', {
            method: "POST",
            body: JSON.stringify({ bid: b }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                
            },
        })
        console.log(b)
        console.log(b)
    };
   
    

    const nolentBook = async (bookid,borrower) => {
        await fetch('https://sore-visor-dove.cyclic.app/bookbandits/deniedbook', {
            method: "POST",
            body: JSON.stringify({borrowed: false, bid : bookid, user_id : user._id,borrower: borrower }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                
            },
        });
        console.log(bookid)
    };

    return (
        <div className=' header w-full h-full  pt-12 pb-12 px-4  mt-10 '>
          

                    <>
                        <button
                            onClick={() => navigate(`/${user._id}/user_collection`)}
                        className='mt-6 mb-6 mr-4 inline-block px-6 py-2 border-2 border-white-500  font-medium text-xs leading-tight  rounded-full hover:bg-pink-600 hover:bg-opacity-[45%] focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                        See all my books
                    </button>
                    <button
                        onClick={() => navigate(`/${user._id}/create_book`)}
                        className='bg-white mt-6 mb-6 mr-4 inline-block px-6 py-2 font-medium text-xs leading-tight  rounded-full hover:bg-pink-600 hover:bg-opacity-[45%] focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                        {" "}
                        Add Book
                    </button>
                    <button
                        onClick={() => {
                            setEnabledBy(!enabledBy);
                        }}
                        className='bg-white mt-6 mb-6 mr-4 inline-block px-6 py-2  font-medium text-xs leading-tight  rounded-full hover:bg-pink-600 hover:bg-opacity-[45%] focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                        Borrowed by me
                    </button>
                    <button
                        onClick={() => {
                            setEnabledFrom(!enabledFrom);
                        }}
                        className='bg-white mt-6 mb-6 mr-4 inline-block px-6 py-2  font-medium text-xs leading-tight  rounded-full hover:bg-pink-600 hover:bg-opacity-[45%] focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>
                        Borrowed from me
                    </button>
                    <Outlet />
                    <div className={!enabledBy && "hidden"}>
                        <BorrowedByMe books={borrowedByMe} approve={lentBook} reject={nolentBook} />{" "}
                    </div>
                    <div className={!enabledFrom && "hidden"}>
                        <BorrowedFromMe books={borrowedFromMe} approve={lentBook} reject={nolentBook}  />{" "}
                    </div>
                </>
            
        </div>
    );
};

export default AccountLanding;
