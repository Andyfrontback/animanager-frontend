import "./App.css";
import { TopCurrentAnimes } from "./features/anime/components/TopCurrentAnimes";

function App() {
  return (
    <>
      <TopCurrentAnimes
        start_date="2026-01-01"
        page={1}
        limit={12}
      ></TopCurrentAnimes>
    </>
  );
}

export default App;
