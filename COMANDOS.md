# Comandos Prontos - PWA

Este arquivo contem comandos prontos para copiar e colar.

## Testar Localmente

### Iniciar servidor Python
```bash
python -m http.server 8000
```

### Iniciar servidor Node.js
```bash
npx http-server -p 8000
```

### Iniciar servidor PHP
```bash
php -S localhost:8000
```

## Publicar no GitHub

### Verificar status
```bash
git status
```

### Adicionar todos os arquivos
```bash
git add .
```

### Commit com mensagem descritiva
```bash
git commit -m "Implementar PWA com Service Worker, manifest e icones para instalacao mobile"
```

### Push para GitHub
```bash
git push origin main
```

### Ver historico de commits
```bash
git log --oneline -5
```

## Verificar Arquivos

### Listar arquivos que serao commitados
```bash
git diff --cached --name-only
```

### Verificar se config.js esta ignorado
```bash
git check-ignore config.js
```
Deve retornar: config.js

### Ver todos os arquivos do projeto
```bash
ls -la
```

### Ver apenas arquivos PWA
```bash
ls manifest.json sw.js icons/
```

## Validar JSON

### Validar manifest.json (PowerShell)
```powershell
Get-Content manifest.json | ConvertFrom-Json | ConvertTo-Json
```

### Validar manifest.json (Node.js)
```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('manifest.json')))"
```

## DevTools - URLs Uteis

### Abrir DevTools
```
F12 ou Ctrl+Shift+I
```

### Application > Manifest
Verifica configuracao do PWA

### Application > Service Workers
Verifica status do SW

### Application > Cache Storage
Verifica arquivos em cache

### Lighthouse
Gera relatorio de qualidade PWA

## URLs de Acesso

### Local
```
http://localhost:8000
```

### GitHub Pages (ajuste para seu usuario/repositorio)
```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

## Limpar Cache (DevTools)

### Desregistrar Service Worker
Application > Service Workers > Unregister

### Limpar todo o storage
Application > Clear storage > Clear site data

### Forcar reload sem cache
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

## Testar Instalacao

### Chrome Desktop
1. Acesse o app
2. Clique no icone + na barra de endereco
3. Confirme "Instalar"

### Chrome Android
1. Acesse o app
2. Banner aparece automaticamente
3. Ou Menu > "Adicionar a tela inicial"

### Safari iOS
1. Acesse o app
2. Botao compartilhar (quadrado com seta)
3. "Adicionar a Tela de Inicio"

## Atualizar Cache

### Incrementar versao no sw.js
Altere de:
```javascript
const CACHE_VERSION = 'loteria-cache-v1';
```

Para:
```javascript
const CACHE_VERSION = 'loteria-cache-v2';
```

## Troubleshooting

### Service Worker nao registra
```javascript
// Abra console (F12) e execute:
navigator.serviceWorker.getRegistrations().then(regs => console.log(regs))
```

### Ver erros do Service Worker
```javascript
// Console do Service Worker:
chrome://serviceworker-internals/
```

### Forcar atualizacao do Service Worker
```
DevTools > Application > Service Workers > Update
```

## Informacoes do Sistema

### Ver versao do Python
```bash
python --version
```

### Ver versao do Node
```bash
node --version
```

### Ver versao do Git
```bash
git --version
```

### Ver IP local (Windows)
```bash
ipconfig
```

### Ver IP local (Mac/Linux)
```bash
ifconfig
```

## GitHub Pages

### URL padrao
```
https://USUARIO.github.io/REPOSITORIO/
```

### Configurar (via web)
1. Settings
2. Pages
3. Source: main
4. Save

### Configurar (via gh-pages branch)
```bash
git checkout -b gh-pages
git push origin gh-pages
```

## Backup

### Criar backup do projeto
```bash
git archive --format=zip --output=backup.zip HEAD
```

### Clonar repositorio
```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```

## Utilitarios

### Contar linhas de codigo
```bash
find . -name "*.js" -o -name "*.html" -o -name "*.css" | xargs wc -l
```

### Buscar texto em arquivos
```bash
grep -r "serviceWorker" .
```

### Ver tamanho dos arquivos
```bash
du -sh *
```

## Dicas Rapidas

- Use Ctrl+C para parar o servidor local
- Use git status antes de commit
- Teste localmente antes de push
- Incremente versao do cache ao atualizar
- HTTPS e obrigatorio para PWA em producao
- config.js NUNCA deve ser commitado

