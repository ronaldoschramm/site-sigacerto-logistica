# Hub de Logística — Sigacerto Technology

Site completo de logística da Sigacerto Technology: uma página hub que une o **Rastboy** e o **RotaCerta Roteirizador**, com as páginas dos dois produtos hospedadas aqui mesmo — tudo dentro de `logistica.sigacerto.com.br`, sem o visitante sair do site.

Conteúdo baseado em [`projeto-hub-logistica (1).md`](./projeto-hub-logistica%20%281%29.md). As páginas originais em `sigacerto.com.br/rastboy` e `sigacerto.com.br/rotacerta-roteirizador` **não foram alteradas** — as versões aqui são cópias fiéis do conteúdo (mesmo texto, preços, FAQ e imagens), só com o cabeçalho e rodapé trocados para o menu único deste site (Logística · Rastboy · RotaCerta · Contato), para que a navegação nunca saia do domínio `logistica.sigacerto.com.br`.

## Estrutura

```
index.html                          → hub (home)
rastboy.html                        → página do Rastboy (serve em /rastboy)
rotacerta-roteirizador.html         → página do RotaCerta (serve em /rotacerta-roteirizador)
robots.txt                          → libera indexação e aponta para o sitemap
sitemap.xml                         → sitemap XML das 3 páginas do site
assets/css/style.css                → design system da Sigacerto Technology (copiado do site principal, sem alterações)
assets/js/main.js                   → scripts compartilhados (scroll do header, menu mobile, reveal on scroll)
assets/img/logo/                    → logo Sigacerto Technology
assets/img/rastboy/                 → print do painel do Rastboy usado no card do hub
assets/img/rotacerta/               → prints dos painéis do RotaCerta usados nos cards do hub
assets/img/rotacerta-roteirizador/  → prints usados dentro da própria página do RotaCerta
```

## SEO

O hub e as duas páginas de produto (Rastboy e RotaCerta) foram otimizados para busca orgânica, com foco na região de Sorocaba (Mairinque, São Roque, Sorocaba, Araçariguama, Itu):

- **`robots.txt` e `sitemap.xml`** na raiz do site, para facilitar o crawling e a indexação pelo Google.
- **Dados estruturados (JSON-LD)** em todas as páginas: `Organization`, `WebSite`, `SiteNavigationElement` e `ItemList` no hub (para reforçar a arquitetura do site perante o Google — sitelinks no resultado de busca são gerados algoritmicamente e não podem ser forçados, mas dependem justamente de uma navegação clara e bem marcada como esta); `Service` com `areaServed` nas 5 cidades em cada página de produto; `BreadcrumbList` em todas as páginas; `FAQPage` mantido e ampliado com perguntas sobre a área de atendimento.
- **Título, meta description e meta keywords** de cada página reescritos para incluir a região (Sorocaba, Itu, Mairinque) junto da proposta de valor de cada produto.
- **Seção "Onde atendemos"** no hub, citando as 5 cidades com uma frase específica de contexto para cada uma — bom para relevância local e para aparecer em buscas do tipo "rastreamento de motoboy em Sorocaba" ou "roteirizador para transportadora em Itu".
- Rodapé e FAQ de todas as páginas atualizados para citar Sorocaba (antes só aparecia São Roque, Araçariguama e Itu).

Vale complementar isso, fora do escopo deste repositório, com: cadastro no Google Business Profile de Mairinque, obtenção de backlinks/citações locais (guias comerciais de Sorocaba/Itu), e o cadastro do `sitemap.xml` no Google Search Console.

As URLs sem `.html` (ex. `/rastboy`) funcionam pelo comportamento padrão do Cloudflare Workers (`auto-trailing-slash`): uma requisição a `/rastboy` serve `rastboy.html` diretamente, sem redirecionamento.

Links para páginas institucionais que não existem neste site (Consultoria, Academia, "Ver todas as soluções", ERP, CRM) continuam apontando para `sigacerto.com.br`, já que são conteúdo fora do escopo de logística. Só os links entre hub/Rastboy/RotaCerta e o item "Contato" (que rola até a seção de fala com a Sigacerto no rodapé do hub) ficam internos.

> Durante a construção deste hub, cópias de referência do site em produção (HTML/CSS/JS de `sigacerto.com.br`) foram baixadas localmente em `ref/` para consulta — essa pasta é ignorada pelo git e não faz parte do site publicado.

## Decisões tomadas nos pontos em aberto (seção 6 do documento)

O documento original deixou 5 decisões em aberto. Para não travar a entrega, segui com os defaults abaixo — todos reversíveis e fáceis de ajustar:

1. **URL da home**: este repositório é o próprio hub (`index.html`), pensado para um subdomínio dedicado (`logistica.sigacerto.com.br`), sem substituir nenhuma página existente.
2. **Nome do hub**: sem marca própria — apresentado como página institucional "Sigacerto Technology · Logística de última milha", sem inventar um nome de produto guarda-chuva.
3. **WhatsApp da seção final**: usei o número institucional já usado em "Fale com um Consultor" no site principal ((11) 96602-1768) como WhatsApp de triagem no header e no CTA final. Cada card de produto continua linkando para a própria página (que tem o WhatsApp específico de cada um — o Rastboy usa (11) 99346-8445).
4. **Formulário de contato**: não incluí formulário próprio no hub — o direcionamento é sempre para WhatsApp ou para a página do produto, como o próprio Rastboy já faz.
5. **Navegação do site principal**: o hub **não foi adicionado ao menu do site principal** (`sigacerto.com.br`), já que isso exigiria alterar páginas fora do escopo deste repositório.

Vale revisar essas 5 decisões com o responsável do projeto antes de publicar em produção.

**Atualização**: a pedido, o Rastboy e o RotaCerta passaram a ser hospedados dentro deste mesmo site (veja "Estrutura" acima), com um único menu (Logística · Rastboy · RotaCerta · Contato) em todas as páginas — os links entre eles não saem mais para `sigacerto.com.br`.

## Publicar

É um site estático — basta subir `index.html` e a pasta `assets/` para o subdomínio escolhido. Nenhuma dependência de build.

### Deploy no Cloudflare

O site está publicado no Cloudflare Workers (assets estáticos), na conta que administra a zona `sigacerto.com.br` (login `ronaldo.schramm@yahoo.com.br`):

**https://logistica.sigacerto.com.br** (domínio definitivo)
**https://site-sigacerto-logistica.ronaldo-schramm.workers.dev** (fallback do workers.dev)

Para gerar um novo deploy após alterações:

```
npx wrangler deploy
```

`wrangler.jsonc` define o projeto (`site-sigacerto-logistica`), `assets.directory: "."` e a rota de Custom Domain para `logistica.sigacerto.com.br` (exige Worker e zona na mesma conta Cloudflare). O arquivo `.assetsignore` impede que `.git/`, `ref/`, `README.md` e arquivos de configuração sejam publicados junto com o site.
