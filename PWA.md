# PWA - Progressive Web App

## Visao Geral

Este aplicativo foi desenvolvido como um PWA (Progressive Web App), permitindo que seja instalado em dispositivos moveis e funcione como um aplicativo nativo.

## Caracteristicas do PWA

### 1. Instalavel
- Pode ser adicionado a tela inicial do dispositivo
- Funciona sem precisar da loja de aplicativos (App Store ou Google Play)
- Icone personalizado aparece na tela inicial

### 2. Modo Standalone
- Abre em tela cheia, sem a interface do navegador
- Experiencia similar a um aplicativo nativo
- Maior area de visualizacao para o conteudo

### 3. Service Worker
- Gerencia o cache de arquivos
- Melhora a performance de carregamento
- Permite funcionamento parcial offline

### 4. Responsivo
- Interface adaptada para qualquer tamanho de tela
- Design mobile-first
- Funciona em celulares, tablets e desktops

## Arquivos do PWA

### manifest.json
Arquivo de configuracao do PWA que define:
- Nome do aplicativo (curto e completo)
- Icones em diferentes tamanhos
- Cor do tema
- Cor de fundo
- Modo de exibicao (standalone)
- URL de inicio
- Orientacao preferida

### sw.js (Service Worker)
Script que roda em segundo plano e:
- Cacheia arquivos estaticos durante a instalacao
- Intercepta requisicoes de rede
- Serve arquivos do cache quando possivel
- Atualiza o cache quando necessario
- Remove caches antigos

### Icones
- **icon-192.png**: Icone de 192x192 pixels para telas normais
- **icon-512.png**: Icone de 512x512 pixels para telas de alta resolucao

## Estrategia de Cache

O Service Worker usa a estrategia "Cache First, Network Fallback":

1. Verifica se o recurso esta no cache
2. Se estiver, serve do cache (mais rapido)
3. Se nao estiver, busca da rede
4. Salva no cache para proximas requisicoes

**Excecao**: Chamadas para APIs externas sempre vao direto para a rede para garantir dados atualizados.

## Arquivos Cacheados

Os seguintes arquivos sao automaticamente cacheados:
- `index.html` - Pagina principal
- `styles.css` - Estilos
- `app.js` - Logica da aplicacao
- `config.js` - Configuracoes
- `manifest.json` - Manifesto do PWA
- `icons/icon-192.png` - Icone pequeno
- `icons/icon-512.png` - Icone grande

## Versionamento do Cache

O cache tem uma versao definida (`loteria-cache-v1`). Quando voce atualizar o Service Worker:
1. Incremente a versao do cache
2. O Service Worker removera caches antigos
3. Criara um novo cache com os arquivos atualizados

## Requisitos para PWA

Para que o PWA funcione corretamente:

### 1. HTTPS
- **IMPORTANTE**: O PWA so funciona com HTTPS (ou localhost para desenvolvimento)
- GitHub Pages fornece HTTPS automaticamente
- Service Workers sao bloqueados em HTTP por questoes de seguranca

### 2. Manifest.json
- Deve estar presente e corretamente configurado
- Deve ter pelo menos um icone de 192x192 ou maior
- Deve especificar `start_url` e `display`

### 3. Service Worker
- Deve ser registrado corretamente
- Deve ter os eventos `install`, `activate` e `fetch` implementados

### 4. Navegador Compativel
- Chrome/Edge: Suporte completo
- Safari: Suporte limitado (sem prompt de instalacao automatico)
- Firefox: Suporte em evolucao

## Como Testar Localmente

### 1. Servidor Local
```bash
# Opcao 1: Python
python -m http.server 8000

# Opcao 2: Node.js
npx http-server -p 8000

# Opcao 3: PHP
php -S localhost:8000
```

### 2. Ferramentas de Desenvolvedor

**Chrome DevTools:**
1. Abra DevTools (F12)
2. Va para a aba "Application"
3. Verifique:
   - **Manifest**: Visualize o manifesto e icones
   - **Service Workers**: Status do SW, atualizacoes, cache
   - **Storage > Cache Storage**: Arquivos em cache

**Lighthouse:**
1. Abra DevTools (F12)
2. Va para a aba "Lighthouse"
3. Selecione "Progressive Web App"
4. Clique em "Generate report"
5. Veja a pontuacao e sugestoes de melhoria

## Publicacao no GitHub Pages

1. Certifique-se de que todos os arquivos PWA estao commitados:
   - `manifest.json`
   - `sw.js`
   - Icones em `icons/`
   - Referencias no `index.html`

2. Configure o GitHub Pages:
   - Va em Settings > Pages
   - Selecione a branch (main ou gh-pages)
   - Salve

3. Acesse o app via HTTPS:
   - `https://SEU-USUARIO.github.io/REPOSITORIO/`

4. Teste a instalacao em um dispositivo movel

## Atualizacoes do PWA

Quando voce fizer alteracoes no app:

1. Atualize a versao do cache no `sw.js`:
   ```javascript
   const CACHE_VERSION = 'loteria-cache-v2'; // v1 -> v2
   ```

2. Commit e push para o GitHub

3. Usuarios que ja instalaram:
   - Receberao a atualizacao automaticamente
   - Na proxima vez que abrirem o app
   - O Service Worker detectara a nova versao

## Limitacoes

- **Dados da API**: Nao sao cacheados, sempre vem da rede
- **Safari iOS**: Nao mostra prompt automatico de instalacao
- **Espaco em Cache**: Limitado pelo navegador (geralmente 50MB+)
- **Sincronizacao em Background**: Nao implementada nesta versao

## Melhorias Futuras

Possiveis melhorias para versoes futuras:
- Pagina offline customizada
- Cache de resultados de consultas
- Notificacoes push
- Sincronizacao em background
- Modo escuro/claro
- Compartilhamento de resultados

## Recursos Adicionais

- [PWA Documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Google PWA Training](https://web.dev/progressive-web-apps/)

## Troubleshooting

### O prompt de instalacao nao aparece
- Verifique se esta usando HTTPS
- Confirme que o manifest esta correto
- Verifique se o Service Worker esta registrado
- Limpe o cache e recarregue

### Service Worker nao esta funcionando
- Abra DevTools > Application > Service Workers
- Verifique se ha erros
- Tente "Unregister" e recarregar a pagina
- Confirme que o caminho do sw.js esta correto

### Cache nao esta atualizando
- Incremente a versao do cache no sw.js
- Force a atualizacao no DevTools
- Limpe o cache manualmente
- Use modo anonimo para testar

### Icones nao aparecem
- Verifique se os arquivos existem em icons/
- Confirme os caminhos no manifest.json
- Verifique os tamanhos (192x192 e 512x512)
- Use PNG com fundo solido

