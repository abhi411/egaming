import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { PlayerContext } from "util/PlayerContext";
import { updatePlayerDatabase } from "util/interactions-game";
import Tetris from "./components/Tetris";
import { GlobalScore } from "views/components/GlobalScore";
const GameThree = (props) => {
  // This is the ID of the current player so we can pass it to the DB later
  const [activePlayer, setActivePlayer] = useContext(PlayerContext);

  // const [playerScore, setPlayerScore] = useState("0");

  // Update the DB with the score. Move this wherever it needs to go.
  // updatePlayerDatabase(activePlayer.playerID, playerScore);



  return (
      <div className="">
        <GlobalScore game="Tetris Game" />
        <Tetris/>
      </div>
    )
  }

export default GameThree;