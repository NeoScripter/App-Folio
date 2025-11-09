<!DOCTYPE html>
<html class="overflow-x-clip" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Preload the font --}}
    <link rel="preload" href="{{ asset('fonts/IBMPlexMono-Regular.woff2') }}" as="font" type="font/woff2"
        crossorigin>
    <link rel="preload" href="{{ asset('fonts/IBMPlexMono-Medium.woff2') }}" as="font" type="font/woff2"
        crossorigin>
    <link rel="preload" href="{{ asset('fonts/IBMPlexMono-Bold.woff2') }}" as="font" type="font/woff2"
        crossorigin>


    {{-- Inline @font-face definition --}}
    <style>
        @font-face {
            font-family: 'IBM Plex Mono';
            src: url('{{ asset('fonts/IBMPlexMono-Regular.woff2') }}') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Mono';
            src: url('{{ asset('fonts/IBMPlexMono-Medium.woff2') }}') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
        }

        @font-face {
            font-family: 'IBM Plex Mono';
            src: url('{{ asset('fonts/IBMPlexMono-Bold.woff2') }}') format('woff2');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
        }
    </style>
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.2435 0 0);
        }
    </style>
    {{-- <link rel="preconnect" href="https://fonts.bunny.net"> --}}
    {{-- <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" /> --}}

    <title>Preact + Laravel</title>
    @vite('resources/js/app.tsx')
</head>

<body class="overflow-x-clip">
    <div id="app" class="min-h-screen"></div>
    <div id="portals"></div>
</body>

</html>
