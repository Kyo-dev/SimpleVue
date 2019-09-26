import mysqlConnection from '../database.key'

export async function nuevaTarea(req, res) {
    const {_titulo, _descripcion, _tipo_empleado} = req.body
    const query = `
        SET @_titulo = ?; 
        SET @_descripcion = ?;
        SET @_id_tipo_empleado = ?;
        CALL nuevaTareaCargo(@_titulo, @_descripcion, @_id_tipo_empleado);
    `
    await mysqlConnection.query(query, [_titulo, _descripcion, _tipo_empleado], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({Status: err})
    })
}

export async function todasTareas(req, res) {
    const query = `
        select a.titulo, a.descripcion, c.nombre_cargo
        from tareas a inner join cargo_tareas d on a.id = d.id_tarea
        inner join tipo_empleados c on d.id_tipo_empleado = c.id where a.activo = true;
    `
    await mysqlConnection.query(query, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({Status: err})
    })
}

export async function tareaCargo(req, res) {
    const {_id} = req.params
    const query = `
        select a.titulo, a.descripcion, c.nombre_cargo
        from tareas a inner join cargo_tareas d on a.id = d.id_tarea
        inner join tipo_empleados c on d.id_tipo_empleado = c.id 
        where c.id = ${_id} and a.activo = true;
    `
    await mysqlConnection.query(query, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({Status: err})
    })
}

export async function borrarTarea(req, res) {
    const {_id} = req.params
    const query = `
        SET @_id = ?;
        CALL eliminarTarea(@_id);
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({Status: err})
    })
}

export async function actaulizarTarea(req, res) {
    const {_id, _titulo, _descripcion} = req.body
    const query = `
        SET @_id = ?;
        SET @_titulo = ?;
        SET @_descripcion = ?;
        CALL actualizarTarea(@_id, @_titulo, @_descripcion);
    `
    await mysqlConnection.query(query, [_id, _titulo, _descripcion], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({Status: err})
    })
}