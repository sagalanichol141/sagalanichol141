param([int]$Port = 8000)

$url = "http://localhost:$Port"

Start-Process python -ArgumentList "-m http.server $Port"
Start-Sleep 2
Start-Process $url

Write-Host "Server: $url" -ForegroundColor Cyan
