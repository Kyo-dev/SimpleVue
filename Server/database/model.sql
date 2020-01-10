create database rrhh_db;
use rrhh_db;
SET GLOBAL event_scheduler = ON;

create table farmacia (
	id tinyint auto_increment,
    nombre varchar(50) not null,
    hora_apertura varchar (10) not null,
    hora_cierre varchar(10) not null,
    ccss_sem decimal(6,2) not null,
    ccss_ivm decimal(6,2) not null,
    lpt_aportepbp decimal(6,2) not null,
    lpt_fondo_laboral decimal(6,2) not null,
    lpt_fondo_pensiones decimal(6,2) not null,
    lpt_aportetbp decimal(6,2) not null,
    ins decimal(6.2) not null,
    activo boolean default true not null,
    constraint pk_farmacia primary key(id)
    
);
create table tipo_empleados(
	id tinyint auto_increment not null,
    nombre_cargo varchar(50) not null,
    activo boolean default true,
    constraint pk_tipo_empleado primary key(id)
);
create table empleados(
	cedula varchar(50) not null, 
    nombre varchar(50) not null,
    p_apellido varchar(50) not null,
    s_apellido varchar(50) not null,
    correo varchar(200) unique not null,
    fecha_contrato datetime default now() not null,
    tipo_empleado tinyint,
    fecha_nacimiento datetime not null,
    direccion varchar(300) not null,
    farmacia tinyint not null,
    activo boolean default true not null,
    constraint fk_empleados_tipo_empleado foreign key (tipo_empleado) references tipo_empleados(id),
    constraint fk_farmacia foreign key(farmacia) references farmacia(id),
    constraint pk_empleados primary key (cedula)
);

create table despidos(
    id int auto_increment not null,
    cedula varchar(9) not null,
    descripcion varchar(300),
    fecha_despido datetime default now() not null,
    activo boolean default true,
    constraint fk_despidos_empleados foreign key (cedula) references empleados(cedula),
    constraint pk_despidos primary key(id)
);
create table adm (
	id tinyint auto_increment,
	correo varchar(200) unique not null,
    clave varchar(400) not null,
    fecha datetime default now() not null,
    activo boolean default true,
    constraint fk_adm_empleados foreign key(correo) references empleados(correo),
    constraint pk_admi primary key (id)
);
create table tipo_telefonos(
	id tinyint auto_increment,
    nombre varchar(100) not null,
    constraint pk_tipo_telefonos primary key(id)
);
create table telefonos(
	id int auto_increment,
    numero varchar(8) unique not null,
    cedula varchar(50) not null,
    tipo_telefono tinyint not null,
    activo boolean default true,
    constraint fk_telefonos_tipo_telefono foreign key(tipo_telefono) references tipo_telefonos(id),
    constraint fk_telefonos_empleados foreign key(cedula) references empleados(cedula),
    constraint pk_telefonos primary key (id)
);
create table tareas(
	id int auto_increment not null,
    titulo varchar(50) not null,
    descripcion varchar(300) not null,
    activo boolean default true,
    constraint pk_tareas primary key (id)
);
create table cargo_tareas(
	id_tipo_empleado tinyint not null,
    id_tarea int not null,
    constraint fk_cargo_tareas_tipo_empleado foreign key(id_tipo_empleado) references tipo_empleados(id),
    constraint fk_cargo_tareas_tareas foreign key(id_tarea) references tareas(id),
    constraint pk_cargo_tareas primary key (id_tipo_empleado, id_tarea)
);
create table permisos(
	id int auto_increment,
    cedula varchar(50) not null,
    descripcion varchar(300) not null,
    costo_salarial decimal(10,2) not null,
    fecha datetime not null,
    activo boolean default true not null,
    constraint fk_permisos_empleados foreign key(cedula) references empleados(cedula),
    constraint ch_costo_salarial check (costo_salarial <= 0),
    constraint pk_permisos primary key(id)
);
create table registro_disciplinario(
	id int auto_increment,
    cedula varchar(50) not null,
    descripcion varchar(300) not null,
    fecha datetime default now() not null,
    activo boolean default true not null,
    constraint fk_registro_disciplinario_empleados foreign key(cedula) references empleados(cedula),
    constraint pk_registro_disciplinario primary key(id)
);
create table horas_extra(
	id int auto_increment,
    cedula varchar(9) not null,
    cantidad_horas tinyint not null,
    motivo varchar(300) not null,
    fecha datetime default now() not null, 
    activo boolean default true not null,
    constraint fk_horas_extra_empleados foreign key(cedula) references empleados(cedula),
    constraint pk_horas_extra primary key(id)
);
create table salarios(
	id int auto_increment,
    cedula varchar(50) not null,
	salario_hora decimal(10,2) not null,
    jornada decimal(4.2) not null,
    retencion decimal(10,2) default 0 not null,
    activo boolean default true not null,
	constraint fk_salario_empleados foreign key(cedula) references empleados(cedula),
    constraint ch_salario_hora check(salario_hora >= 0),
    constraint ch_jornada check(jornada >= 0),
    constraint pk_salario primary key(id)
);
create table aumento_salarial(
	id int auto_increment,
    cedula varchar(50) not null,
    fecha datetime default now() not null,
    cantidad decimal(10,2) not null,
    activo boolean default true not null,
    constraint fk_aumentos_empleados foreign key(cedula) references empleados(cedula),
    constraint ch_aumento_salarial check(cantidad >= 0),
    constraint pk_aumento_salarial primary key(id)
);
create table bonos(
	id int auto_increment,
    cedula varchar(50) not null,
    motivo varchar(200) not null,
    cantidad decimal(10,2) not null,
    fecha datetime not null, 
    activo boolean default true not null,
    constraint fk_bonos_empleados foreign key(cedula) references empleados(cedula),
    constraint ch_bonos check (cantidad >= 0),
    constraint pk_bonos primary key(id)
);
create table dias_disponibles(
    id int auto_increment,
    cedula varchar(50) not null ,
    cantidad_dias_disponibles tinyint not null,
    activo boolean default true not null,
    constraint fk_dias_vacacionales foreign key(cedula) references empleados(cedula),
    constraint pk_dias_disponibles primary key(id)
    
);
create table fechas_vacaciones(
	id int auto_increment,
    cedula varchar(50) not null ,
    fecha_salida date not null,
    fecha_entrada date not null,
    activo boolean default true not null,
    constraint pk_vacaciones primary key(id),
    constraint fk_vacaciones foreign key(cedula) references empleados(cedula)
);