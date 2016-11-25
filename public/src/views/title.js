import { h, Component } from 'preact'

export default class Title extends Component {

  constructor() {
    super()
  }

  render = (props, state) => <h1>{ props.text }</h1>

}
