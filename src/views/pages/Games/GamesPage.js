import React, { useEffect, useState, useContext } from "react";
import { PlayerContext } from "util/PlayerContext";
import VerifyPlayer from "./components/verifyPlayer";
import GamesHeader from "../../components/GamesHeader";
import GameTimer from "../../components/GameTimer";
import GameOne from "../SeasonOne/01.GameOne";
import GameTwo from "../SeasonOne/02.GameTwo";
import GameFour from "../SeasonOne/04.GameFour";
import GameThree from "../SeasonOne/03.GameThree";
import GameFive from "../SeasonOne/05.GameFive";
import GameSix from "../SeasonOne/06.GameSix";
import {getGameDetails} from '../../../util/interactions-game';
import timer from "../../../timer-config.json";
import { async } from "rxjs";

const GamesPage = () => {
  // const [activePlayer, setActivePlayer] = useContext(PlayerContext);
  const [gameActive, setGameActive] = useState(false);
 
  const [gameData ,setGameData] = useState({});

  const [activePlayer, setActivePlayer] = useContext(PlayerContext);

  const toggleGameActive = () => {
    setGameActive(!gameActive);
  }

  useEffect(async() => {
    getGameDetails("a").then((response)=>{
    console.log("Data",response);
    setGameData(response)
    console.log("game",gameData)
    window.addEventListener("keydown", function(e) {
      if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
          e.preventDefault();
      }
  }, false);
    })

  }, [])

  const beginGame = () => {
    // This hides the "verify" window, reveals game window
    toggleGameActive();
  }

  const endGame = () => {
    toggleGameActive();

    if(activePlayer) {
      setActivePlayer("");
    }
  }

return (
      <main className="wrapper">
        <div className="content-container">
          <GamesHeader />
          <GameTimer parent="games" />

          <section className="game-section desktop-only" id="gameSection">
            <div className="game-description">
              <h2>{gameData.title}</h2>
              <p>{gameData.description}</p>
              {/* <h2>Round 1: Test reaction</h2>
              <p>Click on the circle or square created as fast as you can! Difficulties are constied. </p>
              <p>you can only play once. Once you lose, your score will be recorded.</p> */}
            </div>

            { gameActive ? 
                gameData.name=='GameOne'?(
                <div className="game-container">
                  <div className="game" id="gameContainer">
                    <GameOne endGame={endGame} />
                  </div>
                </div>)
              :
              gameData.name =='GameTwo' ?
                (<div className="game-container">
                <div className="game" id="gameContainer">
                  <GameTwo endGame={endGame} />
                </div>
                </div>)
                :
                gameData.name =='GameThree' ?
                (<div className="game-container">
                <div className="game" id="gameContainer">
                  <GameThree endGame={endGame} />
                </div>
                </div>)
                :
                gameData.name =='GameFour' ?
                (<div className="game-container">
                <div className="game" id="gameContainer">
                  <GameFour endGame={endGame} />
                </div>
                </div>)
                :
                gameData.name =='GameFive' ?
                (<div className="game-container">
                <div className="game" id="gameContainer">
                  <GameFive endGame={endGame} />
                </div>
                </div>)
                :
                gameData.name =='GameSix' ?
                (<div className="game-container">
                <div className="game" id="gameContainer">
                  <GameSix endGame={endGame} />
                </div>
                </div>)
                :
                null
             : (
              <VerifyPlayer beginGame={beginGame} />
            )}

            {/* <div className="game-container">
              { gameActive ? (
                <div className="game" id="gameContainer">
                  <GameOne endGame={endGame} playerId={playerId} />
                </div>
              ) : (
                <VerifyPlayer beginGame={beginGame} activePlayer={setActivePlayer} />
              )}
            </div> */}

          </section>

          <div className="switch-to-desktop">
            We're sorry, but the games are not availble on mobile devices. Please switch to a desktop or laptop computer.
          </div>

        </div>
      </main>
  )
}

export default GamesPage;