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
            <div className="h-[91%] w-full bg-gray-950 scrollbar overflow-auto flex flex-wrap p-4 gap-4">

                {
                    items.map((item, i) => {
                        return (
                            <div key={i} className="w-[19.2%] bg-gray-800 shadow-xl h-1/2 bg-white rounded-xl hover:bg-gray-700 hover:cursor-pointer grid grid-rows-[70%_30%]">
                                <div className="rounded-t-xl bg-slate-800 text-white flex font-semibold text-white text-3xl p-5">{item.title}</div>
                                <div  className="bg-red-500 rounded-b-xl text-white flex justify-center items-center p-4 text-2xl font-bold">{item.cost}</div>
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
