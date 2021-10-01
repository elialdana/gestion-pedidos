-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2021 at 11:38 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taller_charros`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) NOT NULL COMMENT 'identificador unico',
  `dpi` varchar(13) DEFAULT NULL,
  `nit` varchar(13) DEFAULT NULL COMMENT 'nit del cliente si requiere factura',
  `nombre` varchar(80) NOT NULL COMMENT 'nombre del cliente',
  `domicilio` varchar(120) DEFAULT NULL COMMENT 'direccion para envio del pedido',
  `telefono_uno` varchar(15) NOT NULL COMMENT 'telefono de contacto',
  `telefono_dos` varchar(15) DEFAULT NULL COMMENT 'telefono adicional al que puedan llamar',
  `correo_electronico` varchar(100) DEFAULT NULL COMMENT 'correo electronico para notificaciones'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla para guardar el nuevo cliente';




-- --------------------------------------------------------

--
-- Table structure for table `detalle_pedido_cliente`
--

CREATE TABLE `detalle_pedido_cliente` (
  `id` bigint(20) NOT NULL COMMENT 'idenfiticador unico',
  `pedido_id` bigint(20) NOT NULL COMMENT 'encabezado del pedido',
  `producto_id` bigint(20) NOT NULL COMMENT 'producto solicitado',
  `comentario` varchar(100) DEFAULT NULL COMMENT 'comentario de cosas extras que solicite el cliente',
  `costo_adicional` decimal(15,4) DEFAULT '0.0000' COMMENT 'si incluye algun costo adicional el producto que no fue esperado',
  `costo_instalacion` decimal(15,4) DEFAULT '0.0000' COMMENT 'costo de instalacion',
  `descuento` decimal(10,4) DEFAULT '0.0000' COMMENT 'descuento que se incluya al producto',
  `cantidad` decimal(10,0) DEFAULT NULL,
  `monto` decimal(15,4) DEFAULT '0.0000' COMMENT 'precio final del producto',
  `necesita_materiales` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla para guardar el producto solicitado';



-- --------------------------------------------------------

--
-- Table structure for table `materiales`
--

CREATE TABLE `materiales` (
  `id` bigint(20) NOT NULL COMMENT 'identificador unico',
  `codigo` varchar(20) DEFAULT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `proveedor_id` bigint(20) DEFAULT NULL,
  `precio_venta` decimal(15,4) DEFAULT NULL COMMENT 'total por material utilizado',
  `precio_compra` decimal(15,4) DEFAULT NULL,
  `stock` decimal(15,4) DEFAULT NULL,
  `telefono_notificacion` varchar(13) DEFAULT NULL,
  `email_notificacion` varchar(100) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT NULL,
  `estado` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='materiales de la fabricacion';

-- --------------------------------------------------------

--
-- Table structure for table `materiales_utilizados`
--

CREATE TABLE `materiales_utilizados` (
  `detalle_pedido_id` bigint(20) DEFAULT NULL,
  `material_id` bigint(20) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `unidad_medida` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `materiales_utilizados`
--

-- --------------------------------------------------------

--
-- Table structure for table `pagos`
--

CREATE TABLE `pagos` (
  `id` bigint(20) NOT NULL,
  `pedido_id` bigint(20) DEFAULT NULL,
  `abono` decimal(15,4) DEFAULT NULL,
  `fecha_abono` date DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id` bigint(20) NOT NULL COMMENT 'identificador unico',
  `cliente_id` bigint(20) DEFAULT NULL,
  `comentario` varchar(200) DEFAULT NULL COMMENT 'comentario extra sobre el pedido, por ejemplo si el cliente quiere un detalle en especial ',
  `estado` char(3) DEFAULT NULL COMMENT 'estado para saber en que fase se encuentra el pedido',
  `total` decimal(15,4) NOT NULL DEFAULT '0.0000' COMMENT 'total a pagar',
  `total_pagado` decimal(10,4) DEFAULT NULL,
  `total_pendiente` decimal(10,4) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT NULL COMMENT 'fecha que se ingreso el pedido',
  `fecha_entrega` datetime DEFAULT NULL COMMENT 'fecha de entrega del pedido',
  `fecha_modificacion` datetime DEFAULT NULL COMMENT 'fecha de modificacion del registro',
  `usuario_registro` varchar(20) DEFAULT NULL COMMENT 'usuario que modifico el registro',
  `usuario_modifica` varchar(20) DEFAULT NULL COMMENT 'usuario que realizo la ultima modificacion',
  `direccion` varchar(100) DEFAULT NULL COMMENT 'direccion en donde se instalara el pedido',
  `usuario_asignado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `pedidos_bitacora` (
  `id` bigint(20) NOT NULL COMMENT 'identificador unico',
  `cliente_id` bigint(20) DEFAULT NULL,
  `comentario` varchar(200) DEFAULT NULL COMMENT 'comentario extra sobre el pedido, por ejemplo si el cliente quiere un detalle en especial ',
  `estado` char(3) DEFAULT NULL COMMENT 'estado para saber en que fase se encuentra el pedido',
  `total` decimal(15,4) NOT NULL DEFAULT '0.0000' COMMENT 'total a pagar',
  `total_pagado` decimal(10,4) DEFAULT NULL,
  `total_pendiente` decimal(10,4) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT NULL COMMENT 'fecha que se ingreso el pedido',
  `fecha_entrega` datetime DEFAULT NULL COMMENT 'fecha de entrega del pedido',
  `fecha_modificacion` datetime DEFAULT NULL COMMENT 'fecha de modificacion del registro',
  `usuario_registro` varchar(20) DEFAULT NULL COMMENT 'usuario que modifico el registro',
  `usuario_modifica` varchar(20) DEFAULT NULL COMMENT 'usuario que realizo la ultima modificacion',
  `direccion` varchar(100) DEFAULT NULL COMMENT 'direccion en donde se instalara el pedido',
  `usuario_asignado` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dumping data for table `pedidos`
--


-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL COMMENT 'identificador unico',
  `codigo` varchar(20) NOT NULL COMMENT 'codigo del producto',
  `nombre` varchar(80) NOT NULL COMMENT 'nombre del producto que vende la empresa',
  `descripcion` varchar(150) DEFAULT NULL COMMENT 'en este campo puede ir una descripcion de las caracteristicas que tiene el producto',
  `estado` char(2) DEFAULT NULL COMMENT 'estado del producto activo/inactivo',
  `calcular_precio` char(1) DEFAULT NULL,
  `precio_predeterminado` decimal(10,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='productos que maneja la empresa';


-- --------------------------------------------------------

--
-- Table structure for table `proveedores`
--

CREATE TABLE `proveedores` (
  `id` bigint(20) NOT NULL COMMENT 'identificador unico',
  `nombre` varchar(80) NOT NULL COMMENT 'nombre de la empresa',
  `telefono` varchar(15) DEFAULT NULL,
  `correo_electronico` varchar(150) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL COMMENT 'direccion del proveedor',
  `descripcion` varchar(100) DEFAULT NULL COMMENT 'descripcion para explicar que provee esa empresa'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla para guardar los proveedores de materiales de la empresa';


-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario` varchar(15) NOT NULL COMMENT 'nombre de usuario ',
  `dpi` varchar(13) DEFAULT NULL,
  `password` text COMMENT 'contraseña',
  `nombre` varchar(80) DEFAULT NULL COMMENT 'nombre de usuario',
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(13) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `perfil` text COMMENT 'perfil del usuario',
  `foto` text COMMENT 'foto del  usuario',
  `estado` char(1) NOT NULL DEFAULT 'A' COMMENT 'estado del usuario   activo / inactivo',
  `ultimo_login` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'ultimo ingreso del usuario',
  `fecha_registro` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'fecha de registro del usuario'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla de usuarios del sistema';

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `dpi`, `password`, `nombre`, `direccion`, `telefono`, `email`, `perfil`, `foto`, `estado`, `ultimo_login`, `fecha_registro`) VALUES
('admin', '123', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', 'admin', 'guastatoya', '', '', 'ADMIN', '', 'A', '2021-09-21 15:13:57', '2021-09-21 15:13:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_clientes_id` (`id`),
  ADD UNIQUE KEY `uq_clientes_nombre` (`nombre`);

--
-- Indexes for table `detalle_pedido_cliente`
--
ALTER TABLE `detalle_pedido_cliente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_detalle_pedido_pedido` (`pedido_id`),
  ADD KEY `fk_detalle_pedido_productos` (`producto_id`);

--
-- Indexes for table `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_materiales_fabricacion_id` (`id`),
  ADD KEY `proveedor_id` (`proveedor_id`);

--
-- Indexes for table `materiales_utilizados`
--
ALTER TABLE `materiales_utilizados`
  ADD KEY `detalle_pedido_id` (`detalle_pedido_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indexes for table `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pagos_pedido_pedido_cliente` (`pedido_id`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_pedido_id` (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_productos_codigo` (`codigo`),
  ADD UNIQUE KEY `uq_productos_id` (`id`),
  ADD KEY `uq_productos_nombre` (`nombre`) USING BTREE;

--
-- Indexes for table `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_proveedores_id` (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `detalle_pedido_cliente`
--
ALTER TABLE `detalle_pedido_cliente`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'idenfiticador unico', AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `materiales`
--
ALTER TABLE `materiales`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico', AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'identificador unico', AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detalle_pedido_cliente`
--
ALTER TABLE `detalle_pedido_cliente`
  ADD CONSTRAINT `fk_detalle_pedido_pedido` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `fk_detalle_pedido_productos` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Constraints for table `materiales`
--
ALTER TABLE `materiales`
  ADD CONSTRAINT `fk_materiales_proveedores` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedores` (`id`);

--
-- Constraints for table `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_pagos_pedido_pedido_cliente` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`);

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedido_clientes` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Disparadores `materiales_utilizados`
--
DELIMITER $$
CREATE TRIGGER `actualiza_stock` BEFORE INSERT ON `materiales_utilizados` FOR EACH ROW update materiales m set m.stock=m.stock- new.cantidad where m.id=new.material_id
$$
DELIMITER ;

--
-- Disparadores `pagos`
--
DELIMITER $$
CREATE TRIGGER `actualiza_total_pagado` BEFORE INSERT ON `pagos` FOR EACH ROW update pedidos p set p.total_pagado= p.total_pagado + NEW.abono  where p.id=new.pedido_id
$$
DELIMITER ;

--
-- Disparadores `pedidos`
--
DELIMITER $$
CREATE TRIGGER `actualiza_total_pendiente` BEFORE UPDATE ON `pedidos` FOR EACH ROW update pedidos p set p.total_pendiente=p.total- p.total_pagado  where p.id=new.id
$$
DELIMITER ;


GT73BRRL01020000004005097255
GT73BRRL01020000004005097255