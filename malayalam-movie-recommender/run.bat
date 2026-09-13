@echo off
title Malayalam Movie Roulette 💀
chcp 65001 >nul
cls

echo ====================================================================
echo               MALAYALAM MOVIE ROULETTE 💀
echo ====================================================================
echo.
echo [*] Launching Malayalam Movie Roulette...

python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    netstat -ano | findstr ":8000" >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        start /b python -m http.server 8000 --directory "%~dp0.." >nul 2>&1
        timeout /t 1 /nobreak >nul
    )
    start http://localhost:8000/malayalam-movie-recommender/
) else (
    start "" "%~dp0index.html"
)

echo [OK] Opened in your browser!
timeout /t 3
exit

