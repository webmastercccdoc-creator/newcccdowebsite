<?php

namespace App\Http\Controllers;

use App\Services\GroqService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SDGController extends Controller
{
    protected $groqService;

    protected $sdgOptions = [
        1 => 'No Poverty',
        2 => 'Zero Hunger',
        3 => 'Good Health and Well-being',
        4 => 'Quality Education',
        5 => 'Gender Equality',
        6 => 'Clean Water and Sanitation',
        7 => 'Affordable and Clean Energy',
        8 => 'Decent Work and Economic Growth',
        9 => 'Industry, Innovation and Infrastructure',
        10 => 'Reduced Inequalities',
        11 => 'Sustainable Cities and Communities',
        12 => 'Responsible Consumption and Production',
        13 => 'Climate Action',
        14 => 'Life Below Water',
        15 => 'Life on Land',
        16 => 'Peace, Justice and Strong Institutions',
        17 => 'Partnerships for the Goals',
    ];

    public function __construct(GroqService $groqService)
    {
        $this->groqService = $groqService;
    }

    public function suggestSDGs(Request $request)
    {
        try {
            $request->validate([
                'title' => 'nullable|string|max:1000',
                'content' => 'nullable|string',
            ]);

            $title = $request->input('title', '');
            $content = $request->input('content', '');

            // Clean the text
            $title = $this->cleanText($title);
            $content = $this->cleanText($content);

            if (empty($title) && empty($content)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Title or content is required',
                    'sdgs' => [],
                ], 400);
            }

            // Try Groq first
            if ($this->groqService->isConfigured()) {
                $result = $this->callGroqAPI($title, $content);
                if ($result['success'] && !empty($result['sdgs'])) {
                    return $this->formatResponse($result['sdgs']);
                }
            }

            // Fallback to keyword matching
            return $this->fallbackKeywordMatching($title, $content);

        } catch (\Exception $e) {
            Log::error('SDG suggestion error: ' . $e->getMessage());
            
            try {
                return $this->fallbackKeywordMatching(
                    $request->input('title', ''),
                    $request->input('content', '')
                );
            } catch (\Exception $fallbackError) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to analyze content',
                    'sdgs' => [],
                ], 500);
            }
        }
    }

    protected function cleanText($text)
    {
        if (empty($text)) {
            return $text;
        }

        // Remove special unicode characters
        $text = preg_replace('/[\x{1D400}-\x{1D7FF}]/u', '', $text);
        $text = preg_replace('/[\x{2000}-\x{206F}]/u', ' ', $text);
        $text = preg_replace('/[\x{1F000}-\x{1FFFF}]/u', '', $text);
        $text = preg_replace('/[\x{FE00}-\x{FEFF}]/u', '', $text);
        $text = preg_replace('/[\x{200B}-\x{200D}]/u', '', $text);
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        $text = preg_replace('/\s+/', ' ', $text);
        $text = trim($text);
        
        return $text;
    }

    protected function callGroqAPI($title, $content)
    {
        try {
            $prompt = $this->buildPrompt($title, $content);

            $response = $this->groqService->chat([
                [
                    'role' => 'system',
                    'content' => 'You are an expert in Sustainable Development Goals (SDGs). Analyze text and determine which SDGs are most relevant. Return ONLY valid JSON.',
                ],
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ]);

            $content = $response['choices'][0]['message']['content'] ?? '[]';
            $sdgs = $this->parseGroqResponse($content);
            
            return [
                'success' => true,
                'sdgs' => $sdgs,
            ];

        } catch (\Exception $e) {
            Log::error('Groq API call error: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    protected function buildPrompt($title, $content)
    {
        $sdgList = '';
        foreach ($this->sdgOptions as $number => $name) {
            $sdgList .= "{$number}: {$name}\n";
        }

        return "
Analyze the following article and identify which Sustainable Development Goals (SDGs) it relates to.

Article Title: " . ($title ?: 'No title provided') . "
Article Content: " . ($content ?: 'No content provided') . "

SDGs:
{$sdgList}

IMPORTANT GUIDELINES FOR THIS SPECIFIC CONTENT:
- If the article mentions education, schools, universities, colleges, programs, certification, quality assurance, or academic standards → SDG 4 (Quality Education)
- If the article mentions government, regulatory bodies, laws, compliance, certification, institutions → SDG 16 (Peace, Justice and Strong Institutions)
- If the article mentions employment, jobs, workforce, office administration, skills, or professional development → SDG 8 (Decent Work and Economic Growth)
- If the article mentions partnerships, collaboration, or cooperation → SDG 17 (Partnerships for the Goals)
- If the article mentions gender, women, or equality → SDG 5 (Gender Equality)

Return a JSON object with the following structure:
{
    \"sdgs\": [
        {
            \"number\": 1,
            \"confidence\": 0.85,
            \"reasoning\": \"Brief explanation\"
        }
    ]
}

Rules:
1. Include SDGs with confidence >= 0.4 (LOW THRESHOLD)
2. Return ALL relevant SDGs, not just the top one
3. Maximum of 6 SDGs
4. Return ONLY the JSON object
";
    }

    protected function parseGroqResponse($responseContent)
    {
        try {
            $cleanedContent = $this->cleanJsonResponse($responseContent);
            $data = json_decode($cleanedContent, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Failed to parse Groq response', [
                    'content' => $responseContent,
                    'error' => json_last_error_msg(),
                ]);
                return [];
            }

            $sdgs = [];
            if (isset($data['sdgs']) && is_array($data['sdgs'])) {
                $sdgs = $data['sdgs'];
            } elseif (isset($data['results']) && is_array($data['results'])) {
                $sdgs = $data['results'];
            } elseif (is_array($data) && !isset($data['sdgs'])) {
                foreach ($data as $key => $value) {
                    if (is_array($value) && isset($value[0]['number'])) {
                        $sdgs = $value;
                        break;
                    }
                }
            }

            return $this->validateSDGs($sdgs);

        } catch (\Exception $e) {
            Log::error('Error parsing Groq response: ' . $e->getMessage());
            return [];
        }
    }

    protected function cleanJsonResponse($response)
    {
        $response = preg_replace('/```json\s*/', '', $response);
        $response = preg_replace('/```\s*/', '', $response);
        
        if (preg_match('/\{.*\}/s', $response, $matches)) {
            $response = $matches[0];
        }
        
        return trim($response);
    }

    protected function validateSDGs($sdgs)
    {
        $validated = [];
        $uniqueNumbers = [];
        
        foreach ($sdgs as $sdg) {
            if (!isset($sdg['number']) && !isset($sdg['sdg_number'])) {
                continue;
            }
            
            $number = $sdg['number'] ?? $sdg['sdg_number'] ?? null;
            $number = (int) $number;
            
            if ($number < 1 || $number > 17) {
                continue;
            }
            
            // Skip duplicates
            if (in_array($number, $uniqueNumbers)) {
                continue;
            }
            
            $confidence = $sdg['confidence'] ?? $sdg['score'] ?? 0.5;
            $confidence = (float) $confidence;
            
            // VERY LOW THRESHOLD - 0.2
            if ($confidence < 0.2) {
                continue;
            }
            
            $uniqueNumbers[] = $number;
            $validated[] = [
                'number' => $number,
                'confidence' => round($confidence, 2),
                'reasoning' => $sdg['reasoning'] ?? $sdg['explanation'] ?? null,
            ];
        }
        
        usort($validated, function ($a, $b) {
            return $b['confidence'] <=> $a['confidence'];
        });
        
        // Return up to 6 SDGs
        return array_slice($validated, 0, 6);
    }

    protected function fallbackKeywordMatching($title, $content)
    {
        $combinedText = strtolower($title . ' ' . $content);
        
        Log::info('Fallback searching in text:', [
            'text_length' => strlen($combinedText),
            'text_preview' => substr($combinedText, 0, 200)
        ]);
        
        // Enhanced keywords with more specific terms for your article
        $sdgKeywords = [
            1 => ['poverty', 'poor', 'income', 'livelihood', 'social protection', 'vulnerable', 'economic inclusion', 'community', 'social', 'development', 'rural'],
            2 => ['hunger', 'food', 'agriculture', 'farming', 'nutrition', 'malnutrition', 'food security', 'crop', 'farm', 'harvest'],
            3 => ['health', 'healthcare', 'medical', 'disease', 'wellness', 'mental health', 'hospital', 'vaccine', 'pandemic', 'well-being'],
            4 => ['education', 'school', 'learning', 'teacher', 'student', 'literacy', 'knowledge', 'training', 'skill', 'technical', 'technology', 'institute', 'university', 'college', 'program', 'academic', 'certificate', 'compliance', 'quality education', 'higher education', 'commission on higher education', 'ched'],
            5 => ['gender', 'women', 'girl', 'female', 'equality', 'empowerment', 'sexism', 'patriarchy', 'feminism', 'woman', 'womens'],
            6 => ['water', 'sanitation', 'clean water', 'hygiene', 'toilet', 'sewage', 'drinking water', 'water quality', 'wastewater'],
            7 => ['energy', 'electricity', 'renewable', 'solar', 'wind', 'power', 'clean energy', 'fuel', 'grid', 'battery'],
            8 => ['economy', 'employment', 'job', 'work', 'labor', 'business', 'growth', 'sustainable development', 'decent work', 'office administration', 'professional', 'workforce', 'career', 'employment'],
            9 => ['industry', 'innovation', 'infrastructure', 'technology', 'research', 'development', 'engineering', 'manufacturing', 'technical', 'science'],
            10 => ['inequality', 'equal', 'discrimination', 'marginalized', 'inclusion', 'social justice', 'equity', 'fair', 'unfair'],
            11 => ['city', 'urban', 'community', 'housing', 'transport', 'public space', 'sustainable city', 'urbanization', 'community development', 'neighborhood'],
            12 => ['consumption', 'production', 'waste', 'recycle', 'sustainable', 'circular economy', 'supply chain', 'reduce', 'reuse'],
            13 => ['climate', 'climate change', 'global warming', 'emission', 'carbon', 'greenhouse', 'weather', 'environment', 'temperature', 'carbon footprint'],
            14 => ['ocean', 'marine', 'sea', 'coral', 'fishery', 'aquatic', 'underwater', 'coastal', 'marine life', 'fish'],
            15 => ['forest', 'land', 'biodiversity', 'ecosystem', 'wildlife', 'conservation', 'habitat', 'deforestation', 'trees', 'nature'],
            16 => ['peace', 'justice', 'institution', 'corruption', 'governance', 'rule of law', 'security', 'conflict', 'democracy', 'human rights', 'regulatory', 'compliance', 'government', 'commission', 'certificate', 'law', 'republic act', 'quality assessment', 'regional office', 'institutional'],
            17 => ['partnership', 'collaboration', 'cooperation', 'alliance', 'global partnership', 'multi-stakeholder', 'team', 'project team', 'extension services', 'partners', 'stakeholder', 'collaboration'],
        ];

        $matchedSDGs = [];
        
        foreach ($sdgKeywords as $number => $keywords) {
            $score = 0;
            $matchedTerms = [];
            
            foreach ($keywords as $keyword) {
                if (strpos($combinedText, $keyword) !== false) {
                    $weight = strpos($keyword, ' ') !== false ? 2 : 1;
                    $score += $weight;
                    $matchedTerms[] = $keyword;
                }
            }
            
            // Very low threshold - 0.5 (any match)
            if ($score >= 0.5) {
                Log::info("SDG {$number} matched with score {$score}", ['terms' => $matchedTerms]);
                
                // Calculate confidence based on number of matches
                $confidence = min(1, 0.4 + ($score * 0.1));
                $confidence = round($confidence, 2);
                
                $matchedSDGs[] = [
                    'number' => $number,
                    'confidence' => $confidence,
                    'reasoning' => "Matched keywords: " . implode(', ', array_slice($matchedTerms, 0, 4)),
                ];
            }
        }

        // Ensure SDG 4 is always included if there's any education content
        $hasEducation = strpos($combinedText, 'education') !== false || 
                       strpos($combinedText, 'college') !== false || 
                       strpos($combinedText, 'university') !== false ||
                       strpos($combinedText, 'academic') !== false ||
                       strpos($combinedText, 'program') !== false ||
                       strpos($combinedText, 'ched') !== false ||
                       strpos($combinedText, 'higher education') !== false;
        
        if ($hasEducation) {
            $foundSDG4 = false;
            foreach ($matchedSDGs as $sdg) {
                if ($sdg['number'] === 4) {
                    $foundSDG4 = true;
                    // Boost confidence if it was found
                    $sdg['confidence'] = min(1, $sdg['confidence'] + 0.2);
                    break;
                }
            }
            if (!$foundSDG4) {
                $matchedSDGs[] = [
                    'number' => 4,
                    'confidence' => 0.80,
                    'reasoning' => "Education-related content detected",
                ];
            }
        }

        // Ensure SDG 16 is included for any government/regulatory content
        $hasGovernment = strpos($combinedText, 'government') !== false || 
                        strpos($combinedText, 'commission') !== false ||
                        strpos($combinedText, 'regulation') !== false ||
                        strpos($combinedText, 'compliance') !== false ||
                        strpos($combinedText, 'certificate') !== false ||
                        strpos($combinedText, 'law') !== false ||
                        strpos($combinedText, 'republic act') !== false ||
                        strpos($combinedText, 'institutional') !== false;
        
        if ($hasGovernment) {
            $foundSDG16 = false;
            foreach ($matchedSDGs as $sdg) {
                if ($sdg['number'] === 16) {
                    $foundSDG16 = true;
                    $sdg['confidence'] = min(1, $sdg['confidence'] + 0.2);
                    break;
                }
            }
            if (!$foundSDG16) {
                $matchedSDGs[] = [
                    'number' => 16,
                    'confidence' => 0.75,
                    'reasoning' => "Government/regulatory content detected",
                ];
            }
        }

        // Ensure SDG 8 is included for any work/employment content
        $hasWork = strpos($combinedText, 'office administration') !== false || 
                   strpos($combinedText, 'employment') !== false ||
                   strpos($combinedText, 'work') !== false ||
                   strpos($combinedText, 'professional') !== false ||
                   strpos($combinedText, 'career') !== false ||
                   strpos($combinedText, 'workforce') !== false;
        
        if ($hasWork) {
            $foundSDG8 = false;
            foreach ($matchedSDGs as $sdg) {
                if ($sdg['number'] === 8) {
                    $foundSDG8 = true;
                    $sdg['confidence'] = min(1, $sdg['confidence'] + 0.2);
                    break;
                }
            }
            if (!$foundSDG8) {
                $matchedSDGs[] = [
                    'number' => 8,
                    'confidence' => 0.70,
                    'reasoning' => "Work/employment related content detected",
                ];
            }
        }

        // Sort by confidence
        usort($matchedSDGs, function ($a, $b) {
            return $b['confidence'] <=> $a['confidence'];
        });
        
        // Remove duplicates
        $unique = [];
        $seen = [];
        foreach ($matchedSDGs as $sdg) {
            if (!in_array($sdg['number'], $seen)) {
                $seen[] = $sdg['number'];
                $unique[] = $sdg;
            }
        }
        
        $matchedSDGs = array_slice($unique, 0, 6);

        Log::info('Fallback result:', ['sdgs' => $matchedSDGs]);

        return $this->formatResponse($matchedSDGs);
    }

    protected function formatResponse($sdgs)
    {
        if (empty($sdgs)) {
            return response()->json([
                'success' => true,
                'message' => 'No SDGs detected in the content',
                'sdgs' => [],
                'count' => 0,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'SDGs detected successfully',
            'sdgs' => $sdgs,
            'count' => count($sdgs),
        ]);
    }
}