import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
var a = 0
export const app = express()
export const router = express.Router() // router and apps are basically the same thing
export const log = (req, res, next) => {   // middleware
	console.log('logging' + a)
	a++
	req.mydata = 'hello'
	console.log(req.mydata)
	next()

}
var sendResponse = {firstObject: {'message': 'hello', 'key2': 'another value' }, secondObject: {another: 'object'}} 

app.disable('x-powered-by')

app.use('/api', router)
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))


app.get('/', [log, log, log], (req, res) => {
	res.send(sendResponse)
})

app.post('/', (req, res) => {
	console.log(req.body)
	res.send({ message: 'ok' })
})

export const start = () => {
app.listen(8080, () => {
	console.log("Server started on 3000")
})
}
