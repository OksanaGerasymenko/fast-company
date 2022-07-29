const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose')
const config = require('config')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', routes)

const PORT = config.get('port') ?? 8080

// if (process.env.NODE_ENV === 'production') {
//     console.log('production')
// } else {
//     console.log('development')
// }

async function start() {
  try {
    mongoose.connection.once( 'open', ()=>{
      initDatabase()
    })
    await mongoose.connect(config.get('mongoUri'))
    console.log(chalk.green(`MongoDB has been connected`))
    app.listen(PORT, ()=>
      console.log(chalk.green(`server has been started at http://localhost:${PORT}`))
  )
  } catch (e) {
    console.log(chalk.red(e.message))
    process.exit(1)
  }
}

start()
