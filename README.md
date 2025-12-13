# Consulta Loterias / Lottery Checker

## Descrição (PT-BR)
Aplicação web simples para consultar resultados de loterias brasileiras usando a API da ApiLoterias, calcular dezenas mais frequentes e conferir um jogo informado pelo usuário.

## Description (EN)
Lightweight web app to fetch Brazilian lottery results from ApiLoterias, compute most frequent numbers, and check a user ticket against recent draws.

## Propósito
- Consultar concursos recentes de qualquer loteria suportada pela ApiLoterias.
- Exibir resultados em cards com dezenas e dados complementares (local, cidade, prêmios, acumulado).
- Gerar estatísticas de frequência das dezenas.
- Comparar um jogo informado com todos os concursos retornados.

## Tecnologias
- HTML, CSS (layout responsivo, variáveis de tema)
- JavaScript (ES6+), Fetch API
- Integração com API pública ApiLoterias
- Validações e formatação (datas, moedas, normalização de campos da API)

## Principais funcionalidades
- Busca dos últimos concursos (`ultimosX`, 1–50) para a loteria digitada.
- Exibição de dezenas sorteadas e informações adicionais (local, cidade, premiações, acumulado).
- Estatísticas: top N dezenas mais frequentes (N padrão por jogo, personalizável pelo usuário).
- Conferência de jogo: valida números (1–99), remove duplicados e destaca o concurso com mais acertos.
- Mensagens de estado claras (carregando, sucesso, erro, info) e layout responsivo.

## Como rodar localmente
1) Copie a configuração de exemplo e insira seu token:
   ```bash
   # PowerShell
   Copy-Item config.example.js config.js
