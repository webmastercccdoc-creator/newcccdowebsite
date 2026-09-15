<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        Mail::send('emails.contact-message', [
            ...$data,
            'contactMessage' => $data['message'],
        ], function ($mail) use ($data) {
            $mail->to('registrar.citycollegeofcdo@gmail.com')
                ->cc('ict.citycollege.cdo@gmail.com')
                ->replyTo($data['email'], $data['name'])
                ->subject($data['subject']);
        });

        Mail::send('emails.contact-auto-reply', [
            ...$data,
            'contactMessage' => $data['message'],
        ], function ($mail) use ($data) {
            $mail->to($data['email'])
                ->subject('We received your message - City College of Cagayan de Oro');
        });

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.',
        ]);
    }
}