import { h, Component } from 'preact'

import { api } from '../config'

export default class Users extends Component {

  constructor() {
    super()
  }

  componentWillMount = () => fetch(`${api}/users`)
    .then(data => data.json())
    .then(data => this.setState({ users: Object.keys(data).map(id => data[id])}))

  // ES6 Object destructuring https://github.com/lukehoban/es6features#destructuring
  render = (props, { users = [] }) => (
    <ul>
      <li><b>Got users from API:</b></li>
      { users.map(::JSON.stringify).map(user => <li>{ user }</li>) }
    </ul>
  )

}
