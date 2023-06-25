import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import {Home} from "./Pages/Home.jsx";
import {Login} from "./Pages/Login.jsx";
import {ShoppingList} from "./Pages/ShoppingList.jsx";
import {SignUp} from "./Pages/SignUp.jsx";

async function ProtectedRoute({children}) {
    let token = localStorage.getItem('token')
    let response = await fetch("http:localhost:3030/api/v1/protected", {
        headers: {
            auth: token
        }
    })
    if (response.ok) {
        return children
    } else {

    }
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Shoppinglist" element={<ShoppingList />} />
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
