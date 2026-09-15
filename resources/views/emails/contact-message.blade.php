<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8f7; color: #1f2937; line-height: 1.6; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://citycollegecdo.edu.ph/ccdologo.png" alt="City College of CDO" style="max-width: 150px; height: auto;">
        </div>

        <h2 style="color: #0f5132; margin: 0 0 16px; font-size: 24px;">{{ $subject }}</h2>

        <p style="margin: 0 0 16px; font-size: 16px;">A new message was submitted through the City College of CDO contact form.</p>

        <div style="background: #eef8f2; border: 1px solid #b7d8c5; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 8px;"><strong>Name:</strong> {{ $name }}</p>
            <p style="margin: 0 0 8px;"><strong>Company:</strong> {{ $company ?: 'Not provided' }}</p>
            <p style="margin: 0 0 8px;"><strong>Phone:</strong> {{ $phone }}</p>
            <p style="margin: 0;"><strong>Email:</strong> {{ $email }}</p>
        </div>

        <h3 style="color: #0f5132; margin: 0 0 8px; font-size: 18px;">Message</h3>
        <p style="white-space: pre-line; margin: 0; font-size: 16px;">{{ $contactMessage }}</p>

        <p style="margin: 24px 0 0; font-size: 15px; color: #4b5563;">
            Regards,<br>
            City College of CDO Contact Form
        </p>
    </div>
</body>
</html>
