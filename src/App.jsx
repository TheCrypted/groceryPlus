import './App.css'
import {useEffect, useRef, useState} from "react";

function App() {
    let skillRef = useRef(null);
    let regionRef = useRef(null);
    const [items, setItems] = useState([])
    // fetch("http://localhost:3030/api/v1/items")
    //     .then(r => r.json())
    //     .then(resp => setItems(resp.list))
    //     .catch(err => console.log(err))

    useEffect(() => {
        fetch("http://localhost:3030/api/v1/items")
            .then(r => r.json())
            .then(resp => setItems(resp.list))
            .catch(err => console.log(err))
    }, [])

  return (
    <>
        <div className="h-full w-full items-center justify-center">
            <div className="bg-black w-full h-[9%] text-white flex shadow-2xl">
                <div className="w-1/6 h-full text-white flex items-center p-6 text-2xl font-semibold">Search Items:</div>
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
                <input required ref={skillRef} type="text" placeholder="Enter job title" className="h-full col-span-4 border-r-2 border-black p-4 bg-slate-800 text-2xl focus:bg-slate-900 focus:outline-none font-semibold"/>
                <input required ref={regionRef} type="text" placeholder="Enter region" className="h-full col-span-1 p-4 bg-slate-800 text-2xl focus:bg-slate-900 focus:outline-none font-semibold"/>
                <button type="submit" className=" h-full col-span-1 text-white text-2xl font-semibold ">Search</button>
                </form>
                </div>
            <div className="h-[91%] w-full bg-gray-950 scrollbar overflow-y-auto overflow-x-hidden flex flex-wrap p-4 gap-4">

                {
                    items.map((item, i) => {
                        let backgroundCol;
                        let colourMain;
                        if (item.storeID === "L") {
                            colourMain = "rgba(80, 40, 40, 1)"
                            } else if (item.storeID === "C") {
                            colourMain = "rgba(40, 40, 100, 1)"
                        }
                        let titleTrim = item.title.slice(0, 25);
                        let weight
                        let packet
                        if(item.quantity){
                            let pReg = /[Pp]/g
                            let lastWord = item.title.split(" ")
                            let lastWordA = lastWord[lastWord.length - 1]
                            packet = lastWordA.match(pReg) === null
                            weight = item.quantity.toString().includes(".") || item.quantity < 5? item.quantity * 1000 : item.quantity;
                            let price = item.cost/weight
                            let redComp = Math.min(price * 2500, 250)
                            titleTrim = item.title.split(item.quantity.toString())[0].slice(0, 25)
                            backgroundCol = packet ? `rgba(${redComp},40,${255-redComp}, 1)` : "rgba(100, 100, 100)";
                        }
                        return (
                            <div key={i} className="w-[19.2%] bg-gray-800 shadow-xl h-1/2 bg-white rounded-xl hover:bg-gray-700 hover:cursor-pointer grid grid-rows-[70%_30%]">
                                <img className="rounded-t-xl w-full h-full" src={item.href} alt={item.title}/>
                                <div   className="grid grid-cols-[70%_30%] bg-red-500 rounded-b-xl text-white flex justify-left items-center text-2xl font-bold">
                                    <div style={{backgroundColor: colourMain}} className="rounded-bl-xl h-full w-full  text-white grid grid-rows-[65%_35%] justify-start items-center pl-4 pr-4 font-semibold text-white text-2xl">
                                        <div>{titleTrim}</div>
                                        {packet && < div className="text-lg flex items-center text-gray-300">{weight + "g"}</div>}
                                        {!packet && < div className="text-lg flex items-center text-gray-300">1 Packet</div>}
                                    </div>
                                    { <div style={{backgroundColor: backgroundCol}} className="rounded-br-xl h-full w-full text-white flex flex-wrap justify-center items-center font-bold text-white text-2xl">{item.hasDiscount && <small className="text-sm h-1/5">Discounted</small>}<p>{item.cost}</p></div>}
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
