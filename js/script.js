document.addEventListener('DOMContentLoaded', function () {
    const resultParagraph = document.getElementById('resultado');
    const planButtons = document.querySelectorAll('#planes button');
    const unidadSection = document.getElementById('unidad-section');
    const unidadInput = document.getElementById('unidad');
    const unidadDatalist = document.getElementById('unidades');
    const planText = document.getElementById('plan-text');
    const planIcon = document.getElementById('plan-icon');
    let unidadesData = [];
    let headers = [];

    const scriptURL = 'https://script.google.com/macros/s/AKfycbybXLuDmQ5PJ1Zse51F1ouQgYa7OBrZt0nTMuPxnEIIufVPXIDh0KGegVS1JP_7r0f3rw/exec';
    
    const atributos = {
        "Informática": [
            "AE1 Sistemas de Software: Implementa y administra sistemas de software de calidad mundial con base en la Ingeniería de Software para solucionar problemas de manipulación de datos, información y conocimiento en las organizaciones con base en la adaptabilidad en el uso de nuevas tecnologías debido a los cambios tecnológicos, propiciando el trabajo colaborativo, la disciplina, la proactividad, fomenta la ética profesional y el respeto.",
            "AE2 Infraestructura Computacional: Desarrolla la infraestructura computacional requerida para el diseño e implementación de las soluciones de software/hardware, fomenta la autonomía, la visión autocrítica, la ética profesional.",
            "AE3 Modelado de datos: Modela datos e información que sea de fácil implementación en las tecnologías apropiadas para optimizar su manipulación, fomenta la creatividad, la visión crítica y autocrítica, la responsabilidad, la disciplina, la ética profesional y el trabajo colaborativo.",
            "AE4 Soluciones de Hardware: Diseña soluciones de hardware e interfaces para la adquisición y manipulación de datos, promueve el trabajo en equipo, la tolerancia, la equidad, la responsabilidad y la ética profesional.",
            "AE5 Soluciones de redes: Instrumenta soluciones de transmisión de voz y datos para la compartición de información, promueve el respeto, la tolerancia, la ética profesional, la responsabilidad y el trabajo colaborativo.",
            "AE6 Normalización y calidad: Aplica las metodologías de normalización y calidad en el proceso de desarrollo y administración de software y hardware garantizando su seguridad para elevar el nivel de confiabilidad de los sistemas de software y hardware, fomenta la disciplina individual, el trabajo en equipo, la responsabilidad, la confidencialidad, el respeto y la ética profesional.",
            "AE7 Innovación de soluciones TI: Propone procesos planificados de innovación en el campo de la Ingeniería Informática a través de la investigación y desarrollo de soluciones de software y hardware para la solución de problemas complejos de explotación de datos, información y conocimiento, promueve la autocrítica, la autonomía, la proactividad, la libertad de pensamiento, el respeto y el trabajo en equipo."
        ],
        "Industrial": [
            "AE1 Diseño e Innovación: Propone, Valora y Evalua el Diseno y desarrollo de productos y procesos industriales o prototipo a traves de la transferencia de tecnología, creación y modificacion de procesos para la consolidacion de una innovacion tecnologica de forma creativa, responsable y sostenible.",
            "AE2 Calidad: Propone, Elabora y Evalua un sistema de gestión, a partir de la validación e interpretacion de los resultados con base en las metodologías, modelos y politicas empresariales que generen impactos innovadores, sustentables, competitivos y con responsabilidad social.",
            "AE3 Logística: Planea, Establece y Pronostica la demanda y los recursos en los sistemas de produccion de forma integral a traves de la gestion estrategica, aplicando las normas para la comercializacion, con actitud ética, creativa, resiliente, sostenible y sustentable.",
            "AE4 Ingeniería: Planea, Define y Evalua la programacion y control de la produccion, empleando el capital humano, asi como herramientas y metodologias para la mejora de niveles de productividad con el estudio del tiempos y movimientos, estimaciones estocasticas, redes y algoritmos que ofrezcan alternativas creativas, justas, sostenibles y con responsabilidad etica.",
            "AE5 Seguridad e Higiene: Elabora, Mide y Evalua planes de accion preventivos y correctivos para la sustentabilidad de la organizacion, en aspectos de seguridad, salud ocupacional y gestion ambiental, de acuerdo al marco legal federal y estatal, Transmitiendo de forma asertiva a los colaboradores la normatividad, los principios de honradez, lealtad, imparcialidad, eficiencia, integridad, cooperacion y liderazgo.",
            "AE6 Capital Humano: Propone, Estructura y Evalua las estrategias del Capital Humano en sus niveles operativo, tactico y estrategico para la funcionalidad de la organizacion, a partir de habilidades directivas y vision sistemica del entorno organizacional.",
            "AE7 Tecnologías Disruptivas: Propone, Integra y Evalua tecnologias inteligentes de mejora para los productos, procesos y servicios, así como, algoritmos computacionales y analitica de datos que agilizan los procesos y facilitan la informacion en la toma de decisiones, aumentan rentabilidad, competitividad y sustentabilidad, de acuerdo a, soluciones creativas a problemas de ingeniería complejos con enfoque sistemico, actitud negociadora y trabajo colaborativo."
        ],
        "Transporte": [
            "AE1 Sistemas de transporte: Diseña sistemas de transporte con base en metodologías de normalización y calidad, para el traslado masivo de personas y bienes, fomenta la responsabilidad, la disciplina individual, la confidencialidad, el trabajo en equipo, el respeto y la ética profesional.",
            "AE2 Seguridad de la carga y pasajeros: Analiza mediante diversas metodologías el Manejo y Seguridad de la Carga y de pasajeros, a partir del marco legal vigente a nivel nacional e internacional en los diferentes modos de transporte, considerando la sustentabilidad, fomenta la autonomía, la visión autocrítica, la ética profesional.",
            "AE3 Proyectos de transporte: Crea proyectos de inversión mediante la metodología de formulación y evaluación de proyectos, así como de los riesgos asociados a ellos, promueve la responsabilidad, la ética profesional, el respeto, la tolerancia, y el trabajo colaborativo.",
            "AE4 Solución de problemas: Formula propuestas de solución factibles a la problemática que integra la logística, así como el transporte de personas y mercancías, mediante la aplicación de las ciencias básicas de la ingeniería, que considere el análisis de los aspectos administrativos, operativos y técnicos, promueve el trabajo en equipo, la ética profesional, la equidad, la responsabilidad y la tolerancia.",
            "AE5 Operación y mantenimiento: Formula propuestas de mejora a los sistemas de operación y mantenimiento de los diferentes modos de transporte; mediante el uso de herramientas tecnológicas, procesos administrativos, técnicas estadísticas de diagnóstico y solución de problemas, fomenta la creatividad, la visión crítica y autocrítica, la responsabilidad, la disciplina, la ética profesional y el trabajo colaborativo."
        ]
    };

    function showLoader() {
        var loader = document.getElementById('loader');
        loader.style.display = 'block';

        setTimeout(function () {
            loader.style.display = 'none';
            const selectedPlan = document.querySelector('button[data-plan].active')?.getAttribute('data-plan');

            displayAttributes(selectedPlan);
        }, 1800); // Tiempo de espera en milisegundos
    }

    function displayAttributes(plan) {
        const unidadData = unidadesData.find(u => u[0] === unidadInput.value);
        if (!unidadData) {
            resultParagraph.innerHTML = 'Selecciona una unidad de aprendizaje válida.';
            return;
        }

        const planAttributes = atributos[plan];
        if (!planAttributes) {
            resultParagraph.innerHTML = 'No hay atributos disponibles para este plan.';
            return;
        }

        let attributesToShow = [];
        for (let i = 1; i < unidadData.length; i++) {
            if (unidadData[i] !== '' && unidadData[i] !== undefined) {
                const attributeIndex = i - 1;
                if (planAttributes[attributeIndex]) {
                    attributesToShow.push(planAttributes[attributeIndex]);
                }
            }
        }

        if (attributesToShow.length > 0) {
            attributesToShow.forEach(attribute => {
                const parts = attribute.split(': ');
                const span1 = document.createElement('span');
                span1.classList.add('highlight');
                span1.textContent = parts[0] + ': ';

                const br = document.createElement('br'); // Crear un elemento de salto de línea

                const span2 = document.createElement('span');
                span2.textContent = parts[1];

                const p = document.createElement('p');
                p.appendChild(span1);
                p.appendChild(br);
                p.appendChild(span2);
                p.classList.add('atributo');
                resultParagraph.appendChild(p);
            });
        } else {
            resultParagraph.innerHTML = 'La unidad seleccionada no contribuye a ningún atributo de egreso conocido.';
        }
    }

    function cargarUnidades(plan) {
        fetch(`${scriptURL}?action=unidades&plan=${plan}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                headers = data[0];
                unidadesData = data.slice(1);
                actualizarDatalistUnidad(unidadesData);
            })
            .catch(error => {
                console.error('Error al cargar las unidades:', error);
                unidadDatalist.innerHTML = '<option>Error al cargar unidades</option>';
            });
    }

    function actualizarDatalistUnidad(data) {
        let optionsHtml = '';
        data.forEach(item => {
            optionsHtml += `<option value="${item[0]}">${item[0]}</option>`;
        });
        unidadDatalist.innerHTML = optionsHtml;

        // Mostrar la sección de unidades y su input
        unidadSection.style.display = 'block';
        unidadInput.focus();
    }

    planButtons.forEach(button => {
        button.addEventListener('click', function () {
            planButtons.forEach(btn => btn.classList.remove('active')); // Remove active class from all buttons
            this.classList.add('active'); // Add active class to the clicked button
            
            const plan = this.getAttribute('data-plan');
            const iconSrc = this.querySelector('img').src; // Obtener la fuente del ícono del plan seleccionado
            planIcon.src = iconSrc; // Establecer la fuente del ícono
            planIcon.style.display = 'block'; // Mostrar el ícono
            planText.textContent = `Ing. ${plan}`; // Establecer el texto del plan
            planText.style.display = 'block';
            document.getElementById('unidad').value = '';

            cargarUnidades(plan);
            
            // Ocultar botones de planes y mostrar texto del plan
            document.getElementById('planes').style.display = 'none';
            document.getElementById('resultado').style.display = 'block';
            document.getElementById('backButton').style.display = 'block';

            showLoader(); // Mostrar el loader
        });
    });

    unidadInput.addEventListener('input', function () {
        const selectedUnidad = unidadInput.value;
        const unidadData = unidadesData.find(u => u[0] === selectedUnidad);
        const nivelMap = {
            'I': 'Introductorio',
            'M': 'Medio',
            'A': 'Avanzado'
        };

        if (unidadData) {
            let contribuciones = [];
            for (let i = 1; i < unidadData.length; i++) {
                if (unidadData[i] !== '' && unidadData[i] !== undefined) {
                    let nivel = unidadData[i];
                    if (nivelMap[nivel]) {
                        nivel = nivelMap[nivel];
                    }
                    contribuciones.push(`<span class="resultado-atributo"> Atributo ${i}: ${headers[i]}</span> <span class="texto">con un nivel </span><span class="resultado-nivel">${nivel}</span>`);
                }
            }
            if (contribuciones.length > 0) {
                resultParagraph.innerHTML = `<span class="texto">La unidad </span> <span class="resultado">'${selectedUnidad}'</span> <span class="texto">contribuye a:</span><br>-${contribuciones.join('<br>-')}`;
                displayAttributes(document.querySelector('button[data-plan].active')?.getAttribute('data-plan'));
            } else {
                resultParagraph.innerHTML = `La unidad '${selectedUnidad}' no contribuye a ningún atributo de egreso conocido.`;
            }
            resultParagraph.classList.remove('animated-text'); // Reiniciar animación
            void resultParagraph.offsetWidth; // Reflujos para reiniciar animación
            resultParagraph.classList.add('animated-text'); // Agregar clase de animación
        } else {
            resultParagraph.innerHTML = 'Selecciona una unidad de aprendizaje válida.';
        }
    });

    document.getElementById('backButton').addEventListener('click', function () {
        document.getElementById('planes').style.display = 'flex'; // Mostrar los botones de los planes
        unidadSection.style.display = 'none'; // Ocultar la sección de unidades
        this.style.display = 'none'; // Ocultar el botón de regreso
        resultParagraph.innerHTML = '';
        document.getElementById('resultado').style.display = 'none'; // Limpiar el resultado
        planIcon.style.display = 'none'; // Ocultar el ícono
        planText.style.display = 'none';
    });
});
