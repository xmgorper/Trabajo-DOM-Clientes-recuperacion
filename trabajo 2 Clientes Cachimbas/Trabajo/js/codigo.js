"use strict";

var oTienda = new Tienda();

document.querySelector("#mnuAltaPersona").addEventListener("click", gestionFormularios);
document.querySelector("#mnuModificaPersona").addEventListener("click", gestionFormularios);
document.querySelector("#listadoFacturas").addEventListener("click", gestionFormularios);
document.querySelector("#mnuAltaProducto").addEventListener("click", gestionFormularios);
document.querySelector("#mnuAltaFactura").addEventListener("click", gestionFormularios);
document.querySelector("#tiposDeProducto-T").addEventListener("click", gestionFormularioFactura);
document.querySelector("#tiposDeProducto-B").addEventListener("click", gestionFormularioFactura);
document.querySelector("#tiposDeProducto-C").addEventListener("click", gestionFormularioFactura);
document.querySelector("#rbtTipoPersona-C").addEventListener("click", gestionFormularioAltaPersonaCliente);
document.querySelector("#rbtTipoPersona-A").addEventListener("click", gestionFormularioAltaPersonaAdmin);
document.querySelector("#rbtTipoProducto-T").addEventListener("click", gestionFormularioAltaFacturaTabaco);
document.querySelector("#rbtTipoProducto-B").addEventListener("click", gestionFormularioAltaFacturaBoquilla);
document.querySelector("#rbtTipoProducto-C").addEventListener("click", gestionFormularioAltaFacturaCachimba);
document.querySelector("#rbtMofificarTipoPersona-C").addEventListener("click", gestionFormularioModificarPersonaCliente);
document.querySelector("#rbtMofificarTipoPersona-A").addEventListener("click", gestionFormularioModificarPersonaAdmin);
document.querySelector("#mostrarModificarContrasena").style.display = "none";
document.querySelector("#mostrarModificarTarjeta").style.display = "block";
document.querySelector("#mostrarInputContrasena").style.display = "none";
document.querySelector("#mostrarInputTarjeta").style.display = "block";
document.querySelector("#productosTabacos").style.display = "none";
document.querySelector("#productosBoquillas").style.display = "none";
document.querySelector("#productosCachimbas").style.display = "none";
document.querySelector("#mostrarInputTarjeta").style.display = "block";
document.querySelector("#mostarInputSabor").style.display = "block";
document.querySelector("#mostarInputMaterial").style.display = "none";
document.querySelector("#mostarInputManguera").style.display = "none";
document.querySelector("#mostarInputCazoleta").style.display = "none";
document.querySelector("#mostarInputBase").style.display = "none";
document.querySelector("#mostarInputPurga").style.display = "none";
document.querySelector("#btnAceptarAltaPersona").addEventListener("click", cliente, false);
document.querySelector("#btnAceptarFactura").addEventListener("click", factura, false);
document.querySelector("#btnAceptarAltaProducto").addEventListener("click", cerveza, false);
document.querySelector("#btnAceptarModificaPersona").addEventListener("click",gestionPersonasModificar);
document.querySelector("#mnuListadoProductos").addEventListener("click", obtenerListadoProductos, false);
document.querySelector("#mnuListadoPersonas").addEventListener("click", obtenerListadoPersonas, false);
document.querySelector("#btnAceptarListadoFacturas").addEventListener("click",recogerFecha,false);
var xml = loadXMLDoc("almacen.xml");
var xhttp;


// Gestion de formulario
function gestionFormularios(oEvento) {
    let oE = oEvento || window.event;
  
    if (oE.target.id == "mnuAltaPersona") {
        frmAltaPersona.style.display = "block";
        frmModificaPersona.style.display = "none";
        frmFacturaPersona.style.display = "none";
        frmAltaProducto.style.display = "none";
        frmListadoFacturas.style.display = "none";
        
    }
    if (oE.target.id == "mnuModificaPersona") {
        frmModificaPersona.style.display = "block";
        frmListadoFacturas.style.display = "none";
        frmAltaPersona.style.display = "none";
        frmAltaProducto.style.display = "none";
        frmFacturaPersona.style.display = "none";

  }
    if (oE.target.id == "mnuAltaFactura") {
        frmFacturaPersona.style.display = "block";
        frmModificaPersona.style.display = "none";
        frmAltaPersona.style.display = "none";
        frmAltaProducto.style.display = "none";
        frmListadoFacturas.style.display = "none";
    }
    if (oE.target.id == "listadoFacturas") {
      frmListadoFacturas.style.display = "block";
        frmModificaPersona.style.display = "none";
        frmAltaPersona.style.display = "none";
        frmAltaProducto.style.display = "none";
        frmFacturaPersona.style.display = "none";
    }
    if (oE.target.id == "mnuAltaProducto") {
      frmFacturaPersona.style.display = "none";
      frmModificaPersona.style.display = "none";
      frmAltaPersona.style.display = "none";
      frmAltaProducto.style.display = "block";
      frmListadoFacturas.style.display = "none";
  }
  
  }

  // aceptarAltaPersona
function aceptarAltaPersona() {
    let DNIPersona = parseInt(frmAltaPersona.txtDNIPersona.value.trim());
    let nombre = frmAltaPersona.txtNombrePersona.value.trim();
    let telefono = parseInt(frmAltaPersona.txtNumeroDeTelefono.value.trim());
    let correo  = frmAltaPersona.txtCorreoPersona.value.trim();
    let tarjeta = frmAltaPersona.txtTarjeta.value.trim();
    let contrasena = frmAltaPersona.txtContrasena.value.trim();
    let oPersona;
    let mensaje;
    
    if (document.querySelector("#rbtTipoPersona-C").checked) {
        oPersona = new Cliente(DNIPersona, nombre, telefono, correo, tarjeta);
        mensaje = oTienda.altaPersona(oPersona);
        if (mensaje == "Alta Persona OK")
          document.getElementById("frmAltaPersona").reset();
        frmAltaPersona.style.display = "none";
        alert(mensaje);
    } else {
        oPersona = new Admin(DNIPersona, nombre, telefono, correo, contrasena);
        mensaje = oTienda.altaPersona(oPersona);
        if (mensaje == "Alta Persona OK")
          document.getElementById("frmAltaPersona").reset();
        frmAltaPersona.style.display = "none";
        alert(mensaje);
    }
    añadePersona(DNIPersona);
  }

  // aceptarAltaFactura
function aceptarAltaFactura() {
    let idFactura = parseInt(frmFacturaPersona.txtIdFactura.value.trim());
    let idPersona = parseInt(frmFacturaPersona.txtDNIFacturaPersona.value.trim());
    let select;
    let productos = "";
    let precioT=0;
    let precioB=0;
    let precioC=0;
    if(document.querySelector("#tiposDeProducto-T").checked){
      select = document.querySelector("#lstTabacos");
      let idTabacos = select.selectedOptions[0].id;
      let Tabaco = oTienda.cogerProducto(idTabacos);
      precioT = oTienda.cogerPrecioProducto(Tabaco);
      productos+=idTabacos+" ";
    }
    if(document.querySelector("#tiposDeProducto-B").checked){
      select = document.querySelector("#lstBoquillas");
      let idBoquillas = select.selectedOptions[0].id;
      let Boquilla = oTienda.cogerProducto(idBoquillas);
      precioB = oTienda.cogerPrecioProducto(Boquilla);
      productos+=idBoquillas+" ";
    }
    if(document.querySelector("#tiposDeProducto-C").checked){
      select = document.querySelector("#lstCachimbas");
      let idCachimbas = select.selectedOptions[0].id;
      let Cachimba = oTienda.cogerProducto(idCachimbas);
      precioC = oTienda.cogerPrecioProducto(Cachimba);
      productos+=idCachimbas;
    }
    
    let total = precioT+precioB+precioC;  
    let fecha = new Date();
    fecha.setHours(0, 0, 0);
    let mensaje;
    let oFactura;
  
    
      oFactura = new Factura(idFactura, idPersona, productos, total, fecha);
      mensaje = oTienda.altaFactura(oFactura);
      if (mensaje == "Alta Factura OK")
        document.getElementById("frmFacturaPersona").reset();
        frmFacturaPersona.style.display = "none";
      alert(mensaje);
    
    
}

//añadir Un cliente al select de modificaPersona
function añadePersona(idPersona){
  let option = document.createElement("option");
  let lstC = document.getElementById("lstPersonas");

  lstC.appendChild(option);
  option.setAttribute("id",idPersona);

  let text = "Persona nº ";
  text+=idPersona;
  option.textContent = text;
}

//modificar cliente
var id;
function gestionPersonasModificar(){
  let oPersona;
  let mensaje;
  let select = document.querySelector("#lstPersonas");
  let idPersona = select.selectedOptions[0].id;
 

  let nuevoNombre = frmModificaPersona.txtModificarNombrePersona.value.trim();
  let nuevotelefono = parseInt(frmModificaPersona.txtModificarNumeroDeTelefono.value.trim());
  let nuevaTarjeta = frmModificaPersona.txtModificaTarjeta.value.trim();
  let nuevaContrasena = frmModificaPersona.txtModificarContrasena.value.trim();

  if (document.querySelector("#rbtMofificarTipoPersona-C").checked) {
    oPersona = new Cliente(idPersona, nuevoNombre, nuevotelefono, nuevaTarjeta);
    mensaje = oTienda.modificaPersona(oPersona);
    if (mensaje == "Modificacion Persona OK")
      document.getElementById("frmModificaPersona").reset();
    frmModificaPersona.style.display = "none";
    alert(mensaje);
} else {
    oPersona = new Admin(idPersona, nuevoNombre, nuevotelefono, nuevaContrasena);
    mensaje = oTienda.modificaPersona(oPersona);
    if (mensaje == "Modificacion Persona OK")
      document.getElementById("frmModificaPersona").reset();
    frmModificaPersona.style.display = "none";
    alert(mensaje);
}

}

function gestionFormularioAltaPersonaCliente(){
  if(document.querySelector("#rbtTipoPersona-C:checked")){
    document.querySelector("#mostrarInputTarjeta").style.display = "block";
    document.querySelector("#mostrarInputContrasena").style.display = "none";
  }

}
function gestionFormularioAltaPersonaAdmin(){
  if(document.querySelector("#rbtTipoPersona-A:checked")){
    document.querySelector("#mostrarInputContrasena").style.display = "block";
    document.querySelector("#mostrarInputTarjeta").style.display = "none";
  }

}
function gestionFormularioModificarPersonaCliente(){
  if(document.querySelector("#rbtMofificarTipoPersona-C:checked")){
    document.querySelector("#mostrarModificarTarjeta").style.display = "block";
    document.querySelector("#mostrarModificarContrasena").style.display = "none";
  }

}
function gestionFormularioModificarPersonaAdmin(){
  if(document.querySelector("#rbtMofificarTipoPersona-A:checked")){
    document.querySelector("#mostrarModificarContrasena").style.display = "block";
    document.querySelector("#mostrarModificarTarjeta").style.display = "none";
  }

}
function gestionFormularioAltaFacturaTabaco(){
  if(document.querySelector("#rbtTipoProducto-T:checked")){
    document.querySelector("#mostarInputSabor").style.display = "block";
    document.querySelector("#mostarInputMaterial").style.display = "none";
    document.querySelector("#mostarInputManguera").style.display = "none";
    document.querySelector("#mostarInputCazoleta").style.display = "none";
    document.querySelector("#mostarInputBase").style.display = "none";
    document.querySelector("#mostarInputPurga").style.display = "none";
  }
}
function gestionFormularioAltaFacturaBoquilla(){
  if(document.querySelector("#rbtTipoProducto-B:checked")){
    document.querySelector("#mostarInputSabor").style.display = "none";
    document.querySelector("#mostarInputMaterial").style.display = "block";
    document.querySelector("#mostarInputManguera").style.display = "none";
    document.querySelector("#mostarInputCazoleta").style.display = "none";
    document.querySelector("#mostarInputBase").style.display = "none";
    document.querySelector("#mostarInputPurga").style.display = "none";
  }
}
function gestionFormularioAltaFacturaCachimba(){
  if(document.querySelector("#rbtTipoProducto-C:checked")){
    document.querySelector("#mostarInputSabor").style.display = "none";
    document.querySelector("#mostarInputMaterial").style.display = "none";
    document.querySelector("#mostarInputManguera").style.display = "block";
    document.querySelector("#mostarInputCazoleta").style.display = "block";
    document.querySelector("#mostarInputBase").style.display = "block";
    document.querySelector("#mostarInputPurga").style.display = "block";
  }
}

  function gestionFormularioFactura(){
    if(document.querySelector("#tiposDeProducto-T:checked")){
      document.querySelector("#productosTabacos").style.display = "block";
    }
    else{
      document.querySelector("#productosTabacos").style.display = "none";
    }
    if(document.querySelector("#tiposDeProducto-B:checked")){
      document.querySelector("#productosBoquillas").style.display = "block";
    }
    else{
      document.querySelector("#productosBoquillas").style.display = "none";
    }
    if(document.querySelector("#tiposDeProducto-C:checked")){
      document.querySelector("#productosCachimbas").style.display = "block";
    }
    else{
      document.querySelector("#productosCachimbas").style.display = "none";
    }

  }

   // aceptarAltaProducto
function aceptarAltaProducto() {
  let idProducto = parseInt(frmAltaProducto.txtIdProducto.value.trim());
  let nombre = frmAltaProducto.txtNombreProducto.value.trim();
  let precio = parseFloat(frmAltaProducto.txtPrecio.value.trim());
  let sabor = frmAltaProducto.txtInputSabor.value.trim();
  let material = frmAltaProducto.txtInputMaterial.value.trim();
  let manguera = frmAltaProducto.txtInputManguera.value.trim();
  let cazoleta = frmAltaProducto.txtInputCazoleta.value.trim();
  let base = frmAltaProducto.txtInputBase.value.trim();
  let purga = frmAltaProducto.txtInputPurga.value.trim();
  let tipo;
  let oProducto;
  let mensaje;
  if (document.querySelector("#rbtTipoProducto-T").checked) {
      oProducto = new Tabaco(idProducto, nombre, precio, sabor);
      mensaje = oTienda.altaProducto(oProducto);
      if (mensaje == "Alta Producto OK")
        document.getElementById("frmAltaProducto").reset();
      frmAltaProducto.style.display = "none";
      alert(mensaje);
      tipo = "T";
      añadeProducto(idProducto,nombre,tipo);
    }
  if (document.querySelector("#rbtTipoProducto-B").checked) {
      oProducto = new Boquilla(idProducto, nombre, precio, material);
      mensaje = oTienda.altaProducto(oProducto);
      if (mensaje == "Alta Producto OK")
        document.getElementById("frmAltaProducto").reset();
      frmAltaProducto.style.display = "none";
      alert(mensaje);
      tipo = "B";
      añadeProducto(idProducto,nombre,tipo);
    }
    if(document.querySelector("#rbtTipoProducto-C").checked){
      oProducto = new Cachimba(idProducto, nombre, precio, manguera, cazoleta, base, purga);
      mensaje = oTienda.altaProducto(oProducto);
      if (mensaje == "Alta Producto OK")
        document.getElementById("frmAltaProducto").reset();
      frmAltaProducto.style.display = "none";
      alert(mensaje);
      tipo = "C";
      añadeProducto(idProducto,nombre,tipo);
    }

    
}

function añadeProducto(idP,nombreP,tipoP){
  let option = document.createElement("option");
  let lstC;
  if(tipoP=="T"){
    lstC = document.getElementById("lstTabacos");
  }if(tipoP=="B"){
    lstC = document.getElementById("lstBoquillas");
  }if(tipoP=="C"){
    lstC = document.getElementById("lstCachimbas");
  }
  

  lstC.appendChild(option);
  option.setAttribute("id",idP);

  let text = "Producto: ";
  text+=nombreP;
  option.textContent = text;
}




 // Validación alta clientes y modifica clientes
function validarAltaPersona(){
  let sErrores = ""; // Cadena de texto con los errores
  let bValido = true; // en principio el formulario es válido
  let oE = window.event;

// Validación DNI 
let sDni = frmAltaPersona.txtDNIPersona.value.trim();
let oExpRegDni = /^\d{8}[a-zA-Z]$/;


if(!oExpRegDni.test(sDni)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaPersona.txtDNIPersona.focus();
      bValido = false;
  
  sErrores += "\nEl DNI no tiene el formato correcto (debe tener 8 números seguido de una letra)";
  frmAltaPersona.txtDNIPersona.classList.add("error");
} 
else {
  frmAltaPersona.txtDNIPersona.classList.remove("error");
}

// Validación Nombre Persona 
let sNombrePersona = frmAltaPersona.txtNombrePersona.value.trim();
let oExpRegNombrePersona = /^(?=.{6,10}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;


if(!oExpRegNombrePersona.test(sNombrePersona)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaPersona.txtNombrePersona.focus();
      bValido = false;
  
  sErrores += "\nEl nombre no tiene el formato correcto (de 6 a 10 letras y numeros sin espacios)";
  frmAltaPersona.txtNombrePersona.classList.add("error");
} 
else {
  frmAltaPersona.txtNombrePersona.classList.remove("error");
}

// Validación email 
let sEmail = frmAltaPersona.txtCorreoPersona.value.trim();
let oExpRegEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


if(!oExpRegEmail.test(sEmail)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaPersona.txtCorreoPersona.focus();
      bValido = false;
  
  sErrores += "\nEl correo electrónico no tiene el formato correcto";
  frmAltaPersona.txtCorreoPersona.classList.add("error");
} 
else {
  frmAltaPersona.txtCorreoPersona.classList.remove("error");
}

// Validación Número de teléfono 
let sTelefono = frmAltaPersona.txtNumeroDeTelefono.value.trim();
let oExpRegTelefono = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;


if(!oExpRegTelefono.test(sTelefono)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaPersona.txtNumeroDeTelefono.focus();
      bValido = false;
  
  sErrores += "\nEl teléfono no tiene el formato correcto (debe ser un número de teléfono español)";
  frmAltaPersona.txtNumeroDeTelefono.classList.add("error");
} 
else {
  frmAltaPersona.txtNumeroDeTelefono.classList.remove("error");
}

if (document.querySelector("#rbtTipoPersona-C").checked) {

// Validación Tarjeta 
let sTarjeta = frmAltaPersona.txtTarjeta.value.trim();
let oExpRegDni = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/;


if(!oExpRegDni.test(sTarjeta)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaPersona.txtTarjeta.focus();
      bValido = false;
  
  sErrores += "\n La tarjeta de credito no tiene el formato correcto";
  frmAltaPersona.txtTarjeta.classList.add("error");
} 
else {
  frmAltaPersona.txtTarjeta.classList.remove("error");
}
}

else{
// Validación contraseña 
let sContra = frmAltaPersona.txtContrasena.value.trim();
let oExpRegEmail = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;


if(!oExpRegEmail.test(sContra)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaPersona.txtContrasena.focus();
      bValido = false;
  
  sErrores += "\La contraseña no tiene el formato correcto(Minimo 8 caracteres,Maximo 15,Al menos una letra mayúscula,Al menos una letra minucula,Al menos un dígito,No espacios en blanco,Al menos 1 caracter especial";
  frmAltaPersona.txtContrasena.classList.add("error");
} 
else {
  frmAltaPersona.txtContrasena.classList.remove("error");
}
}

if(!bValido){ // si ---NO--- está todo OK
  oE.preventDefault();
  alert(sErrores);
  return false;
 }
 else{
   return true;
 }

}

function cliente(){
  if(validarAltaPersona() == true){
     aceptarAltaPersona();
  }
}

 // Validación alta factura
 function validarAltaFactura(){
  let sErrores = ""; // Cadena de texto con los errores
  let bValido = true; // en principio el formulario es válido
  let oE = window.event;

// Validación IdFactura   
let sIdFactura = frmFacturaPersona.txtIdFactura.value.trim();
let oExpRegIdFactura = /^[0-9]{1,}$/;


if(!oExpRegIdFactura.test(sIdFactura)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmFacturaPersona.txtIdFactura.focus();
      bValido = false;
  
  sErrores += "\nEl ID de la factura no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmFacturaPersona.txtIdFactura.classList.add("error");
} 
else {
  frmFacturaPersona.txtIdFactura.classList.remove("error");
}

// Validación IdPersona   
let sIdPersona = frmFacturaPersona.txtDNIFacturaPersona.value.trim();
let oExpRegIdPersona = /^\d{8}$/;


if(!oExpRegIdPersona.test(sIdPersona)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmFacturaPersona.txtDNIFacturaPersona.focus();
      bValido = false;
  
  sErrores += "\nEl ID del cliente no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmFacturaPersona.txtDNIFacturaPersona.classList.add("error");
} 
else {
  frmFacturaPersona.txtDNIFacturaPersona.classList.remove("error");
}

// Validar que algún checkbox está seleccionado 
if(!document.querySelector("#tiposDeProducto-T").checked && !document.querySelector("#tiposDeProducto-B").checked && !document.querySelector("#tiposDeProducto-C").checked){

      //frmFacturaPersona.tiposDeProducto.focus();
      bValido = false;

    sErrores += "\nDebe seleccionar al menos un tipo de Producto";

}


if(!bValido){ // si ---NO--- está todo OK
  oE.preventDefault();
  alert(sErrores);
  return false;
 }
 else{
   return true;
 }

}
function factura(){
  if(validarAltaFactura() == true){
     aceptarAltaFactura();
  }
}

 // Validación alta cerveza
 function validarAltaProducto(){
  let sErrores = ""; // Cadena de texto con los errores
  let bValido = true; // en principio el formulario es válido
  let oE = window.event;

// Validación IdProducto   
let sIdProducto = frmAltaProducto.txtIdProducto.value.trim();
let oExpRegIdProducto = /^[0-9]{1,}$/;


if(!oExpRegIdProducto.test(sIdProducto)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaProducto.txtIdProducto.focus();
      bValido = false;
  
  sErrores += "\nEl ID de la cerveza no tiene el formato correcto (sólo números y como mínimo un caracter)";
  frmAltaProducto.txtIdProducto.classList.add("error");
} 
else {
  frmAltaProducto.txtIdProducto.classList.remove("error");
}

// Validación Nombre Producto 
let sNombreProducto = frmAltaProducto.txtNombreProducto.value.trim();
let oExpRegNombreProducto = /^[A-Za-z0-9\s]+$/g;


if(!oExpRegNombreProducto.test(sNombreProducto)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaProducto.txtNombreProducto.focus();
      bValido = false;
  
  sErrores += "\nEl nombre no tiene el formato correcto";
  frmAltaProducto.txtNombreProducto.classList.add("error");
} 
else {
  frmAltaProducto.txtNombreProducto.classList.remove("error");
}

// Validación grados de alcohol   
let sPrecio = frmAltaProducto.txtPrecio.value.trim();
let oExpRegGradosDeAlcohol = /^[0-9]+([.][0-9]+)?$/;


if(!oExpRegGradosDeAlcohol.test(sPrecio)){

  // Si hasta el momento era correcto -> este el primer error
  

  frmAltaProducto.txtPrecio.focus();
      bValido = false;
  
  sErrores += "\nEl precio no tiene el formato correcto (sólo números o números decimales con '.' y como mínimo debe de tener un caracter)";
  frmAltaProducto.txtPrecio.classList.add("error");
} 
else {
  frmAltaProducto.txtPrecio.classList.remove("error");
}
if(document.querySelector("#rbtTipoProducto-T").checked){
  let sSabor = frmAltaProducto.txtInputSabor.value.trim();
  let oExpRegNombreProducto = /^[A-Za-z0-9\s]+$/g;
  
  
  if(!oExpRegNombreProducto.test(sSabor)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmAltaProducto.txtInputSabor.focus();
        bValido = false;
    
    sErrores += "\nEl sabor no tiene el formato correcto";
    frmAltaProducto.txtInputSabor.classList.add("error");
  } 
  else {
    frmAltaProducto.txtInputSabor.classList.remove("error");
  }
}if(document.querySelector("#rbtTipoProducto-B").checked){
  let sMaterial = frmAltaProducto.txtInputMaterial.value.trim();
  let oExpRegNombreProducto = /^[A-Za-z0-9\s]+$/g;
  
  
  if(!oExpRegNombreProducto.test(sMaterial)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmAltaProducto.txtInputMaterial.focus();
        bValido = false;
    
    sErrores += "\nEl material no tiene el formato correcto";
    frmAltaProducto.txtInputMaterial.classList.add("error");
  } 
  else {
    frmAltaProducto.txtInputMaterial.classList.remove("error");
  }
}if(document.querySelector("#rbtTipoProducto-C").checked){
  /*let sManguera = frmAltaProducto.txtInputManguera.value.trim();
  let oExpRegNombreProducto = /^[A-Za-z0-9\s]+$/g;
  
  
  if(!oExpRegNombreProducto.test(sManguera)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmAltaProducto.txtInputManguera.focus();
        bValido = false;
    
    sErrores += "\nLa manguera no tiene el formato correcto";
    frmAltaProducto.txtInputManguera.classList.add("error");
  } 
  else {
    frmAltaProducto.txtInputManguera.classList.remove("error");
  }

  let sCazoleta = frmAltaProducto.txtInputCazoleta.value.trim();
  
  
  
  if(!oExpRegNombreProducto.test(sCazoleta)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmAltaProducto.txtInputCazoleta.focus();
        bValido = false;
    
    sErrores += "\nLa cazoleta no tiene el formato correcto";
    frmAltaProducto.txtInputCazoleta.classList.add("error");
  } 
  else {
    frmAltaProducto.txtInputCazoleta.classList.remove("error");
  }

  let sBase = frmAltaProducto.txtInputBase.value.trim();

  
  
  if(!oExpRegNombreProducto.test(sBase)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmAltaProducto.txtInputBase.focus();
        bValido = false;
    
    sErrores += "\nLa base no tiene el formato correcto";
    frmAltaProducto.txtInputBase.classList.add("error");
  } 
  else {
    frmAltaProducto.txtInputBase.classList.remove("error");
  }

  let sPurga = frmAltaProducto.txtInputPurga.value.trim();
  
  
  
  if(!oExpRegNombreProducto.test(sPurga)){
  
    // Si hasta el momento era correcto -> este el primer error
    
  
    frmAltaProducto.txtInputPurga.focus();
        bValido = false;
    
    sErrores += "\nLa purga no tiene el formato correcto";
    frmAltaProducto.txtInputPurga.classList.add("error");
  } 
  else {
    frmAltaProducto.txtInputPurga.classList.remove("error");
  }

  
*/

}

if(!bValido){ // si ---NO--- está todo OK
  oE.preventDefault();
  alert(sErrores);
  return false;
 }
 else{
   return true;
 }

}

function cerveza(){
  if(validarAltaProducto() == true){
     aceptarAltaProducto();
  }
}

function obtenerListadoProductos() {
  let url = encodeURI("listadoProductos.html");
  oTienda.listadoProductos();
  let ventana = open(url,"_blank");
}

function obtenerListadoPersonas() {
  let url = encodeURI("listadoPersonas.html");
  oTienda.listadoPersonas();
  let ventana = open(url,"_blank");
}

function recogerFecha(){
  let fechaInicio = new Date(document.getElementById("txtFechaInicio").value);
  let fechaFin = new Date (document.getElementById("txtFechaFin").value);
  obtenerListadoFacturas(fechaInicio, fechaFin);
}

function obtenerListadoFacturas(fechaInicio, fechaFin) {
  let url = encodeURI("listadoFacturas.html");
  oTienda.listadoFacturas(fechaInicio, fechaFin);
  let ventana = open(url,"_blank");
}


function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	  {
	  xhttp=new XMLHttpRequest();
	  }
	else // code for IE5 and IE6
	  {
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xhttp.open("GET",filename,false);
	
	xhttp.send();
	
	return xhttp.responseXML;
}

function datosIniciales(){
  let productos = xml.getElementsByTagName("producto");
  let contador = 0;
  
  for (const producto of productos) {
    let id = producto.querySelector("id").textContent;
    let nombre = producto.querySelector("nombre").textContent;
    let precio = producto.querySelector("precio").textContent;
    let tipo = producto.querySelector("tipo").textContent;
    if(tipo == "Tabaco"){
      let sabor = producto.querySelector("sabor").textContent;
      oTienda.altaProducto(new Tabaco(id,nombre,precio,sabor));
      tipo="T";
      añadeProducto(id,nombre,tipo);

    }
    if(tipo == "Boquilla"){
      let material = producto.querySelector("material").textContent;
      oTienda.altaProducto(new Boquilla(id,nombre,precio,material));
      tipo="B";
      añadeProducto(id,nombre,tipo);

    }
  }
     
}
