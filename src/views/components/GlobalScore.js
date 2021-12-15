import React from "react";
import { PlayerContext } from "util/PlayerContext";
import "./global.css"
import { useEffect, useState, useRef, useContext } from "react";

import { createSignal } from "@react-rxjs/utils"
import { Link } from "react-router-dom";

import { map } from  'rxjs/operators';
import { bind, Subscribe } from "@react-rxjs/core";

import {updateGlobal,getglobalScore} from './global';
import { updatePlayerDatabase,updatePlayerDatabaseBefore } from "util/interactions-game";
import { useHistory } from "react-router-dom";

export const [scoreChange$, setGlobalScore] = createSignal();
export const [endgame$, setgame] = createSignal();

export const [_useScore, _score$] = bind(endgame$, 0)
export const [useScore, score$] = bind(scoreChange$, 0)
 

const [totalScore, totalCount$] = bind(
    score$.pipe(
        map((score) => console.log('Score is: ', score))
    )
)

// export const endGame = (score)  =>{
// console.log("inside the gloabl score ")
// // updatePlayerDatabase(activePlayer.playerID,score)
// // history.push("/")
// }

export const GlobalScore = (props) => {
    //setScore(12323)
  let history = useHistory();

    const sc = useScore();
    updateGlobal(sc >=0 ? sc :0)
    const [activePlayer, setActivePlayer] = useContext(PlayerContext);
    const end = _useScore();
    console.log("endgame",end)
    if(end){
        console.log("end data")
        let e = end == 'end' ? sc : end
        updatePlayerDatabase(activePlayer.playerID,e)
        history.push("/")
    }
    // global = global + sc >=0 ? sc :0
     console.log("inside gloabl",sc,activePlayer.playerID)

    return (
        <div className="globalScore-div">
            <div className="btn-end">
                 <Link style={{color:"#cccccc"}} onClick={()=>{updatePlayerDatabase(activePlayer.playerID,sc)}} to="/" >End Game</Link>
            </div>
            <h4 style={{textAlign:'center',zIndex:99}}>{props.game}</h4>
            {/* <div className="globalScore">
                <Subscribe>
                    <span >Global Score: {getglob alScore(sc >=0 ? sc :0)}</span>
                </Subscribe>
            </div> */}
        </div>
        
    )
}
