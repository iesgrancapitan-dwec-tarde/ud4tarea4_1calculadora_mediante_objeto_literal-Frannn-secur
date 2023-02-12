# UD4 Practica4.1 Calculadora mediante objeto literal

## Francisco José Gómez Ruiz

### Partiendo de un documento vacío, crea los elementos HTML de una calculadora mediante los objetos predefinidos de document

### Crea los elementos HTML de la calculadora mediante los métodos del objeto predefinido document. Ni tablas ni li, ni document.write() ni fichero.css están permitidos. Dale un buen uso a las etiquetas

Añádele ahora el comportamiento del display bien controlado (ni +, ni -, ni x ni %):

1. Inicialmente en el display aparece el cero sin decimal.
2. En el display sólo puede aparecer un punto decimal.
3. A la izquierda del punto sólo puede aparecer un cero ("00.1" no es válido).
4. No hay que escribir "0." para que te acepte el decimal. Basta con que pulse la coma decimal. Entonces el resto se consideran decimales.
5. En el display siempre ha de haber un dígito. En caso de usar el retroceso y ser el último carácter aparecerá un cero.
6.El cero negativo no existe ("-0" no es válido)

El diseño parte del ejercicio del tema anterior.  Procura que el patrón de diseño sea con un **objeto literal**.

~~~js
const calculadora = {
  elementos: [
    { label: "CE", value: "clear" },
    { label: "←", value: "retroceder" },
    { label: "%", value: "%" },
    { label: "+", value: "+" },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "-", value: "-" },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "x", value: "*" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "/", value: "/" },
    { label: "0", value: 0 },
    { label: "±", value: "cambiarSigno" },
    { label: ",", value: "." },
    { label: "=", value: "=" }
  ],
  valor: 0,
  limpiar() {
    return this.valor = 0;
  },
  cambiarSigno() {
    return this.valor *= -1;
  },
  eliminarUltimoCaracter() {
    return this.valor = this.valor.slice(0, -1);
  }

};
~~~

El objeto literal sería tal que así, un objeto calculadora con un array asociativo en el que cogemos el label que seria lo que seria el boton y el valor de este mismo boton, el valor que tendra por defecto la calculadora y tres funciones dentro del objeto literal que son limpiar() que me volverá a poner el valor 0, cambiarSigno() que en caso de que sea positivo me lo pondra en negativo y en caso de que sea negativo lo pondrá en negativo y por ultimo la función eliminarUltimoCaracter() que el último caracter que haya en el input se eliminirá.

~~~js
const div = document.createElement("div");
const salto = document.createElement("br");
const input = document.createElement("input");

div.style.width = "250px";
document.body.appendChild(div);

input.value = calculadora.valor;
input.disabled = true;
input.style.width = "230px";
div.appendChild(input);
div.appendChild(salto);
~~~

Con este trozo de codigo lo que hacemos es crearme un div un salto de linea y el input que tendra el valor de dicha calculadora y aplicarle una serie de estilos y meterlo todo dentro del div creado y este ultimo eterlo dentro de lo que sería el documento.

~~~js
calculadora.elementos.forEach(elem => {
  const btn = document.createElement("button");
  btn.textContent = elem.label;
  btn.id = elem.value;
  btn.style.width = "2.5em";
  btn.style.height = "2em";
  btn.style.margin = "0.25em";
  btn.style.fontSize = "1.25em";
  div.appendChild(btn);

  btn.addEventListener("click", function() {
    //comprueba si el valor del input es 0 y si el valor del boton es un numero
    if (input.value == 0 && typeof elem.value == "number") {
      input.value = elem.value;
      calculadora.valor = input.value
    } else if(elem.value == "cambiarSigno"){
      input.value = calculadora.cambiarSigno();
    } else if (elem.value == "clear") {
      input.value = calculadora.limpiar();
    } else if (elem.value == ".") {
      input.value.includes(".") ? input.value = input.value : input.value += elem.value;
    } else if (elem.value == "retroceder") {
      input.value = calculadora.eliminarUltimoCaracter();
    }
    else {
      //si es un numero lo añade al input
      input.value += elem.value;
      calculadora.valor = input.value
    }
  });
});

~~~

Hacemos un forEach al array que hay dentro del objeto literal de la calculadora y vamos creando unos botones con una serie de estilos y ya sea añadirle el valor, el id, padding...
Luego a cada boton le asignaremos un evento, si el input es = 0 y el tipo del valor del boton es numbre pues me meterá el valor del boton en el input y guardaremos ese valor en el valor de la calculadora, si el valor del boton es "cambiarSigno" cambiará el signo del input ya sea que este en negativo o en positivo, si el valor del boton es clear llamaremos a la funcion limpiar() me limpiará todo el input y me pondra como unico valor el 0, si el boton es = "." que sería la coma me pondra el valor de la coma pero en caso de que haya ya una coma no me pondra nada.
Si el valor del boton es retroceder eliminar el ultimo valor que haya en el input con la funcion eliminarUltimoCaracter() del objeto literal.
En caso de que no sea ninguno de los anteriores me lo meterá en la calculadora debido a que no hay mas funcionalidades que poner.
