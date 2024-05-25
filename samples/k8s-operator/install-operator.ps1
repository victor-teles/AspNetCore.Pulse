$operatorinstallerurl = "https://github.com/victor-teles/AspNetCore.Pulse/raw/main/deploy/operator/installer/releases/"
Write-Host "Downloading Windows Operator Installer"
$file = "operator-installer-win.exe"
Invoke-WebRequest -Uri $($operatorinstallerurl + $file)  -OutFile $file
& "./$file"
