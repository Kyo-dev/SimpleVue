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
    in _tipo_empleado int,
    in _planilla int,
    in _salario_hora decimal(10,2)
)
begin
	IF NOT EXISTS (select cedula from empleados where cedula = _cedula) THEN
		insert into empleados (cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado, planilla)
        values(_cedula, _nombre, _p_apellido, _s_apellido, _correo, _fecha_contrato, _tipo_empleado, _planilla);
        insert into salarios(cedula_empleado, salario_hora)
        values(_cedula, _salario_hora);
    END IF;
end$$

DELIMITER ;
CALL nuevoEmpleado('802220222','Dora','Gonzales', 'Fuentes', 'd79ora@gmail.com', '2010-09-25', 1, 1, 2000.00);

select * from empleados;
select a.nombre, a.cedula , b.salario_hora as salario
from empleados a
inner join salario b on b.cedula_empleado = a.cedula;

select * from telefonos;

 insert into telefonos(id_empleado, numero, tipo_telefono)
        values(1, '45345', 1);
CREATE EVENT `obtener planillas` 
ON SCHEDULE AT now() + INTERVAL 30 day
DO update tabla
set valido = 0
where
DATE_ADD(fechaCreacion, INTERVAL 45 DAY)<NOW() and valido=1;

DELIMITER ;;
CREATE FUNCTION FIRST_DAY(day DATE)
RETURNS DATE DETERMINISTIC
BEGIN
  RETURN ADDDATE(LAST_DAY(SUBDATE(day, INTERVAL 1 MONTH)), 1);
END;;
DELIMITER ;
SELECT FIRST_DAY('2010-09-25');

