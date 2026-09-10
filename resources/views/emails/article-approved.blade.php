<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article approval notification</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8f7; color: #1f2937; line-height: 1.6; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://old.citycollegecdo.edu.ph/ccdologo.png" alt="City College of CDO" style="max-width: 150px; height: auto;">
        </div>

        <h2 style="color: #0f5132; margin: 0 0 16px; font-size: 24px;">Article Approved</h2>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Hello {{ $user->name ?: $user->full_name }},
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Your article <strong>{{ $article->title }}</strong> has been approved and is now published.
        </p>

        <p style="margin: 24px 0 0; font-size: 15px; color: #4b5563;">
            Regards,<br>
            City College of CDO
        </p>
    </div>
</body>
</html>
