import { Box, Button, Stack } from "@mui/material";
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
    <Stack sx={{ width: "500px", height: "100vh", background: "red" }}>
      <Button onClick={() => TG.close()}>X</Button>
      <Button onClick={() => console.log(TG)}>click</Button>
    </Stack>
  );
};
