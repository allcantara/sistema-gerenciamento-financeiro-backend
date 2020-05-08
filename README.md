# Sistema de Gerenciamento Financeiro
Sistema desenvolvido para o teste de desenvolvedor junior da Perithus.
Clique aqui para [acessar a aplicação.](https://sigefi-frontend.herokuapp.com/)


### Desafio
"Temos pequenos distribuidores de sabonete que fazem esta atividade como uma renda extra familiar. Como não há uma educação econômica adequadamente provida a estes, faremos um pequeno sistema Web para ajudá-los a entender melhor como faturar e lucrar com a venda e distribuição dos produtos."

O principal desafio para a implementação dos requisitos foram os cálculos e em como aplicá-los de forma coerente no código. Deixei todo o "trabalho duro" pro backend e usei o frontend exclusivamente para a criação e exibição dos dados.

O desafio para dev junior teria o prazo de 5 dias. Minha alternativa foi focar no frontend para que ficasse com uma aparência moderna e criativa, que levou 3 dias. Os útimos dois dias foram exclusivos para o backend e a integração de ambas as aplicações.

### Solução
- ExpressJS e NodeJS: Usado para desenvolvimento do backend, criação do servidor e as rotas da aplicação.
- Mongoose: Conexão com o banco de dados MongoDB.
- Jest e Supertest: Criação de testes unitários e testes de integração. Neste projeto foi desenvido somente testes de integração para as rotas de cadastro de usuário e login.
- Celebrate: Utilizado para validação das requisições. Ele utiliza a biblioteca Joi para definir os tipos de dados que serão recebidos no body, params, query e headers.
- JsonWebToken e BcryptJS: Utilizado para criptografar a senha do usuário, realizar autenticação e validar o token que é enviado do headers durante as requisições.

