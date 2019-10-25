 
USE `rrhh_db`;
DROP function IF EXISTS `planilla_empleado`;

DELIMITER $$
USE `rrhh_db`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `planilla_empleado`(
	_cedula varchar(9),
    _mes int,
    _anio int
) RETURNS decimal(10,2)
    READS SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE totalHorasExtra decimal(10,2) default 0;
	DECLARE totalPermisos decimal(10,2) default 0;
    DECLARE totalSalario decimal(10,2) default 0;
    DECLARE totalHoras decimal (4.2) default 0;
	DECLARE totalBonos decimal(10,2) default 0;
    DECLARE hora decimal(4.2) default 0;
	DECLARE total decimal(10,2) default 0;
    IF(Select sum(costo_salarial) from permisos
		where activo = true and cedula_empleado = _cedula 
		and year(fecha) = _anio and month(fecha) = _mes) <> 0 THEN
			Set totalPermisos = 
				(Select sum(costo_salarial) 
                from permisos 
                where activo = true 
                and cedula_empleado = _cedula 
                and year(fecha) = _anio 
                and month(fecha) = _mes);           
	end if;
    IF (Select sum(cantidad) from bonos
		where activo = true and cedula_empleado = _cedula 
		and year(fecha) = _anio and month(fecha) = _mes) <> 0 then
			Set totalBonos = (Select sum(cantidad) from bonos
				where activo = true 
                and cedula_empleado = _cedula 
				and year(fecha) = _anio 
                and month(fecha) = _mes);
    end if;
	IF (Select sum(cantidad_horas) from horas_extra
		where activo = true and cedula_empleado = _cedula
		and year(fecha) = _anio and month(fecha) = _mes) <> 0 then
			Set totalHorasExtra = (Select sum(cantidad_horas) from horas_extra
				where activo = true
                and cedula_empleado = _cedula
                and year(fecha) = _anio
                and month(fecha) = _mes);
	end if;
    IF (select sum(salario_hora) from salarios
    where activo = true and cedula_empleado = _cedula) <> 0 then 
		Set totalSalario = (Select sum(salario_hora) from salarios
			where activo = true
			and cedula_empleado = _cedula);
		Set totalHoras = (select sum(jornada_hora) from salarios
			where activo = true
			and cedula_empleado = _cedula);
        Set hora = (select jornada_hora from salarios 
            where activo = true
			and cedula_empleado = _cedula);
    end if;
	set total = (((totalSalario * totalHoras)* 26) + (totalHorasExtra * (hora * 2)) + totalBonos + totalPermisos);
    RETURN total;
END$$

DELIMITER ;
