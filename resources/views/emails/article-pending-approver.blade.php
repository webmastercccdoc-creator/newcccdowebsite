<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pending article approval</title>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8f7; color: #1f2937; line-height: 1.6; margin: 0; padding: 0;">
    <div style="max-width: 640px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://old.citycollegecdo.edu.ph/ccdologo.png" alt="City College of CDO" style="max-width: 150px; height: auto;">
        </div>

        <h2 style="color: #0f5132; margin: 0 0 16px; font-size: 24px;">Pending Article Approval</h2>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Hello,
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            A new article has been submitted and is waiting for approval.
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            <strong>Title:</strong> {{ $article->title }}<br>
            <strong>Department:</strong> {{ $article->department }}<br>
            <strong>Submitted By:</strong> {{ $authorName }}<br>
            <strong>Submitted On:</strong> {{ $article->date ? $article->date->format('F d, Y') : now()->format('F d, Y') }}
        </p>

        <p style="margin: 0 0 16px; font-size: 16px;">
            Please review and approve or reject this article from the admin approval dashboard.
        </p>

        <p style="margin: 24px 0 0; font-size: 15px; color: #4b5563;">
            Regards,<br>
            City College of CDO
        </p>
    </div>
</body>
</html>
