(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const r=document.getElementById("container"),I=document.getElementById("searchcity"),x=document.getElementById("hum"),L=document.getElementById("pres"),P=document.getElementById("search"),D=document.getElementById("tempcelcius"),A=document.getElementById("weathericon"),O=document.getElementById("description"),q=document.getElementById("zone"),y=document.getElementById("plus"),l=document.getElementById("cristal"),d=document.getElementById("cristal2"),S=document.getElementById("date"),M=document.getElementById("min"),$=document.getElementById("max"),N=document.getElementById("windvel"),W=document.getElementById("winang"),z=document.getElementById("gps"),H=document.getElementById("compass"),p=document.getElementById("compbt"),i="a00065117a35d1c18108761088dca9fa",g="https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric",K="https://api.openweathermap.org/data/2.5/weather?";let m=0,h=0,w,u=0;const c=t=>{const n=new Date(t.dt*1e3);new Date(t.sys.sunrise*1e3),new Date(t.sys.sunset*1e3);const a=n.getHours().toString().padStart(2,"0"),o=n.getMinutes().toString().padStart(2,"0");S.textContent=`${a}:${o}`,t.dt>t.sys.sunrise&&t.dt<t.sys.sunset?(r.classList.remove("night"),r.classList.add("day")):(r.classList.remove("day"),r.classList.add("night")),q.textContent=t.name+" "+t.sys.country,D.textContent=Math.floor(t.main.temp),O.textContent=t.weather[0].description,M.textContent=Math.floor(t.main.temp_min),$.textContent=Math.floor(t.main.temp_max),W.style.transform="rotate("+t.wind.deg+"deg)",N.textContent=t.wind.speed,x.textContent=t.main.humidity,L.textContent=t.main.pressure/1e3;const e=t.weather[0].icon;A.innerHTML=`<img src="./icons/${e}.png"></img>`},E=async t=>{try{return await(await fetch("http://ip-api.com/json/?fields=61439")).json()}catch{const a=navigator.language.split("-")[1];t==null?v("la roda, ES"):v(t+", "+a)}};function B(t){w=t.coords,h=0,R(w)}const C=async t=>{h=1;const n=await E();v(n.city+", "+n.countryCode)};navigator.geolocation.getCurrentPosition(B,C);const v=async t=>{if(t.includes(",")){const a=await(await fetch(g+"&appid="+i+"&q="+t)).json();if(a.message=="city not found"){const o=t.split(",")[0],s=await(await fetch(g+"&appid="+i+"&q="+o)).json();c(s)}else c(a)}else if(h===0){const a=await(await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat="+w.latitude+"&lon="+w.longitude+"&limit=1&appid="+i)).json(),e=await(await fetch(g+"&appid="+i+"&q="+t+", "+a[0].country)).json();if(e.message=="city not found"){const f=await(await fetch(g+"&appid="+i+"&q="+t)).json();c(f)}else c(e);c(e)}else if(h===1){const n=await E(t),o=await(await fetch(g+"&appid="+i+"&q="+t+", "+n.countryCode)).json();if(o.message=="city not found"){const s=await(await fetch(g+"&appid="+i+"&q="+t)).json();c(s)}else c(o)}},R=async t=>{const n=t.longitude,a=t.latitude,s=await(await fetch(K+"lat="+a+"&lon="+n+"&appid="+i+"&lang=sp&units=metric")).json();c(s)};I.addEventListener("submit",t=>{t.preventDefault(),v(P.value)});y.addEventListener("click",t=>{t.preventDefault(),u===0?m===0?(l.style.transform=" translate(0, 6rem)",r.style.transform="translate(0, -6rem)",d.style.transform="translate(0, -6rem)",m=1,y.textContent="-"):(l.style.transform=" translate(0, 0rem)",r.style.transform="translate(0, -0rem)",d.style.transform="translate(0, -0rem)",m=0,y.textContent="+"):m===0?(l.style.transform=" translate(0, 10rem)",r.style.transform="translate(0, -2rem)",d.style.transform="translate(0, -13rem)",m=1,y.textContent="-"):(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",m=0,y.textContent="+")});z.addEventListener("click",t=>{t.preventDefault(),navigator.geolocation.getCurrentPosition(B,C)});p.addEventListener("click",t=>{t.preventDefault(),m===0?u===0?(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",u=1,p.style.opacity="1"):(l.style.transform=" translate(0, 0rem)",r.style.transform="translate(0, -0rem)",d.style.transform="translate(0, -0rem)",u=0,p.style.opacity=".5"):u===0?(l.style.transform=" translate(0, 10rem)",r.style.transform="translate(0, -2rem)",d.style.transform="translate(0, -13rem)",u=1,p.style.opacity="1"):(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",u=0,p.style.opacity=".5")});(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))&&(p.style.opacity=".5");navigator.geolocation.getCurrentPosition(t=>{t.coords.latitude,t.coords.longitude,t.coords.heading==null&&navigator.geolocation.getCurrentPosition()});function U(t){const n=t.alpha,a=heading;console.log(` eje X: ${n}`),console.log(` eje X: ${heading}`),console.log(`Diferencia: ${a}`),H.style.transform="rotate("+a+"deg)"}window.addEventListener("deviceorientation",U);