import './App.css'
import {useEffect, useRef, useState} from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Badge, IconButton} from "@mui/material";

function App() {
    let skillRef = useRef(null);
    let regionRef = useRef(null);
    // let homeButton = useRef(null);
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:3030/api/v1/items")
            .then(r => r.json())
            .then(resp => setItems(resp.list))
            .catch(err => console.log(err))
    }, [])

  return (
    <>
        <div className="h-full w-full items-center justify-center">
            <div className="w-full h-[14%]">
            <div className="w-full h-[30%] pt-1  bg-gray-950 flex items-center border-b-2 border-gray-900">
                <div className="h-full pl-2 w-[20%] text-white font-semibold text-xl">Welcome Aman</div>
                <div className="h-full w-[70%]"></div>
                <IconButton size="large" aria-label="Cart Icon showing items in cart" onClick={()=>{{/*navigate("/Cart")*/}}}>
                    <Badge badgeContent={3} color="error" variant="dot">
                        <ShoppingCartIcon sx={{
                            color: "white",
                        }}/>
                    </Badge>
                </IconButton>
                <div className="h-full pl-2 w-[10%] text-white font-semibold text-xl text-center pr-2 hover:underline hover:cursor-pointer">Login</div>
            </div>
                <div className="bg-black w-full h-[70%] text-white flex shadow-2xl">
                <div className="w-1/6 h-full text-white flex justify-center items-center p-6 text-3xl font-semibold hover:bg-gray-900 hover:cursor-pointer" onClick={()=>{
                    fetch("http://localhost:3030/api/v1/items")
                        .then(r => r.json())
                        .then(resp => setItems(resp.list))
                        .catch(err => console.log(err))
                }
                }>Grocery+</div>
                <form className=" w-full h-full grid grid-cols-6" onSubmit={async (e) => {
                    e.preventDefault();
                    let response = await fetch(`http://localhost:3030/api/v1/itemsquery?q=${skillRef.current.value}`, {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json"
                        }
                    })
                    let resp = await response.json()
                    setItems(resp.list)
                }
                }>
                <input required ref={skillRef} type="text" placeholder="Enter item name" className="h-full col-span-4 border-r-2 border-black p-4 bg-slate-800 text-2xl focus:bg-slate-900 focus:outline-none font-semibold"/>
                <input required ref={regionRef} type="text" placeholder="Enter region" className="h-full col-span-1 p-4 bg-slate-800 text-2xl focus:bg-slate-900 focus:outline-none font-semibold"/>
                <button type="submit" className=" h-full col-span-1 text-white text-2xl font-semibold ">Search</button>
                </form>
                </div>
            </div>
            <div className="h-[86%] w-full bg-gray-950 scrollbar overflow-y-auto overflow-x-hidden flex flex-wrap p-4 gap-4">

                {
                    items.map((item, i) => {
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
                            <div key={i} className="w-[19.2%] bg-gray-800 shadow-xl h-3/5 bg-white rounded-xl hover:bg-gray-700 hover:cursor-pointer grid grid-rows-[70%_30%]">
                                <img className="rounded-t-xl w-full h-full" src={item.href} alt={item.title}/>
                                <div   className="grid grid-cols-[70%_30%] bg-red-500 rounded-b-xl text-white flex justify-left items-center text-2xl font-bold">
                                    <div style={{backgroundColor: colourMain}} className="rounded-bl-xl h-full w-full  text-white grid grid-rows-[65%_35%] justify-start items-center pl-4 pr-4 font-semibold text-white text-2xl">
                                        <div>{item.title}</div>
                                        {packet && < div className="text-lg flex items-center text-gray-300">{item.quantity +"g · " + (item.cost*1000/item.quantity).toString().slice(0, 5) + " د.إ per kg"}</div>}
                                        {!packet && < div className="text-lg flex items-center text-gray-300">1 Packet</div>}
                                    </div>
                                    { <div style={{backgroundColor: backgroundCol}} className="rounded-br-xl h-full w-full text-white flex flex-wrap justify-center items-center font-bold text-white text-2xl">{item.hasDiscount && <small className="text-sm h-1/ w-full flex justify-center">Discounted </small>}<p>{item.cost}<small>د.إ</small></p></div>}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default App
