import {  Stack, Typography } from "@mui/material";
export const LeaderItem = ({ leader,idx }) => {
  const colors=["#30fe35","#3462ff","#ff3262","#fe3752"]

  const  getRandomColor=()=> {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: "20px" }}>
      <Stack direction="row" gap="20px">
      <Stack alignItems="center" alignContent="center" sx={{width:"50px", height:"50px", borderRadius:"9999px" , backgroundColor:getRandomColor()}}>
        <Typography sx={{fontSize:"30px"}}>{leader?.username?.split("")[0]}</Typography>
      </Stack>
      <Stack>
        <Typography sx={{ fontWeight: "600" }}>{leader.username}</Typography>
        <Typography sx={{ opacity: "0.5" }}>{leader.totalRewards.toLocaleString()} CATS</Typography>
      </Stack>
      </Stack>
      <Stack>
        <Typography sx={{fontWeight:"600"}}>#{idx + 1}</Typography>
        
      </Stack>
      
    </Stack>
  );
  
}