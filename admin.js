// ========== server.js ==============
// Requirements
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))

// express server definition
const app = express()
app.use(bodyParser.json())

// Resources definitions
const User = mongoose.model('Dental Sorriso', { nome: String, CPF: String, peso: String, altura: String })

const UserDental = mongoose.model(' Dental sorriso', { nome: String, CPF: String, peso: String, altura: String })


var artcileSchema = new mongoose.Schema({
 nome: String,
 CPF: String,
 Endereço: String,
created_at: { type: Date, default: Date.now }
});

const Article = mongoose.model('Pampulha Intermédica', artcileSchema);


//outros planos
const UserMente = mongoose.model('Mente Sã, Corpo São', { CPF: String, 'Horas meditadas nos últimos 7 dias': String })

var artcileSchema1 = new mongoose.Schema({
 nome: String,
 CPF: String,
 Email: String,
created_at: { type: Date, default: Date.now }
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
  icon: 'fa fa-coffee',
}

const managerParent = {
  name: 'Acme Co',
  icon: 'fa fa-cog',
	
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
       resource: Article, options: {
         properties: {
           created_at: { isVisible: { list: false, filter: false, show: true, edit: false } }
        },
         parent: createParent
      }
    },
    {
      resource: ArticleNorte, options: {
        properties: {
          created_at: { isVisible: { list: false, filter: false, show: true, edit: false } }
       },
        parent: managerParent
     }
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
