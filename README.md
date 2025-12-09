# Consulta Loterias

Aplicacao web mobile-first para consultar resultados de loterias brasileiras usando a API publica ApiLoterias.

## Funcionalidades

- Consulta de resultados de qualquer loteria brasileira (Mega-Sena, Quina, Lotofacil, etc.)
- Busca dos ultimos X concursos (de 1 a 50)
- Interface responsiva e moderna (mobile-first)
- **Analise Estatistica Automatica** - Mostra as dezenas mais frequentes baseadas nos concursos consultados
- Exibicao de:
  - Numero do concurso
  - Data do sorteio
  - Dezenas sorteadas
  - Informacoes extras (local, cidade, ganhadores, premiacoes, acumulacao, etc.)
  - **Estatisticas**: Dezenas mais frequentes e sugestao de jogo

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variaves CSS e design responsivo)
- JavaScript (ES6+)
- API: [ApiLoterias](https://apiloterias.com.br)

## Como Usar

### 1. Configuracao do Token (IMPORTANTE)

?? **SEGURANCA**: O token da API agora esta em um arquivo separado que nao e versionado no Git.

**Primeira instalacao:**

1. Copie o arquivo `config.example.js` e renomeie para `config.js`:
   ```bash
   # Windows (CMD)
   copy config.example.js config.js
   
   # Windows (PowerShell)
   Copy-Item config.example.js config.js
   
   # Linux/Mac
   cp config.example.js config.js
   ```

2. Abra o arquivo `config.js`

3. Substitua `'SEU_TOKEN_AQUI'` pelo seu token da API:
   ```javascript
   const CONFIG = {
       API_BASE_URL: 'https://apiloterias.com.br/app/v2/resultado',
       API_TOKEN: 'SEU_TOKEN_REAL_AQUI'
   };
   ```

4. Salve o arquivo

**NUNCA commite o arquivo `config.js` no Git!** Ele esta protegido no `.gitignore`.

### 2. Executando a Aplicacao

Existem varias formas de executar a aplicacao:

#### Opcao 1: Abrir diretamente no navegador
- Basta abrir o arquivo `index.html` diretamente no seu navegador

#### Opcao 2: Usar um servidor local (recomendado)

**Usando Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Usando Node.js (npx):**
```bash
npx http-server -p 8000
```

**Usando PHP:**
```bash
php -S localhost:8000
```

**Usando Visual Studio Code:**
- Instale a extensao "Live Server"
- Clique com botao direito no `index.html`
- Selecione "Open with Live Server"

Depois acesse: `http://localhost:8000`

### 3. Usando a Aplicacao

1. Digite o nome da loteria (ex: `megasena`, `quina`, `lotofacil`)
2. Informe quantos concursos anteriores deseja buscar (1 a 50)
3. Clique em "Buscar Resultados"
4. Visualize os resultados em cards
5. **Veja a analise estatistica** com as dezenas mais frequentes e sugestao de jogo

## Modulo de Estatisticas

A aplicacao agora inclui um modulo de analise estatistica que:

- **Analisa automaticamente** todas as dezenas sorteadas nos concursos consultados
- **Conta a frequencia** de cada numero
- **Sugere numeros** baseados nos mais frequentes, conforme a quantidade de numeros do jogo:
  - Mega-Sena: 6 dezenas
  - Quina: 5 dezenas
  - Lotofacil: 15 dezenas
  - Timemania: 7 dezenas
  - Dupla Sena: 6 dezenas
  - Lotomania: 50 dezenas
  - Dia de Sorte: 7 dezenas
  - Super Sete: 7 dezenas

**Exemplo**: Ao consultar 20 concursos da Mega-Sena, o sistema mostra as 6 dezenas mais repetidas nesses 20 concursos.

Para mais detalhes sobre o modulo de estatisticas, veja [ESTATISTICAS.md](ESTATISTICAS.md)

## Estrutura do Projeto

```
loteria/
??? index.html          # Estrutura HTML da aplicacao
??? styles.css          # Estilos CSS (design mobile-first)
??? app.js             # Logica JavaScript
??? config.example.js  # Exemplo de configuracao (versionado)
??? config.js          # Configuracao real com token (NAO versionado)
??? .gitignore         # Arquivos ignorados pelo Git
??? README.md          # Documentacao
??? ESTATISTICAS.md    # Documentacao do modulo de estatisticas
```

## Loterias Disponiveis

Exemplos de loterias que podem ser consultadas:

- `megasena` - Mega-Sena
- `quina` - Quina
- `lotofacil` - Lotofacil
- `lotomania` - Lotomania
- `timemania` - Timemania
- `duplasena` - Dupla Sena
- `diadesorte` - Dia de Sorte
- `supersete` - Super Sete
- `federal` - Loteria Federal

## Exemplos de Uso

### Exemplo 1: Consultar ultimos 10 concursos da Mega-Sena
- Loteria: `megasena`
- Quantidade: `10`

### Exemplo 2: Consultar ultimos 5 concursos da Quina
- Loteria: `quina`
- Quantidade: `5`

### Exemplo 3: Consultar ultimo concurso da Lotofacil
- Loteria: `lotofacil`
- Quantidade: `1`

## Tratamento de Erros

A aplicacao trata os seguintes erros:

- Token nao configurado
- Nome de loteria invalido ou nao encontrado
- Quantidade fora do intervalo permitido (1-50)
- Erros de conexao com a API
- Respostas invalidas da API

## Responsividade

A aplicacao foi desenvolvida com abordagem mobile-first e e totalmente responsiva:

- **Mobile**: Layout em coluna unica, otimizado para telas pequenas
- **Tablet**: Layout melhorado com espacamento maior
- **Desktop**: Cards em grid de 2 colunas para melhor aproveitamento do espaco

## Navegadores Suportados

- Chrome (versoes recentes)
- Firefox (versoes recentes)
- Safari (versoes recentes)
- Edge (versoes recentes)

## API

Esta aplicacao utiliza a API publica da ApiLoterias:

**Endpoint:**
```
https://apiloterias.com.br/app/v2/resultado?loteria=NOME&token=TOKEN&concurso=ultimosX
```

**Parametros:**
- `loteria`: Nome da loteria (ex: megasena)
- `token`: Token de autenticacao da API
- `concurso`: `ultimosX` onde X e a quantidade de concursos

## Licenca

Este projeto e de uso livre para fins educacionais e pessoais.

## Seguranca

?? **Protecao do Token:**

- O token da API esta armazenado em `config.js` que **NAO e versionado** no Git
- Apenas o `config.example.js` (sem token real) e versionado
- Nunca compartilhe seu arquivo `config.js` ou exponha seu token publicamente
- Se voce acidentalmente commitar o token, gere um novo token imediatamente na API

**Se voce clonar este repositorio:**
1. Copie `config.example.js` para `config.js`
2. Adicione seu token no arquivo `config.js`
3. O arquivo `config.js` sera automaticamente ignorado pelo Git

## Observacoes

- Os dados sao fornecidos pela ApiLoterias e a aplicacao nao tem controle sobre a disponibilidade ou precisao dos mesmos
- E necessario ter conexao com a internet para usar a aplicacao
- Respeite os limites de requisicoes da API
- Mantenha seu token de API em seguranca
