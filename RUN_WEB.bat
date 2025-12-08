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
echo    - Browser will auto-open in a moment...
echo.
echo ============================================================
echo.

REM Wait 2 seconds then open browser
timeout /t 2 /nobreak >nul 2>&1
start "" "http://localhost:3000/kit-guide"

REM Run web server
call npm run dev:web

REM If web server stops (Ctrl+C), show message
echo.
echo ============================================================
echo WEB SERVER STOPPED
echo ============================================================
echo.
pause
