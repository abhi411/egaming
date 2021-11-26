import * as React from 'react'
import Game from './Game'
import './styles.css'
class GameFive extends React.Component {
  
  componentDidMount() {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff"
   
  }
  render() {
    return (
        <div className='container'>
		   	<h4 style={{textAlign:'center',color:"#000000"}}>Running T-Rex Game</h4>
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