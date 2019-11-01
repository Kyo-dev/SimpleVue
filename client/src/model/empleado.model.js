export default class Empleado {
    constructor(cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado, salario_hora, jornada, numero, tipo_telefono) {
        (this.cedula = cedula),
            (this.nombre = nombre),
            (this.p_apellido = p_apellido),
            (this.s_apellido = s_apellido),
            (this.correo = correo),
            (this.fecha_contrato = fecha_contrato),
            (this.tipo_empleado = tipo_empleado),
            (this.salario_hora = salario_hora),
            (this.jornada = jornada),
            (this.numero = numero),
            (this.tipo_telefono = tipo_telefono)
    }
}