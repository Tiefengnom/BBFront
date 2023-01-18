// import {createContext,  useContext, useState, useReducer} from 'react';

// const GlobalContext = createContext()

// const useGlobal = () =>  useContext(GlobalContext);



// const GlobalProvider =({children}) => {
//     const [user1, setUser1] = useState({firstName: "", lastName: "", email: "", password: ""})
   


//     return(
//         <GlobalContext.Provider value={{user1, setUser1}}>
//             {children}
//         </GlobalContext.Provider>
        
//     )
// }
// export {useGlobal, GlobalProvider}