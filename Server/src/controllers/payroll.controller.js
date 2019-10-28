import mysqlConnection from '../database.key'

export async function nominaEmpleado(req, res){
    const {_cedula, _mes, _anio} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_mes = ?;
        SET @_anio = ?;
        SELECT PlanillaBonos(@_cedula, @_mes, @_anio) as bonos,
               planillaHorasExtra(@_cedula, @_mes, @_anio) as 'horas extra',
               planillaPermisos(@_cedula, @_mes, @_anio) as permisos,
               planillaSalario(@_cedula, @_mes, @_anio) as dia,
               planillaEmpleado(@_cedula, @_mes, @_anio) as pago;
    `
    await mysqlConnection.query('SELECT cedula FROM empleados WHERE cedula = ? ', [_cedula], (err, rows, fields)=>{
        if (!err && rows.length > 0) {
            mysqlConnection.query(query, [_cedula, _mes, _anio], (err, rows, fields)=>{
                !err ? res.json(rows[3]) : res.json({Status: err})
            })
        } else {
            res.json({Status: err})
        }
    })
}