# Guia Rapido - PWA Instalado

Parabens! O aplicativo Consulta Loterias agora e um PWA (Progressive Web App).

## O que foi feito?

### Arquivos Novos
- `manifest.json` - Configuracao do PWA
- `sw.js` - Service Worker para cache
- `icons/icon-192.png` - Icone 192x192
- `icons/icon-512.png` - Icone 512x512
- `PWA.md` - Documentacao completa
- `TESTE-PWA.md` - Guia de testes
- `CHANGELOG-PWA.md` - Resumo de alteracoes

### Arquivos Modificados
- `index.html` - Adicionadas tags de PWA
- `app.js` - Registro do Service Worker
- `README.md` - Documentacao atualizada
- `.gitignore` - Incluidos novos arquivos

## Como Testar Agora?

### 1. Teste Local Basico

```bash
# Inicie um servidor local
python -m http.server 8000

# Acesse no navegador
http://localhost:8000
```

### 2. Verifique o PWA

1. Abra Chrome DevTools (F12)
2. Va em Application > Manifest
3. Deve mostrar "Consulta Loterias" com icones
4. Va em Application > Service Workers
5. Deve mostrar "sw.js" ativado

### 3. Teste a Instalacao

No Chrome/Edge:
- Procure o icone de instalacao na barra de endereco (+)
- Clique e instale
- O app abrira em uma janela separada

## Proximo Passo: Publicar no GitHub Pages

### 1. Commit e Push

```bash
git status
git add .
git commit -m "Adicionar suporte a PWA"
git push origin main
```

### 2. Configure GitHub Pages

1. Va em Settings do repositorio
2. Clique em Pages
3. Em Source, selecione "main" branch
4. Clique em Save
5. Aguarde alguns minutos

### 3. Acesse o App

O app estara disponivel em:
```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

### 4. Teste no Celular

1. Acesse a URL acima no celular
2. Aparecera um banner "Adicionar a tela inicial"
3. Toque em "Adicionar"
4. O icone aparecera na tela inicial
5. Abra o app - ele abrira em tela cheia!

## Checklist de Verificacao

Antes de publicar, verifique:

- [ ] Token configurado em `config.js` (se for testar localmente)
- [ ] `config.js` esta no `.gitignore` (NAO deve ser commitado)
- [ ] Todos os arquivos PWA estao presentes
- [ ] Service Worker registra sem erros
- [ ] Manifest esta correto
- [ ] Icones foram criados
- [ ] Caminhos sao relativos (`./`)

## Arquivos que NAO devem ser commitados

- `config.js` - Contem token da API (segredo)
- Arquivos temporarios (`.temp`, backup, etc.)

## Arquivos que DEVEM ser commitados

- `manifest.json`
- `sw.js`
- `icons/icon-192.png`
- `icons/icon-512.png`
- `index.html` (modificado)
- `app.js` (modificado)
- `README.md` (modificado)
- `.gitignore` (modificado)
- Arquivos de documentacao (`.md`)

## Comandos Uteis

### Ver status do Git
```bash
git status
```

### Adicionar todos os arquivos
```bash
git add .
```

### Commit com mensagem
```bash
git commit -m "Adicionar suporte a PWA"
```

### Enviar para GitHub
```bash
git push origin main
```

### Ver arquivos que serao commitados
```bash
git diff --cached --name-only
```

### Verificar se config.js esta sendo ignorado
```bash
git check-ignore config.js
# Deve retornar: config.js
```

## Testando o PWA Publicado

Apos publicar no GitHub Pages:

### No Desktop
1. Acesse a URL do GitHub Pages
2. Icone de instalacao aparece na barra
3. Instale e teste

### No Android
1. Acesse a URL no Chrome/Edge
2. Banner de instalacao aparece
3. Ou menu > "Instalar aplicativo"
4. Icone aparece na tela inicial

### No iOS
1. Acesse a URL no Safari
2. Botao de compartilhar
3. "Adicionar a Tela de Inicio"
4. Confirme

## Duvidas?

Consulte a documentacao completa:
- `PWA.md` - Documentacao tecnica do PWA
- `TESTE-PWA.md` - Guia detalhado de testes
- `CHANGELOG-PWA.md` - Resumo de todas as alteracoes
- `README.md` - Documentacao geral do projeto

## Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Consulte TESTE-PWA.md secao "Resolucao de Problemas"
3. Verifique se esta usando HTTPS (obrigatorio para PWA)
4. Limpe o cache e recarregue

## Parabens!

Seu aplicativo agora e um PWA moderno que pode ser instalado em celulares e funciona offline!

