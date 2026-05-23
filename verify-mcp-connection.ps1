#!/usr/bin/env powershell
# Script para verificar e registrar evidência de conexão ao MCP do GitHub
# Uso: ./verify-mcp-connection.ps1

$timestamp = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
$mcpConfigPath = "$env:APPDATA\Code\User\mcp.json"
$logFile = "./mcp-verification-log-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"

Write-Host "[*] Verificando Conexao ao MCP do GitHub..." -ForegroundColor Cyan
Write-Host "Timestamp: $timestamp" -ForegroundColor Gray
Write-Host ""

# Função para registrar no log
function Log-Message {
    param([string]$message, [string]$level = "INFO")
    $prefix = switch ($level) {
        "SUCCESS" { "[OK]" }
        "ERROR" { "[ERRO]" }
        "WARNING" { "[AVISO]" }
        default { "[INFO]" }
    }
    
    $logEntry = "$timestamp [$level] $message"
    Add-Content -Path $logFile -Value $logEntry
    Write-Host "$prefix $message" -ForegroundColor $(switch($level) { "SUCCESS" {"Green"}; "ERROR" {"Red"}; "WARNING" {"Yellow"}; default {"White"} })
}

# 1. Verificar arquivo de configuração MCP
Log-Message "Verificando arquivo de configuracao MCP..."
if (Test-Path $mcpConfigPath) {
    Log-Message "Arquivo MCP encontrado: $mcpConfigPath" "SUCCESS"
    
    try {
        $mcpConfig = Get-Content $mcpConfigPath -Raw | ConvertFrom-Json
        $serverName = $mcpConfig.servers | Get-Member -MemberType NoteProperty | Select-Object -First 1 -ExpandProperty Name
        Log-Message "Servidor MCP configurado: $serverName" "SUCCESS"
        
        if ($mcpConfig.servers.$serverName.url) {
            Log-Message "URL do endpoint: $($mcpConfig.servers.$serverName.url)" "SUCCESS"
        }
        
        if ($mcpConfig.servers.$serverName.version) {
            Log-Message "Versao do servidor: $($mcpConfig.servers.$serverName.version)" "SUCCESS"
        }
    }
    catch {
        Log-Message "Erro ao processar configuracao MCP: $_" "ERROR"
    }
}
else {
    Log-Message "Arquivo MCP nao encontrado!" "ERROR"
}

Write-Host ""

# 2. Verificar diretório de instalação do MCP
Log-Message "Verificando instalacao do servidor MCP..."
$mcpDir = "$env:APPDATA\Code\User\mcp"
if (Test-Path $mcpDir) {
    Log-Message "Diretorio MCP encontrado" "SUCCESS"
    
    $installedServers = Get-ChildItem -Path $mcpDir -Directory
    foreach ($server in $installedServers) {
        Log-Message "Servidor instalado: $($server.Name)" "SUCCESS"
    }
}
else {
    Log-Message "Diretorio MCP nao encontrado" "ERROR"
}

Write-Host ""

# 3. Verificar sincronização
Log-Message "Verificando sincronizacao MCP..."
$syncPath = "$env:APPDATA\Code\User\sync\mcp\lastSyncmcp.json"
if (Test-Path $syncPath) {
    $lastSync = (Get-Item $syncPath).LastWriteTime
    Log-Message "Ultima sincronizacao: $($lastSync.ToString('dd/MM/yyyy HH:mm:ss'))" "SUCCESS"
}
else {
    Log-Message "Arquivo de sincronizacao nao encontrado (pode ser a primeira vez)" "WARNING"
}

Write-Host ""

# 4. Verificar GitHub Copilot
Log-Message "Verificando extensao GitHub Copilot..."
$copilotDir = "$env:APPDATA\Code\User\globalStorage\github.copilot-chat"
if (Test-Path $copilotDir) {
    Log-Message "GitHub Copilot Chat instalado" "SUCCESS"
}
else {
    Log-Message "GitHub Copilot Chat nao encontrado" "ERROR"
}

Write-Host ""
Log-Message "Verificacao concluida. Relatorio salvo em: $logFile" "SUCCESS"
Write-Host ""
Write-Host "[*] Resumo da Verificacao" -ForegroundColor Cyan
Write-Host "========================="
Get-Content $logFile | Where-Object { $_ -match "SUCCESS" } | Measure-Object | Select-Object -ExpandProperty Count | ForEach-Object { Write-Host "Itens verificados com sucesso: $_" -ForegroundColor Green }
Get-Content $logFile | Where-Object { $_ -match "ERROR" } | Measure-Object | Select-Object -ExpandProperty Count | ForEach-Object { if ($_ -gt 0) { Write-Host "Erros encontrados: $_" -ForegroundColor Red } }

Write-Host ""
Write-Host "[*] Log completo salvo em: $logFile" -ForegroundColor Gray
