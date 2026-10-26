/* Sorpresa de cumpleaños del calendario - 27/10/2026 */
(() => {
  function peruDay() {
    const p = new Intl.DateTimeFormat("en-CA", {timeZone:"America/Lima",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
    const x={};p.forEach(a=>{if(a.type!=="literal")x[a.type]=a.value;});
    return x.year+"-"+x.month+"-"+x.day;
  }
  function init(){
    const grid=document.getElementById("octoberCalendar");
    const modal=document.getElementById("adventModal");
    if(!grid||!modal)return;
    const day=grid.querySelector('[data-date="2026-10-27"]');
    if(!day)return;
    day.classList.add("birthday-gift-tile");
    day.setAttribute("aria-label","27 de octubre: regalo de cumpleaños para Betsua");
    const icon=day.querySelector(".day-icon");
    if(icon)icon.innerHTML='<span class="birthday-mini-gift" aria-hidden="true"><span class="gift-ribbon-h"></span><span class="gift-ribbon-v"></span><span class="gift-bow-mini">🎀</span></span>';
    const label=day.querySelector(".day-label");
    if(label)label.textContent=peruDay()<"2026-10-27"?"¡Sorpresa mañana!":"¡Un regalo para ti!";
    grid.addEventListener("click",(event)=>{
      const target=event.target.closest('[data-date="2026-10-27"]');
      if(!target)return;
      event.stopPropagation();event.stopImmediatePropagation();
      if(peruDay()<"2026-10-27")return;
      const card=modal.querySelector(".advent-modal-card");
      const date=document.getElementById("adventModalDate");
      const msg=document.getElementById("adventModalMessage");
      const figure=document.getElementById("adventModalFigure");
      const illustration=document.getElementById("adventIllustration");
      const flower=modal.querySelector(".advent-modal-flower");
      if(card)card.className="advent-modal-card birthday-gift-modal";
      if(date)date.textContent="27 de octubre · Feliz cumpleaños, Betsua 🎂";
      if(figure)figure.classList.add("hidden");
      if(illustration)illustration.className="advent-illustration hidden";
      if(flower)flower.textContent="🎁";
      if(msg)msg.innerHTML='<div class="birthday-modal-surprise"><span class="birthday-modal-roses" aria-hidden="true">🌹 💗 🌹</span><h3>Una sorpresa especialmente para ti</h3><p>Este último cuadrito no guarda palabras largas... guarda la puerta a un regalo que hice pensando en ti. ♡</p><a class="birthday-modal-link" href="cumpleanos-betsua.html">Abre tu regalo de cumpleaños 🎀</a><small>Con cariño, Christopher</small></div>';
      modal.classList.add("show");
      modal.setAttribute("aria-hidden","false");
      document.body.classList.add("modal-open");
      day.classList.add("opened");
      try{const a=JSON.parse(localStorage.getItem("betsuaAdventOpenedPreview")||"[]");if(!a.includes("2026-10-27")){a.push("2026-10-27");localStorage.setItem("betsuaAdventOpenedPreview",JSON.stringify(a));}}catch(e){}
    },true);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
  else init();
})();