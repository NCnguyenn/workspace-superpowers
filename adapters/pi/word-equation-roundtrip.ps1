param([string]$Source,[string]$Edited)
$ErrorActionPreference = 'Stop'
$sw = [Diagnostics.Stopwatch]::StartNew()
function Say($m) { Write-Output ("t=" + $sw.ElapsedMilliseconds + " " + $m) }
Say 'com'
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
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
Say ("save count=" + $doc.OMaths.Count)
$doc.SaveAs2($Source, 16)
$doc.Close(0)
Say 'reopen'
$doc = $word.Documents.Open($Source, $false, $false)
$equationRange = $doc.OMaths.Item(1).Range
$lastCharacter = $doc.Range($equationRange.End - 1, $equationRange.End)
Say ("rhs=" + $lastCharacter.Text)
$lastCharacter.Text = '4'
$doc.SaveAs2($Edited, 16)
$doc.Close(0)
Say 'reopen edited'
$doc = $word.Documents.Open($Edited, $false, $true)
Say ("edited count=" + $doc.OMaths.Count)
$doc.Close(0)
$word.Quit()
Say 'done'
