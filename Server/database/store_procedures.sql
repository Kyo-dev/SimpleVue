USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoEmpleado`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevoEmpleado`(
	in _cedula varchar(9),
    in _nombre varchar(50),
    in _p_apellido varchar(50),
    in _s_apellido varchar(50),
    in _correo varchar(200),
    in _fecha_contrato datetime,
    in _tipo_empleado tinyint,
    in _salario_hora decimal(10,2),
    in _jornada decimal(4.2), 
    in _numero varchar(8),
    in _tipo_telefono tinyint,
    in _farmacia tinyint,
    in _direccion varchar(300),
    in _fecha_nacimiento datetime,
    in _permanente boolean
)
begin
	IF NOT EXISTS (select cedula from empleados where cedula = _cedula) THEN
		select @auxCorreo:=  lower(_correo);
		insert into empleados (cedula, nombre, p_apellido, s_apellido,  correo, fecha_contrato, tipo_empleado, farmacia, direccion, fecha_nacimiento, permanente)
        values(_cedula, _nombre, _p_apellido, _s_apellido, @auxCorreo, _fecha_contrato, _tipo_empleado, _farmacia, _direccion, _fecha_nacimiento, _permanente);
        insert into salarios(cedula, salario_hora, jornada)
        values(_cedula, _salario_hora, _jornada);
        insert into telefonos(numero, tipo_telefono, cedula)
        values(_numero, _tipo_telefono, _cedula);
    END IF;
end$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoPermiso`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevoPermiso` (
	in _cedula varchar(9),
    in _fecha datetime,
    in _descripcion varchar(300),
    in _costoSalarial decimal(10,2)
)
BEGIN
	IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
		insert into permisos(cedula, fecha, descripcion, costo_salarial)
        values(_cedula, _fecha, _descripcion, _costoSalarial);
    end if;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoAumento`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevoAumento`(
	in _cedula varchar(9),
    in _fecha datetime,
    in _cantidad decimal(10,2)
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
		insert into aumento_salarial(cedula, fecha, cantidad)
        values(_cedula, _fecha, _cantidad);
        update salarios
        set salario_hora = salario_hora + _cantidad
        where cedula = _cedula;
    end if;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoRegistroDisciplinario`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevoRegistroDisciplinario` (
	in _cedula varchar(9),
    in _fecha datetime,
    in _descripcion varchar(300)
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
		insert into registro_disciplinario(cedula, fecha, descripcion)
        values(_cedula, _fecha, _descripcion);
    end if;
END$$
DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoBono`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevoBono` (
	in _cedula varchar(9),
    in _motivo varchar(200),
    in _cantidad decimal (10.2),
    in _fecha datetime
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
		insert into bonos(cedula, motivo, cantidad, fecha)
        values(_cedula, _motivo, _cantidad, _fecha);
    end if;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `nuevaTareaCargo`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevaTareaCargo` (
	in _titulo varchar(30),
    in _descripcion varchar(300),
    in _id_tipo_empleado tinyint
)
BEGIN
	insert into tareas(titulo, descripcion)
    values (_titulo, _descripcion);
    set @idTarea = last_insert_id();
    insert into cargo_tareas(id_tipo_empleado, id_tarea)
    values(_id_tipo_empleado, @idTarea);
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoAdm`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevoAdm`(
	in _correo varchar(200),
    in _clave text,
    in _fecha datetime
)
BEGIN
if (SELECT cedula FROM empleados WHERE correo = _correo AND activo = true and tipo_empleado = 1) then
	insert into adm(correo, clave, fecha)
    values(_correo, _clave, _fecha);
end if;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `nuevaHoraExtra`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevaHoraExtra` (
	in _cedula varchar(9),
    in _cantidad_horas tinyint,
    in _motivo varchar(300),
    in _fecha datetime
)
BEGIN
if (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
	insert into horas_extra(cedula, cantidad_horas, motivo, fecha)
    values(_cedula, _cantidad_horas, _motivo, _fecha);
end if;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarPermiso`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarPermiso` (
	in _id integer,
    in _fecha datetime,
    in _descripcion varchar(300),
    in _costoSalarial decimal(10,2)
)
BEGIN
	update permisos
	set descripcion = _descripcion,
		costo_salarial = _costoSalarial,
        fecha = _fecha
	where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarBono`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarBono` (
	in _id integer,
    in _motivo varchar(200),
    in _cantidad decimal (10.2),
    in _fecha datetime
)
BEGIN
	update bonos
	set motivo = _motivo,
		cantidad = _cantidad,
        fecha = _fecha
	where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarBono`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarBono` (
	in _id integer
)
BEGIN
	update bonos
    set activo = false
    where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarRegistroDisciplinario`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarRegistroDisciplinario` (
	in _id integer,
	in _cedula varchar(9),
    in _fecha datetime,
    in _descripcion varchar(300)
)
BEGIN
	update registro_disciplinario
	set cedula = _cedula,
        fecha = _fecha,
        descripcion = _descripcion
	where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarRegistroDisciplinario`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarRegistroDisciplinario` (
	in _id integer
)
BEGIN
	update registro_disciplinario
    set activo = false
    where id = _id;    
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarAumento`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarAumento` (
	in _id integer,
	in _cedula varchar(9),
    in _aumento_salarial decimal(10,2)
)
BEGIN
update aumento_salarial
	set cedula = _cedula,
        cantidad = _cantidad
	where id = _id;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarTarea`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarTarea` (
	in _id integer
)
BEGIN
	update tareas
    set activo = false
    where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarTarea`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarTarea`(
	in _id integer,
	in _titulo varchar(30),
    in _descripcion varchar(300),
    in _id_tipo_empleado integer
)
BEGIN
	UPDATE tareas
    SET titulo = _titulo,
		descripcion = _descripcion
    WHERE id = _id;
    UPDATE cargo_tareas
    SET  id_tipo_empleado = _id_tipo_empleado
    WHERE id_tarea = _id;    
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarPermiso`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarPermiso` (
	in _id integer
)
BEGIN
	update permisos
    set activo = false
    where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `nuevasVacaciones`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevasVacaciones` (
	in _cedula varchar(9),
    in _fecha_salida datetime,
    in _fecha_entrada datetime
)
BEGIN
	IF(select cedula from empleados where cedula = _cedula and activo = true) THEN
		select @cantidad := cantidad_dias_disponibles from dias_disponibles where cedula = _cedula;
		set @aux =  DATEDIFF(_fecha_salida, _fecha_entrada);
		IF (@cantidad >= @aux ) THEN
			insert into fechas_vacaciones (cedula, fecha_salida, fecha_entrada)
			values (_cedula, _fecha_salida, _fecha_entrada);
            UPDATE dias_disponibles 
            SET cantidad_dias_disponibles = cantidad_dias_disponibles - @aux
            WHERE cedula = _cedula;
		else
			select "No tiene tantos dias diponibles para vacacionar" as mensaje;
        end if;
    end if; 
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarVacaciones`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarVacaciones` (
	in _id integer
)
BEGIN
	update vacaciones
    set activo = false
    where id = _id;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarVacaciones`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarVacaciones` (
	in _id integer,
    in _cedula varchar(9),
    in _fecha_salida datetime,
    in _fecha_entrada datetime
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
	update vacaciones
    set  fecha_salida = _fecha_salida,
		 fecha_entrada = _fecha_entrada
    where id = _id;
end if;
END$$

DELIMITER ;




USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarAumento`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarAumento` (
	in _id integer,
    in _cedula varchar(9)
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
	select @cantAumento := cantidad from aumento_salarial where id = _id;
    update salarios
    set salario_hora = salario_hora - @cantAumento
    where cedula = _cedula;
	update aumento_salarial
    set activo = false
    where id = _id;
      end if;
END$$

DELIMITER ;



USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoDespido`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `nuevoDespido` (
	in _cedula varchar(9),
    in _descripcion varchar(300)
)
BEGIN
	IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
		insert into despidos(cedula, descripcion)
        values (_cedula, _descripcion);
		update empleados
        set activo = false
        where cedula = _cedula;
    end if;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarEmpleado`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarEmpleado` (
	in _cedula varchar(9),
    in _nombre varchar(50),
    in _p_apellido varchar(50),
    in _s_apellido varchar(50),
    in _correo varchar(200),
    in _fecha_contrato datetime,
    in _tipo_empleado int,
    in _salario_hora decimal(10,2),
    in _jornada decimal(4.2),
    in _numero varchar(8),
    in _tipo_telefono tinyint
)
BEGIN
	IF (SELECT cedula FROM empleados WHERE cedula = _cedula) then
		update empleados
        set 
			nombre = _nombre,
			p_apellido =_p_apellido,
			s_apellido = _s_apellido,
			correo = _correo,
			fecha_contrato = _fecha_contrato,
			tipo_empleado = _tipo_empleado
        where cedula = _cedula;
        update salarios 
        set 
            salario_hora = _salario_hora,
            jornada = _jornada
        where cedula = _cedula;
        update telefonos
        set numero = _numero
        where cedula = _cedula;
	end if;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarHoraExtra`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarHoraExtra`(
	in _id integer
)
BEGIN
	update horas_extra
    set activo = false
    where id = _id;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarHorasExtra`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarHorasExtra` (
	in _id integer,
	in _cedula varchar(9),
    in _cantidad_horas tinyint,
    in _motivo varchar(300),
    in _fecha datetime
)
BEGIN
	update horas_extra
    set
		cedula = _cedula,
        cantidad_horas = _cantidad_horas,
        motivo = _motivo,
        fecha = _fecha
    where id = _id;
END$$

DELIMITER ;

USE `rrhh_db`;
DROP procedure IF EXISTS `eliminarTareaCargo`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `eliminarTareaCargo` (
	in _id integer
)
BEGIN
	update tareas
    set activo = false
    where id = _id;
END$$

DELIMITER ;


USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarTareaCargo`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarTareaCargo` (
	in _id integer,
	in _titulo varchar(30),
    in _descripcion varchar(300)
)
BEGIN
	update tareas
    set 
		titulo = _titulo,
        descripcion = _descripcion
    where id = _id;
END$$

DELIMITER ;



USE `rrhh_db`;
DROP procedure IF EXISTS `nuevoRetencion`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `nuevoRetencion`(
	in _cedula varchar(9),
    in _fecha datetime,
    in _retencion decimal(10,2),
    in _descripcion varchar(300)
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
	select @auxSalario:= ((salario_hora * jornada)*26) as salario from salarios where cedula = _cedula;
    select @contadorRetenciones:= sum(retencion) from retencion_salarial where cedula = _cedula;
    IF (@contadorRetenciones > 0) THEN
		IF (@auxSalario > _retencion) THEN
			IF(@auxSalario > (@contadorRetenciones + _retencion)) THEN
				INSERT INTO retencion_salarial(cedula, retencion, fecha, descripcion)
				VALUES(_cedula, _retencion, _fecha, _descripcion);
			ELSE 	
				SELECT 'El salario no es suficiente para pagar las retenciones del trabajador.' as mensaje;
            END IF;
		ELSE
			SELECT 'La retención no puede exceder el salario del trabajador' as mensaje;
        END IF;
    END IF;
		IF (@auxSalario > _retencion) THEN
			IF(@auxSalario > (@contadorRetenciones + _retencion)) THEN
				INSERT INTO retencion_salarial(cedula, retencion, fecha, descripcion)
				VALUES(_cedula, _retencion, _fecha, _descripcion);
			ELSE 	
				SELECT 'El salario no es suficiente para pagar las retenciones del trabajador.' as mensaje;
            END IF;
		ELSE
			SELECT 'La retención no puede exceder el salario del trabajador' as mensaje;
        END IF;
		ELSE
        IF (@auxSalario > _retencion) THEN
			INSERT INTO retencion_salarial(cedula, retencion, fecha, descripcion)
			VALUES(_cedula, _retencion, _fecha, _descripcion);
		ELSE
			SELECT 'La retención no puede exceder el salario del trabajador' as mensaje;
        END IF;
    END IF;
END$$

DELIMITER ;



USE `rrhh_db`;
DROP procedure IF EXISTS `actualizarRetencion`;

DELIMITER $$
USE `rrhh_db`$$
CREATE PROCEDURE `actualizarRetencion` (
	in _id integer,
	in _cedula varchar(9),
    in _fecha datetime,
    in _retencion decimal(10,2),
	in _descripcion varchar(300)
)
BEGIN
IF (SELECT cedula FROM empleados WHERE cedula = _cedula AND activo = true) then
	select @auxSalario:= ((salario_hora * jornada)*26) as salario from salarios where cedula = _cedula;
    SET @auxRetencion = 0;
    select @contadorRetenciones:= sum(retencion) as retencion from retencion_salarial where cedula = _cedula;
    IF (@contadorRetenciones > 0) THEN
		set @auxRetencion = @auxRetencion + @contadorRetencines;
    END IF;
    IF (@auxSalario > _retencion) THEN
		IF(@auxSalario > @contadorRetenciones) THEN
			IF(select activo from retencion_salarial where id = _id and activo = true) THEN
				update retencion_salarial
				set cedula = _cedula,
				retencion = _retencion,
				descripcion =_descripcion,
				fecha = _fecha
				where id = _id;
			END IF;
        ELSE
			SELECT 'El salario no es suficiente para pagar las retenciones del trabajador.' as mensaje;
        END IF;
        ELSE
        SELECT 'La retención no puede exceder el salario del trabajador' as mensaje;
    END IF;
    ELSE
	SELECT 'El usuario no existe' as mensaje;
END IF;
END$$

DELIMITER ;