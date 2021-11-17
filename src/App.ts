import Home from './pages/Home.svelte'
import './assets/global.css'

const app = new Home({
  target: document.body,
  props: {
    name: 'world'
  }
})

export default app
