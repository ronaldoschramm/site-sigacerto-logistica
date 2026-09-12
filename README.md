# Hub de Logística — Sigacerto Technology

Página principal (hub) que une o **Rastboy** e o **RotaCerta Roteirizador** em um único ponto de entrada, conforme especificado em [`projeto-hub-logistica (1).md`](./projeto-hub-logistica%20%281%29.md).

As páginas de produto (`sigacerto.com.br/rastboy` e `sigacerto.com.br/rotacerta-roteirizador`) **não foram alteradas** — este repositório contém apenas a nova página de hub, pensada para ser publicada em um subdomínio (ex.: `logistica.sigacerto.com.br`).

## Estrutura

```
index.html              → a página do hub
assets/css/style.css    → design system da Sigacerto Technology (copiado do site principal, sem alterações)
assets/js/main.js       → scripts compartilhados (scroll do header, menu mobile, reveal on scroll)
assets/img/logo/        → logo Sigacerto Technology
assets/img/rastboy/     → print do painel do Rastboy (reaproveitado da página existente)
assets/img/rotacerta/   → prints dos painéis do RotaCerta (reaproveitados da página existente)
```

> Durante a construção deste hub, cópias de referência do site em produção (HTML/CSS/JS de `sigacerto.com.br`) foram baixadas localmente em `ref/` para consulta — essa pasta é ignorada pelo git e não faz parte do site publicado.

## Decisões tomadas nos pontos em aberto (seção 6 do documento)

O documento original deixou 5 decisões em aberto. Para não travar a entrega, segui com os defaults abaixo — todos reversíveis e fáceis de ajustar:

1. **URL da home**: este repositório é o próprio hub (`index.html`), pensado para um subdomínio dedicado (`logistica.sigacerto.com.br`), sem substituir nenhuma página existente.
2. **Nome do hub**: sem marca própria — apresentado como página institucional "Sigacerto Technology · Logística de última milha", sem inventar um nome de produto guarda-chuva.
3. **WhatsApp da seção final**: usei o número institucional já usado em "Fale com um Consultor" no site principal ((11) 96602-1768) como WhatsApp de triagem no header e no CTA final. Cada card de produto continua linkando para a própria página (que tem o WhatsApp específico de cada um — o Rastboy usa (11) 99346-8445).
4. **Formulário de contato**: não incluí formulário próprio no hub — o direcionamento é sempre para WhatsApp ou para a página do produto, como o próprio Rastboy já faz.
5. **Navegação do site principal**: o hub **não foi adicionado ao menu do site principal** (`sigacerto.com.br`), já que isso exigiria alterar páginas fora do escopo deste repositório. O header do hub linka para Rastboy, RotaCerta, Soluções e Contato do site principal; o rodapé reaproveita a navegação institucional (Consultoria, Academia, Soluções, Contato) apontando para `sigacerto.com.br`.

Vale revisar essas 5 decisões com o responsável do projeto antes de publicar em produção.

## Publicar

É um site estático — basta subir `index.html` e a pasta `assets/` para o subdomínio escolhido. Nenhuma dependência de build.
