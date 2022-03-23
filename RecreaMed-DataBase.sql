
-- ----------------------------
-- Table structure for doctores
-- ----------------------------
DROP TABLE IF EXISTS `doctores`;
CREATE TABLE `doctores`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_sucursal` int(11) NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellido_paterno` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellido_materno` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cedula` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `calle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `numero` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `colonia` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `delete` int(11) NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for expedientes
-- ----------------------------
DROP TABLE IF EXISTS `expedientes`; 
CREATE TABLE `expedientes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `medico_id` int(11) NULL DEFAULT NULL,/* 1-N */
  `paciente_id` int(11) NULL DEFAULT NULL,
  `sucursal_id` int(11) NULL DEFAULT NULL,
  `created_at` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `updated_at` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `historia_clinica` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `inv_tipo_accion`;
CREATE TABLE `inv_tipo_accion`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `lista_estados`;
CREATE TABLE `lista_estados`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for pacientes_citas
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_citas`;
CREATE TABLE `pacientes_citas`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `fecha` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hora` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `comentarios` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for pacientes_general
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_general`;
CREATE TABLE `pacientes_general`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_usuario_refirio` int(11) NOT NULL,
  `referido` int(11) NOT NULL,
  `no_expediente` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nombre` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fecha_nacimiento` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sexo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `seguro_popular` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `curp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `calle_numero` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `colonia` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `municipio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `estado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pais` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `telefono` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `correo_electronico` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ocupacion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `escolaridad` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `entidad_nacimiento` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `id_original` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pacientes_historial_clinica
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_historial_clinica`;
campo de texto abierto


-- ----------------------------
-- Table structure for pacientes_nota
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_nota`; /*TAked every  meet*/
CREATE TABLE `pacientes_nota`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `no_expediente` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `edad_paciente` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `talla` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `peso` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `imc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `temperatura` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `presion_arterial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `frecuencia_cardiaca` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `frecuencia_respiratoria` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tension_arterial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `glucosa_ayunas` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `glucosa_post_prantial` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `motivo` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `exploracion` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `diagnosticos` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `fecha_nota` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `edited` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for pacientes_recetas
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_recetas`;
CREATE TABLE `pacientes_recetas`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_nota` int(11) NOT NULL,
  `fecha` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `prescripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'Administrador', 'Perfil administrador total, favor de manejar con mucho cuidado.', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `roles` VALUES (2, 'Medico', 'Perfil medico.', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `roles` VALUES (3, 'Recepcionista', 'Perfil Recepcionista.', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for sucursales
-- ----------------------------
DROP TABLE IF EXISTS `sucursales`;
CREATE TABLE `sucursales`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `rfc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `calle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num_interior` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num_exterior` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `colonia` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `codigo_postal` int(11) NULL DEFAULT NULL,
  `ciudad_municipio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sitio_web` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `estatus` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `delete` int(11) NULL DEFAULT NULL,
  `no_expediente` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 52 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_sucursal` int(11) NOT NULL,
  `id_medicoasignado` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cedula` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numinterior` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numexterior` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `calle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `colonia` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `municipio` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `estado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `codigopostal` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `estatus` int(11) NOT NULL DEFAULT 0,
  `certificacion` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `universidad` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 66 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;