# Contrato de tokens de design fixo, valores livres por Produto

**Contexto:** a página atual segue uma "regra de ouro" de design: fundo sempre dark/cyber, uma única cor de acento variável, cor "real" só entra via PNG do rótulo do produto. Isso não se sustenta para produtos de afiliado fora da categoria/estética da Energi Power — alguns podem pedir esquemas claros.

**Decisão:** a Base abandona a suposição de dark mode. Cada Produto pode definir uma paleta inteiramente livre, incluindo esquemas claros. O que permanece fixo é o *contrato de papéis* de tokens (ex.: background, surface, text-primary, text-muted, accent, accent-dark) — todo Produto preenche o mesmo conjunto nomeado, só os valores mudam. Componentes compartilhados que dependem de contraste (glow do produto, Border Beam, HUD) são escritos para se adaptar ao contraste calculado desses tokens, não a um fundo escuro fixo.

**Por quê:** liberdade total (cada Produto definindo seus próprios papéis/overrides de componente) tornaria a Base pouco mais que um ponto de partida para fork, perdendo o principal benefício de reuso — propagar melhorias de componente a todos os Produtos. Papéis fixos com valores livres preserva esse benefício e ainda entrega liberdade visual completa por Produto.
