import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, decrement, increment, removeTodos } from "./store/toolkitSlice";
import ReactPlayer from 'react-player/lazy'

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const  App = () => {
  const [countq, setCount] = useState<number>(0)
  const [energy, setEnergy] = useState<number>(10)
  const onClick = useCallback(() => {
    if(energy === 0) return
    setCount(countq + 1)
    setEnergy(energy - 1)
    TG.CloudStorage.setItem("count", countq)
    TG.CloudStorage.setItem("energy", energy)
  },[countq, energy])


  useEffect(() => {
    TG.ready();
    TG.CloudStorage.getItem("count", (q:null,value:number)=> {
      if(!value) return 
    setCount(Number(value))
  })
    TG.CloudStorage.getItem("energy", (q:null,value:number)=> {
      if(!value) return 
    setEnergy(Number(value))
  })
  },[])


setInterval(() => {
      TG.CloudStorage.setItem("count", countq)
      TG.CloudStorage.setItem("energy", energy)
    }, 1000);

  


  useEffect(() => {
    const interval = setInterval(() => {
      if(energy < 10) {
        setEnergy(energy + 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [energy]);



  


const count = useSelector((state:any) => state.toolkit.count)
const todos = useSelector((state:any) => state.toolkit.todos)
const [newTodoName, setNewTodoName] = useState<string>("2313")

const dispatch = useDispatch()

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", background:"white"}}>
      <div style={{display:"flex", flexDirection:"row" }}>
      <p>{TG.initDataUnsafe?.user?.username}</p>
      <img style={{width:"50px", height:"50px", objectFit:"cover"}} src={TG.initDataUnsafe?.user?.photo_url} alt="" />
      </div>
      <p>{countq} Yojji coins</p>
      <p>{energy} / 10 energy</p>
      <img onClick={onClick}  style={{width:"50px", height:"50px", objectFit:"cover"}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7nffFy7ZLnQkFmjKFD8cPi9QeBwtmemhdJQ&s" alt="" />

      <p>{count}</p>
      <button onClick={()=>dispatch(increment())}> + </button>
      <button onClick={()=>dispatch(decrement())}> - </button>
      <div>

      <input type="text" placeholder="Add todo" value={newTodoName} onChange={(e)=>setNewTodoName(e.target.value)} />
      <button onClick={()=>{dispatch(addTodos(newTodoName))
    setNewTodoName("")}}> Add </button>
      </div>

      {todos.map((todo:string, index:number) => 
      <div>

      <p>{todo}</p>
      <button onClick={()=>dispatch(removeTodos(todo))}> x </button>
      </div>
      )
    }
<ReactPlayer url='https://www.youtube.com/watch?v=3omZJqQC8u0&ab_channel=FCMetalist1925' />

    </div>


  );
}
