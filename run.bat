@echo off
title Malayalam Movie Roulette 💀
chcp 65001 >nul
cls

echo ====================================================================
echo               MALAYALAM MOVIE ROULETTE 💀
echo   "Because apparently your taste in movies wasn't bad enough."
echo ====================================================================
echo.
echo [*] Checking local environment...

:: Check if Python is available
python --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Python detected. Starting local server...
    
    :: Check if port 8000 is already active
    netstat -ano | findstr ":8000" >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [*] Server is already running on port 8000.
    ) else (
        echo [*] Launching server on http://localhost:8000...
        start /b python -m http.server 8000 >nul 2>&1
        timeout /t 1 /nobreak >nul
    )
    
    echo [*] Opening Malayalam Movie Roulette in your default browser...
    start http://localhost:8000/
) else (
    echo [!] Python not found on PATH.
    echo [*] Launching standalone version directly in your browser...
    start "" "%~dp0malayalam-movie-recommender\index.html"
)

echo.
echo ====================================================================
echo  [OK] App launched! You may keep this window open or close it.
echo ====================================================================
echo.
timeout /t 4
exit

