import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { TonConnectButton } from "@tonconnect/ui-react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const App = () => {
  const clientInitConfig = {
    apiKey: "AIzaSyBWCdZrnDtzHwWlieXGf0lmstzUEtKrZiM",
    authDomain: "test-1b4bd.firebaseapp.com",
    projectId: "test-1b4bd",
    storageBucket: "test-1b4bd.appspot.com",
    messagingSenderId: "904100009920",
    appId: "1:904100009920:web:e45388568e151df67fda25"
  };

  const firebaseApp = initializeApp(clientInitConfig);
  const db = getFirestore(firebaseApp);

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

  return (
    <Stack sx={{ width: "100vh", height: "100vh" }}>
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
