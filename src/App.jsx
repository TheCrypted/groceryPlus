import './App.css'

function App() {

  return (
    <>
        <div className="h-full w-full flex items-center justify-center">
            <button className="bg-slate-500 h-1/5 w-1/5 rounded-xl hover:bg-slate-600 text-white font-bold text-2xl" onClick={async () => {
                let response = await fetch("http://localhost:3030/api/v1/indeed", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        skill: "Fresher",
                        location: "Dubai"
                    })
                })
                let list = await response.json()
                console.log(list)
                for(let item of list.list) {
                    console.log(item.title, item.salary, item.href)
                }
            }
            }>Test API</button>
        </div>
    </>
  )
}

export default App
