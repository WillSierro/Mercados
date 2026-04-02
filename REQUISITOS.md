# Requisitos do Projeto - Sakashita Ofertas

## Objetivo

Criar um aplicativo simples para a Sakashita publicar ofertas do dia em um canal proprio, substituindo a divulgacao manual feita hoje pelo WhatsApp.

## Problema atual

- As ofertas sao divulgadas manualmente pelo WhatsApp
- O cliente nao tem um lugar central para consultar promocoes
- O mercado depende de envio manual e repetitivo
- Fica mais dificil organizar ofertas por loja, categoria e validade

## Objetivo do MVP

Entregar uma primeira versao em que:

- o mercado consegue cadastrar, editar e remover ofertas
- o cliente consegue visualizar as ofertas do dia
- o cliente consegue buscar produtos e filtrar promocoes
- o cliente consegue escolher loja e modo de atendimento

## Perfis de usuario

### Cliente

- visualiza ofertas do dia
- busca produtos por nome
- filtra por categoria
- visualiza apenas ofertas da loja selecionada
- escolhe entre entrega e retirada

### Administrador do mercado

- cadastra novas ofertas
- edita ofertas existentes
- ativa ou pausa promocoes
- exclui ofertas vencidas ou incorretas

## Requisitos funcionais do cliente

1. O app deve exibir a lista de ofertas ativas.
2. O app deve permitir busca por nome do produto.
3. O app deve permitir filtro por categoria.
4. O app deve permitir ordenar ofertas por relevancia, desconto e preco.
5. O app deve permitir alternar entre entrega e retirada.
6. O app deve permitir selecionar a loja desejada.
7. O app deve mostrar preco atual, preco anterior, validade e unidade da oferta.
8. O app deve ter visual pensado para celular.

## Requisitos funcionais do painel administrativo

1. O painel deve permitir cadastrar produto promocional.
2. O painel deve permitir informar:
   produto, descricao, categoria, loja, preco atual, preco anterior, unidade, validade e tipo de atendimento.
3. O painel deve permitir destacar a oferta como promocao principal.
4. O painel deve permitir marcar uma oferta como oferta do clube.
5. O painel deve permitir editar uma oferta ja cadastrada.
6. O painel deve permitir pausar ou reativar uma oferta.
7. O painel deve permitir excluir uma oferta.

## Requisitos visuais e de marca

1. O app deve seguir a identidade da Sakashita.
2. As cores principais devem usar a base da marca:
   azul, vermelho e amarelo da sacola.
3. O visual nao deve copiar o concorrente, apenas seguir boas referencias de usabilidade.
4. A interface deve ser clara, simples e facil para clientes de todas as idades.

## Requisitos tecnicos do MVP atual

1. O prototipo deve funcionar sem backend nesta primeira fase.
2. Os dados podem ser persistidos localmente no navegador com `localStorage`.
3. O projeto deve abrir diretamente pelo arquivo `index.html`.
4. O MVP deve usar `HTML`, `CSS` e `JavaScript` puro.

## Requisitos para a proxima fase

1. Criar login para o administrador do mercado.
2. Separar o painel administrativo da area do cliente.
3. Conectar a um backend real.
4. Salvar ofertas em banco de dados.
5. Permitir upload de imagem do produto.
6. Publicar como app Android e, se fizer sentido, iPhone.
7. Enviar notificacoes com novas ofertas.
8. Criar relatorios de ofertas mais acessadas.

## Requisitos nao funcionais

1. O sistema deve ser simples de usar.
2. O cadastro de ofertas deve levar poucos passos.
3. O app deve ser responsivo em celular.
4. O carregamento deve ser rapido.
5. O layout deve permitir futura expansao para mais lojas.

## Fora do escopo do MVP atual

- pagamento online
- carrinho completo
- integracao com entregadores
- programa de fidelidade completo
- cupom automatizado
- chatbot

## Arquivos atuais do projeto

- [index.html](/C:/Users/WillS/OneDrive/Documentos/Mercados/index.html)
- [styles.css](/C:/Users/WillS/OneDrive/Documentos/Mercados/styles.css)
- [script.js](/C:/Users/WillS/OneDrive/Documentos/Mercados/script.js)
- [README.md](/C:/Users/WillS/OneDrive/Documentos/Mercados/README.md)

## Observacao importante

Este documento de requisitos e diferente de `requirements.txt`.

- `REQUISITOS.md` define o que o projeto precisa fazer
- `requirements.txt` seria usado apenas se o projeto tivesse dependencias Python
