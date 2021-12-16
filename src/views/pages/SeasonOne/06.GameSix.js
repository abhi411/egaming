import * as React from 'react'
import { GlobalScore } from 'views/components/GlobalScore'
import Game from './Game'
import './styles.css'
import { updatePlayerDatabase,updatePlayerDatabaseBefore } from "util/interactions-game";
import { PlayerContext } from "util/PlayerContext";
import { withRouter } from 'react-router-dom' 

class GameSix extends React.Component {
  static contextType = PlayerContext
  constructor(props) {
    super(props);
    this.gameContainerRef = React.createRef();
  }
  componentDidMount() {
    // document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff"
    this.gameContainerRef.current.scrollIntoView();

    const [activePlayer, setActivePlayer] = this.context
    console.log("PlayerContext",activePlayer)
    updatePlayerDatabaseBefore(activePlayer.playerID);
  }
  componentWillUnmount(){
    // document.getElementsByTagName("body")[0].style.backgroundColor = "#000000"

  }
  render() {
    return (
        <div ref={this.gameContainerRef} className='container'>
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

export default withRouter(GameSix)