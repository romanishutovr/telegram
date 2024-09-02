import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  useTonAddress,
  // useTonWallet,
  TonConnectButton,
  useTonConnectUI
} from "@tonconnect/ui-react";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TG = window.Telegram.WebApp;

export const App = () => {
  const rawAddress = useTonAddress(false);

  const [tonConnectUI] = useTonConnectUI();

  const sendTransaction = async () => {
    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        messages: [
          {
            address: "UQBNywGlFc8qWr-Y2X60ggaZAM_ZdkWX6PA3-tcyUx9NEbbn",
            amount: "10000000"
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
    <Stack
      sx={{ width: "100vh", height: "100vh", padding: "10px", overflow: "hidden", backgroundColor: "black" }}
      direction="column"
      gap="20px"
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="20px">
        <Typography sx={{ color: "white" }}>{TG?.initDataUnsafe?.user?.username}</Typography>
        {rawAddress ? (
          <Button
            variant="contained"
            size="small"
            sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
          >
            {rawAddress}
          </Button>
        ) : (
          <TonConnectButton />
        )}
      </Stack>

      <Stack>
        <Typography sx={{ color: "white" }}>
          Фонд, помогающий людям с лудоманией, занимается поддержкой и реабилитацией людей, страдающих игровой
          зависимостью. Мы предоставляем психологическую помощь, консультации, и разрабатываем программы восстановления,
          чтобы помочь нашим подопечным вернуть контроль над своей жизнью. Наша цель — снизить воздействие игровой
          зависимости на жизнь людей и их семей, содействуя их интеграции в общество.
        </Typography>
      </Stack>

      <Button
        onClick={sendTransaction}
        sx={{ width: "100px", height: "100px", borderRadius: "9999", backgroundColor: "red" }}
      >
        <Typography>Помочь</Typography>
      </Button>
    </Stack>
  );
};
