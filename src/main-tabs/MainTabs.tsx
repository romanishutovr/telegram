import { Stack, Typography } from "@mui/material";

interface IProps {
  setCurrentTab: (tab: string) => void;
}

export const MainTabs: React.FC<IProps> = ({ setCurrentTab }) => {
  return (
    <Stack sx={{ width: "100%" }} gap="10px" direction="row" justifyContent="space-between">
      <Stack
        direction="column"
        sx={{ width: "20%", height: "50px", background: "gray", borderRadius: "10px" }}
        alignItems="center"
        onClick={() => setCurrentTab("Home")}
      >
        <Typography>Home</Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{ width: "20%", height: "50px", background: "gray", borderRadius: "10px" }}
        alignItems="center"
        onClick={() => setCurrentTab("Mine")}
      >
        <Typography>Mine</Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{ width: "20%", height: "50px", background: "gray", borderRadius: "10px" }}
        alignItems="center"
        onClick={() => setCurrentTab("Referrals")}
      >
        <Typography>Referrals</Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{ width: "20%", height: "50px", background: "gray", borderRadius: "10px" }}
        alignItems="center"
        onClick={() => setCurrentTab("Faq")}
      >
        <Typography>Faq</Typography>
      </Stack>
    </Stack>
  );
};
