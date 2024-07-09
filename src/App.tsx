import { useEffect, useState } from "react";
// import { useDispatch} from "react-redux";
// import { addTodos, decrement, increment, removeTodos } from "./store/toolkitSlice";
// import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
// or
import { CircularProgress } from "@mui/material";
import ccxt from "ccxt";
// (async function () {
//   let kraken    = new ccxt.kraken ()
// console.log (kraken, await kraken.fetchTickers())
// }) ()
declare global {
  interface Window {
    Telegram: any;
  }
}

// const TG = window.Telegram.WebApp;

export const App = () => {
  // const count = useSelector((state:any) => state.toolkit.count)
  // const todos = useSelector((state:any) => state.toolkit.todos)
  // const [newTodoName, setNewTodoName] = useState<string>("2313")

  // const dispatch = useDispatch()
  // const q = apiClient.get("https://pro-api.coinmarketcap.com/v1/exchange/market-pairs/latest")
  const [state, setState] = useState<any>(null);
  const [tableState, setTableState] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  let kraken = new ccxt.kraken();
  let binance = new ccxt.binance();
  let whitebit = new ccxt.whitebit();

  const getData = async () => {
    setLoader(true);
    const krakenData = await kraken.fetchTickers();
    const binanceData = await binance.fetchTickers();
    const whitebitData = await whitebit.fetchTickers();

    const filterDataByUSDT = (data: any) => {
      const result: any = {};

      for (const exchange in data) {
        result[exchange] = {};
        for (const pair in data[exchange]) {
          if (data[exchange].hasOwnProperty(pair) && pair.includes("/USDT")) {
            result[exchange][pair] = data[exchange][pair];
          }
        }
      }

      return result;
    };

    setState(filterDataByUSDT({ krakenData, binanceData, whitebitData }));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!state) return;
    const symbols = Object.keys(state.binanceData);

    const uniqueSymbols = [...new Set(symbols)];

    const result = uniqueSymbols.map((symbol) => {
      const prices = [state.binanceData[symbol]?.last, state.krakenData[symbol]?.last, state.whitebitData[symbol]?.last]
        .map((last) => parseFloat(last))
        .filter((last) => !isNaN(last));

      const maxPrice = Math.max(...prices);
      const minPrice = Math.min(...prices);

      return {
        name: symbol,
        binance: state.binanceData[symbol]?.last || null,
        kraken: state.krakenData[symbol]?.last || null,
        whitebit: state.whitebitData[symbol]?.last || null,
        priceDifference: prices.length > 1 ? maxPrice - minPrice : null,
        priceDifferencePercentage: prices.length > 1 ? ((maxPrice - minPrice) / minPrice) * 100 : null
      };
    });
    setTableState(result);
    setLoader(false);
  }, [state]);

  return loader ? (
    <Box sx={{ width: "100%", height: "100%" }}>
      <CircularProgress sx={{ fontSize: "150px" }} />
    </Box>
  ) : (
    <>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Pair name</TableCell>
              <TableCell>Binance</TableCell>
              <TableCell>Kraken</TableCell>
              <TableCell>Whitebit</TableCell>
              <TableCell>price Difference</TableCell>
              <TableCell>Percentage difference</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableState
              .sort((a: any, b: any) => b.priceDifferencePercentage - a.priceDifferencePercentage)
              .map((item: any) => (
                <TableRow>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.binance}</TableCell>
                  <TableCell>{item.kraken}</TableCell>
                  <TableCell>{item.whitebit}</TableCell>
                  <TableCell>{item.priceDifference}</TableCell>
                  <TableCell>{item.priceDifferencePercentage}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
