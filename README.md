# Eguchi Lab · 江口式実験室

App de treino de ouvido absoluto pelo método Eguchi (Eiko Eguchi / Chiba Music Institute) com tracking experimental N=1: baseline cego, probe set, log diário de covariáveis (sono, café, mood), inferência bayesiana de progresso e exportação para análise.

Single-file HTML + PWA installable. Funciona offline depois do primeiro load.

## Estrutura do repositório

```
.
├── index.html              App PWA completo (HTML + CSS + JS inline, ~92KB)
├── manifest.json           Manifest PWA
├── sw.js                   Service worker (offline cache)
├── icon-192.png            Ícone PWA 192×192
├── icon-512.png            Ícone PWA 512×512
├── icon-maskable-512.png   Ícone adaptativo para Android
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

## Stack técnica

- Vanilla HTML/CSS/JS (zero dependências de build)
- Web Audio API para síntese aditiva dos 5 timbres
- localStorage para persistência
- Service Worker para offline
- Fontes: Fraunces (serif) + JetBrains Mono via Google Fonts CDN

## Sequência das cores (método Eguchi)

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

## Caveat científico

O método Eguchi foi validado por Sakakibara (2014) em crianças entre 2 e 6 anos. Para adultos, a literatura é escassa. O que adultos tipicamente desenvolvem é "absolute labeling" — capacidade treinada de rotular alturas, dependente de timbre e contexto. É útil, é mensurável, mas não é ouvido absoluto verdadeiro.

Esta implementação é experimento N=1, sem grupo controle. Para extrair conclusões individuais defensáveis: faça baseline antes do treino, registre covariáveis diariamente, use probes periódicos para medir generalização.

## Licença

MIT
