const app = require('./app');


const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log('Server started on PORT 8000')
})
