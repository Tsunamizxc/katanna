<?php

header('Content-Type: application/json');  
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$title = "Тема письма";
$file = $_FILES['file'];

$c = true;
// Формирование самого письма
$title = "Заявка на запись";

foreach ( $_POST as $key => $value ) {
  if ( $value != "" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Настройки вашей почты
  $mail->Host       = ''; // SMTP сервера вашей почты
  $mail->Username   = ''; // Логин на почте
  $mail->Password   = ''; // Пароль на почте
  $mail->SMTPSecure = '';
  $mail->Port       = 465;

  $mail->setFrom('info@katanna-nails.ru', 'Заявка с вашего сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('info@katanna-nails.ru');

  // Прикрипление файлов к письму
  // if (!empty($file['name'][0])) {
  //   for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
  //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
  //     $filename = $file['name'][$ct];
  //     if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
  //         $mail->addAttachment($uploadfile, $filename);
  //         $rfile[] = "Файл $filename прикреплён";
  //     } else {
  //         $rfile[] = "Не удалось прикрепить файл $filename";
  //     }
  //   }
  // }
  // Здесь обрабатываются данные из формы  
  $responseArray = [];  
  foreach ($_POST as $key => $value) {  
      $responseArray[$key] = $value; // Правильное добавление элемента в массив  
  }  
  // Возвращаем ответ в формате JSON  
  echo json_encode($responseArray);  
  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
