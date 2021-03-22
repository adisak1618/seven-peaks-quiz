export default class ProgressBar {
  /** Show the progress bar and begin animating it. */
  start: () => void;

  /** End the progress bar animation. */
  finish: () => void;
  constructor() {
    this.start = () => {
      const mainBody = document.getElementById("main")
      if (mainBody) {
        let wrapper = document.createElement("div")
        wrapper.setAttribute("id", "loadingSVG")
        let svg = document.createElement("img")
        svg.setAttribute("src", "/assets/loading.svg")
        wrapper.appendChild(svg)
        mainBody.prepend(wrapper)
      }
      console.log('start2', document.getElementById("main"))
    }
    this.finish = () => {
      const loadingItem = document.getElementById("loadingSVG")
      loadingItem?.remove()
    }
  }
}