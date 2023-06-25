import {Link, useNavigate} from "react-router-dom";
import {useRef} from "react";

export const Login = () => {
	let emailRef= useRef(null)
	let pwdRef= useRef(null)
	const navigate = useNavigate()
	return (
		<div className=" w-full h-full bg-gray-950 text-black flex items-center justify-center">
			<form className="w-1/4 h-[50%] bg-gray-200 rounded-xl drop-shadow-2xl p-3" onSubmit={async ()=>{
				let userAuth = {
					email: emailRef.current.value,
					password: pwdRef.current.value
				}
				let response = await fetch("http://localhost:3030/api/v1/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}, 
					body: JSON.stringify(userAuth)
				}).catch(e => console.log(e))
				if(response.ok){
					navigate("/")
				}

			}}>
				<div className="w-full h-1/6 flex font-bold text-4xl items-center pl-2 pr-2 mb-2"><div className="flex w-1/3 h-full items-end pb-4">Log In</div><div className="flex w-2/3 h-full items-end pb-5 justify-end text-right"><Link className="font-semibold text-sm text-right hover:underline" to="/Signup"> Not an existing user? Sign Up</Link></div></div>
				<input ref={emailRef} required placeholder="Enter Email" type="email" className=" text-black mb-4 p-2 shadow-md text-3xl font-semibold focus:shadow-xl focus:outline-none rounded-xl w-full h-[22%]"/>
				<input ref={pwdRef} required placeholder="Enter Password" type="password" className=" text-black mb-4 p-2 shadow-md text-3xl font-semibold focus:shadow-xl focus:outline-none rounded-xl w-full h-[22%]"/>
				<button type="submit" className="bg-gray-950 text-white rounded-xl w-full h-1/5 mt-4 font-bold hover:shadow-2xl text-2xl hover:bg-gray-800">Log In</button>
			</form>
		</div>
	)
}