# Eguchi Lab · 江口式実験室

App de treino de ouvido absoluto pelo método Eguchi (Eiko Eguchi / Chiba Music Institute) com tracking experimental N=1: baseline cego, probe set, log diário de covariáveis (sono, café, mood), inferência bayesiana de progresso e exportação para análise.

Single-file HTML + PWA installable. Funciona offline depois do primeiro load.

## Protocolo Sakakibara (faithful)

Validado empiricamente em **22 de 24 crianças de 2-6 anos** (Sakakibara, 2014):

| Parâmetro | Valor |
|---|---|
| Idade alvo | 2 a 6 anos (ideal: 2,5-3) |
| Sessões por dia | **5 sessões curtas** |
| Duração de cada | 2 a 3 minutos |
| Trials por sessão | 20-25 |
| Total diário | ~100-125 trials |
| Critério próxima cor | **100% de acerto** + ≥2 semanas no nível atual |
| Ordem | Sempre randomizada (impede uso de referência relativa) |
| Duração total esperada | 2 a 4 anos |

App reflete esse protocolo: default de 25 trials/sessão, tracker "Sessões hoje: N/5" no menu, recomendação contextual baseada na hora do dia. Pra adultos, critério bayesiano equivalente (P(p&gt;85%) &gt; 95% + RT &lt; 2s, ref. Wong et al., 2025).

## As 9 cores (iguais ao método original)

O app, as cartinhas, as bandeiras e todos os pôsteres usam o conjunto original de Eguchi: **Dó, Fá e Sol maior, cada um em 3 posições** (só teclas brancas). Cada posição é uma cor; a nota mais grave ("o pé") é a pista que separa cores do mesmo acorde. Ordem de introdução de Sakakibara (2014):

| # | Cor | Acorde | Notas (de baixo para cima) | Pé |
|---|-----|--------|----------------------------|----|
| 1 | Vermelho 赤 | Dó maior (C) | Dó4 Mi4 Sol4 | Dó |
| 2 | Amarelo 黄 | Fá maior (F/C) | Dó5 Fá5 Lá5 | Dó |
| 3 | Azul 青 | Sol maior (G/B) | Si4 Ré5 Sol5 | Si |
| 4 | Preto 黒 | Fá maior (F/A) | Lá4 Dó5 Fá5 | Lá |
| 5 | Verde 緑 | Sol maior (G/D) | Ré5 Sol5 Si5 | Ré |
| 6 | Laranja 橙 | Dó maior (C/E) | Mi4 Sol4 Dó5 | Mi |
| 7 | Roxo 紫 | Fá maior (F) | Fá4 Lá4 Dó5 | Fá |
| 8 | Rosa 桃 | Sol maior (G) | Sol4 Si4 Ré5 | Sol |
| 9 | Marrom 茶 | Dó maior (C/G) | Sol4 Dó5 Mi5 | Sol |

- **Ritmo fiel (padrão):** cada cor nova só chega depois de 14 dias na anterior e do desafio sem erro (Ajustes → Ritmo de novas cores; "acelerado" ignora os dias).
- **Sem inversões aleatórias:** no método, inversão é outra cor; a opção de variação só muda a oitava.
- **Depois das 9:** o método acrescenta 5 acordes de tecla preta e depois notas isoladas. A sequência exata não está em fonte aberta, então o app para nas 9.
- **Coerência garantida:** `node cheatsheet/check-colors.js` falha se app, `cheatsheet/colors.js` e `cheatsheet/lib.js` divergirem.
- **Migração:** quem usava a versão antiga (12 cores com outros acordes) recomeça na fase 1; o histórico antigo fica em `archiveV2` e sai no Exportar JSON.

## Estrutura do repositório

```
.
├── index.html              App PWA completo (HTML + CSS + JS inline)
├── manifest.json           Manifest PWA
├── sw.js                   Service worker (offline cache)
├── icon-*.png              Ícones PWA
├── cheatsheet/             Material impresso para prática em instrumento
│   ├── index.html          Landing
│   ├── colors.js           Fonte única das 9 cores Eguchi para o impresso (+ teclado SVG)
│   ├── check-colors.js     Confere app × colors.js × lib.js: node cheatsheet/check-colors.js
│   ├── kids-print.css      Estilo impresso no visual do Modo Criança
│   ├── handout-cartas-bandeiras.html  A4 · 9 cartinhas + 6 de ação + verso + 9 bandeiras + guia de jogos
│   ├── a3-piano.html       A3 retrato · piano · as 9 cores
│   ├── a4-piano-bw.html    A4 retrato · piano · 9 cores · P&B
│   ├── lib.js              SVG generators + textos das 9 voicings (violão, trompete, flauta, mestre)
│   ├── a4-bw.html          A4 paisagem · 9 voicings × 4 instrumentos · P&B
│   ├── a3-violao.html      A3 retrato · violão
│   ├── a3-trompete.html    A3 retrato · trompete em C
│   └── a3-gaita.html       A3 retrato · gaita C diatônica
├── design/                 Design canvas / handoff
│   ├── index.html          Mockups e specs (React + Babel no browser)
│   └── src/                Tokens, ui-kit, screens, specs (JSX)
├── README.md
└── LICENSE
```

A raiz é o app deployável. `design/` é o canvas de mockups usado durante o handoff — não precisa estar publicado.

## Deploy no GitHub Pages

1. No repo → **Settings → Pages**
2. Em **Source**, selecionar `Deploy from a branch`
3. Branch: `main`, folder: `/ (root)`
4. Salvar. URL fica `https://<seu-usuario>.github.io/<nome-do-repo>/`
5. Pode levar 1–2 minutos pra primeiro deploy

O canvas de design fica acessível em `/<nome-do-repo>/design/`.

## Como instalar no celular

1. Abrir a URL do Pages no Chrome (Android) ou Safari (iOS)
2. Menu → **Adicionar à tela inicial**
3. Vai aparecer como app com ícone colorido
4. Funciona offline depois disso

## Atualizações

Para publicar uma nova versão:

1. Editar `index.html` ou outros assets
2. **Importante**: bumpar `CACHE_VERSION` no `sw.js` (ex: `eguchi-lab-v2` → `v3`), senão clientes antigos não baixam a nova versão
3. `git commit && git push`
4. Pages reconstrói automaticamente

## Persistência dos dados

Tudo fica em `localStorage` do navegador (chave `eguchi_lab_v2`). Não há backend.

- Em PWAs instaladas, o storage persiste indefinidamente
- No browser regular, pode ser limpo se o usuário limpar dados do site
- Use **Stats → Exportar JSON** regularmente para backup
- Use **Stats → Importar JSON** para restaurar ou migrar entre dispositivos

## Estrutura dos dados exportados

```python
import pandas as pd
df = pd.read_csv('eguchi-lab-YYYY-MM-DD.csv', parse_dates=['ts'])

# Colunas:
# ts            timestamp ISO
# mode          'train', 'baseline', ou 'probe'
# chordIdx      0-8 (índice na sequência Eguchi)
# chordName     'Vermelho', 'Amarelo', etc.
# chosenIdx     resposta dada
# chosenName    nome da cor escolhida
# correct       0 ou 1
# rtMs          tempo de resposta em milissegundos
# level         nível desbloqueado no momento do teste
# instrument    'piano', 'sine', 'organ', 'strings', 'guitar'
# variation     'root', 'oct-1', 'oct+1'
```

JSON exportado tem estrutura completa incluindo `dailyLogs` (sono, café, álcool, mood, notas).

## Jornada do usuário

1. **Primeira visita** → onboarding de 5 telas (Welcome → Goal → Calibrate → Colors → Baseline). Termina forçando baseline (ou pular).
2. **Visitas seguintes** → menu com card de **recomendação "agora"** calculado do estado: "comece pela baseline", "treine sua sessão de hoje", "próxima cor está pronta", "faz N dias — sessão curta?", etc.
3. **Currículo** → tela com mapa das 9 cores e status (bloqueada / em treino / aprendendo / dominada). Tap em qualquer cor abre lesson card.
4. **Desbloqueio** → quando uma cor nova destrava, abre lesson card cheia: cor + kanji + função tonal + como soa + por que essa cor + mnemônico + exemplo + play button.

## Modo criança (6 a 12 anos)

Na primeira visita o app pergunta **"Quem vai jogar?"** — Criança ou Adulto. O modo criança também pode ser ligado no menu `···` → **Modo criança**. Quando ligado, o app já abre direto nele.

- **Tema claro e colorido**, fonte arredondada, botões grandes e uma mascote (Lumi, a corujinha 🦉).
- **Partidas curtas de 10 sons** (~2 min) — combina com as 5 sessões curtas por dia do protocolo Sakakibara. A "missão de hoje" mostra 5 notinhas que viram ⭐.
- **Cada fase começa com a apresentação**: antes de cada partida, a Lumi toca todas as cores da fase, uma por vez, com a bandeira acendendo; a mais nova toca por último. Botão ⚖️ compara a cor nova com a já aprendida mais parecida (A-B-A-B).
- **Fase 1 é só o Vermelho**: a criança conhece o som de casa; passou, chega o Amarelo.
- **Treino de diferença**: nas 6 primeiras rodadas depois de uma cor nova, só aparecem dois botões — a nova e a mais parecida.
- **Pista do pé** 💡: toca só a nota mais grave e depois o acorde.
- **Depois de errar**: botões para ouvir "o que você escolheu" × "o que era", com a dica de como distinguir; a criança segue quando quiser.
- **Objetivo sempre visível**: "Acerte 5 seguidas para ganhar o 🌊 Azul", ou, no ritmo fiel, quantos dias faltam para a próxima cor.
- **Cada cor tem um emoji** (🍎 Vermelho, 🌻 Amarelo, 🌊 Azul, 🌙 Preto, 🌳 Verde, 🍊 Laranja, 🍇 Roxo, 🌸 Rosa, 🍫 Marrom) e uma frase que ajuda a distinguir.
- **Acertou**: confete, "+1 ⭐" e elogio. **Errou**: sem punição — mostra a cor certa e toca o som dela de novo.
- **Cor nova**: depois de 5 seguidas, a cor nova é apresentada (a criança ouve o som dela antes), e vem um desafio de 3 sons. Passou: tela "COR NOVA!" e figurinha na **coleção de cores**.
- **Fim da partida**: 1 a 3 estrelas pelo acerto e o próximo prêmio.
- **Área dos adultos**: segurar o botão por 1,5 s (evita saída sem querer).

As jogadas entram no mesmo histórico do treino Eguchi (`mode: 'train'`, com `kids: true`), então estatísticas, streak e exportação continuam funcionando para os pais. Sons de recompensa foram evitados de propósito: só se ouvem os acordes, para não poluir a memória auditiva.

## Modos de treino

- **Treino livre** — todas as 9 cores desbloqueadas. Prática direta, sem gating Eguchi. Trials salvos com `mode: 'free'`.
- **Treino Eguchi** — progressão clássica: 5 acertos seguidos abrem um desafio de 3 sons; passou, chega a próxima cor. No ritmo fiel (padrão), só depois de 14 dias na cor atual. Cartão da cor nova traz "como distinguir" e ⚖️ comparar com a cor mais parecida.
- **Modo progressão** — 2-4 acordes em sequência. Identifique cada um em ordem. Testa memória de curto prazo + reconhecimento.
- **Baseline** — 50 trials cegos, sem feedback. Ponto de partida.
- **Probe** — 10 trials com variações inéditas, sem feedback. Mede generalização.

## Recursos do treino

- **Replay** — botão pra ouvir o acorde de novo durante o trial; cada replay é tracked.
- **Acorde correto após erro** — toggle nos ajustes. Quando errar, pulsa a cor certa + toca o acorde.
- **Tônica de referência** — opcional. Toca Dó ou Lá antes de cada acorde. Treina ouvido relativo (útil pra adultos).
- **Intro & resumo de sessão** — antes começa um briefing, depois mostra acurácia, RT médio, melhor/pior cor, conquistas.
- **Streak diário & milestones** — track de hábito + badges em marcos (1ª sessão, 100 trials, 7 dias seguidos, etc.).

## Stack técnica

- Vanilla HTML/CSS/JS (zero dependências de build)
- **Tone.js** + samples Salamander Grand Piano via CDN (qualidade de áudio profissional)
- Fallback automático pra síntese aditiva vanilla se Tone.js não carregar
- localStorage para persistência
- Service Worker pra offline (cacheia Tone.js + samples na 1ª visita)
- Fontes: Fraunces (serif) + JetBrains Mono via Google Fonts CDN

**Primeira carga:** ~500KB extras (Tone.js + samples). Depois fica 100% offline.

## Fundamentação científica

O método cromático é de **Eguchi (1991)**, *Shin-zettai onkan program* (Ichionkai Music School, Japão). A validação longitudinal em crianças de 2 a 6 anos vem de **Sakakibara (2014)**, *Psychology of Music*. A premissa neurológica — crianças codificam altura como propriedade absoluta, adultos migram para processamento relativo (intervalar) — foi documentada por **Sergeant & Roche (1973)**, *Psychology of Music*.

Para adultos, **Wong et al. (2025)** (PMC) mostraram que &gt;90% de acurácia em notas isoladas é alcançável com treino intensivo, e que o tempo de resposta abaixo de ~2 segundos é o marcador que distingue memória absoluta genuína de cálculo de intervalo. O app implementa esse gargalo: respostas correctas com RT abaixo de 2000ms são rotuladas "absoluto"; acima, "calculado".

### Referências completas

- **Eguchi, M. (1991).** *Shin-zettai onkan program* (新絶対音感プログラム). Ichionkai Music School, Japão.
- **Sakakibara, A. (2014).** A longitudinal study of the process of acquiring absolute pitch: A practical report of training with the "chord identification method". *Psychology of Music*.
- **Sergeant, D. C., & Roche, S. (1973).** Perceptual shifts in the auditory information processing of young children. *Psychology of Music*.
- **Wong, P. M., et al. (2025).** Learning fast and accurate absolute pitch judgment in adulthood. *PMC / PubMed Central*.

## Caveat científico

O método Eguchi foi validado por Sakakibara (2014) em crianças entre 2 e 6 anos. Para adultos, a literatura é escassa. O que adultos tipicamente desenvolvem é "absolute labeling" — capacidade treinada de rotular alturas, dependente de timbre e contexto. É útil, é mensurável, mas não é ouvido absoluto verdadeiro.

Esta implementação é experimento N=1, sem grupo controle. Para extrair conclusões individuais defensáveis: faça baseline antes do treino, registre covariáveis diariamente, use probes periódicos para medir generalização.

## Licença

MIT
