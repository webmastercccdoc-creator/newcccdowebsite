<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pending shortened URL approval</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8f7; color: #1f2937; line-height: 1.6; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://old.citycollegecdo.edu.ph/ccdologo.png" alt="City College of CDO" style="max-width: 150px; height: auto;">
        </div>

        <h2 style="color: #0f5132; margin: 0 0 16px; font-size: 24px;">Pending Shortened URL Approval</h2>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Hello,
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            A new shortened URL has been submitted and is waiting for approval.
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            <strong>Short Code:</strong> {{ $url->short_code }}<br>
            <strong>Short URL:</strong> {{ $shortUrl }}<br>
            <strong>Long URL:</strong> {{ $url->long_url }}
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Please review and approve or reject this shortened URL from the admin approval area.
        </p>

        <p style="margin: 24px 0 0; font-size: 15px; color: #4b5563;">
            Regards,<br>
            City College of CDO
        </p>
    </div>
</body>
</html>
