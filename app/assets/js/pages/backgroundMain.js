
import SceneRaymarchingBasic from './../components/rayMarchingBasic/scene';

export default  class BackgroundMain {
    constructor(){
        this.canvasElm = document.querySelector("#bg-cv");
        if(!this.canvasElm || !window.supportgl2) return;
        this.size = {
            width : window.innerWidth,
            height : window.innerHeight,
        },
        this.init();
    }
    init(){
        this.scene = new SceneRaymarchingBasic({
            $container : this.canvasElm,
            size : this.size,
            speed : 0.02
        });
        setTimeout(() => {
            this.scene.startPointsGo();
        }, 1000);
    }
}