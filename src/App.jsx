import './App.css'
import {useRef, useState} from "react";

function App() {
    let skillRef = useRef(null);
    let regionRef = useRef(null);
    const [items, setItems] = useState([])

  return (
    <>
        <div className="h-full w-full items-center justify-center">
            <div className="bg-black w-full h-[9%] text-white flex shadow-2xl">
                <div className="w-1/6 h-full text-white flex items-center p-6 text-2xl font-semibold">Search Items:</div>
                <form className=" w-full h-full grid grid-cols-6" onSubmit={async (e) => {
                    e.preventDefault();
                    let response = await fetch("http://localhost:3030/api/v1/indeed", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            skill: skillRef.current.value,
                            location: regionRef.current.value
                        })
                    })
                    let list = await response.json()
                    setItems(list.list)
                    console.log("list")
                    // for(let item of list.list) {
                    //     console.log(job.title, job.salary, job.href)
                    // }
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
                        let r = /[\d|,|.|\+]+/g;
                        let pReg = /[Pp]/g
                        let kReg = /[Kk]/g
                        let lastWord = item.title.split(" ")
                        let lastWordA = lastWord[lastWord.length - 1]
                        let packet = lastWordA.match(pReg) === null
                        let kilos = lastWordA.match(kReg) !== null
                        let weight = item.title.match(r)
                        weight = kilos ? parseInt(item.title.match(r)) * 1000 : parseInt(item.title.match(r))
                        let price = parseInt(item.cost.split("D")[1].slice(1))/weight
                        console.log(weight)
                        let redComp = Math.min(price * 2500, 250)
                        let backgroundCol = packet ? `rgba(${redComp},40,${255-redComp}, 1)` : "rgba(100, 100, 100)";
                        // console.log(item.cost.split("D")[1].slice(1))
                        return (
                            <div key={i} className="w-[19.2%] bg-gray-800 shadow-xl h-1/2 bg-white rounded-xl hover:bg-gray-700 hover:cursor-pointer grid grid-rows-[70%_30%]">
                                <img className="rounded-t-xl w-full h-full" src={item.href} alt={item.title}/>
                                <div  className="grid grid-cols-[70%_30%] bg-red-500 rounded-b-xl text-white flex justify-center items-center text-2xl font-bold">
                                    <div className="rounded-bl-xl h-full w-full bg-slate-800 text-white flex justify-center items-center pl-4 font-semibold text-white text-2xl">{item.title}</div>
                                    <div style={{backgroundColor: backgroundCol}} className="rounded-br-xl h-full w-full text-white flex justify-center items-center pl-4 font-bold text-white text-2xl">{item.cost.split("D")[1].slice(1)}</div>

                                </div>
                            </div>
                        )
                    })
                }


            </div>

            {/*<button className="bg-slate-500 h-1/5 w-1/5 rounded-xl hover:bg-slate-600 text-white font-bold text-2xl" onClick={async () => {*/}
            {/*    let response = await fetch("http://localhost:3030/api/v1/indeed", {*/}
            {/*        method: "POST",*/}
            {/*        headers: {*/}
            {/*            "Content-type": "application/json"*/}
            {/*        },*/}
            {/*        body: JSON.stringify({*/}
            {/*            skill: "Fresher",*/}
            {/*            location: "Dubai"*/}
            {/*        })*/}
            {/*    })*/}
            {/*    let list = await response.json()*/}
            {/*    console.log(list)*/}
            {/*    for(let item of list.list) {*/}
            {/*        console.log(item.title, item.salary, item.href)*/}
            {/*    }*/}
            {/*}*/}
            {/*}>Test API</button>*/}
        </div>
    </>
  )
}

export default App
