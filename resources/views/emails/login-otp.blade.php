<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your login verification code</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8f7; color: #1f2937; line-height: 1.6; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://old.citycollegecdo.edu.ph/ccdologo.png" alt="City College of CDO" style="max-width: 150px; height: auto;">
        </div>

        <h2 style="color: #0f5132; margin: 0 0 16px; font-size: 24px;">Your login verification code</h2>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Hello {{ $displayName }}!
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            You are attempting to log in to your account. Please use the following verification code to complete your login:
        </p>

        <div style="text-align: center; background: #eef8f2; border: 1px solid #b7d8c5; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <span style="font-size: 32px; font-weight: 700; color: #0f5132; letter-spacing: 4px;">{{ $code }}</span>
        </div>

        <p style="margin: 0 0 16px; font-size: 15px;">
            This code will expire in 9 minutes from now.
        </p>

        <p style="margin: 0 0 16px; font-size: 15px;">
            If you did not attempt to log in, please ignore this email or contact support if you have concerns.
        </p>

        <p style="margin: 0 0 16px; font-size: 15px;">
            For your security, never share this code with anyone.
        </p>

        <p style="margin: 24px 0 0; font-size: 15px; color: #4b5563;">
            Regards,<br>
            City College of CDO
        </p>
    </div>
</body>
</html>
