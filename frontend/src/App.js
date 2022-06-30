import TakeMeas from './components/TakeMeas';
import InputData from './components/InputData';
import TopBar from './components/TopBar';
import HistoricalData from './components/HistoricalData';
import ResponsiveAppBar from './components/navBar';
function App() {
  return (
    <>
      {/* <TopBar/> */}
    <ResponsiveAppBar/>
      <TakeMeas/>
      <InputData/>
      <HistoricalData/>
    </>
  );
}

export default App;
