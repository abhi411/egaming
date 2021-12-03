import React, { useState, createContext } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = props => {
  const [activePlayer, setActivePlayer] = useState({
    playerID: "1234",
    hasPlayed: false,
    isEliminated: false,
    global:0
  });

  return (
    <PlayerContext.Provider value={[activePlayer, setActivePlayer]}>
      {props.children}
    </PlayerContext.Provider>
  );
}