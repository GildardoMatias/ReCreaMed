/*
 Navicat Premium Data Transfer

 Source Server         : Droplet re-crea.com
 Source Server Type    : MySQL
 Source Server Version : 50734
 Source Host           : 165.227.197.152:3306
 Source Schema         : medicalAccess

 Target Server Type    : MySQL
 Target Server Version : 50734
 File Encoding         : 65001

 Date: 01/06/2021 09:47:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  `medico_id` int(11) NULL DEFAULT NULL,
  `paciente_id` int(11) NULL DEFAULT NULL,
  `sucursal_id` int(11) NULL DEFAULT NULL,
  `created_at` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `updated_at` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `historia_clinica` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of expedientes
-- ----------------------------
INSERT INTO `expedientes` VALUES (1, 31, 1, 30, '2019-05-02 02:45:06', '2019-05-02 02:45:06', 'El paciente cuenta con excelente estado de sa');
INSERT INTO `expedientes` VALUES (2, 60, 3, 0, '2019-08-29 14:22:45', '2019-08-29 14:22:45', 'bien.\r\nsano.\r\nmalo.');
INSERT INTO `expedientes` VALUES (3, 60, 4, 0, '2019-09-12 08:18:25', '2019-09-12 08:18:25', '-');
INSERT INTO `expedientes` VALUES (4, 60, 5, 0, '2019-09-12 12:04:45', '2019-09-12 12:04:45', 'iniciamos tratamiento de  rintis  alergica  y');
INSERT INTO `expedientes` VALUES (5, 60, 6, 0, '2019-09-12 12:24:58', '2019-09-12 12:24:58', 'APARENTEMENTE PARECIA HIPERTIROIDISMO ESTUDIO');
INSERT INTO `expedientes` VALUES (6, 60, 7, 0, '2019-09-13 12:08:55', '2019-09-13 12:08:55', 'sangrado disfuncional, le aplicamos  suprapub');
INSERT INTO `expedientes` VALUES (7, 60, 8, 0, '2019-09-13 17:25:02', '2019-09-13 17:25:02', 'DOLOR ARTICULAR');
INSERT INTO `expedientes` VALUES (8, 60, 9, 0, '2019-09-13 17:40:09', '2019-09-13 17:40:09', 'MULTIPLES');
INSERT INTO `expedientes` VALUES (9, 60, 10, 0, '2019-09-13 18:19:02', '2019-09-13 18:19:02', 'paralisis fascial y colitis');
INSERT INTO `expedientes` VALUES (10, 60, 11, 0, '2019-09-14 11:28:05', '2019-09-14 11:28:05', 'DEPRESION ANSIEDAD');
INSERT INTO `expedientes` VALUES (11, 60, 12, 0, '2019-09-17 19:27:56', '2019-09-17 19:27:56', 'DIABETES , ');
INSERT INTO `expedientes` VALUES (12, 60, 13, 0, '2019-09-18 17:35:42', '2019-09-18 17:35:42', 'artrosis bacteriana ');

-- ----------------------------
-- Table structure for inv_tipo_accion
-- ----------------------------
DROP TABLE IF EXISTS `inv_tipo_accion`;
CREATE TABLE `inv_tipo_accion`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of inv_tipo_accion
-- ----------------------------
INSERT INTO `inv_tipo_accion` VALUES (1, 'administrador', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `inv_tipo_accion` VALUES (2, 'medico', '0000-00-00 00:00:00', '0000-00-00 00:00:00');
INSERT INTO `inv_tipo_accion` VALUES (3, 'recepcionista', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for lista_estados
-- ----------------------------
DROP TABLE IF EXISTS `lista_estados`;
CREATE TABLE `lista_estados`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lista_municipios
-- ----------------------------
DROP TABLE IF EXISTS `lista_municipios`;
CREATE TABLE `lista_municipios`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `municipios` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_estado` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `migration` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES ('2014_10_12_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES ('2014_10_12_100000_create_password_resets_table', 1);
INSERT INTO `migrations` VALUES ('2015_05_20_140711_create_tipo_accion', 1);
INSERT INTO `migrations` VALUES ('2015_05_20_140752_create_roles', 1);
INSERT INTO `migrations` VALUES ('2016_07_31_183042_pacientes', 1);
INSERT INTO `migrations` VALUES ('2016_08_03_204909_create_sucursales_table', 1);
INSERT INTO `migrations` VALUES ('2016_08_03_210238_create_municipios_table', 1);
INSERT INTO `migrations` VALUES ('2016_08_03_210247_create_estados_table', 1);
INSERT INTO `migrations` VALUES ('2016_08_03_215216_create_doctores_table', 1);
INSERT INTO `migrations` VALUES ('2018_02_03_064523_create_pacientes_citas_table', 1);

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
-- Records of pacientes_citas
-- ----------------------------
INSERT INTO `pacientes_citas` VALUES (1, 1, 30, '2019-05-15', '12:33', 'Favor de presentarse en ayunas');
INSERT INTO `pacientes_citas` VALUES (2, 4, 0, '2019-09-13', '10:00', '');

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
-- Records of pacientes_general
-- ----------------------------
INSERT INTO `pacientes_general` VALUES (1, 31, 30, 0, 0, '', 'Carlos Aurelio', 'Rangel Medina', '1992-03-12', '0', '232424234', 'RMCA23424FF', 'Jiquilpan #442', 'Obrera', 'Morelia', 'Michoacan', 'México', '432234234234', 'carlos.aurelio@recreamend.com', 'Estudiante', 'Universidad', 'Michoacán', '2019-05-02 09:45:06', '2019-05-02 09:46:28', NULL);
INSERT INTO `pacientes_general` VALUES (2, 31, 30, 31, 1, '', 'Carlos Aurelio', 'Rangel Medina', '1992-03-12', '0', '232424234', 'RMCA23424FF', 'Jiquilpan #442', 'Obrera', 'Morelia', 'Michoacan', 'México', '432234234234', 'carlos.aurelio@recreamend.com', 'Estudiante', 'Universidad', 'Michoacán', '2019-05-02 09:48:58', '2019-05-02 09:48:58', 1);
INSERT INTO `pacientes_general` VALUES (4, 60, 0, 0, 0, '', 'Edgar', 'Anguiano', '1981-10-30', '0', '', '', '', '', '', '', '', '4433181494', 'edkar_@hotmail.com', '', '', 'Michoacan', '2019-09-12 15:18:25', '2019-09-12 15:18:25', NULL);
INSERT INTO `pacientes_general` VALUES (5, 60, 0, 0, 0, '', 'Martha Patricia', 'Duarte Chavez', '1983-07-03', '1', '', '', '', '', '', '', '', '0', 'drcvaldezmunguia@yahoo.com.mx', 'hogar', '', '', '2019-09-12 19:04:45', '2019-09-12 19:04:45', NULL);
INSERT INTO `pacientes_general` VALUES (6, 60, 0, 0, 0, '', 'JUAN PABLO', 'BAEZ LARA', '1999-10-11', '0', '', '', '', '', 'ARIO DE ROSALES', 'MICHOACAN', '', '1', 'drcvaldezmunuia@yahoo.com.mx', '', '', '', '2019-09-12 19:24:58', '2019-09-12 19:24:58', NULL);
INSERT INTO `pacientes_general` VALUES (7, 60, 0, 0, 0, '', 'ESTHER', 'HUERTA RIO FRIO', '1960-07-29', '1', '', '', '', '', '', '', '', '4543685161', 'drcvaldezmunguia@yahoo.com.mx', 'MICHOACAN', '', 'COENEO', '2019-09-13 19:08:55', '2019-09-13 19:08:55', NULL);
INSERT INTO `pacientes_general` VALUES (8, 60, 0, 0, 0, '', 'MAR ELINA', 'GALLEGOS  CARBAJAL', '1977-06-10', '1', '', '', '', '', '', '', '', '4431874807', 'drcvaldezmunguia@yahoo.com.mx', '', '', '', '2019-09-14 00:25:02', '2019-09-14 00:25:02', NULL);
INSERT INTO `pacientes_general` VALUES (9, 60, 0, 0, 0, '', 'LILIANA ', 'PASTOR MARTINEZ', '1973-05-16', '1', '', '', '', '', '', '', '', '4341001787', 'drcvaldezmunguia@yahoo.com.mx', '', '', 'MORELIA', '2019-09-14 00:40:09', '2019-09-14 00:40:09', NULL);
INSERT INTO `pacientes_general` VALUES (10, 60, 0, 0, 0, '', 'ANGELICA', 'PEREZ FARIAS', '1975-12-31', '1', '', '', '', 'quinceo', '', '', '', '4432717493', 'drcvaldezmunguia@yahoo.com.mx', '', '', '', '2019-09-14 01:19:02', '2019-09-14 01:19:02', NULL);
INSERT INTO `pacientes_general` VALUES (11, 60, 0, 0, 0, '', 'MARIA ESTELA', 'SALASAR SOLIS', '1957-08-26', '1', '', '', '', '', '', '', '', '0', 'drcvaldezmunguia@yahoo.com.mx', '', '', '', '2019-09-14 18:28:05', '2019-09-14 18:28:05', NULL);
INSERT INTO `pacientes_general` VALUES (12, 60, 0, 0, 0, '', 'ANGEL', 'ARZATE RIOS', '1959-07-25', '0', '', '', '', '', 'APATZINGAN', '', '', '0', 'drcvaldezmunguia@yahoo.com.mx', '', '', '', '2019-09-18 02:27:56', '2019-09-18 02:27:56', NULL);
INSERT INTO `pacientes_general` VALUES (13, 60, 0, 0, 0, '', 'MARIBEL', 'MUÑOZ HERNANDEZ', '1981-04-16', '1', '', '', '', '', '', '', '', '2', 'drcvaldezmujnguia@yahoo.com.mx', '', '', '', '2019-09-19 00:35:42', '2019-09-19 00:35:42', NULL);

-- ----------------------------
-- Table structure for pacientes_historial_clinica
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_historial_clinica`;
CREATE TABLE `pacientes_historial_clinica`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) NOT NULL,
  `no_expediente` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `vivienda_agua` int(11) NOT NULL DEFAULT 0,
  `vivienda_luz` int(11) NOT NULL DEFAULT 0,
  `vivienda_drenaje` int(11) NOT NULL DEFAULT 0,
  `vivienda_piso_material` int(11) NOT NULL DEFAULT 0,
  `toxicomanias_fuma` int(11) NOT NULL DEFAULT 0,
  `toxicomanias_alcohol` int(11) NOT NULL DEFAULT 0,
  `toxicomanias_otros` int(11) NOT NULL DEFAULT 0,
  `patologias_alergias` int(11) NOT NULL DEFAULT 0,
  `patologias_cirugias` int(11) NOT NULL DEFAULT 0,
  `patologias_transfusiones` int(11) NOT NULL DEFAULT 0,
  `patologias_fracturas` int(11) NOT NULL DEFAULT 0,
  `patologias_internamientos_hospitalarios` int(11) NOT NULL DEFAULT 0,
  `patologias_enfermedades_cronicas` int(11) NOT NULL DEFAULT 0,
  `patologias_tratamientos` int(11) NOT NULL DEFAULT 0,
  `abuelos_dm` int(11) NOT NULL DEFAULT 0,
  `abuelos_has` int(11) NOT NULL DEFAULT 0,
  `abuelos_obesidad` int(11) NOT NULL DEFAULT 0,
  `abuelos_cardiologicos` int(11) NOT NULL DEFAULT 0,
  `abuelos_dislipidemias` int(11) NOT NULL DEFAULT 0,
  `abuelos_cerebrovasculares` int(11) NOT NULL DEFAULT 0,
  `abuelos_reumaticos` int(11) NOT NULL DEFAULT 0,
  `padres_dm` int(11) NOT NULL DEFAULT 0,
  `padres_has` int(11) NOT NULL DEFAULT 0,
  `padres_obesidad` int(11) NOT NULL DEFAULT 0,
  `padres_cardiologicos` int(11) NOT NULL DEFAULT 0,
  `padres_dislipidemias` int(11) NOT NULL DEFAULT 0,
  `padres_cerebrovasculares` int(11) NOT NULL DEFAULT 0,
  `padres_reumaticos` int(11) NOT NULL DEFAULT 0,
  `tios_dm` int(11) NOT NULL DEFAULT 0,
  `tios_has` int(11) NOT NULL DEFAULT 0,
  `tios_obesidad` int(11) NOT NULL DEFAULT 0,
  `tios_cardiologicos` int(11) NOT NULL DEFAULT 0,
  `tios_dislipidemias` int(11) NOT NULL DEFAULT 0,
  `tios_cerebrovasculares` int(11) NOT NULL DEFAULT 0,
  `tios_reumaticos` int(11) NOT NULL DEFAULT 0,
  `hermanos_dm` int(11) NOT NULL DEFAULT 0,
  `hermanos_has` int(11) NOT NULL DEFAULT 0,
  `hermanos_obesidad` int(11) NOT NULL DEFAULT 0,
  `hermanos_cardiologicos` int(11) NOT NULL DEFAULT 0,
  `hermanos_dislipidemias` int(11) NOT NULL DEFAULT 0,
  `hermanos_cerebrovasculares` int(11) NOT NULL DEFAULT 0,
  `hermanos_reumaticos` int(11) NOT NULL DEFAULT 0,
  `negados_dm` int(11) NOT NULL DEFAULT 0,
  `negados_has` int(11) NOT NULL DEFAULT 0,
  `negados_obesidad` int(11) NOT NULL DEFAULT 0,
  `negados_cardiologicos` int(11) NOT NULL DEFAULT 0,
  `negados_dislipidemias` int(11) NOT NULL DEFAULT 0,
  `negados_cerebrovasculares` int(11) NOT NULL DEFAULT 0,
  `negados_reumaticos` int(11) NOT NULL DEFAULT 0,
  `fuma` int(11) NOT NULL DEFAULT 0,
  `alcohol` int(11) NOT NULL DEFAULT 0,
  `otros` int(11) NOT NULL DEFAULT 0,
  `alergias` int(11) NOT NULL DEFAULT 0,
  `cirugias` int(11) NOT NULL DEFAULT 0,
  `transfusiones` int(11) NOT NULL DEFAULT 0,
  `fracturas` int(11) NOT NULL DEFAULT 0,
  `internamientos_hospitalarios` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `enfermedades_cronicas` int(11) NOT NULL DEFAULT 0,
  `tratamientos` int(11) NOT NULL DEFAULT 0,
  `dm` int(11) NOT NULL DEFAULT 0,
  `has` int(11) NOT NULL DEFAULT 0,
  `obesidad` int(11) NOT NULL DEFAULT 0,
  `cardiologos` int(11) NOT NULL DEFAULT 0,
  `dislipidemias` int(11) NOT NULL DEFAULT 0,
  `cerebrovasculares` int(11) NOT NULL DEFAULT 0,
  `reumaticos` int(11) NOT NULL DEFAULT 0,
  `vih` int(11) NOT NULL DEFAULT 0,
  `post_menopausia` int(11) NOT NULL DEFAULT 0,
  `terapia_remplazo_hormonal` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp(0) NOT NULL,
  `updated_at` timestamp(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pacientes_historial_clinica
-- ----------------------------
INSERT INTO `pacientes_historial_clinica` VALUES (1, 1, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-05-02 09:45:06', '2019-05-02 09:45:06');
INSERT INTO `pacientes_historial_clinica` VALUES (2, 2, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-05-02 09:48:58', '2019-05-02 09:48:58');
INSERT INTO `pacientes_historial_clinica` VALUES (3, 3, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-08-29 21:22:45', '2019-08-29 21:22:45');
INSERT INTO `pacientes_historial_clinica` VALUES (4, 4, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-12 15:18:25', '2019-09-12 15:18:25');
INSERT INTO `pacientes_historial_clinica` VALUES (5, 5, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-12 19:04:45', '2019-09-12 19:04:45');
INSERT INTO `pacientes_historial_clinica` VALUES (6, 6, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-12 19:24:58', '2019-09-12 19:24:58');
INSERT INTO `pacientes_historial_clinica` VALUES (7, 7, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-13 19:08:55', '2019-09-13 19:08:55');
INSERT INTO `pacientes_historial_clinica` VALUES (8, 8, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-14 00:25:02', '2019-09-14 00:25:02');
INSERT INTO `pacientes_historial_clinica` VALUES (9, 9, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-14 00:40:09', '2019-09-14 00:40:09');
INSERT INTO `pacientes_historial_clinica` VALUES (10, 10, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-14 01:19:02', '2019-09-14 01:19:02');
INSERT INTO `pacientes_historial_clinica` VALUES (11, 11, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-14 18:28:05', '2019-09-14 18:28:05');
INSERT INTO `pacientes_historial_clinica` VALUES (12, 12, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-18 02:27:56', '2019-09-18 02:27:56');
INSERT INTO `pacientes_historial_clinica` VALUES (13, 13, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '2019-09-19 00:35:42', '2019-09-19 00:35:42');

-- ----------------------------
-- Table structure for pacientes_nota
-- ----------------------------
DROP TABLE IF EXISTS `pacientes_nota`;
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
-- Records of pacientes_nota
-- ----------------------------
INSERT INTO `pacientes_nota` VALUES (1, '1', 1, '24', '103', '87', '321313', '32', '34-22', '67-33', '87-33', '323', '33', '2323', 'Desea ser atendido por malestar ', 'El paciente cuenta con problemas respiratorios', 'El paciente requiere un atención inmediata', '2019-05-02 09:45:06', '2019-05-02 09:47:24', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (2, '', 2, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-05-02 09:48:58', '2019-05-02 09:48:58', NULL, 0);
INSERT INTO `pacientes_nota` VALUES (3, '2', 3, '', '', '62', '', '36', '80-120', '110-180', '25', '', '', '', '', '', '', '2019-08-29 21:22:45', '2019-08-29 21:22:45', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (4, '', 3, '29', '30', '62', '2000', '', '', '80-120', '80150', '70-101', '2545', '54-58', 'Tos, cansancio', 'Reporte mal', 'Esta grave requiere reposo inmediato. ', '2019-08-29 21:26:00', '2019-08-29 21:26:00', '2019-08-29 14:26:00', 0);
INSERT INTO `pacientes_nota` VALUES (5, '3', 4, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-12 15:18:25', '2019-09-12 15:18:25', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (6, '', 4, '37', '', '', '', '', '', '', '', '', '', '', 'Dolor en rodilla', '-', '-', '2019-09-12 15:20:08', '2019-09-12 15:20:08', '2019-09-12 08:20:08', 0);
INSERT INTO `pacientes_nota` VALUES (7, '4', 5, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-12 19:04:45', '2019-09-12 19:04:45', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (8, '', 5, '37', '', '', '', '', '', '', '', '', '', '', 'tratamiento de rinitos  e ivu', 'tx cipro y  plidan', 'rinitis \r\nivu', '2019-09-12 19:07:38', '2019-09-12 19:07:38', '2019-09-12 12:07:38', 0);
INSERT INTO `pacientes_nota` VALUES (9, '5', 6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-12 19:24:58', '2019-09-12 19:24:58', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (10, '', 6, '19', '', '', '', '', '', '', '', '', '', '', 'ansiedad,  oerdida de peso  y  fuerza', 'a', 'aplicamos terapia nural en senos y taramiento para  parasitos', '2019-09-12 19:26:24', '2019-09-12 19:26:24', '2019-09-12 12:26:24', 0);
INSERT INTO `pacientes_nota` VALUES (11, '6', 7, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-13 19:08:55', '2019-09-13 19:08:55', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (12, '', 7, '59', '', '', '', '', '', '', '', '', '', '', 'aplicamos supropubico y tiroides', 'l', 'sangrado disfuncional', '2019-09-13 19:12:15', '2019-09-13 19:12:15', '2019-09-13 12:12:15', 0);
INSERT INTO `pacientes_nota` VALUES (13, '7', 8, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-14 00:25:02', '2019-09-14 00:25:02', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (14, '', 8, '42', '', '', '', '', '', '', '', '', '', '', 'DOLOR ARTICULAR  APLICAMOS TERAPIA NEURAL  NEGATIVOS  PEFIL REUMATICO', 'L', 'ARTRALGIAS', '2019-09-14 00:25:57', '2019-09-14 00:25:57', '2019-09-13 17:25:57', 0);
INSERT INTO `pacientes_nota` VALUES (15, '8', 9, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-14 00:40:09', '2019-09-14 00:40:09', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (16, '', 9, '46', '', '', '', '', '', '', '', '', '', '', 'LUXACION DE HOMBRO', 'S', 'LUXACION DE HOMBRO', '2019-09-14 00:40:47', '2019-09-14 00:40:47', '2019-09-13 17:40:47', 0);
INSERT INTO `pacientes_nota` VALUES (17, '9', 10, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-14 01:19:02', '2019-09-14 01:19:02', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (18, '10', 11, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-14 18:28:05', '2019-09-14 18:28:05', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (19, '11', 12, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2019-09-18 02:27:56', '2019-09-18 02:27:56', NULL, 1);
INSERT INTO `pacientes_nota` VALUES (20, '', 12, '60', '', '', '', '', '', '', '', '', '', '', 'DIABETES', 'DOLOR PRECORDIAL', 'DIABETES ANSIEDAD\r\nHIÈRPLASIA PROSTATICA\r\nANSIEDAD\r\nLE DI GOTAS DE DIABETES SE AVAN A SUSPENDER PORQUE SE QUEJA DE MUCHO DOLOR EN EPIGASTRIO.\r\nRECETAMOS FORMULA 2', '2019-09-18 02:29:34', '2019-09-18 02:29:34', '2019-09-17 19:29:34', 0);
INSERT INTO `pacientes_nota` VALUES (21, '12', 13, '38', '', '', '', '', '', '', '', '', '', '', 'DOLOR', '', 'ARTRALGUA', '2019-09-19 00:35:42', '2019-09-19 00:37:50', NULL, 1);

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
-- Records of pacientes_recetas
-- ----------------------------
INSERT INTO `pacientes_recetas` VALUES (1, 1, '15-05-2019', 'Paracetamol 243ml, Naproxeno sodico 43', '2019-05-02 09:47:53', '2019-05-02 09:47:53');
INSERT INTO `pacientes_recetas` VALUES (2, 6, '12-09-2019', 'hkjhhj', '2019-09-12 15:20:59', '2019-09-12 15:20:59');
INSERT INTO `pacientes_recetas` VALUES (3, 6, '12-09-2019', 'ccccccc', '2019-09-12 15:39:32', '2019-09-12 15:39:32');
INSERT INTO `pacientes_recetas` VALUES (4, 10, '12-09-2019', 'senos y tiroides  desparasitante, formula 2 , italviron dha  tabletas\r\nno tiene tiroides pero pongo tiroiedes', '2019-09-12 19:27:39', '2019-09-12 19:27:39');
INSERT INTO `pacientes_recetas` VALUES (5, 12, '12-09-2019', 'replens\r\n', '2019-09-13 19:12:45', '2019-09-13 19:12:45');
INSERT INTO `pacientes_recetas` VALUES (6, 18, '14-09-2019', 'adepsique, formula 2 pero no los tomo', '2019-09-14 18:31:00', '2019-09-14 18:31:00');

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets`  (
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL,
  INDEX `password_resets_email_index`(`email`) USING BTREE,
  INDEX `password_resets_token_index`(`token`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_resets
-- ----------------------------
INSERT INTO `password_resets` VALUES ('soporte@realidadcreativa.com', '95396a277f27e80491402e9693b986ddfdcc230f253c1516b62dc91c1755d586', '2019-04-16 00:48:29');

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
-- Records of sucursales
-- ----------------------------
INSERT INTO `sucursales` VALUES (1, 'ZAHG570507IX5', '470844977logo hitt.png', 'Celeste', '', '34', 'Fracc. Cosmos', 58050, 'Morelia', 'Michoacán', '(443) 323 5088', 'contacto@clinicawh.com', 'www.clinicawh.com', 'demo', NULL, '31', '0000-00-00 00:00:00', '2019-04-17 05:29:46', 'William Hitt');
INSERT INTO `sucursales` VALUES (2, 'RFC Emilio', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '2', '0000-00-00 00:00:00', '2018-10-08 22:08:42', 'Emilio');
INSERT INTO `sucursales` VALUES (3, 'RFC Zarate', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:09:20', 'Hector');
INSERT INTO `sucursales` VALUES (4, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:47:06', NULL);
INSERT INTO `sucursales` VALUES (5, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:49:59', NULL);
INSERT INTO `sucursales` VALUES (6, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:47:14', NULL);
INSERT INTO `sucursales` VALUES (7, 'rfc7', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'yuny0508@yahoo.com.mx', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2019-04-17 06:22:01', 'Medicina Estética Blossom');
INSERT INTO `sucursales` VALUES (8, 'rfc8', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:09:50', '8');
INSERT INTO `sucursales` VALUES (9, 'rfc9', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:10:03', '9');
INSERT INTO `sucursales` VALUES (10, 'rfc10', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:10:17', '10');
INSERT INTO `sucursales` VALUES (11, 'RFC Calixto', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:11:56', 'Calixto');
INSERT INTO `sucursales` VALUES (12, 'RFC Misa', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:12:14', 'Misael');
INSERT INTO `sucursales` VALUES (13, 'RFC David', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 22:12:28', 'David');
INSERT INTO `sucursales` VALUES (14, 'demo', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 21:54:09', '14');
INSERT INTO `sucursales` VALUES (15, 'RFC Cesar', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-08 23:16:17', 'Cesar');
INSERT INTO `sucursales` VALUES (16, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (17, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (18, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (19, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (20, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (21, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (22, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (23, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (24, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:42', NULL);
INSERT INTO `sucursales` VALUES (25, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:36', NULL);
INSERT INTO `sucursales` VALUES (26, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (27, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:50', NULL);
INSERT INTO `sucursales` VALUES (28, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (29, 'demo', 'default.jpg', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '2018-10-03 22:17:08', 'Oscar');
INSERT INTO `sucursales` VALUES (30, 'AUZE811030J45', '598058082pfizer.jpg', 'Av. Sanson Flores ', '2', '54', 'Camelinas', 58290, 'MORELIA', 'MICH', '4433237873', 'edkar_@hotmail.com', 'www.realidadcreativa.com', 'demo', NULL, '25', '0000-00-00 00:00:00', '2019-05-02 09:45:43', 're-crea');
INSERT INTO `sucursales` VALUES (31, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (32, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:57', NULL);
INSERT INTO `sucursales` VALUES (33, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-03 23:20:32', NULL);
INSERT INTO `sucursales` VALUES (34, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:57:02', NULL);
INSERT INTO `sucursales` VALUES (35, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-03 23:21:05', NULL);
INSERT INTO `sucursales` VALUES (36, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-03 23:20:42', NULL);
INSERT INTO `sucursales` VALUES (37, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-03 23:20:51', NULL);
INSERT INTO `sucursales` VALUES (38, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-03 23:20:58', NULL);
INSERT INTO `sucursales` VALUES (39, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:02', NULL);
INSERT INTO `sucursales` VALUES (40, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:54:44', NULL);
INSERT INTO `sucursales` VALUES (41, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:54:55', NULL);
INSERT INTO `sucursales` VALUES (42, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:55:55', NULL);
INSERT INTO `sucursales` VALUES (43, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:55:04', NULL);
INSERT INTO `sucursales` VALUES (44, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:14', NULL);
INSERT INTO `sucursales` VALUES (45, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:08', NULL);
INSERT INTO `sucursales` VALUES (46, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-03 23:21:14', NULL);
INSERT INTO `sucursales` VALUES (47, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:20', NULL);
INSERT INTO `sucursales` VALUES (48, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:56:29', NULL);
INSERT INTO `sucursales` VALUES (49, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', NULL);
INSERT INTO `sucursales` VALUES (50, 'demo', '', 'demo', 'demo', 'demo', 'demo', 0, 'demo', 'demo', 'demo', 'demo', 'demo', 'demo', 1, '', '0000-00-00 00:00:00', '2018-10-08 21:54:30', NULL);
INSERT INTO `sucursales` VALUES (51, 'XAXX010101000', '', '', '', '', '', 58130, 'Morelia', 'Michoacán', '443 166 1796', 'aldo0891@hotmail.com', '', NULL, NULL, '', '2018-10-03 21:28:20', '2018-10-03 21:28:20', 'Aldo');

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

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '1', 0, 0, 'administrador', 'admin@recreamed.com', '$2y$10$jff85wFdljV29tlxDvX3jeQ7Gn9oadfu5n9Q0tM59FzPIn4iSaXB6', '319890962person-flat.png', '4432170690', '00000000', '', '', '', '', '', '', '', 0, '', '', '5gOEFLhIpb5jA2UPvEDlJ5KGwf2UBSpNFQifKcTNHLEmwkcJP5Lvp1CMX6tl', '0000-00-00 00:00:00', '2018-09-05 23:56:03');
INSERT INTO `users` VALUES (47, '2', 2, 0, 'Emilio Anguiano Zamudio', 'emilio.anguiano@gmail.com', '$2y$10$Cu98PtCqjVVksQSqG7vN5eOu1lAnyJoHNDzApYQdvr.nFkFc0xcMu', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', '', 'e97MOuy06JSxzzy4hi928tqb2QPO8GqRVVik6R9GCzbjRzYBtyFeNcyVGzc8', '2018-09-07 04:11:16', '2018-09-21 23:05:21');
INSERT INTO `users` VALUES (48, '2', 3, 0, 'Hector Zarate Dagio', 'hector.zarate@recreamed.com', '$2y$10$1NmOyJfJRPSlvQOG86HXG.EUM5weNtBDRtz8WnBYrKEmOryjzkKeS', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', '', NULL, '2018-09-07 04:11:50', '2018-09-07 04:11:50');
INSERT INTO `users` VALUES (65, '2', 7, 0, 'Yunuen Villanueva Ramírez', 'yuny0508@yahoo.com.mx', '$2y$10$RV.YxnyD7qPEXJ8YoTWX5.hHTS803sTRr0ZYX92pIRS2XnAIj2TyO', 'logo-avatar.png', '4433691410', '5986020', '', '', '', '', 'Morelia', 'Michoacán', '', 0, '', '', NULL, '2019-04-17 06:16:44', '2019-04-17 06:16:44');
INSERT INTO `users` VALUES (62, '2', 1, 0, 'María Guadalupe Zamudio Hernández', 'zamudio@clinicawh.com', '$2y$10$kE5Wtf0UOmoESQ0YmCCLUOmGsOjYfBLcQYUOFEYmoAHUICDSjHLGu', '1401019619draZam.png', '(443) 272 5494', '989039', '', '34', 'Celeste', 'Fracc. Cosmos', 'Morelia', 'Michoacán', '', 0, '', '', 'vWrC9YRMf3P5j7DNlqEfNRoINI1zaldGoGP4f5R0pSD6vZqdMtIyVXftl7fr', '2019-04-17 05:16:51', '2019-04-26 01:03:27');
INSERT INTO `users` VALUES (63, '3', 1, 62, 'Recepción', 'recepcion@clinicawh.com', '$2y$10$rOwPfRdsDZdr6Jk6MFTkcOuPtbrfZCVWzCw5IH1Lop65cJMBWXbn2', 'logo-avatar.png', '4433953944', '', '', '', '', '', 'Morelia', 'Michoacán', '', 0, '', '', NULL, '2019-04-17 05:19:49', '2019-04-17 05:19:49');
INSERT INTO `users` VALUES (51, '2', 30, 0, 'Nestor', 'soporte@realidadcreativa.com', '$2y$10$1T1DoyaB.0gA1LD7dW1QK.slmebOw4agUabdT0iCRDOVhNHEpvk1m', '1912842478error 3 pos.png', '4432123432', '123456', '', '', '', '', 'Morelia', 'Michoacán', '', 0, '', '', 'cNHeyhweUw7EpjpZ0eoOsv1BXugMQ567opB5DK3VNNYsfCABCqq3n1UJYrMX', '2018-09-21 23:00:49', '2019-04-16 00:44:26');
INSERT INTO `users` VALUES (56, '3', 30, 31, 'Recepción', 'contacto@realidadcreativa.com', '$2y$10$OiANihnqy2YBYZM2rQEh2uCucFWNvAHDt7RzaErKE6v1iLBt8NWxu', 'logo-avatar.png', '4433237873', '', '', '', 'Av. Sanson Flores', 'Camelinas', 'MORELIA', 'MICH', '58290', 0, '', '', NULL, '2018-09-28 05:38:53', '2018-09-28 05:38:53');
INSERT INTO `users` VALUES (57, '2', 0, 0, 'Aldo', 'aldo0891@hotmail.com', '$2y$10$aDNB.ByU3P8prJi4nDvXn.hy0JAdFRW17nEQdF.Czq3w2plFb0ojq', 'logo-avatar.png', '4431661796', '', '', '', '', '', 'Morelia', 'Michoacán', '58130', 0, '', '', NULL, '2018-10-03 22:08:18', '2018-10-03 22:08:18');
INSERT INTO `users` VALUES (58, '2', 0, 0, 'Oscar', 'oscarranzab@yahoo.com.mx', '$2y$10$DN4hDy7uL/LBIULyR26bmeGYl/oLuV.X7xas6jptRmfA8.uPnO3.a', 'logo-avatar.png', '4432274895', '', '', '', '', '', 'Morelia', 'Michoacán', '58290', 0, '', '', NULL, '2018-10-08 21:37:27', '2018-10-08 21:37:27');
INSERT INTO `users` VALUES (59, '2', 0, 0, 'Calixto', 'calixtogarciabucio@gmail.com', '$2y$10$wFV.OqHffl0x5HEkkvg52OkYNV7h57mAgW1/FDJXGt5pbSNrnBbAi', 'logo-avatar.png', '4432307727', '', '', '', '', '', 'Morelia', 'Michoacán', '58000', 0, '', '', NULL, '2018-10-08 22:16:19', '2018-10-08 22:16:19');
INSERT INTO `users` VALUES (60, '2', 0, 0, 'Cesar', 'drcvaldezmunguia@yahoo.com.mx', '$2y$10$uaO6nAbIJbedfCB1TJw0qOX5wd0oiEUnSDyfJ4qjDrUlxO3vUxKnC', 'logo-avatar.png', '4433689078', '', '', '78', '20 de octubre', 'Unión Popular Solidaria', 'Morelia', 'Michoacán', '58140', 0, '', '', 'eEH8rOINOujzmqsVJPqRMy9iaDutW2uQlnq50n8O4oroqELitXCRyfryVfUi', '2018-10-08 23:32:36', '2019-08-31 03:03:34');
INSERT INTO `users` VALUES (31, '2', 30, 0, 'Edgar Anguiano', 'edgar@recreamed.com', '$2y$10$34LiOFhobYZNKAlWei9rbO/IMvzgK.QWAh/7lQclU/HgdUF7T5yIS', '139835711me.jpg', '4435585455', '3453645646456', '12', '33', 'Amexcua', 'Santa Maria', 'Morelia', 'Michoacán', '', 0, '', '', NULL, '0000-00-00 00:00:00', '2019-09-20 02:24:55');
INSERT INTO `users` VALUES (44, '2', 0, 0, 'edson', 'edson@recreamed.mx', '$2y$10$joX7tLlQUV5pdV6wyFEcHOiJhnilTPISrsaGPUHTbXhIBmIY2nhku', 'person-flat.png', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '', '', NULL, '2018-08-14 00:32:10', '2018-08-14 00:32:10');
INSERT INTO `users` VALUES (64, '2', 12, 0, 'Misael Tapia', 'misaeltapiao@yahoo.com', '$2y$10$JMiGijH5rVjVWOUzWSEWJeISHB9Xobxnw.ZFZX0s2wcyj3XbHePya', 'logo-avatar.png', '4431271635', '', '', '', '', '', 'Morelia', 'Michoacán', '', 0, '', '', NULL, '2019-04-17 06:00:30', '2019-04-17 06:00:30');

SET FOREIGN_KEY_CHECKS = 1;
