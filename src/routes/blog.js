const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here
router.get('/blog', async (req, res) => {
    let topic = req.query.search;
    let page = req.query.page;
    const limit = 5;
    // console.log(topic)
    if (!topic) {
        return res.status(400).send({message: 'Please provide topic and page'})
    }
    const data = await Blog.find({topic: topic }, {useFindAndModify: false})
    // console.log(data)
    if (!data) {
        return res.status(500).send({message: err.message})
    }
    const startIndex = (page-1) * limit;
    const endIndex = page * limit;
    const result = data.slice(startIndex, endIndex)
    res.status(200).send({response: {status: 'success', result: result}})

})

router.post('/blog', async (req, res) => {
    if (!req.body.topic) {
        res.status(400).send({message: 'provide topic'});
    }
    try { 
        const blog = new Blog({
            topic: req.body.topic,
            description: req.body.description,
            posted_by: req.body.posted_by
        })
        const newBlog = await blog.save();
        res.status(200).send({response: {status: 'success', result: newBlog}})
    }
    catch (err) {
        res.status(400).send({message: err.message});
    }

})
router.put('/blog/:id', async (req,res)=>{
    const id = req.params.id;
    if (!id) {
        res.send({message: 'Please provide ID'})
    }
    try {
        await Blog.findByIdAndUpdate(id, req.body, {useFindAndModify : false});
        res.status(200).send({response: {status: 'success', result: req.body}})
    }
    catch (err) {
        res.status(400).send({message: err.message})
    }
})

router.delete('/blog/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.send({message: 'please provide id'});
    }
    try {
        const data = await Blog.findByIdAndDelete(id, {useFindAndModify: false});
        res.status(200).send({response: {status: 'success', result: data}})
    }
    catch(err) {
        res.status(400).send({message: err.message})
    }
    })



module.exports = router;