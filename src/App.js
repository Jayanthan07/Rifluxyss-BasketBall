import NewPlayer from "./Components/NewPlayer"; 
import PlayerSelection from "./Components/PlayerSelection"; 
import css from "./common.module.css";
function App() {
  return (
  <div className={css.col} >
   <NewPlayer />
   <PlayerSelection />
   </div>
  );
}

export default App;
