$(document).ready(function(){
		var socket = io.connect('http://localhost');
			  $(".bLogin").click(function(){
			  $("#login").hide("slow");
			  $("#table_container").show("slow");
			 });
			 $(".bAdd").click(function(){
			  $("#save").val("Simpan");
			  $("#element_2").val("");//Nama
			  $("#element_5_1").val("");//Tgl
			  $("#element_5_2").val("");//Bulan Lahir
			  $("#element_5_3").val("");//Tahun Lahir
			  $("#element_3").val("");//Alamat
			  $("#element_6").val("");//Jurusan
			  $("#table_container").hide("slow");
			  $("#form_container").show("slow");
			 });
			 
			 
			 $("#save").click(function(){//addData
			  if($(this).val()=="Simpan"){
				  socket.emit('add', { nama : $('#element_2').val(), tgl : $('#element_5_1').val(), bln : $('#element_5_2').val(), thn : $('#element_5_3').val(), almt : $('#element_3').val(), jur : $('#element_6').val()});
				  socket.on('addData', function (data) {
					  var j = parseInt($('#customers').attr('jumbar'))+1; 
					  $('#customers').attr('jumbar',j);
					  $('#customers').append('<tr id="'+j+'"><td id="nama'+j+'">'+$("#element_2").val()+'</td><td><table class="inside"><tr><td id="tgl'+j+'">'+$("#element_5_1").val()+'</td><td id="bln'+j+'">'+$("#element_5_2").val()+'</td><td id="thn'+j+'">'+$("#element_5_3").val()+'</td></tr></table></td><td id="almt'+j+'">'+$("#element_3").val()+'</td><td id="jur'+j+'">'+$("#element_6").val()+'</td><td> <input id="'+j+'" type="button" value="Ubah" class="bEdit button " onclick="editItem(this.getAttribute(\'id\'))"/><input id="'+j+'" type="button" value="Hapus" onclick="removeItem(this.getAttribute(\'id\'))"/></td></tr>');
				  });
			  }
				$("#table_container").show("slow");
				$("#form_container").hide("slow");
			 });
			 $("#save").click(function(){
			  if($(this).val()=="Perbarui"){//updateData
				  socket.emit('update', { oldnama : $('#nama'+ $(this).attr("x")).text(), nama : $('#element_2').val(), tgl : $('#element_5_1').val(), bln : $('#element_5_2').val(), thn : $('#element_5_3').val(), almt : $('#element_3').val(), jur : $('#element_6').val()});
				  socket.on('updateData', function (data) {
					  $("#nama"+$('#selectorCol').val()).text($("#element_2").val());//Nama
					  $("#tgl"+$('#selectorCol').val()).text($("#element_5_1").val());//Tgl
					  $("#bln"+$('#selectorCol').val()).text($("#element_5_2").val());//Bulan Lahir
					  $("#thn"+$('#selectorCol').val()).text($("#element_5_3").val());//Tahun Lahir
					  $("#almt"+$('#selectorCol').val()).text($("#element_3").val());//Alamat
					  $("#jur"+$('#selectorCol').val()).text($("#element_6").val());//Jurusan
					});
				}
				$("#table_container").show("slow");
				$("#form_container").hide("slow");
			 });

			 $(".bDel").click(function(){
			  removeItem($(this).attr("id"));
			  });
			 
			 $(".bEdit").click(function(){
			  editItem($(this).attr("id"));
			  $("#save").val("Perbarui");
			  $('#selectorCol').val($(this).attr("id"));
			  $("#element_2").val($("#nama"+$(this).attr("id")).text());//Nama
			  $("#element_5_1").val($("#tgl"+$(this).attr("id")).text());//Tgl
			  $("#element_5_2").val($("#bln"+$(this).attr("id")).text());//Bulan Lahir
			  $("#element_5_3").val($("#thn"+$(this).attr("id")).text());//Tahun Lahir
			  $("#element_3").val($("#almt"+$(this).attr("id")).text());//Alamat
			  $("#element_6").val($("#jur"+$(this).attr("id")).text());//Jurusan
			 });
			 $("#cancel").click(function(){
			  $("#table_container").show("slow");
			  $("#form_container").hide("slow");
			 });
			 
			 
});

function editItem(own) {
	  alert(own);
	  $("#element_2").val($("#nama"+own).text());//Nama
	  $("#element_5_1").val($("#tgl"+own).text());//Tgl
	  $("#element_5_2").val($("#bln"+own).text());//Bulan Lahir
	  $("#element_5_3").val($("#thn"+own).text());//Tahun Lahir
	  $("#element_3").val($("#almt"+own).text());//Alamat
	  $("#element_6").val($("#jur"+own).text());//Jurusan
	  $("#table_container").hide("slow");
	  $("#form_container").show("slow");
}

function removeItem(own) {
	var dlt=confirm("Hapus Data : "+$('#nama'+ own).text());
	if (dlt==true){
		var socket = io.connect('http://localhost'); //alert( $('#id'+own).text());
		socket.emit('remove', { nama : $('#nama'+own).text() });
	    socket.on('removeData', function (data) {
	    	//if (data == "success"){
	    		$('#row'+own).remove();
	    	//} else {
	    	//	alert("Failed");
	    	//}
	   	});
	}
}
