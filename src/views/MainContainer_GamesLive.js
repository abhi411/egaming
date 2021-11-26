import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";

// Pages
import GamesPage from "./pages/Games/GamesPage";
import HomePage from "./pages/Home/HomePage";
import GameOne from "./pages/SeasonOne/01.GameOne";
import GameTwo from "./pages/SeasonOne/02.GameTwo";
import Players from "./pages/Players/PlayersPage";
import RulesPage from "./pages/Rules/RulesPage";
import { PlayerProvider } from "../util/PlayerContext";
import GameFour from "./pages/SeasonOne/04.GameFour";
import GameThree from "./pages/SeasonOne/03.GameThree";
import GameSix from "./pages/SeasonOne/05.GameSix";
import GameFive from "./pages/SeasonOne/06.GameFive";


const MainContainer = () => {

  // Return the UI
  return (
      <PlayerProvider>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/games" exact>
            <GamesPage />
          </Route>

          <Route path="/gameOne" exact>
            <GameOne />
          </Route>

          <Route path="/gameTwo" exact>
            <GameTwo />
          </Route>


          <Route path="/gameThree" exact>
            <GameThree />
          </Route>

          <Route path="/gameFour" exact>
            <GameFour />
          </Route>
          
          <Route path="/gameFive" exact>
            <GameFive />
          </Route>
          <Route path="/gameSix" exact>
            <GameSix />
          </Route>

          <Route path="/players" exact>
            <Players />
          </Route>

          <Route path="/rules" exact>
            <RulesPage />
          </Route>
        </Switch>
      </PlayerProvider>
    )
  }

export default MainContainer;