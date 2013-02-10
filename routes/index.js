
/*
 * GET home page.
 */

//var db = require("mongos").connect("localhost/workshop", ["employees"]);

exports.index = function(req, res){
	db.connect(mongourl, function(err, conn){
		//console.log(mongourl);
	    conn.collection('employees', function(err, coll){
	        coll.find(
	        	{}
	        	, {_id:0}
	        	, function(err, cursor){
	        		cursor.toArray(function(err, emps){
	            		res.render('index', {employees: emps });
	            	});
	        	}
	        );
	    });
	});
};

exports.addCol = function(data) {
		db.connect(mongourl, function(err, conn){
			conn.collection('employees', function(err, coll){
				coll.save(
					{ nama : data.nama, tgl : data.tgl, bln : data.bln, thn : data.thn, almt : data.almt, jur : data.jur }
					, {safe:true}
					, function(err){
						if(err){ return "failed"; }else{ return "success"; }
					}
				);
			});
		});
};

exports.updateCol = function(data) {
		db.connect(mongourl, function(err, conn){
			conn.collection('employees', function(err, coll){
				coll.update(
					{ nama : data.oldnama }
					, { $set : { nama : data.nama, tgl : data.tgl, bln : data.bln, thn : data.thn, almt : data.almt, jur : data.jur } }
					, function(err){
						if(err){ return "failed"; }else{ return "success"; }
					}
				);
			});
		});
};

exports.removeCol = function(data) {
	db.connect(mongourl, function(err, conn){
	    conn.collection('employees', function(err, coll){
		    coll.remove(
		    	{ nama : data.nama }
		    	, function(err){
		        	if(err){ return "failed"; }else{ return "success"; }
	    		}
	    	);
	    });
  	});
};

//mongoCorner

if(process.env.VCAP_SERVICES){
  var env = JSON.parse(process.env.VCAP_SERVICES);
  var mongo = env['mongodb-2.0'][0]['credentials'];
}
else{
  var mongo = {
      "hostname":"localhost",
      "port":27017,
      "username":"",
      "password":"",
      "name":"",
      "db":"workshop"
  }
}

var generate_mongo_url = function(obj){
  obj.hostname = (obj.hostname || 'localhost');
  obj.port = (obj.port || 27017);
  obj.db = (obj.db || 'workshop');

  if(obj.username && obj.password){
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
  else{
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
}

var mongourl = generate_mongo_url(mongo);

var db = require('mongodb');

//mongoCornerEnd
