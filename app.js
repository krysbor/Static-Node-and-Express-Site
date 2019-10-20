const express = require('express')
const data = require('./data.json')

const app = express()

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id
    console.log(projectId)
    res.render('project')
})


app.listen(3000, () => {
    console.log('App is running on port localhost:3000')
})
