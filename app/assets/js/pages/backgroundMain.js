
import SceneBackgroundMain from './../components/background-main/scene';

export default  class BackgroundMain {
    constructor(){
        this.canvasElm = document.querySelector("#bg-cv");
        if(!this.canvasElm) return;
        this.size = {
            width : window.innerWidth,
            height : window.innerHeight,
        },
        this.srcModel = this.canvasElm.dataset.src;
        this.init();
    }
    init(){
        this.scene = new SceneBackgroundMain({
            $container : this.canvasElm,
            size : this.size,
            srcModel : this.srcModel,
        })
    }
}