# CLI Nutri

Uma simples ferramenta para nutricionista em forma de CLI.

## Premissas Assumidas

Parti da premissa que a entidades cliente contem a maior importancia e podendo conter, varias consultas, cada consulta por sua vez pode ter varias cardapios de refeições; Desta maneira a nutricionista facilmente poderá levandar todos os dados historiograficos do tratamento de seus clientes.

Alem disso cardapios de refeições podem ser gerados de forma desacoplada de forma rapida e facil sendo armazenados e podendo ser utilziados posteriormente.

## Objetivo

O Objetivo deste programa é ser um esboçoe de um sistema para auxiliar nutricionistas em sua rotina de cadastro e manejo de consultas, clientes e dietas.

## Decisões de Projeto

Este projeto foi contruido usando NodeJS e suas bibliotecas padrões.

#### Arquitetura

A arquitetura deste projeto é baseada em duas simples camadas, uma cadamada de dados chamada de models, uma camada de logica de negocios chamada de helper e um wrapper que inicia essa chamada.

Os modelos de cliente e cardapios são editaveís possuindo um CRUD básico.

Food e Constants são modelos estaticos.

Os testes são divididos em testes unitarios e testes de integração/E2E.

Os testes E2E são contruidos sobre uma array de strings que será usada como entrada.

## Instruções para executar o sistema

Para executar este projeto basta clonar o repositorio entrar no diretorio do projeto e executar o comando "node app/main.js"

Para executar os testes de integração/e2e execute o comando "node tests/e2e.js "

Para executar os testes unitarios execute o comando "node tests/integration.js "

## Observações

##### Para informações mais detalhadas sobre as issues e possivéis melhorias apontadas pelo desenvolvedor veja a aba de **Issues**

Existem varias melhorias que eu gostaria de ter implementado neste projeto, entre elas estão:

-   Implementar CRUD para **food** com seu respectivo menu e roteiro.

-   Implementar tratamento em todas as entradas de dados, checando tipo e obrigatoriedade do campo.

-   Melhor navegação na exposição de elementos implementando uma paginação

-   Busca mais fluida e dinamica de elementos a partir da propriedade 'name' utilizando uma analise de semelhancia das palavras, atravez do algoritmo de distancia de edições entre duas strings (https://en.wikipedia.org/wiki/Levenshtein_distance)


