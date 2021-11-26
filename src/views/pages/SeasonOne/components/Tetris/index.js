import React, { useState } from "react";

import StartPage from "../StartPage";
import Game from "../Game";

const Tetris = () => {
	const [runing, setRuning] = useState(false);
	return (
		<div>
			<h4 style={{textAlign:'center'}}>Tetris Game</h4>
			<Game stopClick={() => setRuning(false)} />
		</div>
	) 
};

export default Tetris;
