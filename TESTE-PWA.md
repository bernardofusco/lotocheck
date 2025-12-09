# Guia de Teste do PWA

Este guia mostra como testar o PWA localmente antes de publicar no GitHub Pages.

## Passo 1: Configurar o Token

Antes de testar, configure o token da API:

1. Copie `config.example.js` para `config.js`
2. Adicione seu token da API no arquivo `config.js`

## Passo 2: Iniciar um Servidor Local

O PWA precisa ser servido via HTTP/HTTPS. Escolha uma das opcoes:

### Opcao A: Python (mais simples)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opcao B: Node.js

```bash
npx http-server -p 8000
```

### Opcao C: PHP

```bash
php -S localhost:8000
```

### Opcao D: Visual Studio Code

1. Instale a extensao "Live Server"
2. Clique com botao direito em `index.html`
3. Selecione "Open with Live Server"

## Passo 3: Acessar o Aplicativo

Abra o navegador e acesse:
```
http://localhost:8000
```

## Passo 4: Verificar o PWA no Chrome DevTools

1. Abra o Chrome DevTools (F12)
2. Va para a aba **Application**
3. Verifique as seguintes secoes:

### Manifest
- Deve mostrar o nome "Consulta Loterias"
- Deve exibir os dois icones (192x192 e 512x512)
- Theme color: #667eea
- Display: standalone

### Service Workers
- Deve aparecer "sw.js" com status "activated and running"
- Se nao aparecer, recarregue a pagina (Ctrl+F5)

### Cache Storage
- Deve aparecer "loteria-cache-v1"
- Ao expandir, deve mostrar os arquivos cacheados:
  - index.html
  - styles.css
  - app.js
  - config.js
  - manifest.json
  - icon-192.png
  - icon-512.png

## Passo 5: Testar a Instalacao

### No Desktop (Chrome/Edge)

1. Procure o icone de instalacao na barra de endereco (sinal de + ou computador)
2. Clique nele
3. Confirme "Instalar"
4. O app abrira em uma janela separada
5. Verifique se aparece no menu Iniciar/Aplicativos

### No Mobile (Android Chrome)

1. Abra o app no celular usando o IP local:
   ```
   http://SEU-IP-LOCAL:8000
   ```
   (Para descobrir seu IP: `ipconfig` no Windows ou `ifconfig` no Mac/Linux)

2. Deve aparecer um banner "Adicionar a tela inicial"
3. Ou abra o menu (tres pontinhos) > "Instalar aplicativo"
4. Confirme a instalacao
5. Verifique se o icone aparece na tela inicial

## Passo 6: Testar Funcionalidades

### Teste Basico
1. Digite "megasena" no campo de loteria
2. Digite "5" no campo de quantidade
3. Clique em "Buscar Resultados"
4. Verifique se os resultados aparecem
5. Verifique se as estatisticas sao exibidas

### Teste de Cache
1. Com o app aberto, abra DevTools
2. Va em Application > Service Workers
3. Marque "Offline"
4. Recarregue a pagina (F5)
5. A interface deve carregar normalmente
6. Tente fazer uma consulta (vai falhar - esperado, pois a API precisa de internet)

### Teste de Atualizacao
1. Faca uma alteracao pequena no codigo (ex: mude um texto)
2. Salve o arquivo
3. No DevTools > Application > Service Workers
4. Clique em "Update"
5. Recarregue a pagina
6. A alteracao deve aparecer

## Passo 7: Testar com Lighthouse

1. Abra DevTools (F12)
2. Va para a aba **Lighthouse**
3. Selecione:
   - Device: Mobile
   - Categories: Progressive Web App
4. Clique em "Generate report"
5. Aguarde a analise
6. Verifique a pontuacao (deve ser 90+)

### Checklist do Lighthouse

O PWA deve passar nos seguintes criterios:
- [x] Pagina carrega rapido mesmo em 3G
- [x] Registra um service worker
- [x] Responde com 200 quando offline
- [x] Configurado para tela inicial (manifest)
- [x] Define uma cor de tema
- [x] Fornece icones validos
- [x] Tem viewport configurado para mobile
- [x] Tem conteudo dimensionado corretamente

## Passo 8: Verificar Erros Comuns

### Service Worker nao registra
- Verifique o console (F12) por erros
- Confirme que o caminho para `sw.js` esta correto
- Verifique se esta usando HTTP ou HTTPS (nao file://)

### Icones nao aparecem
- Confirme que os arquivos existem em `icons/`
- Verifique os caminhos no `manifest.json`
- Abra os icones direto no navegador para testar

### Cache nao funciona
- Limpe o cache do navegador
- Desregistre o service worker no DevTools
- Recarregue a pagina com Ctrl+Shift+R

### Prompt de instalacao nao aparece
- Alguns navegadores tem criterios especificos
- Tente acessar o site pelo menos 2 vezes
- Espere alguns segundos apos o carregamento

## Passo 9: Preparar para Producao

Antes de publicar no GitHub Pages:

1. **Verifique o .gitignore**
   - `config.js` deve estar na lista de ignorados
   - Arquivos do PWA devem estar permitidos

2. **Teste todos os caminhos**
   - Todos os caminhos devem ser relativos (`./`)
   - Nao use caminhos absolutos (`/`)

3. **Incremente versoes se necessario**
   - Se fez mudancas, atualize CACHE_VERSION no sw.js

4. **Commit e push**
   ```bash
   git add .
   git commit -m "Adicionar suporte a PWA"
   git push
   ```

5. **Configure GitHub Pages**
   - Settings > Pages
   - Source: main branch
   - Salvar

6. **Teste no celular**
   - Acesse via HTTPS: `https://usuario.github.io/repositorio/`
   - Instale o PWA
   - Teste todas as funcionalidades

## Resolucao de Problemas

### Erro: "Failed to register service worker"
- Verifique se o arquivo sw.js existe
- Confirme que nao ha erros de sintaxe no sw.js
- Teste em modo anonimo

### Erro: "Manifest não encontrado"
- Verifique se manifest.json existe
- Confirme o link no index.html
- Valide o JSON em jsonlint.com

### Cache desatualizado
- Incremente CACHE_VERSION no sw.js
- Ou limpe manualmente em DevTools > Application > Clear storage

### PWA nao aparece na tela inicial
- Alguns navegadores/sistemas tem limitacoes
- Safari iOS requer adicao manual
- Firefox pode nao mostrar prompt

## Recursos Adicionais

- Chrome DevTools: https://developer.chrome.com/docs/devtools/
- PWA Checklist: https://web.dev/pwa-checklist/
- Service Worker Cookbook: https://serviceworke.rs/
- Manifest Generator: https://www.simicart.com/manifest-generator.html/

