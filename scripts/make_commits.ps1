Param(
    [int]$count = 99,
    [string]$filePath = "contribution-bump.txt"
)

# Get current branch
$branch = (git rev-parse --abbrev-ref HEAD) -replace "\r|\n",""
Write-Host "Current branch: $branch"

if (-not (Test-Path $filePath)) {
    "Contribution bump log" | Out-File -FilePath $filePath -Encoding UTF8
}

for ($i = 1; $i -le $count; $i++) {
    $line = "$(Get-Date -Format o) - bump $i"
    Add-Content -Path $filePath -Value $line
    git add $filePath
    $msg = "Contribution bump $i"
    git commit -m $msg 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Commit $i failed or no changes to commit." -ForegroundColor Yellow
    } else {
        Write-Host "Committed: $msg"
    }
}

Write-Host "Pushing $count commits to origin/$branch..."
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "Push completed." -ForegroundColor Green
} else {
    Write-Host "Push failed. Please check remote settings." -ForegroundColor Red
}
