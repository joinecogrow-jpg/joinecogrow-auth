Write-Host "=== JoinEcoGrow Setup Verification ===" -ForegroundColor Green
Write-Host ""

# Check package.json
if (Test-Path package.json) {
    Write-Host "✅ package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ package.json missing" -ForegroundColor Red
}

# Check for Next.js
if (Test-Path node_modules\next) {
    Write-Host "✅ Next.js installed" -ForegroundColor Green
} else {
    Write-Host "❌ Next.js not installed" -ForegroundColor Red
}

# Check layout file
if (Test-Path src\app\layout.tsx) {
    Write-Host "✅ layout.tsx exists" -ForegroundColor Green
} else {
    Write-Host "❌ layout.tsx missing" -ForegroundColor Red
}

# Check page file
if (Test-Path src\app\page.tsx) {
    Write-Host "✅ page.tsx exists" -ForegroundColor Green
} else {
    Write-Host "❌ page.tsx missing" -ForegroundColor Red
}

# Check config
if (Test-Path next.config.js) {
    Write-Host "✅ next.config.js exists" -ForegroundColor Green
} else {
    Write-Host "❌ next.config.js missing" -ForegroundColor Red
}

Write-Host ""
Write-Host "Running build test..." -ForegroundColor Yellow
npm run build
