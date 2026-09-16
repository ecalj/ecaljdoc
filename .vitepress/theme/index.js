import DefaultTheme from 'vitepress/theme'
import './custom.css'
import FileList from './components/filelist.vue'

export default {
 ...DefaultTheme,
 enhanceApp({ app }) {
   app.component('filelist', FileList)
 }
}
