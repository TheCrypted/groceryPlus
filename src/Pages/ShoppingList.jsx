import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Badge, IconButton} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart.js";
import {AccountDrop} from "../utils/AccountDrop.jsx";

export const ShoppingList = () => {
	const [logState, setLogState] = useState(false)
	const [user, setUser] = useState(null)
	const navigate = useNavigate()

	const authCheck = async () => {
		let token = localStorage.getItem("token")
		if (!token) {
			return {
				loggedIn: false
			}
		}
		let response = await fetch("http://localhost:3030/api/v1/protected", {
			method: "GET",
			headers: {
				auth: token
			}
		})
		if(response.ok){
			let resp = await response.json();
			setLogState(true)
			return {
				loggedIn: true,
				user: resp.user
			}
		}
	}

	useEffect(() => {
		authCheck().then(resp => {
			setLogState(resp.loggedIn)
			if(resp.loggedIn){
				setUser(resp.user)
			}
		})
	}, [])
	console.log(user)
	return (
		<>
		<div className="w-full h-[7%]">
			<div className="w-full h-full bg-gray-800 flex items-center border-b-2 border-gray-900">
				<div className="w-[10%] h-full text-white flex justify-center items-center p-6 text-3xl font-semibold hover:bg-gray-900 hover:cursor-pointer" onClick={()=>{
					navigate("/")
				}
				}>Grocery+</div>
				<div className="h-full w-[80%]"></div>
				<IconButton size="large" aria-label="Cart Icon showing items in cart" onClick={()=>{{navigate("/Shoppinglist")}}}>
					<Badge badgeContent={3} color="error" variant="dot">
						<ShoppingCartIcon sx={{
							color: "white",
						}}/>
					</Badge>
				</IconButton>
				{!logState && <div
					className="h-full pl-2 w-[10%] text-white font-semibold text-xl text-center pr-2 hover:underline hover:cursor-pointer"
					onClick={() => {
						navigate("/Login")
					}
					}>Login</div>}
				{logState && <AccountDrop />}
			</div>
		</div>
		<div style={{backgroundImage: "url(\"https://static.vecteezy.com/system/resources/previews/011/300/535/non_2x/abstract-3d-liquid-colorful-gradient-flow-wave-shape-elements-background-vector.jpg\")"}}
			 className="h-[93%] w-full bg-gray-950 scrollbar overflow-y-auto overflow-x-hidden flex flex-wrap p-4 gap-4">
			<div className="h-1/3 w-full  rounded-2xl shadow-xl backdrop-blur-2xl"></div>
		</div>
	</>
	)
}