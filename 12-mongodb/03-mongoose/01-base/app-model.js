const mongoose = require('mongoose')
//引入模型
const User = require('./models/user')


mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
    throw new Error('DB error')
})
//连接DB
db.once('open', async () => {
    console.log('DB connected');
    try {
        const result = await User.estimatedDocumentCount()
        console.log(result)
    } catch (e) {
        console.log(e);
    }
})