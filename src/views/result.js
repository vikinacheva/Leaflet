// the final score, with if you have a certain %, you get ✔ or X - icon
// [your score/max possible score]

import { html } from '../lib.js';
import { gotoLeaflet } from '../redirects.js';
import { getScore,resetLeafletData } from '../api/data.js';


//the template for the result page
//everything that will be in 'main' div, will render from this template
//the template needs the final score from leaflet.js and redirect func from redirects.js
const resultTemplate = (score, tryAnotherLeaflet) =>html`
<h1>Your score is ${score} / 5 !</h1>
<br>
<br>
<button id="tryAgain" @click=${tryAnotherLeaflet}>Try Again!</button>`;

export function showResult(ctx){
    ctx.render(resultTemplate(getScore(),tryAnotherLeaflet));
}

async function tryAnotherLeaflet(){
    await resetLeafletData();
    gotoLeaflet();
}