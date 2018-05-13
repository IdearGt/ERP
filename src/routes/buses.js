const router = require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('transportes-db',['buses']);
router.get('/buses',(req, res, next)=>{
    db.buses.find((err, buses)=>{
        if(err) return next(err);
        res.json(buses);
    })
});
router.get('/buses/:id',(req, res, next)=>{
    db.buses.findOne({_id: mongojs.ObjectId(req.params._id)},(err, buses)=>{
        if(err) return next(err);
        res.json(buses);
    })
});

router.post('/buses',(req, res, next)=>{
    const bus = req.body;
    if(!bus.placa){
        res.status(400).json({
            error: "Data erronea"
        })
    }else{
        db.buses.save(bus,(err, bus)=>{
            if(err) return next(err);
            res.json(bus);
        });
    }
    
});

router.delete('/buses/:id',(req, res, next)=>{
    db.buses.remove({_id: mongojs.ObjectId(req.params._id)},(err, resultado) => {
        if(err) return next(err);
            res.json(resultado);      
    })
    const bus = req.body;
});

router.put('/buses/:id',(req, res, next)=>{
    const bus = req.body;
    db.buses.update({_id: mongojs.ObjectId(req.params._id)},(err, bus) => {
        if(err) return next(err);
        res.json(bus);      
    })
});

module.exports = router;
