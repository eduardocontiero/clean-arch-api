# README

## Orders API

Esta é uma API que simula um checkout básico de ecommerce desenvolvida com Typescript e Express seguindo os princípios de Clean Architecture. O objetivo principal é garantir uma arquitetura robusta, modular e de fácil manutenção.


### Como Rodar

Para executar esta API localmente, siga as instruções abaixo:

1. Certifique-se de ter o Node.js instalado na sua máquina.
2. Clone este repositório.
3. Navegue até o diretório raiz do projeto.
4. Instale as dependências utilizando o comando `npm install`.
5. Certifique-se de ter o MySQL instalado e rodando na sua máquina.
6. Execute o script SQL `create.sql` localizado no diretório `database` para criar o banco de dados necessário.
7. Execute o comando `npm run main` para iniciar o servidor.
8. Para testar a API, utilize o comando `npm run test`.

### Dependências

Aqui estão as principais dependências utilizadas neste projeto:

- `express`: Framework web para Node.js.
- `mysql`: Driver MySQL para Node.js.
- `jest`: Framework de teste para Node.js.

### Estrutura de Diretórios

- `src/`: Contém todo o código fonte da aplicação.
  - `application/`: Camada de aplicação e implementação das regras de negócio.
  - `domain/`: Camada de domínio, está o CORE da aplicação com entidades ricas e interfaces de repositórios.
  - `infra/`: Camada de Infraestrutura, se comunica com o mundo externo, contém implementação dos repositórios, controllers, broker, http.
- `database/`: Scripts SQL para criação do banco de dados e tabelas.


### Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
