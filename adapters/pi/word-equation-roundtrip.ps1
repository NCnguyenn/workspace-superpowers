param([Parameter(Mandatory = $true)][string]$Source, [Parameter(Mandatory = $true)][string]$Edited)
$ErrorActionPreference = 'Stop'
$sw = [Diagnostics.Stopwatch]::StartNew()
function Say($m) { Write-Output ("t=" + $sw.ElapsedMilliseconds + " " + $m) }
$Source = [IO.Path]::GetFullPath($Source)
$Edited = [IO.Path]::GetFullPath($Edited)
$word = $null
$doc = $null
try {
    Say 'com'
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $word.DisplayAlerts = 0
    $word.AutomationSecurity = 3
    Say 'add'
    $doc = $word.Documents.Add()
    $doc.Content.Text = "(x+1)/2=3`ry=4`r"
    $range = $doc.Paragraphs.Item(1).Range
    $range.End = $range.End - 1
    $null = $doc.OMaths.Add($range)
    $doc.OMaths.Item(1).BuildUp()
    $secondRange = $doc.Paragraphs.Item(2).Range
    $secondRange.End = $secondRange.End - 1
    $null = $doc.OMaths.Add($secondRange)
    $doc.OMaths.Item(2).BuildUp()
    $sourceCount = $doc.OMaths.Count
    $doc.SaveAs2($Source, 16)
    $doc.Close(0)
    $doc = $null
    Say ("save count=" + $sourceCount)
    Say 'reopen'
    $doc = $word.Documents.Open($Source, $false, $false)
    $equationRange = $doc.OMaths.Item(1).Range
    $lastCharacter = $doc.Range($equationRange.End - 1, $equationRange.End)
    Say ("rhs=" + $lastCharacter.Text)
    $lastCharacter.Text = '4'
    $doc.SaveAs2($Edited, 16)
    $doc.Close(0)
    $doc = $null
    Say 'reopen edited'
    $doc = $word.Documents.Open($Edited, $false, $true)
    $editedCount = $doc.OMaths.Count
    $doc.Close(0)
    $doc = $null
    Say ("edited count=" + $editedCount)
}
finally {
    if ($null -ne $doc) { try { $doc.Close(0) } catch {} }
    if ($null -ne $word) { try { $word.Quit() } catch {} }
    [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
Say 'done'
