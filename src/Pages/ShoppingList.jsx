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
		<div className="w-full h-[7%] z-10">
			<div className="w-full h-full bg-gray-900 flex items-center border-b-2 border-gray-900">
				<div className="w-[10%] h-full text-white flex justify-center items-center p-6 text-3xl font-semibold hover:bg-gray-900 hover:cursor-pointer" onClick={()=>{
					navigate("/")
				}
				}>Grocery+</div>
				<div className="h-full w-[80%] flex items-center justify-center text-white font-semibold text-2xl">Your Shopping List</div>
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
		<div style={{backgroundImage: "url(\"https://static.vecteezy.com/system/resources/previews/011/300/535/non_2x/abstract-3d-liquid-colorful-gradient-flow-wave-shape-elements-background-vector.jpg\")"}} className="h-[93%] w-full bg-gray-950 scrollbar overflow-y-auto overflow-x-hidden flex flex-wrap p-6 gap-4">
			<div className="h-1/3 w-full bg-translucentWhite  rounded-2xl shadow-xl backdrop-blur-2xl grid grid-cols-[8%_52%_40%]">
				<div style={{}} className=" p-4 text-white font-bold text-4xl flex justify-center items-center border-l-2 border-translucentWhite [transform:rotate(180deg)] [writing-mode:vertical-lr] [text-orientation:sideways] ">Monday</div>
				<div className="p-1 pt-2 overflow-y-auto scrollbar border-r-2 border-gray-800">
					<div className=" hover:shadow-xl w-full h-1/4 p-1 hover:cursor-pointer hover:bg-translucentHover rounded-md grid grid-cols-[5%_65%_20%_10%]">
						<div style={{backgroundImage:"url(\"https://z.nooncdn.com/tr:n-t_800/v1663324304/N34537911A_1.jpg\")"}} className=" rounded-md w-full h-full bg-cover bg-center bg-no-repeat"></div>
						<div className="text-white font-semibold pl-4 text-xl flex items-center">Fresh Pumpkin Red</div>
						<div className="text-gray-300 font-semibold pl-4  flex items-center">500g · 5.81 per kg</div>
						<div className="bg-blue-700 rounded-r-md"></div>
					</div>
					<div className=" hover:shadow-xl w-full h-1/4 p-1 hover:cursor-pointer hover:bg-translucentHover rounded-md grid grid-cols-[5%_65%_20%_10%]">
						<div style={{backgroundImage:"url(\"https://z.nooncdn.com/tr:n-t_800/v1663324304/N34537911A_1.jpg\")"}} className=" rounded-md w-full h-full bg-cover bg-center bg-no-repeat"></div>
						<div className="text-white font-semibold pl-4 text-xl flex items-center">Fresh Pumpkin Red</div>
						<div className="text-gray-300 font-semibold pl-4  flex items-center">500g · 5.81 per kg</div>
						<div className="bg-blue-700 rounded-r-md"></div>
					</div>
				</div>
				<div className="p-2 grid grid-rows-[30%_30%_40%]">
					<div className="">Sh</div>
					<div className="flex">
						<div className="bg-white w-full h-full"></div>
						<div className="bg-red-500 w-full h-full"></div>
					</div>
					<div className=""></div>
				</div>
			</div>
		</div>
	</>
	)
}