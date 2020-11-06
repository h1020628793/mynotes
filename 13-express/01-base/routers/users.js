const express = require('express')
const router = express.Router()

router.get("/", (req, res) => { res.end('get response') })
router.post("/", (req, res) => { res.end('post response') })
router.delete("/", (req, res) => { res.end('delete response') })
router.put("/", (req, res) => { res.end('put response') })


module.exports = router