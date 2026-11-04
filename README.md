# Wordburguer Lanches — site de pedidos

Protótipo do cardápio online da **Wordburguer Lanches** (São Luís, MA). O cliente monta o pedido, escolhe entrega ou retirada e envia tudo pronto pelo WhatsApp da loja.

Site estático: HTML, CSS e JavaScript puros, sem build e sem dependências.

## Estrutura

```
.
├── index.html          # estrutura da página (hero, cardápio, rodapé, carrinho)
├── css/
│   └── style.css       # todos os estilos (cores em variáveis no :root)
├── js/
│   ├── menu.js         # DADOS: telefone do WhatsApp, itens, preços e tamanhos
│   ├── burger-art.js   # desenho SVG dos hambúrgueres, camada por camada
│   └── app.js          # carrinho, renderização, formulário e envio
├── assets/
│   └── favicon.svg
└── vercel.json         # configuração do deploy
```

Os scripts são carregados nessa ordem (`menu.js` → `burger-art.js` → `app.js`).

## Alterações comuns

- **Preços, nomes e itens:** `js/menu.js`. Hambúrgueres usam `p: [simples, duplo, triplo]`; porções e bebidas usam `price`.
- **Número do WhatsApp:** constante `PHONE` em `js/menu.js` (só dígitos, com 55 + DDD). O número exibido no rodapé e no carrinho fica em `index.html`.
- **Cores e fontes:** variáveis no topo de `css/style.css`.
- **Ingredientes desenhados:** cada camada (queijo, bacon, ovo…) é uma entrada do objeto `L` em `js/burger-art.js`.

## Rodar localmente

Basta abrir `index.html` no navegador. Ou, com um servidor local:

```bash
npx serve .
```

## Deploy na Vercel

1. Suba o repositório no GitHub.
2. Na Vercel, **Add New → Project** e importe o repositório.
3. Framework Preset: **Other**. Sem comando de build; diretório de saída: raiz (`.`).
4. Deploy. Cada `git push` na branch principal publica uma nova versão.
