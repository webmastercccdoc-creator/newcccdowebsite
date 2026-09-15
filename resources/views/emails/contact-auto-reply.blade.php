<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>We received your message</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8f7; color: #1f2937; line-height: 1.6; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://citycollegecdo.edu.ph/ccdologo.png" alt="City College of CDO" style="max-width: 150px; height: auto;">
        </div>

        <h2 style="color: #0f5132; margin: 0 0 16px; font-size: 24px;">We received your message</h2>

        <p style="margin: 0 0 16px; font-size: 16px;">Hello {{ $name }},</p>
        <p style="margin: 0 0 16px; font-size: 16px;">
            Thank you for contacting the City College of Cagayan de Oro. Your message has been received and forwarded to the appropriate office.
        </p>

        <div style="background: #eef8f2; border: 1px solid #b7d8c5; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px;"><strong>Subject:</strong> {{ $subject }}</p>
            <p style="margin: 0; white-space: pre-line;"><strong>Your message:</strong>\n{{ $contactMessage }}</p>
        </div>

        <p style="margin: 0 0 16px; font-size: 15px;">Our team will review your inquiry and respond as soon as possible.</p>

        <p style="margin: 24px 0 0; font-size: 15px; color: #4b5563;">
            Regards,<br>
            City College of Cagayan de Oro
        </p>
    </div>
</body>
</html>
