import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useTonAddress, useTonWallet, TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const App = () => {
  const clientInitConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  console.log(TG);
  console.log(window.Telegram);

  const firebaseApp = initializeApp(clientInitConfig);
  const db = getFirestore(firebaseApp);
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
        amount: "20000000"
        // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
      },
      {
        address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
        amount: "60000000"
        // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
      }
    ]
  };

  useEffect(() => {
    TG.expand();
  }, []);

  const addUser = useCallback(async () => {
    const usersCollectionRef = collection(db, "users");

    // Create a document reference with the custom ID
    const customDocRef = doc(usersCollectionRef, "1"); // Use your desired ID here

    // Set the document data, including the ID
    await setDoc(customDocRef, {
      id: "1",
      name: "Los Angele11111"
    });
  }, [db]);

  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  console.log(wallet);

  return (
    <Stack sx={{ width: "100vh", height: "100vh" }}>
      <p onClick={() => tonConnectUI.sendTransaction(myTransaction)}>send</p>
      {userFriendlyAddress && (
        <div>
          <span>User-friendly address: {userFriendlyAddress}</span>
          <span>Raw address: {rawAddress}</span>
        </div>
      )}
      {wallet && (
        <div>
          <span>Device: {wallet.device.appName}</span>
        </div>
      )}
      <Button onClick={() => TG.close()}>X</Button>

      <Button onClick={() => addUser()}>213123</Button>
      <TonConnectButton />
      <Stack>
        <Typography>{TG?.initDataUnsafe?.user?.username}</Typography>
        <Typography>{TG?.initDataUnsafe?.user?.id}</Typography>
        <Typography>{TG?.initDataUnsafe?.user?.photo_url}</Typography>
      </Stack>
    </Stack>
  );
};
