(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const y of s.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&o(y)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const r=document.getElementById("container"),L=document.getElementById("searchcity"),P=document.getElementById("hum"),D=document.getElementById("pres"),A=document.getElementById("search"),O=document.getElementById("tempcelcius"),q=document.getElementById("weathericon"),S=document.getElementById("description"),M=document.getElementById("zone"),h=document.getElementById("plus"),l=document.getElementById("cristal"),d=document.getElementById("cristal2"),$=document.getElementById("date"),H=document.getElementById("min"),N=document.getElementById("max"),W=document.getElementById("windvel"),z=document.getElementById("winang"),K=document.getElementById("gps"),R=document.getElementById("compass"),f=document.getElementById("compbt"),i="a00065117a35d1c18108761088dca9fa",p="https://api.openweathermap.org/data/2.5/weather?lang=sp&units=metric",U="https://api.openweathermap.org/data/2.5/weather?";let m=0,w=0,v,u=0;const c=t=>{const n=new Date(t.dt*1e3);new Date(t.sys.sunrise*1e3),new Date(t.sys.sunset*1e3);const a=n.getHours().toString().padStart(2,"0"),o=n.getMinutes().toString().padStart(2,"0");$.textContent=`${a}:${o}`,t.dt>t.sys.sunrise&&t.dt<t.sys.sunset?(r.classList.remove("night"),r.classList.add("day")):(r.classList.remove("day"),r.classList.add("night")),M.textContent=t.name+" "+t.sys.country,O.textContent=Math.floor(t.main.temp),S.textContent=t.weather[0].description,H.textContent=Math.floor(t.main.temp_min),N.textContent=Math.floor(t.main.temp_max),z.style.transform="rotate("+t.wind.deg+"deg)",W.textContent=t.wind.speed,P.textContent=t.main.humidity,D.textContent=t.main.pressure/1e3;const e=t.weather[0].icon;q.innerHTML=`<img src="./icons/${e}.png"></img>`},B=async t=>{try{return await(await fetch("http://ip-api.com/json/?fields=61439")).json()}catch{const a=navigator.language.split("-")[1];t==null?E("la roda, ES"):E(t+", "+a)}};function C(t){v=t.coords,w=0,X(v)}const I=async t=>{w=1;const n=await B();E(n.city+", "+n.countryCode)};navigator.geolocation.getCurrentPosition(C,I);const E=async t=>{if(t.includes(",")){const a=await(await fetch(p+"&appid="+i+"&q="+t)).json();if(a.message=="city not found"){const o=t.split(",")[0],s=await(await fetch(p+"&appid="+i+"&q="+o)).json();c(s)}else c(a)}else if(w===0){const a=await(await fetch("http://api.openweathermap.org/geo/1.0/reverse?lat="+v.latitude+"&lon="+v.longitude+"&limit=1&appid="+i)).json(),e=await(await fetch(p+"&appid="+i+"&q="+t+", "+a[0].country)).json();if(e.message=="city not found"){const y=await(await fetch(p+"&appid="+i+"&q="+t)).json();c(y)}else c(e);c(e)}else if(w===1){const n=await B(t),o=await(await fetch(p+"&appid="+i+"&q="+t+", "+n.countryCode)).json();if(o.message=="city not found"){const s=await(await fetch(p+"&appid="+i+"&q="+t)).json();c(s)}else c(o)}},X=async t=>{const n=t.longitude,a=t.latitude,s=await(await fetch(U+"lat="+a+"&lon="+n+"&appid="+i+"&lang=sp&units=metric")).json();c(s)};L.addEventListener("submit",t=>{t.preventDefault(),E(A.value)});h.addEventListener("click",t=>{t.preventDefault(),u===0?m===0?(l.style.transform=" translate(0, 6rem)",r.style.transform="translate(0, -6rem)",d.style.transform="translate(0, -6rem)",m=1,h.textContent="-"):(l.style.transform=" translate(0, 0rem)",r.style.transform="translate(0, -0rem)",d.style.transform="translate(0, -0rem)",m=0,h.textContent="+"):m===0?(l.style.transform=" translate(0, 10rem)",r.style.transform="translate(0, -2rem)",d.style.transform="translate(0, -13rem)",m=1,h.textContent="-"):(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",m=0,h.textContent="+")});K.addEventListener("click",t=>{t.preventDefault(),navigator.geolocation.getCurrentPosition(C,I)});f.addEventListener("click",t=>{t.preventDefault(),m===0?u===0?(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",u=1,f.style.opacity="1"):(l.style.transform=" translate(0, 0rem)",r.style.transform="translate(0, -0rem)",d.style.transform="translate(0, -0rem)",u=0,f.style.opacity=".5"):u===0?(l.style.transform=" translate(0, 10rem)",r.style.transform="translate(0, -2rem)",d.style.transform="translate(0, -13rem)",u=1,f.style.opacity="1"):(l.style.transform=" translate(0, 1rem)",r.style.transform="translate(0, 1rem)",d.style.transform="translate(0, -10rem)",u=0,f.style.opacity=".5")});(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))&&(f.style.opacity=".5");let g=null;const x=()=>{navigator.geolocation.getCurrentPosition(t=>{console.log("entra headi"),g=t.coords.heading,console.log(g),g===null&&(console.log("buscando headi"),console.log(g),x(),console.log("buscando headi"))})};x();console.log(g);function _(t){const n=t.alpha,a=n-g;console.log(` eje X: ${n}`),console.log(` eje X: ${g}`),console.log(`Diferencia: ${a}`),R.style.transform="rotate("+a+"deg)"}window.addEventListener("deviceorientation",_);