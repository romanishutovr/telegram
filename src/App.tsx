import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTonAddress, useTonWallet, TonConnectButton } from "@tonconnect/ui-react";
import { userService } from "./core/index";
import { ChildCareIcon } from "./icons";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const App = () => {
  // console.log(TG);
  // console.log(window.Telegram);

  // const [tonConnectUI, setOptions] = useTonConnectUI();
  // console.log(setOptions);

  // const myTransaction = {
  //   validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
  //   messages: [
  //     {
  //       address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
  //       amount: "20000000"
  //     },
  //     {
  //       address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
  //       amount: "60000000"
  //     }
  //   ]
  // };

  useEffect(() => {
    TG.expand();
  }, []);

  // const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  // const wallet = useTonWallet();

  return (
    <Stack
      sx={{ width: "100%", height: "100%", padding: "5px", overflow: "hidden" }}
      direction="column"
      gap="20px"
      justifyContent="space-between"
    >
      <Stack direction="column" alignItems="center" gap="20px"></Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="20px">
        <Typography>{TG?.initDataUnsafe?.user?.username}</Typography>
        {rawAddress ? (
          <Button variant="contained" size="small">
            {rawAddress}
          </Button>
        ) : (
          <TonConnectButton />
        )}
      </Stack>
    </Stack>
  );
};
