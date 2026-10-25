# Packages the child theme as dist/vaisselle-antique-child-<version>.zip
# for WordPress → Appearance → Themes → Add New → Upload Theme.
#
#   powershell -ExecutionPolicy Bypass -File .\build-theme-zip.ps1
#
# Uses .NET directly because Compress-Archive on Windows PowerShell 5.1 writes
# backslashes into zip paths, which breaks the theme on Linux web hosts.

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem

$root     = $PSScriptRoot
$themeDir = Join-Path $root 'vaisselle-antique-child'
$version  = (Select-String -Path (Join-Path $themeDir 'style.css') -Pattern '^Version:\s*(\S+)').Matches[0].Groups[1].Value
$distDir  = Join-Path $root 'dist'
$zipPath  = Join-Path $distDir "vaisselle-antique-child-$version.zip"

New-Item -ItemType Directory -Force $distDir | Out-Null
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')
try {
    Get-ChildItem $themeDir -Recurse -File | ForEach-Object {
        $relative = $_.FullName.Substring($themeDir.Length + 1).Replace('\', '/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, "vaisselle-antique-child/$relative") | Out-Null
    }
} finally {
    $zip.Dispose()
}

Write-Host "Built $zipPath"
