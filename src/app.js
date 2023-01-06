import { page, render } from './lib.js';
import { showHome } from './views/home.js';
import { showLeaflet } from './views/leaflet.js';
import { showResult } from './views/result.js';

// gets the place for rendering all the content
const main = document.getElementById('main');

//using page.mjs to redirect to given pages with exported funcs
page(decorateContext);
page('/', showHome);
page('/leaflet', showLeaflet);
page('/result', showResult);

page.start();

//decorate context of page.mjs, for future abstraction
function decorateContext(ctx, next){
    ctx.render = renderMain;

    next();
}

function renderMain(content){
    render(content,main)
}