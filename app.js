const express = require('express')
const data = require('./data.json')

const app = express()

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    console.log(data.projects[0])

    res.render('index', { object: data.projects })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id
    console.log(projectId)
    res.render('project', {object: data.projects[projectId]})
})

app.use((req, res, next) => {
    const err = new Error('Not found')
    err.status = 404;
    next(err)
})


app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
    console.log('Sorry, page not found')
})


app.listen(3000, () => {
    console.log('App is running on port localhost:3000')
})
