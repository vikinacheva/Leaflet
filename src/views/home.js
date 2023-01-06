// the home window
// start button, welcome text or smth else

import { html } from '../lib.js';
import { gotoLeaflet } from '../redirects.js';
import { resetLeafletData } from '../api/data.js';

// the template for the home page
// everything that will be in 'main' div, will render from this template
// needs a redirection to leaflet for it to work
const homeTemplate = (gotoLeaflet) =>html`
<h1>Welcome</h1>
<h3 id="startText">Start your leaflet from the button below!</h3>
<button id="clickMe" @click=${gotoLeaflet}>Begin</button>`;

//function that renders the template, and shows it
export function showHome(ctx){
    ctx.render(homeTemplate(startLeafletLeaflet));

    // function startLeaflet(){
    //     ctx.page.redirect('/leaflet'); //option instead of gotoLeaflet, but decided to make redirects.js with redirect funcs.
    // }

    async function startLeafletLeaflet(){
        await resetLeafletData();
        gotoLeaflet();
    }
}