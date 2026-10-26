/* Edición especial para Betsua: sorpresas independientes de la carta original. */
(() => {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const one = id => document.getElementById(id);
  const track = (path,title) => {
    if(window.goatcounter && typeof window.goatcounter.count==="function"){
      try{window.goatcounter.count({path:"/eventos-betsua/"+path,title,event:true});}catch(e){}
    }
  };
  const confetti = (count=55) => {
    if(reduced)return;
    const layer=one("magicConfetti");
    if(!layer)return;
    const colors=["#d24d82","#f59fbe","#f9db97","#ffffff","#ac3565"];
    for(let i=0;i<count;i++){
      const el=document.createElement("span");
      el.style.left=(Math.random()*100)+"vw";
      el.style.color=colors[i%colors.length];
      el.style.setProperty("--time",(3+Math.random()*2)+"s");
      el.style.setProperty("--x",((Math.random()-.5)*150)+"px");
      el.style.fontSize=(12+Math.random()*11)+"px";
      el.textContent=i%3===0?"✦":i%3===1?"❀":"♥";
      layer.appendChild(el);
      window.setTimeout(()=>el.remove(),5600);
    }
  };
  function enter(){
    const overlay=one("magicWelcome");
    if(!overlay||overlay.classList.contains("is-gone"))return;
    overlay.classList.add("is-gone");
    overlay.setAttribute("aria-hidden","true");
    one("magicEnter").disabled=true;
    document.body.style.overflow="";
    window.setTimeout(()=>{overlay.hidden=true;},740);
    track("bienvenida-abierta","Betsua · Bienvenida abierta");
    confetti(38);
    one("inicio").scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
  }
  const enterBtn=one("magicEnter");
  if(enterBtn){
    // Fondo sin scroll hasta que Betsua abra el detalle.
    document.body.style.overflow="hidden";
    enterBtn.addEventListener("click",enter);
    enterBtn.focus({preventScroll:true});
  }

  // Tarjetas para descubrir tres mensajes, con teclado y aria-pressed.
  document.querySelectorAll(".magic-memory button").forEach((button,index)=>{
    button.addEventListener("click",()=>{
      const card=button.closest(".magic-memory");
      const active=card.classList.toggle("is-flipped");
      button.setAttribute("aria-pressed",String(active));
      button.setAttribute("aria-label",(active?"Ocultar":"Descubrir")+" recuerdo "+(index+1));
      if(active)track("recuerdo-"+(index+1),"Betsua · Tarjeta de recuerdo "+(index+1));
    });
  });

  const roseWords=[
    "Que hoy te rodeen sonrisas sinceras y momentos bonitos.",
    "Que encuentres calma incluso en los días más difíciles.",
    "Ojalá la vida te sorprenda con cosas que te ilusionen.",
    "Gracias por ser una persona tan importante en mis recuerdos.",
    "Que nunca te falten razones para sentirte feliz."
  ];
  const roses=document.querySelectorAll(".magic-rose-button");
  let rosesPicked=new Set();
  roses.forEach((button,index)=>{
    button.addEventListener("click",()=>{
      button.classList.add("picked");
      rosesPicked.add(index);
      one("magicRoseLine").textContent=roseWords[index];
      one("magicRoseCount").textContent=rosesPicked.size+" de "+roses.length+" rosas descubiertas";
      if(rosesPicked.size===roses.length){
        one("magicRoseLine").textContent="¡Tu ramo está completo! 🌹 Ojalá pudiera entregártelo en persona.";
        confetti(40);
        track("ramo-completo","Betsua · Ramo de rosas completo");
      }else{
        track("rosa-"+(index+1),"Betsua · Rosa "+(index+1)+" tocada");
      }
    });
  });

  // Velitas: cualquier vela puede apagarse. Apagarlas todas muestra la sorpresa final.
  const candles=document.querySelectorAll(".magic-candle");
  let candlesOut=new Set();
  candles.forEach((button,index)=>{
    button.addEventListener("click",()=>{
      if(candlesOut.has(index))return;
      candlesOut.add(index);
      button.classList.add("is-out");
      button.setAttribute("aria-label","Velita "+(index+1)+" apagada");
      button.setAttribute("aria-pressed","true");
      const left=candles.length-candlesOut.size;
      one("magicCandleCount").textContent=candlesOut.size+" de "+candles.length+" velitas apagadas";
      if(left===0){
        one("magicCakeLine").textContent="¡Deseo cumplido! 🎂 Que este nuevo año te regale momentos realmente felices, Betsua.";
        one("magicFinalWish").textContent="Un último deseo de mi parte: que estés rodeada de personas que te hagan sentir querida, cuidada y en paz. ♡";
        confetti(95);
        track("todas-las-velas","Betsua · Todas las velas apagadas");
      }else{
        one("magicCakeLine").textContent=left===1?"¡Solo queda una velita! Pide tu deseo. ✨":"Un pequeño deseo por cada luz que se apaga. ✨";
      }
      track("velita-"+(index+1),"Betsua · Velita "+(index+1)+" apagada");
    });
  });
  const reset=one("magicCakeReset");
  if(reset)reset.addEventListener("click",()=>{
    candlesOut.clear();
    candles.forEach((button,index)=>{
      button.classList.remove("is-out");
      button.setAttribute("aria-label","Apagar velita "+(index+1));
      button.setAttribute("aria-pressed","false");
    });
    one("magicCandleCount").textContent="0 de 5 velitas apagadas";
    one("magicCakeLine").textContent="Pide un deseo y toca las cinco velitas para apagarlas. 🎂";
    one("magicFinalWish").textContent="";
  });
  const secret=one("magicSecretToggle");
  const panel=one("magicSecretPanel");
  if(secret && panel)secret.addEventListener("click",()=>{
    const open=panel.classList.toggle("is-visible");
    secret.setAttribute("aria-expanded",String(open));
    secret.textContent=open?"Guardar mi última notita ♡":"Una cosita más… 💌";
    if(open)track("notita-secreta","Betsua · Notita secreta abierta");
  });

  // Frases distintas en cada toque del osito existente.
  const bear=one("birthdayBear");
  const bearPhrase=one("magicBearPhrase");
  const phrases=[
    "¡Un abrazo suave desde aquí hasta donde estés! 🧸",
    "Que hoy te regalen muchas sonrisas, Betsua. 🌷",
    "Este osito tiene un corazón lleno de buenos deseos. 💗",
    "Que tengas días tranquilos y sueños muy bonitos. ✨",
    "Un cariñito extra solo para ti. 🎀"
  ];
  let bearClicks=0;
  if(bear&&bearPhrase){
    bear.addEventListener("click",()=>{
      bearPhrase.textContent=phrases[bearClicks%phrases.length];
      bearClicks++;
    });
  }

  // La carta sigue apareciendo con el regalo; presentamos el resto con transiciones suaves.
  if("IntersectionObserver" in window && !reduced){
    const io=new IntersectionObserver(entries=>{
      for(const e of entries)if(e.isIntersecting){
        e.target.classList.add("magic-visible");
        io.unobserve(e.target);
      }
    },{threshold:.12});
    document.querySelectorAll(".magic-section").forEach(el=>io.observe(el));
  }
})();
