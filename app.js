const express = require('express')
const data = require('./data.json')

const app = express()

const port = 3000;

app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { object: data.projects })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id
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
    const errorMessage = err.message
    const errorStatus = err.status
    const errorStack = err.stack
    res.render('error', { errorMessage, errorStatus, errorStack });
    console.log(`Sorry, there was following error: ${errorMessage}`)
})


app.listen(port, () => {
    console.log(`App is running on localhost:${port}`)
})
