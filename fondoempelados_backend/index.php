<?php
session_start();
///////////////////////////////////////////////////////////////////
//WEB SERVICE PARA LA app de control  DE FEMSEAPTO////////////////
//DESARROLLADO EN PHP V7///////////////////////////////////////////
//INGENIERO IVAN DARIO FRANCO NOVOA////////////////////////////////
//INGENIERO.IVANFR@GMAIL.COM///////////////////////////////////////
//3028416742///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
date_default_timezone_set('America/Bogota');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "femseapto_admin"; $contrasenia = "t$Ad_5vR7*9D"; $nombreBaseDatos = "femseapto_creditos";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

mysqli_set_charset($conexionBD,"utf8");



/////////////////////////////////////////////////////////////////////////////////////
//consulta si el usr que esta intentando iniciar sesion existe y devuelve sus datos//
////////////////////////////////////////////////////////////////////////////////////

if(isset($_GET["login"])){
    
    $data = json_decode(file_get_contents("php://input"));
    $usr=$data->usr;
    $pass=$data->pass;

     
    $sqllogin = mysqli_query($conexionBD,"SELECT * FROM fem_login WHERE usuario = '$usr' ");
    if(mysqli_num_rows($sqllogin) == 1){
        $customer = mysqli_fetch_all($sqllogin,MYSQLI_ASSOC);
       if ( password_verify($pass,$customer[0]['password']) ) {
        $_SESSION['token'] =  $customer[0]['password'];
        echo json_encode(["token"=>$_SESSION['token']],JSON_INVALID_UTF8_SUBSTITUTE);   
        
        }else{
        echo json_encode(["success"=>1]);
        }
    }else {
        echo json_encode(["success"=>0]);

    
}
}


if(isset($_GET["consulta"])){
    
    
    $data = json_decode(file_get_contents("php://input"));
    $fi=$data->fi;
    $ff=$data->ff;
    

     
  
        $sqllogin = mysqli_query($conexionBD,"SELECT   fem_solicitudes_creditos.nombres, fem_solicitudes_creditos.cedula, fem_solicitudes_creditos.apellidos,fem_solicitudes_creditos.interes,fem_solicitudes_creditos.monto_solicitado,fem_solicitudes_creditos.plazo_quincenal,fem_solicitudes_creditos.valor_cuota,fem_solicitudes_creditos.fecha_solicitud,fem_tipos_creditos.nombre, fem_municipios.nombre AS Nm FROM `fem_solicitudes_creditos`,fem_tipos_creditos , fem_municipios
        WHERE `fecha_solicitud` BETWEEN '".$fi."' AND '".$ff."'
         AND fem_municipios.ide_municipio = fem_solicitudes_creditos.ide_municipio_res 
        AND fem_solicitudes_creditos.ide_tipo_credito = fem_tipos_creditos.ide_tipo_credito
        ORDER BY `ide_solicitud_credito` DESC");
        if(mysqli_num_rows($sqllogin) > 0){
            $customer = mysqli_fetch_all($sqllogin,MYSQLI_ASSOC);
           
            echo json_encode($customer,JSON_INVALID_UTF8_SUBSTITUTE);   
            
           
        }else {
            echo json_encode(["success"=>1]);
    
        
    }
    
  
}

