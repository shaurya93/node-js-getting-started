var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index1');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/login', function(req,res,next){
	console.log('in login get ejs');
	
	res.render('pages/login',{});
});

app.post('/login', function(req,res,next){
	
	
	module.exports.rec_type = 'ProfileView';	
	
	console.log('in login post ejs');
	
	var email_val=req.body.your_email;
	var password_val=req.body.your_password;
	
	console.log('email_val:'+email_val);
	console.log('password_val:'+password_val);
	
	
	
	function onFailure(err) {
  process.stderr.write("Refresh Failed: " + err.message + "\n");
  process.exit(1);
	}

//var rest_params = {event:"edit",rec_id:req.body.ns_id,address:req.body.address,fax:req.body.fax,phone:req.body.phone,alt_phone:req.body.altphone,email:req.body.email};

var rest_params = {event:"login",email:req.body.your_email,password:req.body.your_password};


// This will try the cached version first, if not there will run and then cache 

var vendorid=null;
search.run(rest_params, function (err, results) {
  if (err) onFailure(err);
  console.log(JSON.stringify(results));
  
    console.log('Results login::'+results);
	console.log('Results login msg::'+results.message);
	console.log('Results login st::'+results.status);
 	
  
 var contents='';		
 
			if(results.status=='Successful')
			{
				console.log("response vendor id::"+results.vendor_id);
				vendorid=results.vendor_id;
				var contents = db.exec("select * from vendor_master where vendor_ns_id="+vendorid);
			}
		  
		
		if(contents!='')
		{
			
			  if(vendorid)
			  {
				  res.redirect(303,'dashboard?vendorid='+vendorid);
			  }
			  else
			  {
				  res.redirect(303,'pages/login');
			  }
		}
		else
		{
			res.redirect(303,'pages/login');
		}
	
  
});

  //console.log("vendor id::"+vendorid);



	
});
