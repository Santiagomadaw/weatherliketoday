(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function c(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=c(t);fetch(t.href,n)}})();const l=document.getElementById("searchcity"),m=document.getElementById("search"),u=document.getElementById("tempcelcius"),p=document.getElementById("weathericon"),f=document.getElementById("description"),g=document.getElementById("zone"),h=document.getElementById("min"),y=document.getElementById("max"),a=e=>{g.textContent=e.name,u.textContent=Math.floor(e.main.temp),f.textContent=e.weather[0].description,h.textContent=Math.floor(e.main.temp_min),y.textContent=Math.floor(e.main.temp_max);const o=e.weather[0].icon;p.innerHTML=`<img src="./icons/${o}.png"></img>`,console.log(o)},i="a00065117a35d1c18108761088dca9fa",w="https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric",E="https://api.openweathermap.org/data/2.5/weather?",d=async e=>{const c=await(await fetch(w+"&appid="+i+"&q="+e)).json();a(c)},x=async e=>{const o=e.longitude,c=e.latitude,n=await(await fetch(E+"lat="+c+"&lon="+o+"&appid="+i+"&lang=sp&units=metric")).json();a(n)};l.addEventListener("submit",e=>{e.preventDefault(),d(m.value)});const I={enableHighAccuracy:!0,timeout:5e3,maximumAge:0};function B(e){const o=e.coords;x(o)}function C(e){console.warn(`ERROR(${e.code}): ${e.message}`),d("Cordoba, es")}navigator.geolocation.getCurrentPosition(B,C,I);
