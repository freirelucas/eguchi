// Eguchi · Supporting screens (diary, explore, settings, method)

// ─── Daily diary ───
function ScrDiary() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="diário" meta="terça 19 mai" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px 22px' }}>

        <Label style={{ display: 'block', marginBottom: 10 }}>como você está?</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 22 }}>
          {['😞','😕','😐','🙂','😄'].map((e, i) => (
            <div key={i} style={{
              aspectRatio: '1', background: T.bg2,
              border: `1px solid ${i === 3 ? T.accent : T.line}`,
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, transform: i === 3 ? 'scale(1.05)' : 'none',
            }}>{e}</div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <Field label="sono · h" value="7.5" flex={1} />
          <Field label="cafés" value="2" flex={1} />
        </div>

        <Field label="álcool ontem · doses" value="0" />

        <div style={{ marginTop: 18 }}>
          <Label style={{ display: 'block', marginBottom: 8 }}>notas</Label>
          <div style={{
            background: T.bg2, border: `1px solid ${T.line}`, borderRadius: 4,
            padding: '12px 14px', minHeight: 70, fontFamily: T.serif, fontSize: 13.5,
            fontStyle: 'italic', color: T.textDim,
          }}>
            dormi melhor que ontem. fones de ouvido — sennheisers.
          </div>
        </div>

        <div style={{ marginTop: 22 }}><Btn variant="primary" block>Salvar diário de hoje</Btn></div>

        {/* recent entries */}
        <div style={{ marginTop: 26, paddingTop: 18, borderTop: `1px solid ${T.line}` }}>
          <Label style={{ display: 'block', marginBottom: 12 }}>últimos 5 dias</Label>
          {[
            { d: '18 mai', mood: '🙂', s: '6.0', c: '3', n: 'cansado · ainda fui bem em vermelho' },
            { d: '17 mai', mood: '😄', s: '8.0', c: '1', n: 'descansado · sessão limpa' },
            { d: '16 mai', mood: '😐', s: '5.5', c: '4', n: 'pouco sono · evitei treino longo' },
            { d: '15 mai', mood: '🙂', s: '7.5', c: '2', n: '' },
            { d: '14 mai', mood: '🙂', s: '7.0', c: '2', n: 'probe set hoje · 54%' },
          ].map((e, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: `1px solid ${T.line}`, display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 18, paddingTop: 2 }}>{e.mood}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.serif, fontSize: 13.5, color: T.accent }}>{e.d}</div>
                <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, marginTop: 2 }}>
                  sono {e.s}h · {e.c} café{e.c !== '1' && 's'}
                </div>
                {e.n && <div style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 12, color: T.textMute, marginTop: 4 }}>{e.n}</div>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function Field({ label, value, flex }) {
  return (
    <div style={{ flex }}>
      <Label style={{ display: 'block', marginBottom: 8 }}>{label}</Label>
      <div style={{
        background: T.bg2, border: `1px solid ${T.line}`, borderRadius: 4,
        padding: '11px 14px', fontFamily: T.mono, fontSize: 14, color: T.text,
      }}>{value}</div>
    </div>
  );
}

// ─── Explore ───
function ScrExplore() {
  const c = CHORDS[5]; // Roxo
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="explorar" meta="livre" />

      <div style={{ padding: '18px 22px 16px', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 12, background: c.hex,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: chordFg(c), fontFamily: T.serif, fontSize: 30,
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}>{c.kanji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.serif, fontSize: 24, lineHeight: 1 }}>{c.name}</div>
            <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textDim, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 6 }}>
              {c.chord} · {c.sym}
            </div>
          </div>
          <PlayBtn size={48} state="idle" />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 22px' }}>

        <div style={{ marginBottom: 16 }}>
          <Label style={{ display: 'block', marginBottom: 4 }}>função tonal</Label>
          <p style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.5 }}>{c.function}</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Label style={{ display: 'block', marginBottom: 4 }}>notas</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {c.notes.map(n => (
              <span key={n} style={{
                fontFamily: T.serif, fontSize: 13,
                padding: '4px 12px', borderRadius: 14,
                background: T.bg2, border: `1px solid ${T.line}`, color: T.textDim,
              }}>{n}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Label style={{ display: 'block', marginBottom: 4 }}>fenomenologia</Label>
          <p style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.55 }}>{c.feel}</p>
          <div style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 13,
            color: T.textDim, borderLeft: `2px solid ${T.accent}`,
            paddingLeft: 12, marginTop: 10, lineHeight: 1.5,
          }}>
            Compartilha as notas com Vermelho mas inverte o afeto — é o Dó visto pela sombra.
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Label style={{ display: 'block', marginBottom: 4 }}>por que roxo · 紫</Label>
          <p style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.55 }}>
            <em style={{ color: T.accent, fontStyle: 'italic' }}>Murasaki</em> — historicamente a cor da nobreza japonesa, reservada à corte imperial. Tem dignidade triste, distinção melancólica.
          </p>
        </div>

        <div>
          <Label style={{ display: 'block', marginBottom: 4 }}>mnemônico</Label>
          <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 14.5, color: T.textDim }}>Crepúsculo — vermelho que aceita escurecer.</p>
        </div>

      </div>

      {/* mini color grid at bottom for picking */}
      <div style={{ padding: '12px 22px 8px', borderTop: `1px solid ${T.line}` }}>
        <ColorGrid unlocked={8} padding="0" gap={6} />
      </div>
    </div>
  );
}

// ─── Settings ───
function ScrSettings() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="ajustes" meta="" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 22px 22px' }}>

        <SettingRow label="instrumento · timbre">
          <Seg options={['piano','órgão','cordas','violão','sine']} active="piano" />
          <SettingHelp>Senoidal é a referência mais limpa. Útil pra testar se o reconhecimento depende do timbre.</SettingHelp>
        </SettingRow>

        <SettingRow label="variações de acorde">
          <Seg options={['off','oitavas','full']} active="off" />
          <SettingHelp>Variações forçam abstração da altura — aprendizado mais robusto, mas mais lento.</SettingHelp>
        </SettingRow>

        <SettingRow label="tamanho da sessão">
          <Seg options={['15','30','50','100']} active="30" />
        </SettingRow>

        <SettingRow label="probe automático">
          <Seg options={['off','a cada 5']} active="a cada 5" />
          <SettingHelp>Probe usa variações inéditas, sem feedback. Mede generalização.</SettingHelp>
        </SettingRow>

        <SettingRow label="lembrete diário">
          <Seg options={['off','9h','19h','custom']} active="9h" />
        </SettingRow>

        <div style={{ marginTop: 28 }}>
          <Label style={{ display: 'block', marginBottom: 10 }}>dados</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
            <Btn variant="ghost">Exportar JSON</Btn>
            <Btn variant="ghost">Exportar CSV</Btn>
          </div>
          <Btn variant="ghost" block>Importar JSON</Btn>
        </div>

        <div style={{ marginTop: 22 }}>
          <Btn variant="danger" block small>Resetar progresso</Btn>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, children }) {
  return (
    <div style={{ padding: '16px 0', borderBottom: `1px solid ${T.line}` }}>
      <Label style={{ display: 'block', marginBottom: 10 }}>{label}</Label>
      {children}
    </div>
  );
}

function SettingHelp({ children }) {
  return (
    <p style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: 11.5, color: T.textMute, marginTop: 8, lineHeight: 1.45 }}>{children}</p>
  );
}

// ─── Method (science page) ───
function ScrMethod() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="método" meta="" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 28px' }}>
        <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, letterSpacing: '-0.02em', marginBottom: 12 }}>O método Eguchi</h2>
        <p style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.6, color: T.text, marginBottom: 10 }}>
          Eiko Eguchi (Chiba Music Institute, Japão) associa cada acorde a uma <em style={{ color: T.accent }}>cor</em> — publicado em <em>Shin-zettai onkan program</em> (Eguchi, 1991). Crianças de 2 a 6 anos treinadas assim desenvolvem <em style={{ color: T.accent }}>perfect pitch</em> verdadeiro em alta proporção — replicado por Sakakibara (2014).
        </p>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.textDim, marginBottom: 10 }}>
          A premissa neurológica: crianças codificam altura como propriedade <em>absoluta</em>; adultos migram para processamento <em>relativo</em> — deslocamento perceptual descrito por Sergeant &amp; Roche (1973). Cores forçam rotulagem direta da altura.
        </p>

        <div style={{ padding: 14, background: 'rgba(212,101,74,0.07)', borderLeft: `2px solid ${T.accent}`, borderRadius: 2, margin: '14px 0' }}>
          <strong style={{ color: T.accent, fontFamily: T.serif, fontSize: 14 }}>Caveat para adultos.</strong>
          <p style={{ fontFamily: T.serif, fontSize: 13, color: T.textDim, lineHeight: 1.55, marginTop: 6 }}>
            A literatura para adultos é escassa. O que tipicamente se desenvolve é <em>absolute labeling</em> — capacidade treinada de rotular alturas, dependente de timbre e contexto. Wong et al. (2025) mostraram que &gt;90% é viável em notas isoladas, mas o sinal só é absoluto quando RT &lt; ~2s.
          </p>
        </div>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Como este lab estende</h3>
        <ul style={{ paddingLeft: 16, fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          <li style={{ marginBottom: 6 }}><strong>Baseline</strong> — 50 trials cegos antes de qualquer treino.</li>
          <li style={{ marginBottom: 6 }}><strong>Probe</strong> — a cada 5 sessões, 10 trials com variações inéditas.</li>
          <li style={{ marginBottom: 6 }}><strong>Diário</strong> — covariáveis registradas (sono, café, mood).</li>
          <li style={{ marginBottom: 6 }}><strong>Inferência bayesiana</strong> — P(acerto &gt; 85% | dados) &gt; 95% para desbloquear, com Beta(1,1). RT médio alvo &lt; 2000ms (Wong et al., 2025).</li>
        </ul>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Limitações</h3>
        <ul style={{ paddingLeft: 16, fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          <li style={{ marginBottom: 6 }}>N=1 sem grupo controle</li>
          <li style={{ marginBottom: 6 }}>Síntese ≠ piano real</li>
          <li style={{ marginBottom: 6 }}>Threshold de 85% é arbitrário (mas &gt;&gt; chance de 12.5%)</li>
        </ul>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Referências</h3>
        <ul style={{ paddingLeft: 16, fontFamily: T.serif, fontSize: 12.5, lineHeight: 1.55, color: T.textDim }}>
          <li style={{ marginBottom: 5 }}>Eguchi, M. (1991). <em>Shin-zettai onkan program</em>. Ichionkai.</li>
          <li style={{ marginBottom: 5 }}>Sakakibara, A. (2014). <em>Psychology of Music</em>.</li>
          <li style={{ marginBottom: 5 }}>Sergeant &amp; Roche (1973). <em>Psychology of Music</em>.</li>
          <li style={{ marginBottom: 5 }}>Wong, P. M. et al. (2025). <em>PMC</em>.</li>
        </ul>
      </div>
    </div>
  );
}

// ─── Para os Pais ───
function ScrParents() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <TopBar back="← Menu" title="para os pais" meta="" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 22px 28px' }}>
        <h2 style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 28, letterSpacing: '-0.02em', marginBottom: 12 }}>Para os pais</h2>
        <p style={{ fontFamily: T.serif, fontSize: 14.5, lineHeight: 1.6, color: T.text, marginBottom: 10 }}>
          Este app digitaliza um método pedagógico de 1991, com tracking experimental honesto. Aqui ficam as razões científicas das escolhas — e os limites do que ele pode entregar.
        </p>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Para quem foi desenhado</h3>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          Alvo primário: <strong>crianças 2–6 anos</strong>, faixa em que Sakakibara (2014) documentou desenvolvimento de ouvido absoluto verdadeiro com o método Eguchi. Adultos podem usar como instrumento N=1 — o que se desenvolve é "<em>absolute labeling</em>", com gargalo temporal próprio (Wong et al., 2025).
        </p>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Por que cores, não notas</h3>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          Sergeant &amp; Roche (1973) mostraram que crianças pequenas processam altura como propriedade <em>absoluta</em>. O cérebro adulto migra para <em>relativa</em> (intervalos). Cores são rótulos diretos — driblam o cálculo intervalar. Mapeamento exato: Eguchi (1991).
        </p>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Quando uma cor é "dominada"</h3>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          Critério clássico (Sakakibara, 2014): ~100% antes de liberar próximo bloco. Aqui o equivalente bayesiano: <strong>P(p &gt; 85% | dados) &gt; 95%</strong>, mínimo 50 trials e 7 dias no nível. Em sessões longas, os dois critérios convergem.
        </p>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Por que o limite de 2 segundos</h3>
        <p style={{ fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text, marginBottom: 8 }}>
          Wong et al. (2025): RT marca a diferença entre dois processos.
        </p>
        <ul style={{ paddingLeft: 16, fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          <li style={{ marginBottom: 6 }}><strong>RT &lt; 2000ms</strong> — memória absoluta, rótulo "<em>absoluto</em>"</li>
          <li style={{ marginBottom: 6 }}><strong>RT ≥ 2000ms</strong> — cálculo intervalar, rótulo "<em>calculado — sinta, não pense</em>"</li>
        </ul>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Como usar com uma criança</h3>
        <ul style={{ paddingLeft: 16, fontFamily: T.serif, fontSize: 13.5, lineHeight: 1.6, color: T.text }}>
          <li style={{ marginBottom: 6 }}><strong>Sessões curtas.</strong> 5–10 min.</li>
          <li style={{ marginBottom: 6 }}><strong>Cadência diária</strong> &gt; duração longa.</li>
          <li style={{ marginBottom: 6 }}><strong>Espere o bloqueio</strong> antes de liberar a próxima cor.</li>
          <li style={{ marginBottom: 6 }}><strong>Use o diário</strong> para separar variância de progresso.</li>
          <li style={{ marginBottom: 6 }}><strong>Baseline antes</strong> — sem ponto de partida, melhora não é interpretável.</li>
        </ul>

        <div style={{ padding: 14, background: 'rgba(212,101,74,0.07)', borderLeft: `2px solid ${T.accent}`, borderRadius: 2, margin: '14px 0' }}>
          <strong style={{ color: T.accent, fontFamily: T.serif, fontSize: 14 }}>Limites honestos.</strong>
          <p style={{ fontFamily: T.serif, fontSize: 13, color: T.textDim, lineHeight: 1.55, marginTop: 6 }}>
            N=1 sem grupo controle. Síntese aditiva ≠ piano acústico. Threshold de 85% é arbitrário (mas &gt;&gt; chance 12.5%). Probes periódicos verificam generalização.
          </p>
        </div>

        <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontStyle: 'italic', fontSize: 17, color: T.accent, marginTop: 22, marginBottom: 6 }}>Referências</h3>
        <ul style={{ paddingLeft: 16, fontFamily: T.serif, fontSize: 12.5, lineHeight: 1.55, color: T.textDim }}>
          <li style={{ marginBottom: 5 }}>Eguchi, M. (1991). <em>Shin-zettai onkan program</em>. Ichionkai.</li>
          <li style={{ marginBottom: 5 }}>Sakakibara, A. (2014). <em>Psychology of Music</em>.</li>
          <li style={{ marginBottom: 5 }}>Sergeant &amp; Roche (1973). <em>Psychology of Music</em>.</li>
          <li style={{ marginBottom: 5 }}>Wong, P. M. et al. (2025). <em>PMC</em>.</li>
        </ul>
      </div>
    </div>
  );
}

Object.assign(window, { ScrDiary, ScrExplore, ScrSettings, ScrMethod, ScrParents, Field, SettingRow, SettingHelp });
