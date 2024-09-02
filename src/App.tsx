import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [num, setNum] = useState<null | string>(null);
  const handleChange = (e: any) => {
    const isValid = /^\d*\.?\d*$/.test(e.target.value);
    if (isValid) {
      setNum(e.target.value);
    }
  };

  const sendTransaction = async () => {
    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
        messages: [
          {
            address: "UQBNywGlFc8qWr-Y2X60ggaZAM_ZdkWX6PA3-tcyUx9NEbbn",
            amount: String(Math.round(Number(num) * 1000000000))
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
      sx={{
        height: "100%",
        width: "100%",
        padding: "10px",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "noRepeat",
        backgroundImage:
          "url('https://avatars.mds.yandex.net/get-shedevrum/11917197/img_4d9fb71d3cca11ef82a2fe0d5ff3be7d/orig')"
      }}
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
            Connected
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

      <input
        type="text"
        value={num || ""}
        onChange={handleChange}
        placeholder="Закинь сколько не жалко, принимаем TON"
      />

      <Button variant="contained" onClick={sendTransaction}>
        <Typography>Отправить</Typography>
      </Button>
    </Stack>
  );
};
