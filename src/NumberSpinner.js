import { useState, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";

export const NumberSpinner = ({ targetNumber = 5, speed = 20, claim }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let interval;
    if (spinning) {
      interval = setInterval(() => {
        setCurrentNumber((prev) => (prev + 1000) % 1000000);
      }, speed);
    }

    if (spinning && currentNumber === 123000) {
      setSpinning(false);
      claim();
    }

    return () => clearInterval(interval);
  }, [currentNumber, spinning, targetNumber, speed]);

  const startSpinning = () => {
    setSpinning(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Stack direction="row">
        <div style={{ fontSize: "48px", fontWeight: "bold" }}>{currentNumber.toLocaleString()}</div>
        <Typography sx={{ fontSize: "45px", fontWeight: "600", marginLeft: "15px" }}>CATS</Typography>
      </Stack>
      {currentNumber === 0 && (
        <Button variant="contained" onClick={startSpinning} disabled={spinning}>
          Start
        </Button>
      )}
    </div>
  );
};
