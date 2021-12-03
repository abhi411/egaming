import * as React from 'react'
import './styles.css'
import { updatePlayerDatabase,updatePlayerDatabaseBefore } from "util/interactions-game";

class App extends React.Component {
  outerContainerEl: HTMLDivElement

  constructor(props: any) {
    super(props)
    this.state = {
      outerContainerEl: null,
    }
  }

  async componentDidMount() {
    const config = {
      id: 'runner',
      width: this.outerContainerEl.offsetWidth,
    }
    const { Runner } = await import('../Runner')
    const runner = new Runner(this.outerContainerEl, config)
    runner.init()
  }

  render() {
    return (
      <div
        ref={node => (this.outerContainerEl = node as HTMLDivElement)}
        className='runner-wrapper'
      />
    )
  }
}

export default App