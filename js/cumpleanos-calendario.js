/* Calendario: regalo completo del 27 de octubre, con vista previa opcional. */
(() => {
  const birthday="2026-10-27";
  function peruDate() {
    const parts=new Intl.DateTimeFormat("en-CA",{
      timeZone:"America/Lima",year:"numeric",month:"2-digit",day:"2-digit"
    }).formatToParts(new Date());
    const d={};
    for(const p of parts)if(p.type!=="literal")d[p.type]=p.value;
    return d.year+"-"+d.month+"-"+d.day;
  }
  function init() {
    const grid=document.getElementById("octoberCalendar");
    const modal=document.getElementById("adventModal");
    if(!grid||!modal)return;
    const day=grid.querySelector('[data-date="2026-10-27"]');
    if(!day)return;

    // Vista previa sin contraseña: únicamente para compartir al autor, no es acceso seguro.
    const preview=new URLSearchParams(location.search).get("preview27")==="1";
    const waiting=peruDate()<birthday;
    const previewActive=preview && waiting;
    day.classList.add("birthday-gift-tile");
    if(previewActive) {
      day.classList.remove("locked");
      day.classList.add("birthday-preview");
    }
    const number=day.querySelector(".day-number");
    const icon=day.querySelector(".day-icon");
    const label=day.querySelector(".day-label");
    if(number)number.textContent="27";
    if(icon)icon.textContent="🎀";
    if(label)label.textContent=previewActive?"Vista previa":waiting?"¡Muy pronto!":"Ábreme";
    day.setAttribute("aria-label",previewActive?
      "Probar el regalo de cumpleaños del 27 de octubre":
      waiting?"Regalo del 27 de octubre. Se abrirá mañana.":
      "Abrir regalo del cumpleaños de Betsua");

    function openBirthday(){
      const card=modal.querySelector(".advent-modal-card");
      const title=document.getElementById("adventModalDate");
      const message=document.getElementById("adventModalMessage");
      const figure=document.getElementById("adventModalFigure");
      const illustration=document.getElementById("adventIllustration");
      const flower=modal.querySelector(".advent-modal-flower");
      const decor=document.getElementById("adventModalDecor");
      if(card)card.className="advent-modal-card birthday-gift-modal";
      if(title)title.textContent=previewActive?
        "Vista previa para Christopher · 27 de octubre 🎁":
        "Feliz cumpleaños, Betsua · 27 de octubre 🎂";
      if(figure)figure.classList.add("hidden");
      if(illustration)illustration.className="advent-illustration hidden";
      if(flower)flower.textContent="🎁";
      if(decor)decor.innerHTML="";
      if(message)message.innerHTML=
        '<div class="birthday-modal-surprise">'+
        '<span class="birthday-modal-roses" aria-hidden="true">🌹 💗 🌹</span>'+
        '<h3>Una sorpresa especialmente para ti</h3>'+
        '<p>Este último cuadrito es la puerta a un regalo que preparé pensando en ti, con muchísimo cariño.</p>'+
        '<a class="birthday-modal-link" href="cumpleanos-betsua.html">Abrir mi regalo de cumpleaños 🎀</a>'+
        '<small>Con cariño, Christopher</small>'+
        '</div>';
      modal.classList.add("show");
      modal.setAttribute("aria-hidden","false");
      document.body.classList.add("modal-open");
      if(!previewActive) {
        day.classList.add("opened");
        try{
          const a=JSON.parse(localStorage.getItem("betsuaAdventOpenedPreview")||"[]");
          if(!a.includes(birthday)){
            a.push(birthday);
            localStorage.setItem("betsuaAdventOpenedPreview",JSON.stringify(a));
          }
        }catch(e){}
      }
    }

    // Captura el clic antes de la lógica del calendario, incluso si el día está bloqueado.
    grid.addEventListener("click",event=>{
      const target=event.target instanceof Element?event.target.closest('[data-date="2026-10-27"]'):null;
      if(!target)return;
      event.stopImmediatePropagation();
      event.preventDefault();
      if(peruDate()<birthday && !preview)return;
      openBirthday();
    },true);

    // En el enlace de simulación abrimos la ventana directamente.
    // No guardamos el día como abierto durante la prueba.
    if(previewActive){
      const tip=document.createElement("p");
      tip.className="birthday-preview-tip";
      tip.textContent="Vista de prueba: así aparecerá la sorpresa del día 27. El calendario normal sigue cerrado hasta mañana.";
      grid.parentElement.insertBefore(tip,grid);
      window.setTimeout(()=>openBirthday(),550);
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
  else init();
})();