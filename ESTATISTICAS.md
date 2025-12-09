# Modulo de Estatisticas - Loterias

## Visao Geral

Este modulo adiciona analise estatistica automatica aos resultados de loterias consultados, mostrando as dezenas mais frequentes baseadas nos ultimos X concursos pesquisados.

## Funcionalidades Implementadas

### 1. Analise Automatica de Frequencia
Apos buscar os resultados da loteria, o sistema automaticamente:
- Analisa todas as dezenas sorteadas nos concursos retornados
- Conta a frequencia de cada dezena
- Ordena da mais frequente para a menos frequente
- Exibe as dezenas mais frequentes conforme o tipo de jogo

### 2. Configuracao por Tipo de Loteria

O sistema identifica automaticamente quantas dezenas sugerir baseado no jogo:

| Loteria      | Quantidade de Numeros |
|--------------|-----------------------|
| Mega-Sena    | 6 dezenas            |
| Quina        | 5 dezenas            |
| Lotofacil    | 15 dezenas           |
| Timemania    | 7 dezenas            |
| Dupla Sena   | 6 dezenas            |
| Lotomania    | 50 dezenas           |
| Dia de Sorte | 7 dezenas            |
| Super Sete   | 7 dezenas            |

### 3. Funcoes Implementadas

#### `contarFrequenciaDezenas(concursos)`
- **Parametro**: Array de objetos de concursos
- **Retorno**: Objeto com frequencias (chave: numero, valor: quantidade de vezes)
- **Funcao**: Percorre todos os concursos e conta quantas vezes cada dezena apareceu

#### `pegarMaisFrequentes(frequencias, quantidadeDezenas)`
- **Parametros**: 
  - `frequencias`: Objeto com as frequencias calculadas
  - `quantidadeDezenas`: Quantidade de dezenas a retornar
- **Retorno**: Array de objetos com `{numero, frequencia}` ordenados
- **Funcao**: Ordena as dezenas por frequencia e retorna as top N

#### `gerarEstatisticas(data, loteria)`
- **Parametros**:
  - `data`: Dados retornados pela API
  - `loteria`: Nome da loteria consultada
- **Funcao**: Orquestra o processo de analise estatistica

#### `mostrarEstatisticas(dezenasMaisFrequentes, loteria, totalConcursos)`
- **Parametros**:
  - `dezenasMaisFrequentes`: Array com as dezenas mais frequentes
  - `loteria`: Nome da loteria
  - `totalConcursos`: Total de concursos analisados
- **Funcao**: Renderiza o HTML com as estatisticas

#### `formatarNomeLoteria(loteria)`
- **Parametro**: Nome da loteria em lowercase
- **Retorno**: Nome formatado da loteria
- **Funcao**: Formata o nome da loteria para exibicao

### 4. Objeto de Configuracao

```javascript
const quantidadeNumerosPorJogo = {
    'megasena': 6,
    'quina': 5,
    'lotofacil': 15,
    'timemania': 7,
    'duplasena': 6,
    'lotomania': 50,
    'diadesorte': 7,
    'supersete': 7,
    'federal': 0
};
```

Este objeto facilita a expansao para novos jogos. Basta adicionar uma nova linha com o nome do jogo e a quantidade de numeros.

## Exemplo de Uso

### Entrada do Usuario:
- **Loteria**: megasena
- **Quantidade de concursos**: 20

### Resultado Exibido:
```
Analise Estatistica
Dezenas mais frequentes nos ultimos 20 concursos da Mega-Sena

[Cards com as 6 dezenas mais frequentes, mostrando:]
- Posicao (1°, 2°, 3°, etc.)
- Numero da dezena
- Frequencia (quantas vezes apareceu)

Sugestao de jogo: 05, 32, 09, 17, 41, 44
```

## Interface Visual

### Container de Estatisticas
- Background gradiente roxo/azul
- Cards brancos para cada dezena
- Animacao ao passar o mouse
- Design responsivo (adapta para mobile)

### Informacoes Exibidas por Dezena
1. **Posicao**: Ranking da dezena (1° mais frequente)
2. **Numero**: A dezena em formato 00
3. **Frequencia**: Quantas vezes apareceu (ex: 12x)

### Sugestao de Jogo
Box destacado mostrando os numeros sugeridos separados por virgula, prontos para serem copiados.

## Integracoes

### HTML
- Adicionado container `<div id="estatisticas"></div>`
- Container permanece oculto ate que haja dados para exibir

### JavaScript
- Integrado ao fluxo de busca de resultados
- Executado automaticamente apos renderizar os concursos
- Limpo automaticamente ao fazer nova busca

### CSS
- Estilos responsivos para diferentes tamanhos de tela
- Animacoes suaves de hover
- Cores consistentes com o tema do aplicativo

## Tratamento de Erros

- Se a loteria nao tiver configuracao de quantidade de numeros, as estatisticas nao sao exibidas
- Se nao houver concursos, nao gera erro, apenas nao exibe as estatisticas
- Federal (0 numeros configurados) nao gera estatisticas pois trabalha com bilhetes

## Expansao Futura

Para adicionar novas loterias, basta:
1. Adicionar entrada no objeto `quantidadeNumerosPorJogo`
2. Adicionar entrada no objeto `formatarNomeLoteria` (opcional, para nome formatado)

Nenhuma outra alteracao e necessaria!

## Tecnologias Utilizadas

- JavaScript Vanilla (ES6+)
- CSS Grid para layout responsivo
- CSS Gradients e Animations
- DOM Manipulation

## Performance

- Algoritmo otimizado com complexidade O(n) para contagem
- O(n log n) para ordenacao
- Minimo de manipulacoes DOM
- Sem dependencias externas
