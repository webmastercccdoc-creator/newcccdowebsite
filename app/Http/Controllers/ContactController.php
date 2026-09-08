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

        Mail::raw(
            "Name: {$data['name']}\n" .
            "Company: " . ($data['company'] ?: 'Not provided') . "\n" .
            "Phone: {$data['phone']}\n" .
            "Email: {$data['email']}\n\n" .
            "Message:\n{$data['message']}",
            function ($mail) use ($data) {
                $mail->to(env('CONTACT_TO_ADDRESS'))
                    ->replyTo($data['email'], $data['name'])
                    ->subject($data['subject']);
            }
        );

        return response()->json([
            'success' => true,
            'message' => 'Message sent successfully.',
        ]);
    }
}