document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // 1. PORTADA
  // =====================================================
  const openGarden = document.getElementById("openGarden");

  if(openGarden){
    openGarden.addEventListener("click", async () => {
      const music = document.getElementById("bgMusic");
      if(music && music.paused){
        try{
          music.volume = 0.38;
          await music.play();
          localStorage.setItem("betsuaMusicWanted", "true");
        }catch(e){}
      }

      document.body.style.transition = "opacity .65s ease";
      document.body.style.opacity = "0";

      setTimeout(() => {
        window.location.href = "flores.html";
      }, 650);
    });
  }

  // =====================================================
  // 2. ESCENA DE RAMOS CRECIENDO
  // =====================================================
  const bouquetField = document.getElementById("bouquetField");
  const nightSky = document.getElementById("nightSky");
  const continueBouquet = document.getElementById("continueBouquet");
  const replayBouquets = document.getElementById("replayBouquets");

  function createSky(){
    if(!nightSky) return;

    nightSky.innerHTML = "";

    const starCount = window.innerWidth < 600 ? 85 : 145;

    for(let i = 0; i < starCount; i++){
      const star = document.createElement("span");
      star.className = "star" + (Math.random() > .88 ? " big" : "");
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 86 + "%";
      star.style.setProperty("--twinkle", (1.3 + Math.random() * 3.8) + "s");
      star.style.animationDelay = (-Math.random() * 4) + "s";
      nightSky.appendChild(star);
    }

    for(let i = 0; i < 4; i++){
      const shooting = document.createElement("span");
      shooting.className = "shooting-star";
      shooting.style.top = (8 + Math.random() * 45) + "%";
      shooting.style.left = (-20 - Math.random() * 30) + "%";
      shooting.style.setProperty("--shoot-delay", (i * 3.7 + Math.random() * 2) + "s");
      nightSky.appendChild(shooting);
    }
  }

  const flowerData = [
    {h:220, x:-22, r:-10, d:.10, leaf:95},
    {h:250, x: 18, r:  8, d:.16, leaf:120},
    {h:205, x:-37, r:-18, d:.22, leaf:85},
    {h:270, x:  3, r:  0, d:.28, leaf:135},
    {h:226, x: 34, r: 15, d:.34, leaf:102},
    {h:185, x:-49, r:-23, d:.40, leaf:78},
    {h:195, x: 50, r: 23, d:.46, leaf:82},
    {h:240, x:-10, r: -5, d:.52, leaf:115},
    {h:215, x: 25, r: 12, d:.58, leaf:96}
  ];

  function makeTulip(){
    const tulip = document.createElement("span");
    tulip.className = "tulip";
    tulip.innerHTML = `
      <span class="p2"></span>
      <span class="p3"></span>
      <span class="p1"></span>
    `;
    return tulip;
  }

  function makeBouquet(config){
    const bouquet = document.createElement("div");
    bouquet.className = "bouquet" + (config.back ? " layer-back" : "");
    bouquet.style.setProperty("--x", config.x + "%");
    bouquet.style.setProperty("--scale", config.scale);
    bouquet.style.setProperty("--delay", config.delay + "s");
    bouquet.style.zIndex = config.z;

    const glow = document.createElement("span");
    glow.className = "bouquet-glow";
    bouquet.appendChild(glow);

    const seed = document.createElement("span");
    seed.className = "seed";
    bouquet.appendChild(seed);

    flowerData.forEach((data, i) => {
      const stem = document.createElement("div");
      stem.className = "stem";
      stem.style.setProperty("--stem-h", data.h + "px");
      stem.style.setProperty("--stem-x", data.x + "px");
      stem.style.setProperty("--stem-r", data.r + "deg");
      stem.style.setProperty("--stem-delay", data.d + "s");

      const leaf1 = document.createElement("span");
      leaf1.className = "stem-leaf " + (i % 2 === 0 ? "left" : "right");
      leaf1.style.setProperty("--leaf-y", data.leaf + "px");

      const leaf2 = document.createElement("span");
      leaf2.className = "stem-leaf " + (i % 2 === 0 ? "right" : "left");
      leaf2.style.setProperty("--leaf-y", (data.leaf * .55) + "px");

      stem.appendChild(leaf1);
      stem.appendChild(leaf2);
      stem.appendChild(makeTulip());

      bouquet.appendChild(stem);
    });

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.innerHTML = `
      <span class="wrap-left"></span>
      <span class="wrap-right"></span>
      <span class="wrap-middle"></span>
      <span class="ribbon-tail left"></span>
      <span class="ribbon-tail right"></span>
      <span class="ribbon-knot"></span>
    `;

    bouquet.appendChild(wrapper);
    return bouquet;
  }

  function renderBouquets(){
    if(!bouquetField) return;

    bouquetField.innerHTML = "";

    if(continueBouquet){
      continueBouquet.classList.add("hidden");
      continueBouquet.classList.remove("show");
    }

    const mobile = window.innerWidth < 650;
    const screenRatio = window.innerHeight / Math.max(window.innerWidth, 1);
    const mobileScaleBoost = mobile
      ? Math.min(1.25, 1 + Math.max(0, screenRatio - 1.55) * 0.35)
      : 1;

    let bouquets = mobile
      ? [
          {x:4,  scale:.40, delay:.10, z:3,  back:true},
          {x:14, scale:.48, delay:.30, z:4,  back:true},
          {x:25, scale:.55, delay:.55, z:5,  back:true},
          {x:36, scale:.66, delay:.85, z:7,  back:false},
          {x:47, scale:.78, delay:1.20, z:9,  back:false},
          {x:58, scale:.88, delay:1.55, z:11, back:false},
          {x:69, scale:.72, delay:1.95, z:8,  back:false},
          {x:80, scale:.57, delay:2.30, z:6,  back:true},
          {x:91, scale:.44, delay:2.65, z:4,  back:true}
        ]
      : [
          {x:2,   scale:.36, delay:.08, z:2,  back:true},
          {x:11,  scale:.48, delay:.22, z:3,  back:true},
          {x:20,  scale:.58, delay:.42, z:4,  back:true},
          {x:29,  scale:.69, delay:.66, z:6,  back:false},
          {x:38,  scale:.82, delay:.94, z:8,  back:false},
          {x:47,  scale:.96, delay:1.22, z:11, back:false},
          {x:56,  scale:.86, delay:1.52, z:9,  back:false},
          {x:65,  scale:.76, delay:1.82, z:7,  back:false},
          {x:74,  scale:.63, delay:2.10, z:5,  back:true},
          {x:83,  scale:.52, delay:2.36, z:4,  back:true},
          {x:92,  scale:.40, delay:2.60, z:3,  back:true}
        ];

    if(mobile){
      bouquets = bouquets.map(config => ({
        ...config,
        scale: +(config.scale * mobileScaleBoost).toFixed(3)
      }));
    }

    bouquets.forEach(config => {
      bouquetField.appendChild(makeBouquet(config));
    });

    setTimeout(() => {
      if(continueBouquet){
        continueBouquet.classList.remove("hidden");
        continueBouquet.classList.add("show");
      }
    }, mobile ? 6000 : 8800);
  }

  if(bouquetField){
    createSky();
    renderBouquets();

    if(replayBouquets){
      replayBouquets.addEventListener("click", renderBouquets);
    }
  }

  // =====================================================
  // 3. DEDICATORIA
  // =====================================================
  const petals = document.getElementById("petals");

  if(petals){
    for(let i = 0; i < 28; i++){
      const petal = document.createElement("span");
      petal.className = "fall-petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = (7 + Math.random() * 7) + "s";
      petal.style.animationDelay = (-Math.random() * 10) + "s";
      petal.style.transform = `scale(${0.65 + Math.random() * 0.75})`;
      petals.appendChild(petal);
    }
  }

  const secretButton = document.getElementById("secretButton");
  const secretMessage = document.getElementById("secretMessage");

  if(secretButton && secretMessage){
    secretButton.addEventListener("click", () => {
      secretMessage.classList.toggle("show");

      secretButton.textContent = secretMessage.classList.contains("show")
        ? "Guardar el mensaje 🌻"
        : "Una última cosita 💛";
    });
  }

  // =====================================================
  // 4. CALENDARIO DE DETALLES: PREVIEW LIBRE
  // =====================================================
  const septemberCalendar = document.getElementById("septemberCalendar");
  const octoberCalendar = document.getElementById("octoberCalendar");

  if(septemberCalendar && octoberCalendar){
    const previewUnlockAll = false;

    const dailyMessages = {
  "2026-09-21": "Hoy empieza este pequeño calendario y quise que el primer detalle fuera una de las flores que hice con mis manos. No es perfecta, pero sí está hecha con mucho cariño. <strong>Ojalá este comienzo te saque una pequeña sonrisa.</strong> 🌻",
  "2026-09-22": "Me acordé de esto y me dio risa. Cuando recién te estaba conociendo me di cuenta de que todavía no tenías tu nombre y terminé preguntándote si Betsua se escribía con <strong>S o con Z</strong> jajaja.<br><br>Parece una tontería, pero es uno de esos pequeños recuerdos de los primeros días que todavía tengo guardados. En ese momento apenas empezaba a conocerte y jamás imaginé que con el tiempo terminarías siendo una persona tan especial para mí.<br><br>Y sí… al final aprendí bien cómo se escribe: <strong>Betsua</strong>. 💛",
  "2026-09-23": "Después de haberte hecho ese nombre, me sorprendió ver que lo seguías teniendo contigo. Incluso me mandaste esta foto y, aunque parezca algo simple, a mí me gustó bastante verla.<br><br>Me hizo sentir bonito saber que habías guardado algo que yo te había dado en esos primeros días en que recién empezábamos a conocernos.<br><br>Tal vez era algo pequeño, pero para mí terminó convirtiéndose en uno de esos recuerdos que todavía guardo con cariño. <strong>Y sí… me dio bastante ternura saber que lo cuidabas.</strong> 💛",
  "2026-09-24": "Hubo días en los que me mandabas fotos así, en pleno trabajo, y aunque tal vez para ti era algo normal, para mí significaba bastante.<br><br>Me gustaba saber de ti, pero más que eso, me preocupaba tu bienestar. Siempre esperaba que estuvieras bien, que no te cansaras demasiado y que el día no se te hiciera tan pesado.<br><br>Quizá nunca te lo dije de esta forma, pero sí me importaba mucho cómo estabas mientras trabajabas. 💛",
  "2026-09-25": "Esta foto me recuerda esos días en los que me contabas un poco de cómo iba el trabajo.<br><br>Sé que el área de picking no era fácil y que te esforzabas bastante por aprender, adaptarte y hacer bien las cosas. Por eso, cuando me mandabas fotos así, yo sí pensaba en cómo estabas y en lo cansado que podía ser para ti.<br><br>Me preocupaba que estuvieras bien, que no te exigieras demasiado y que poco a poco fueras sintiéndote más segura en lo que hacías. Siempre me gustó ver lo mucho que te esforzabas. 💛",
  "2026-09-26": "También me acuerdo de este día, y la verdad es que me preocupé muchísimo por ti.<br><br>Cuando me escribiste temprano y supe que te habías lastimado, no dejaba de pensar en cómo estarías. Incluso quería ir a buscarte, pero apenas nos estábamos conociendo y además estaba en horario laboral, así que no podía salir.<br><br>Aun así, durante todo el día seguí pensando en ti, queriendo saber si estabas mejor y deseando que no hubiera sido tan grave. Esa semana sin verte por tu descanso médico se me hizo larga. <strong>Me hizo darme cuenta de lo mucho que ya me importaba saber que estabas bien.</strong> 💛",
  "2026-09-27": "También recuerdo este día porque me preocupé muchísimo por ti. Estabas pasando por un momento muy pesado en el trabajo y sentías que no sabías qué hacer. Sé que estabas aprendiendo poco a poco y que no era fácil tener que adaptarte a tantas cosas al mismo tiempo.<br><br>Ese día yo estaba en Ica y, cuando supe cómo te sentías, quise volver lo más rápido posible porque quería verte y saber que estabas bien. Al final te fuiste más temprano y no alcancé a encontrarte.<br><br>Nunca pensé menos de ti por haberte sentido así. Al contrario, sabía que estabas haciendo tu mejor esfuerzo mientras aprendías. 💛",
  "2026-09-28": "Me acuerdo mucho de este animalito. Lo encontraste mal, decidiste ayudarlo y te lo llevaste contigo para cuidarlo. Y todavía me da risa que <strong>yo terminara poniéndole “Mini Chris”</strong> por esa carita seria que tenía jajaja.<br><br>Después me contaste que se fue, y aunque fue algo pequeño, a mí me quedó mucho ese recuerdo.<br><br>Porque ese día también pude conocer otra parte de ti: esa forma que tienes de preocuparte cuando ves a alguien o a un animalito que necesita ayuda. <strong>Me alegra mucho saber que tienes un corazón tan noble.</strong> 💛",
  "2026-09-29": "No tengo una foto de ese momento, pero sí recuerdo por qué lo hice.<br><br>Había días en los que al verte sentía que no estabas comiendo bien o que simplemente estabas cargando demasiado con el trabajo. Quizá eran cosas pequeñas que yo notaba, pero sí me preocupaban.<br><br>Por eso un día te dejé una teja de Ica. No era algo enorme ni complicado; simplemente pensé en ti y quise que al menos tuvieras algo dulce en medio del día.<br><br>A veces mi manera de demostrar que me importaba cómo estabas era esa: dejarte un pequeño detalle y esperar que, aunque fuera por un rato, tu día se sintiera un poquito mejor. 💛",
  "2026-09-30": "También me acuerdo del día en que te dejé un frappé de fresa. La verdad, dudé bastante porque no sabía qué sabor elegir y tenía miedo de que justo no te gustara la fresa jaja.<br><br>Al final pensé: bueno, lo voy a intentar.<br><br>Y me alegró mucho saber que por la noche, cuando saliste, sí te había gustado. Parece algo pequeño, pero para mí esos detalles siempre tuvieron importancia, porque lo único que quería era regalarte un momento bonito dentro de tu día.<br><br><strong>Saber que lo disfrutaste me dejó feliz.</strong> 💛",
  "2026-10-01": "Ese día te dejé un alfajor junto con esta nota, pensando simplemente en que lo disfrutaras y que te sacara una pequeña sonrisa.<br><br>Lo que no sabía era que al día siguiente ya no volvería a verte. Si hubiera sabido que te ibas, probablemente habría buscado la forma de quedarme un poco más, hablar contigo o simplemente despedirme como hubiera querido.<br><br>Sé que te fuiste por tus propios motivos y siempre voy a respetar eso, pero no voy a negar que me dolió mucho no haber tenido una última conversación contigo.<br><br>Sin saberlo, esta nota terminó siendo una de las últimas cosas que pude dejarte estando todavía cerca. 💛",
  "2026-10-02": "Hace unos días me contaste que habías regresado a Pisco y que incluso me viste cuando venía de la universidad. No sabes lo que sentí cuando me dijiste que estabas aquí otra vez.<br><br>Me dio muchísima emoción saber que estabas cerca y, por un momento, lo único que quería era verte aunque fuera un ratito.<br><br>Pero después me llamaste y me pediste que no me acercara y que te diera unos días. Aunque me costó, entendí que eso era lo que necesitabas y decidí respetarlo.<br><br><strong>No sabes cuánto te había extrañado desde que te fuiste.</strong> 💛",
  "2026-10-03": "Al día siguiente me contaste que un familiar tuyo había fallecido y que regresarías a Lima con tu familia. También entendí que esta vez ya no volverías por aquí.<br><br>La noticia me tomó completamente por sorpresa. Por un lado me dolía saber que te ibas otra vez justo cuando acababa de enterarme de que estabas cerca, pero al mismo tiempo sabía que estabas pasando por algo muchísimo más importante.<br><br>Solo esperaba que pudieras estar acompañada de tu familia y encontrar un poco de tranquilidad en medio de todo.<br><br>Y aunque estés lejos, <strong>siempre voy a recordarte con mucho cariño.</strong> 💛",
  "2026-10-04": "Desde que te fuiste, hay días en los que noto más tu ausencia. A veces quisiera contarte cualquier cosa, saber cómo estás o simplemente verte un momento.<br><br>No siempre digo todo lo que siento, pero sí quiero que sepas algo: <strong>te extraño más de lo que imaginas.</strong> 💛",
  "2026-10-05": "Hoy no quise dejarte algo triste, sino algo tierno. Imagino que este pequeño gatito llega solo para recordarte que mereces días tranquilos, descansos bonitos y momentos que te saquen una sonrisa.<br><br>Y sí… también para recordarte que alguien por aquí sigue acordándose de ti. 🐱💛",
  "2026-10-06": "Hay personas que, aun en la distancia, siguen apareciendo en los pensamientos de maneras muy sencillas: en una canción, en una calle, en una costumbre o en un pequeño silencio.<br><br>Supongo que tú eres una de esas personas para mí. 🌙💛",
  "2026-10-07": "Hoy solo quería dejarte una cosita bonita: ojalá tengas un día amable contigo, con menos peso en el corazón y con al menos un instante que te haga respirar con calma.<br><br>Si este cuadrito logra acompañarte un poquito, entonces ya cumplió su misión. ✨",
  "2026-10-08": "A veces no hace falta decir demasiado. A veces basta con un pequeño “espero que estés bien” dicho de verdad.<br><br>Y eso es exactamente lo que quiero dejarte hoy: <strong>espero que estés bien.</strong> 🐾💛",
  "2026-10-09": "Si hoy el día está pesado, imagina a este gatito llegando con la única misión de pedirte una pausa, un vaso de agua y un pequeño respiro.<br><br>Porque también mereces descansar, aunque sea un ratito. 🐱☁️",
  "2026-10-10": "Hay recuerdos tuyos que me siguen pareciendo bonitos por lo simples que eran. Y eso me gusta, porque me recuerda que a veces las personas especiales se quedan por cosas pequeñas.<br><br>Hoy quería dejarte ese pensamiento con cariño. 💛",
  "2026-10-11": "Un detalle para hoy: ojalá encuentres una razón inesperada para sonreír, aunque sea algo pequeño.<br><br>Una canción, un mensaje, una comida rica, un cielo bonito… cualquiera de esas basta. 🌼",
  "2026-10-12": "No todo lo que se extraña tiene que doler siempre. A veces también se puede extrañar con ternura, con calma, con gratitud por haber coincidido.<br><br>Supongo que hoy te extraño un poquito así. 💛",
  "2026-10-13": "Hoy te dejo un poco de buena suerte en versión gatito. 🐱🍀<br><br>Para que, aunque el día sea raro o pesado, al menos te encuentres con algo que te haga pensar: “bueno, esto estuvo bonito”. ",
  "2026-10-14": "Si esta página pudiera abrazar, hoy te dejaría un abrazo silencioso y tranquilo. De esos que no preguntan nada, solo acompañan.<br><br>Mientras tanto, te dejo estas palabras y el deseo sincero de que tengas paz. 💛",
  "2026-10-15": "Hoy pensé en algo muy simple: qué bonito es haber conocido a ciertas personas, incluso si el tiempo o la distancia cambian las cosas.<br><br>Tú eres una de esas personas que sigo agradeciendo haber conocido. 🌻",
  "2026-10-16": "Gatito del día reportándose para una misión importante: recordarte que mereces ternura, descanso y días en los que no tengas que ser fuerte todo el tiempo. 🐾<br><br>Ojalá hoy te traten bonito. 💛",
  "2026-10-17": "No quería que todos estos cuadritos fueran sobre nostalgia. Algunos también quieren ser solo una pausa bonita. Así que aquí va una:<br><br><strong>espero que hoy tu día se sienta un poco más ligero.</strong> ✨",
  "2026-10-18": "Hay ausencias que enseñan cuánto significado tuvo alguien sin haberlo dicho todo. No lo digo para entristecerte, sino porque a veces reconocerlo también es una forma de cariño.<br><br>Y sí, todavía pienso en ti con mucho cariño. 💛",
  "2026-10-19": "Hoy toca otro detalle tierno: imagina a este pequeño gatito acomodándose cerquita de ti para hacerte compañía un momento y ahuyentar cualquier día pesado. 🐱<br><br>Eso mismo quería hacer este cuadrito. 💛",
  "2026-10-20": "Si hoy estás cansada, ojalá encuentres aunque sea unos minutos para bajar el ritmo, cerrar los ojos un instante y recordar que no tienes que con todo tú sola.<br><br>A veces descansar también es avanzar. ☁️",
  "2026-10-21": "Ya pasó un mes desde que comenzó este calendario. Qué raro pensar que algo tan sencillo pueda guardar tantos pequeños pensamientos.<br><br>Este de hoy solo dice: <strong>gracias por existir en mis recuerdos de una manera tan bonita.</strong> 💛",
  "2026-10-22": "Hoy quería dejarte un mensajito suave: incluso cuando algunas cosas toman tiempo en acomodarse, también pueden terminar encontrando su lugar.<br><br>Ojalá la vida te vaya acomodando cosas bonitas. 🌸",
  "2026-10-23": "Gatito con anuncio importante: está prohibido pasar todo el día sin una pequeña sonrisa. 🐾<br><br>Así que aquí te dejo una razón sencilla para hacerlo: alguien por aquí sigue deseando que te vaya bonito. 💛",
  "2026-10-24": "A veces todavía quisiera mirarte a los ojos una vez más, no para pedir nada, sino solo para saber cómo estás de verdad.<br><br>Mientras tanto, me conformo con dejarte aquí un pedacito de cariño. 🌻",
  "2026-10-25": "Hoy te deseo algo muy específico: una tarde tranquila, algo rico para tomar, una canción bonita de fondo y la sensación de que, al menos por un rato, todo está bien.<br><br>Eso me gustaría para ti hoy. ☕💛",
  "2026-10-26": "Penúltimo cuadrito.<br><br>Quería que este dijera algo sencillo: me alegra haber podido dejarte todos estos pequeños detalles. Aunque fueran desde una pantalla, cada uno fue pensado con mucho cariño.<br><br>Ojalá alguno de ellos te haya acompañado un poquito. 💛",
  "2026-10-27": "<strong>Feliz cumpleaños, Betsua. 🎂💛</strong><br><br>Hoy quería que este último cuadrito fuera distinto, más bonito y más especial que los demás, porque tu cumpleaños también lo es.<br><br>Ojalá este nuevo año de vida te regale tranquilidad, salud, personas sinceras a tu alrededor, momentos que te hagan sonreír de verdad y muchos motivos para sentirte en paz.<br><br>No sé si exista una forma perfecta de regalar algo desde la distancia, pero si hice todo esto fue porque quería que, de alguna manera, supieras que te recuerdo con muchísimo cariño y que deseaba acompañarte, aunque fuera un poquito, durante estos días.<br><br>Gracias por haber sido parte de mi vida y de mis recuerdos más bonitos. <strong>Deseo de corazón que tengas un cumpleaños muy lindo, muy especial y lleno de cosas buenas.</strong><br><br>Y si este regalo logró sacarte aunque sea una sonrisa, entonces para mí ya valió completamente la pena. 🌻✨"
};

    const dailyImages = {
  "2026-09-21": {
    "src": "img/flor_terminada.jpg",
    "alt": "Flor amarilla hecha a mano"
  },
  "2026-09-22": {
    "src": "img/nombre_inicio.jpg",
    "alt": "Nombre de Betsua hecho a mano"
  },
  "2026-09-23": {
    "src": "img/nombre_guardado.jpg",
    "alt": "Betsua guardando su nombre"
  },
  "2026-09-24": {
    "src": "img/trabajando_1.jpg",
    "alt": "Foto trabajando"
  },
  "2026-09-25": {
    "src": "img/picking.jpg",
    "alt": "Foto del área de picking"
  },
  "2026-09-26": {
    "src": "img/lastimada.jpg",
    "alt": "Día en que se lastimó"
  },
  "2026-09-27": {
    "src": "img/dia_pesado.jpg",
    "alt": "Día difícil en el trabajo"
  },
  "2026-09-28": {
    "src": "img/mini_chris.jpg",
    "alt": "Mini Chris, el animalito rescatado"
  },
  "2026-09-30": {
    "src": "img/frappe_fresa.jpg",
    "alt": "Frappé de fresa"
  },
  "2026-10-01": {
    "src": "img/nota_alfajor.jpg",
    "alt": "Nota dejada con un alfajor"
  },
  "2026-10-02": {
    "src": "img/pisco_reencuentro.jpg",
    "alt": "Día que regresó a Pisco"
  },
  "2026-10-27": {
    "src": "img/flor_terminada.jpg",
    "alt": "Flores amarillas hechas a mano"
  }
};

    const dailyIllustrations = {
  "2026-10-04": {
    "emoji": "💛",
    "caption": "Un poquito de cariño desde lejos.",
    "style": "heart",
    "icon": "💛"
  },
  "2026-10-05": {
    "emoji": "🐱",
    "caption": "Gatito del día para sacarte una sonrisa.",
    "style": "cat",
    "icon": "🐱"
  },
  "2026-10-06": {
    "emoji": "🌙",
    "caption": "Una noche tranquila también es un regalo.",
    "style": "cloud",
    "icon": "🌙"
  },
  "2026-10-07": {
    "emoji": "✨",
    "caption": "Una chispa bonita para tu día.",
    "style": "stars",
    "icon": "✨"
  },
  "2026-10-08": {
    "emoji": "🐾",
    "caption": "Un pequeño recordatorio de que espero que estés bien.",
    "style": "cat",
    "icon": "🐾"
  },
  "2026-10-09": {
    "emoji": "🐱",
    "caption": "Gatito de pausa y descanso.",
    "style": "cat",
    "icon": "🐱"
  },
  "2026-10-10": {
    "emoji": "🌻",
    "caption": "Un girasol virtual hecho con cariño.",
    "style": "flower",
    "icon": "🌻"
  },
  "2026-10-11": {
    "emoji": "🌼",
    "caption": "Una cosita bonita para alegrarte el día.",
    "style": "flower",
    "icon": "🌼"
  },
  "2026-10-12": {
    "emoji": "💛",
    "caption": "Extrañarte también puede ser una forma de ternura.",
    "style": "heart",
    "icon": "💛"
  },
  "2026-10-13": {
    "emoji": "🐱",
    "caption": "Gatito de buena suerte.",
    "style": "cat",
    "icon": "🐱"
  },
  "2026-10-14": {
    "emoji": "🫂",
    "caption": "Un abrazo silencioso en forma de cuadrito.",
    "style": "heart",
    "icon": "💛"
  },
  "2026-10-15": {
    "emoji": "🌻",
    "caption": "Qué bonito haber coincidido.",
    "style": "flower",
    "icon": "🌻"
  },
  "2026-10-16": {
    "emoji": "🐾",
    "caption": "Gatito recordándote que mereces ternura.",
    "style": "cat",
    "icon": "🐾"
  },
  "2026-10-17": {
    "emoji": "✨",
    "caption": "Un detalle ligero y bonito para hoy.",
    "style": "stars",
    "icon": "✨"
  },
  "2026-10-18": {
    "emoji": "💛",
    "caption": "Pensarte con cariño todavía se siente bonito.",
    "style": "heart",
    "icon": "💛"
  },
  "2026-10-19": {
    "emoji": "🐱",
    "caption": "Compañía tierna en forma de gatito.",
    "style": "cat",
    "icon": "🐱"
  },
  "2026-10-20": {
    "emoji": "☁️",
    "caption": "Un recordatorio suave para descansar.",
    "style": "cloud",
    "icon": "☁️"
  },
  "2026-10-21": {
    "emoji": "🌙",
    "caption": "Gracias por ser un recuerdo tan bonito.",
    "style": "cloud",
    "icon": "🌙"
  },
  "2026-10-22": {
    "emoji": "🌸",
    "caption": "Que las cosas bonitas vayan encontrándote.",
    "style": "flower",
    "icon": "🌸"
  },
  "2026-10-23": {
    "emoji": "🐾",
    "caption": "Gatito oficial de las pequeñas sonrisas.",
    "style": "cat",
    "icon": "🐾"
  },
  "2026-10-24": {
    "emoji": "🌻",
    "caption": "Un pedacito de cariño desde la distancia.",
    "style": "flower",
    "icon": "🌻"
  },
  "2026-10-25": {
    "emoji": "☕",
    "caption": "Deseándote una tarde tranquila y bonita.",
    "style": "cloud",
    "icon": "☕"
  },
  "2026-10-26": {
    "emoji": "💛",
    "caption": "Casi llegamos al último cuadrito.",
    "style": "heart",
    "icon": "💛"
  }
};

    const specialDays = {
      "2026-10-27": "preview-birthday"
    };

    const modal = document.getElementById("adventModal");
    const modalCard = modal ? modal.querySelector(".advent-modal-card") : null;
    const modalDate = document.getElementById("adventModalDate");
    const modalMessage = document.getElementById("adventModalMessage");
    const modalFigure = document.getElementById("adventModalFigure");
    const modalImage = document.getElementById("adventModalImage");
    const modalIllustration = document.getElementById("adventIllustration");
    const illustrationMain = document.getElementById("adventIllustrationMain");
    const illustrationCaption = document.getElementById("adventIllustrationCaption");
    const modalDecor = document.getElementById("adventModalDecor");
    const modalClose = document.getElementById("adventClose");
    const modalBackdrop = document.getElementById("adventBackdrop");

    const monthNames = {8:"septiembre", 9:"octubre"};
    const weekdayNames = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

    function localDateKey(date){
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }

    function currentPeruDateKey(){
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Lima",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(new Date());

      const values = {};
      parts.forEach(part => {
        if(part.type !== "literal"){
          values[part.type] = part.value;
        }
      });

      return `${values.year}-${values.month}-${values.day}`;
    }

    function saveOpened(key){
      try{
        const opened = JSON.parse(localStorage.getItem("betsuaAdventOpenedPreview") || "[]");
        if(!opened.includes(key)){
          opened.push(key);
          localStorage.setItem("betsuaAdventOpenedPreview", JSON.stringify(opened));
        }
      }catch(e){}
    }

    function getOpened(){
      try{
        return JSON.parse(localStorage.getItem("betsuaAdventOpenedPreview") || "[]");
      }catch(e){
        return [];
      }
    }

    function prettyDate(date){
      return `${weekdayNames[date.getDay()]} ${date.getDate()} de ${monthNames[date.getMonth()]}`;
    }

    function launchBirthdayDecor(){
      if(!modalDecor) return;
      modalDecor.innerHTML = "";

      const symbols = ["✨","💛","🌻","⭐","🎉","🎂"];
      for(let i = 0; i < 22; i++){
        const el = document.createElement("span");
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = (Math.random() * 100) + "%";
        el.style.animationDuration = (3.2 + Math.random() * 2.8) + "s";
        el.style.animationDelay = (Math.random() * .9) + "s";
        el.style.fontSize = (.95 + Math.random() * 1.25) + "rem";
        modalDecor.appendChild(el);
      }
    }

    function resetVisualZones(){
      if(modalCard){
        modalCard.classList.remove("image-day", "birthday-day", "preview-birthday");
      }

      if(modalDecor){
        modalDecor.innerHTML = "";
      }

      if(modalFigure && modalImage){
        modalFigure.classList.add("hidden");
        modalImage.src = "";
        modalImage.alt = "";
      }

      if(modalIllustration){
        modalIllustration.className = "advent-illustration hidden";
      }
      if(illustrationMain){
        illustrationMain.textContent = "🐱";
      }
      if(illustrationCaption){
        illustrationCaption.textContent = "Un pequeño detalle bonito para tu día.";
      }
    }

    function applyIllustration(key){
      if(!modalIllustration || !illustrationMain || !illustrationCaption) return false;
      const data = dailyIllustrations[key];
      if(!data) return false;

      modalIllustration.className = "advent-illustration " + (data.style || "heart");
      illustrationMain.textContent = data.emoji || "💛";
      illustrationCaption.textContent = data.caption || "Un pequeño detalle bonito para tu día.";
      return true;
    }

    function openModal(date, key){
      resetVisualZones();

      modalDate.textContent = prettyDate(date);
      modalMessage.innerHTML = dailyMessages[key] || "Hoy solo quería dejarte algo bonito por aquí. 🌻";

      if(dailyImages[key] && modalFigure && modalImage){
        modalImage.src = dailyImages[key].src;
        modalImage.alt = dailyImages[key].alt;
        modalFigure.classList.remove("hidden");
        if(modalCard) modalCard.classList.add("image-day");
      } else {
        applyIllustration(key);
      }

      if(specialDays[key] && modalCard){
        modalCard.classList.add(specialDays[key]);
        if(key === "2026-10-27"){
          launchBirthdayDecor();
        }
      }

      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      saveOpened(key);

      const btn = document.querySelector(`[data-date="${key}"]`);
      if(btn) btn.classList.add("opened");
    }

    function closeModal(){
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden","true");
      document.body.classList.remove("modal-open");
    }

    function createDayButton(date){
      const key = localDateKey(date);
      const peruTodayKey = currentPeruDateKey();
      const locked = previewUnlockAll ? false : key > peruTodayKey;
      const isToday = key === peruTodayKey;
      const opened = getOpened().includes(key);

      const icon =
        locked ? "🔒" :
        dailyImages[key] ? "🖼️" :
        dailyIllustrations[key] ? (dailyIllustrations[key].icon || "💛") :
        "🌻";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "advent-day" +
        (locked ? " locked" : "") +
        (isToday ? " today" : "") +
        (opened ? " opened" : "") +
        (dailyImages[key] ? " has-image" : "");
      btn.dataset.date = key;

      btn.innerHTML = `
        <span class="day-number">${date.getDate()}</span>
        <span class="day-label">${isToday ? "hoy" : monthNames[date.getMonth()]}</span>
        <span class="day-icon">${icon}</span>
      `;

      if(locked){
        btn.title = `Se abrirá el ${date.getDate()} de ${monthNames[date.getMonth()]}`;
        btn.setAttribute(
          "aria-label",
          `${prettyDate(date)}. Este detalle todavía está bloqueado.`
        );
      }else{
        btn.setAttribute("aria-label", `Abrir detalle del ${prettyDate(date)}`);
        btn.addEventListener("click", () => openModal(date, key));
      }

      return btn;
    }

    for(let day = 21; day <= 30; day++){
      septemberCalendar.appendChild(createDayButton(new Date(2026, 8, day)));
    }

    for(let day = 1; day <= 27; day++){
      octoberCalendar.appendChild(createDayButton(new Date(2026, 9, day)));
    }

    modalClose.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
      if(event.key === "Escape" && modal.classList.contains("show")){
        closeModal();
      }
    });
  }


  // =====================================================
  // 5. MÚSICA DE FONDO
  // =====================================================
  const bgMusic = document.getElementById("bgMusic");
  const musicControl = document.getElementById("musicControl");

  if(bgMusic && musicControl){
    bgMusic.volume = 0.38;

    const savedTime = Number(sessionStorage.getItem("betsuaMusicTime") || "0");

    if(Number.isFinite(savedTime) && savedTime > 0){
      bgMusic.addEventListener("loadedmetadata", () => {
        if(bgMusic.duration && savedTime < bgMusic.duration){
          bgMusic.currentTime = savedTime;
        }
      }, {once:true});
    }

    function updateMusicButton(){
      const playing = !bgMusic.paused;
      musicControl.classList.toggle("playing", playing);
      musicControl.textContent = playing ? "♫ Sonando" : "♫ Música";
      musicControl.setAttribute(
        "aria-label",
        playing ? "Pausar música" : "Activar música"
      );
    }

    function rememberMusicTime(){
      if(Number.isFinite(bgMusic.currentTime)){
        sessionStorage.setItem("betsuaMusicTime", String(bgMusic.currentTime));
      }
    }

    async function tryPlayMusic(){
      try{
        await bgMusic.play();
        localStorage.setItem("betsuaMusicWanted", "true");
      }catch(e){
        // El navegador puede bloquear audio con sonido hasta el primer toque.
      }
      updateMusicButton();
    }

    musicControl.addEventListener("click", async () => {
      if(bgMusic.paused){
        await tryPlayMusic();
      }else{
        bgMusic.pause();
        localStorage.setItem("betsuaMusicWanted", "false");
      }
      updateMusicButton();
    });

    bgMusic.addEventListener("timeupdate", rememberMusicTime);
    bgMusic.addEventListener("play", updateMusicButton);
    bgMusic.addEventListener("pause", updateMusicButton);
    window.addEventListener("pagehide", rememberMusicTime);

    // Intento inmediato al cargar.
    tryPlayMusic();

    // Si el navegador lo bloquea, el primer toque en cualquier parte de la página
    // activa la música automáticamente.
    const unlockAudio = async () => {
      if(bgMusic.paused){
        await tryPlayMusic();
      }
      document.removeEventListener("pointerdown", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("pointerdown", unlockAudio, {once:true});
    document.addEventListener("keydown", unlockAudio, {once:true});

    updateMusicButton();
  }

});
