const v = "\x1b[32m%s\x1b[0m"; // NO TOCAR
const o = "*".repeat(80) + "\n"; // NO TOCAR
const oo = "*".repeat(25); // NO TOCAR

/*******************************/
/* Desarrollo de las consignas */
/*******************************/
const jsonHelper = require("./jsonHelper");
// A
// Crear un objeto literal que represente la aplicación.
// El objeto será la representación de nuestra carrera
const carreraBicicletas = {
  // B
  // Agregar una propiedad llamada bicicletas en la que asignarás
  //  las bicicletas obtenidas a partir del método leer del objeto requerido como módulo
  bicicletas: jsonHelper.leerJson("bicicletas"),
  // C
  // Agregar una propiedad llamada bicicletasPorTanda que contenga el valor 4.
  //  Este valor representará la cantidad máxima de bicicletas por tanda.
  bicicletasPorTanda: 4,
  //D
  // Agregar un método listarBicicletas que reciba como
  //  parámetro un array de ciclistas e imprima por consola la siguiente información:
  listarBicicletas: (arrayCiclistas) => {
    arrayCiclistas.forEach((ciclista) => {
      console.log(`Ciclista:${ciclista.ciclista}, marca:${ciclista.marca},rodado:${ciclista.rodado},peso: ${ciclista.peso} kg,
      largo:${ciclista.largo} cm, estado: ${ciclista.dopaje}.`);
    });
  },
  // E
  // Agregar un método ciclistasHabilitados que devuelva una lista donde los ciclistas tengan un dopaje negativo.
  // Este método no recibirá ningún parámetro.
  // Este método devolverá un array con los ciclistas que estén habilitados para correr.
  ciclistasHabilitados: function () {
    //  console.log(this.bicicletas)
    return this.bicicletas.filter((bicicleta) => !bicicleta.dopaje);
  },
  //F
  // Agregar un método buscarPorId que permita buscar un ciclista en función de su id.
  // Este método recibirá por parámetro un number que represente el id a buscar
  // En caso de encontrar un ciclista con el id buscado, devolverá el objeto literal que lo representa.
  // En caso contrario devolverá undefined
  buscarPorId: function (id) {
    return this.bicicletas.find((bicicleta) => bicicleta.id === id);
  },
  //G
  // Agregar un método filtrarPorPeso que permita filtrar los ciclistas habilitados, siempre y cuando su peso sea menor o igual al enviado como argumento.
  // Este método recibirá por parámetro un number que represente el peso a buscar.
  // Este método devolverá un array con todos los ciclistas que cumplan con la condición mencionada.
  // En caso de no encontrar ningún ciclista, devolverá un array vacío.
  // Este método debe usar ciclistasHabilitados para buscar incluir solamente aquellos autos que estén habilitados.
  filtrarPorPeso: function (peso) {
    let habilitados = this.ciclistasHabilitados();
    return habilitados.filter((bicicleta) => bicicleta.peso <= peso);
  },
  //H
  // Agregar un método ordenarPorRodado que ordene todas las bicicletas de menor a mayor según su rodado.
  // Este método devolverá un array con todos las bicicletas ordenadas por rodado.
  // Recordemos que Javascript tiene un método para hacer justamente lo que necesitamos 😉.
  ordenarPorRodado: function () {
    return this.bicicletas.sort((a, b) => {
      return a.rodado - b.rodado;
    });
  },
  // I
  // Agregar un método largoPromedio que permita saber el largo promedio de todas las bicicletas.
  // Este método no recibirá ningún parámetro.
  // Este método devolverá un mensaje indicando la información solicitada.
  largoPromedio: function () {
    const largoBicicletas = this.bicicletas.map((bicicleta) => bicicleta.largo);
    let sumatoriaLargoBicicletas = largoBicicletas.reduce(
      (valorInicial, valorFinal) => {
        return valorInicial + valorFinal;
      }
    );

    let promedio = sumatoriaLargoBicicletas / this.bicicletas.length;

    return `El largo promedio de todas las bicicletas es: ${promedio.toFixed(
      2
    )}`;
  },

  //J
  // Agregar un método aumentarPeso, el cual deberá aumentar el peso de una bicicleta y guardar los cambios en la base de datos.
  // El método recibirá por parámetro un número indicando la cantidad a aumentar (en kg) y un id, y
  // debe reutilizar el método buscarPorId.
  // en caso de encontrar una bicicleta con dicho id deberá:
  // Aumentar su peso (sumar la cantidad indicada a la existente)
  // Guardar los datos en el archivo JSON.
  aumentarPeso: function (cantidadAumentar, id) {
    const bicicleta = this.buscarPorId(id);
    if (bicicleta) {
      bicicleta.peso = bicicleta.peso + cantidadAumentar;
    }
    jsonHelper.escribirJson("bicicletas", this.bicicletas);
  },
  //K
  // Agregar un método generarTanda que retorna un array de ciclistas, que cumplan con las siguientes condiciones:
  // El ciclista esté habilitado
  // El rodado sea menor o igual al valor enviado como argumento
  // El peso sea mayor o igual al valor enviado como argumento
  // La cantidad devuelta sea como máximo la expresada en la propiedad bicicletasPorTanda.
  // Para este método vamos a dejar que vos determines los parámetros que debería recibir.
  // Te recomendamos que pienses qué métodos de los que ya programaste podés reutilizar en este paso 😉.
  generarTanda: function (rodado, peso) {
    const habilitados = this.ciclistasHabilitados();
    let pesoMayor = habilitados.filter((bicicleta) => bicicleta.peso >= peso);

    let filtroRodado = pesoMayor.filter(
      (bicicleta) => bicicleta.rodado <= rodado
    );

    if (filtroRodado.length > this.bicicletasPorTanda) {
      return filtroRodado.slice(0, this.bicicletasPorTanda);
    } else {
      return filtroRodado;
    }
  },
  //L
  // Agregar un método que permita calcularPodio, el mismo deberá calcular al ganador y los siguientes dos puestos en función de su puntaje.
  // El método recibirá como parámetro un array de ciclistas. Los mismos deberán ser generados con generarTanda.
  // El método ordenará por puntaje los ciclistas recibidos.
  // El método imprimirá por consola los tres primeros puestos.
  calcularPodio: function (podio) {
    let podioOrdenado = podio.sort((a, b) =>b.puntaje - a.puntaje);
    if (podioOrdenado.length > 3) {
      podioOrdenado.slice(0, 3);
    }

    return (
      `El ganador es: ${podioOrdenado[0].ciclista}, con un puntaje de ${podioOrdenado[0].puntaje}.` +
       `El segundo puesto es para ${podioOrdenado[1].ciclista}, con un puntaje de ${podioOrdenado[1].puntaje}.` +
       `El tercer puesto es para ${podioOrdenado[2].ciclista}, con un puntaje de ${podioOrdenado[2].puntaje}.`
    );
  },
};

// L
/******************************/
/* Ejecución de las consignas */
/******************************/

console.log(v, "\n" + oo + " .D. ");
// Ejecución aquí
console.log(carreraBicicletas.listarBicicletas(carreraBicicletas.bicicletas));
console.log(o);

console.log(v, oo + " .E.");
// Ejecución aquí
console.log(carreraBicicletas.ciclistasHabilitados());
console.log(o);

console.log(v, oo + " .F.");
// Ejecución aquí
console.log(carreraBicicletas.buscarPorId(2));
console.log(o);

console.log(v, oo + " .G.");
// Ejecución aquí
console.log(carreraBicicletas.filtrarPorPeso(7));
console.log(o);

console.log(v, oo + " .H.");
// Ejecución aquí
console.log(carreraBicicletas.ordenarPorRodado());
console.log(o);

console.log(v, oo + " .I.");
// Ejecución aquí
console.log(carreraBicicletas.largoPromedio());
console.log(o);

console.log(v, oo + " .J. ");
// Ejecución aquí
console.log(carreraBicicletas.aumentarPeso(1, 1));
console.log(o);

console.log(v, oo + " .K. ");
// Ejecución aquí
console.log(carreraBicicletas.generarTanda(30, 7));
console.log(o);

console.log(v, oo + " .L. ");
// Ejecución aquí
const podio = carreraBicicletas.generarTanda(30, 7);

console.log(carreraBicicletas.calcularPodio(podio))
console.log(o);
