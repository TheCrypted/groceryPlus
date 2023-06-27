import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Badge, IconButton} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart.js";
import {AccountDrop} from "../utils/AccountDrop.jsx";
import {AddCircleRounded} from "@mui/icons-material";

export const ShoppingList = () => {
	const [logState, setLogState] = useState(false)
	const [user, setUser] = useState(null)
	const [items, setItems] = useState([])
	const [heightState, setHeightState] = useState("33%")
	const [showForm, setShowForm] = useState(false)
	const navigate = useNavigate()
	let newRef = useRef()
	let showSelect = useRef()
	const searchRef = useRef()

	useEffect( ()=>{
		fetch("http://localhost:3030/api/v1/items")
			.then(response => response.json())
			.then(resp => setItems(resp.list))
			.catch(err => {console.log(err)})
		console.log("check")
	}, [])
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
	function closeForm(e){
		e.preventDefault();
		console.log("button clicked")
		showSelect.current.style.display = "flex"
		setHeightState("33%")
	}
	useEffect(() => {
		authCheck().then(resp => {
			setLogState(resp.loggedIn)
			if(resp.loggedIn){
				setUser(resp.user)
			}
		})
	}, [])
	return (
		<>
		<div className="w-full h-[7%] z-10">
			<div className="w-full h-full bg-gray-900 flex items-center border-b-2 border-gray-900">
				<div className="w-[10%] h-full text-white flex justify-center items-center p-6 text-3xl font-semibold hover:bg-gray-900 hover:cursor-pointer" onClick={()=>{
					navigate("/")
				}
				}>Grocery+</div>
				<div className="h-full w-[80%] flex items-center justify-center text-white font-semibold text-2xl">Your Shopping Lists</div>
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
		<div style={{backgroundImage: "url(\"https://static.vecteezy.com/system/resources/previews/011/300/535/non_2x/abstract-3d-liquid-colorful-gradient-flow-wave-shape-elements-background-vector.jpg\")"}} className="h-[93%] w-full bg-gray-950 scrollbar overflow-y-auto overflow-x-hidden  p-6 ">
			<div className="h-1/3 w-full bg-translucentWhite  rounded-2xl shadow-2xl backdrop-blur-2xl grid grid-cols-[8%_52%_40%] mb-8">
				<div style={{}} className="shadow-2xl p-4 text-white font-bold text-4xl flex justify-center items-center border-l-2 border-translucentWhite [transform:rotate(180deg)] [writing-mode:vertical-lr] [text-orientation:sideways] ">Monday</div>
				<div className="p-1 pt-2 overflow-y-auto scrollbar border-r-2 border-gray-800 bg-translucentDarken">
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
					<div className="text-white font-bold text-4xl flex items-center pl-2">Grocery List</div>
					<div className="flex">
						<div className="w-full h-full text-white font-semibold text-2xl pl-3">Next in 3 days</div>
						<div className=" w-full h-full text-gray-200 pt-1 font-semibold text-xl">Scheduled for once every 14 days</div>
					</div>
					<div className="text-white font-bold pl-2 text-4xl">Total Cost: $345.6</div>
				</div>
			</div>
			<div ref={newRef} style={{boxShadow: "inset 0px 0px 80px rgba(0, 0, 0, 0.2)", height: heightState}} className="h-1/3 text-gray-400 overflow-y-hidden font-semibold text-xl w-full bg-translucentHover rounded-2xl shadow-2xl backdrop-blur-2xl transition-all  "  onMouseEnter={()=>{
				newRef.current.style.boxShadow = "inset 0px 0px 80px rgba(0, 0, 0, 0.4)"
				showSelect.current.classList.add("text-white")
				showSelect.current.classList.remove("text-gray-400")
			}} onMouseLeave={()=>{
				newRef.current.style.boxShadow = "inset 0px 0px 80px rgba(0, 0, 0, 0.2)"
				showSelect.current.classList.remove("text-white")
				showSelect.current.classList.add("text-gray-400")
			}} >
				<div onClick={()=>{
					showSelect.current.style.display = "none"
					setHeightState("135%")
				}} ref={showSelect} className="h-[28vh] hover:cursor-pointer  w-full flex items-center justify-center top-[20%]"><AddCircleRounded fontSize="large" color="primary" className="mr-4"/> Add new Shopping List</div>
				<div className="h-[60vh] w-full p-4">
					<form className="h-full w-full">
						<input placeholder="Enter List Name" type="text" className="h-[13%] mb-6 shadow-md transition rounded-md w-full bg-translucentDarken focus:bg-translucentHover text-white font-semibold text-3xl focus:outline-none pl-4 focus:shadow-xl"/>
						<div className="h-[13%] w-full text-white text-3xl pl-3 flex pr-3 mb-6">
							<div className="w-2/6 flex items-center ">Select time between each trip</div>
							<div className="w-4/6 flex justify-end">
								<div className="w-[10%] h-full bg-translucentDarken hover:bg-translucentHover flex items-center justify-center rounded-l-md text-white font-bold text-2xl">7<sup className="text-gray-500 ml-1 text-sm">days</sup></div>
								<div className="w-[10%] h-full bg-translucentDarken hover:bg-translucentHover flex items-center justify-center text-white font-bold text-2xl">14<sup className="text-gray-500 ml-1 text-sm">days</sup></div>
								<div className="w-[10%] h-full bg-translucentDarken hover:bg-translucentHover flex items-center justify-center text-white font-bold text-2xl">1<sup className="text-gray-500 ml-1 text-sm">month</sup></div>
								<input  className=" h-full w-[20%] shadow-md transition rounded-r-md w-full bg-translucentDarken focus:bg-translucentHover text-white font-semibold text-3xl focus:outline-none pl-4 focus:shadow-xl" placeholder="Custom time" type="text"/>
							</div>
						</div>
						<div style={{boxShadow: "inset 0px 0px 80px rgba(0, 0, 0, 0.2)"}} className="h-[150%] w-full mb-6 rounded-md bg-translucentDarken p-4 flex flex-wrap">
							<form className="w-full h-[8%]" onSubmit={(e)=>{
								e.preventDefault()
								let query = searchRef.current.value;
								fetch(`http://localhost:3030/api/v1/itemsquery?q=${query}`)
									.then(response => response.json())
									.then(resp => setItems(resp.list))
									.catch(e => console.log(e))
							}}>
								<input ref={searchRef} placeholder="Search Items" className="w-[85%] h-full shadow-md rounded-l-md bg-translucentHover focus:outline-none pl-3 text-white text-2xl focus:shadow-xl transition" type="text" />
								<button className="w-[15%] rounded-r-md bg-translucentDarken h-full pt-1 focus:shadow-xl border-l-2 border-gray-700">Search</button>
							</form>
							<div className="w-full h-[92%] pt-6 p-2 overflow-y-auto scrollbar flex flex-wrap gap-1">
								{
									items.map((item, index)=>{
										let backgroundCol;
										let colourMain;
										if (item.storeID === "L") {
											colourMain = "rgba(80, 40, 40, 1)"
										} else if (item.storeID === "C") {
											colourMain = "rgba(40, 40, 100, 1)"
										} else if (item.storeID === "N"){
											colourMain = "#B58B00"
										}
										let packet
										if(item.quantity){
											let pReg = /[Pp]/g
											let lastWord = item.title.split(" ")
											let lastWordA = lastWord[lastWord.length - 1]
											packet = lastWordA.match(pReg) === null
											let price = item.cost/item.quantity
											let redComp = Math.min(price * 9000, 250)
											backgroundCol = packet ? `rgba(${redComp},40,${255-redComp}, 1)` : "rgba(100, 100, 100)";
										}
										return (
											<div key={index} className="w-[19.2%] hover:shadow-2xl mr-2 mb-3 transition-all bg-gray-800 h-3/5 bg-white rounded-xl hover:cursor-pointer grid grid-rows-[70%_30%]">
											<img className="rounded-t-xl w-full h-full" src={item.href} alt={item.title}/>
											<div
												className="grid grid-cols-[70%_30%] bg-red-500 rounded-b-xl text-white flex justify-left items-center text-2xl font-bold">
												<div style={{backgroundColor: colourMain}} className="rounded-bl-xl h-full w-full  text-white grid grid-rows-[65%_35%] justify-start items-center pl-4 pr-4 font-semibold text-white text-2xl">
													<div>Large Pumpkin Red</div>
													<div
														className="text-base flex items-center text-gray-300">{item.quantity + "g · " + (item.cost*1000/item.quantity).toString().slice(0, 5) + " د.إ per kg"}</div>
												</div>
												{<div style={{backgroundColor: backgroundCol}} className="rounded-br-xl h-full w-full text-white flex flex-wrap justify-center items-center font-bold text-white text-2xl">
													<p>3.85<small>د.إ</small></p></div>}
											</div>
										</div>)
									})
								}

							</div>

						</div>
						<div className="w-full flex justify-center h-full gap-4">
							<button className="rounded-full transition-shadow h-[10%] w-1/6 border-2 border-red-500 text-red-500 font-semibold" onClick={(e)=>{
								closeForm(e)
							}}>Clear Selection</button>
							<button type="submit" className="rounded-full  transition-shadow bg-blue-500 h-[10%] w-1/6  text-gray-800 font-bold">Create List</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</>
	)
}