USE `rrhh_db`;
DROP event IF EXISTS `crear_mes_planilla`;

CREATE EVENT crear_mes_planilla
    ON SCHEDULE EVERY '1' MONTH 
    STARTS CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
	DO INSERT INTO planilla(fecha) VALUES (now());


Select (month(fecha)), fecha, sum(costo_salarial)
from permisos
where activo = true
group by costo_salarial
order by month(fecha) asc;