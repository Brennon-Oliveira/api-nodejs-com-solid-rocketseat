# App

GymPass style app

# RFs (Requisitos funcionais)

* [ ] Deve ser possível se cadastrar;
* [ ] Deve ser possível se autenticar;
* [ ] Deve ser possível obter o perfil do usuário logado;
* [ ] Deve ser possível obter o número de check-ins realizados pelo usuário
* [ ] Deve ser possível o usuário obter seu histórico de check-in
* [ ] Deve ser possível o usuário buscar academias próximas;
* [ ] Deve ser possível o usuário buscar academias pelo nome
* [ ] Deve ser possível o usuário relizar check-in na academia
* [ ] Deve ser possível validar o check-in do usuário
* [ ] Deve ser possível cadastrar uma academia

# RNs (Regras de negócio)

* [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
* [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
* [ ] O usuário não pode fazer check-in se não estiver parto (100m) da academia;
* [ ] O check-in só pode ser validado até 20 minutos após criado;
* [ ] O check-in só pode ser validado por administradores;
* [ ] A academia só pode ser cadastrada por administradores;

# RNFs (Requisitos não funcionais)

* [ ] A senha do usuário precisa estar criptografada;
* [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
* [ ] Todos listas de dados precisam estar paginadas com 20 itens por página;
* [ ] O usuário deve ser identificado por um JWT (JSON Web Token)