import React from "react";
import "./global.css"

import { createSignal } from "@react-rxjs/utils"
import { Link } from "react-router-dom";

import { map } from  'rxjs/operators';
import { bind, Subscribe } from "@react-rxjs/core";

import {updateGlobal,getglobalScore} from './global';

export const [scoreChange$, setGlobalScore] = createSignal();
export const [useScore, score$] = bind(scoreChange$, 0)
 

const [totalScore, totalCount$] = bind(
    score$.pipe(
        map((score) => console.log('Score is: ', score))
    )
)
export const GlobalScore = (props) => {
    //setScore(12323)
    const sc = useScore();
    updateGlobal(sc >=0 ? sc :0)

    // global = global + sc >=0 ? sc :0
    console.log("inside gloabl",getglobalScore(),sc)

    return (
        <div className="globalScore-div">
            <div className="btn-end">
                 <Link style={{color:"#cccccc"}} to="/" >End Game</Link>
            </div>
            <h4 style={{textAlign:'center',zIndex:99}}>{props.game}</h4>
            {/* <div className="globalScore">
                <Subscribe>
                    <span >Global Score: {getglobalScore(sc >=0 ? sc :0)}</span>
                </Subscribe>
            </div> */}
        </div>
        
    )
}
