import {useState} from "react";

export const AccountDrop = () => {
	const [drop, setDrop] = useState(false)
	return (
		<>
			<button className="text-white h-full w-[10.5%] font-semibold text-xl  flex items-center justify-center hover:bg-gray-900" onClick={()=>{
			setDrop(!drop)}
			}>My Account</button>
			{drop && <div className="absolute right-[0%] top-[7%] w-[10%] h-1/4 rounded-b-xl  bg-gray-800 text-white grid grid-rows-3">
				<div className="font-semibold flex items-center text-xl p-3 hover:bg-gray-900 hover:cursor-pointer">Settings</div>
				<div className="font-semibold flex items-center text-xl p-3 hover:bg-gray-900 hover:cursor-pointer">Shopping List</div>
				<div className="font-semibold flex items-center text-xl p-3 hover:bg-gray-900 rounded-b-xl hover:cursor-pointer" onClick={()=>{
					localStorage.removeItem("token")
					location.reload()
				}}>Logout</div>
			</div>}
		</>
	)
}