"use strict";

//Clase Personas
class Persona {
    constructor(dniPersona, nombre, telefono, correo) {
        this._dniPersona = dniPersona;
        this._nombre = nombre;
        this._telefono = telefono;
        this._correo = correo;
    }

    get dniPersona() {
        return this._dniPersona;
    }

    get nombre() {
        return this._nombre;
    }

    get telefono() {
        return this._telefono;
    }

    set dniPersona(dniPersona) {
         this._dniPersona = dniPersona;
    }

    set nombre(nombre) {
         this._nombre = nombre;
    }

    set telefono(telefono) {
         this._telefono = telefono;
    }
    get correo() {
        return this._correo;
    }

    set correo(correo) {
         this._correo = correo;
    }
}

// Clase Cliente
class Cliente extends Persona {
    constructor(dniPersona, nombre, telefono, correo, tarjeta) {
        super(dniPersona, nombre, telefono, correo);
        this.tarjeta = tarjeta;
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.dniPersona },`;
        sFila += `${this.nombre},`;
        sFila += `${this.telefono},`;
        sFila += `${this.correo},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.tarjeta}`;

        return sFila;
    }
}

// Clase Admin
class Admin extends Persona {
    constructor(dniPersona, nombre, telefono, correo, contrasena) {
        super(dniPersona, nombre, telefono, correo);
        this.contrasena = contrasena;
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.dniPersona},`;
        sFila += `${this.nombre},`;
        sFila += `${this.telefono},`;
        sFila += `${this.correo},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.contrasena }`;

        return sFila;
    }
}

//Clase Producto
class Producto {
    constructor(idProducto, nombre, precio) {
        this._idProducto = idProducto;
        this._nombre = nombre;
        this._precio = precio;
    }

    get idProducto() {
        return this._idProducto;
    }

    get nombre() {
        return this._nombre;
    }

    get precio() {
        return this._precio;
    }
}

// Clase Cachimba
class Cachimba extends Producto {
    constructor(idProducto, nombre, precio, mangera, cazoleta, base, purga) {
        super(idProducto, nombre, precio);
        this.mangera = mangera;
        this.cazoleta = cazoleta;
        this.base = base;
        this.purga = purga;

    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idProducto},`;
        sFila += `${this.nombre},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.precio},`;
        sFila += `"Manguera:"${this.mangera},`;
        sFila += `"Cazoleta:"${this.cazoleta},`;
        sFila += `"Base:"${this.base},`;
        sFila += `"Purga:"${this.purga}`;

        return sFila;
    }
}

// Clase Boquilla
class Boquilla extends Producto {
    constructor(idProducto, nombre, precio, material) {
        super(idProducto, nombre, precio);
        this.material = material;
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idProducto},`;
        sFila += `${this.nombre},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.precio},`;
        sFila += `"Material:"${this.material}`;

        return sFila;
    }
}

// Clase Tabaco
class Tabaco extends Producto {
    constructor(idProducto, nombre, precio, sabor) {
        super(idProducto, nombre, precio);
        this.sabor = sabor;
    }
    toHTMLRow() {
        let sFila = "";
        sFila += `${this.idProducto},`;
        sFila += `${this.nombre},`;
        sFila += `${this.constructor.name},`;
        sFila += `${this.precio},`;
        sFila += `"Sabor:"${this.sabor}`;

        return sFila;
    }
}

function Factura(idFactura, dniPersona, productos,preciototal,fecha) {
    this.idFactura = idFactura;
    this.dniPersona = dniPersona;
    this.productos  = productos;
    this.preciototal = preciototal;
    this.fecha = fecha;
    
}
Factura.prototype.toHTMLRow = function () {
    let sFila = "";
    sFila += `${this.idFactura},`;
    sFila += `${this.dniPersona},`;
    sFila += `${this.productos },`;
    sFila += `${this.preciototal},`;
    sFila += `${this.fecha.getDate()}/${(this.fecha.getMonth()+1)}/${this.fecha.getFullYear()}`;

    return sFila;
}

function Tienda() {
    this.personas = [];
    this.facturas = [];
    this.productos = [];
}

Tienda.prototype.altaPersona = function (oPersona) {
    if (this.verificaPersona(oPersona.dniPersona) == true) {
        this.personas.push(oPersona);
        return "Alta Persona OK";
    } else {
        return "Persona registrado previamente";
    }
}

Tienda.prototype.verificaPersona = function (dniPersona) {
    for (const persona of this.personas) {
        if (persona.dniPersona == dniPersona) {
            return false;
        }
    }

    return true;
}

Tienda.prototype.buscaPersona = function (oPersona) {
    let newPersonas = [];
    for (const persona of this.personas) {
        if (persona.dniPersona != oPersona.dniPersona) {
            newPersonas.push(persona);
            
        }
    }
    newPersonas.push(oPersona);
    this.personas = newPersonas;
    return false;
}

Tienda.prototype.modificaPersona = function(oPersona) {
    if(this.buscaPersona(oPersona) == false){
        return "Modificacion Persona OK";
    }else{
        return "Modificacion Persona Fallida";
    }
}

Tienda.prototype.altaFactura = function (oFactura) {

    if (this.compruebaPersona(oFactura.dniPersona) == false) {
        return "Persona no registrada previamente";
    }
    else{
    if (this.verificaFactura(oFactura.idFactura) == true) {
        this.facturas.push(oFactura);
        return "Alta factura OK";
    } else {
        return "Factura registrada previamente";
    }
}
}

Tienda.prototype.verificaFactura = function (idFactura) {
    for (const factura of this.facturas) {
        if (factura.idFactura == idFactura) {
            return false;
        }
    }

    return true;
}

Tienda.prototype.compruebaPersona = function (dniPersona) {
    for (const persona of this.personas) {
        if (persona.dniPersona == dniPersona) {
            return true;
        }
    }

    return false;
}

Tienda.prototype.altaProducto = function (oProducto) {
    if (this.verificaProducto(oProducto.idProducto) == true) {
        this.productos.push(oProducto);
        return "Alta Producto OK";
    } else {
        return "Producto registrada previamente";
    }
}

Tienda.prototype.verificaProducto= function (idProducto) {
    for (const producto of this.productos) {
        if (producto.idProducto == idProducto) {
            return false;
        }
    }

    return true;
}
Tienda.prototype.cogerProducto= function(idProducto){
    for(const producto of this.productos){
        if(producto.idProducto== idProducto){
            return producto;
        }
    }
}
Tienda.prototype.cogerPrecioProducto=function(oProducto){
    return oProducto.precio;
}

Tienda.prototype.cogerPersona = function(dniPersona){

    for (const persona of this.personas) {
        if(persona.dniPersona == dniPersona){
            return persona;
        }
    }
}

Tienda.prototype.listadoProductos = function (){
    let array = [];
    for (const producto of this.productos) {
        array.push(producto.toHTMLRow());
    }
    setCookie('producto', JSON.stringify(array), 100);
}

Tienda.prototype.listadoPersonas = function (){
    let array = [];
    for (const persona of this.personas) {
        array.push(persona.toHTMLRow());
    }
    setCookie('persona', JSON.stringify(array), 100);
}

Tienda.prototype.listadoFacturas = function (fechaInicio, fechaFin){
    let array = [];
    for (const factura of this.facturas) {
        if(factura.fecha > fechaInicio && factura.fecha < fechaFin){
        array.push(factura.toHTMLRow());
        
    }
}
setCookie('factura', JSON.stringify(array), 100);
}