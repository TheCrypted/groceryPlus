import './App.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {Home} from "./Pages/Home.jsx";
import {Login} from "./Pages/Login.jsx";
import {ShoppingList} from "./Pages/ShoppingList.jsx";
import {SignUp} from "./Pages/SignUp.jsx";
import {useEffect, useState} from "react";

function ProtectedRoute({children}) {
    let [auth, setAuth] = useState(true);
    useEffect(()=>{
        const getAuth = async () => {
            let token = localStorage.getItem('token')
            let response = await fetch("http://localhost:3030/api/v1/protected", {
                method: "GET",
                headers: {
                    auth: token
                }
            })
            if(!response.ok) {
                setAuth(false)
            }
        }
        getAuth()
    }, [])
    if (auth) {
        return children
    } else {
        return <Navigate to="/Login" />
    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            {/*<ProtectedRoute>*/}
                <Route path="/Shoppinglist" element={
                    <ProtectedRoute>
                        <ShoppingList />
                    </ProtectedRoute>
                } />
            {/*</ProtectedRoute>*/}
            <Route path="/Signup" element={<SignUp />} />
        </>
    )
)
function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
