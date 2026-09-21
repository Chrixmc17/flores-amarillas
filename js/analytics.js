/*
  ANALÍTICA DE ENTRADAS
  =====================
  1. Crea una cuenta/sitio en GoatCounter.
  2. Copia el nombre/código de tu sitio.
     Ejemplo: si tu panel es https://christopherflores.goatcounter.com
     entonces el código es: christopherflores
  3. Reemplaza el texto vacío de GOATCOUNTER_CODE.
*/
(() => {
  const GOATCOUNTER_CODE = "chrixmc17";

  if (!GOATCOUNTER_CODE.trim()) {
    return;
  }

  const tracker = document.createElement("script");
  tracker.async = true;
  tracker.src = "https://gc.zgo.at/count.js";
  tracker.dataset.goatcounter =
    `https://${GOATCOUNTER_CODE.trim()}.goatcounter.com/count`;

  document.head.appendChild(tracker);
})();
