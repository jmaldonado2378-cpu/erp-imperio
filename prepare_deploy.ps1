Write-Host "Preparing for Deployment..."
git add .
$date = Get-Date -Format "yyyy-MM-dd"
git commit -m "Deploy Prep: $date"
Write-Host "Changes committed. Now pushing..."
git push origin master
