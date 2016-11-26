import { h, Component } from 'preact'

import Title from './title'
import Users from './users'

export default class App extends Component {

  constructor() {
    super()
  }

  render = (props, state) => (
    <main>
      <Title text='Hello Preact!' />
      <Users />
    </main>
  )

}
