//quick functions for redirecting pages
import { page } from "./lib.js";

export function gotoLeaflet(){
    page.redirect('/leaflet');
}

export function gotoHome(){
    page.redirect('/');
}

export function gotoResult(){
    page.redirect('/result');
}