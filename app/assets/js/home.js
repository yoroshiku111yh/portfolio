const { default: gsap } = require('gsap');

document.addEventListener("DOMContentLoaded", function (event) {
    new (require('./pages/smoothScrollHomePage.js').default)();
    
    setTimeout(() => {
        if (document.querySelector('.gsap-marker-scroller-start')) {
            const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

            window.bodyScrollBar.addListener(({ offset }) => {
                gsap.set(markers, { marginTop: -offset.y })
            });
        }
    }, 100);
});