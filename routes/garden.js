//TODO rimuovere e usa ttn
var  express=require('express'),
  bodyParser=require('body-parser');
  db=require('../mysql');

var router= express.Router();
router.use(bodyParser.json());

var resNeg ={ // state true -> ok state false -> ko
  state:false,
  mes:'errore'
};

var resPos ={ // state true -> ok state false -> ko
  state:true,
  mes:'tutto ok'
};

var resAbu ={ // state true -> ok state false -> ko
  state:false,
  mes:'no permesso'
};

router.route('/')
.get(function (req, res) {
  db.getValue(function(err, data){
    if(err)console.log(err);
    else console.log(data);; //json dati
    //TODO LOG PER vedere cosa scrive
  });

})
.put(function (req, res) {})
.post(function(req, res){});

module.exports = router;
