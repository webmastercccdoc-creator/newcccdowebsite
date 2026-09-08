<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GroqService
{
    protected $apiKey;
    protected $endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    protected $model = 'mixtral-8x7b-32768';

    public function __construct()
    {
        $this->apiKey = env('GROQ_API_KEY');
    }

    /**
     * Check if Groq is configured
     *
     * @return bool
     */
    public function isConfigured()
    {
        return !empty($this->apiKey);
    }

    /**
     * Send a chat completion request to Groq
     *
     * @param array $messages
     * @param array $options
     * @return array
     */
    public function chat($messages, $options = [])
    {
        try {
            if (!$this->isConfigured()) {
                throw new \Exception('GROQ_API_KEY is not configured');
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->endpoint, array_merge([
                'messages' => $messages,
                'model' => $this->model,
                'temperature' => 0.3,
                'max_tokens' => 500,
            ], $options));

            if (!$response->successful()) {
                Log::error('Groq API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                throw new \Exception('Groq API request failed with status ' . $response->status());
            }

            return $response->json();

        } catch (\Exception $e) {
            Log::error('Groq service error: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get the available models
     *
     * @return array
     */
    public function getModels()
    {
        return [
            'mixtral-8x7b-32768',
            'llama2-70b-4096',
            'gemma-7b-it',
        ];
    }

    /**
     * Get API key status
     *
     * @return array
     */
    public function getStatus()
    {
        return [
            'configured' => $this->isConfigured(),
            'api_key_set' => !empty($this->apiKey),
            'model' => $this->model,
        ];
    }
}