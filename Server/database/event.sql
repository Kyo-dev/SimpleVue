USE `rrhh_db`;
DROP event IF EXISTS `crear_mes_planilla`;

CREATE EVENT crear_mes_planilla
    ON SCHEDULE EVERY '1' MONTH 
    STARTS CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
	DO INSERT INTO planilla(fecha) VALUES (now());
