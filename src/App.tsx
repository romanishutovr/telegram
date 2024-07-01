import { useCallback, useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const  App = () => {
  const [count, setCount] = useState<number>(0)
  const [energy, setEnergy] = useState<number>(10)
  const onClick = useCallback(() => {
    if(energy === 0) return
    setCount(count + 1)
    setEnergy(energy - 1)
  },[count, energy])


  useEffect(() => {
    TG.ready();
  },[])


  useEffect(() => {
    const interval = setInterval(() => {
      TG.setItem("count", count)
      TG.setItem("energy", count)
    }, 3000);
    return () => clearInterval(interval);
  }, [count]);
  


  useEffect(() => {
    const interval = setInterval(() => {
      if(energy < 10) {
        setEnergy(energy + 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [energy]);

  



  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", background:"white"}}>
      <div style={{display:"flex", flexDirection:"row" }}>
      <p>{TG.initDataUnsafe?.user?.username}</p>
      <img style={{width:"50px", height:"50px", objectFit:"cover"}} src={TG.initDataUnsafe?.user?.photo_url} alt="" />
      </div>
      <p>{count} Yojji coins</p>
      <p>{energy} / 10 energy</p>
      <img onClick={onClick}  style={{width:"50px", height:"50px", objectFit:"cover"}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7nffFy7ZLnQkFmjKFD8cPi9QeBwtmemhdJQ&s" alt="" />
        <p onClick={()=>{
          TG.getItem("count").then((value:number) => {
            if(!value) return 
            setCount(value)
          })
          TG.getItem("energy").then((value:number) => {
            if(!value) return 
            setEnergy(value)
          })
        }}>qqq</p>
    </div>
  );
}
