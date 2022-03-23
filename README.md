# Painel_de_clientes_Pipo_saude
#### Aplicação de um painel de planos de saúde e cadastros de clientes com node.js, Express, Mongodb e React(adminbro)
![WhatsApp Image 2022-03-23 at 09 05 36](https://user-images.githubusercontent.com/57453192/159696341-82de8083-a281-4563-830d-24a197f0f73c.jpeg)

A aplicação permite a inserção de novos usuários baseando-se nos planos de saúde baseando-se nas informações solicitatas pelos planos de saúde como mostra a imagem abaixo:
![WhatsApp Image 2022-03-23 at 09 04 11](https://user-images.githubusercontent.com/57453192/159697676-0e41b90e-adb4-4a50-ba91-943680b96a04.jpeg)

Utilando node.js, Express para ciração do servidor local, mongodb como banco de dados e solicitando a biblioteca mongoose, e utilizando react com adminBro.
## Requisitos:
````
node.js versão LTS instalado em sua maquina, mongodb versão local, (também podendo ser cirado com o mongo atlas, porém para este tutorial usaremos a versão local)  Express formidable
````
## Requisitos de hardware estimados:
````
a aplicação foi rodada em uma VM com as seguintes configurações: 4gbRam, 20gb de armazenamento interno.
````
# Mão na massa:
Crie um arquivo chamado admin.js em um repositorio local(pasta):
````
touch admin.js
````
agora com seu arquivo criado vamos para algumas configurações do adminBro; digite o camando abaixo:
````
npm install adminjs @adminjs/express
````
Caso já tenho o express instalado desconsidere a linha abaixo, caso não tenha digite:
````
npm install express express-formidable
````

## banco de dados

Utilizaremos o mongodb localmente, certifiquese te-lo atualizado em sua máquina, utilizaremos a biblioteca mongoose, lincando a mesma ao adminbro, para tal feito digite o camando abaixo:
````
npm install @adminjs/mongoose
````

