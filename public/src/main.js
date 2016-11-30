'use strict'

require("style!raw!autoprefixer!sass!../scss/style.scss")

import 'whatwg-fetch'
import { h, render } from 'preact'

import App from './views/app';

render(<App />, document.body)
