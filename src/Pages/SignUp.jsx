import {Link, useNavigate} from "react-router-dom";
import {useRef} from "react";

export const SignUp = () => {
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const pwdRef = useRef(null);
	const navigate = useNavigate()


	return (
		<div className=" w-full h-full bg-gray-950 text-black flex items-center justify-center">
			<form className="w-1/4 h-3/5 bg-gray-200 rounded-xl drop-shadow-2xl p-3" onSubmit={async (e) => {
				e.preventDefault()
				let bodyInfo = {
					name: nameRef.current.value,
					email: emailRef.current.value,
					password: pwdRef.current.value,
				}
				let response = await fetch("http://localhost:3030/api/v1/signup", {
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify(bodyInfo)
				}).catch(error => {
					console.log(error)
				})
				if(response.ok){
					navigate("/Login")
				}
			}}>
				<div className="w-full h-1/6 flex font-bold text-4xl items-center pl-2 pr-2 mb-2"><div className="flex w-1/2 h-full items-end pb-4">Sign Up</div><div className="flex w-1/2 h-full items-end pb-5 justify-end text-right"><Link className="text-sm text-right hover:underline" to="/Login"> Existing user? Log In</Link></div></div>
				<input ref={nameRef} required placeholder="Enter Name" type="text" className=" text-black mb-4 p-2 shadow-md text-3xl font-semibold focus:shadow-xl focus:outline-none rounded-xl w-full h-1/6"/>
				<input ref={emailRef} required placeholder="Enter Email" type="email" className=" text-black mb-4 p-2 shadow-md text-3xl font-semibold focus:shadow-xl focus:outline-none rounded-xl w-full h-1/6"/>
				<input ref={pwdRef} required placeholder="Enter Password" type="password" className=" text-black mb-4 p-2 shadow-md text-3xl font-semibold focus:shadow-xl focus:outline-none rounded-xl w-full h-1/6"/>
				<button type="submit" className="bg-gray-950 text-white rounded-xl w-full h-1/5 mt-1 font-bold hover:shadow-2xl text-2xl hover:bg-gray-800">Log In</button>
			</form>
		</div>
	)
}