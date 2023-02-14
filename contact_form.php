<?php
// Define SMTP server settings
$smtp_host = 'smtp.gmail.com';
$smtp_port = 587; // TLS
$smtp_username = 'tajamul21.ashraf@gmail.com';
$smtp_password = '8252685@Wani';

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Construct email headers
$headers = 'From: ' . $name . ' <' . $email . '>' . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= 'Content-type: text/plain; charset=UTF-8' . "\r\n";

// Construct email body
$body = "Name: $name\n\nEmail: $email\n\nSubject: $subject\n\nMessage: $message";

// Send email using PHP mail() function
if (mail('tajamul21.ashraf@gmail.com', $subject, $body, $headers, "-f $email")) {
  echo 'Email sent successfully.';
} else {
  echo 'An error occurred while sending the email.';
}
?>