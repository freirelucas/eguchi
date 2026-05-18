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

## Mapeamento Eguchi original vs. esta implementação

O método original usa **9 voicings de Dó/Fá/Sol maior** (apenas teclas brancas), depois introduz "tecla preta":
- Vermelho C-E-G · Laranja E-G-C · Marrom G-C-E (Dó maior em 3 inversões)
- Roxo F-A-C · Amarelo C-F-A · Preto A-C-F (Fá maior em 3 inversões)
- Rosa G-B-D · Azul B-D-G · Verde D-G-B (Sol maior em 3 inversões)

**Esta implementação diverge**: usa 8 acordes distintos (I, V, IV, ii, iii, vi, ♭VII, V7 de Dó maior) pra dar vocabulário harmônico mais útil em contexto não-pedagógico. Pra seguir Sakakibara estritamente com crianças, busque o material original do Ichionkai.

## Estrutura do repositório

```
.
├── index.html              App PWA completo (HTML + CSS + JS inline)
├── manifest.json           Manifest PWA
├── sw.js                   Service worker (offline cache)
├── icon-*.png              Ícones PWA
├── cheatsheet/             Material impresso para prática em instrumento
│   ├── index.html          Landing
│   ├── lib.js              SVG generators + 9 voicings autênticas Eguchi
│   ├── a4-bw.html          A4 paisagem · 9 voicings × 4 instrumentos · P&B
│   ├── a3-piano.html       A3 retrato · piano · colorido
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
3. Vai aparecer como app com ícone das 8 cores
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
# chordIdx      0-7 (índice na sequência Eguchi)
# chordName     'Vermelho', 'Branco', etc.
# chosenIdx     resposta dada
# chosenName    nome da cor escolhida
# correct       0 ou 1
# rtMs          tempo de resposta em milissegundos
# level         nível desbloqueado no momento do teste
# instrument    'piano', 'sine', 'organ', 'strings', 'guitar'
# variation     'root', 'inv1', 'inv2', 'oct-1', 'oct+1'
```

JSON exportado tem estrutura completa incluindo `dailyLogs` (sono, café, álcool, mood, notas).

## Jornada do usuário

1. **Primeira visita** → onboarding de 5 telas (Welcome → Goal → Calibrate → Colors → Baseline). Termina forçando baseline (ou pular).
2. **Visitas seguintes** → menu com card de **recomendação "agora"** calculado do estado: "comece pela baseline", "treine sua sessão de hoje", "próxima cor está pronta", "faz N dias — sessão curta?", etc.
3. **Currículo** → tela com mapa das 8 cores e status (bloqueada / em treino / aprendendo / dominada). Tap em qualquer cor abre lesson card.
4. **Desbloqueio** → quando uma cor nova destrava, abre lesson card cheia: cor + kanji + função tonal + como soa + por que essa cor + mnemônico + exemplo + play button.

## Modos de treino

- **Treino livre** — todas as 8 cores desbloqueadas. Prática direta, sem gating Eguchi. Trials salvos com `mode: 'free'`.
- **Treino Eguchi** — progressão clássica: cor nova só desbloqueia quando P(p>85%|dados) > 95% em 50+ trials e ≥7 dias no nível. Modo canônico do método.
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

## Sequência das cores (método Eguchi)

Mapeamento original: Eguchi (1991), *Shin-zettai onkan program*.

| # | Cor | Kanji | Acorde |
|---|-----|-------|--------|
| 1 | Vermelho | 赤 | Dó Maior |
| 2 | Branco   | 白 | Sol Maior |
| 3 | Amarelo  | 黄 | Fá Maior |
| 4 | Verde    | 緑 | Ré menor |
| 5 | Preto    | 黒 | Mi menor |
| 6 | Roxo     | 紫 | Lá menor |
| 7 | Azul     | 青 | Si♭ Maior |
| 8 | Marrom   | 茶 | Sol 7 |

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
