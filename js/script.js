document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const resultParagraph = document.getElementById('resultado');
  const planSelect = document.getElementById('plan');
  const unidadSelect = document.getElementById('unidad');
  let unidadesData = [];
  let headers = [];

  const scriptURL = 'https://script.google.com/macros/s/AKfycbybXLuDmQ5PJ1Zse51F1ouQgYa7OBrZt0nTMuPxnEIIufVPXIDh0KGegVS1JP_7r0f3rw/exec';
 
  function cargarUnidades(plan) {
    fetch(`${scriptURL}?action=unidades&plan=${plan}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        headers = data[0]; // Guardar los encabezados para usar en la descripción de atributos
        console.log('Datos crudos:', data);
        console.log('Encabezados:', headers);
        unidadesData = data.slice(1); // Guarda los datos de las unidades sin la fila de encabezados
        console.log('Datos de unidades:', unidadesData);
        actualizarSelectUnidad(unidadesData);
      })
      .catch(error => {
        console.error('Error al cargar las unidades:', error);
        unidadSelect.innerHTML = '<option>Error al cargar unidades</option>';
      });
  }

  function actualizarSelectUnidad(data) {
    let optionsHtml = '';
    data.forEach(item => {
      optionsHtml += `<option value="${item[0]}">${item[0]}</option>`;
    });
    unidadSelect.innerHTML = optionsHtml;

    // Forzar la selección de la primera unidad y disparar el evento change
    if (data.length > 0) {
      unidadSelect.value = data[0][0];
      unidadSelect.dispatchEvent(new Event('change'));
    }
  }

  planSelect.addEventListener('change', function () {
    cargarUnidades(planSelect.value);
  });

  unidadSelect.addEventListener('change', function () {
    const selectedUnidad = unidadSelect.value;
    const unidadData = unidadesData.find(u => u[0] === selectedUnidad);
    const nivelMap = {
      'I': 'Introductoria',
      'M': 'Medio',
      'A': 'Avanzada'
    };
    console.log('Datos de la unidad seleccionada:', unidadData);
    console.log('Unidad seleccionada:', selectedUnidad);
    if (unidadData) {
      let contribuciones = [];
      for (let i = 1; i < unidadData.length; i++) {
        if (unidadData[i] !== '' && unidadData[i] !== undefined) {
          let nivel = unidadData[i];
          if (nivelMap[nivel]) {
            nivel = nivelMap[nivel];
          }
          contribuciones.push(`<span class="resultado-atributo">${headers[i]}</span> de manera <span class="resultado-nivel">${nivel}</span>`);
        }
      }
      if (contribuciones.length > 0) {
        resultParagraph.innerHTML = `La unidad de aprendizaje <strong>'${selectedUnidad}'</strong> contribuye al atributo:<br>- ${contribuciones.join('<br>- ')}`;
      } else {
        resultParagraph.innerHTML = `La unidad de aprendizaje <strong>'${selectedUnidad}'</strong> no contribuye a ningún atributo de egreso conocido.`;
      }
    } else {
      resultParagraph.innerHTML = `La unidad de aprendizaje '${selectedUnidad}' no contribuye a ningún atributo de egreso conocido.`;
    }
  });

  // Carga inicial de unidades basada en la selección inicial de plan
  cargarUnidades(planSelect.value);
});

