<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// class sendEmailClass {
//   public $engineMessage = 0;
//   public $error = 0;
// }

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

$data = json_decode(file_get_contents("php://input"), true);

$fullname = $data['fullname'];
$email = $data['email'];
$subject = $data['subject'];
$the_message = $data['description'];
$code = $data['code'];
$qr_code = $data['qr_code'];
$message = '
<!DOCTYPE html>
<html>
<head>
		<meta http-equiv="Content-Security-Policy" content="child-src *;">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Syne&display=swap" rel="stylesheet">
</head>
<body>

	<section class="oa-email" style="font-family: \'Syne\', \'Trebuchet MS\', sans-serif; padding: 15px 0; max-width: 600px; width: 95%; font-size: 100%; margin: 30px auto; -moz-box-shadow: 1px 1px 5px 1px #e3e3e3; -webkit-box-shadow: 1px 1px 5px 1px #e3e3e3; box-shadow: 1px 1px 5px 1px #e3e3e3;">
		<div class="xnyder-brand xui-row xui-align-items-center" style="justify-content: center;">
			<div class="logo" style="width: 100%;">

			</div>
			<div class="name" style="text-align: center; width: 100%; marging-top: 20px;">
				<span></span>
			</div>
		</div>
		<div class="oa-email-header" style="background-color: #f0124e; color: #fff; padding: 30px 10px 15px 10px; text-align: center;">
			<h2 style="font-weight: normal;" class="xui-text-capitalize">Intersys Notification</h2>
		</div>
		<div class="oa-email-dtls" style="padding: 30px 20px; color: #555; position: relative;">
			<h2>Hi '.$fullname.',</h2>
			<p>'.$the_message.'</p>
			<img class="" style="min-width: 100%;" src="https://api.qrserver.com/v1/create-qr-code/?size=100%x100&data='.$qr_code.'" alt='.$code.' - QR Code">
			<br>
			<p>Sincerely, <br> <span class="xui-text-blue"> <a href="https://www.datalogic.toonlogicstudio.com/" style="text-decoration: none;">Data-Logic Intersys</a></span></p>

			<p>Copyright © <script type="text/javascript">document.write(new Date().getFullYear());</script> <a target="_blank" href="https://www.datalogic.toonlogicstudio.com/">Data-Logic Intersys</a>. All rights reserved.</p>
		</div>
	</section>

</body>
</html>

';

try {
    //Server settings
		$mail->SMTPDebug = 2;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'toonlogicstudio.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'noreply@toonlogicstudio.com';                     // SMTP username
    $mail->Password   = 't3pL6i2gUn1ms';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                                  // TCP port to connect to

    //Recipients
    $mail->setFrom('noreply@toonlogicstudio.com', 'Toon Logic Studio');
    $mail->addAddress($email, $fullname);     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $message;
    $mail->AltBody = strip_tags($message);

    $mail->send();
    echo 'Message has been sent';
    // $returnvalue = new sendEmailClass();
    // $returnvalue->engineMessage = 1;
} catch (Exception $e) {
  // $returnvalue = new sendEmailClass();
  // $returnvalue->error = 2;
    echo "Message could not be sent";
    // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

// echo json_encode($returnvalue);
