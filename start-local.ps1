# Penny — Local Dev Startup Script
# Run from the project root: .\start-local.ps1

Write-Host "Starting Penny backend..." -ForegroundColor Cyan

$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
$env:PATH = "C:\Program Files\Java\jdk-21\bin;$env:PATH"

# Start backend in background
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "& 'C:\Program Files\Java\jdk-21\bin\java.exe' -jar 'F:\penny\backend\target\backend-1.0.0-SNAPSHOT.jar' --spring.datasource.url=jdbc:postgresql://localhost:5432/pennydb --spring.datasource.username=postgres '--spring.datasource.password=1234'"
) -WindowStyle Normal

Write-Host "Backend starting on http://localhost:8080/api" -ForegroundColor Green
Write-Host ""
Write-Host "Starting Penny frontend..." -ForegroundColor Cyan

# Start frontend in background
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location 'F:\penny\frontend'; npm run dev"
) -WindowStyle Normal

Write-Host "Frontend starting on http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "Both services are starting! Open http://localhost:3000 in your browser." -ForegroundColor Yellow
