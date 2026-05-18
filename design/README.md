# Eguchi · Design Canvas

Canvas de handoff com todos os mockups, tokens e specs do app Eguchi Lab. Roda direto no browser via React + Babel (sem build).

## Como abrir

```bash
# Servir a pasta design/ (qualquer servidor estático funciona)
python3 -m http.server 8000
# Abrir http://localhost:8000/design/
```

Ou abrir em GitHub Pages: `https://<usuario>.github.io/<repo>/design/`.

## Estrutura

```
design/
├── index.html            Canvas root — carrega React, Babel e os módulos JSX
└── src/
    ├── tokens.jsx        Paleta, tipografia, raios, espaços
    ├── ui-kit.jsx        Building blocks (botões, painéis, Phone frame)
    ├── ios-frame.jsx     iOS 26 device frame (não usado no canvas atual)
    ├── cards-system.jsx  Cards de Foundations + Componentes
    ├── screens-onboarding.jsx
    ├── screens-core.jsx
    ├── screens-loop.jsx
    ├── screens-insights.jsx
    ├── screens-supporting.jsx
    ├── screens-states.jsx
    ├── specs.jsx         Motion, IA, microinterações
    └── design-canvas.jsx Layout do canvas (DCSection, DCArtboard, DCPostIt)
```

Os arquivos JSX compartilham scope global via Babel standalone — toda função/componente declarada num arquivo fica disponível nos outros.
