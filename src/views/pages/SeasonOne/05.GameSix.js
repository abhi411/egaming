import * as React from 'react'
import { GlobalScore } from 'views/components/GlobalScore'
import Game from './Game'
import './styles.css'
class GameFive extends React.Component {
  
  componentDidMount() {
    // document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff"
   
  }
  componentWillUnmount(){
    // document.getElementsByTagName("body")[0].style.backgroundColor = "#000000"

  }
  render() {
    return (
        <div className='container'>
        <GlobalScore color="#000000" game="Running T-Rex Game" score="10"/>

		   	{/* <h4 style={{textAlign:'center',color:"#000000"}}>Running T-Rex Game</h4> */}
        <span style={{color:"#989898"}}>Press "Space" to jump your Dino and start the game.</span>
        <div style={{marginTop:100}}>
          <Game />
        </div>
        <div />
      </div>
    )
  }
}

export default GameFive