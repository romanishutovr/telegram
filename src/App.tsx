import { useEffect } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const  App = () => {

  useEffect(() => {
    TG.ready();
  },[])

  const onClose = () => {
    TG.close();
  }


  return (
    <div className="App">
      <p onClick={onClose}>close</p>
      <p>{TG.initDataUnsafe?.user?.name}</p>
    </div>
  );
}
