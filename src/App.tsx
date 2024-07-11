import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const App = () => {
  useEffect(() => {
    TG.expand();
  }, []);

  return (
    <Stack sx={{ width: "100vh", height: "100vh" }}>
      <Button onClick={() => TG.close()}>X</Button>
      <Stack>
        <Typography>{TG?.initDataUnsafe?.user?.username}</Typography>
        <Typography>{TG?.initDataUnsafe?.user?.id}</Typography>
        <Typography>{TG?.initDataUnsafe?.user?.photo_url}</Typography>
      </Stack>
    </Stack>
  );
};
