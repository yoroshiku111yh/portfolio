const { default: gsap } = require('gsap');

function checkSupportWebgl2() {
    const gl = document.createElement('canvas').getContext('webgl2');
    window.supportgl2 = true;
    if (!gl) {
        console.log('your browser/OS/drivers do not support WebGL2');
        window.supportgl2 = false;
    }
}


document.addEventListener("DOMContentLoaded", function (event) {
    checkSupportWebgl2();
    importModule();
    setTimeout(() => {
        if (document.querySelector('.gsap-marker-scroller-start')) {
            const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

            window.bodyScrollBar.addListener(({ offset }) => {
                gsap.set(markers, { marginTop: -offset.y })
            });
        }
    }, 100);
});

function importModule(){
    new (require('./pages/smoothScrollHomePage.js').default)();
    new (require('./pages/backgroundMain.js').default)();
}