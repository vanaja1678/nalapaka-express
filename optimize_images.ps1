Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param([string]$path)
    
    try {
        $img = [System.Drawing.Image]::FromFile($path)
        
        # Calculate new dimensions (max width 800px)
        $newWidth = 800
        if ($img.Width -lt 800) { $newWidth = $img.Width }
        $newHeight = [int]($img.Height * ($newWidth / $img.Width))
        
        # Resize
        $resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graph = [System.Drawing.Graphics]::FromImage($resized)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
        
        # Save as JPEG with 75 quality
        $quality = 75
        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        
        $newPath = $path -replace '\.png$', '.jpg'
        $resized.Save($newPath, $jpegCodec, $encoderParams)
        
        # Cleanup
        $img.Dispose()
        $resized.Dispose()
        $graph.Dispose()
        
        Write-Host "Optimized: $newPath"
    } catch {
        Write-Error "Failed to optimize $path : $_"
    }
}

Get-ChildItem "assets/*.png" | ForEach-Object {
    Optimize-Image $_.FullName
}
