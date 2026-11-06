# Portfólio

Landing page feita com Next.js e Tailwind, com o conteúdo gerido na Sanity.

## O que é um CMS, neste projeto

O CMS é o sítio onde editas o conteúdo sem mexer no código. Há três peças:

| Peça | O que é | Onde está |
| --- | --- | --- |
| **Site** | A página que as pessoas veem | `src/app/page.tsx`, `src/components/` |
| **Studio** | O painel onde escreves textos e carregas imagens | `/studio` no teu site |
| **Content Lake** | A base de dados da Sanity, na cloud | sanity.io |

Os **schemas** (`src/sanity/schemaTypes/`) definem os campos que aparecem no Studio.
Quando publicas uma alteração, o site mostra-a em cerca de um minuto.

## Ligação à Sanity

O site usa o projeto **Cunha** (`wu5sd9cv`), dataset `production`. O dataset é público: qualquer
pessoa pode ler o conteúdo publicado, mas só tu o podes editar.

O ID do projeto está em `src/sanity/env.ts`, por isso não é preciso configurar variáveis.
Para trabalhar localmente, corre `npm install` e `npm run dev`, e abre http://localhost:3000/studio.
O `localhost:3000` já está autorizado. Para usares a linha de comandos da Sanity, corre antes
`npx sanity login`.

## Editar o conteúdo

- **Perfil**: nome, email, bio, educação, experiência e competências. Existe só um.
- **Projetos**: nome, link, tags, descrição, estúdio, imagens e ordem. Um por projeto.

Carrega em **Publish** para a alteração ir para o site. Enquanto a Sanity estiver vazia,
o site mostra o conteúdo de exemplo do Figma (`src/content/fallback.ts`).

## Comandos

```bash
npm run dev        # servidor local em http://localhost:3000
npm run build      # build de produção
npm run typecheck  # verifica os tipos
```

## Publicar online

O site está na Netlify, ligado ao repositório do GitHub: cada envio para a `main` publica-o de novo.

Se mudares de domínio, autoriza-o para o Studio funcionar:

```bash
npx sanity cors add https://o-teu-dominio --credentials
```
