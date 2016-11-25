import { h, Component } from 'preact'

import Title from './title'
import Counter from './counter'

export default class App extends Component {

  constructor() {
    super()
  }

  render = () => (
    <main>
      <Title text='Hello Preact!' />
      <Counter />
    </main>
  )

}
