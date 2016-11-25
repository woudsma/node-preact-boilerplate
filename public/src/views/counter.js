import { h, Component } from 'preact'

export default class Counter extends Component {

  constructor() {
    super()

    this.state = {
      count: 0
    }
  }

  handleClick = (value, event) => {
    switch(value) {
      case 'increment': this.setState({ count: this.state.count + 1 }); break;
      case 'decrement': this.setState({ count: this.state.count - 1 }); break;
    }
  }

  render = (props, state) => (
    <div>
      <p>Count: { state.count }</p>
      <button onClick={ this.handleClick.bind(this, 'increment') }>Increment</button>
      <button onClick={ this.handleClick.bind(this, 'decrement') }>Decrement</button>
    </div>
  )

}
