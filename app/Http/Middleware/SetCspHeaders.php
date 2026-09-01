<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetCspHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // In development, disable strict CSP to allow Vite dev server
        if (app()->environment('local', 'development')) {
            // Don't set CSP in development - Vite dev server needs flexibility
            // Use report-only mode instead
            $csp = "default-src 'self' http: ws:; "
                . "script-src 'self' 'unsafe-inline' 'unsafe-eval' http: ws:; "
                . "style-src 'self' 'unsafe-inline' https: http:; "
                . "img-src 'self' data: https: http:; "
                . "font-src 'self' https: http: data:; "
                . "connect-src 'self' http: https: ws: wss:;";
            
            // Use report-only in development
            $response->header('Content-Security-Policy-Report-Only', $csp);
        } else {
            // In production, use strict CSP
            $csp = "default-src 'self'; "
                . "script-src 'self'; "
                . "style-src 'self' 'unsafe-inline' https://fonts.bunny.net; "
                . "img-src 'self' data: https:; "
                . "font-src 'self' https://fonts.bunny.net; "
                . "connect-src 'self';";
            
            $response->header('Content-Security-Policy', $csp);
        }

        return $response;
    }
}
