import React, { useCallback } from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { PlayerContext } from "util/PlayerContext";
import { updatePlayerDatabase,updatePlayerDatabaseBefore } from "util/interactions-game";
import '../../../sass/blocks/games/_game-section.scss'
import {GlobalScore,setGlobalScore,setgame} from '../../components/GlobalScore';
import { useHistory } from "react-router-dom";
import { async } from "rxjs";

const GameOne = (props) => {
  // This is the ID of the current player so we can pass it to the DB later
  const [activePlayer, setActivePlayer] = useContext(PlayerContext);

  const [reactionTime, setReactionTime] = useState(0);
  const [score, setScore] = useState(0);
  const [bestReactionTime, setBestReactionTime] = useState(15);

  const [boxDisplay, setBoxDisplay] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(false);

  const [boxRadius, setBoxRadius] = useState(0);
  const [boxTop, setBoxTop] = useState(0);
  const [boxLeft, setBoxLeft] = useState(0);
  const [boxBackground, setBoxBackground] = useState(0);

  const [createdTime, setCreatedTime] = useState(0);
  const difficult = 1;
  const point= 50;
  const fault = 50;
  let history = useHistory();

  const makeBoxOutRef = useRef(null);
  const scoreRef = useRef(score);
  const gameContainerRef = useRef(null);
  scoreRef.current = score;

  // let makeBoxOut;
  const makeBox = useCallback(async () => {
    console.log('makebox');
    let time = Math.random();
    time = time*2500;

    makeBoxOutRef.current = setTimeout(() => {
      if (Math.random()>0.5) {
        setBoxRadius("100px");
      } else {
        setBoxRadius("0");
      }

      let top=Math.random();
      top=top*200;
      let left=Math.random();
      left=left*400;

      setBoxTop(top+"px");

      setBoxLeft(left+"px");

      setBoxBackground(getRandomColor());

      setBoxDisplay(true)

      setCreatedTime(Date.now());

    },time);
  }, []);

  useEffect(() => {
    console.log("inside useeffect")
    makeBox();
    gameContainerRef.current.scrollIntoView();
    updatePlayerDatabaseBefore(activePlayer.playerID)
    const timeOut = setTimeout(() => {
      console.log("Score",score)
      clearTimeout(makeBoxOutRef.current);
      setResultDisplay(true);
      setBoxDisplay(false);
      setgame("end")
      // updatePlayerDatabase(activePlayer.playerID,score)
      // history.push("/");
      alert('Game Over');

      //  Moved this to interactions-game.js
      console.log("Score",score)

      // Here's the calculation for the total score; need to figure out best reaction time first.
      // Note: do we want to average their reaction time instead?
      // const totalScore = scoreRef.current / (.5 * bestReactionTime);
      
      // Set player as "has played" on global Context
      //setActivePlayer({hasPlayed: true});
    },5000);

    return () => {
      clearTimeout(makeBoxOutRef.current);
      clearTimeout(timeOut);
    };

  }, []);

  const getRandomColor = () => {
    const letters="0123456789ABCDEF".split('');
    let color="#";
    for (let i=0; i < 6; i++){
      color+=letters[Math.round(Math.random()*15)];
    }
    return color;
  }

  const clickBox = () => {
    console.log('clickbox');
    const clickedTime = Date.now();
    console.log((clickedTime-createdTime) / 1000);

    setReactionTime((clickedTime-createdTime) / 1000);
    // document.getElementById("time").innerHTML = reactionTime;
    setBoxDisplay(false);

    console.log(reactionTime)
    console.log(bestReactionTime)

    if (reactionTime && (bestReactionTime >= reactionTime)) {
      setBestReactionTime(reactionTime);
    }

    if ((difficult === 1 && reactionTime > 4) || (difficult === 2 && (reactionTime > 2 && reactionTime < 3))) {
      setScore(score);
      setGlobalScore(score)
      console.log("score1",score)
    } else if (difficult === 2 && reactionTime > 3) {
      setScore(score - fault);
      setGlobalScore(score - fault)
      console.log("score2",score)

    } else if(difficult === 3 && reactionTime > 1) {
      setScore(score - fault);
      setGlobalScore(score - fault)
      console.log("score3",score)

    } else{
      setGlobalScore(score + point)
      setScore(score + point);
      console.log("score4",score)

    }

    makeBox();
  }
  async function onGameOver() {
    alert(`Game Over.`);
    // this.setState(initialState)
    // const [activePlayer, setActivePlayer] = this.context
    await updatePlayerDatabase(activePlayer.playerID,score)
    history.push("/");
  }
  return (
    <div className="game-container" ref={gameContainerRef} style={{backgroundColor: "#191970"}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'black'}}>
          {/* BUTTON HERE */}
          <GlobalScore />
          {/* <button className="button" onClick={() => {onGameOver()}}>End Game</button> */}
        </div>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:20}}>
          {/* GAME HERE */}
          <div id="border" className="border">
              { boxDisplay ? (
                  <div id="Box" className="Box" onClick={clickBox} style={{ borderRadius: boxRadius, top: boxTop, left: boxLeft, backgroundColor: boxBackground ,display:'block'}}> </div>
                ) : ('')
              }
        </div>
        </div>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {/* SCORE HERE */}
          <p className="timeBox">Your Time: &nbsp;<span id="time">{reactionTime}</span>s</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p className="scoreBox">Your score: <span id="score">{score}</span> &nbsp;points </p>
        </div>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {/* TIME HERE */}
          { resultDisplay ? (
              <p id="result" className="result"> Best time: <span id="bestResult">{bestReactionTime}</span>s</p>
            ) : ('')
          }
        </div>
    </div>
  )
}

export default GameOne;