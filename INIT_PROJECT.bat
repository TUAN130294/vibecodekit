@echo off
chcp 65001 >nul
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║       🎯 Universal Kit - Smart Initializer 🎯             ║
echo ║                                                            ║
echo ║         Chọn những gì bạn cần - Bỏ phần thừa!            ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Run the init script
call npm run init

echo.
echo ✅ Initialization complete!
echo.
echo 🚀 Next: Double-click RUN_WEB.bat to start coding
echo.

pause
