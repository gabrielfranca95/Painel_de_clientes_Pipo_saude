# Painel_de_clientes_Pipo_saude
Os demais arquivos do projeto encontram-se no branch master, porém os mesmos serão instalados em sua maquina seguindo o tutorial abaixo!
#### Aplicação de um painel de planos de saúde e cadastros de clientes com node.js, Express, Mongodb e React(adminbro)
![WhatsApp Image 2022-03-23 at 09 05 36](https://user-images.githubusercontent.com/57453192/159696341-82de8083-a281-4563-830d-24a197f0f73c.jpeg)

A aplicação permite a inserção de novos usuários nos planos de saúde baseando-se nas informações solicitatas por cada plano como mostra a imagem abaixo:
![WhatsApp Image 2022-03-23 at 09 04 11](https://user-images.githubusercontent.com/57453192/159697676-0e41b90e-adb4-4a50-ba91-943680b96a04.jpeg)

Utilizando node.js, Express para ciração do servidor local, mongodb como banco de dados e solicitando a biblioteca mongoose, e utilizando react com adminBro.
## Requisitos:
````
node.js versão LTS instalado em sua maquina, mongodb versão local, (também podendo ser cirado com o mongo atlas, porém para este tutorial usaremos a versão local)  Express formidable
````
## Requisitos de hardware estimados:
````
a aplicação foi rodada em uma VM linux ubuntu, com as seguintes configurações: 4gbRam, 20gb de armazenamento interno.
````
# Mão na massa:
Abra o seu editor de códigos, eu utilizo o vs code, link para downloado: https://code.visualstudio.com/

Crie um arquivo chamado admin.js em um repositorio local(pasta):
````
touch admin.js
````
Agora abra o admin.js, com seu editor de códigos e insira:
````
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const { float } = require('webidl-conversions')
const { number } = require('yargs')

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// express server definition
const app = express()
app.use(bodyParser.json())

// Resources definitions
const User = mongoose.model('Dental Sorriso', { nome: String, CPF: String, 'peso (kg)': String, 'altura (cm)': String })

const UserDental = mongoose.model(' Dental sorriso', { nome: String, CPF: String, 'peso (kg)': String, 'altura (cm)': String })


var artcileSchema = new mongoose.Schema({
 nome: String,
 CPF: String,
 Endereço: String,
'Data de Admissão': { type: Date, default: Date.now }
});

const Article = mongoose.model('Pampulha Intermédica', artcileSchema);


//outros planos
const UserMente = mongoose.model('Mente Sã, Corpo São', { CPF: String, 'Horas meditadas nos últimos 7 dias': String })

var artcileSchema1 = new mongoose.Schema({
 nome: String,
 CPF: String,
 Email: String,
Data_de_Admissão: { type: Date, default: Date.now }
});

const ArticleNorte = mongoose.model('Norte Europa', artcileSchema1);


// Routes definitions
app.get('/', (req, res) => res.send('Hello World!'))

// Route which returns last 100 users from the database
app.get('/users', async (req, res) => {
 const users = await User.find({}).limit(10)
 res.send(users)
})

// Route which creates new user
app.post('/users', async (req, res) => {
 const user = await new User(req.body.user).save()
 res.send(user)
})

// Route whick retuns articles
app.get('/articles', async (req, res) => {
 const articles = await Article.find({}).limit(10)
 res.send(articles)
})


const createParent = {
  name: 'Tio Patinhas Bank',
  icon: false,
}

const managerParent = {
  name: 'Acme Co',
  icon: false,
	
}


// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [
    {
       resource: User, options: { parent: managerParent }
    },
    {
       resource: UserMente, options: { parent: createParent }
    },
    {
      resource: UserDental, options: { parent: createParent }
   },
    {
       resource: Article, options: { parent: createParent}
    },
    {
      resource: ArticleNorte, options: { parent: managerParent }
    }
  ],





 rootPath: '/admin',
  branding: {
    companyName: 'PIPO SAÚDE', logo: false
  },
})




// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

// Running the server
const run = async () => {
 await mongoose.connect('mongodb://localhost/admin', { useNewUrlParser: true })
 await app.listen(8080, () => console.log(`Example app listening on port 8080!`))
}

run()
````
Em breve irei dar mais explicações sobre o código acima, mas antes vamos terminar as configurações!
Agora com seu arquivo criado vamos para algumas configurações do adminBro; abra o terminal no vs code digite o camando abaixo:
````
npm install admin-bro admin-bro-expressjs
````
Caso já tenho o express instalado desconsidere a linha abaixo, caso não tenha, digite:
````
npm install express express-formidable
````

## banco de dados

Utilizaremos o mongodb localmente, certifiquese de te-lo atualizado em sua máquina, utilizaremos a biblioteca mongoose, ligando a mesma ao adminbro, para tal feito digite o camando abaixo:
````
npm install admin-bro-mongoose
````
lembre-se de ter iniciado o mongodb, caso não o tenha feito, abra outra aba no terminal e digite:
````
sudo systemctl start mongod
````
## Aplicação
para rodar a aplicação digite no terminal:
````
node admin.js
````
e acesse: http://localhost:8080/admin para ver a aplicação funcionando!

## Alterando a aparência
Agora irei mostrar como é possível manipular um pouco do adminiBro por ser uma aplicação react as possibilidades são vastas aqui irei mostrar alguns recursos, para mais informações visite o site da documentação oficial neste link: https://v2.adminbro.com/tutorial-writing-react-components.html
### Manipulando o Título
para manipular o título que aparece na barra de navegação procure pelo seguinte trecho de código no arquivo admin.js:
````
 rootPath: '/admin',
  branding: {
    companyName: 'PIPO SAÚDE', logo: false
  },
})
````
dentro do campo comentado como :// Pass all configuration settings to AdminBro
e modifique para 
````
 rootPath: '/admin',
  branding: {
    companyName: 'Seu Título', logo: false
  },
})

````
para ver as alterações basta reestartar a aplicação, encerrando o servidor e ligando novamente com (node admin.js)
### Manipulando a logotipo
Para inserir uma logotipo a sua aplicação informe a fonte da mesma no campo descrito como logo. Eu deixei o campo como false pois caso não o faça a aplicação exibirá a logo padrão do adminBro. segue abaixo o exemplo de modificação da logo:
````
 rootPath: '/admin',
  branding: {
    companyName: 'Seu Título', logo: https://localdasualogo/referencia.com
  },
})

````
### Adicionando e removendo empresas
para realizar tal manipulção será necessário modificar o arquivo presente no conjunto de códigos comentado como: // Route whick retuns articles

onde cada const é uma empresa, sendo assim para adicionar uma nova empresa será necessário criar um conjunto similar aos existente e adicionar ao código:
````
const novaempresa = {
  name: 'nome da empresa visivel na aplicação',
  icon: false,
}
````
Feito isso você cria uma nova empresa, ao atualizar o servidor será possível visualiza-la. Alem disto é possivel importar um icone para identificar a empresa substituindo o campo "icon: false," pelo codigo do icone desejado.

### Movendo os planos de saúde entre as empresas
apos criar este novo conjunto de código procure pela seção de comentários descrito como: // Pass all configuration settings to AdminBro
e observe que em cada resource existe uma empresa a ser referenciada como por exemplo "managerParent" que é referenciada por "User" onde User é um plano de saúde e managerParent é uma empresa, logo para mover um plano para outra empresa basta trocar a empresa referenciada como no exemplo abaixo:
````
// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [
    {
       resource: User, options: { parent: novaempresa }
    },
    {
       resource: UserMente, options: { parent: createParent }
    },
    {
      resource: UserDental, options: { parent: createParent }
   },
    {
       resource: Article, options: { parent: createParent}
    },
    {
      resource: ArticleNorte, options: { parent: managerParent }
    }
````

onde o primeiro contido o trecho "novaempresa" é a ultima empresa adicionada, e agora um exemplo de como ficaria o codigo se movessemos todos os planos para nova empresa:
````
// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [
    {
       resource: User, options: { parent: novaempresa }
    },
    {
       resource: UserMente, options: { parent: novaempresa }
    },
    {
      resource: UserDental, options: { parent: novaempresa }
   },
    {
       resource: Article, options: { parent: novaempresa}
    },
    {
      resource: ArticleNorte, options: { parent: novaempresa }
    }
````
deste modo todos os planos de saúde seriam movidos para a nova empresa visivel na aplicação.

### Adicionando e modificando planos de saúde
Para adicionar novos planos de saude procure pelo campo comentado como // Resources definitions
e observer que a "cost User" cria uma arrey para o mongo db contendo os seguintes campos:  
````
const User = mongoose.model('Dental Sorriso', { nome: String, CPF: String, 'peso (kg)': String, 'altura (cm)': String })
````
Este trecho de código representa o plano de saúde Dental sorriso, note que logo abaixo existe outro campo semelhante porem com um espaço entre as "" este espaço foi proposital para que o banco de dados não enterpretasse o plano de saúde como sendo igual ao plano de saúde da outra empresa já que temos duas empresas com o mesmo plano contido, porém cada empresa possui seus funcionários, caso não o tivesse referenciado o banco de dados iria receber os funcionários dos dois planos em conjunto causando uma desorganização.
seguindo com o código para adicionar seções de preênchimento de dados ou removelas acrescente ou apague os campos:
````
const User = mongoose.model('Dental Sorriso', { CPF: String, Rg: String, 'altura (cm)': String })
````
como o exemplo acima mostra o campo nome foi removido e o campo rg foi adicionado, sendo assim na aplicação sera exibido exatamente o que foi descrito no código e respectivamente armazenado no banco de dados.
Para adicionar um novo plano basta copiar o conjunto de codigos e respectivamente modificar as informações desejadas:
````
const User = mongoose.model('Dental Sorriso', { nome: String, CPF: String, 'peso (kg)': String, 'altura (cm)': String })
const novoplano = mongoose.model('Nome do novo plano', { CPF: String, 'peso (kg)': String, 'altura (cm)': String })
````
acima o exemplo em que foi copiado o plano "Dental sorriso" e adicionado um novo plano sem exigências de cpf para cadastrar um novo usuário. Feito isso basta adicionar o plano no campo // Pass all configuration settings to AdminBro
referenciando a empresa a qual o plano deve fazer parte:
````
// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
  resources: [
    {
       resource: User, options: { parent: managerParent }
    },
    {
    //novo plano adicionado
       resource: novoplano, options: { parent: createParent } 
    },
    {
       resource: UserMente, options: { parent: createParent }
    },
    {
      resource: UserDental, options: { parent: createParent }
   },
    {
       resource: Article, options: { parent: createParent}
    },
    {
      resource: ArticleNorte, options: { parent: managerParent }
    }
````

