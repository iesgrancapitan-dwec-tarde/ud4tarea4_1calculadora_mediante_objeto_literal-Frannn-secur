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

//recorre la calculadora y crea los botones con sus correspondientes valores
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
