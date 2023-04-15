(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&o(g)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();document.getElementById("capturedHeading");document.getElementById("currentHeading");document.getElementById("alphaDeg");const r=document.getElementById("container"),C=document.getElementById("searchcity"),x=document.getElementById("hum"),L=document.getElementById("pres"),P=document.getElementById("search"),D=document.getElementById("tempcelcius"),A=document.getElementById("weathericon"),H=document.getElementById("description"),q=document.getElementById("zone"),y=document.getElementById("plus"),l=document.getElementById("cristal"),d=document.getElementById("cristal2"),O=document.getElementById("date"),S=document.getElementById("min"),M=document.getElementById("max"),N=document.getElementById("windvel"),W=document.getElementById("winang"),$=document.getElementById("gps"),z=document.getElementById("compass"),f=document.getElementById("compbt"),i="a00065117a35d1c18108761088dca9fa",p="https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric",K="https://api.openweathermap.org/data/2.5/weather?";let m=0,h=0,w,u=0;const c=t=>{const e=new Date(t.dt*1e3);new Date(t.sys.sunrise*1e3),new Date(t.sys.sunset*1e3);const a=e.getHours().toString().padStart(2,"0"),o=e.getMinutes().toString().padStart(2,"0");O.textContent=`${a}:${o}`,t.dt>t.sys.sunrise&&t.dt<t.sys.sunset?(r.classList.remove("night"),r.classList.add("day")):(r.classList.remove("day"),r.classList.add("night")),q.textContent=t.name+" "+t.sys.country,D.textContent=Math.floor(t.main.temp),H.textContent=t.weather[0].description,S.textContent=Math.floor(t.main.temp_min),M.textContent=Math.floor(t.main.temp_max),W.style.transform="rotate("+t.wind.deg+"deg)",N.textContent=t.wind.speed,x.textContent=t.main.humidity,L.textContent=t.main.pressure/1e3;const n=t.weather[0].icon;A.innerHTML=`<img src="./icons/${n}.png"></img>`},v=async t=>{try{return await(await fetch("http://ip-api.com/json/?fields=61439")).json()}catch{const a=navigator.language.split("-")[1];t==null?E("la roda, ES"):E(t+", "+a)}};function B(t){w=t.coords,h=0,R(w)}const I=async t=>{h=1;const e=await v();E(e.city+", "+e.countryCode)};navigator.geolocation.getCurrentPosition(B,I);const E=async t=>{if(t.includes(",")){const a=await(await fetch(p+"&appid="+i+"&q="+t)).json();if(a.message=="city not found"){const o=t.split(",")[0],s=await(await fetch(p+"&appid="+i+"&q="+o)).json();c(s)}else c(a)}else if(h===0){const a=await(await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat="+w.latitude+"&lon="+w.longitude+"&limit=1&appid="+i)).json(),n=await(await fetch(p+"&appid="+i+"&q="+t+", "+a[0].country)).json();if(n.message=="city not found"){const g=await(await fetch(p+"&appid="+i+"&q="+t)).json();c(g)}else c(n);c(n)}else if(h===1){const e=await v(t),o=await(await fetch(p+"&appid="+i+"&q="+t+", "+e.countryCode)).json();if(o.message=="city not found"){const s=await(await fetch(p+"&appid="+i+"&q="+t)).json();c(s)}else c(o)}},R=async t=>{const e=t.longitude,a=t.latitude,s=await(await fetch(K+"lat="+a+"&lon="+e+"&appid="+i+"&lang=sp&units=metric")).json();c(s)};C.addEventListener("submit",t=>{t.preventDefault(),E(P.value)});y.addEventListener("click",t=>{t.preventDefault(),u===0?m===0?(l.style.transform=" translate(0, 6rem)",r.style.transform="translate(0, -6rem)",d.style.transform="translate(0, -6rem)",m=1,y.textContent="-"):(l.style.transform=" translate(0, 0rem)",r.style.transform="translate(0, -0rem)",d.style.transform="translate(0, -0rem)",m=0,y.textContent="+"):m===0?(l.style.transform=" translate(0, 10rem)",r.style.transform="translate(0, -2rem)",d.style.transform="translate(0, -13rem)",m=1,y.textContent="-"):(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",m=0,y.textContent="+")});$.addEventListener("click",t=>{t.preventDefault(),navigator.geolocation.getCurrentPosition(B,I)});f.addEventListener("click",t=>{t.preventDefault(),m===0?u===0?(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",u=1,f.style.opacity="1"):(l.style.transform=" translate(0, 0rem)",r.style.transform="translate(0, -0rem)",d.style.transform="translate(0, -0rem)",u=0,f.style.opacity=".5"):u===0?(l.style.transform=" translate(0, 10rem)",r.style.transform="translate(0, -2rem)",d.style.transform="translate(0, -13rem)",u=1,f.style.opacity="1"):(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",u=0,f.style.opacity=".5")});(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))&&(f.style.opacity=".5");function U(t){let e=t.alpha;if(typeof t.webkitCompassHeading<"u"&&(e=t.webkitCompassHeading),typeof e<"u"&&e!==null){const a=e<0?360+e:e;positionHng.textContent=(360-a|0)+"°",z.style.transform="rotate("+e+"deg)"}}window.addEventListener("deviceorientation",U);