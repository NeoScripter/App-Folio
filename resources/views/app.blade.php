<!DOCTYPE html>
<html class="overflow-x-clip" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <title>Preact + Laravel</title>
    @vite('resources/js/app.jsx')
</head>

<body class="overflow-x-clip">
    <div id="app" class="min-h-screen"></div>
</body>

</html>
