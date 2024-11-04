# Physical Store 📍
## Descrição
Physical store é uma API que permite localizar lojas física em um raio de 100km de um CEP fornecido. Com uma combinação de APIs de geolocalização e banco de dados, ela facilita a busca de informações sobre lojas próximas.


## 🛠️ Tecnologias Utilizadas
- Typescript             -- para a tipagem lógica
- MongoDB e Mongoose     -- banco de dados e modelagem de dados 
- Winston                -- para a geração de logs estruturados
- Axios                  -- para requisições HTTP
- Express                -- para gerenciar rotas e requisições
- Via CEP API            -- obter dados de endereço através de um CEP
- OpenCage API           -- converter endereços em coordenadas geográficas
  

## 🗂️ Estrutura do projeto
```plaintext
src
├── constants
│   └── errors.ts               # Define constantes de mensagens de erro.
├── controllers
│   └── storeController.ts      # Controla a lógica das operações de store.
├── middlewares
│   ├── correlation.ts          # Middleware para gerar correlationId nos logs.
│   ├── HTTPErrorHandler.ts     # Middleware para manipulação de erros HTTP.
│   └── validateStore.ts        # Middleware para validar dados de entrada.
├── models
│   ├── addressModel.ts         # Schema do modelo de endereço.
│   └── storeModel.ts           # Schema do modelo de loja.
├── routes
│   └── storeRoute.ts           # Define as rotas para manipulação de store.
├── services
│   ├── addressService.ts       # Serviço para manipulação de dados de endereço.
│   └── storeService.ts         # Serviço para manipulação de dados de loja.
├── utils
│   ├── calculateHaversineDistance.ts   # Função para calcular distância geográfica.
│   ├── logger.ts               # Configuração e criação de logs com Winston.
│   └── validatePostalCode.ts   # Validação de CEP.
├── app.ts                      # Configuração da aplicação.
├── mongoConnection.ts          # Configuração da conexão com MongoDB.
└── server.ts                   # Inicialização do servidor.
```


## 📚 Recursos
- GET /api/v1/stores - Retorna uma lista de stores
- GET /api/v1/stores/{id} - Retorna os detalhes de uma store específica
- POST /api/v1/stores - Cria uma nova store
- PUT /api/v1/stores/{id} - Atualiza uma store
- DELETE /api/v1/stores/{id} - Remove uma store
- GET /api/v1/stores/nearby/{cep} - Busca as stores em um raio de 100km
