# Base como monorepo com build e deploy isolado por Produto

**Contexto:** o repo hoje é uma landing page única (Energi Power by Vee), hardcoded de ponta a ponta. Queremos reaproveitá-lo para gerar múltiplas landing pages de afiliado, uma por Produto promovido, mantendo estrutura, design e mecanismos que funcionam.

**Decisão:** o repo vira a própria Base — não um template separado clonado por produto. Organização em monorepo: um núcleo compartilhado (componentes, seções, motion, engine de design) mais uma configuração por Produto. O build seleciona um Produto e gera uma Instância isolada, publicada em seu próprio container/subdomínio — o mesmo padrão de deploy (Traefik, um container por `Host`) já usado na infra existente do usuário para outros serviços.

**Por quê:** um app único multi-tenant (runtime decidindo o produto pelo hostname) fugiria do padrão de infra já estabelecido e adicionaria complexidade de runtime desnecessária. Branch-por-produto diverge com o tempo e vira trabalho manual de merge. Monorepo com núcleo compartilhado + build por Produto mantém uma correção no núcleo propagando a todos os Produtos já publicados, sem acoplar deploys entre si.
