
/*
 * GET home page.
 */

var db = require("mongojs").connect("localhost/workshop", ["employees"]);

exports.index = function(req, res){
		db.employees.find(
			{ }
			, { _id: 0 }
			, function(err, emps) {
			res.render('index', {employees: emps});
		});
};

exports.addCol = function(data) {
		db.employees.save( 
			{ nama : data.nama, tgl : data.tgl, bln : data.bln, thn : data.thn, almt : data.almt, jur : data.jur }
			, function (err, saved) {
				if( err || !saved ) socket.emit('addData','Tersimpan');
				else socket.emit('addData', 'Gagal');
			}
		);
};

exports.updateCol = function(data) {
		db.employees.update(
			{ nama : data.oldnama }
			, { $set : { nama : data.nama, tgl : data.tgl, bln : data.bln, thn : data.thn, almt : data.almt, jur : data.jur} }
			, function (err , saved) {
				if( err || !saved ) socket.emit('updateData','Tersimpan');
				else socket.emit('updateData', 'Gagal');
				alert("salah");
			}
		);
};

exports.removeCol = function(data) {
		db.employees.remove({ nama : data.nama }
		);
};
