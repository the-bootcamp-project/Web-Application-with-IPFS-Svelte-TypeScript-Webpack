import Home from './pages/Home.svelte'
import './assets/global.css'

const app = new Home({
  target: document.body,
  props: { hello: 'world' }
})

export default app
