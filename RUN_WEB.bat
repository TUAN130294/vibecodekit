@echo off
chcp 65001 >nul 2>&1
title Universal Kit - Run Web Guide
color 0A

echo.
echo ============================================================
echo          UNIVERSAL KIT - RUN WEB GUIDE
echo          Auto setup and run web
echo ============================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download Node.js at: https://nodejs.org/
    echo After installation, run this file again.
    echo.
    pause
    exit /b 1
)

echo Node.js detected
node --version
echo.

REM Check current directory
if not exist "package.json" (
    echo ERROR: package.json not found
    echo Please run this file in the project root directory.
    echo.
    pause
    exit /b 1
)

REM Check node_modules
if not exist "node_modules" (
    echo Installing dependencies - first time may take a few minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo Dependencies already installed
    echo.
)

echo ============================================================
echo STARTING WEB SERVER...
echo ============================================================
echo.
echo Web will run at: http://localhost:3000/kit-guide
echo.
echo TIPS:
echo    - Keep this window open to keep web running
echo    - Press Ctrl+C to stop web server
echo    - Browser will auto-open when server is ready...
echo.
echo ============================================================
echo.

REM Start PowerShell script to wait for server and open browser
start /B powershell -Command "$maxAttempts = 60; $attempt = 0; Write-Host 'Waiting for server to start...' -ForegroundColor Yellow; while ($attempt -lt $maxAttempts) { try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop; if ($response.StatusCode -eq 200) { Write-Host 'Server is ready! Opening browser...' -ForegroundColor Green; Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000/kit-guide'; break; } } catch { $attempt++; if ($attempt -lt $maxAttempts) { Start-Sleep -Seconds 1; } else { Write-Host 'Server did not start in time. Please check manually.' -ForegroundColor Red; } } }"

REM Run web server (this will block until Ctrl+C)
call npm run dev:web

REM If web server stops (Ctrl+C), show message
echo.
echo ============================================================
echo WEB SERVER STOPPED
echo ============================================================
echo.
pause
