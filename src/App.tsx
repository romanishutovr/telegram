import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTonAddress, useTonWallet, TonConnectButton } from "@tonconnect/ui-react";
import { userService } from "./core/index";
import { ChildCareIcon } from "./icons";
import { Faq } from "./main-tabs/Faq";
import { Mine } from "./main-tabs/Mine";
import { Home } from "./main-tabs/Home";
import { Referrals } from "./main-tabs/Referrals";
import { MainTabs } from "./main-tabs/MainTabs";

declare global {
  interface Window {
    Telegram: any;
  }
}

// const TG = window.Telegram.WebApp;

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
  //       // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
  //     },
  //     {
  //       address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
  //       amount: "60000000"
  //       // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
  //     }
  //   ]
  // };
  const check = async () => {
    const telegram_id = 123;
    const q = await userService.checkUser(telegram_id);
    console.log(q);
  };

  useEffect(() => {
    // TG.expand();
    check();
  }, []);

  // const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const wallet = useTonWallet();
  console.log(wallet);

  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <Stack
      sx={{ width: "100%", height: "100%", padding: "5px", overflow: "hidden" }}
      direction="column"
      gap="20px"
      justifyContent="space-between"
    >
      <Stack direction="column" alignItems="center" gap="20px">
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap="20px">
          <Typography>name</Typography>
          {rawAddress ? (
            <Button variant="contained" size="small">
              Withdraw/History
            </Button>
          ) : (
            <TonConnectButton />
          )}
        </Stack>
        <Stack direction="row" gap="20px">
          <Stack
            direction="row"
            sx={{ background: "gray", width: "405", borderRadius: "10px", padding: "10px" }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography> Profit per hour</Typography>
            <Stack direction="row" alignItems="center" gap="5px">
              <Typography>134</Typography>
              <ChildCareIcon />
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ background: "gray", width: "40%", borderRadius: "10px", padding: "10px" }}
          >
            <Typography>Balance</Typography>
            <Stack direction="row" alignItems="center" gap="5px">
              <Typography>134</Typography>
              <ChildCareIcon />
            </Stack>
          </Stack>
        </Stack>
        {currentTab === "Home" && <Home />}
        {currentTab === "Mine" && <Mine />}
        {currentTab === "Referrals" && <Referrals />}
        {currentTab === "Faq" && <Faq />}
      </Stack>
      <MainTabs setCurrentTab={setCurrentTab} />
      {/* <TonConnectButton /> */}
      {/* <Typography>Address: {userFriendlyAddress}</Typography>
    <Typography>Raw Address: {rawAddress}</Typography> */}
    </Stack>
  );
};
