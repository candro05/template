var idTrans,mrn,idPasien="",idTransCo,idEpisode,idPoli,no_urut,nama_pasien,kunjungan,poliklinik,idRekanan,obat,lengthResep,bodyHeight,bodyWidth,oUrut=0,sOUrut,sisaRow,pasienInfo=[],noTindak,cWidth,cHeight,sudahDisimpan=true,resepResult,labResult,radResult,alkesResult,eByr;
var resepKe,rke,labKe,lKe,radKe,raKe,alkesKe,aKe,rekanan,doneP,noRacik,umur,idTemp,soap=[],soapKe=0,analisaBhn=[],bhn24=[],hisResep1=[],anam=[],periksaImg=[],konsul,sumPage,icd=[];
var catMS=['Sebelum Makan','Sesudah Makan'];
	function e(id) 
	{
		return document.getElementById(id);
	}
	function c(type, parent,className,id) 
	{
		var x = document.createElement(type);
		if (parent)
			parent.appendChild(x);
		if (id)
			x.setAttribute("id",id);
		if(className)
			x.setAttribute("class",className);
		return x;
	}
	function cin(type, parent, className, id, value) {
		var x = document.createElement("input");
		x.setAttribute("type",type);
		if (className)
			x.className=className;
		if (parent)
			parent.appendChild(x);
		if (id)
			x.setAttribute("id",id);
		if (value)
			x.setAttribute("value",value);
		return x;
	}
	function addZero(num){
		if(num<10){
			num="0"+num;
		}
		return num;
	}
	function isNumber (o) {
		var num=o.substring(0,2);
		if(num=='0.')
			return !isNaN(o-0)&&o!==null&&o!==""&&o!==false;
		else if(o.substring(0,1)=='0')
			return false;
		else
			return !isNaN(o-0)&&o!==null&&o!==""&&o!==false;
	}
	function isNumber1 (o) {
		var num=o.substring(0,1);
		if(num=='0')
			return false;
		else
			return !isNaN(parseInt(o))&&o.match(/^[0-9]+$/)!=null;
		//return &&isFinite(o)&&o!==null&&o!==""&&o!==false;
	}
	function waktu() 
	{    
        var tanggal = new Date();   
        setTimeout("waktu()",1000);
        e("time").innerHTML =addZero(tanggal.getDate())+"-"+addZero((tanggal.getMonth()+1))+"-"+addZero(tanggal.getFullYear())+" "+ addZero(tanggal.getHours())+":"+addZero(tanggal.getMinutes())+":"+addZero(tanggal.getSeconds()); 
    } 
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
		  vars[key] = value;
		});
		return vars;
	}
	var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	
	function changeDate(vari){
		var mo=eval(vari.substring(3,5))-1;
		var varia=vari.substring(0,2)+'.'+month[mo]+'.'+vari.substring(6,10);
		return varia;
	}  	
	function validDate(startDate){
		if(startDate.length==0){
			bootbox.alert('Pilih Tanggal!');
			return false;
		}
		var re_date = /^\s*(\d{1,2})-(\d{1,2})-(\d{2,4})\s*$/;
		if ((!startDate)||(startDate.length!=10)||(!re_date.exec(startDate))) {
			bootbox.alert("Salah Format Tanggal!");
			return false;
		}
		return true;
	}
	function validDate2(startDate,endDate){
		var re_date = /^\s*(\d{1,2})-(\d{1,2})-(\d{2,4})\s*$/;
		if(startDate.length==0){
			bootbox.alert('Pilih Tanggal!');
			return false;
		}
		if ((!startDate)||(startDate.length!=10)||(!re_date.exec(startDate))) {
			bootbox.alert("Salah Format Tanggal!");
			return false;
		}
		if ((!endDate)||(endDate.length!=10)||(!re_date.exec(endDate))) {
			bootbox.alert("Salah Format Tanggal!");
			return false;
		}
		var sdate=new Date(startDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime();
		var edate=new Date(endDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime();

		if(edate<sdate){
			bootbox.alert("Tanggal awal lebih besar dari Tanggal akhir!");
			return false;
		}
		return true;
	}
	function formatNumber (num) {
		//num=num.replace('.',',');
    		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
	}
	function toRupiah(angka){
		var rupiah = '';
		var angkarev = angka.toString().split('').reverse().join('');
		for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
		return rupiah.split('',rupiah.length-1).reverse().join('');
	}
	function toAngka(rp){return rp.replace(/,.*|\D/g,'')}
	
	function idle(){
		setTimeout("idle()",60000);
		if(idPasien.length==0 || idPasien=="")
			pasienDokter1();
	}
	function showLoader(){
		$('#loader').removeAttr('style');
		$('#loader').attr('style','position:absolute;top:'+(bodyHeight/3)+'px;left:'+(bodyWidth/2)+'px;');
	}
	function hideLoader(){
		$('#loader').removeAttr('style');
		$('#loader').attr('style','display:none;top:'+(bodyHeight/2)+'px;left:'+(bodyWidth/2)+'px;');
	}
	function showLoader1(){
		$('#loader').removeAttr('style');
		$('#loader').attr('style','position:absolute;top:'+(bodyHeight)+'px;left:'+(bodyWidth/2)+'px;');
	}
	function resize(){
		var body = document.body,html = document.documentElement;
		bodyHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

		bodyWidth = document.body.offsetWidth;
		
		var status=e("status");	
		status.style.height=(bodyHeight-151)+"px";
		var visit=e("visit");	
		visit.style.height=(bodyHeight-97)+"px";
		var tab=e("tab2");
		tab.style.height=(bodyHeight-48)+"px";
		//e("tab3").style.height=(bodyHeight-48)+"px";
		
	}
	function confirmExit() {
		return "Apakah data sudah disimpan? Yakin akan menutup menu ini?";
    }
	function nama()	{
		e("user").innerHTML="Nama User:"+user;
		e('tglBack').value=moment().format("DD-MM-YYYY");
		pasienDokter();
		konlength=0;
		statusPasien();		
		selectSigna();
		selectRoute();
		selectBungkus();
		waktu();
		btnSimpan();
		visitKonsul();
		//idle();
		//labDT();
	}
	function visitKonsul(){
		selectAllKonsul();
		selectAllVisit();
	}
	function selesai(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selesai',
			type : "post",	
			success : function(o)
			{	
				var win = window.open("login","_self").close();
				history.replaceState({}, '', 'login' );//win.close();
				//window.top.close();
			}
		});
	}
	function disabledForm(){
		$('#form1 input').attr('disabled',true);
		$('#form1 button').attr('disabled',true);
		$('#form1 textarea').attr('disabled',true);
		$('#form2 select').attr('disabled',true);
		$('#form2 textarea').attr('disabled',true);
		$('#imgButton').attr('disabled',true);
		$('#alergiTam').attr('disabled',true);
		$('#cattTam').attr('disabled',true);
		$('#rencTam').attr('disabled',true);
		$('#btnLab').attr('disabled',true);
		$('#btnRad').attr('disabled',true);
		$('#btnResep').attr('disabled',true);
		$('#btnLayan').attr('disabled',true);
		$('#btnPPK').attr('disabled',true);
		$('#btn_save').attr('disabled',true);
		$('#btn_selesai').attr('disabled',true);
		$('#btnBatal').attr('disabled',true);
		$('#btnSejarah').attr('disabled',true);
		$('#rujukSave').attr('disabled',true);
		$('#konsulButton').attr('disabled',true);
		$('#dropdownMenu3').attr('disabled',true);
		$('#btnPPK').attr('disabled',true);
		$('#labelS').attr('class','col-sm-1 bigFont');
		$('#labelS1,#divS2,#divS3').removeAttr('style');
		$('#pgl').removeAttr('disabled');
	}
	function readForm(){
		$('#form1 input').removeAttr('disabled');
		$('#form1 textarea').removeAttr('disabled');
		$('#form2 select').removeAttr('disabled');
		$('#anamDokter').removeAttr('disabled');
		$('#imgButton').removeAttr('disabled');
		$('#tempButton').removeAttr('disabled');
		$('#cSoap').removeAttr('disabled');
		$('#addBS').removeAttr('disabled');
		$('#gizi1').removeAttr('disabled');
		$('#form2 textarea').removeAttr('disabled');
		$('#obatSave').attr('disabled',true);
		$('#labSave').attr('disabled',true);
		$('#radSave').attr('disabled',true);
		$('#alkesSave').attr('disabled',true);
		$('#btn_save').attr('disabled',true);
		$('#btn_selesai').removeAttr('disabled');
		$('#btnLab').removeAttr('disabled');
		$('#btnRad').removeAttr('disabled');
		$('#btnResep').removeAttr('disabled');
		$('#btnLayan').removeAttr('disabled');
		$('#btnPPK').attr('disabled',true);
		$('#btnBatal').attr('disabled',true);
		$('#btnSejarah').removeAttr('disabled');
		$('#alergiTam').removeAttr('disabled');
		$('#cattTam').removeAttr('disabled');
		$('#rencTam').removeAttr('disabled');
		$('#formGizi textarea').removeAttr('disabled');
		$('#formBhn').removeAttr('style');
		$('#formGizi1').removeAttr('style');
		$('#rujukSave').removeAttr('disabled');
		$('#konsulButton').removeAttr('disabled');
		$('#dropdownMenu3').removeAttr('disabled');
		$('#btnf1').removeAttr('disabled');
		$('#btnf2').removeAttr('disabled');
		$('#btnf3').removeAttr('disabled');
		$('#btnf4').removeAttr('disabled');
		if(kunjungan>1){
			$('#labelS').attr('class','col-sm-3 bigFont');
			$('#labelS1,#divS2,#divS3').attr('style','display:none');
		}else{
			$('#labelS').attr('class','col-sm-1 bigFont');
			$('#labelS1,#divS2,#divS3').removeAttr('style');
		}
		$('#pgl').removeAttr('disabled');
	}
	function enabledForm(){
		$('#form1 input').removeAttr('disabled');
		$('#form2 select').removeAttr('disabled');
		$('#cSoap').removeAttr('disabled');
		$('#anamDokter').removeAttr('disabled');
		//$('#form1 button').removeAttr('disabled');
		$('#tempButton').removeAttr('style');
		$('#addBS').removeAttr('style');
		$('#tempButton').removeAttr('disabled');
		$('#imgButton').removeAttr('disabled');
		$('#imgButton').removeAttr('style');
		$('#addBS').removeAttr('disabled');
		$('#gizi1').removeAttr('disabled');
		$('#form1 textarea').removeAttr('disabled');
		$('#form2 textarea').removeAttr('disabled');
		$('#alergiTam').removeAttr('disabled');
		$('#cattTam').removeAttr('disabled');
		$('#rencTam').removeAttr('disabled');
		$('#obatSave').removeAttr('disabled');
		$('#labSave').removeAttr('disabled');
		$('#radSave').removeAttr('disabled');
		$('#alkesSave').removeAttr('disabled');
		$('#btn_save').removeAttr('disabled');
		$('#btn_selesai').removeAttr('disabled');
		$('#btnLab').removeAttr('disabled');
		$('#btnRad').removeAttr('disabled');
		$('#btnResep').removeAttr('disabled');
		$('#btnLayan').removeAttr('disabled');
		$('#btnBatal').removeAttr('disabled');
		$('#btnSejarah').removeAttr('disabled');
		$('#formGizi textarea').removeAttr('disabled');
		$('#formBhn').removeAttr('style');
		//$('#btnTotal1').removeAttr('style');
		$('#rujukSave').removeAttr('disabled');
		$('#konsulButton').removeAttr('disabled');
		$('#dropdownMenu3').removeAttr('disabled');
		$('#btnf1').removeAttr('disabled');
		$('#btnf2').removeAttr('disabled');
		$('#btnf3').removeAttr('disabled');
		$('#btnf4').removeAttr('disabled');
		$('#btnPPK').removeAttr('disabled');
		if(kunjungan>1){
			$('#labelS').attr('class','col-sm-3 bigFont');
			$('#labelS1,#divS2,#divS3').attr('style','display:none');
		}else{
			$('#labelS').attr('class','col-sm-1 bigFont');
			$('#labelS1,#divS2,#divS3').removeAttr('style');
		}
		$('#pgl').removeAttr('disabled');
	}
	function enabledForm1(){
		$('#form1 input').removeAttr('disabled');
		$('#cSoap').removeAttr('disabled');
		$('#anamDokter').removeAttr('disabled');
		$('#form2 select').removeAttr('disabled');
		$('#tempButton').removeAttr('style');
		$('#gizi1').removeAttr('disabled');
		$('#addBS').removeAttr('style');
		$('#tempButton').removeAttr('disabled');
		$('#imgButton').removeAttr('disabled');
		$('#imgButton').removeAttr('style');
		$('#addBS').removeAttr('disabled');
		$('#form1 textarea').removeAttr('disabled');
		$('#form2 textarea').removeAttr('disabled');
		$('#alergiTam').removeAttr('disabled');
		$('#cattTam').removeAttr('disabled');
		$('#rencTam').removeAttr('disabled');
		$('#btnLab').attr('disabled',true);
		$('#btnRad').attr('disabled',true);
		$('#btnResep').attr('disabled',true);
		$('#btnLayan').attr('disabled',true);
		$('#btnPPK').attr('disabled',true);
		$('#btn_save').removeAttr('disabled');
		$('#btn_selesai').attr('disabled',true);
		$('#btnBatal').removeAttr('disabled');
		$('#btnSejarah').removeAttr('disabled');
		$('#formGizi textarea').removeAttr('disabled');
		$('#formBhn').removeAttr('style');
		$('#rujukSave').removeAttr('disabled');
		$('#konsulButton').removeAttr('disabled');
		$('#dropdownMenu3').attr('disabled',true);
		$('#btnf1').removeAttr('disabled');
		$('#btnf2').removeAttr('disabled');
		$('#btnf3').removeAttr('disabled');
		$('#btnf4').removeAttr('disabled');
		if(kunjungan>1){
			$('#labelS').attr('class','col-sm-3 bigFont');
			$('#labelS1,#divS2,#divS3').attr('style','display:none');
		}else{
			$('#labelS').attr('class','col-sm-1 bigFont');
			$('#labelS1,#divS2,#divS3').removeAttr('style');
		}
		$('#pgl').removeAttr('disabled');
	}
	function sejarahPasien(){
		if(idPasien){
			var win = window.open(base_url+'index.php/sejarah?id='+idPasien,"_blank");	
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function selesaiPeriksa(){
		if(idPasien){
		  if(idTransCo){
			$.ajax({
				url :base_url+'index.php/clinic_controller/selesaiP/'+idUser,
				type : "post",	
				data : {idTrans:idTrans,idTransCo:idTransCo,idEpisode:idEpisode,idPoli:idPoli,idPasien:idPasien},
				success : function(o)
				{
					var prod = o;
					bootbox.alert('Pasien Sudah Selesai Pemeriksaan!');
					//pasienDokter();
					statusPasien();
					donePeriksa();
				},error:function(o)
				{
					bootbox.alert('Pasien Belum Selesai Pemeriksaan!');
				}
			});
		  }else
			bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function donePeriksa(){
		sudahDisimpan=true;
		diag=[];	
		tindak=[];
		soap=[];
		periksaImg=[];
		idTrans="";
		idPasien="";
		idEpisode="";
		idPoli="";
		idRekanan="";
		doneP="";
		mrn="";
		openTab();
		e('form1').reset();
		e('form2').reset();
		disabledForm();		
		hideLoader();		
	}
	function pasienDokter(){
		var tglBack=e('tglBack').value;
		var valid=validDate(tglBack);
		if(!valid)
			return;
		showLoader();
		$.ajax({
			url :base_url+'index.php/clinic_controller/status/'+idUser,
			type : "post",	
			data : {tanggal:tglBack},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sudahDisimpan=true;
				idTrans="";
				idPasien="";
				idEpisode="";
				idPoli="";
				idRekanan="";
				doneP="";
				mrn="";
				$('#kodeAwal').val('');
				openTab();
				alergi();
				catatan();
				Rencana();
				awal(prod);	
				hideLoader();				
			},error:function(o)
			{
				e('status').innerHTML="";
				e('status').innerHTML="Tidak Ada Pasien";
			}
		});
	}
	function pasienDokter1(){
		var tglBack=e('tglBack').value;
		var valid=validDate(tglBack);
		if(!valid)
			return;
		showLoader();
		$.ajax({
			url :base_url+'index.php/clinic_controller/status/'+idUser,
			type : "post",	
			data : {tanggal:tglBack},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				$('#kodeAwal').val('');
				awal1(prod);	
				hideLoader();		
			},error:function(o)
			{

			}
		});
	}
	
	function labDT() 
	{    
        setTimeout("labDT()",60000);
		$.ajax({
			url :base_url+'index.php/clinic_controller/viewLab',
			type : "post",	
			data : {tanggal:now},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var h=prod[i];
						if(h.POLI==idPoli){
							var a=e(h.TRANS_ID);
						  if(h.JML==1){
							if(h.SAMPEL!=null){
								if(h.DONE!=0 && h.BELUM==0)
									a.cells[0].innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+h.NAMA+"</a>";
								else 
									a.cells[0].innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+h.NAMA+"</a>";
							}else
								a.cells[0].innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+h.NAMA+"</a>";
						  }else{
							if(h.SAMPEL!=null){
								if(h.DONE!=0 && h.BELUM==0)
									a.cells[0].innerHTML="<a class='activation' href=javascript:myClick() ><label style='color:blue;float:left;width:30px;'>L  </label>"+h.NAMA+"</a>";
								else
									a.cells[0].innerHTML="<a class='activation' href=javascript:myClick() ><label style='color:green;float:left; width:30px;'>L  </label>"+h.NAMA+"</a>";
							}else
								a.cells[0].innerHTML="<a class='activation' href=javascript:myClick() ><label style='color:black;float:left; width:30px;'>L  </label>"+h.NAMA+"</a>";
							}
						  }
					}
				}
					
			},error:function(o)
			{
				
			}
		});
        
    } 
	function pasienKet(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/pasien',
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0)
					pasienInformasi(prod);
				else{
					e("ketPasien").innerHTML="";
					e("ketPasien").innerHTML="Tidak ada Keterangan Pasien";
				}
			},error:function(o)
			{
				e("ketPasien").innerHTML="";
				e("ketPasien").innerHTML="Tidak ada Keterangan Pasien";					
			}
		});
	}
	function pasienNosa(idPasien,idTrans,idEpisode){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectNosa',
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tindak=[];
				soap=[];
				analisaBhn=[];
				bhn24=[];
				hisResep1=[];
				periksaImg=[];
				e('form1').reset();
				e('form2').reset();
				$('#mlp').attr('style','display:none;');
				if(prod.length!=0){
					pasienDiagnosa(prod);
					selectSOAP();
					selectTindakan(idTrans);
					selectDiag(idTrans);
					//$('#btnTotal1').removeAttr('style');
					
					selectTotalis();
					if(doneP=='1_done'){
						readForm();
					}else{
						enabledForm();
						$('#d1').focus();
					}
				}else{
					pasienKosong();
					//$('#btnTotal1').attr('style','display:none');
					selectMulaiPeriksa();
					if(doneP=='1_done'){
						readForm();
					}else
						$('#S').focus();
				}
				getTransR();
			},error:function(o)
			{
				pasienKosong();	
				$('#S').focus();				
			}
		});
	}
	function selectSOAP(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP',
			type : "post",	
			data : {idTrans:idTrans,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				hideLoader();
				var prod = o;
				soap=[];
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var nosa=[];
						nosa[0]=prod[i].S;
						nosa[1]=prod[i].S2;
						nosa[2]=prod[i].S3;
						nosa[3]=prod[i].O;
						nosa[4]=prod[i].A;
						nosa[5]=prod[i].P;
						nosa[6]='old';
						nosa[7]=prod[i].DOKTER;
						nosa[8]=prod[i].CREATED_DATE;
						soap.push(nosa);
					}
					soapKe=soap.length-1;
					SOAP1();
				}
			},error:function(o)
			{
				
			}
		});
	}
	function getAnamnesa(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/anamnesa',
			type : "post",	
			data : {idTrans:idTrans},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					$('#anamnesaModal').modal('show');
					anamnesa(prod);
				}else{
					bootbox.alert('Belum dilakukan Anamnesa oleh Perawat!');
				}
			},error:function(o)
			{
				bootbox.alert('Belum dilakukan Anamnesa oleh Perawat!');				
			}
		});
	}
	function insertNosa(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertNosa/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idPoli:idPoli,idRekanan:idRekanan,idPasien:idPasien,tanggal:tanggal,idTrans:idTrans},
			success : function(o)
			{
				var prod = o;
				idTransCo=prod;
				for(var i=0;i<soap.length;i++){
					var h=soap[i];
					if(h[6]=='new')
						insertSOAP(h[0],h[1],h[2],h[3],h[4],h[5],i,h[8]);
				}
				if(anam.length==1){
					var h=anam[0];
					updateAnam(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
				}else{
					var h=anam[1];
					updateAnam(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
				}
				for(var i=0;i<periksaImg.length;i++){
					var h=periksaImg[i];
					if(h[3]=='new')
						saveImage(h[0],h[1],h[2],idTrans+i);
				}
				bootbox.alert('Data Pemeriksaan Sudah Tersimpan!');
				selectSOAP();
				enabledForm();
				//pasienNosa(idPasien,idTrans,idEpisode);
				sudahDisimpan=true;
			},error:function(o)
			{
				bootbox.alert('Data Pemeriksaan Gagal Tersimpan!');					
			}
		});  
	}
	function saveSoap(){
		if(idPasien!=null){
		  bootbox.confirm('Apakah data akan di simpan? <br/> '+user,function(result){
		   if (result == true){
			var df1,df9,ic1,ic9,k1,k9,komplikasi,edukasi,gizi,diagnosa,alkel,sakel;
			
			if(soap.length==0){
				bootbox.alert('Silakan Isi SOAP!',function(){
					setTimeout(function(){$("#S").focus();},10);
				});
				return ;
			}
			
			komplikasi=e("komplikasi").value;
			edukasi=e("edukasi").value;
			gizi=e("gizi").value;
			alkel=e("alkel").value;
			sakel=e("sakel").value;
			var tanggal=moment().format("DD.MM.YYYY");
			k1=e("k1").value;
			diagnosa=e('d1').value;
			if(k1==""||k1==null){
				/*bootbox.alert('Silakan Pilih Diagnosa Utama!',function(){
					setTimeout(function(){$("#d1").focus();},10);
				});*/
				diagnosa=e('d1').value;
				if(diagnosa==""||diagnosa==null){
					bootbox.alert('Silakan Masukkan Diagnosa Utama!',function(){
						setTimeout(function(){$("#d1").focus();},10);
					});
					return ;
				}
			}else{
				df1=e("d1").value;
				if(df1==""||df1==null){
					bootbox.alert('Silakan Pilih Diagnosa Utama!',function(){
						setTimeout(function(){$("#d1").focus();},10);
					});
					
					return ;
				}
				ic1=e("i1").value;
				if(ic1==""||ic1==null){
					bootbox.alert('Silakan Pilih Kode ICD!',function(){
						setTimeout(function(){$("#i1").focus();},10);
					});
					return ;
				}
			}
			
			k9=e("k9").value;
			df9=e("d9").value;
			ic9=e("i9").value;
			/*if(k9==""||k9==null){
				bootbox.alert('Silakan Pilih Tindakan Utama!',function(){
					setTimeout(function(){$("#d9").focus();},10);
				});
				return ;
			}
			if(df9==""||df9==null){
				bootbox.alert('Silakan Pilih Tindakan Utama!',function(){
					setTimeout(function(){$("#d9").focus();},10);
				});
				
				return ;
			}	
			if(ic9==""||ic9==null){
				bootbox.alert('Silakan Pilih Kode ICD!',function(){
					setTimeout(function(){$("#i9").focus();},10);
				});
				return ;
			}*/
			if(diag.length!=0){
				var cekTindak=[];
				if(k1!=""){
					if(k1!=null)
						cekTindak.push(k1);
				}
				for(var i=0;i<diag.length;i++){
					if(diag[i][0]!=""){
						if(diag[i][0]!=null)
							cekTindak.push(diag[i][0]);
					}
				}
				
				var tin=hasDuplicates(cekTindak);
				if(tin){
					bootbox.alert('Diagnosa ganda!');
					return ;
				}
			}
			
			if(tindak.length!=0){
				var cekTindak=[];
				if(k9!=""){
					if(k9!=null)
						cekTindak.push(k9);
				}
				for(var i=0;i<tindak.length;i++){
					if(tindak[i][0]!=""){
						if(tindak[i][0]!=null)
							cekTindak.push(tindak[i][0]);
					}
				}
				var tin=hasDuplicates(cekTindak);
				if(tin){
					bootbox.alert('Tindakan ganda!');
					return ;
				}
			}
			
			$.ajax({
				url :base_url+'index.php/clinic_controller/insertNosa1/'+idUser,
				type : "post",	
				data : {idEpisode:idEpisode,idPoli:idPoli,idRekanan:idRekanan,idPasien:idPasien,tanggal:tanggal,idTrans:idTrans,ICD10:k1,ICD9:k9,komplikasi:komplikasi,edukasi:edukasi,gizi:gizi,diagnosa:diagnosa,tindak:df9,alkel:alkel,sakel:sakel},
				success : function(o)
				{
					var prod = o;
					idTransCo=prod;
					if(tindak.length!=0){
						for(var i=0;i<tindak.length;i++){
							var h=tindak[i];
							if(h[3]=='new')
								insertTindakan(h[4],h[0],h[1],h[2]);
						}
					}
					if(diag.length!=0){
						for(var i=0;i<diag.length;i++){
							var h=diag[i];
							if(h[3]=='new')
								insertDiag(h[4],h[0],h[1],h[2]);
						}
					}
					for(var i=0;i<soap.length;i++){
						var h=soap[i];
						if(h[6]=='new')
							insertSOAP(h[0],h[1],h[2],h[3],h[4],h[5],i,h[8]);
					}
					if(anam.length==1){
						var h=anam[0];
						updateAnam(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
					}else{
						var h=anam[1];
						updateAnam(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
					}
					for(var i=0;i<periksaImg.length;i++){
						var h=periksaImg[i];
						saveImage(h[0],h[1],h[2],idTrans+i);
					}
					bootbox.alert('Data Pemeriksaan Sudah Tersimpan!');
					pasienNosa(idPasien,idTrans,idEpisode);
					sudahDisimpan=true;
				},error:function(o)
				{
					bootbox.alert('Data Pemeriksaan Gagal Tersimpan!');					
				}
			});
		   }
		  });
		}
		else
			bootbox.alert("Silakan Pilih Pasien!");
	}
	function batalSoap(){
		
		if(idPasien){
			bootbox.confirm('Yakin akan membatalkan hasil pemeriksaan!',function(result){
				if (result == true){
					e('form1').reset();
					e('form2').reset();
					e('tindakTable').innerHTML="";
					tindak=[];
					diag=[];
					soap=[];
					analisaBhn=[];
					bhn24=[];
					hisResep1=[];
					periksaImg=[];
					pasienDokter();
					statusPasien();
					anam=[];
				}
			});
			
			//pasienNosa(idPasien,idTrans,idEpisode);
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function insertTindakan(idTransTin,kode,kodeP,tindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertTindakan/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,kode:kode,kodeP:kodeP,idTransTin:idTransTin,tindak:tindakan},
			success : function(o)
			{
				var prod = o;
						
			},error:function(o)
			{		
				bootbox.alert('Data Tindakan Gagal Tersimpan!');
			}
		});
	}
	function deleteTindakan(kode){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteTindakan/'+idUser,
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo,idTransTin:kode},
			success : function(o)
			{
				var prod = o;	
				bootbox.alert('Data Tindakan Sudah Terhapus !');
			},error:function(o)
			{		
				bootbox.alert('Data Tindakan Gagal Terhapus!');
			}
		});
	}

	function selectTindakan(idTrans){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTindakan',
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tindak=[];
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var tin=[];
						tin[0]=prod[i].KODE;
						tin[1]=prod[i].KODE_ICD;
						if(prod[i].KODE!=null)
							tin[2]=prod[i].LONG_DESCRIPTION;
						else
							tin[2]=prod[i].TINDAKAN;
						tin[3]='old';
						tin[4]=prod[i].TRANS_TIN;
						tindak.push(tin);
					}
				}
				table_tindak();
			},error:function(o)
			{		
				e('tindakTable').innerHTML="";
				e('tindakTable').innerHTML="Tidak Ada Tindakan!";
				
			}
		});
	}
	function insertDiag(idTransDiag,kode,kodeP,diag){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertDiag/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idTransDiag:idTransDiag,kode:kode,kodeP:kodeP,diagnosa:diag},
			success : function(o)
			{
				var prod = o;
						
			},error:function(o)
			{		
				bootbox.alert('Data Diagnosa Gagal Tersimpan!');
			}
		});
	}
	function deleteDiag(kode){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteDiag/'+idUser,
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo,idTransDiag:kode},
			success : function(o)
			{
				var prod = o;	
				bootbox.alert('Data Diagnosa Sudah Terhapus !');
			},error:function(o)
			{		
				bootbox.alert('Data Diagnosa Gagal Terhapus!');
			}
		});
	}

	function selectDiag(idTrans){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectDiag',
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				diag=[];
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var dia=[];
						dia[0]=prod[i].KODE;
						dia[1]=prod[i].KODE_ICD;
						if(prod[i].KODE!=null)
							dia[2]=prod[i].NM_DIAG1;
						else
							dia[2]=prod[i].DIAGNOSA;
						dia[3]='old';
						dia[4]=prod[i].TRANS_DIAG;
						diag.push(dia);
					}
				}
				table_diag();
			},error:function(o)
			{		
				e('diagTable').innerHTML="";
				e('diagTable').innerHTML="Tidak Ada Tindakan!";
				
			}
		});
	}
	function insertSOAP(s,s2,s3,o,a,p,no,cDate){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertSOAP/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idPoli:idPoli,idPasien:idPasien,idTransCo:idTransCo,tanggal:tanggal,idTrans:idTrans,S:s,S2:s2,S3:s3,O:o,A:a,P:p,tanggal:tanggal,no:no,cDate:cDate},
			success : function(o)
			{
				
			},error:function(o){
				bootbox.alert('Data SOAP Gagal Tersimpan!');	
			}
		});
				
	}
	function insertSOAP1(s,s2,s3,o,a,p,no,cDate){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertSOAP/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idPoli:idPoli,idPasien:idPasien,idTransCo:idTransCo,tanggal:tanggal,idTrans:idTrans,S:s,S2:s2,S3:s3,O:o,A:a,P:p,tanggal:tanggal,no:no,cDate:cDate},
			success : function(o)
			{
				if(idPasien!="")
					selectSOAP();
			},error:function(o){
				bootbox.alert('Data SOAP Gagal Tersimpan!');	
			}
		});
	}
	function updateSoap(){
	  bootbox.confirm('Apakah data akan di simpan? <br/> '+user,function(result){
	   if (result == true){	
		var df1,df9,ic1,ic9,k1,k9,komplikasi,edukasi,gizi,diagnosa,alkel,sakel;
		
		komplikasi=e("komplikasi").value;
		edukasi=e("edukasi").value;
		gizi=e("gizi").value;
		alkel=e("alkel").value;
		sakel=e("sakel").value;
		ic1=e("i1").value;
		k1=e("k1").value;
		diagnosa=e('d1').value;
			if(k1==""||k1==null||k1=="-"){
				/*bootbox.alert('Silakan Pilih Diagnosa Utama!',function(){
					setTimeout(function(){$("#d1").focus();},10);
				});*/
				diagnosa=e('d1').value;
				if(diagnosa==""||diagnosa==null||diagnosa=="-"){
					bootbox.alert('Silakan Masukkan Diagnosa Utama!',function(){
						setTimeout(function(){$("#d1").focus();},10);
					});
					return ;
				}
			}else{
				df1=e("d1").value;
				if(df1==""||df1==null||df1=="-"){
					bootbox.alert('Silakan Pilih Diagnosa Utama!',function(){
						setTimeout(function(){$("#d1").focus();},10);
					});
					
					return ;
				}
				ic1=e("i1").value;
				if(ic1==""||ic1==null||ic1=="-"){
					bootbox.alert('Silakan Pilih Kode ICD!',function(){
						setTimeout(function(){$("#i1").focus();},10);
					});
					return ;
				}
			}
		
		k9=e("k9").value;
		df9=e("d9").value;
		ic9=e("i9").value;
		/*if(k9==""||k9==null){
			bootbox.alert('Silakan Pilih Tindakan Utama!',function(){
				setTimeout(function(){$("#d9").focus();},10);
			});
			return ;
		}
		
		if(df9==""||df9==null){
			bootbox.alert('Silakan Pilih Tindakan Utama!',function(){
				setTimeout(function(){$("#d9").focus();},10);
			});
			return ;
		}
		
		if(ic9==""||ic9==null){
			bootbox.alert('Silakan Pilih Kode ICD!',function(){
				setTimeout(function(){$("#i9").focus();},10);
			});
			return ;
		}*/
		if(diag.length!=0){
			var cekTindak=[];
			if(k1!=""){
				if(k1!=null)
					cekTindak.push(k1);
			}
			for(var i=0;i<diag.length;i++){
				if(diag[i][0]!=""){
					if(diag[i][0]!=null)
						cekTindak.push(diag[i][0]);
				}
			}
			
			var tin=hasDuplicates(cekTindak);
			if(tin){
				bootbox.alert('Diagnosa ganda!');
				return ;
			}
		}
		
		if(tindak.length!=0){
			var cekTindak=[];
			if(k9!=""){
				if(k9!=null)
					cekTindak.push(k9);
			}
			for(var i=0;i<tindak.length;i++){
				if(tindak[i][0]!=""){
					if(tindak[i][0]!=null)
						cekTindak.push(tindak[i][0]);
					}
			}
			var tin=hasDuplicates(cekTindak);
			if(tin){
				bootbox.alert('Tindakan ganda!');
				return ;
			}
		}
		var s,s2,s3,o,a,p;
		s=e("S").value;
		if(s==""||s==null){
			bootbox.alert('Silakan Isi Keluhan Utama!',function(){
				setTimeout(function(){$("#S").focus();},10);
			});
			return ;
		}
		if(kunjungan==1){
			s2=e("S2").value;
			if(s2==""||s2==null){
				bootbox.alert('Silakan Isi Riwayat Penyakit Sekarang!',function(){
					setTimeout(function(){$("#S2").focus();},10);
				});
				return ;
			}
			s3=e("S3").value;
			if(s3==""||s3==null){
				bootbox.alert('Silakan Isi Riwayat Penyakit Dahulu!',function(){
					setTimeout(function(){$("#S3").focus();},10);
				});
				return ;
			}
		}else{
			s2="";
			s3="";
		}
		o=e("O").value;
		if(o==""||o==null){
			bootbox.alert('Silakan Isi O!',function(){
				setTimeout(function(){$("#O").focus();},10);
			});
			return ;
		}
		a=e("A").value;
		if(a==""||a==null){
			bootbox.alert('Silakan Isi A!',function(){
				setTimeout(function(){$("#A").focus();},10);
			});
			return ;
		}
		p=e("P").value;
		if(p==""||p==null){
			bootbox.alert('Silakan Isi P!',function(){
				setTimeout(function(){$("#P").focus();},10);
			});
			return ;
		}
		var nosa=[];
		nosa[0]=s;
		nosa[1]=s2;
		nosa[2]=s3;
		nosa[3]=o;
		nosa[4]=a;
		nosa[5]=p;
		nosa[6]='new';
		nosa[7]=user;
		nosa[8]=e('time').innerHTML;
		soap.push(nosa);
		soapKe=soap.length-1;
		showLoader();
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateNosa/'+idUser,
			type : "post",	
			data : {idTransCo:idTransCo,idTrans:idTrans,ICD10:k1,ICD9:k9,komplikasi:komplikasi,edukasi:edukasi,gizi:gizi,diagnosa:diagnosa,tindak:df9,alkel:alkel,sakel:sakel},
			success : function(o)
			{
				var prod = o;	
				if(tindak.length!=0){
					for(var i=0;i<tindak.length;i++){
						var h=tindak[i];
						if(h[3]=='new')
							insertTindakan(h[4],h[0],h[1],h[2]);
					}
				}
				if(diag.length!=0){
					for(var i=0;i<diag.length;i++){
						var h=diag[i];
						if(h[3]=='new')
							insertDiag(h[4],h[0],h[1],h[2]);
					}
				}
				for(var i=0;i<soap.length;i++){
					var h=soap[i];
					if(h[6]=='new')
						insertSOAP(h[0],h[1],h[2],h[3],h[4],h[5],i,h[8]);
				}
				if(anam.length==1){
					var h=anam[0];
					updateAnam(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
				}else{
					var h=anam[1];
					updateAnam(h[0],h[1],h[2],h[3],h[4],h[5],h[6],h[7]);
				}
				for(var i=0;i<periksaImg.length;i++){
					var h=periksaImg[i];
					if(h[3]=='new')
						saveImage(h[0],h[1],h[2],idTrans+i);
				}
				selesaiPeriksa();
				//bootbox.alert('Data Pemeriksaan Sudah Tersimpan!');
				//pasienNosa(idPasien,idTrans,idEpisode);
				sudahDisimpan=true;
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Gagal Tersimpan!');
			}
		});
	   }
	  });
	}
	function pasienKetModal(idPasien,idModal){
		$.ajax({
			url :base_url+'index.php/clinic_controller/pasienModal',
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					if(idModal=='formBody1')
						pasienModal1(prod,idModal);
					else
						pasienModal(prod,idModal);	
				}else{
					e(idModal).innerHTML="";
					e(idModal).innerHTML="Tidak Ada Pasien!";
				}
			},error:function(o)
			{		
				e(idModal).innerHTML="";
				e(idModal).innerHTML="Tidak Ada Pasien!";
			}
		});
	}

	function pasienKetModal5(idPasien,idModal){
		$.ajax({
			url :base_url+'index.php/clinic_controller/pasienModal',
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					if(idModal=='formBody5')
						pasienModal5(prod,idModal);
					else
						pasienModal(prod,idModal);	
				}else{
					e(idModal).innerHTML="";
					e(idModal).innerHTML="Tidak Ada Pasien!";
				}
			},error:function(o)
			{		
				e(idModal).innerHTML="";
				e(idModal).innerHTML="Tidak Ada Pasien!";
			}
		});
	}
	function ketPasienA(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectKet',
			type : "post",	
			data : {idTrans:idTrans},
			dataType : "json",
			success : function(o)
			{
				var prod=o;
				e('formAnam').reset();
				anam=[];
				if(prod.length!=0){
					var anam1=[];
					var h=prod[0];
					var tabel=e('ketPas');
					tabel.innerHTML="";
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.setAttribute('colspan',2);
					td.innerHTML="Perawat "+h.SUSTER;
					td.style.cssText='text-align:center; font-weight:bold';
					td=c('td',tr);
					td.setAttribute('colspan',2);
					td.innerHTML="Dokter";
					td.style.cssText='text-align:center; font-Weight:bold';
					
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="Tekanan Darah :";
					td.style.width='100px';
					td=c('td',tr);
					if(h.TV_TEKANAN_DARAH!=null && h.TV_TEKANAN_DARAH2!=null)
						td.innerHTML=h.TV_TEKANAN_DARAH+" / "+h.TV_TEKANAN_DARAH2+" mmHg";
					else if(h.TV_TEKANAN_DARAH!=null)
						td.innerHTML=h.TV_TEKANAN_DARAH+" /  mmHg";
					else if(h.TV_TEKANAN_DARAH2!=null)
						td.innerHTML="  / "+h.TV_TEKANAN_DARAH2+" mmHg";
					td.style.width='100px';
					
					td=c('td',tr);
					td.innerHTML="Tekanan Darah :";
					td.style.width='100px';
					td=c('td',tr,null,'tdDokter');
					if(h.TD_DOKTER!=null && h.TD2_DOKTER!=null){
						td.innerHTML=h.TD_DOKTER+" / "+h.TD2_DOKTER+" mmHg";
						e('tdDokter1').value=h.TD_DOKTER;
						e('tdDokter2').value=h.TD2_DOKTER;
						anam1[0]=h.TD_DOKTER;
						anam1[1]=h.TD2_DOKTER;
					}else if(h.TD_DOKTER!=null){
						td.innerHTML=h.TD_DOKTER+" /  mmHg";
						e('tdDokter1').value=h.TD_DOKTER;
						e('tdDokter2').value="";
						anam1[0]=h.TD_DOKTER;
						anam1[1]="";
					}else if(h.TD2_DOKTER!=null){
						td.innerHTML="  / "+h.TD2_DOKTER+" mmHg";
						e('tdDokter1').value="";
						e('tdDokter2').value=h.TD2_DOKTER;
						anam1[0]="";
						anam1[1]=h.TD2_DOKTER;
					}else if(h.TV_TEKANAN_DARAH!=null && h.TV_TEKANAN_DARAH2!=null){
						td.innerHTML=h.TV_TEKANAN_DARAH+" / "+h.TV_TEKANAN_DARAH2+" mmHg";
						e('tdDokter1').value=h.TV_TEKANAN_DARAH;
						e('tdDokter2').value=h.TV_TEKANAN_DARAH2;
						anam1[0]=h.TV_TEKANAN_DARAH;
						anam1[1]=h.TV_TEKANAN_DARAH2;
					}else if(h.TV_TEKANAN_DARAH!=null){
						td.innerHTML=h.TV_TEKANAN_DARAH+" /  mmHg";
						e('tdDokter1').value=h.TV_TEKANAN_DARAH;
						e('tdDokter2').value="";
						anam1[0]=h.TV_TEKANAN_DARAH;
						anam1[1]="";
					}else if(h.TV_TEKANAN_DARAH2!=null){
						td.innerHTML="  / "+h.TV_TEKANAN_DARAH2+" mmHg";
						e('tdDokter1').value="";
						e('tdDokter2').value=h.TV_TEKANAN_DARAH2;
						anam1[0]="";
						anam1[1]=h.TV_TEKANAN_DARAH2;
					}
					td.style.width='100px';
					
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="Frekuensi Nadi :";
					td=c('td',tr);
					if(h.TV_FREK_NADI!=null)
						td.innerHTML=h.TV_FREK_NADI+" x/Menit";
					td=c('td',tr);
					td.innerHTML="Frekuensi Nadi :";
					td=c('td',tr,null,'fnDokter');
					if(h.FNADI_DOKTER!=null){
						td.innerHTML=h.FNADI_DOKTER+" x/Menit";
						e('fnDokter1').value=h.FNADI_DOKTER;
						anam1[2]=h.FNADI_DOKTER;
					}else if(h.TV_FREK_NADI!=null){
						td.innerHTML=h.TV_FREK_NADI+" x/Menit";
						e('fnDokter1').value=h.TV_FREK_NADI;
						anam1[2]=h.TV_FREK_NADI;
					}
					
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="Suhu :";
					td=c('td',tr);
					if(h.TV_SUHU!=null)
						td.innerHTML=h.TV_SUHU+" c";
					td=c('td',tr);
					td.innerHTML="Suhu :";
					td=c('td',tr,null,'shDokter');
					if(h.SUHU_DOKTER!=null){
						td.innerHTML=h.SUHU_DOKTER+" c";
						e('shDokter1').value=h.SUHU_DOKTER;
						anam1[3]=h.SUHU_DOKTER;
					}else if(h.TV_SUHU!=null){
						td.innerHTML=h.TV_SUHU+" c";
						e('shDokter1').value=h.TV_SUHU;
						anam1[3]=h.TV_SUHU;
					}
			
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="Irama Nafas :";
					td=c('td',tr);
					if(h.TV_FREK_NAFAS!=null)
						td.innerHTML=h.TV_FREK_NAFAS+" x/Menit";
					td=c('td',tr);
					td.innerHTML="Irama Nafas :";
					td=c('td',tr,null,'fn2Dokter');
					if(h.FNAFAS_DOKTER!=null){
						td.innerHTML=h.FNAFAS_DOKTER+" x/Menit";
						e('fn2Dokter1').value=h.FNAFAS_DOKTER;
						anam1[4]=h.FNAFAS_DOKTER;
					}else if(h.TV_FREK_NAFAS!=null){
						td.innerHTML=h.TV_FREK_NAFAS+" x/Menit";
						e('fn2Dokter1').value=h.TV_FREK_NAFAS;
						anam1[4]=h.TV_FREK_NAFAS;
					}
							
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="Berat Badan :";
					td=c('td',tr);
					if(h.ANT_BB!=null)
						td.innerHTML=h.ANT_BB+" kg";
					td=c('td',tr);
					td.innerHTML="Berat Badan :";
					td=c('td',tr,null,'bbDokter');
					if(h.BB_DOKTER!=null){
						td.innerHTML=h.BB_DOKTER+" kg";
						e('bbDokter1').value=h.BB_DOKTER;
						anam1[5]=h.BB_DOKTER;
					}else if(h.ANT_BB!=null){
						td.innerHTML=h.ANT_BB+" kg";
						e('bbDokter1').value=h.ANT_BB;
						anam1[5]=h.ANT_BB;
					}
					
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="Tinggi Badan :";
					td=c('td',tr);
					if(h.ANT_TB!=null)
						td.innerHTML=h.ANT_TB+" cm";
					td=c('td',tr);
					td.innerHTML="Tinggi Badan :";
					td=c('td',tr,null,'tbDokter');
					if(h.TB_DOKTER!=null){
						td.innerHTML=h.TB_DOKTER+" cm";
						e('tbDokter1').value=h.TB_DOKTER;
						anam1[6]=h.TB_DOKTER;
					}else if(h.ANT_TB!=null){
						td.innerHTML=h.ANT_TB+" cm";
						e('tbDokter1').value=h.ANT_TB;
						anam1[6]=h.ANT_TB;
					}
					tr=c('tr',tabel);
					td=c('td',tr);
					td.innerHTML="IMT :";
					td=c('td',tr);
					if(h.ANT_IMT!=null)
						td.innerHTML=h.ANT_IMT;
					td=c('td',tr);
					td.innerHTML="IMT :";
					td=c('td',tr,null,'imtDokter');
					if(h.IMT_DOKTER!=null){ 
						td.innerHTML=h.IMT_DOKTER;
						e('imtDokter1').value=h.IMT_DOKTER;
						anam1[7]=h.IMT_DOKTER;
					}else if(h.ANT_IMT!=null){
						td.innerHTML=h.ANT_IMT;
						e('imtDokter1').value=h.ANT_IMT;	
						anam1[7]=h.ANT_IMT;
					}
					anam[0]=anam1;
					tr=c('tr',tabel);
					td=c('td',tr);
					td.setAttribute('colspan',4);
					var button=c("button",td,null,'anamDokter');
					button.innerHTML="Ubah";
					button.setAttribute('type','button');
					button.onclick=function(){
						openFormAnam();
					}
					/*if(doneP=='1_done')
						button.setAttribute('style','display:none');
					*/
				}
			},error :function(o){
			
			}
		});
	}
	function openFormAnam(){
		$('#addAnamModal').modal('show');
		$('#addAnamModal').on('shown.bs.modal', function () {
			$('#tdDokter1').focus();
		});
		
	}
	function insertAlergi(idPasien,alergi){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertAlergi/'+idUser,
			type : "post",	
			data : {idPasien:idPasien,alergi:alergi},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Data Alergi Sudah Tersimpan!');
				sudahDisimpan=true;
				pasienAlergi(idPasien,"tabelAlergi");		
			},error:function(o)
			{		
				bootbox.alert('Data Alergi Gagal Tersimpan!');
			}
		});
	}
	function pasienAlergi(idPasien,nama){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAlergi',
			type : "post",	
			data : {idPasien:idPasien},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(nama=="tabelAlergi")
					tabelAlergi(prod);	
				else 
					textTes(prod);
			},error:function(o)
			{		
				if(nama=="tabelAlergi")
					tabelAlergi(prod);	
				else 
					textTes(prod);
			}
		});
	}
	function insertCatatan(idPasien,catt){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertCatatan/'+idUser,
			type : "post",	
			data : {idPasien:idPasien,catatan:catt},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Catatan Khusus Sudah Tersimpan!');
				sudahDisimpan=true;
				pasienCatatan(idPasien);		
			},error:function(o)
			{		
				bootbox.alert('Catatan Khusus Gagal Tersimpan!');
			}
		});
	}
	function pasienCatatan(idPasien){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectCatatan',
			type : "post",	
			data : {idPasien:idPasien},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelCatatan(prod);
			},error:function(o)
			{		
				tabelCatatan();
			}
		});
	}

	function insertRencana(idPasien,catt){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertRencana/'+idUser,
			type : "post",	
			data : {idPasien:idPasien,rencana:catt},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Tindak Rencana  Sudah Tersimpan!');
				sudahDisimpan=true;
				pasienRencana(idPasien);	
				pasienRencana(idEpisode);		
			},error:function(o)
			{		
				bootbox.alert('Tindak Rencana  Gagal Tersimpan!');
			}
		});
	}
	function pasienRencana(idPasien){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectRencana',
			type : "post",	
			data : {idPasien:idPasien},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelRencana(prod);
			},error:function(o)
			{		
				tabelRencana();
			}
		});
	}
	function searchSejarah(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSejarahRe',
			type : "post",	
			data : {idPasien:idPasien,tanggal:now},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sejarahResep(prod);
				formulaObat=[];
				setTimeout('sejarahResepKonten1(formulaObat)',200);
			},error:function(o)
			{		
				sejarahResep();
				formulaObat=[];
				setTimeout('sejarahResepKonten1(formulaObat)',200);
			}
		});
	}
	function selectSejarahResep(ke,tco){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSejarahResep',
			type : "post",	
			data : {idPasien:idPasien,idTransCo1:tco,resepKe1:ke},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sejarahResepKonten(prod);
			},error:function(o)
			{		
				sejarahResepKonten();
			}
		});
	}
	function selectICD(diagnosa,id,sum){
		content=e("icdBody");
		content.innerHTML="";
		content.innerHTML="Loading... <img src='../asset/image/loader.gif'></img>";
		e('titleModalIcd').innerHTML='Diagnosa';
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectICD',
			type : "post",	
			data : {diagnosa:diagnosa,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelICD(prod,id);
			},error:function(o)
			{		
				$("#icdModal").modal('hide');
				bootbox.alert('Tidak Ada Data Diagnosa!');
			}
		});
	}
	function selectICD2(kode,id,sum){
		content=e("icdBody");
		content.innerHTML="";
		content.innerHTML="Loading... <img src='../asset/image/loader.gif'></img>";
		e('titleModalIcd').innerHTML='Diagnosa';
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectICD2',
			type : "post",	
			data : {kode:kode,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelICD(prod,id);
			},error:function(o)
			{	
				$("#icdModal").modal('hide');
				bootbox.alert('Tidak Ada Data Kode ICD 10!');
			}
		});
	}
	function selectICDCM(kode,num,sum){
		content=e("icdBody");
		content.innerHTML="";
		content.innerHTML="Loading... <img src='../asset/image/loader.gif'></img>";
		e('titleModalIcd').innerHTML='Tindakan';
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectICDCM',
			type : "post",	
			data : {tindakan:kode,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelICD2(prod,num);
			},error:function(o)
			{		
				$("#icdModal").modal('hide');
				bootbox.alert('Tidak Ada Data Tindakan!');
			}
		});
	}
	function selectICDCM2(kode,num,sum){
		content=e("icdBody");
		content.innerHTML="";
		content.innerHTML="Loading... <img src='../asset/image/loader.gif'></img>";
		e('titleModalIcd').innerHTML='Tindakan';
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectICDCM2',
			type : "post",	
			data : {kode:kode,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelICD2(prod,num);
			},error:function(o)
			{	
				$("#icdModal").modal('hide');
				bootbox.alert('Tidak Ada Data Kode ICD 9!');
			}
		});
	}
	function searchObat(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectObat',
			type : "post",
			data:{obat:nama,jumlah:sum,idRekanan:idRekanan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAdd(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Obat!');
			}
		});
	}	
	function searchBhn(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectBhn',
			type : "post",
			data:{obat:nama,jumlah:sum,idRekanan:idRekanan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAdd(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Bahan!');
			}
		});
	}	
	function searchBhnF(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectBhn',
			type : "post",
			data:{obat:nama,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddFormula(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Bahan!');
			}
		});
	}	
	function searchResep(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectResep',
			type : "post",
			data : {idTrans:idEpisode,idTransCo:idTransCo,resepKe:resepKe},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelResep1(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Resep!');
			}
		});
	}
	var signa=[];
	function selectSigna(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSigna',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					signa=[];
					for (var i=0;i<prod.length;i++) {
						var s=[];
						var h = prod[i];
						s[0]=h.SIGNA_ID;
						s[1]=h.SIGNA_PENDEK;
						signa.push(s);
					}
				}
			},error:function(o)
			{		
				signa=[];
			}
		});
	}
	
	function isiSigna(ket){
		var content = e("signaO"+ket);
		content.innerHTML="";
		if(signa.length!=0){
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
			for (var i=0;i<signa.length;i++) {
				var h = signa[i];
				var option=c("option",content);
				option.value=h[0];
				option.innerHTML=h[1];
			}
		}else{
			var content = e("signaO"+ket);
			content.innerHTML="";
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
		}
	}	
	var route_ms=[];
	function selectRoute(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectRoute',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					route_ms=[];
					for (var i=0;i<prod.length;i++) {
						var s=[];
						var h = prod[i];
						s[0]=h.ROUTE_ID;
						s[1]=h.KETERANGAN;
						route_ms.push(s);
					}
				}
			},error:function(o)
			{		
				route_ms=[];
			}
		});
	}
	
	function isiRoute(ket){
		var content = e("routeObat"+ket);
		content.innerHTML="";
		if(route_ms.length!=0){
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
			for (var i=0;i<route_ms.length;i++) {
				var h = route_ms[i];
				var option=c("option",content);
				option.value=h[0];
				option.innerHTML=h[1];
			}
		}else{
			var content = e("routeObat"+ket);
			content.innerHTML="";
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
		}
	}	
	function isiRoute1(ket){
		var content = e(ket);
		content.innerHTML="";
		if(route_ms.length!=0){
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
			for (var i=0;i<route_ms.length;i++) {
				var h = route_ms[i];
				var option=c("option",content);
				option.value=h[0];
				option.innerHTML=h[1];
			}
		}else{
			var content = e("routeObat"+ket);
			content.innerHTML="";
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
		}
	}	
	var bungkus=[];
	function selectBungkus(isi){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectBungkus',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					bungkus=[];
					for (var i=0;i<prod.length;i++) {
						var ket=[]
						var h = prod[i];
						ket[0]=h.OBAT_ID;
						ket[1]=h.NAMA;
						ket[2]=h.SEDIAAN_ID;
						ket[3]=h.SEDIAAN;
						ket[4]=h.SATUAN_KECIL_ID;
						ket[5]=h.SATUAN;
						bungkus.push(ket);
					}
				}
			},error:function(o)
			{		
				bungkus=[];
			}
		});
	}
	function isiBungkus(isi){
		var content = e("bRacik"+isi);
		content.innerHTML="";
		if(bungkus.length!=0){
			for (var i=0;i<bungkus.length;i++) {
				var h = bungkus[i];
				var option=c("option",content);
				option.value=i+'_bungkus';
				option.innerHTML=h[1];
			}
		}else{			
			var content = e("bRacik"+isi);
			content.innerHTML="";
			var option=c("option",content);
			option.value="";
			option.innerHTML="";
		}
	}
	var bahanAktif=[];
	function isiBhnAktif(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectBhnAktif',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				for (var i=0;i<prod.length;i++) {
					var h = prod[i];
					bahanAktif[i]=h.NAMA_BAHAN;
				}
			}
		});
	}
	
	function addResep(urut,idObat,obat,idKemasan,idSatuan,qty,idSigna,signa,sDokter,cat,type,header,racik,dosis,idRoute){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addResep/'+idUser,
			type : "post",
			data : {idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idObat:idObat,obat:obat,cat:cat,idKemasan:idKemasan,idSatuan:idSatuan,jumlah:qty,idSigna:idSigna,signa:signa,sDokter:sDokter,urut:urut,tanggal:tanggal,resepKe:resepKe,type:type,header:header,racik:racik,dosis:dosis,idRoute:idRoute},
			success : function(o)
			{
				var prod = o;
			},error:function(o)
			{		
				bootbox.alert(' Data Resep Gagal Tersimpan!');
			}
		});
	}
	function deleteResep(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteResep',
			type : "post",
			data : {idTrans:idEpisode,idTransCo:idTransCo,resepKe:resepKe},
			success : function(o)
			{
				var prod = o;	
				var a=0;
				for(var i=0;i<obatResep.length;i++){
					var a=a+1;
					addResep(a,obatResep[i][0],obatResep[i][1],obatResep[i][2],obatResep[i][4],obatResep[i][6],obatResep[i][8],obatResep[i][9],obatResep[i][10],obatResep[i][7],obatResep[i][12],obatResep[i][13],obatResep[i][14],obatResep[i][15],obatResep[i][16]);	
				}
				resepKe=rKe;
			},error:function(o)
			{		
				bootbox.alert('Data Resep Gagal Terhapus!');
			}
		});
	}
	function deleteResep1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteResep',
			type : "post",
			data : {idTrans:idEpisode,idTransCo:idTransCo,resepKe:resepKe},
			success : function(o)
			{
				var prod = o;	
				deleteWorklistResep(resepKe);
				resepKe=rKe-1;
				rKe=resepKe;
			},error:function(o)
			{		
				bootbox.alert('Data Resep Gagal Terhapus!');
			}
		});
	}
	function deleteResep2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteResep',
			type : "post",
			data : {idTrans:idEpisode,idTransCo:idTransCo,resepKe:1},
			success : function(o)
			{
				var prod = o;	
				var a=0;
				resepKe=1;
				for(var i=0;i<ppkRe.length;i++){
					if(ppkRe[i][16]){
						var a=a+1;
						addResep(a,ppkRe[i][1],ppkRe[i][2],ppkRe[i][3],ppkRe[i][5],ppkRe[i][7],ppkRe[i][8],ppkRe[i][9],ppkRe[i][10],"",ppkRe[i][12],ppkRe[i][13],ppkRe[i][14],ppkRe[i][15],ppkRe[i][18]);							
					}
				}
				resepKe=2;
				rKe=resepKe;
			},error:function(o)
			{		
				bootbox.alert('Data Resep Gagal Terhapus!');
			}
		});
	}
	function formStruktur(no){
		$.ajax({
			url :base_url+'index.php/clinic_controller/getForm',
			type : "post",
			data : {idForm:no,idRekanan:idRekanan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(no==1){
					labBody(prod);
					searchLab();
				}else{
					radBody(prod);
					searchRad();
				}
			}
		});
	}
	function addLab(test,cat,nomor,cito){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addLab/'+idUser,
			type : "post",
			data : {idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idTest:test,cat:cat,tanggal:tanggal,labKe:labKe,nomor:nomor,cito:cito},
			success : function(o)
			{
				var prod = o;
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Laboratorium Gagal Tersimpan!');
			}
		});
	}
	function insertWorkResep(resepKe){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertWorkResep/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo,idPoli:idPoli,idPasien:idPasien,tanggal:tanggal,idTrans:idTrans,tanggal:tanggal,idRekanan:idRekanan,resepKe:resepKe},
			success : function(o)
			{
			},error:function(o){
				bootbox.alert('Data WorkList Resep Gagal Tersimpan!');	
			}
		});
				
	}
	function updateWorklistResep(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateWorklistResep/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo},
			success : function(o)
			{
			},error:function(o){
				bootbox.alert('Data WorkList Resep Gagal Tersimpan!');	
			}
		});		
	}
	function deleteWorklistResep(resepKe){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteWorklistResep/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo,resepKe:resepKe},
			success : function(o)
			{
				
			},error:function(o){
				bootbox.alert('Data WorkList Resep Gagal Tersimpan!');	
			}
		});
				
	}
	function insertWorkLab(labKe){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertWorkLab/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo,idPoli:idPoli,idPasien:idPasien,tanggal:tanggal,idTrans:idTrans,tanggal:tanggal,idRekanan:idRekanan,labKe:labKe},
			success : function(o)
			{
				//labDT();
			},error:function(o){
				bootbox.alert('Data WorkList Laboratorium Gagal Tersimpan!');	
			}
		});
				
	}
	function deleteWorklistLab(labKe){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteWorklistLab/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo,labKe:labKe},
			success : function(o)
			{
				//labDT();
			},error:function(o){
				bootbox.alert('Data WorkList Laboratorium Gagal Tersimpan!');	
			}
		});
				
	}
	function insertWorkRad(radKe){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertWorkRad/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo,idPoli:idPoli,idPasien:idPasien,tanggal:tanggal,idTrans:idTrans,tanggal:tanggal,idRekanan:idRekanan,radKe:radKe},
			success : function(o)
			{

			},error:function(o){
				bootbox.alert('Data WorkList Radiologi Gagal Tersimpan!');	
			}
		});
				
	}
	function deleteWorklistRad(radKe){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteWorklistRad/'+idUser,
			type : "post",	
			data : {idEpisode:idEpisode,idTransCo:idTransCo,radKe:radKe},
			success : function(o)
			{

			},error:function(o){
				bootbox.alert('Data WorkList Radiologi Gagal Tersimpan!');	
			}
		});
				
	}
	function searchLab(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectLab',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,labKe:labKe},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelLab1(prod);
			},error:function(o)
			{		
				tabelLab1();
			}
		});
	}
	function deleteLab(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteLab',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,labKe:labKe},
			success : function(o)
			{
				var prod = o;
				if(prod!='gagal'){	
					var cat=e("arealabBody").value;
					for(var i=0;i<labPil.length;i++){
						if(labPil[i][8])
							addLab(labPil[i][0],cat,i,labPil[i][10]);
					}
					labKe=lKe;
					bootbox.alert('Data Pemeriksaan Laboratorium Sudah Tersimpan!');
				}else{
					labKe=2;
					bootbox.alert('Pemeriksaan Laboratorium Tidak Dapat Diubah!');
				}
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Laboratorium Gagal Terhapus!');
			}
		});
	}
	function deleteLab1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteLab',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,labKe:labKe},
			success : function(o)
			{
				var prod = o;
				if(prod!='gagal'){	
					deleteWorklistLab(labKe);
					labKe=lKe-1;
					lKe=labKe;
				}else{
					labKe=2;
					bootbox.alert('Pemeriksaan Laboratorium Tidak Dapat Diubah!');
				}
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Laboratorium Gagal Terhapus!');
			}
		});
	}
	function deleteLab2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteLab',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,labKe:1},
			success : function(o)
			{
				var prod = o;
				if(prod!='gagal'){	
					labKe=1;
					for(var i=0;i<ppkLa.length;i++){
						if(ppkLa[i][5])
							addLab(ppkLa[i][1],"",ppkLa[i][2],ppkLa[i][4]);
					}
					labKe=2;
					lKe=labKe;
				}else{
					labKe=2;
					bootbox.alert('Pemeriksaan Laboratorium Tidak Dapat Diubah!');
				}
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Laboratorium Gagal Terhapus!');
			}
		});
	}
	function addRad(test,cat,ki,ka,nomor){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addRad/'+idUser,
			type : "post",
			data : {idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idTest:test,cat:cat,kiri:ki,kanan:ka,tanggal:tanggal,radKe:radKe,nomor:nomor},
			success : function(o)
			{
				var prod = o;
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Radiologi Gagal Tersimpan!');
			}
		});
	}
	function searchRad(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectRad',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,radKe:radKe},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelRad1(prod);
			},error:function(o)
			{		
				tabelRad1();
			}
		});
	}
	function deleteRad(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteRad',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,radKe:radKe},
			success : function(o)
			{
				var prod = o;
				if(prod!='gagal'){	
					var cat=e("arearadBody").value;
					for(var i=0;i<radPil.length;i++){
						if(radPil[i][11])
							addRad(radPil[i][0],cat,radPil[i][9],radPil[i][10],i);
					}
					radKe=raKe;
					bootbox.alert('Data Pemeriksaan Radiologi Sudah Tersimpan!');
				}else{
					radKe=2;
					bootbox.alert('Pemeriksaan Radiologi Tidak Dapat Diubah!');
				}
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Radiologi Gagal Terhapus!');
			}
		});
	}
	function deleteRad1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteRad',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,radKe:radKe},
			success : function(o)
			{
				var prod = o;
				if(prod!='gagal'){	
					deleteWorklistRad(radKe);
					radKe=raKe-1;
					raKe=radKe;
				}else{
					radKe=2;
					bootbox.alert('Pemeriksaan Radiologi Tidak Dapat Diubah!');
				}
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Radiologi Gagal Terhapus!');
			}
		});
	}
	function deleteRad2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteRad',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,radKe:1},
			success : function(o)
			{
				var prod = o;
				if(prod!='gagal'){
					radKe=1;
					for(var i=0;i<ppkRa.length;i++){
						if(ppkRa[i][5])
							addRad(ppkRa[i][1],"",'N','N',ppkRa[i][2]);
					}
					radKe=2;
					raKe=radKe;
				}else{
					radKe=2;
					bootbox.alert('Pemeriksaan Radiologi Tidak Dapat Diubah!');
				}
			},error:function(o)
			{		
				bootbox.alert('Data Pemeriksaan Radiologi Gagal Terhapus!');
			}
		});
	}
	function searchAlkes(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/searchAlkes',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,alkesKe:alkesKe,idRekanan:idRekanan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelAlkes1(prod);
			},error:function(o)
			{		
				tabelAlkes1();
			}
		});
	
	}
	function selectAlkes(alkes,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAlkes',
			type : "post",
			data:{alkes:alkes,jumlah:sum,idRekanan:idRekanan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddAlkes(prod);
			},error:function(o)
			{		
				tabelAddAlkes();
			}
		});
	}
	function addAlkes(idAlkes,alkes,qty,cat){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addAlkes/'+idUser,
			type : "post",
			data : {idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idAlkes:idAlkes,alkes:alkes,cat:cat,jumlah:qty,tanggal:tanggal,alkesKe:alkesKe},
			success : function(o)
			{
				var prod = o;
			},error:function(o)
			{		
				bootbox.alert('Data Tindakan Gagal Tersimpan!');
			}
		});
	}
	function deleteAlkes(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteAlkes',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,alkesKe:alkesKe},
			success : function(o)
			{
				var prod = o;	
				for(var i=0;i<alkesResep.length;i++){
					addAlkes(alkesResep[i][0],alkesResep[i][1],alkesResep[i][2],alkesResep[i][3]);
				}
				alkesKe=aKe;
			},error:function(o)
			{		
				bootbox.alert('Data Tindakan Gagal Terhapus!');
			}
		});
	}
	function deleteAlkes1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteAlkes',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,alkesKe:alkesKe},
			success : function(o)
			{
				var prod = o;	
				
				alkesKe=aKe-1;
				aKe=alkesKe;
			},error:function(o)
			{		
				bootbox.alert('Data Tindakan Gagal Terhapus!');
			}
		});
	}
	function deleteAlkes2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteAlkes',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,alkesKe:1},
			success : function(o)
			{
				var prod = o;
				alkesKe=1;				
				for(var i=0;i<ppkTi.length;i++){
					if(ppkTi[i][4])
						addAlkes(ppkTi[i][1],ppkTi[i][2],ppkTi[i][3],'');
				}
				alkesKe=2;
				aKe=alkesKe;
			},error:function(o)
			{		
				bootbox.alert('Data Tindakan Gagal Terhapus!');
			}
		});
	}
	function selectMasterFormObat(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectMasterFormObat/'+idUser,
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaObat=[];
				e("namaFormula").value="";
				tabelMSFO(prod);
				tabelFO(formulaObat);
			},error:function(o){
				formulaObat=[];
				var content=e("masterFormula");
				content.innerHTML="";
				content.innerHTML="Tidak Ada Formula!";
				tabelFO(formulaObat);
			}
		});
	}
	function selectMSFO(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectMasterFormObat/'+idUser,
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaObat=[];
				tabelMSFO1(prod);
				setTimeout('tabelFO3(formulaObat)',200);
			},error:function(o){
				formulaObat=[];
				var content=e("masterFormula1");
				content.innerHTML="";
				content.innerHTML="Tidak Ada Formula!";
				tabelFO3(formulaObat);
			}
		});
	}
	function addMasterFormObat(formula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addMasterFormObat/'+idUser,
			type : "post",
			data : {formula:formula},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Data Nama Formula Resep Sudah Tersimpan!');
				sudahDisimpan=true;
				selectMasterFormObat();
				idFormula=null;
				oldNama=null;				
			},error:function(o){
				bootbox.alert('Data Nama Formula Resep Gagal Tersimpan!');
			}
		});
	}
	function doubleMasterFormObat(formula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/copyMasterFormObat/'+idUser,
			type : "post",
			data : {formula:formula},
			success : function(o)
			{
				var prod = o;
				idFormula=prod;
				var length=formulaObat.length;
				if(length==0){
					return false;
				}else{
					for(var i=0;i<length;i++){
						var h=formulaObat[i];
							addFO(h[11],h[1],h[2],h[3],h[5],h[8],h[9],h[10],h[7],h[12],h[13],h[14],h[15]);
					}
				}
				bootbox.alert('Data Formula Resep Sudah Digandakan!');
				selectMasterFormObat();
			},error:function(o){
				bootbox.alert('Data Formula Resep Gagal Digandakan!');
			}	
		});
	}
	function copyToFormula(formula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/copyMasterFormObat/'+idUser,
			type : "post",
			data : {formula:formula},
			success : function(o)
			{
				var prod = o;
				idFormula=prod;
				var length=formulaObat.length;
				if(length==0){
					return false;
				}else{
					for(var i=0;i<length;i++){
						var h=formulaObat[i];
							addFO(h[11],h[1],h[2],h[3],h[5],h[8],h[9],h[10],h[7],h[12],h[13],h[14],h[15]);
					}
				}
				bootbox.alert('Data Sejarah Resep Sudah Tersimpan di Formula Resep!');
				$('#getHRModal').modal('hide');
				formulaObat=[];
			},error:function(o){
				bootbox.alert('Data Sejarah Resep Gagal Tersimpan di Formula Resep!');
			}	
		});
	}
	function deleteMasterFormObat(formula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteMasterFormObat/'+idUser,
			type : "post",
			data : {idFormula:formula,tanggal:tanggal},
			success : function(o)
			{
				var prod = o;
				idFormula=null;
				oldNama=null;
				bootbox.alert('Data Formula Resep Sudah Terhapus!');
				selectMasterFormObat();
			},error:function(o){
				bootbox.alert('Data Formula Resep Gagal Terhapus!');
			}
		});
	}
	function updateMasterFormObat(formula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateMasterFormObat/'+idUser,
			type : "post",
			data : {idFormula:idFormula,formula:formula,oldNama:oldNama,tanggal:tanggal},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Data Nama Formula Resep Sudah Tersimpan!');
				var tr=e(idFormula);
				tr.innerHTML="";
				var td = c("td", tr,null,formula);
				td.innerHTML="<a class='activation' href=javascript:myClick() >"+formula+"</a>";	
				td.setAttribute('title',formula);
				$('#'+formula+' .activation').focus();
				e("namaFormula").value=formula;
				oldNama=formula;
				$('#'+idFormula).closest('table').find('td').removeAttr("style");			
				$('#'+idFormula).children("td").css("background","#C0C0C0");
			},error:function(o){
				bootbox.alert('Data Nama Formula Resep Gagal Tersimpan!');
			}
		});
	}
	function selectFormulaObat(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectFormulaObat',
			type : "post",
			data:{idFormula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaObat=[];
				noRacik=0;
				tabelFO1(prod);
			},error:function(o){
				formulaObat=[];
				noRacik=0;
				tabelFO1(formulaObat);
			}
		});
	}
	function selectFO(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectFormulaObat',
			type : "post",
			data:{idFormula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaObat=[];
				tabelFO2(prod);
			},error:function(o){
				formulaObat=[];
				tabelFO2(formulaObat);
			}
		});
	}
	function searchObatF(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectObat',
			type : "post",
			data:{obat:nama,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddFormula(prod);
			},error:function(o){
				
			}
		});
	}
	function addFO(urut,idObat,obat,idKemasan,idSatuan,idSigna,signa,sDokter,qty,type,header,racik,dosis){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addFormulaObat/'+idUser,
			type : "post",
			data : {idFormula:idFormula,idObat:idObat,obat:obat,idKemasan:idKemasan,idSatuan:idSatuan,jumlah:qty,idSigna:idSigna,signa:signa,sDokter:sDokter,urut:urut,type:type,header:header,racik:racik,dosis:dosis},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula Resep Gagal Tersimpan!');
			}
		});
	}
	function deleteFO(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteFormulaObat/'+idUser,
			type : "post",
			data : {idFormula:idFormula,tanggal:tanggal},
			success : function(o)
			{
				var prod = o;
				var a=0;
				for(var i=0;i<formulaObat.length;i++){
					var a=i+1;
					addFO(a,formulaObat[i][1],formulaObat[i][2],formulaObat[i][3],formulaObat[i][5],formulaObat[i][8],formulaObat[i][9],formulaObat[i][10],formulaObat[i][7],formulaObat[i][12],formulaObat[i][13],formulaObat[i][14],formulaObat[i][15]);
				}
				selectMasterFormObat();
			},error:function(o){
				bootbox.alert('Data Formula Resep Gagal Terhapus!');
			}
		});
	}
	
	function selectMasterFT(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectMasterFT/'+idUser,
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaTindakan=[];
				tabelFT(formulaTindakan);
				e("namaTindakan").value="";
				tabelMSFT(prod);
			},error:function(o){
				formulaTindakan=[];
				var content=e("masterTindakan");
				content.innerHTML="";
				content.innerHTML="Tidak Ada Formula!";
				tabelFT(formulaTindakan);
			}
		});
	}
	function selectMSFT(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectMasterFT/'+idUser,
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelMSFT1(prod);
				setTimeout('tabelFT3(formulaTindakan)',200);
			},error:function(o){
				formulaTindakan=[];
				var content=e("masterTindakan1");
				content.innerHTML="";
				content.innerHTML="Tidak Ada Formula!";
				tabelFT3(formulaTindakan);
			}
		});
	}
	function addMasterFT(tindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addMasterFT/'+idUser,
			type : "post",
			data : {tindakan:tindakan},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Data Nama Formula Tindakan Sudah Tersimpan!');
				selectMasterFT();
				idTindakan=null;
				asalPoli=null;			
			},error:function(o){
				bootbox.alert('Data Nama Formula Tindakan Gagal Tersimpan!');
			}
		});
	}
	function doubleMasterFT(tindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/copyMasterFT/'+idUser,
			type : "post",
			data : {tindakan:tindakan},
			success : function(o)
			{
				var prod = o;
				idTindakan=prod;
				var length=formulaTindakan.length;
				if(length==0){
					return false;
				}else{
					for(var i=0;i<length;i++){
						var h=formulaTindakan[i];
							addFT(h[1],h[2],h[3]);
					}
				}
				bootbox.alert('Data Formula Tindakan Sudah Digandakan!');
				selectMasterFT();
			},error : function(o){
				bootbox.alert('Data Formula Tindakan Gagal Digandakan!');
			}				
		});
	}
	function deleteMasterFT(tindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteMasterFT/'+idUser,
			type : "post",
			data : {idTindakan:tindakan,tanggal:tanggal},
			success : function(o)
			{
				var prod = o;
				idTindakan=null;
				asalPoli=null;
				bootbox.alert('Data Formula Tindakan Sudah Terhapus!');
				selectMasterFT();
			},error : function(o){
				bootbox.alert('Data Formula Tindakan Gagal Terhapus!');
			}
		});
	}
	function updateMasterFT(tindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateMasterFT/'+idUser,
			type : "post",
			data : {idTindakan:idTindakan,tindakan:tindakan,asalPoli:asalPoli,tanggal:tanggal},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Data Nama Formula Tindakan Sudah Tersimpan!');
				var tr=e(idTindakan);
				tr.innerHTML="";
				var td = c("td", tr,null,tindakan);
				td.innerHTML="<a class='activation' href=javascript:myClick() >"+tindakan+"</a>";	
				td.setAttribute('title',tindakan);
				$('#'+tindakan+' .activation').focus();
				e("namaTindakan").value=tindakan;
				asalPoli=tindakan;
				$('#'+idTindakan).closest('table').find('td').removeAttr("style");			
				$('#'+idTindakan).children("td").css("background","#C0C0C0");
			},error:function(o){
				bootbox.alert('Data Nama Formula Tindakan Sudah Tersimpan!');
			}
		});
	}
	function selectFormulaTindakan(idTindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectFormulaTindakan',
			type : "post",
			data:{idTindakan:idTindakan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaTindakan=[];
				tabelFT1(prod);
			},error:function(o){
				formulaTindakan=[];
				tabelFT1(formulaTindakan);
			}
		});
	}
	function selectFT(idTindakan){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectFormulaTindakan',
			type : "post",
			data:{idTindakan:idTindakan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				formulaTindakan=[];
				tabelFT2(prod);
			},error:function(o){
				formulaTindakan=[];
				tabelFT2(formulaTindakan);
			}
		});
	}
	function searchAlkesF(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAlkes',
			type : "post",
			data:{alkes:nama,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddTindakan(prod);
			},error : function(o){
			
			}
		});
	}
	function addFT(idObat,obat,qty){
		$.ajax({
			url :base_url+'index.php/clinic_controller/addFormulaTindakan/'+idUser,
			type : "post",
			data : {idTindakan:idTindakan,idObat:idObat,obat:obat,jumlah:qty},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula Tindakan Gagal Tersimpan!');
			}
		});
	}
	function deleteFT(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteFormulaTindakan/'+idUser,
			type : "post",
			data : {idTindakan:idTindakan,tanggal:tanggal},
			success : function(o)
			{
				var prod = o;
				for(var i=0;i<formulaTindakan.length;i++){
					addFT(formulaTindakan[i][1],formulaTindakan[i][2],formulaTindakan[i][3],formulaTindakan[i][5]);
				}	
				selectMasterFT();			
			},error:function(o){
				bootbox.alert('Data Formula Tindakan Gagal Terhapus!');
			}
		});
	}
	
	function awal(prod){
		var content=e("status");
		content.innerHTML="";
		var pilih="";
		cHeight=content.offsetHeight-75;
		
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","sts_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PASIEN";
		
		th = c("th", tr);
		th.innerHTML="MRN";
		th = c("th", tr);
		th.innerHTML="KUNJUNGAN KE";
		
		th = c("th", tr);
		th.innerHTML="TGL.LAHIR";

		th = c("th", tr);
		th.innerHTML="JENIS KELAMIN";
		th = c("th", tr);
		th.innerHTML="URUT";
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				if(h.ANAM!=h.TRANS_ID)
					continue;
				tr = c("tr", tbody,h.PASIEN_ID,h.TRANS_ID);
				tr.ondblclick=function() {
				   if(idPasien!=""){
					if(!sudahDisimpan){
						bootbox.alert('Data belum disimpan.');
						return;
					}
				   }
					idTrans=this.id;
					idPasien=this.className.split(' ')[0];
					mrn=this.cells[1].innerHTML;
					idEpisode=this.cells[9].innerHTML;
					idPoli=this.cells[10].innerHTML;
					idRekanan=this.cells[11].innerHTML;
					poliklinik=this.cells[14].innerHTML;
					kunjungan=this.cells[2].title;
					no_urut=this.cells[15].title;
					nama_pasien=this.cells[0].title;
					var byr=this.cells[13].innerHTML;
					if(byr=='55'){
						doneP='1_done';
						$('#pgl').attr('style','display:none;');
					}else{
						doneP='0_done';
						$('#pgl').removeAttr('style');
					}
						//doneP=this.cells[0].className.split(' ')[0];
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					konsul=this.cells[12].innerHTML;
					pasienKet();
					ketPasienA();
					pasienNosa(idPasien,idTrans,idEpisode);
					$('#wPaint').wPaint('clear');
					var content=e("tabAlergi");
					if(content)
						pasienAlergi(idPasien,"tabelAlergi");
					var content1=e("tabCatt");
					if(content1)
						pasienCatatan(idPasien);
					var content2=e("tabRencana");
					if(content2)
					    pasienRencana(idPasien);
					
					resepKe=this.cells[5].innerHTML;
					if(resepKe=="")
						resepKe=1;
					else
						resepKe=eval(resepKe)+1;
					rKe=resepKe;
					labKe=this.cells[6].innerHTML;
					if(labKe=="")
						labKe=1;
					else
						labKe=eval(labKe)+1;
					lKe=labKe;
					radKe=this.cells[7].innerHTML;
					if(radKe=="")
						radKe=1;
					else
						radKe=eval(radKe)+1;
					raKe=radKe;
					alkesKe=this.cells[8].innerHTML;
					if(alkesKe=="")
						alkesKe=1;
					else
						alkesKe=eval(alkesKe)+1;
					aKe=alkesKe;
					closeTab1();
					getTotal();
					getLink();
				}
				tr.onkeydown=function(event) {
					if(event.keyCode==13){
					    if(idPasien!=""){
						if(!sudahDisimpan){
							bootbox.alert('Data belum disimpan.');
							return;
						}
					    }
						idTrans=this.id;
						idPasien=this.className.split(' ')[0];
						mrn=this.cells[1].innerHTML;
						idEpisode=this.cells[9].innerHTML;
						idPoli=this.cells[10].innerHTML;
						idRekanan=this.cells[11].innerHTML;
						poliklinik=this.cells[14].innerHTML;
						kunjungan=this.cells[2].title;
						no_urut=this.cells[15].title;
						nama_pasien=this.cells[0].title;
						var byr=this.cells[13].innerHTML;
						if(byr=='55'){
							doneP='1_done';
							$('#pgl').attr('style','display:none;');
						}else{
							doneP='0_done';
							$('#pgl').removeAttr('style');
						}
						//doneP=this.cells[0].className.split(' ')[0];
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						pasienKet();
						ketPasienA();
						konsul=this.cells[12].innerHTML;
						$('#wPaint').wPaint('clear');
						pasienNosa(idPasien,idTrans,idEpisode);
						var content=e("tabAlergi");
						if(content)
							pasienAlergi(idPasien,"tabelAlergi");
						var content1=e("tabCatt");
						if(content1)
							pasienCatatan(idPasien);
						var content1=e("tabRencana");
						if(content1)
						    pasienRencana(idPasien);
						
						resepKe=this.cells[5].innerHTML;
						if(resepKe=="")
							resepKe=1;
						else
							resepKe=eval(resepKe)+1;
						rKe=resepKe;
						labKe=this.cells[6].innerHTML;
						if(labKe=="")
							labKe=1;
						else
							labKe=eval(labKe)+1;
						lKe=labKe;
						radKe=this.cells[7].innerHTML;
						if(radKe=="")
							radKe=1;
						else
							radKe=eval(radKe)+1;
						raKe=radKe;
						alkesKe=this.cells[8].innerHTML;
						if(alkesKe=="")
							alkesKe=1;
						else
							alkesKe=eval(alkesKe)+1;
						aKe=alkesKe;
						closeTab1();
						getTotal();
						getLink();
					}
				}
					if(h.BAYAR==55){
						tr.style.cssText="color:#009900;";
					}else if(h.JML==1 && h.RSPBLM==0){
						tr.style.cssText="color:blue;";
					}else if(h.RSPBLM!=0){
						tr.style.cssText="color:red;";
					}
						
					var med=h.INT_PASIEN_ID;	
					var nama=h.NAMA;
					
					var td = c("td", tr,h.JML+'_done',h.INT_PASIEN_ID);
				  if(h.BAYAR==55){
					if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:#009900' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else 
						td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>  </label>"+nama+"</a>"
				  }else if(h.JML==1 && h.RSPBLM==0){
					if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else 
						td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:45px;'>  </label>"+nama+"</a>"
				  }else if(h.RSPBLM!=0){
					if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else 
						td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:45px;'>  </label>"+nama+"</a>"
				  }else{
					  if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else
						td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:45px;'>  </label>"+nama+"</a>"
				  }
				  td.setAttribute('title',nama);
					
					td = c("td", tr);
					td.innerHTML=med;
					td.setAttribute('title',med);
					
					td = c("td", tr);
					var div=c('div',td,'tKanan');
					div.innerHTML=h.KUNJUNGAN;
					td.setAttribute('title',h.KUNJUNGAN);
					
					td = c("td", tr);
					td.innerHTML=h.TGL_LAHIR;
					td.setAttribute('title',h.TGL_LAHIR);				
					td = c("td", tr);
					td.innerHTML=h.KELAMIN;
					td.setAttribute('title',h.KELAMIN);
					td = c("td", tr,'hide');
					td.innerHTML=h.RESEP;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.LAB;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.RAD;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.ALKES;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.EPISODE_ID;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.DEPT_ID;
					idPoli=h.DEPT_ID;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.REKANAN_ID;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.KONSUL;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.BAYAR;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.POLI;
					td.style.display="none";
					td = c("td", tr);
					var div=c('div',td,'tKanan');
					div.innerHTML=h.URUT_DR;
					td.setAttribute('title',h.URUT_DR);
			}
			
			//pilih='#'+prod[0].TRANS_ID;
		}
		jQuery.tableNavigation();
		$('#sts_table').fixheadertable({ 
			colratio	 : [150,100,100,80,90,50],
			width:595,
			height:cHeight
		});
		var $rows = $('#sts_table tr');
		$('#kodeAwal').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('.activation').focus();
		disabledForm();
		var div1=c('div',content,'form-inline');
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:black"></span><label>Baru</label>';
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:red"></span><label>Resep Blm Terkirim</label>';
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:blue"></span><label>Selesai</label>';
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:#009900"></span><label>Closing</label>';
	}
	function awal1(prod){
		var content=e("status");
		content.innerHTML="";
		var pilih="";
		cHeight=content.offsetHeight-75;
		
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","sts_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PASIEN";
		
		th = c("th", tr);
		th.innerHTML="MRN";
		th = c("th", tr);
		th.innerHTML="KUNJUNGAN KE";
		th = c("th", tr);
		th.innerHTML="TGL.LAHIR";

		th = c("th", tr);
		th.innerHTML="JENIS KELAMIN";
		th = c("th", tr);
		th.innerHTML="URUT";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				if(h.ANAM!=h.TRANS_ID)
					continue;
				tr = c("tr", tbody,h.PASIEN_ID,h.TRANS_ID);
				tr.ondblclick=function() {
				   if(idPasien!=""){
					if(!sudahDisimpan){
						bootbox.alert('Data belum disimpan.');
						return;
					}
				   }
					idTrans=this.id;
					idPasien=this.className.split(' ')[0];
					mrn=this.cells[1].innerHTML;
					idEpisode=this.cells[9].innerHTML;
					idPoli=this.cells[10].innerHTML;
					idRekanan=this.cells[11].innerHTML;
					poliklinik=this.cells[14].innerHTML;
					kunjungan=this.cells[2].title;
					no_urut=this.cells[15].title;
					nama_pasien=this.cells[0].title;
					var byr=this.cells[13].innerHTML;
					if(byr=='55'){
						doneP='1_done';
						$('#pgl').attr('style','display:none;');
					}else{
						doneP='0_done';
						$('#pgl').removeAttr('style');
					}
						//doneP=this.cells[0].className.split(' ')[0];
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					konsul=this.cells[12].innerHTML;
					pasienKet();
					ketPasienA();
					pasienNosa(idPasien,idTrans,idEpisode);
					$('#wPaint').wPaint('clear');
					var content=e("tabAlergi");
					if(content)
						pasienAlergi(idPasien,"tabelAlergi");
					var content1=e("tabCatt");
					if(content1)
						pasienCatatan(idPasien);
					var content2=e("tabRencana");
					if(content2)
					    pasienRencana(idPasien);
					
					resepKe=this.cells[5].innerHTML;
					if(resepKe=="")
						resepKe=1;
					else
						resepKe=eval(resepKe)+1;
					rKe=resepKe;
					labKe=this.cells[6].innerHTML;
					if(labKe=="")
						labKe=1;
					else
						labKe=eval(labKe)+1;
					lKe=labKe;
					radKe=this.cells[7].innerHTML;
					if(radKe=="")
						radKe=1;
					else
						radKe=eval(radKe)+1;
					raKe=radKe;
					alkesKe=this.cells[8].innerHTML;
					if(alkesKe=="")
						alkesKe=1;
					else
						alkesKe=eval(alkesKe)+1;
					aKe=alkesKe;
					closeTab1();
					getTotal();
					getLink();
				}
				tr.onkeydown=function(event) {
					if(event.keyCode==13){
					    if(idPasien!=""){
						if(!sudahDisimpan){
							bootbox.alert('Data belum disimpan.');
							return;
						}
					    }
						idTrans=this.id;
						idPasien=this.className.split(' ')[0];
						mrn=this.cells[1].innerHTML;
						idEpisode=this.cells[9].innerHTML;
						idPoli=this.cells[10].innerHTML;
						idRekanan=this.cells[11].innerHTML;
						poliklinik=this.cells[14].innerHTML;
						kunjungan=this.cells[2].title;
						var byr=this.cells[13].innerHTML;
						no_urut=this.cells[15].title;
						nama_pasien=this.cells[0].title;
						var byr=this.cells[13].innerHTML;
						if(byr=='55'){
							doneP='1_done';
							$('#pgl').attr('style','display:none;');
						}else{
							doneP='0_done';
							$('#pgl').removeAttr('style');
						}
						//doneP=this.cells[0].className.split(' ')[0];
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						pasienKet();
						ketPasienA();
						konsul=this.cells[12].innerHTML;
						$('#wPaint').wPaint('clear');
						pasienNosa(idPasien,idTrans,idEpisode);
						var content=e("tabAlergi");
						if(content)
							pasienAlergi(idPasien,"tabelAlergi");
						var content1=e("tabCatt");
						if(content1)
							pasienCatatan(idPasien);
						var content2=e("tabRencana");
						if(content2)
						    pasienRencana(idPasien);
						
						resepKe=this.cells[5].innerHTML;
						if(resepKe=="")
							resepKe=1;
						else
							resepKe=eval(resepKe)+1;
						rKe=resepKe;
						labKe=this.cells[6].innerHTML;
						if(labKe=="")
							labKe=1;
						else
							labKe=eval(labKe)+1;
						lKe=labKe;
						radKe=this.cells[7].innerHTML;
						if(radKe=="")
							radKe=1;
						else
							radKe=eval(radKe)+1;
						raKe=radKe;
						alkesKe=this.cells[8].innerHTML;
						if(alkesKe=="")
							alkesKe=1;
						else
							alkesKe=eval(alkesKe)+1;
						aKe=alkesKe;
						closeTab1();
						getTotal();
						getLink();
					}
				}
					if(h.BAYAR==55){
						tr.style.cssText="color:#009900;";
					}else if(h.JML==1 && h.RSPBLM==0){
						tr.style.cssText="color:blue;";
					}else if(h.RSPBLM!=0){
						tr.style.cssText="color:red;";
					}
						
					var med=h.INT_PASIEN_ID;	
					var nama=h.NAMA;
					
					var td = c("td", tr,h.JML+'_done',h.INT_PASIEN_ID);
				  if(h.BAYAR==55){
					if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:#009900' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else 
						td.innerHTML="<a class='activation' style='color:#009900;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>  </label>"+nama+"</a>"
				  }else if(h.JML==1 && h.RSPBLM==0){
					if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else 
						td.innerHTML="<a class='activation' style='color:blue;' href=javascript:myClick()><label style='color:green;float:left; width:45px;'>  </label>"+nama+"</a>"
				  }else if(h.RSPBLM!=0){
					if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else 
						td.innerHTML="<a class='activation' style='color:red;' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>  </label>"+nama+"</a>"
				  }else{
					  if(h.SAMPEL!=0 && h.SAMPELRAD!=0){
						if(h.DONE!=0 && h.BELUM==0 && h.DONERAD!=null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  R  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0) && h.DONERAD==null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  R  </label>"+nama+"</a>";
					}else if(h.SAMPEL!=0){
						if(h.DONE!=0 && h.BELUM==0)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>L  </label>"+nama+"</a>";
						else if ((h.DONE!=0 && h.BELUM!=0) ||(h.DONE==0 && h.BELUM!=0))
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>L  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation'  href=javascript:myClick()><label style='color:black;float:left; width:30px;'>L  </label>"+nama+"</a>";
					}else if(h.SAMPELRAD!=0){
						if(h.DONERAD!=null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:blue;float:left;width:30px;'>R  </label>"+nama+"</a>";
						else if (h.DONERAD==null)
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>R  </label>"+nama+"</a>";
						else
							td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:black;float:left; width:30px;'>R  </label>"+nama+"</a>";
					}else
						td.innerHTML="<a class='activation' href=javascript:myClick()><label style='color:green;float:left; width:30px;'>  </label>"+nama+"</a>"
				  }
				  td.setAttribute('title',nama);
					
					td = c("td", tr);
					td.innerHTML=med;
					td.setAttribute('title',med);
					td = c("td", tr);
					var div=c('div',td,'tKanan');
					div.innerHTML=h.KUNJUNGAN;
					td.setAttribute('title',h.KUNJUNGAN);
					td = c("td", tr);
					td.innerHTML=h.TGL_LAHIR;
					td.setAttribute('title',h.TGL_LAHIR);				
					td = c("td", tr);
					td.innerHTML=h.KELAMIN;
					td.setAttribute('title',h.KELAMIN);
					td = c("td", tr,'hide');
					td.innerHTML=h.RESEP;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.LAB;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.RAD;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.ALKES;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.EPISODE_ID;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.DEPT_ID;
					idPoli=h.DEPT_ID;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.REKANAN_ID;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.KONSUL;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.BAYAR;
					td.style.display="none";
					td = c("td", tr,'hide');
					td.innerHTML=h.POLI;
					td.style.display="none";
					td = c("td", tr);
					var div=c('div',td,'tKanan');
					div.innerHTML=h.URUT_DR;
					td.setAttribute('title',h.URUT_DR);
			}
			
			//pilih='#'+prod[0].TRANS_ID;
		}
		jQuery.tableNavigation();
		$('#sts_table').fixheadertable({ 
			colratio	 : [150,100,100,80,90,50],
			width:595,
			height:cHeight
		});
		var $rows = $('#sts_table tr');
		$('#kodeAwal').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		if(idTrans!=""){
			$('#'+idTrans).closest('table').find('td').removeAttr("style");			
			$('#'+idTrans).children("td").css("background","#C0C0C0");
		}else
			$('.activation').focus();
		var div1=c('div',content,'form-inline');
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:black"></span><label>Baru</label>';
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:red"></span><label>Resep Blm Terkirim</label>';
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:blue"></span><label>Selesai</label>';
		var div2=c('div',div1,'form-group');
		div2.innerHTML='<span class="icon-box btn btn-xs form-control" style="background:#009900"></span><label>Closing</label>';

	}
	function statusPasien(){
	
		var content=e("tab2");
		content.innerHTML="";
		
		cHeight= content.offsetHeight;
		cWidth= content.offsetWidth;
		
		var div=c("div",content,"title","stsTitle");
		div.innerHTML="Status Pasien";
		
		div=c("div",content,null,"ketPasien");
		var table=c("table",div);
		
		var tr=c("tr",table);
		
		var td=c("td",tr);
		td.innerHTML="No Medrec";
		td.style.width="150px";
		
		td=c("td",tr);
		td.innerHTML="__________________";
		td.style.width="300px";
		
		td=c("td",tr);
		td.innerHTML="Jenis Kelamin";
		td.style.width="150px";
		td=c("td",tr);
		td.innerHTML="__________________";
		td.style.width="200px";

		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Nama";
		td=c("td",tr);
		td.innerHTML="__________________";
		
		td=c("td",tr);
		td.innerHTML="Penjamin";
		td=c("td",tr);
		td.innerHTML="__________________";
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Tgl. Lahir";
		td=c("td",tr);
		td.innerHTML="__________________";
		
		div=c("div",content,"title");
		div.innerHTML="Pemeriksaan";
		
		div=c("div",content,"col-sm-8","periksa");
		div.style.height=(bodyHeight-191)+"px";
		var periksaHeight=(bodyHeight-153)/12;
		
		var form =c("form",div,"form-horizontal","form1");
		form.setAttribute("role","form");
		
		div=c("div",form,"form-group form-group-sm");
		var label=c("label",div,"col-sm-3");
		label.innerHTML="Dokter :";
		label=c("label",div,"col-sm-4",'dokterN');
		label.innerHTML=user;
		var label=c("label",div,"col-sm-4");
		//div=c("div",form,"form-group form-group-sm");
		button=c('button',label,'btn btn-xs btn-primary','cSoap');
		button.setAttribute('type','button');
		button.innerHTML='Clear Soap';
		button.onclick=function(){
			e("S").value="";
			e("S2").value="";
			e("S3").value="";
			e("O").value="";
			e("A").value="";
			e("P").value="";
			$('#S').focus();
		}
		div=c("div",form,"form-group form-group-sm");
		var label=c("label",div,"col-sm-3");
		label.innerHTML="Waktu :";
		label=c("label",div,"col-sm-3",'soapTime');
		var tanggal = new Date();  
        	var wa=addZero(tanggal.getDate())+"-"+addZero((tanggal.getMonth()+1))+"-"+addZero(tanggal.getFullYear())+" "+ addZero(tanggal.getHours())+":"+addZero(tanggal.getMinutes())+":"+addZero(tanggal.getSeconds()); 
		label.innerHTML=wa;
		var label=c("label",div,"col-sm-2");
		button=c('button',label,'btn btn-xs btn-primary','pgl');			
		button.setAttribute('type','button');
		button.innerHTML='Panggil';
		button.onclick=function(){
			insertDisplay();
		}
		$('#pgl').attr('style','display:none;');
		var label=c("label",div,"col-sm-3");
		button=c('button',label,'btn btn-xs btn-primary','mlp');
		button.setAttribute('type','button');
		button.innerHTML='Mulai Periksa';
		button.onclick=function(){
			insertMulaiPeriksa();
		}
		div=c("div",form,"form-group form-group-sm");
		var label=c("label",div,"col-sm-1 bigFont",'labelS');
		label.innerHTML="S";
		label.style.height=periksaHeight+'px';
		label=c("label",div,"col-sm-2 need",'labelS1');
		label.innerHTML="Keluhan Utama";
		var div1=c("div",div,"col-sm-8");
		var input =c("textarea",div1,"form-control","S");
		input.setAttribute("required","required");
		input.setAttribute('tabindex',1);
		input.style.height=periksaHeight+"px";
		input.setAttribute("name","S");
		
		div=c("div",form,"form-group form-group-sm",'divS2');
		var label=c("label",div,"col-sm-1 bigFont");
		label.innerHTML="";
		label=c("label",div,"col-sm-2 need");
		label.innerHTML="Riwayat Penyakit Sekarang";
		div1=c("div",div,"col-sm-8");
		input =c("textarea",div1,"form-control","S2");
		input.setAttribute("required","required");
		input.setAttribute('tabindex',2);
		input.style.height=periksaHeight+"px";
		input.setAttribute("name","S2");
		
		div=c("div",form,"form-group form-group-sm",'divS3');
		var label=c("label",div,"col-sm-1 bigFont");
		label.innerHTML="";
		label=c("label",div,"col-sm-2 need");
		label.innerHTML="Riwayat Penyakit Dahulu";
		div1=c("div",div,"col-sm-8");
		input =c("textarea",div1,"form-control","S3");
		input.setAttribute('tabindex',3);
		input.setAttribute("required","required");
		input.style.height=periksaHeight+"px";
		input.setAttribute("name","S3");
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-3");
		label.innerHTML="";
		var tabel=c('table',div,'col-sm-8','ketPas');
		var tr=c('tr',tabel);
		var td=c('td',tr);
		td.setAttribute('colspan',2);
		td.innerHTML="Perawat";
		td.style.cssText='text-align:center; font-weight:bold';
		td=c('td',tr);
		td.setAttribute('colspan',2);
		td.innerHTML="Dokter";
		td.style.cssText='text-align:center; font-Weight:bold';
		
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="Tekanan Darah :";
		td.style.width='100px';
		td=c('td',tr);
		td.innerHTML="";
		td.style.width='100px';
		
		td=c('td',tr);
		td.innerHTML="Tekanan Darah :";
		td.style.width='100px';
		td=c('td',tr);
		td.innerHTML="";
		td.style.width='100px';
		
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="Frekuensi Nadi :";
		td=c('td',tr);
		td.innerHTML="";
		td=c('td',tr);
		td.innerHTML="Frekuensi Nadi :";
		td=c('td',tr);
		td.innerHTML="";
		
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="Suhu :";
		td=c('td',tr);
		td.innerHTML="";
		td=c('td',tr);
		td.innerHTML="Suhu :";
		td=c('td',tr);
		td.innerHTML="";
		
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="Irama Nafas :";
		td=c('td',tr);
		td.innerHTML="";
		td=c('td',tr);
		td.innerHTML="Irama Nafas :";
		td=c('td',tr);
		td.innerHTML="";
		
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="Berat Badan :";
		td=c('td',tr);
		td.innerHTML="";
		td=c('td',tr);
		td.innerHTML="Berat Badan :";
		td=c('td',tr);
		td.innerHTML="";
		
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="Tinggi Badan :";
		td=c('td',tr);
		td.innerHTML="";
		td=c('td',tr);
		td.innerHTML="Tinggi Badan :";
		td=c('td',tr);
		td.innerHTML="";
				
		tr=c('tr',tabel);
		td=c('td',tr);
		td.innerHTML="IMT :";
		td=c('td',tr);
		td.innerHTML="";
		td=c('td',tr);
		td.innerHTML="IMT :";
		td=c('td',tr);
		td.innerHTML="";
		
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-3 bigFont");
		label.innerHTML="O";
		
		div1=c("div",div,"col-sm-8");
		input =c("textarea",div1,"form-control","O");
		input.setAttribute("required","required");
		input.setAttribute('tabindex',4);
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","O");	
		var button=c('button',div1,null,'tempButton');
		button.setAttribute('type','button');
		button.innerHTML='Template';
		button.onclick=function(){
			addTempModal();
		}
		var button=c('button',div1,null,'imgButton');
		button.setAttribute('type','button');
		button.innerHTML='Status Lokalis';
		button.onclick=function(){
			imageLokalis();
		}
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-3");
		div1=c("div",div,"col-sm-8","imgTable");
		div=c("div",form,"form-group form-group-sm");
		
		label=c("label",div,"col-sm-3 bigFont");
		label.innerHTML="A";
		div1=c("div",div,"col-sm-8");
		input =c("textarea",div1,"form-control","A");
		input.setAttribute('tabindex',5);
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","A");
		
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-3 bigFont");
		label.innerHTML="P";
		div=c("div",div,"col-sm-8");
		input =c("textarea",div,"form-control","P");
		input.setAttribute('tabindex',6);
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","P");	
		


		div1=c("div",div,"col-sm-8");
		var button=c('button',div1,null,'tempButton');
		button.setAttribute('type','button');
		button.innerHTML='Resep';
		button.onclick=function(){
			imageLokalis11();		
		}
		
		

		div=c("div",form,"form-group form-group-sm");
		var button=c('button',div,null,'addBS');
		button.setAttribute('type','button');
		button.innerHTML='Simpan SOAP';
		button.setAttribute('tabindex',7);	
		
		


		button=c('button',div,null,'prevB');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		
		button=c('button',div,null,'nextB');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.setAttribute('tabindex',8);	
		$('#prevB').attr('style','display:none;');
		$('#nextB').attr('style','display:none;');
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"title1 col-sm-12");
		div1.innerHTML="ICD 10";
		div1.style.margin='5px 0';
		label=c("label",div,"col-sm-8 need","l1");
		label.innerHTML="ICD 10 Utama";
		
		div=c("div",form,"form-group form-group-sm");
		var div1=c("div",div,"col-sm-8","dd1");
		input =c("input",div1,null,"k1");
		input.setAttribute("type","text");
		input.style.display='none';
		input =c("input",div1,"form-control","d1");
		input.setAttribute('tabindex',8);
		input.setAttribute("type","text");
		input.setAttribute("required","required");
		input.setAttribute("name","d1");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","i1");
		input.setAttribute('tabindex',9);
		input.setAttribute("type","text");
		input.setAttribute("required","required");
		input.setAttribute("name","i1");
				
		div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf1');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',9);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#i1').attr('style','display:none');
				$('#d1').unbind('keydown');
				this.innerHTML='ICD 10';
				e('d1').value="";
				e('i1').value="";
				e('k1').value="";
				$('#d1').focus();
				$('#dd1').attr('class','col-xs-10');
			}else{
				$('#i1').removeAttr('style');
				$('#i1').attr('style','display:block');
				this.innerHTML='Free Text';
				e('d1').value="";
				$('#d1').focus();
				$('#dd1').attr('class','col-sm-8')
				$('#d1').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICD(diagnosa,'1',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#d1').focus(),10});
							});
						}
					}
				
				});
			}
		}
				
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-8","l2");
		label.innerHTML="ICD 10";
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-8","dd2");
		input =c("input",div1,null,"k2");
		input.setAttribute("type","text");
		input.style.display='none';
		input =c("input",div1,"form-control","d2");
		input.setAttribute('tabindex',10);
		input.setAttribute("type","text");
		input.setAttribute("name","d2");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","i2");
		input.setAttribute('tabindex',11);
		input.setAttribute("type","text");
		input.setAttribute("name","i2");
		
		div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf2');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',11);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#i2').attr('style','display:none');
				$('#d2').unbind('keydown');
				
				$('#d2').keydown(function(event){
					if(event.keyCode==13){
						var diagnosa=e('d2').value;
						if(diagnosa.length==0){
							bootbox.alert('Masukkan Data Diagnosa!');
							return;
						}
						var dia=[];
						dia[0]="";
						dia[1]="";
						dia[2]=diagnosa;
						dia[3]='new';
						dia[4]=idEpisode+diag.length;
						diag.push(dia);
						table_diag();
						e('d2').value="";
						e('i2').value="";
						$("#d2").focus();
						
					}
					
				});
				this.innerHTML='ICD 10';
				e('d2').value="";
				e('i2').value="";
				e('k2').value="";
				$("#d2").focus();
				$('#dd2').attr('class','col-xs-10');
			}else{
				$('#i2').removeAttr('style');
				$('#i2').attr('style','display:block');
				this.innerHTML='Free Text';
				e('d2').value="";
				$('#dd2').attr('class','col-sm-8');
				$("#d2").focus();
				$('#d2').unbind('keydown');
				$('#d2').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICD(diagnosa,'2',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#d2').focus(),10});
							});
						}
					}
				
				});
			}
		}
			
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-11","diagTable");
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"title1 col-sm-12");
		div1.innerHTML="ICD 9 CM";
		div1.style.margin='5px 0';
		label=c("label",div,"col-sm-8");
		label.innerHTML="ICD 9 CM Utama";	
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-8","dd9");
		input =c("input",div1,null,"k9");
		input.setAttribute("type","text");
		input.style.display='none';
		input =c("input",div1,"form-control","d9");
		input.setAttribute('tabindex',12);
		input.setAttribute("type","text");
		input.setAttribute("name","d9");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","i9");
		input.setAttribute('tabindex',13);
		input.setAttribute("type","text");
		input.setAttribute("name","i9");
		
		div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf3');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',13);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#i9').attr('style','display:none');
				$('#d9').unbind('keydown');
				this.innerHTML='ICD 9 CM';
				e('d9').value="";
				e('i9').value="";
				e('k9').value="";
				$('#d9').focus();
				$('#dd9').attr('class','col-xs-10');
			}else{
				$('#i9').removeAttr('style');
				$('#i9').attr('style','display:block');
				this.innerHTML='Free Text';
				e('d9').value="";
				$('#d9').focus();
				$('#dd9').attr('class','col-sm-8')
				$('#d9').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICDCM(diagnosa,'1',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#d9').focus(),10});
							});
						}
					}
				
				});
			}
		}
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-8");
		label.innerHTML="ICD 9 CM";
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-8",'tin9');
		input =c("input",div1,"form-control","tindak");
		input.setAttribute('tabindex',14);
		input.setAttribute("type","text");
		input.setAttribute("name","tindak");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","tindakICD");
		input.setAttribute('tabindex',15);
		input.setAttribute("type","text");
		input.setAttribute("name","tindakICD");
		
		div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf4');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',15);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#tindakICD').attr('style','display:none');
				$('#tindak').unbind('keydown');
				
				$('#tindak').keydown(function(event){
					if(event.keyCode==13){
						var diagnosa=e('tindak').value;
						if(diagnosa.length==0){
							bootbox.alert('Masukkan Data ICD 9!');
							return;
						}
						var dia=[];
						dia[0]="";
						dia[1]="";
						dia[2]=diagnosa;
						dia[3]='new';
						dia[4]=idEpisode+tindak.length;
						tindak.push(dia);
						table_tindak();
						e('tindak').value="";
						e('tindakICD').value="";
						$("#tindak").focus();
						
					}
					
				});
				this.innerHTML='ICD 9 CM';
				e('tindak').value="";
				$("#tindak").focus();
				$('#tin9').attr('class','col-xs-10');
			}else{
				$('#tindakICD').removeAttr('style');
				$('#tindakICD').attr('style','display:block');
				this.innerHTML='Free Text';
				e('tindak').value="";
				e('tindakICD').value="";
				$('#tin9').attr('class','col-sm-8');
				$("#tindak").focus();
				$('#tindak').unbind('keydown');
				$('#tindak').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICDCM(diagnosa,'2',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#tindak').focus(),10});
							});
						}
					}
				
				});
			}
		}
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-11","tindakTable");
		
		var periksa=e("periksa");
		pHeight=periksa.offsetHeight;
		var isi=c("div",content,"col-sm-4","isi");
		isi.style.height=pHeight+"px";
		
		var form =c("form",isi,"form-horizontal","form3");
		form.setAttribute("role","form");
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"title1 col-sm-12");
		div1.innerHTML="Perkiraan Harga";
		div1.style.margin='5px 0';
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-11","tabelTotal");
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-11","totalByr");
		
		div=c("div",isi,"tabsAlCat");
		var ul=c("ul",div,"nav nav-tabs");
		var li=c("li",ul,"active","alergiLi");
		li.innerHTML="<a href='#alergi-vr' data-toggle='tab'>Alergi</a>";
		li=c("li",ul,null,"cattLi");	
		li.innerHTML="<a href='#catatan-vr' data-toggle='tab'>Catatan</a>";
		li=c("li",ul,null,"renLi");	
		li.innerHTML="<a href='#Rencana-vr' data-toggle='tab'>Tindak Lanjut</a>";
		
		div1=c("div",isi,"tab-content");
		div1.style.cssText='border-bottom:1px solid #ccc';
		div=c("div",div1,"tab-pane active","alergi-vr");
		div=c("div",div1,"tab-pane","catatan-vr");
		div=c("div",div1,"tab-pane","Rencana-vr");
		
		var form =c("form",isi,"form-horizontal","form2");
		form.setAttribute("role","form");
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-9");
		label.innerHTML="Riwayat Sakit Keluarga";
		div1=c("div",div,"col-sm-11");
		input =c("textarea",div1,"form-control","sakel");
		input.setAttribute('tabindex',16);
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","sakel");
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-9");
		label.innerHTML="Riwayat Alergi Keluarga";
		div1=c("div",div,"col-sm-11");
		input =c("textarea",div1,"form-control","alkel");
		input.setAttribute('tabindex',16);
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","alkel");
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-9");
		label.innerHTML="Komplikasi";
		
		div1=c("div",div,"col-sm-11");
		input =c("textarea",div1,"form-control","komplikasi");
		input.setAttribute('tabindex',16);
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","komplikasi");
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-9");
		label.innerHTML="Edukasi";
		
		div1=c("div",div,"col-sm-11");
		input =c("textarea",div1,"form-control","edukasi");
		input.setAttribute('tabindex',17);
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","edukasi");
		
		/*div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-9");
		label.innerHTML="Dirujuk /Konsul ke";
		div1=c("div",div,"col-sm-11");
		input =c("textarea",div1,"form-control","rujuk");
		input.setAttribute("required","required");
		input.style.height=1.5*periksaHeight+"px";
		input.setAttribute("name","rujuk");*/
		
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-3");
		label.innerHTML="Status Gizi";
		div1=c("div",div,"col-sm-8");
		var select =c("select",div1,"form-control","gizi");
		select.setAttribute('tabindex',17);
		var option=c('option',select)
		option.value='02';
		option.innerHTML='Gizi Cukup';
		
		option=c('option',select)
		option.value='01';
		option.innerHTML='Gizi Kurang / Buruk';
	
		option=c('option',select)
		option.value='03';
		option.innerHTML='Gizi Lebih';
		
		//alergi();
		$("#alergiLi").click(function(){
			alergi();
		});
		$("#cattLi").click(function(){
			catatan();
		});
		$("#renLi").click(function(){
			rencana();
		});
		buttonICD();
		textHeight('S');textHeight('S2');textHeight('S3');textHeight('O');textHeight('A');textHeight('P');textHeight('komplikasi');textHeight('edukasi');
		textHeight('alkel');textHeight('sakel');
		$("#tindak").keydown(function(event){
			if(event.keyCode==13){
				var tindak=this.value.trim();
				if(tindak.length>=1){
					$("#icdModal").modal('show');
					selectICDCM(tindak);
				}else
					bootbox.alert('Masukkan min 1 Karakter!');
			}
		});
		$("#tindakICD").keydown(function(event){
			if(event.keyCode==13){
				var kode=this.value.trim();
				if(kode>=1){
					$("#icdModal").modal('show');
					selectICDCM2(kode);
				}else
					bootbox.alert('Masukkan min 1 Karakter!');
			}
		});
		buttonSOAP();
	}
	
	$(document).on('keyup keypress', 'form input[type="text"]', function(e) {
	  if(e.keyCode == 13) {
		e.preventDefault();
		return false;
	  }
	});
	var kc=[9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
	$(document).on('keyup keypress', function(evt) {
		if(kc.inArray(evt.keyCode)){
			
		}else
			sudahDisimpan=false;
		evt = evt || window.event;
		var target = evt.target || evt.srcElement;

		if (evt.keyCode == 8 && !/input|textarea/i.test(target.nodeName)) {
			return false;
		}
	});
	Array.prototype.inArray=function(value){
		for(var i=0;i<this.length;i++){
			if(this[i] === value)
				return true;
		}
		return false;
	};
	function buttonSOAP(){
		$('#nextB').attr('disabled',true);
		$('#prevB').attr('disabled',true);
		$('#addBS').click(function(){
			var s,s2,s3,o,a,p;
			s=e("S").value;
			if(s==""||s==null){
				bootbox.alert('Silakan Isi Keluhan Utama!',function(){
					setTimeout(function(){$("#S").focus();},10);
				});
				return ;
			}
			if(kunjungan==1){
				s2=e("S2").value;
				if(s2==""||s2==null){
					bootbox.alert('Silakan Isi Riwayat Penyakit Sekarang!',function(){
						setTimeout(function(){$("#S2").focus();},10);
					});
					return ;
				}
				s3=e("S3").value;
				if(s3==""||s3==null){
					bootbox.alert('Silakan Isi Riwayat Penyakit Dahulu!',function(){
						setTimeout(function(){$("#S3").focus();},10);
					});
					return ;
				}
			}else{
				s2="";
				s3="";
			}
			o=e("O").value;
			if(o==""||o==null){
				bootbox.alert('Silakan Isi O!',function(){
					setTimeout(function(){$("#O").focus();},10);
				});
				return ;
			}
			a=e("A").value;
			if(a==""||a==null){
				bootbox.alert('Silakan Isi A!',function(){
					setTimeout(function(){$("#A").focus();},10);
				});
				return ;
			}
			p=e("P").value;
			if(p==""||p==null){
				bootbox.alert('Silakan Isi P!',function(){
					setTimeout(function(){$("#P").focus();},10);
				});
				return ;
			}
			var nosa=[];
			nosa[0]=s;
			nosa[1]=s2;
			nosa[2]=s3;
			nosa[3]=o;
			nosa[4]=a;
			nosa[5]=p;
			nosa[6]='new';
			nosa[7]=user;
			nosa[8]=e('time').innerHTML;
			soap.push(nosa);
			soapKe=soap.length-1;
			showLoader();
			if(soap.length==1){
				insertNosa();
			}else{
				var h=soap[soapKe];
				if(h[6]=='new'){
					insertSOAP1(h[0],h[1],h[2],h[3],h[4],h[5],soapKe,h[8]);
					bootbox.alert('Data Pemeriksaan Sudah Tersimpan!');
				}
				sudahDisimpan=true;
			}
			autoSize("S");autoSize("S2");autoSize("S3");
			autoSize("O");autoSize("A");autoSize("P");
			/*$('#form1 textarea').attr('disabled',true);
			$('#tempButton').attr('disabled',true);
			$('#addBS').attr('disabled',true);
			$('#cSoap').attr('disabled',true);*/
			$('#nextB').removeAttr('disabled');
			e('nextB').innerHTML='Tambah SOAP';
			e('nextB').setAttribute('tabindex','7');
			$('#d1').focus();
		});
		$('#prevB').click(function(){
			soapKe--;
			var length=soap.length;
			$('#cSoap').attr('disabled',true);
			if(soapKe==length-1)
				e('nextB').innerHTML='Tambah SOAP';
			else
				e('nextB').innerHTML='>>';
			if(soapKe<=0){
				$('#prevB').attr('disabled',true);
				var h=soap[0];
				e("S").value=h[0];
				e("S2").value=h[1];
				e("S3").value=h[2];
				e("O").value=h[3];
				e("A").value=h[4];
				e("P").value=h[5];
				e('dokterN').innerHTML=h[7];
				e('soapTime').innerHTML=h[8];
				autoSize("S");autoSize("S2");autoSize("S3");
				autoSize("O");autoSize("A");autoSize("P");
			}else{
				$('#prevB').removeAttr('disabled');
				var h=soap[soapKe];
				e("S").value=h[0];
				e("S2").value=h[1];
				e("S3").value=h[2];
				e("O").value=h[3];
				e("A").value=h[4];
				e("P").value=h[5];
				e('dokterN').innerHTML=h[7];
				e('soapTime').innerHTML=h[8];
				autoSize("S");autoSize("S2");autoSize("S3");
				autoSize("O");autoSize("A");autoSize("P");
			}
			$('#tempButton').attr('disabled',true);
			$('#addBS').attr('disabled',true);
			$('#nextB').removeAttr('disabled');
			
			$('#form1 textarea').attr('disabled',true);
		});
		$('#nextB').click(function(){
			var length=soap.length;
			soapKe++;
			if(doneP=='1_done'){
				if(soapKe==length-1)
					$('#nextB').attr('disabled',true);
				else
					$('#nextB').removeAttr('disabled');
				var h=soap[soapKe];
				e("S").value=h[0];
				e("S2").value=h[1];
				e("S3").value=h[2];
				e("O").value=h[3];
				e("A").value=h[4];
				e("P").value=h[5];
				e("dokterN").innerHTML=h[7];
				e('soapTime').innerHTML=h[8];
				autoSize("S");autoSize("S2");autoSize("S3");
				autoSize("O");autoSize("A");autoSize("P");
				e('dokterN').innerHTML=h[7];
			}else{
				if(soapKe>=length){
					$('#nextB').attr('disabled',true);
					$('#tempButton').removeAttr('disabled');
					$('#cSoap').removeAttr('disabled');
					$('#addBS').removeAttr('disabled');
					var le=soap.length-1;
					var h=soap[le];
					e("S").value=h[0];
					e("S2").value=h[1];
					e("S3").value=h[2];
					e("O").value=h[3];
					e("A").value=h[4];
					e("P").value=h[5];
					autoSize("S");autoSize("S2");autoSize("S3");
					autoSize("O");autoSize("A");autoSize("P");
					e('dokterN').innerHTML=user;
					e('soapTime').innerHTML=e('time').innerHTML;
					$('#form1 textarea').removeAttr('disabled');
					$('#S').focus();
				}else{
					if(soapKe==length-1)
						e('nextB').innerHTML='Tambah SOAP';
					else
						e('nextB').innerHTML='>>';
					$('#addBS').attr('disabled',true);
					$('#nextB').removeAttr('disabled');
					$('#tempButton').attr('disabled',true);
					var h=soap[soapKe];
					e("S").value=h[0];
					e("S2").value=h[1];
					e("S3").value=h[2];
					e("O").value=h[3];
					e("A").value=h[4];
					e("P").value=h[5];
					autoSize("S");autoSize("S2");autoSize("S3");
					autoSize("O");autoSize("A");autoSize("P");
					e('dokterN').innerHTML=h[7];
					e('soapTime').innerHTML=h[8];
				}
			}
			$('#prevB').removeAttr('disabled');
		});
	}
	function SOAP1(){
		/*$('#addBS').attr('disabled',true);
		$('#nextB').removeAttr('disabled');
		
		
		if(soapKe==length-1)
			e('nextB').innerHTML='Tambah SOAP';
		else
			e('nextB').innerHTML='>>';
		if((length-1)==0)
			$('#prevB').attr('disabled',true);
		else
			$('#prevB').removeAttr('disabled');
		if(doneP=='1_done'){
			if(soapKe==length-1)
				$('#nextB').attr('disabled',true);
			else
				$('#nextB').removeAttr('disabled');
			$('#tempButton').attr('disabled',true);
			$('#form1 textarea').attr('disabled',true);
		$('#konsul1').removeAttr('disabled');
		}*/var length=soap.length;
			var h=soap[length-1];
			e("S").value=h[0];
			e("S2").value=h[1];
			e("S3").value=h[2];
			e("O").value=h[3];
			e("A").value=h[4];
			e("P").value=h[5];
			autoSize("S");autoSize("S2");autoSize("S3");
			autoSize("O");autoSize("A");autoSize("P");
			e('dokterN').innerHTML=h[7];
			e('soapTime').innerHTML=h[8];
			$('#cSoap').removeAttr('disabled');
		
	}
	function textHeight(num){
		$("#"+num).keydown(function(event){
			if(event.keyCode==13){
				var kode=this.id;
				autoSize(kode);
				var r=this.offsetHeight;
				r=eval(r)+18;
				e(kode).style.height=r+'px';
			}
		});
	}
	function autoSize(num){
		e(num).style.height = "50px"; 
		var valheight=e(num).scrollHeight;
		valheight=eval(valheight)+10;
        e(num).style.height = valheight+ "px"; 
	}
	function buttonICD(){
		$("#d1").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var diagnosa=this.value.trim();
				if(diagnosa.length>=1){
					$("#icdModal").modal('show');
					selectICD(diagnosa,'1',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#d1').focus(),10});
					});
				}
			}
		});
		$("#d1").hover(function(event){
			var diagnosa=this.value.trim();
			this.title=diagnosa;
		});
		$("#i1").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var kode=this.value.trim();
				if(kode.length>=1){
					$("#icdModal").modal('show');
					selectICD2(kode,'1',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#i1').focus(),10});
					});
				
			}
		});
		$("#d2").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var diagnosa=this.value.trim();
				if(diagnosa.length>=1){
					$("#icdModal").modal('show');
					selectICD(diagnosa,'2',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#d2').focus(),10});
					});
				}
			}
		});
		$("#i2").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var kode=this.value.trim();
				if(kode.length>=1){
					$("#icdModal").modal('show');
					selectICD2(kode,'2',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#i2').focus(),10});
					});
				
			}
		});
		$("#d9").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var tin=this.value.trim();
				if(tin.length>=1){
					$("#icdModal").modal('show');
					selectICDCM(tin,'1',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!');
			}
		});
		$("#i9").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var kode=this.value.trim();
				if(kode.length>=1){
					$("#icdModal").modal('show');
					selectICDCM2(kode,'1',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!');
			}
		});
		$("#tindak").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var tin=this.value.trim();
				if(tin.length>=1){
					$("#icdModal").modal('show');
					selectICDCM(tin,'2',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!');
			}
		});
		$("#tindakICD").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var tin=this.value.trim();
				if(tin.length>=1){
					$("#icdModal").modal('show');
					selectICDCM2(tin,'2',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!');
			}
		});
	}
	var tindak=[],diag=[];
	function tabelICD(prod,num){
		var content=e("icdBody");
		content.innerHTML="";	
		var pilih="";
		var label=c("label",content);
		label.innerHTML="Cari Diagnosa";
		label.style.cssText="margin:5px";
		var input=c("input",content,null,"kdDiagnosa");
		input.setAttribute("type","text");
		input.value="";
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped navigateable","icd_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		
		var th = c("th", tr);
		th.innerHTML="DIAGNOSA";
		
		th = c("th", tr);
		th.innerHTML="ICD 10";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.KODE);
				tr.ondblclick=function(){
					if(num=='1'){
						e("k1").value=this.id;
						e("d1").value=this.cells[0].id;
						e("i1").value=this.cells[1].innerHTML;
						$("#icdModal").modal('hide');
						$("#d2").focus();
					}else if (num=='2'){
						var dia=[];
						dia[0]=this.id;
						dia[1]=this.cells[1].innerHTML;
						dia[2]=this.cells[0].id;
						dia[3]='new';
						dia[4]=idEpisode+diag.length;
						diag.push(dia);
						table_diag();
						e('d2').value="";
						e('i2').value="";
						$("#icdModal").modal('hide');
						$("#d2").focus();
					}else if(num=='3'){
						e("pk1").value=this.id;
						e("pd1").value=this.cells[0].id;
						e("pi1").value=this.cells[1].innerHTML;
						var dia=[];
						dia[0]=idPPK;
						dia[1]=this.id;
						dia[2]=this.cells[1].innerHTML;
						dia[3]=this.cells[0].id;
						dia[4]='1';
						dia[5]=true;
						diag1.push(dia);
						table_diag1();
						$("#icdModal").modal('hide');
						$("#pd2").focus();
					}else if (num=='4'){
						var dia=[];
						dia[0]=idPPK;
						dia[1]=this.id;
						dia[2]=this.cells[1].innerHTML;
						dia[3]=this.cells[0].id;
						dia[4]='2';
						dia[5]=true;
						diag1.push(dia);
						table_diag1();
						e('pd2').value="";
						e('pi2').value="";
						$("#icdModal").modal('hide');
						$("#pd2").focus();
					}
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						if(num=='1'){
							e("k1").value=this.id;
							e("d1").value=this.cells[0].id;
							e("i1").value=this.cells[1].innerHTML;
							$("#icdModal").modal('hide');
							$("#d2").focus();
						}else if(num=='2'){
							var dia=[];
							dia[0]=this.id;
							dia[1]=this.cells[1].innerHTML;
							dia[2]=this.cells[0].id;
							dia[3]='new';
							dia[4]=idEpisode+diag.length;
							diag.push(dia);
							table_diag();
							e('d2').value="";
							e('i2').value="";
							$("#icdModal").modal('hide');
							$("#d2").focus();
						}else if(num=='3'){
							e("pk1").value=this.id;
							e("pd1").value=this.cells[0].id;
							e("pi1").value=this.cells[1].innerHTML;
							var dia=[];
							dia[0]=idPPK;
							dia[1]=this.id;
							dia[2]=this.cells[1].innerHTML;
							dia[3]=this.cells[0].id;
							dia[4]='1';
							dia[5]=true;
							diag1.push(dia);
							table_diag1();
							$("#icdModal").modal('hide');
							$("#pd2").focus();
						}else if (num=='4'){
							var dia=[];
							dia[0]=idPPK;
							dia[1]=this.id;
							dia[2]=this.cells[1].innerHTML;
							dia[3]=this.cells[0].id;
							dia[4]='2';
							dia[5]=true;
							diag1.push(dia);
							table_diag1();
							e('pd2').value="";
							e('pi2').value="";
							$("#icdModal").modal('hide');
							$("#pd2").focus();
						}	
					}
				}
				var td = c("td", tr,null,h.NM_DIAG1);
				
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.KODE+"')>"+h.NM_DIAG1+"</a>";
				td.setAttribute('title',h.NM_DIAG1);
				
				td = c("td", tr);
				td.innerHTML=h.KODE_ICD;
			}
			pilih='#'+prod[0].KODE;
			
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevPage');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			if(num==1)
				var diag=e('d1').value;
			else if(num==2)
				var diag=e('d2').value;
			else if(num==3)
				var diag=e('pd1').value;
			else if(num==4)
				var diag=e('pd2').value;
			sumPage=sumPage-32;
			if(diag.length!=0)
				selectICD(diag,num,sumPage);
			else{
				if(num==1)
					var diag=e('i1').value;
				else if(num==2)
					var diag=e('i2').value;
				else if(num==3)
					var diag=e('pi1').value;
				else if(num==4)
					var diag=e('pi2').value;
				selectICD2(diag,num,sumPage);
			}
		}
			
		var button=c('button',div,null,'nextPage');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			if(num==1)
				var diag=e('d1').value;
			else if(num==2)
				var diag=e('d2').value;
			else if(num==3)
				var diag=e('pd1').value;
			else if(num==4)
				var diag=e('pd2').value;
			if(diag.length!=0)
				selectICD(diag,num,sumPage);
			else{
				if(num==1)
					var diag=e('i1').value;
				else if(num==2)
					var diag=e('i2').value;
				else if(num==3)
					var diag=e('pi1').value;
				else if(num==4)
					var diag=e('pi2').value;
				selectICD2(diag,num,sumPage);
			}
		}
		if(prod.length!=16)
			$('#nextPage').attr('disabled',true);
		if(sumPage==17)
			$('#prevPage').attr('disabled',true);
		cWidth=bodyWidth*0.6;
		var col=cWidth-130;
		$('#icd_table').fixheadertable({ 
			colratio:[col,70],
			height:380
		});
		var $rows = $('#icd_table tr');
			$('#kdDiagnosa').keyup(function() {
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

				$rows.show().filter(function() {
					var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
					return !~text.indexOf(val);
				}).hide();
			});	
		jQuery.tableNavigation();
		$('#icdModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		$(pilih+' td .activation').focus();
	}
	function tabelICD2(prod,num){
		var content=e("icdBody");
		content.innerHTML="";
		var pilih="";
		var label=c("label",content);
		label.innerHTML="Cari Tindakan";
		label.style.cssText="margin:5px";
		var input=c("input",content,null,"kdTindakan");
		input.setAttribute("type","text");
		input.value="";
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped navigateable","icd2_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		
		var th = c("th", tr);
		th.innerHTML="TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="ICD 9";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.KODE);
				tr.ondblclick=function(){
					if(num=='1'){
						e("k9").value=this.id;
						e("d9").value=this.cells[0].id;
						e("i9").value=this.cells[1].innerHTML;
						$("#icdModal").modal('hide');
						$("#tindak").focus();
					}else if(num=='2'){
						var tin=[];
						tin[0]=this.id;
						tin[1]=this.cells[1].innerHTML;
						tin[2]=this.cells[0].id;
						tin[3]='new';
						tindak.push(tin);
						table_tindak();
						e('tindak').value="";
						e('tindakICD').value="";
						$("#icdModal").modal('hide');
						$("#tindak").focus();
					}else if(num=='3'){
						e("pk9").value=this.id;
						e("pd9").value=this.cells[0].id;
						e("pi9").value=this.cells[1].innerHTML;
						var tin=[];
						tin[0]=idPPK;
						tin[1]=this.id;
						tin[2]=this.cells[1].innerHTML;
						tin[3]=this.cells[0].id;
						tin[4]='1';
						tin[5]=true;
						tindak1.push(tin);
						table_tindak1();
						$("#icdModal").modal('hide');
						$("#ptindak").focus();
					}else if(num=='4'){
						var tin=[];
						tin[0]=idPPK;
						tin[1]=this.id;
						tin[2]=this.cells[1].innerHTML;
						tin[3]=this.cells[0].id;
						tin[4]='2';
						tin[5]=true;
						tindak1.push(tin);
						table_tindak1();
						e('ptindak').value="";
						e('ptindakICD').value="";
						$("#icdModal").modal('hide');
						$("#ptindak").focus();
					}
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						if(num=='1'){
							e("k9").value=this.id;
							e("d9").value=this.cells[0].id;
							e("i9").value=this.cells[1].innerHTML;
							$("#icdModal").modal('hide');
							$("#tindak").focus();
						}else if(num=='2'){
							var tin=[];
							tin[0]=this.id;
							tin[1]=this.cells[1].innerHTML;
							tin[2]=this.cells[0].id;
							tin[3]='new';
							tindak.push(tin);
							table_tindak();
							e('tindak').value="";
							e('tindakICD').value="";
							$("#icdModal").modal('hide');
							$("#tindak").focus();
						}else if(num=='3'){
							e("pk9").value=this.id;
							e("pd9").value=this.cells[0].id;
							e("pi9").value=this.cells[1].innerHTML;
							var tin=[];
							tin[0]=idPPK;
							tin[1]=this.id;
							tin[2]=this.cells[1].innerHTML;
							tin[3]=this.cells[0].id;
							tin[4]='1';
							tin[5]=true;
							tindak1.push(tin);
							table_tindak1();
							$("#icdModal").modal('hide');
							$("#ptindak").focus();
						}else if(num=='4'){
							var tin=[];
							tin[0]=idPPK;
							tin[1]=this.id;
							tin[2]=this.cells[1].innerHTML;
							tin[3]=this.cells[0].id;
							tin[4]='2';
							tin[5]=true;
							tindak1.push(tin);
							table_tindak1();
							e('ptindak').value="";
							e('ptindakICD').value="";
							$("#icdModal").modal('hide');
							$("#ptindak").focus();
						}
					}
				}
				var td = c("td", tr,null,h.LONG_DESCRIPTION);
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.KODE+"') >"+h.LONG_DESCRIPTION+"</a>";
				td.setAttribute('title',h.LONG_DESCRIPTION);
				td = c("td", tr);
				td.innerHTML=h.KODE_ICD;
			}
			pilih='#'+prod[0].KODE;
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevPage');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			if(num==1)
				var diag=e('d9').value;
			else if(num==2)
				var diag=e('tindak').value;
			else if(num==3)
				var diag=e('pd9').value;
			else if(num==4)
				var diag=e('ptindak').value;
			sumPage=sumPage-32;
			if(diag.length!=0)
				selectICDCM(diag,num,sumPage);
			else{
				if(num==1)
					var diag=e('i9').value;
				else if(num==2)
					var diag=e('tindakICD').value;
				else if(num==3)
					var diag=e('pi9').value;
				else if(num==4)
					var diag=e('ptindakICD').value;
				selectICDCM2(diag,num,sumPage);
			}
		}
			
		var button=c('button',div,null,'nextPage');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			if(num==1)
				var diag=e('d9').value;
			else if(num==2)
				var diag=e('tindak').value;
			else if(num==3)
				var diag=e('pd9').value;
			else if(num==4)
				var diag=e('ptindak').value;
			if(diag.length!=0)
				selectICDCM(diag,num,sumPage);
			else{
				if(num==1)
					var diag=e('i9').value;
				else if(num==2)
					var diag=e('tindakICD').value;
				else if(num==3)
					var diag=e('pi9').value;
				else if(num==4)
					var diag=e('ptindakICD').value;
				selectICDCM2(diag,num,sumPage);
			}
		}
		if(prod.length!=16)
			$('#nextPage').attr('disabled',true);
		if(sumPage==17)
			$('#prevPage').attr('disabled',true);
		cWidth=bodyWidth*0.6;
		var col=cWidth-130;	
		$('#icd2_table').fixheadertable({
			colratio:[col,70],
			height:380
		});
		var $rows = $('#icd2_table tr');
			$('#kdTindakan').keyup(function() {
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

				$rows.show().filter(function() {
					var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
					return !~text.indexOf(val);
				}).hide();
			});	
		jQuery.tableNavigation();
		$('#icdModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		$(pilih+' td .activation').focus();
	}
	function table_diag(){
		var content=e('diagTable');
		content.innerHTML="";
		cWidth=content.offsetWidth;
		
		var table=c('table',content);
		var tbody=c('tbody',table);
		for (var i=0;i<diag.length;i++) {
			var h = diag[i];
			tr = c("tr", tbody);
			var td = c("td", tr);
			var le=(cWidth-100)/6;
			if(h[2].length<le)
				td.innerHTML=h[2];
			else
				td.innerHTML=h[2].substring(0,le-3)+'...';
			td.setAttribute('title',h[2]);
			td.style.width=(cWidth-100)+'px';
			
			td = c("td", tr);
			td.innerHTML=h[1];
			td.style.width='50px';
			td = c("td", tr);
			td.style.width='50px';
			if(doneP!='2_done'){
				var button=c('button',td,null,i+'_diag');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noDiag=id.split('_')[0];
					if(diag[noDiag][3]=="old"){
						deleteDiag(diag[noDiag][4]);
						diag.splice(noDiag,1);
						$("#d2").focus();
					}else{
						diag.splice(noDiag,1);
						$("#d2").focus();
					}
					table_diag();
				}
			}
		}
	}
	function table_tindak(){
		var content=e('tindakTable');
		content.innerHTML="";
		cWidth=content.offsetWidth;
		
		var table=c('table',content);
		var tbody=c('tbody',table);
		for (var i=0;i<tindak.length;i++) {
			var h = tindak[i];
			tr = c("tr", tbody);
			
			var td = c("td", tr);
			var le=(cWidth-100)/6;
			if(h[2].length<le)
				td.innerHTML=h[2];
			else
				td.innerHTML=h[2].substring(0,le-3)+'...';
			td.setAttribute('title',h[2]);
			td.style.width=(cWidth-100)+'px';
			td = c("td", tr);
			td.innerHTML=h[1];
			td.style.width='50px';
			td = c("td", tr);
			td.style.width='50px';
			if(doneP!='2_done'){
				var button=c('button',td,null,i+'_tindak');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noTindak=id.split('_')[0];
					if(tindak[noTindak][3]=="old"){
						deleteTindakan(tindak[noTindak][4]);
						tindak.splice(noTindak,1);
						$("#tindak").focus();
					}else{
						tindak.splice(noTindak,1);
						$("#tindak").focus();
					}
					table_tindak();
				}
			}
		}
	}
	function myClick(kode){
		//$('#'+kode).dblclick();
	}
	function alergi(){
		var periksa=e("periksa");
		pHeight=periksa.offsetHeight;
		
		var content=e("alergi-vr");
		content.innerHTML="";
		content.style.height="210px";
		cWidth=e('isi').offsetWidth;
		var div=c("div",content," title1");
		div.innerHTML="Tambah Alergi";
		div=c("div",content);
		var text1=c("input",div,null,"alergiTam");
		text1.setAttribute("type","text");
		text1.setAttribute("tabindex",200);
		text1.style.width=(cWidth-100)+'px';
		if(idPasien)
			$('#alergiTam').removeAttr('disabled');
		else
			$('#alergiTam').attr('disabled',true);
		var button=c("button",div,null,'btnAlr');
		button.innerHTML="Simpan";
		button.setAttribute("tabindex",201);
		button.onclick=function(){
			var alergi=e("alergiTam").value;
			if((idPasien)&&(alergi.length!=0))
				insertAlergi(idPasien,alergi);
			else{
				bootbox.alert("Data Alergi Belum Lengkap!",function(){
					setTimeout(function(){
						e("alergiTam").value="";
						$('#alergiTam').focus();},10);
				});
			}
			
		}
		
		/*if(idPasien=="" || idPasien==null)
			button.setAttribute('disabled',true);
		else
			button.removeAttribute('disabled');*/
		div=c("div",content,"title1");
		div.innerHTML="Daftar Alergi";
		div=c("div",content,null,"tabAlergi");
		if(idPasien!="" || idPasien!=null)
			pasienAlergi(idPasien,"tabelAlergi");
		else
			tabelAlergi('');
	}
	
	function catatan(){
		var periksa=e("periksa");
		pHeight=periksa.offsetHeight;
		
		var content=e("catatan-vr");
		content.innerHTML="";
		content.style.height="210px";
		cWidth=e('isi').offsetWidth;
		var div=c("div",content," title1");
		div.innerHTML="Tambah Catatan";
		div=c("div",content);
		var text1=c("input",div,null,"cattTam");
		text1.setAttribute("type","text");
		text1.setAttribute("tabindex",25);
		text1.style.width=(cWidth-100)+'px';
		if(idPasien)
			$('#cattTam').removeAttr('disabled');
		else
			$('#cattTam').attr('disabled',true);
		var button=c("button",div,null,'btnCatt');
		button.innerHTML="Simpan";
		button.setAttribute("tabindex",25);
		button.onclick=function(){
			var catt=e("cattTam").value;
			if((idPasien)&&(catt.length!=0))
				insertCatatan(idPasien,catt);
			else{
				bootbox.alert("Data Catatan Khusus Belum Lengkap!",function(){
					setTimeout(function(){
						e("catTam").value="";
						$('#cattTam').focus();},10);
				});
			}
		}
		/*if(idPasien=="" || idPasien==null)
			button.setAttribute('disabled',true);
		else
			button.removeAttribute('disabled');*/
		div=c("div",content,"title1");
		div.innerHTML="Daftar Catatan";
		div=c("div",content,null,"tabCatt");
		if(idPasien!="" || idPasien!=null)
			pasienCatatan(idPasien);
		else
			tabelCatatan('');
		
	}
	
	function rencana(){
		var periksa=e("periksa");
		pHeight=periksa.offsetHeight;
		
		var content=e("Rencana-vr");
		content.innerHTML="";
		content.style.height="210px";
		cWidth=e('isi').offsetWidth;
		var div=c("div",content," title1");
		div.innerHTML="Tambah Rencana Tindak Lanjut";
		div=c("div",content);
		var text1=c("input",div,null,"rencTam");
		text1.setAttribute("type","text");
		text1.setAttribute("tabindex",25);
		text1.style.width=(cWidth-30)+'px';

		var text1=c("input",div,null,"tgl_rencana");
		text1.setAttribute("type","date");
		text1.setAttribute("tabindex",25);
		text1.style.width=(cWidth-30)+'px';


		if(idPasien)
			$('#rencTam').removeAttr('disabled');
		else
			$('#rencTam').attr('disabled',true);
		var button=c("button",div,null,'btnRen');
		button.innerHTML="Simpan";
		button.setAttribute("tabindex",25);
		button.onclick=function(){
			var catt=e("rencTam").value;
			if((idPasien)&&(catt.length!=0))
			    insertRencana(idPasien,catt);
			else{
				bootbox.alert("Data Rencana Tindak Lanjut Belum Lengkap!",function(){
					setTimeout(function(){
						e("RenTam").value="";
						$('#rencTam').focus();},10);
				});
			}
		}
		/*if(idPasien=="" || idPasien==null)
			button.setAttribute('disabled',true);
		else
			button.removeAttribute('disabled');*/
		div=c("div",content,"title1");
		div.innerHTML="Daftar Rencana";
		div=c("div",content,null,"tabRencana");
		if(idPasien!="" || idPasien!=null)
		    pasienRencana(idPasien);
		else
			tabelRencana('');
		
	}
	function tabelAlergi(prod){
		var content1=e("alergiTam");
		content1.value="";
		var content=e("tabAlergi");
		content.innerHTML="";
		if(idPasien=="" || idPasien==null)
			$('#btnAlr').attr('disabled',true);
		else
			$('#btnAlr').removeAttr('disabled');
		var div=e("alergi-vr");
		var dHeight=div.offsetHeight;

		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","alergi_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="ALERGI";
		
		th = c("th", tr);
		th.innerHTML="TANGGAL";

		th = c("th", tr);	
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody);
				
				var td = c("td", tr);
				td.innerHTML=h.ALERGI;
				td.setAttribute('title',h.ALERGI);
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);

				td = c("td", tr);
				var button=c('button',td,null,h.ALERGI+'_'+h.TANGGAL);
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					var ale=id.split('_')[0];
					var tgl=id.split('_')[1];
					deleteAlergi(ale,tgl);
				}
			}
		}

		$('#alergi_table').fixheadertable({ 
			colratio	 : [165,120,100],
			width:385,
			height:dHeight-100,
			zebra:true
		});
		
	}
	function tabelCatatan(prod){
		var content1=e("cattTam");
		content1.value="";
		var content=e("tabCatt");
		content.innerHTML="";
		if(idPasien=="" || idPasien==null)
			$('#btnCatt').attr('disabled',true);
		else
			$('#btnCatt').removeAttr('disabled');
		var div=e("catatan-vr");
		var dHeight=div.offsetHeight;
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","catatan_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="CATATAN";
		
		th = c("th", tr);
		th.innerHTML="TANGGAL";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody);
				
				var td = c("td", tr);
				td.innerHTML=h.CATATAN;
				td.setAttribute('title',h.CATATAN);
					
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
			}
		}
		$('#catatan_table').fixheadertable({ 
			colratio	 : [200,100],
			width:300,
			height:dHeight-100,
			zebra:true
		});
		
	}
	function tabelRencana(prod){
		var content1=e("rencTam");
		content1.value="";
		var content=e("tabRencana");
		content.innerHTML="";
		if(idPasien=="" || idPasien==null)
			$('#btnRen').attr('disabled',true);
		else
			$('#btnRen').removeAttr('disabled');
		var div=e("Rencana-vr");
		var dHeight=div.offsetHeight;
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","catatan_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="CATATAN";
		
		th = c("th", tr);
		th.innerHTML="TANGGAL";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody);
				
				var td = c("td", tr);
				td.innerHTML=h.CATATAN;
				td.setAttribute('title',h.CATATAN);
					
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
			}
		}
		$('#catatan_table').fixheadertable({ 
			colratio	 : [200,100],
			width:300,
			height:dHeight-100,
			zebra:true
		});
		
	}
	
	function sejarahResep(prod){
		var content=e("resepHistory");
		content.innerHTML="";
		var pilih="";
		var content1=e("getHRBody");
		cHeight=content1.offsetHeight;
		var content2=e("kontenResep");	
		content.style.height=(cHeight-38)+"px";
		content2.style.height=(cHeight-38)+"px";
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped navigateable","sejarahRe_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="TANGGAL";
		
		th = c("th", tr);
		th.innerHTML="NO RESEP";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.TRANS_CO);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					var tco=this.id;
					var ke=this.cells[0].className.split(" ")[0];
					selectSejarahResep(ke,tco);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						var tco=this.id;
						var ke=this.cells[0].className.split(" ")[0];
						selectSejarahResep(ke,tco);
					}
				}
				var td = c("td", tr,h.RESEP_KE,h.RESEP_KE+'_Sresep');
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.TRANS_CO+"')>"+h.TANGGAL+"</a>";
					
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML=h.RESEP_KE;
			}
			pilih='#'+prod[0].RESEP_KE+'_Sresep';
		}
		$('#sejarahRe_table').fixheadertable({ 
			height:cHeight-64,
			zebra:true
		});
		jQuery.tableNavigation();
		$('#getHRModal').on('shown.bs.modal', function () {
			$(pilih+' .activation').focus();
		});
		var btn=e("HRSave");
		btn.onclick=function(){
			var length=formulaObat.length;
			if(length!=0){
				for(var i=0;i<length;i++){
					var resep2=[];
					resep2[0]=formulaObat[i][1];
					resep2[1]=formulaObat[i][2];
					resep2[2]=formulaObat[i][3];
					resep2[3]=formulaObat[i][4];
					resep2[4]=formulaObat[i][5];
					resep2[5]=formulaObat[i][6];
					resep2[6]=formulaObat[i][7];
					resep2[7]=formulaObat[i][18];
					resep2[8]=formulaObat[i][8];
					resep2[9]=formulaObat[i][9];
					resep2[10]=formulaObat[i][10];
					resep2[12]=formulaObat[i][12];
					resep2[13]=formulaObat[i][13];
					resep2[14]=formulaObat[i][14];
					resep2[15]=formulaObat[i][15];
					resep2[16]=formulaObat[i][16];
					resep2[17]=formulaObat[i][17];
					if(sOUrut!=null)
						obatResep.splice(sOUrut,0,resep2);
					else
						obatResep.push(resep2);
				}
				tabelResep(obatResep);
				$('#getHRModal').modal('hide');
			}else
				bootbox.alert("Silakan Pilih History Resep!");
		}
		var btn=e("cpToFormula");
		btn.onclick=function(){
			var length=formulaObat.length;
			if(length!=0){
				bootbox.prompt({
					title:"Nama Formula Resep Baru?",
					value:asalPoli,
					callback: function(result){
						if(result!=null){
							if(result.length==0)
								bootbox.alert("Silakan Masukkan Nama Formula!");
							else{
								var fo=result.trim();
								copyToFormula(fo);
							}
						}
					}
				});
				/*var formula=prompt("Nama Formula Resep Baru?","formula");
				if(formula!=null){
					if(formula.length==0)
						bootbox.alert("Silakan Masukkan Nama Formula!");
					else{
						var fo=formula.trim();
						copyToFormula(fo);
					}
				}*/
			}else
				bootbox.alert("Silakan Pilih History Resep!");
		}
	}
	function sejarahResepKonten(prod){
		formulaObat=[];
		if(prod.length!=0){
			lengthResep=prod.length;
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				var resep=[];
				resep[0]="";
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				resep[3]=h.SEDIAAN_ID;
				resep[4]=h.SEDIAAN;
				resep[5]=h.SATUAN_ID;
				resep[6]=h.SATUAN;
				resep[7]=h.QTY;
				resep[8]=h.SIGNA_ID;
				resep[9]=h.SIGNA_NAMA;
				resep[10]=h.SIGNA_DOKTER;
				resep[11]=h.URUT;
				resep[12]=h.TYPE;
				resep[13]=h.HEADER;
				resep[14]=h.NAMA_RACIKAN;
				resep[15]=h.FREE_DOSIS;
				resep[16]=h.ROUTE_ID;
				resep[17]=h.ROUTE;
				resep[18]=h.CATATAN;
				formulaObat.push(resep);
			}
		}sejarahResepKonten1(formulaObat);
	}
	function sejarahResepKonten1(prod){
		var content=e("kontenResep");
		content.innerHTML="";
		cWidth=content.offsetWidth;
		var col=(cWidth-180)/9;
		var content1=e("getHRBody");
		cHeight=content1.offsetHeight;
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","kontenRe_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="RACIKAN";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="DOSIS";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		th.innerHTML="SIGNA";
		th = c("th", tr);
		th.innerHTML="CATATAN";
		th = c("th", tr);
		th.innerHTML="ROUTE";
		th = c("th", tr);
		th.innerHTML="URUT";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				var tr = c("tr", tbody);
				if(h[12]=='01'){
					tr.style.cssText='background:#666;color:#fff;';
					var td = c("td", tr);
					td.innerHTML='*';
					
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					td.innerHTML=h[18];
					td.setAttribute('title',h[18]);
					td = c("td", tr);
					td.innerHTML=h[17];
					td.setAttribute('title',h[17]);
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					
				}else if(h[12]=='02'){
					var td = c("td", tr);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					td.setAttribute('colspan',7);
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
		
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}else if(h[12]=='03'){
					var td = c("td", tr);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					td = c("td", tr);
					td = c("td", tr);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}else if(h[12]=='00'||h[12]=='04'){
					tr.style.background='#b0d9d7';
					var td = c("td", tr);
					td.innerHTML='';
		
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					td.innerHTML=h[15];
					td.setAttribute('title',h[15]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					td.innerHTML=h[18];
					td.setAttribute('title',h[18]);
					td = c("td", tr);
					td.innerHTML=h[17];
					td.setAttribute('title',h[17]);
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}
			}
		}
		$('#kontenRe_table').fixheadertable({ 
			colratio	 : [60,2*col,col,col,60,col,col,col,col,col,50],
			height:cHeight-64,
		});
	}
	function closeTab1(){
		var content=e("tab1");
		content.style.cssText="display:none;";
		var content1=e("tab2");
		content1.setAttribute('class','col-sm-12');
		content1.style.cssText="display:block;";
		var title=e('stsTitle');
		title.innerHTML="";
		title.innerHTML="Status Pasien";
		var anchor=c("a",title,"btn btn-xs panel-title","openTab");
		anchor.innerHTML='<span class="glyphicon glyphicon-fast-forward" title="Pasien"></span>'
		anchor.href="javascript:openTab()";
		//e("tab3").setAttribute('class','col-sm-3');
	}
	function closeTab2(){
		var content=e("tab1");
		content.setAttribute('class','col-xs-2');
		var content1=e("tab2");
		content1.setAttribute('class','col-xs-10');
		var button=e("closeTab1");
		button.href='javascript:closeTab1()';
		button.setAttribute('title','Close');
		/*var title=e('stsTitle');
		title.innerHTML="";
		title.innerHTML="Status Pasien";
		var anchor=c("a",title,"btn btn-xs","openTab");
		anchor.innerHTML='<span class="glyphicon glyphicon-fast-forward" title="Open"></span>'
		anchor.href="javascript:openTab()";*/
	}
	function openTab(){
		var content=e("tab1");
		content.style.cssText="display:block;";
		content.setAttribute('class','col-sm-4');
		var button=e("closeTab1");
		button.href='javascript:closeTab2()';
		button.setAttribute('title','Status Pasien');
		var content1=e("tab2");
		//content1.style.cssText="display:none;";
		content1.setAttribute('class','col-sm-8');
		var title=e('stsTitle');
		title.innerHTML="";
		title.innerHTML="Status Pasien";
		var cWidth=e('isi').offsetWidth;
		//pasienDokter1();
		var aa=e('alergiTam');
		if(aa)
			aa.style.width=(cWidth-100)+'px';
		var cc=e('cattTam');
		if(cc)
			cc.style.width=(cWidth-100)+'px';
		//e("tab3").setAttribute('class','col-sm-7');

		var uu=e('rencTam');
		if(uu)
			uu.style.width=(cWidth-100)+'px';
	}
	function clsTab(){
		var content=e("history_resep");
		content.style.cssText="display:none;";
		var content1=e("tabel_obatBody");
		content1.setAttribute('class','col-sm-12');
		var div=e("opnTab");
		var anchor=c("a",div,"btn btn-xs btn-info");
		anchor.innerHTML='<span class="glyphicon glyphicon-fast-forward" title="Open"></span>'
		anchor.href="javascript:opnTab()";
	}
	function opnTab(){
		var content=e("history_resep");
		content.style.cssText="display:block;";
		content.setAttribute('class','col-sm-4');
		var button=e("clsTab");
		button.href='javascript:clsTab()';
		button.setAttribute('title','Minimize');
		var content1=e("tabel_obatBody");
		content1.setAttribute('class','col-sm-8');
		var div=e('opnTab');
		div.innerHTML="";
	
	}
	function pasienInformasi(prod){
		var h = prod[0];
		var content=e("ketPasien");
		content.innerHTML="";
		var table=c("table",content);

		var tr=c("tr",table);
		
		var td=c("td",tr);
		td.innerHTML="No. MR";
		td.style.width="150px";
		var med=h.INT_PASIEN_ID;
		td=c("td",tr);
		td.innerHTML="<u>"+med+"</u>";
		td.style.width="300px";
		
		td=c("td",tr);
		td.innerHTML="Jenis Kelamin";
		td.style.width="150px";
		td=c("td",tr);
		td.innerHTML="<u>"+h.KELAMIN+"</u>";
		td.style.width="200px";
		td=c("td",tr);
		td.setAttribute('rowSpan',3);
		var button=c('button',td,'btn btn-sm btn-primary','btnAnam1');
		button.style.cssText='margin-right:5px';
		button.setAttribute('type','button');
		button.innerHTML='PERAWAT';
		button.onclick=function(){
			getAnamnesa();
		}
		
		var button=c('button',td,'btn btn-sm btn-primary','btnKonsul1');
		button.style.cssText='margin-right:5px';
		button.setAttribute('type','button');
		button.innerHTML='Jawab Konsul';
		button.onclick=function(){
			formulirModal3();
		}
		if(konsul==0)
			$('#btnKonsul1').attr('style','display:none');
		
		td=c("td",tr,null,'ketResep');
		td.style.cssText="padding-left:10px;color:blue;font-size:30px;";
		td.setAttribute('rowSpan',3);
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Nama";
		td=c("td",tr);
		td.innerHTML="<u>"+h.NAMA+"</u>";
		
		td=c("td",tr);
		td.innerHTML="Penjamin";
		td=c("td",tr);
		if(h.REKANAN!=null){
			td.innerHTML="<u>"+h.REKANAN+"</u>";
		}else
			td.innerHTML="__________________";
		rekanan=h.AKHIR_REKANAN_ID;
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Tgl. Lahir";
		td=c("td",tr);
		td.innerHTML="<u>"+h.TGL_LAHIR+" ("+h.UMUR+")"+"</u>";		
		umur=h.UMUR;
	}
	function pasienKosong(){
		idTransCo="";
		//enabledForm1();
		var form =e("btn_save");
		form.setAttribute("onclick","javascript:saveSoap()");
		e("S").value="";
		e("S2").value="";
		e("S3").value="";
		e("O").value="";		
		e("A").value="";
		e("P").value="";
		e("tindak").value="";
		e("tindakICD").value="";
		e('tindakTable').innerHTML="";
		e('imgTable').innerHTML="";
		e('diagTable').innerHTML="";
		e("k1").value="";
		e("d1").value="";
		e("i1").value="";
		e("k2").value="";		
		e("d2").value="";
		e("i2").value="";
		e("k9").value="";		
		e("d9").value="";
		e("i9").value="";	
		e("komplikasi").value="";
		e("edukasi").value="";
		e("gizi").value="02";
		e("alkel").value="";
		e("sakel").value="";
		$('#cSoap').removeAttr('disabled');
		var dd=e('btnf1').innerHTML;
		if(dd=="Free Text")
			$('#btnf1').click();
		var dd2=e('btnf2').innerHTML;
		if(dd2=="Free Text")
			$('#btnf2').click();
		var dd=e('btnf3').innerHTML;
		if(dd=="Free Text")
			$('#btnf3').click();
		var dd2=e('btnf4').innerHTML;
		if(dd2=="Free Text")
			$('#btnf4').click();
	}
	function pasienDiagnosa(prod){
		
		var h=prod[0];
		idTransCo=h.TRANS_CO;
		idTrans=h.TRANS_ID;
		var form =e("btn_save");
		form.setAttribute("onclick","javascript:updateSoap()");
		$('#form1 textarea').attr('disabled',true);
		
		e("tindak").value="";
		e("tindakICD").value="";
		e("k1").value=h.KICD1;
		var dd=e('btnf1').innerHTML;
		if(h.DIAGNOSA1!=null){
			if(dd=="ICD 10")
				$('#btnf1').click();
			e("d1").value=h.DIAGNOSA1;
		}else{
			if(h.DIAGNOSA1==null && h.DIAGNOSA!=null){
				if(dd=="Free Text")
					$('#btnf1').click();
				e("d1").value=h.DIAGNOSA;
			}else{
				if(dd=="Free Text")
					$('#btnf1').click();
				e("d1").value="";
			}	
		}
		e("i1").value=h.ICD1;
		e("d2").value="";
		e("i2").value="";
		e("k2").value="";
		var dd2=e('btnf2').innerHTML;
		if(dd2=="Free Text")
			$('#btnf2').click();
		var dd=e('btnf3').innerHTML;
		if(h.TINDAKAN1!=null){
			if(dd=="ICD 9 CM")
				$('#btnf3').click();
			e("d9").value=h.TINDAKAN1;
			e("i9").value=h.IDTIN1;
			e("k9").value=h.KICD9;
		}else{
			if(h.TINDAKAN!=null){
				if(dd=="Free Text")
					$('#btnf3').click();
				e("d9").value=h.TINDAKAN;
			}else{
				if(dd=="Free Text")
					$('#btnf3').click();
				e("d9").value="";
				e("i9").value="";
				e("k9").value="";
			}
		}
		var dd2=e('btnf4').innerHTML;
		if(dd2=="Free Text")
			$('#btnf4').click();
		if(h.KOMPLIKASI!=null)
			e("komplikasi").value=h.KOMPLIKASI;
		else
			e("komplikasi").value="";
		if(h.EDUKASI!=null)
			e("edukasi").value=h.EDUKASI;
		else
			e("edukasi").value="";
		if(h.ALERGI_KEL!=null)
			e("alkel").value=h.ALERGI_KEL;
		else
			e("alkel").value="";
		if(h.SAKIT_KEL!=null)
			e("sakel").value=h.SAKIT_KEL;
		else
			e("sakel").value="";
		e("gizi").value=h.GIZI;	
		autoSize('komplikasi');autoSize('edukasi');autoSize('alkel');autoSize('sakel');
			selectValidResep();
			selectValidLab();
			selectValidRad();
			selectValidAlkes();
		
	}
	function formulirModal1(){
		if(idPasien){
			if(idTransCo){
				$('#formModal1').modal('show');
				pasienKetModal(idPasien,"formBody1");
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}


	function formulirModal2(){
		if(idPasien){
			if(idTransCo){
				$('#konsul_menu').modal('show');
				e('formKonsul').reset();
				e('formJKonsul').reset();
				selectPoli();
				e('tanggal3').value=moment().format("DD-MM-YYYY");
				$('#dokterRujuk').attr('disabled',true);
				$('#konsul_menu').on('shown.bs.modal', function () {
					$('#tanggal3').focus();
				});
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	
	}
	function formulirModal3(){
		if(idPasien){
				$('#konsul_menu').modal('show');
				e('formKonsul').reset();
				e('formJKonsul').reset();
				$('#konsul_menu').on('shown.bs.modal', function () {
					$('#jsKonsul').focus();
				});
				selectKonsul1();
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	
	}

	function formulirModal5(){
		if(idPasien){
			if(idTransCo){
				$('#formModal5').modal('show');
				pasienKetModal5(idPasien,"formBody5");
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

	var	obatResep=[];
	function obatModal(){
		if(idPasien){
			if(idTransCo){
				obatResep=[];noRacik=0;	
				if(resepKe==1){
					if(doneP=='1_done'){
						bootbox.alert('Transaksi Pasien Sudah Selesai Tidak Dapat Membuat Pelayanan!');
						return;
					}
					$('#obatModal').modal('show');
					pasienKetModal(idPasien,"obatBody");
					setTimeout('searchResep()',300);
				}else{
					resepKe='1';
					$('#obatModal').modal('show');
					pasienKetModal(idPasien,"obatBody");
					setTimeout('searchResep()',300);		
				}  
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	var labPil=[];
	function labModal(){
		if(idPasien){
			if(idTransCo){
				labPil=[];
				if(labKe==1){
					if(doneP=='1_done'){
						bootbox.alert('Transaksi Pasien Sudah Selesai Tidak Dapat Membuat Pelayanan!');
						return;
					}
					$('#labModal').modal('show');
					pasienKetModal(idPasien,"labBody");	
					setTimeout('formStruktur(1)',300);
				}else{
					labKe=1;
					$('#labModal').modal('show');
					pasienKetModal(idPasien,"labBody");
					setTimeout('formStruktur(1)',300);
				}
			}else
				bootbox.alert("Diagnosa tidak ditemukan");				
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	var radPil=[];
	function radModal(){
		if(idPasien){
			if(idTransCo){
				radPil=[];
				if(radKe==1){
					if(doneP=='1_done'){
						bootbox.alert('Transaksi Pasien Sudah Selesai Tidak Dapat Membuat Pelayanan!');
						return;
					}
					$('#radModal').modal('show');
					pasienKetModal(idPasien,"radBody");
					setTimeout('formStruktur(2)',300);
				}else{
					radKe=1;
					$('#radModal').modal('show');
					pasienKetModal(idPasien,"radBody");
					setTimeout('formStruktur(2)',300);
				}		
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	var alkesResep=[];
	function alkesModal(){
		if(idPasien){
			if(idTransCo){
				alkesResep=[];
				if(alkesKe==1){
					if(doneP=='1_done'){
						bootbox.alert('Transaksi Pasien Sudah Selesai Tidak Dapat Membuat Pelayanan!');
						return;
					}
					$('#alkesModal').modal('show');
					pasienKetModal(idPasien,"alkesBody");
					setTimeout('searchAlkes()',300);
				}else{
					alkesKe=1;
					$('#alkesModal').modal('show');
					pasienKetModal(idPasien,"alkesBody");
					setTimeout('searchAlkes()',300);	
				}
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function pasienModal(prod,idModal){
		var h = prod[0];
		var content=e(idModal);
		content.innerHTML="";
		
		var table=c("table",content,"infoTabel");
		
		var tr=c("tr",table);
		
		var td=c("td",tr);
		td.innerHTML="Medrec";
		td.style.width="100px";
		var med=h.INT_PASIEN_ID;	
		td=c("td",tr);
		td.innerHTML="<u>"+med+"</u>";
		td.style.width="200px";
		
		td=c("td",tr);
		td.innerHTML="Penjamin";
		td.style.width="80px";
		td=c("td",tr);
		td.innerHTML="<u>"+h.REKANAN+"</u>";
		td.style.width="250px";
		
		td=c("td",tr);
		td.innerHTML="Alergi";
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Nama";
		td=c("td",tr);
		td.innerHTML="<u>"+h.NAMA+"</u>";
		
		td=c("td",tr);
		td.innerHTML="Catatan";
		td=c("td",tr,null,"catt"+idModal);
		td.setAttribute('rowSpan',3);
		var area=c("textArea",td,null,"area"+idModal);
		if(doneP=='1_done')
			area.setAttribute('disabled',true);
		else if(idModal=='obatBody' || idModal=='alkesBody')
			area.setAttribute('disabled',true);
		
		td=c("td",tr);
		td.setAttribute('rowSpan',3);
		area=c("textArea",td,null,"alergi"+idModal);
		if(h.ALERGI!=null)
			area.innerHTML=h.ALERGI;
		else
			area.innerHTML="";
		area.setAttribute('disabled',true);
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Tgl. Lahir";
		td=c("td",tr);
		td.innerHTML="<u>"+h.TGL_LAHIR+" ("+h.UMUR+")"+"</u>";
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Jenis Kelamin";
		td=c("td",tr);
		td.innerHTML="<u>"+h.KELAMIN+"</u>";
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Diagnosa";
		td=c("td",tr);
		td.setAttribute('colspan',4);
		if(h.DIAGNOSA1!=null)
			td.innerHTML="<u>"+h.DIAGNOSA1+"</u>";
		else if(h.DIAGNOSA!=null)
			td.innerHTML="<u>"+h.DIAGNOSA+"</u>";
		
		var hr=c("hr",content);
		if(idModal=="obatBody")
			obat1();
		else if(idModal=="alkesBody")
			alkes1();
		if(idModal=="obatBody"){
			var div=c("div",content,"col-sm-8","tabel_"+idModal);
			div=c("div",content,"col-sm-4","history_resep");
			isiTransR(hisResep1);
		}else
			var div=c("div",content,"col-sm-12","tabel_"+idModal);				
		if(idModal=="obatBody")
			tabelResep(obatResep);
		else if(idModal=="alkesBody")
			tabelAlkes(alkesResep);
	}
	function pasienModal1(prod,idModal){
		var h = prod[0];
		var content=e(idModal);
		content.innerHTML="";
		
		var table=c("table",content,"tabelForm1");
		
		var tr=c("tr",table);
		var td=c("td",tr);
		td.setAttribute('colspan',6);
		td.innerHTML='Mohon didaftarkan sebagai pasien rawat inap terhadap :';
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Nama";
		td.style.width="150px";
		td=c("td",tr);
		td.innerHTML=":";
		td.style.width="10px";
		td=c("td",tr);
		td.innerHTML="<u>"+h.NAMA+"</u>";
		td.style.width="150px";
		td=c("td",tr);
		td.innerHTML="Medrec";
		td.style.width="100px";
		td=c("td",tr);
		td.innerHTML=":";
		td.style.width="10px";
		var med=h.INT_PASIEN_ID;	
		td=c("td",tr);
		td.innerHTML="<u>"+med+"</u>";
		td.style.width="100px";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Jenis Kelamin";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		td.innerHTML="<u>"+h.KELAMIN+"</u>";
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Tgl. Lahir";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var tgllahir=h.TGL_LAHIR.substring(6,10)+'/'+h.TGL_LAHIR.substring(3,5)+'/'+h.TGL_LAHIR.substring(0,2);
		td.innerHTML="<u>"+tgllahir+" Thn/Bln/Hari</u>";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Asal Pasien";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		td.innerHTML="<u>"+h.POLI+"</u>";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Menuju Ruang Rawat";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var select=c('select',td,null,'rRawat');
		var option=c('option',select);
		option.innerHTML="ICCU";
		option.value="ICCU";
		option=c('option',select);
		option.innerHTML="ICU";
		option.value="ICU";
		option=c('option',select);
		option.innerHTML="HICU";
		option.value="HICU";
		option=c('option',select);
		option.innerHTML="PICU";
		option.value="PICU";
		option=c('option',select);
		option.innerHTML="NICU";
		option.value="NICU";
		option=c('option',select);
		option.innerHTML="PERINA";
		option.value="PERINA";
		option=c('option',select);
		option.innerHTML="Ruang Rawat";
		option.value="Ruang Rawat";
		option=c('option',select);
		option.innerHTML="Rooming In";
		option.value="Rooming In";
		option=c('option',select);
		option.innerHTML="Lainnya";
		option.value="Lainnya";
		
		td=c("td",tr);
		select=c('select',td,null,'lantaiKamar');
		select.style.cssText='display:none';
		var input=c('input',td,null,'ket_lain');
		input.setAttribute('type','text');
		input.style.cssText='display:none';
		td=c("td",tr);
		select=c('select',td,null,'rawatKe');
		selectKelas();
		/*option=c('option',select);
		option.innerHTML="I";
		option.value="1";
		option=c('option',select);
		option.innerHTML="II";
		option.value="2";
		option=c('option',select);
		option.innerHTML="III";
		option.value="3";
		option=c('option',select);
		option.innerHTML="VIP";
		option.value="4";*/
		select.style.cssText='display:none';
		var input=c('input',td,null,'ket_lain');
		input.setAttribute('type','text');
		input.style.cssText='display:none';
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Kategori";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var select=c('select',td,null,'kRawat');
		var option=c('option',select);
		option.innerHTML="Infeksi";
		option.value="Infeksi";
		option=c('option',select);
		option.innerHTML="Non Infeksi";
		option.value="Non Infeksi";
		option=c('option',select);
		option.innerHTML="Isolasi";
		option.value="Isolasi";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Diagnosa";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		td.setAttribute('colspan',4);
		if(h.DIAGNOSA1!=null)
			td.innerHTML="<u>"+h.DIAGNOSA1+"</u>";
		else if(h.DIAGNOSA!=null)
			td.innerHTML="<u>"+h.DIAGNOSA+"</u>";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Discharge Planning";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var input=c('input',td,'tKanan','dPlan');
		input.setAttribute('type','text');
		var span=c('span',td);
		span.innerHTML='hari';
		selectLantai();
		
		$('#rRawat').change(function() {
			var str=$( "#rRawat option:selected" ).val();
			if(str=='Ruang Rawat'){
				$('#lantaiKamar').removeAttr('style');
				$('#rawatKe').removeAttr('style');
				$('#ket_lain').attr('style','display:none');
				$('#ket_lain').val('');
			}else if(str=='Lainnya'){
				$('#lantaiKamar').val('');
				$('#lantaiKamar').attr('style','display:none');
				$('#rawatKe').attr('style','display:none');
				$('#rawatKe').val('');
				$('#ket_lain').removeAttr('style');
			}else{
				$('#lantaiKamar').attr('style','display:none');
				$('#rawatKe').attr('style','display:none');
				$('#ket_lain').attr('style','display:none');
			}
			
		});
		var button=e('formSave1');
		button.onclick=function(){
			insertRanap();
		}
		var button=e('formPrint1');
		button.onclick=function(){
			selectRanap1();
		}
	}

	function pasienModal5(prod,idModal){
		var h = prod[0];
		var content=e(idModal);
		content.innerHTML="";
		
		var table=c("table",content,"tabelForm1");
		
		var tr=c("tr",table);
		var td=c("td",tr);
		td.setAttribute('colspan',6);
		td.innerHTML='Mohon Isi Dengan Lengkap :';
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Nama";
		td.style.width="150px";
		td=c("td",tr);
		td.innerHTML=":";
		td.style.width="10px";
		td=c("td",tr);
		td.innerHTML="<u>"+h.NAMA+"</u>";
		td.style.width="150px";
		td=c("td",tr);
		td.innerHTML="Medrec";
		td.style.width="100px";
		td=c("td",tr);
		td.innerHTML=":";
		td.style.width="10px";
		var med=h.INT_PASIEN_ID;	
		td=c("td",tr);
		td.innerHTML="<u>"+med+"</u>";
		td.style.width="100px";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Jenis Kelamin";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		td.innerHTML="<u>"+h.KELAMIN+"</u>";
		
		tr=c("tr",table);
		
		td=c("td",tr);
		td.innerHTML="Tgl. Lahir";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var tgllahir=h.TGL_LAHIR.substring(6,10)+'/'+h.TGL_LAHIR.substring(3,5)+'/'+h.TGL_LAHIR.substring(0,2);
		td.innerHTML="<u>"+tgllahir+" Thn/Bln/Hari</u>";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Asal Pasien";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		td.innerHTML="<u>"+h.POLI+"</u>";
		
		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Instruksi Berobat ke:";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var select=c('select',td,null,'rRawat');
		var option=c('option',select);
		option.innerHTML="Klinik Spesialis RSU. Wulan Windi";
		option.value="KLINIK";
		option=c('option',select);
		option.innerHTML="Puskesmas";
		option.value="PUS";
		option=c('option',select);
		option.innerHTML="Klinik Pratama";
		option.value="PRATAMA";
		option=c('option',select);
		option.innerHTML="Dokter Praktek Mandiri";
		option.value="DOKTER";

		tr=c("tr",table);
		td=c("td",tr);
		td.innerHTML="Tanggal Berobat";
		td=c("td",tr);
		td.innerHTML=":";
		td=c("td",tr);
		var input=c('input',td,'tKanan','tgl_rencana');
		input.setAttribute('type','text');
		var text1=c("input",div,null,"tgl_rencana");
		text1.setAttribute("type","date");
		text1.setAttribute("tabindex",25);


		var button=e('formSave1');
		button.onclick=function(){
			insertRanap();
		}
		var button=e('formPrint1');
		button.onclick=function(){
			selectRanap1();
		}
	}

	var isiRa=[];
	var resepDisabled=false;
	function obat1(){
		resepDisabled=false;
		var content=e("obatBody");
		var form=c('form',content,null,'formObat');
		form.setAttribute('action','javascript:addObatToResep()');
		var table=c('table',form,null,'tabObat');
		var tr=c('tr',table);
		var td=c('td',tr);
		td.innerHTML='Nama Obat';
		td.style.width='250px';
		td=c('td',tr);
		td.innerHTML='Dosis';
		td.style.width='150px';
		td=c('td',tr);
		td.innerHTML='Jumlah';
		td.style.width='50px';
		td=c('td',tr);
		td.innerHTML='Signa';
		td.style.width='200px';
		td=c('td',tr);
		td.innerHTML='Catatan';
		td.style.width='200px';
		td=c('td',tr);
		td.innerHTML='Route';
		td.style.width='150px';
		td=c('td',tr);
		td.innerHTML='<button tabindex=35 type="submit" class="btn btn-xs btn-primary" id="addO"><span class="glyphicon glyphicon-plus"></span> Tambah</button>';
		td.setAttribute('rowspan',2);
		td.style.cssText='vertical-align:bottom;padding-right:5px;';
		td=c('td',tr,null,'warningO');
		td.setAttribute('rowspan',3);
		td=c('td',tr);
		td.innerHTML='<input type="text" id="obat-id1" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="idSedian1" style="display:none"></input><input type="text" id="sedian1" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="idSatuan1" style="display:none"></input><input type="text" id="satuan1" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="pecah1" style="display:none"></input>';
		
		tr=c('tr',table);
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=31 id="nObat" required="required"></input>';
		
		td=c('td',tr);
		td.innerHTML='<input type="text"  tabindex=32 id="dObat"></input>';
		
		td=c('td',tr);
		td.innerHTML='<input type="text" style="text-align:right;" tabindex=32 id="jObat"></input>';
		
		td=c('td',tr,null,'signaObat');
		var select=c('select',td,null,'signaO');
		select.setAttribute('tabindex',33);
		isiSigna("");
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=34 id="catObat" ></input>';
		$( "#catObat" ).autocomplete({
			source: [catMS]
		});
		td=c('td',tr);
		var select=c('select',td,null,'routeObat');
		select.setAttribute('tabindex',35);
		isiRoute("");
		tr=c('tr',table);
		
		td=c('td',tr);
		td.setAttribute('colspan',3);
		td=c('td',tr);
		//td.style.cssText='display:none';
		var button=c("button",td,null,"signaT");
		button.setAttribute("type","button");
		button.innerHTML="Free Text";
		button.onclick=function(){
			var content1=e("signaO");
			if(content1){
				var content2=e("signaObat");
				content2.innerHTML="";
				input=c("input",content2,null,"signa_dokter1");
				input.setAttribute("type","text");
				input.setAttribute('tabindex',33);
				input.setAttribute('required','required');
				button=e("signaT");
				button.innerHTML="Signa";	
			}else{
				var content2=e("signaObat");
				content2.innerHTML="";
				input=c("select",content2,null,"signaO");	
				input.setAttribute('tabindex',33);
				isiSigna("");
				button=e("signaT");
				button.innerHTML="Free Text";
			}
		}
		var hr=c('hr',content);
		var table=c('table',content);
		tr=c('tr',table);
		td=c('td',tr);
		td.setAttribute('colspan',2);
		var button=c("button",td,null,"racikanO");
		button.setAttribute("type","button");
		button.innerHTML="Racikan";
		button.onclick=function(){
			var ada=false;
			var a=0;
			isiRa=[];cekResep=[];
			for(var i=0;i<obatResep.length;i++){
				if(obatResep[i][12]=='04'){
					ada=true;
					isiRa[a]=i;
					cekResep[a]=obatResep[i][0];
					a++;
				}
			}
			var res=hasDuplicates(cekResep);
			if(res){
				bootbox.alert('obat ganda!');
				return;
			}
			if(ada){
				$('#addRacikanModal').modal('show');
				e('formRacik').reset();
				isiBungkus('');
				isiSigna('2');
				isiRoute('Racik');
				$('#addRacikanModal').on('shown.bs.modal', function () {
					$('#nRacik').focus();
				});
				$('#addRacikanModal').on('hidden.bs.modal', function () {
					$('#nObat').focus();
				});
			}else
				bootbox.alert('Tidak ada obat!');
		}
		
		$("#nObat").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var nama=this.value.trim();
				if(nama.length>=1){
					$("#addObatModal").modal('show');
					searchObat(nama,sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#nObat').focus(),10});
					});
				}
				
			}else if(event.keyCode==8 || event.keyCode==46){
				e('obat-id1').value='';
			}
		});
		/*$("#dObat").keydown(function(event){
			if(event.keyCode==13 || event.keyCode==9 ){
				var nama=this.value.trim();
				if(nama.length>=1){
					$('#jObat').attr('disabled',true);
					setTimeout(function(){$('#signaO').focus(),10});
				}else{
					$('#jObat').removeAttr('disabled');
					setTimeout(function(){$('#jObat').focus(),10});
				}
				
			}
		});*/
		
		btn=e("signaT2");
		btn.onclick=function(){
			var content1=e("signaO2");
			if(content1){
				var content2=e("signaRacik");
				content2.innerHTML="";
				input=c("input",content2,null,"signa_dokter3");
				input.setAttribute("type","text");
				input.setAttribute('tabindex',63);
				input.setAttribute('required','required');
				button=e("signaT2");
				button.innerHTML="Signa";	
			}else{
				var content2=e("signaRacik");
				content2.innerHTML="";
				input=c("select",content2,null,"signaO2");	
				input.setAttribute('tabindex',63);
				isiSigna("2");
				button=e("signaT2");
				button.innerHTML="Free Text";
			}
		}
		if(doneP=='1_done'){
			$('#formObat input').attr('disabled',true);
			$('#formObat select').attr('disabled',true);
			$('#formObat button').attr('disabled',true);
			$('#racikanO').attr('disabled',true);
			$('#FOSave').attr('disabled',true);
			$('#HRSave').attr('disabled',true);
			resepDisabled=true;
		}else{
			$('#formObat input').removeAttr('disabled');
			$('#formObat button').removeAttr('disabled');
			$('#formObat select').removeAttr('disabled');
			$('#racikanO').removeAttr('disabled');
			$('#FOSave').removeAttr('disabled');
			$('#HRSave').removeAttr('disabled');
		}
	}
	function hasDuplicates(array) {
		var valuesSoFar = [];
		for (var i = 0; i < array.length; ++i) {
			var value = array[i];
			if (valuesSoFar.indexOf(value) !== -1) {
				return true;
			}
			valuesSoFar.push(value);
		}
		return false;
	}
	function tabelAdd(prod){
		var content=e("addObatBody");
		content.innerHTML="";
		var pilih="";
		var cWidth=bodyWidth*0.7;
		var cHeight=(bodyHeight*0.6)-22;
		var col=(cWidth-110)/7;
		var div=c('div',content);
		var label=c('label',div);
		label.innerHTML='Bahan Aktif';
		label.style.width='100px';
		var input=c('input',div,null,'bhnaktif1');
		input.setAttribute('type','text');
		/*$( "#bhnaktif1" ).autocomplete({
			source: bahanAktif
		});*/
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped ","obat_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="STOK";
		
		th = c("th", tr);
		th.innerHTML="BAHAN AKTIF";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.NAMA);
				tr.ondblclick=function(){
					var namaObat=this.id;
					$('#addObatModal').modal('hide');
					e("obat-id1").value=this.cells[0].id;
					e("nObat").value=namaObat;
					e("idSedian1").value=this.cells[1].id;
					e("idSatuan1").value=this.cells[2].id;
					e("sedian1").value=this.cells[1].innerHTML;
					e("satuan1").value=this.cells[2].innerHTML;
					e("pecah1").value=this.cells[6].innerHTML;
					e("routeObat").value=this.cells[9].innerHTML;
					var fda=this.cells[5].innerHTML;
					var stok=this.cells[3].innerHTML;
					var fornas=this.cells[7].innerHTML;
					var batasan=this.cells[8].innerHTML;
					if(idRekanan=='BPJS'){
						if(fda!="" && stok<=0 && fornas=='N' && batasan.length!=0){
							e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas! <br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(fda!=""&& stok<=0 && batasan.length!=0){
							e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(fda!="" && fornas=='N' && batasan.length!=0){
							e('warningO').innerHTML='FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas! <br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(stok<=0 && fornas=='N' && batasan.length!=0){
							e('warningO').innerHTML='Stok Obat Habis! <br/> Obat Ini Bukan Termasuk Obat Fornas! <br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(stok<=0  && batasan.length!=0){
							e('warningO').innerHTML='Stok Obat Habis!<br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(fda!="" && batasan.length!=0){
							e('warningO').innerHTML='FDA : '+fda+'<br/>'+batasan;
								setTimeout(function(){$('#dObat').focus();},10);
						}else if(fornas=='N' && batasan.length!=0){
							e('warningO').innerHTML='Obat Ini Bukan Termasuk Obat Fornas!<br/>'+batasan;
								setTimeout(function(){$('#dObat').focus();},10);
						}else if(fda!="" && stok<=0 && fornas=='N'){
							e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas!';
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(fda!=""&& stok<=0){
							e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda;
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(fda!="" && fornas=='N'){
							e('warningO').innerHTML='FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas!';
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(stok<=0 && fornas=='N'){
							e('warningO').innerHTML='Stok Obat Habis! <br/> Obat Ini Bukan Termasuk Obat Fornas!';
								setTimeout(function(){$("#dObat").focus();},10);
						}else if(stok<=0){
							e('warningO').innerHTML='Stok Obat Habis!';
								setTimeout(function(){$("#dObat").focus();},10); 
						}else if(fda!=""){
							e('warningO').innerHTML='FDA : '+fda;
								setTimeout(function(){$('#dObat').focus();},10); 
						}else if(fornas=='N'){
							e('warningO').innerHTML='Obat Ini Bukan Termasuk Obat Fornas!';
								setTimeout(function(){$('#dObat').focus();},10); 
						}
					}else{
						if(fda!=""&& stok<=0 && batasan.length!=0){
							e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10); 
						}else if(stok<=0  && batasan.length!=0){
							e('warningO').innerHTML='Stok Obat Habis!<br/>'+batasan;
								setTimeout(function(){$("#dObat").focus();},10); 
						}else if(fda!="" && batasan.length!=0){
							e('warningO').innerHTML='FDA : '+fda+'<br/>'+batasan;
								setTimeout(function(){$('#dObat').focus();},10); 
						}else if(fda!=""&& stok<=0){
							e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda;
								setTimeout(function(){$("#dObat").focus();},10); 
						}else if(stok<=0){
							e('warningO').innerHTML='Stok Obat Habis!';
								setTimeout(function(){$("#dObat").focus();},10); 
						}else if(fda!=""){
							e('warningO').innerHTML='FDA : '+fda;
								setTimeout(function(){$('#dObat').focus();},10);
						}
					}
					e('warningO').style.cssText='width:450px; border:1px solid;overflow:auto;padding-left:5px;';
					$("#dObat").focus();
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						var namaObat=this.id;
						$('#addObatModal').modal('hide');
						e("obat-id1").value=this.cells[0].id;
						e("nObat").value=namaObat;
						e("idSedian1").value=this.cells[1].id;
						e("idSatuan1").value=this.cells[2].id;
						e("sedian1").value=this.cells[1].innerHTML;
						e("satuan1").value=this.cells[2].innerHTML;
						e("pecah1").value=this.cells[6].innerHTML;
						e("routeObat").value=this.cells[9].innerHTML;
						var fda=this.cells[5].innerHTML;
						var stok=this.cells[3].innerHTML;
						var fornas=this.cells[7].innerHTML;
						var batasan=this.cells[8].innerHTML;
						if(idRekanan=='BPJS'){
							if(fda!="" && stok<=0 && fornas=='N' && batasan.length!=0){
								e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas! <br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!=""&& stok<=0 && batasan.length!=0){
								e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!="" && fornas=='N' && batasan.length!=0){
								e('warningO').innerHTML='FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas! <br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(stok<=0 && fornas=='N' && batasan.length!=0){
								e('warningO').innerHTML='Stok Obat Habis! <br/> Obat Ini Bukan Termasuk Obat Fornas! <br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(stok<=0  && batasan.length!=0){
								e('warningO').innerHTML='Stok Obat Habis!<br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!="" && batasan.length!=0){
								e('warningO').innerHTML='FDA : '+fda+'<br/>'+batasan;
									setTimeout(function(){$('#dObat').focus();},10); 
							}else if(fornas=='N' && batasan.length!=0){
								e('warningO').innerHTML='Obat Ini Bukan Termasuk Obat Fornas!<br/>'+batasan;
									setTimeout(function(){$('#dObat').focus();},10); 
							}else if(fda!="" && stok<=0 && fornas=='N'){
								e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas!';
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!=""&& stok<=0){
								e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!="" && fornas=='N'){
								e('warningO').innerHTML='FDA : '+fda+'<br/> Obat Ini Bukan Termasuk Obat Fornas!';
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(stok<=0 && fornas=='N'){
								e('warningO').innerHTML='Stok Obat Habis! <br/> Obat Ini Bukan Termasuk Obat Fornas!';
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(stok<=0){
								e('warningO').innerHTML='Stok Obat Habis!';
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!=""){
								e('warningO').innerHTML='FDA : '+fda;
									setTimeout(function(){$('#dObat').focus();},10); 
							}else if(fornas=='N'){
								e('warningO').innerHTML='Obat Ini Bukan Termasuk Obat Fornas!';
									setTimeout(function(){$('#dObat').focus();},10); 
							}
						}else{
							if(fda!=""&& stok<=0 && batasan.length!=0){
								e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda+'<br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(stok<=0  && batasan.length!=0){
								e('warningO').innerHTML='Stok Obat Habis!<br/>'+batasan;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!="" && batasan.length!=0){
								e('warningO').innerHTML='FDA : '+fda+'<br/>'+batasan;
									setTimeout(function(){$('#dObat').focus();},10); 
							}else if(fda!=""&& stok<=0){
								e('warningO').innerHTML='Stok Obat Habis! <br/> FDA : '+fda;
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(stok<=0){
								e('warningO').innerHTML='Stok Obat Habis!';
									setTimeout(function(){$("#dObat").focus();},10); 
							}else if(fda!=""){
								e('warningO').innerHTML='FDA : '+fda;
									setTimeout(function(){$('#dObat').focus();},10);
							}
						}
						e('warningO').style.cssText='width:450px; border:1px solid;overflow:auto;padding-left:5px;';
						$("#dObat").focus();
					}
				}
				var td = c("td", tr,null,h.OBAT_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick()>"+h.NAMA+"</a>";
				td.setAttribute('title',h.NAMA);
				td.style.cssText='text-align:left';
				
				if(h.SEDIAAN_ID!=null){
					td = c("td", tr,null,h.SEDIAAN_ID);
					td.innerHTML=h.SEDIAAN;
					td.setAttribute('title',h.SEDIAAN);
				}else{
					td = c("td", tr);
					td.innerHTML="";
				}
				td.style.display='none';
				
				if(h.SATUAN_KECIL_ID!=null){
					td = c("td", tr,null,h.SATUAN_KECIL_ID);
					td.innerHTML=h.SATUAN;
					td.setAttribute('title',h.SATUAN);
				}else{
					td = c("td", tr);
					td.innerHTML="";
				}
				
				td = c("td", tr);
				if(h.STOK!=null){
					td.innerHTML=h.STOK;
					td.setAttribute('title',h.STOK);
				}
				else
					td.innerHTML='0';
				td.style.cssText='text-align:right';
				
				td = c("td", tr);
				if(h.BHN_AKTIF!=null){
					td.innerHTML=h.BHN_AKTIF;
					td.setAttribute('title',h.BHN_AKTIF);
				}else
					td.innerHTML='';
				
				td = c("td", tr);
				td.innerHTML=h.KATEGORI_FDA;
				td.style.display='none';
				
				td = c("td", tr);
				td.innerHTML=h.PECAH_YT;
				td.style.display='none';
				
				td = c("td", tr);
				td.innerHTML=h.OBAT_FORNAS;
				td.style.display='none';
				
				td = c("td", tr);
				td.innerHTML=h.BATASAN_FORNAS;
				td.style.display='none';
				
				td = c("td", tr);
				td.innerHTML=h.ROUTE_ID;
				td.style.display='none';
				
			}
			pilih='#'+prod[0].OBAT_ID;
			jQuery.tableNavigation();
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevPage1');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			var obat=e('nObat').value;
			if(obat.length!=0){
				sumPage=sumPage-32;
				searchObat(obat,sumPage);
			}
		}
			
		var button=c('button',div,null,'nextPage1');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			var obat=e('nObat').value;
			if(obat.length!=0)
				searchObat(obat,sumPage);
		}
		if(prod.length!=16)
			$('#nextPage1').attr('disabled',true);
		if(sumPage==17)
			$('#prevPage1').attr('disabled',true);
		$('#obat_table').fixheadertable({ 
			colratio	 : [3*col,col,50,3*col],
			//width:cWidth-60,
			height:380
		});
		
		var $rows = $('#obat_table tr');
		$('#bhnaktif1').keyup(function(event) {
			if(event.keyCode==13){
				sumPage=1;
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toUpperCase();
				searchBhn(val,sumPage);
				var button=e('prevPage1');
				button.onclick=function(){
					var obat=e('bhnaktif1').value;
					if(obat.length!=0){
						sumPage=sumPage-32;
						searchBhn(obat,sumPage);
					}
				}
				button=e('nextPage1');
				button.onclick=function(){
					var obat=e('bhnaktif1').value;
					if(obat.length!=0)
						searchBhn(obat,sumPage);
				}
			}
		});
		$('#addObatModal').on('shown.bs.modal', function (){
			$(pilih+' .activation').focus();
		});
		$(pilih+' .activation').focus();
	}
	var resepProses;
	function tabelResep1(prod){
		$('#obatSave').removeAttr('disabled');
		resepDisabled=false;
		resepProses=false;
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.OBAT_ID;
				resep[1]=h.NAMA_OBAT;
				if(h.SEDIAAN_ID!=null){
					resep[2]=h.SEDIAAN_ID;
					resep[3]=h.SEDIAAN;
				}else{
					resep[2]="";
					resep[3]="";
				}
				if(h.SATUAN_ID!=null){
					resep[4]=h.SATUAN_ID;
					resep[5]=h.SATUAN;
				}else{
					resep[4]="";
					resep[5]="";
				}
				var sum="";
				if(h.QTY!=null){
					if(h.QTY.substring(0,1)=='.')
						sum=0+h.QTY;
					else
					sum=h.QTY;
				}
				resep[6]=sum;
				resep[7]=h.CATATAN;
				resep[8]=h.SIGNA_ID;
				resep[9]=h.SIGNA_NAMA;
				resep[10]=h.SIGNA_DOKTER;
				resep[11]=h.URUT;
				resep[12]=h.TYPE;
				resep[13]=h.HEADER;
				resep[14]=h.NAMA_RACIKAN;
				resep[15]=h.FREE_DOSIS;
				resep[16]=h.ROUTE_ID;
				resep[17]=h.ROUTE;
				obatResep.push(resep);
				if(h.VALID!=null || h.VALID1!=null || doneP=='1_done'){
					$('#obatSave').attr('disabled',true);
					$('#formObat input').attr('disabled',true);
					$('#formObat select').attr('disabled',true);
					$('#formObat button').attr('disabled',true);
					$('#racikanO').attr('disabled',true);
					$('#FOSave').attr('disabled',true);
					$('#HRSave').attr('disabled',true);
					if(h.VALID1!=null)
						resepProses=true;
					resepDisabled=true;
				}
			}
			if(!resepProses)
				insertLock();
			if(resepProses)
				bootbox.alert('Resep Sedang Divalidasi Oleh Farmasi!');
			tabelResep(obatResep);
		}
	}
	function tabelResep(prod){
		var content=e("tabel_obatBody");
		content.innerHTML="";
		var div=c('div',content,null,'opnTab');
		//var cWidth=(bodyWidth*0.66)-40;
		//content.style.width=cWidth+'px';
		
		var dHeight=bodyHeight*0.75;
		var col=(bodyWidth-180)/8;
	
		var divtable = c("div",content,"table-content");
		//divtable.style.width=bodyWidth*0.95+'px';
		var table = c("table",divtable,"table table-condensed table-hover table-striped","resep_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		
		var th = c("th", tr);
		th.innerHTML="RACIKAN";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="DOSIS";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		th.innerHTML="SIGNA";
		
		th = c("th", tr);
		th.innerHTML="CATATAN";
		
		th = c("th", tr);
		th.innerHTML="ROUTE";
		
		th = c("th", tr);
		th.innerHTML="URUT";
		
		if(!resepDisabled)
			th = c("th", tr);	
		var tbody=c("tbody",table);
		if(prod.length!=0){
			lengthResep=prod.length;
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trObat');
				if(h[12]=='00'||h[12]=='04'){
					if(!resepDisabled){
					  tr.ondblclick=function(){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						sOUrut=this.id.split("_")[0];
						e('addO').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
						var cat=e("cattobatBody");
						cat.innerHTML="";
						var area=c("textArea",cat,null,"areaobatBody");
						var catObat=this.cells[6].innerHTML;
						area.setAttribute('disabled',true);
						if(catObat!=null)
							area.value=catObat;
						else
							area.value="";
						$('#nObat').focus();
					 }
					}else{
						tr.ondblclick=function(){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						var cat=e("cattobatBody");
						cat.innerHTML="";
						var area=c("textArea",cat,null,"areaobatBody");
						var catObat=this.cells[6].innerHTML;
						area.setAttribute('disabled',true);
						if(catObat!=null)
							area.value=catObat;
						else
							area.value="";
					 }
					}
					tr.style.background='#b0d9d7';
					var td = c("td", tr,null,'tdRacikO_'+i);
					var radio=c("input",td,null,"racikO_"+i);
					radio.setAttribute("name","typeO"+i);
					radio.setAttribute("type","checkbox");
					if(h[12]=='00'){
						$("#racikO_"+i).prop("checked", false);
					}else{
						$("#racikO_"+i).prop("checked", true);
					}
					$("#racikO_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#racikO_"+no).prop("checked", true);
							obatResep[no][12]='04';
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#racikO_"+no).prop("checked", false);
							obatResep[no][12]='00';
						}
					});
					if(resepDisabled)
						radio.setAttribute('disabled',true);
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[1];
					div.setAttribute('title',h[1]);
					
					/*td = c("td", tr);
					td.innerHTML=h[3];
					td.setAttribute('title',h[3]);*/
					
					td = c("td", tr);
					td.innerHTML=h[5];
					td.setAttribute('title',h[5]);
					
					td = c("td", tr,null,i+'_dosis');
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,'tKanan',i+'_jum');
					div=c('div',td,'tKanan');
					if(h[6]!=null){
						div.innerHTML=h[6];
						div.setAttribute('title',h[6]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,null,i+'_signa');
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr,null,i+'_cat');
					td.innerHTML=h[7];
					td = c("td", tr,null,i+'_route');
					td.innerHTML=h[17];
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				  if(!resepDisabled){
					td = c("td", tr);
					var button=c('button',td,null,i+'_deleteO');
					button.setAttribute('type','button');
					button.innerHTML='Delete';
					button.onclick=function(){
						var id=this.id;
						noDelete=id.split('_')[0];
						obatResep.splice(noDelete,1);
						tabelResep(obatResep);
					}
					var button=c('button',td,null,i+'_editO');
					button.setAttribute('type','button');
					button.innerHTML='Edit';
					button.onclick=function(){
						var id=this.id.split('_')[0];
						changeDosis(id);
						changeRoute(id);
					}
				  }
				}else if(h[12]=='01'){
					tr.style.cssText='background:#666;color:#fff;';
					var td = c("td", tr,null,'tdRacikO_'+i);
					td.innerHTML='*';
					
					td = c("td", tr);
					//td.setAttribute('colspan',5);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[1];
					div.setAttribute('title',h[1]);
					
					td = c("td", tr);
					td.innerHTML=h[5];
					td.setAttribute('title',h[5]);
					
					td = c("td", tr,null,i+'_dosis');
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,'tKanan',i+'_jum');
					div=c('div',td,'tKanan');
					if(h[6]!=null){
						div.innerHTML=h[6];
						div.setAttribute('title',h[6]);
					}else
						td.innerHTML="";
					td = c("td", tr,null,i+'_signa');
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr,null,i+'_cat');
					td.innerHTML=h[7];
					td = c("td", tr,null,i+'_route');
					td.innerHTML=h[17];
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				  if(doneP!='1_done'){
					td = c("td", tr);
					var button=c('button',td,null,i+'_extraO');
					button.setAttribute('type','button');
					button.style.color='black';
					button.innerHTML='Ekstrak';
					button.onclick=function(){
						var id=this.id;
						noExtra=id.split('_')[0];
						var header=obatResep[noExtra][0];
						obatResep.splice(noExtra,1);
						obatResep.splice(noExtra,1);
						for(var i=0;i<obatResep.length;i++){
							if(obatResep[i][13]==header){
								obatResep[i][12]='00'
								obatResep[i][13]='0';
							}	
						}
						tabelResep(obatResep);
					}
					var button=c('button',td,null,i+'_editO');
					button.setAttribute('type','button');
					button.innerHTML='Edit';
					button.style.color='black';
					button.onclick=function(){
						var id=this.id.split('_')[0];
						changeDosis(id);
						changeRoute(id);
					}
				  }
				}else if(h[12]=='02'){
					var td = c("td", tr,null,'tdRacikO_'+i);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					td.setAttribute('colspan',7);
					div.innerHTML=h[1];
					div.setAttribute('title',h[1]);
		
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}else if(h[12]=='03'){
					var td = c("td", tr,null,'tdRacikO_'+i);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[1];
					div.setAttribute('title',h[1]);
					/*td = c("td", tr);
					td.innerHTML=h[3];
					td.setAttribute('title',h[3]);*/
					
					td = c("td", tr);
					td.innerHTML=h[5];
					td.setAttribute('title',h[5]);
					
					td = c("td", tr,null,i+'_dosis');
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,'tKanan',i+'_jum');
					div=c('div',td,'tKanan');
					if(h[6]!=null){
						div.innerHTML=h[6];
						div.setAttribute('title',h[6]);
					}else
						td.innerHTML="";
					td = c("td", tr);
					/*if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}*/
					td = c("td", tr);
					td.innerHTML='';
					td = c("td", tr);
					td.innerHTML='';
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					if(doneP!='1_done'){
						td = c("td", tr);
						var button=c('button',td,null,i+'_editO');
						button.setAttribute('type','button');
						button.innerHTML='Edit';
						button.onclick=function(){
							var id=this.id.split('_')[0];
							changeDosis(id);
						}
					}
				}
			}
		}
		
		if(!resepDisabled){
			$('#resep_table').fixheadertable({ 
				colratio	 : [60,200,100,150,60,150,150,120,40,90],
				width:1147,
				height:(dHeight/2)-55,
			});
		}else{
			$('#resep_table').fixheadertable({ 
				colratio	 : [60,200,100,150,60,150,150,120,40],
				width:1047,
				height:(dHeight/2)-55,
			});
		}
	}
	function changeDosis(urut){
		var h=obatResep[urut];
		var dosis=e(urut+'_dosis');
		dosis.innerHTML="";
		dosis.style.color='black';
		var jumlah=e(urut+'_jum');
		jumlah.innerHTML="";
		jumlah.style.color='black';
		if(h[12]!='03'){
			var sig=e(urut+'_signa');
			sig.innerHTML="";
			sig.style.color='black';
		}
		
		if(h[12]!='01'){
			var input=c('input',dosis,null,'dosis_'+urut);
			input.setAttribute('type','text');
			if(h[15])
				input.value=h[15];
			else
				input.value="";
		}
		input=c('input',jumlah,'tKanan','jum_'+urut);
		input.setAttribute('type','text');
		if(h[6])
			input.value=h[6];
		else
			input.value="";
		
		input=c('input',sig,null,'signa_'+urut);
		input.setAttribute('type','text');
		if(h[8]){
			input.value=h[9];
		}else{
			input.value=h[10];
		}
		
		if(h[12]=='03'){
			var br=c('br',jumlah);
			var button=c('button',jumlah,null,urut+'_btnobt');
		}else{
			var br=c('br',sig);
			var button=c('button',sig,null,urut+'_btnobt');
		}
		button.setAttribute('type','button');
		button.innerHTML='Simpan';
		
		button.onclick=function(){
			var idBtn=this.id.split("_")[0];
			obatResep[idBtn][6]=e('jum_'+idBtn).value;
			if(h[12]!='03')
				obatResep[idBtn][10]=e('signa_'+idBtn).value;
			if(obatResep[idBtn][12]!='01')
				obatResep[idBtn][15]=e('dosis_'+idBtn).value;
			
			var jumlah=e(idBtn+'_jum');
			jumlah.innerHTML="";
			var div=c('div',jumlah,'tKanan');
			if(obatResep[idBtn][6]!=""){
				div.innerHTML=obatResep[idBtn][6];
				div.setAttribute('title',obatResep[idBtn][6]);
			}else{
				div.innerHTML="";	
				div.setAttribute('title','');
			}
			var dosis=e(idBtn+'_dosis');
			dosis.innerHTML="";
			if(obatResep[idBtn][15]!=""){
				dosis.innerHTML=obatResep[idBtn][15];
				dosis.setAttribute('title',obatResep[idBtn][15]);
			}else{
				dosis.innerHTML="";	
				dosis.setAttribute('title','');
			}
			if(obatResep[idBtn][12]!='03'){
				var sign=e(idBtn+'_signa');
				sign.innerHTML="";
				if(obatResep[idBtn][10]!=""){
					sign.innerHTML=obatResep[idBtn][10];
					sign.setAttribute('title',obatResep[idBtn][10]);
					obatResep[idBtn][8]="";
					obatResep[idBtn][9]="";
				}else{
					sign.innerHTML="";	
					sign.setAttribute('title','');
				}
			}
			if(obatResep[idBtn][12]=='00' ||obatResep[idBtn][12]=='01' ||obatResep[idBtn][12]=='04'){
				obatResep[idBtn][7]=e('cat_'+idBtn).value;
				obatResep[idBtn][16]=e('route_'+idBtn).value;
				obatResep[idBtn][17]=$("#route_"+idBtn+" option:selected").html();
				var cat=e(idBtn+'_cat');
				cat.innerHTML="";
				if(obatResep[idBtn][7]!=""){
					cat.innerHTML=obatResep[idBtn][7];
					cat.setAttribute('title',obatResep[idBtn][7]);
				}else{
					cat.innerHTML="";	
					cat.setAttribute('title','');
				}
				var route=e(idBtn+'_route');
				route.innerHTML="";
				if(obatResep[idBtn][16]!=""){
					route.innerHTML=obatResep[idBtn][17];
					route.setAttribute('title',obatResep[idBtn][17]);
				}else{
					route.innerHTML="";	
					route.setAttribute('title','');
				}
			}
			if(obatResep[idBtn][12]=='01'){
				jumlah.style.color='#fff';
				sign.style.color='#fff';
			}
		}
	}
	function changeRoute(urut){
		var h=obatResep[urut];
		var cat=e(urut+'_cat');
		cat.innerHTML="";
		cat.style.color='black';
		var route=e(urut+'_route');
		route.innerHTML="";
		route.style.color='black';
		
		var input=c('input',cat,null,'cat_'+urut);
		input.setAttribute('type','text');
		if(h[7])
			input.value=h[7];
		else
			input.value="";
		var select=c('select',route,null,'route_'+urut);
		isiRoute1('route_'+urut);
		if(h[16])
			select.value=h[16];
	}
	function addObatToResep(){
		var resep2=[];
		resep2[0]=e("obat-id1").value;
		if(resep2[0]==""||resep2[0]==null){
			bootbox.alert("Pilih Obat!",function(){
				setTimeout(function(){$("#nObat").focus();},10);
			});
			return;
		}
		var obat=e("nObat").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Obat!",function(){
				setTimeout(function(){$("#nObat").focus();},10);
			});
			return;
		}
		resep2[1]=obat;
		var idKemasan=e("idSedian1").value;
		resep2[2]=idKemasan;
		var kemasan=e("sedian1").value;
		resep2[3]=kemasan;
		var idSatuan=e("idSatuan1").value;
		resep2[4]=idSatuan;
		var satuan=e("satuan1").value;
		resep2[5]=satuan;
		var pecah=e("pecah1").value;
		var dosis=e("dObat").value;
		var qty=e("jObat").value;var iNum;
		var iNum;
		if(qty!=""){
			if(pecah=='Y')
				iNum=isNumber(qty);
			else
				iNum=isNumber1(qty);
			
		}else
			iNum=1;
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$("#jObat").focus();},10);
			});
			return;
		}
		resep2[6]=qty;
	
		var cat=e("catObat").value;
		resep2[7]=cat;
		var sid=e("signaO");
		var idSigna="";var signa="";
		if(sid){
			idSigna=sid.value;
			signa=$("#signaO option:selected").html();
		}
		var dok=e("signa_dokter1");
		var sDokter="";
		if(dok)
			sDokter=dok.value;
		resep2[8]=idSigna;
		resep2[9]=signa;
		resep2[10]=sDokter;
		resep2[12]='00';
		resep2[13]='0';
		resep2[14]='';
		resep2[15]=dosis;
		var idRoute=e("routeObat").value;
		var route=$("#routeObat option:selected").html();
		resep2[16]=idRoute;
		resep2[17]=route;
		if(sOUrut!=null){
			obatResep.splice(sOUrut,0,resep2);
			e('addO').innerHTML='<span class="glyphicon glyphicon-plus"></span> Tambah';
		}else
			obatResep.push(resep2);
		e("formObat").reset();
		$('#nObat').focus();
		tabelResep(obatResep);
		sOUrut=null;
		e('warningO').style.cssText='';
		e('warningO').innerHTML='';
		
}
	function getKodeRacik(){
		var kode='RA'+idTransCo.substring(2)+moment().format('mmss');
		noRacik=eval(noRacik)+1;
		return kode;
	}
	var racik=[];
	function addRacikToResep(){
		racik=[];
		var obat=e("nRacik").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Nama Racik!",function(){
				setTimeout(function(){$("#nRacik").focus();},10);
			});
			return;
		}
		var qty=e("jRacik").value;
		var iNum=isNumber(qty);
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$("#jRacik").focus();},10);
			});
			return;
		}
		var idRacik=getKodeRacik();
		var sid=e("signaO2");
		var idSigna="";var signa="";
		if(sid){
			idSigna=sid.value;
			signa=$("#signaO2 option:selected").html();
		}
		var dok=e("signa_dokter3");
		var sDokter="";
		if(dok)
			sDokter=dok.value;
		var cat=e("catatanRacik").value;
		var idRoute=e("routeObatRacik").value;
		var route=$("#routeObatRacik option:selected").html();
		for(var i=0;i<isiRa.length;i++){
			var n=isiRa[i];
			obatResep[n][8]=idSigna;
			obatResep[n][9]=signa;
			obatResep[n][10]=sDokter;
			obatResep[n][12]='03';
			obatResep[n][13]=idRacik;
			obatResep[n][16]=idRoute;
			obatResep[n][17]=route;
			racik.push(obatResep[n]);
		}
		for(var i=isiRa.length-1;i>=0;i--)
			obatResep.splice(isiRa[i],1);
		
		for(var i=isiRa.length-1;i>=0;i--)
			obatResep.splice(isiRa[0],0,racik[i]);
		
		var resep3=[];
		var no=e("bRacik").value;
		var nomor=no.split('_')[0];
		resep3[0]=bungkus[nomor][0];
		resep3[1]=bungkus[nomor][1];
		resep3[2]=bungkus[nomor][2];
		resep3[3]=bungkus[nomor][3];
		resep3[4]=bungkus[nomor][4];
		resep3[5]=bungkus[nomor][5];
		resep3[6]=qty;
		resep3[8]=idSigna;
		resep3[9]=signa;
		resep3[10]=sDokter;
		resep3[12]='02';
		resep3[13]=idRacik;
		resep3[15]="";
		resep3[16]="";
		resep3[17]="";
		sOUrut=isiRa[0];
		obatResep.splice(sOUrut,0,resep3);
		
		var resep2=[];
		resep2[0]=idRacik;
		resep2[1]=obat;
		resep2[2]=bungkus[nomor][2];
		resep2[3]=bungkus[nomor][3];
		resep2[4]=bungkus[nomor][4];
		resep2[5]=bungkus[nomor][5];
		resep2[6]=qty;
		resep2[7]=cat;
		resep2[8]=idSigna;
		resep2[9]=signa;
		resep2[10]=sDokter;
		resep2[12]='01';
		resep2[13]='0';
		resep2[14]=obat;
		resep2[15]="";
		resep2[16]=idRoute;
		resep2[17]=route;
		obatResep.splice(sOUrut,0,resep2);
		$('#nObat').focus();
		$('#addRacikanModal').modal('hide');
		e('formRacik').reset();
		sOUrut=null;
		tabelResep(obatResep);
}

	function getTransR(){
		if(idTransCo==null)
			var transCo=0;
		else
			var transCo=idTransCo;
		$.ajax({
			url :base_url+'index.php/clinic_controller/sejarahTransResep',
			type : "post",	
			data : {idPasien:idPasien,idTransCo:transCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++)
						transResep(prod[i].TRANS_CO);
				}					
			},error:function(o){
			}
		});
	}
	function transResep(transCo){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTransResep',
			type : "post",	
			data : {idTransCo1:transCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var h=prod[i];
						var trans=[];
						trans[0]=h.TANGGAL;
						trans[1]=h.NAMA_OBAT;
						trans[2]=h.QTY;
						trans[3]=h.TYPE;
						hisResep1.push(trans);
					}
				}					
			},error:function(o){
			}
		});
	}
	function isiTransR(prod){
		var content=e("history_resep");
		content.innerHTML="";
		
		var dHeight=bodyHeight*0.75;
		var divtable = c("div",content,"table-content");
		var div = c("div",divtable,"title1");
		div.innerHTML="<a class='btn btn-xs' id='clsTab'  title='Minimize' href='javascript:clsTab()'><span class='glyphicon glyphicon-fast-backward'></span></a>Transaksi Resep ";
		var table = c("table",divtable,"table table-condensed table-hover table-striped","trans_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		
		var th = c("th", tr);
		th.innerHTML="TANGGAL";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_tra');
				if(h[3]=='00'||h[3]=='04'){
					tr.style.background='#b0c9d7';

					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[0];
					div.setAttribute('title',h[0]);
					
					td = c("td", tr);
					td.innerHTML=h[1];
					td.setAttribute('title',h[1]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
				}else if(h[3]=='01'){
					tr.style.background='#FF007F';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[0];
					div.setAttribute('title',h[0]);
					
					td = c("td", tr);
					td.innerHTML=h[1];
					td.setAttribute('title',h[1]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
				}else if(h[3]=='02'||h[3]=='03'){
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[0];
					div.setAttribute('title',h[0]);
					
					td = c("td", tr);
					td.innerHTML=h[1];
					td.setAttribute('title',h[1]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
				}
			}
		}
		$('#trans_table').fixheadertable({ 
			colratio : [80,150,80],
			width:335,
			height:(dHeight/2)-55,
		});
		
	}
	
	function labBody(prod){
		labDisabled=false;
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var lab=[];
				lab[0]=h.COMP_ID;
				lab[1]=h.JENIS;
				lab[2]=h.LABEL;
				lab[3]=h.CAPTION;
				lab[4]=h.POSX;
				lab[5]=h.POSY;
				lab[6]=h.HEIGHT;
				lab[7]=h.WIDTH;
				lab[8]=false;
				lab[9]=h.ADA_CITO;
				if(lab[9]=='C')
					lab[10]='Y';
				else
					lab[10]='N';
				lab[12]=h.HARGA;
				labPil.push(lab);
			}
		}
		var content=e("tabel_labBody");
		content.innerHTML="";
		pHeight=bodyHeight*0.75;
		content.style.height=((pHeight/2)+70)+"px";
	
		var div=c("div",content);
		var ul=c("ul",div,"nav nav-tabs nav-justified");
		var li=c("li",ul,"active","lab1Li");
		li.innerHTML="<a href='#lab1-vr' data-toggle='tab'>Form Permintaan (Check Box)</a>";
		var li=c("li",ul,null,"lab2Li");
		li.innerHTML="<a href='#lab2-vr' data-toggle='tab'>Form Permintaan (Text)</a>";
		
		var div=c("div",content);
		var div1=c("div",div,"tab-content");
		div=c("div",div1,"tab-pane active","lab1-vr");
		div=c("div",div1,"tab-pane ","lab2-vr");
		
		labBody1();
		$("#lab1Li").click(function(){
			labBody1();
		});
		$("#lab2Li").click(function(){
			labBody2();
		});
		
	
	}
	var labDisabled=false;
	function tabelLab1(prod){
		$('#labSave').removeAttr('disabled');
		$('#arealabBody').removeAttr('disabled');
		labDisabled=false;
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var noLab=h.NOMOR;
				labPil[noLab][8]=true;
				labPil[noLab][10]=h.CITO;
				labPil[noLab][11]='old';
				if(idRekanan=='BPJS'){
					if(h.SAMPEL!=null || doneP=='1_done'){
						$('#labSave').attr('disabled',true);
						$('#arealabBody').attr('disabled',true);
						labDisabled=true;
					}
				}else{
					if(h.SAMPEL!=null || h.TRANS_BAYAR_ID!=null || doneP=='1_done'){
						$('#labSave').attr('disabled',true);
						$('#arealabBody').attr('disabled',true);
						labDisabled=true;
					}
				}
			}
			if(prod[0].CATATAN!=null)
				e('arealabBody').innerHTML=prod[0].CATATAN;
			else
				e('arealabBody').innerHTML="";
		}
		var content=e('lab1-vr');
		if(content)
			labBody1();
		var content1=e('lab2-vr');
		if(content1)
			labBody2();
	}
	function labBody1(){
		var content=e("lab1-vr");
		content.innerHTML="";
		var content1=e("tabel_labBody");
		cHeight=content1.offsetHeight-28;
		
		div=c("div",content,null,"checkLab");
		cWidth=(bodyWidth*0.92);
		div.style.cssText="position:relative;height:"+cHeight+"px;";
		var div1=c("div",div);
		
		/*var title=c('div',div1,'title1');
		title.innerHTML='CITO';
		title.style.cssText="position:absolute; height:25px; text-align:center; font-Weight:bold; font-size:18px;top:1500px;width:"+cWidth+"px;";
		title=c('div',div1,'title1');
		title.innerHTML='Rujukan Luar';
		title.style.cssText="position:absolute; height:25px; text-align:center; font-Weight:bold; font-size:18px;top:2000px;width:"+cWidth+"px;";
		*/

		if(labPil.length!=0){
			for(var i=0;i<labPil.length;i++){
				var h=labPil[i];
				var div=c("div",div1);
				var wi=eval(h[7]);
				div.style.cssText="position:absolute; top:"+h[5]+"px;left:"+h[4]+"px;height:"+h[6]+"px;width:"+wi+"px;";
				if(h[1]==2){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="blue";
				}else if(h[1]==5){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="red";
				}else{
					var check=c("input",div,null,"checkLab_"+i);
					check.setAttribute("type","checkbox");
					check.setAttribute('title','Rp. '+toRupiah(h[12]));
					if(h[8]){
						$("#checkLab_"+i).prop("checked", true);
					}else{
						$("#checkLab_"+i).prop("checked", false);
					}
					$("#checkLab_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							labPil[no][8]=true;
						}else if($(this).is(":not(:checked)")){
							//$(this).attr("checked","false");
							var no=this.id.split("_")[1];
							$("#cito_"+no).prop("checked", false);
							labPil[no][8]=false;
							labPil[no][10]='N';
						}
					});
					if(labDisabled)
						check.setAttribute('disabled',true);
					label=c("label",div);
					label.innerHTML=h[3];
					label.setAttribute('title','Rp. '+toRupiah(h[12]));
					if(h[9]=='Y'){
						label.style.width=(h[7]-120)+"px";
						check=c("input",div,null,"cito_"+i);
						check.setAttribute("type","checkbox");
						
						label=c("label",div);
						label.innerHTML="Cito";
						label.style.width="20px";
						if(h[10]=='Y'){
							$("#cito_"+i).prop("checked", true);
						}else{
							$("#cito_"+i).prop("checked", false);
						}
						$("#cito_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								$("#checkLab_"+no).prop("checked", true);
								labPil[no][10]='Y';
								labPil[no][8]=true;
							}else if($(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								labPil[no][10]='N';
							}
						});
						if(labDisabled)
							check.setAttribute('disabled',true);
					}
				}
			}
		}
	}
	function labBody2(){
		var content=e("lab2-vr");
		content.innerHTML="";
		var pilih="";
		var content1=e("tabel_labBody");
		cHeight=content1.offsetHeight-28;
		var div=c("div",content);
		div.style.cssText="height:"+cHeight+"px;";
		var div1=c("div",div,"col-sm-5");
		var title=c("div",div1," title1");
		title.innerHTML="Daftar Permintaan";
		
		var divtable = c("div",div1,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","lab1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TEST";
		
		th = c("th", tr);
		th.innerHTML="HARGA";	
		var tbody=c("tbody",table);
		if(labPil.length!=0){
			for (var i=0;i<labPil.length;i++) {
				var h = labPil[i];
				if(h[8]){
					tr = c("tr", tbody,null,"kdLab_"+i);
				  if(!labDisabled){
					tr.ondblclick=function(){
						var no=this.id.split("_")[1];
						labPil[no][8]=false;
						labPil[no][10]='N';
						labBody2();
					}
					tr.onkeydown=function(event){
						if(event.keyCode==13){
							var no=this.id.split("_")[1];
							labPil[no][8]=false;
							labPil[no][10]='N';
							labBody2();
						}
					}
				  }
					var td = c("td", tr);
					td.innerHTML="<a class='activation' href=javascript:myClick('kdLab_"+i+"') >"+h[3]+"</a>";
					td.setAttribute('title',h[3]);
					td = c("td", tr);
					var div2=c('div',td,'tKanan');
					div2.innerHTML='Rp. '+toRupiah(h[12]);
					div2.setAttribute('title','Rp. '+toRupiah(h[12]));
				}
			}
		}
		$('#lab1_table').fixheadertable({
			colratio:[295,80],
			width:400,
			height:cHeight-49,
			zebra:true
		});
		
		div1=c("div",div,"col-sm-7");
		title=c("div",div1," title1");
		title.innerHTML="Permintaan Pemeriksaan";
		
		var label=c("label",div1);
		label.innerHTML="Nama Pemeriksaan";
		var input=c("input",div1,null,"kodeLab");
		var divtable = c("div",div1,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","lab2_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TEST";
		
		th = c("th", tr);
		th.innerHTML="HARGA";
		var tbody=c("tbody",table);
		if(labPil.length!=0){
			for (var i=0;i<labPil.length;i++) {
				var h = labPil[i];
				if(h[1]==5||h[1]==2||h[1]==6){					
				}else{
					if(!h[8]){
						tr = c("tr", tbody,null,i+"_kdLab");
					  if(!labDisabled){
						tr.ondblclick=function(){
							var no=this.id.split("_")[0];
							labPil[no][8]=true;
							labBody2();
						}
						tr.onkeydown=function(event){
							if(event.keyCode==13){
								var no=this.id.split("_")[0];
								labPil[no][8]=true;
								labBody2();
							}
						}
					  }
					  
						var td = c("td", tr);
						td.innerHTML="<a class='activation' href=javascript:myClick('"+i+"_kdLab') >"+h[3]+"</a>";
						td.setAttribute('title',h[3]);
						
						td = c("td", tr);
						var div2=c('div',td,'tKanan');
						div2.innerHTML='Rp. '+toRupiah(h[12]);
						div2.setAttribute('title','Rp. '+toRupiah(h[12]));
					}
				}
			}
		}
		jQuery.tableNavigation();
		$('#lab2_table').fixheadertable({
			colratio:[300,80],
			width:405,
			height:cHeight-78
		});
		var $rows = $('#lab2_table tr');
		$('#kodeLab').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('#labModal').on('shown.bs.modal', function (){
			$('.activation').focus();
		});
	}
	
	function radBody(prod){
		radDisabled=false;
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var rad=[];
				rad[0]=h.COMP_ID;
				rad[1]=h.JENIS;
				//if(h.JENIS==2||h.JENIS==5||h.JENIS==6)
					rad[2]=h.LABEL;
				/*else{
					var ko=h.LABEL.split(".")[0];
					var de=(h.LABEL.split(".")[1]).substring(0,2);
					rad[2]=ko+"."+de;
				}*/
				rad[3]=h.CAPTION;
				rad[4]=h.POSX;
				rad[5]=h.POSY;
				rad[6]=h.HEIGHT;
				rad[7]=h.WIDTH;
				rad[8]=h.ADA_POSISI;
				rad[9]='N';
				rad[10]='N';
				rad[11]=false;
				rad[13]=h.HARGA;
				radPil.push(rad);
			}
		}
		var content=e("tabel_radBody");
		content.innerHTML="";
		pHeight=bodyHeight*0.75;
		content.style.height=((pHeight/2)+70)+"px";
		
		var div=c("div",content);
		var ul=c("ul",div,"nav nav-tabs nav-justified");
		var li=c("li",ul,"active","rad1Li");
		li.innerHTML="<a href='#rad1-vr' data-toggle='tab'>Form Permintaan (Check Box)</a>";
		var li=c("li",ul,null,"rad2Li");
		li.innerHTML="<a href='#rad2-vr' data-toggle='tab'>Form Permintaan (Text)</a>";
		
		var div=c("div",content);
		var div1=c("div",div,"tab-content");
		div=c("div",div1,"tab-pane active","rad1-vr");
		div=c("div",div1,"tab-pane ","rad2-vr");
		
		radBody1();
		$("#rad1Li").click(function(){
			radBody1();
		});
		$("#rad2Li").click(function(){
			radBody2();
		});
		
	}
	var radDisabled=false;
	function tabelRad1(prod){
		$('#radSave').removeAttr('disabled');
		$('#arearadBody').removeAttr('disabled');
		radDisabled=false;
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var noRad=h.NOMOR;
				radPil[noRad][9]=h.KIRI;
				radPil[noRad][10]=h.KANAN;
				radPil[noRad][11]=true;
				radPil[noRad][12]='old';
				if(idRekanan=='BPJS'){
					if(h.SAMPEL!=0 || doneP=='1_done'){
						$('#radSave').attr('disabled',true);
						$('#arearadBody').attr('disabled',true);
						radDisabled=true;
					}
				}else{
					if(h.SAMPEL!=0 || h.TRANS_BAYAR_ID!=null || doneP=='1_done'){
						$('#radSave').attr('disabled',true);
						$('#arearadBody').attr('disabled',true);
						radDisabled=true;
					}
				}
			}
			if(prod[0].CATATAN!=null)
				e('arearadBody').innerHTML=prod[0].CATATAN;
			else
				e('arearadBody').innerHTML="";
		}
		var content=e('rad1-vr');
		if(content)
			radBody1();
		var content1=e('rad2-vr');
		if(content1)
			radBody2();
	}
	function radBody1(){
		var content=e("rad1-vr");
		content.innerHTML="";
		var content1=e("tabel_radBody");
		cHeight=content1.offsetHeight-28;
		div=c("div",content,null,"checkRad");
		div.style.cssText="position:relative;height:"+cHeight+"px;";
		var div1=c("div",div);
		
		if(radPil.length!=0){
			for(var i=0;i<radPil.length;i++){
				var h=radPil[i];
				var div=c("div",div1);
				var wi=eval(h[7]);
				div.style.cssText="position:absolute; top:"+h[5]+"px; left:"+h[4]+"px; height:"+h[6]+"px; width:"+wi+"px;";
				if(h[1]==5||h[1]==2){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="blue";
				}else if(h[1]==6){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="red";	
				}else if(h[1]==0){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="blue";
					div.style.cssText="position:absolute; top:"+h[5]+"px; left:"+h[4]+"px; height:"+h[6]+"px; width:"+wi+"px; text-align:center;";
				}else{
					var check=c("input",div,null,"checkRad_"+i);
					check.setAttribute("type","checkbox");
					check.setAttribute('title','Rp. '+toRupiah(h[13]));
					if(h[11]){
						$("#checkRad_"+i).prop("checked", true);
					}else{
						$("#checkRad_"+i).prop("checked", false);
					}
					$("#checkRad_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								radPil[no][11]=true;
								if(radPil[no][8]=='Y'){
									$("#kiri_"+no).prop("checked", true);
									radPil[no][9]='Y';
									$("#kanan_"+no).prop("checked", true);
									radPil[no][10]='Y';
								}
							}else if($(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								radPil[no][11]=false;
								if(radPil[no][8]=='Y'){
									$("#kiri_"+no).prop("checked", false);
									radPil[no][9]='N';
									$("#kanan_"+no).prop("checked", false);
									radPil[no][10]='N';
								}
							}
						});
						if(radDisabled)
							check.setAttribute('disabled',true);
					label=c("label",div);
					label.innerHTML=h[3];
					label.setAttribute('title','Rp. '+toRupiah(h[13]));
					if(h[8]=='Y'){
						label.style.width=(h[7]-100)+"px";
						check=c("input",div,null,"kiri_"+i);
						check.setAttribute("type","checkbox");
						if(radDisabled)
							check.setAttribute('disabled',true);
						label=c("label",div);
						label.innerHTML="Ki";
						label.style.width="15px";
						check=c("input",div,null,"kanan_"+i);
						check.setAttribute("type","checkbox");
						if(radDisabled)
							check.setAttribute('disabled',true);
						label=c("label",div);
						label.innerHTML="Ka";
						label.style.width="15px";
						if(h[9]=='Y'){
							$("#kiri_"+i).prop("checked", true);
						}else{
							$("#kiri_"+i).prop("checked", false);
						}
						if(h[10]=='Y'){
							$("#kanan_"+i).prop("checked", true);
						}else{
							$("#kanan_"+i).prop("checked", false);
						}
						
						$("#kiri_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								$("#checkRad_"+no).prop("checked", true);
								radPil[no][11]=true;
								radPil[no][9]='Y';
							}else if($(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								radPil[no][9]='N';
							}
						});
						$("#kanan_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								$("#checkRad_"+no).prop("checked", true);
								radPil[no][11]=true;
								radPil[no][10]='Y';
							}else if($(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								radPil[no][10]='N';
							}
						});
					}
				}
			}
		}
	}
	function radBody2(){
		var content=e("rad2-vr");
		content.innerHTML="";
		var pilih="";
		var content1=e("tabel_radBody");
		cHeight=content1.offsetHeight-28;
		var div=c("div",content);
		div.style.cssText="height:"+cHeight+"px;";
		var div1=c("div",div,"col-sm-5");
		var title=c("div",div1," title1");
		title.innerHTML="Daftar Permintaan";
		
		var divtable = c("div",div1,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","rad1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TEST";
		
		th = c("th", tr);
		th.innerHTML="HARGA";
			
		var tbody=c("tbody",table);
		if(radPil.length!=0){
			for (var i=0;i<radPil.length;i++) {
				var h = radPil[i];
				if(h[11]){
					tr = c("tr", tbody,null,"kdRad_"+i);
				  if(!radDisabled){
					tr.ondblclick=function(){
						var no=this.id.split("_")[1];
						radPil[no][11]=false;
						if(radPil[no][8]=='Y'){
							radPil[no][9]='N';
							radPil[no][10]='N';
						}
						radBody2();
					}
					tr.onkeydown=function(event){
						if(event.keyCode==13){
							var no=this.id.split("_")[1];
							radPil[no][11]=false;
							if(radPil[no][8]=='Y'){
								radPil[no][9]='N';
								radPil[no][10]='N';
							}
							radBody2();
						}
					}
				  }
					var td = c("td", tr);
					td.innerHTML="<a class='activation' href=javascript:myClick('_kdRad"+i+"')>"+h[3]+"</a>";
					td.setAttribute('title',h[3]);
					td = c("td", tr);
					var div2=c('div',td,'tKanan');
					div2.innerHTML='Rp. '+toRupiah(h[13]);
					div2.setAttribute('title','Rp. '+toRupiah(h[13]));
				}
			}
		}
		
		$('#rad1_table').fixheadertable({ 
			colratio:[285,90],
			width:400,
			height:cHeight-49,
			zebra:true
		});
		div1=c("div",div,"col-sm-7");
		
		title=c("div",div1," title1");
		title.innerHTML="Permintaan Pemeriksaan";
		
		var label=c("label",div1);
		label.innerHTML="Nama Pemeriksaan";
		var input=c("input",div1,null,"kodeRad");
		var divtable = c("div",div1,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","rad2_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TEST";
		
		th = c("th", tr);
		th.innerHTML="HARGA";

		var tbody=c("tbody",table);
		if(radPil.length!=0){
			for (var i=0;i<radPil.length;i++) {
				var h = radPil[i];
				if(h[1]==5||h[1]==2||h[1]==6||h[1]==0){					
				}else{
					if(!h[11]){
						tr = c("tr", tbody,null,i+"_kdRad");
						if(!radDisabled){
						tr.ondblclick=function(){
							var no=this.id.split("_")[0];
							radPil[no][11]=true;
							if(radPil[no][8]=='Y'){
								radPil[no][9]='Y';
								radPil[no][10]='Y';
							}
							radBody2();
						}
						tr.onkeydown=function(event){
							if(event.keyCode==13){
								var no=this.id.split("_")[0];
								radPil[no][11]=true;
								if(radPil[no][8]=='Y'){
									radPil[no][9]='Y';
									radPil[no][10]='Y';
								}
								radBody2();
							}
						}
					  }
						var td = c("td", tr);
						td.innerHTML="<a class='activation' href=javascript:myClick('"+i+"_kdRad') >"+h[3]+"</a>";
						td.setAttribute('title',h[3]);
						td = c("td", tr);
						var div2=c('div',td,'tKanan');
						div2.innerHTML='Rp. '+toRupiah(h[13]);
						div2.setAttribute('title','Rp. '+toRupiah(h[13]));
					}
				}
			}
		}
		jQuery.tableNavigation();
		$('#rad2_table').fixheadertable({ 
			colratio:[285,90],
			width:400,
			height:cHeight-78,
		});
		var $rows = $('#rad2_table tr');
		$('#kodeRad').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('#radModal').on('shown.bs.modal', function (){
			$('.activation').focus();
		});
	}
	var sAUrut;
	function alkes1(){
		alkesDisabled=false;
		var content=e("alkesBody");
		var form=c('form',content,null,'formAlkes');
		form.setAttribute('action','javascript:addAlkesToResep()');
		var table=c('table',form,null,'tabAlkes');
		var tr=c('tr',table);
		var td=c('td',tr);
		td.innerHTML='Nama Tindakan';
		td.style.width='300px';
		td=c('td',tr);
		td.innerHTML='Jumlah';
		td.style.width='80px';
		td=c('td',tr);
		td.innerHTML='Catatan';
		td.style.width='150px';
		td=c('td',tr);
		td.innerHTML='<button tabindex=44 type="submit" class="btn btn-xs btn-primary" id="addA"><span class="glyphicon glyphicon-plus"></span> Tambah</button>';
		td.setAttribute('rowspan',2);
		td.style.cssText='vertical-align:bottom';
		
		td=c('td',tr);
		td.innerHTML='<input type="text" id="alkes-id1" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="isQty" style="display:none"></input>';
		
		tr=c('tr',table);
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=41 id="nAlkes" required="required"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" style="text-align:right;" tabindex=42 id="jAlkes" required="required"></input>';
		
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=43 id="catAlkes" ></input>';
		$("#nAlkes").keydown(function(event){
			if(event.keyCode==13){
				var nama=this.value.trim();
				if(nama.length>=1){
					sumPage=1;
					$('#addAlkesModal').modal('show');
					selectAlkes(nama,sumPage);
				}else{
					bootbox.alert('Masukan min 1 Karakter!',function(){
						setTimeout(function(){$('#nAlkes').focus(),10});
					});
				}
				
			}
		});
		if(doneP=='1_done'){
			$('#formAlkes input').attr('disabled',true);
			$('#formAlkes button').attr('disabled',true);
			$('#FTSave').attr('disabled',true);
			alkesDisabled=true;
		}else{
			$('#formAlkes input').removeAttr('disabled');
			$('#formAlkes button').removeAttr('disabled');
			$('#FTSave').removeAttr('disabled');
		}
		
	}	
	function tabelAddAlkes(prod){
		var content=e("addAlkesBody");
		content.innerHTML="";
		var pilih="";
		var cWidth=bodyWidth*0.6;
		var cHeight=(bodyHeight*0.6)-23;
		var col=(cWidth-40);
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","alkes1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="HARGA";	
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.NAMA_LAYAN1);
				tr.ondblclick=function(){
					var namaObat=this.id;
					$('#addAlkesModal').modal('hide');
					e("alkes-id1").value=this.cells[0].id;
					e("nAlkes").value=namaObat;
					var isQty=this.cells[1].innerHTML;
					e("isQty").value=isQty;
					if(isQty=='Y'){
						$('#jAlkes').removeAttr('disabled');
						$('#jAlkes').val(1);
						$('#jAlkes').focus();
					}else{
						$('#jAlkes').attr('disabled',true);
						$('#catAlkes').focus();
					}
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						var namaObat=this.id;
						$('#addAlkesModal').modal('hide');
						e("alkes-id1").value=this.cells[0].id;
						e("nAlkes").value=namaObat;
						var isQty=this.cells[1].innerHTML;
						e("isQty").value=isQty;
						if(isQty=='Y'){
							$('#jAlkes').removeAttr('disabled');
							$('#jAlkes').val(1);
							$('#jAlkes').focus();
						}else{
							$('#jAlkes').attr('disabled',true);
							$('#catAlkes').focus();
						}
					}
				}
				var td = c("td", tr,null,h.LAYAN_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick()>"+h.NAMA_LAYAN1+"</a>";
				td.setAttribute('title',h.NAMA_LAYAN1);
				td.style.cssText='text-align:left';
				td = c("td", tr);
				td.innerHTML=h.ADAQTY;
				td.style.display='none';
				td = c("td", tr);
				td.innerHTML='Rp. '+toRupiah(h.HARGA);
				td.setAttribute('title','Rp. '+toRupiah(h.HARGA));
				
			}	
			pilih='#'+prod[0].LAYAN_ID;
			
		}
		
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevP1');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			var alkes=e('nAlkes').value;
			sumPage=sumPage-32;
			selectAlkes(alkes,sumPage);
		}	
		var button=c('button',div,null,'nextP1');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			var alkes=e('nAlkes').value;
			selectAlkes(alkes,sumPage);
		}
		if(prod.length!=16)
			$('#nextP1').attr('disabled',true);
		if(sumPage==17)
			$('#prevP1').attr('disabled',true);
		jQuery.tableNavigation();
		$('#alkes1_table').fixheadertable({ 
			colratio	 : [400,80],
			width:505,
			height:380
		});
		
		$('#addAlkesModal').on('shown.bs.modal', function () {
			$(pilih+' .activation').focus();
		});
		$(pilih+' .activation').focus();
	}
	var alkesDisabled=false;
	function tabelAlkes1(prod){
		$('#alkesSave').removeAttr('disabled');
		alkesDisabled=false;
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var alkes=[];
				alkes[0]=h.LAYAN_ID;
				alkes[1]=h.NAMA_LAYAN;
				alkes[2]=h.QTY;
				alkes[3]=h.CATATAN;
				alkes[4]='Old';
				alkes[5]=h.HARGA;
				alkesResep.push(alkes);
				if(h.TRANS_BAYAR_ID!=null || doneP=='1_done'){
					$('#alkesSave').attr('disabled',true);
					$('#formAlkes input').attr('disabled',true);
					$('#formAlkes button').attr('disabled',true);
					$('#FTSave').attr('disabled',true);
					alkesDisabled=true;
				}
			}
			tabelAlkes(alkesResep);
		}
	}
	function tabelAlkes(prod){
		var content=e("tabel_alkesBody");
		content.innerHTML="";
		
		var div=e("alkesBody");
		var dHeight=bodyHeight*0.75;
		var col=(bodyWidth-180);
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","alkes_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		if(!alkesDisabled)
			th = c("th", tr);
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trAlkes');
			  if(!alkesDisabled){
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					sAUrut=this.id.split("_")[0];
					e('addA').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
					var cat=e("cattalkesBody");
					cat.innerHTML="";
					var area=c("textArea",cat,null,"areaalkesBody");
					var catAlkes=this.cells[3].innerHTML;
					area.setAttribute('disabled',true);
						if(catAlkes!=null)
							area.value=catAlkes;
						else
							area.value="";
					$("#nAlkes").focus();
				}
			  }else{
				 tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					var cat=e("cattalkesBody");
					cat.innerHTML="";
					var area=c("textArea",cat,null,"areaalkesBody");
					var catAlkes=this.cells[2].innerHTML;
					area.setAttribute('disabled',true);
						if(catAlkes!=null)
							area.value=catAlkes;
						else
							area.value="";
				} 
			  }
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[1];
				div.setAttribute('title',h[1]);
				
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
				
			  if(!alkesDisabled){
				td = c("td", tr);
				var button=c('button',td,null,i+'_deleteA');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noDelete=id.split('_')[0];
					alkesResep.splice(noDelete,1);
					tabelAlkes(alkesResep);
				}
			  }
				td = c("td", tr);
				td.innerHTML=h[3];
				td.style.display="none";
				
			}
		}
	 if(!alkesDisabled){
		$('#alkes_table').fixheadertable({ 
			colratio	 : [400,60,50],
			width:535,
			height:(dHeight/2)+25,
			zebra:true
		});
	 }else{
		$('#alkes_table').fixheadertable({ 
			colratio	 : [400,60],
			width:485,
			height:(dHeight/2)+25,
			zebra:true
		});
	 }
	}
	function addAlkesToResep(){
		var resep2=[];
		resep2[0]=e("alkes-id1").value;
		if(resep2[0]==""||resep2[0]==null){
			bootbox.alert("Pilih Tindakan!",function(){
				setTimeout(function(){$("#nAlkes").focus();},10);
			});
			return;
		}
		var obat=e("nAlkes").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Tindakan!",function(){
				setTimeout(function(){$("#nAlkes").focus();},10);
			});
			return;
		}
		
		resep2[1]=obat;
		var isQty=e("isQty").value;
		if(isQty=='Y')
			var qty=e("jAlkes").value;
		else
			var qty='1';
		var iNum=isNumber(qty);
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$("#jAlkes").focus();},10);
			});
			return;
		}
		resep2[2]=qty;
		var cat=e("catAlkes").value;
		resep2[3]=cat;
		
		if(sAUrut!=null){
			alkesResep.splice(sAUrut,0,resep2);
			e('addA').innerHTML='<span class="glyphicon glyphicon-plus"></span> Tambah';
		}else
			alkesResep.push(resep2);
		e("formAlkes").reset();
		$('#addAlkesModal').modal('hide');
		tabelAlkes(alkesResep);
		sAUrut=null;
		$("#nAlkes").focus();
}
	
	var formulaObat=[],idFormula,oldNama,sFOUrut;
	function formulaObatModal(){
		$('#formulaObatModal').modal('show');
		obat2();
		setTimeout("selectMasterFormObat()",200);
		
		
	}
	function enableFormObat(){
		$('#formObat2 input').removeAttr('disabled');
		$('#formObat2 select').removeAttr('disabled');
		$('#formObat2 button').removeAttr('disabled');
		$('#simpanFormula').removeAttr('disabled');
		$('#nObat1').focus();
	}
	function tabelMSFO(prod){
		var content=e("masterFormula");
		content.innerHTML="";
		var pilih="";
		$('#formObat2 input').attr('disabled',true);
		$('#formObat2 select').attr('disabled',true);
		$('#formObat2 button').attr('disabled',true);
		$('#namaFormula').attr('disabled',true);
		$('#simpanFormula').attr('disabled',true);
		var div=e("formulaObatBody");
		var dHeight=div.offsetHeight;
		content.style.height=(dHeight-37)+"px";
		var content1=e("buatFormula");
		content1.style.height=(dHeight-37)+"px";
		var label=c("label",content);
		label.innerHTML="Cari Formula";
		label.style.cssText="margin-left:10px";
		var input=c("input",content,null,"kdMSFO");
		input.setAttribute("type","text");
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","MSFO_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA FORMULA";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h.FORMULA_ID);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					idFormula=this.id;
					oldNama=this.cells[0].id;
					e("namaFormula").value=this.cells[0].id;
					enableFormObat();
					selectFormulaObat(idFormula);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						idFormula=this.id;
						oldNama=this.cells[0].id;
						e("namaFormula").value=this.cells[0].id;
						enableFormObat();
						selectFormulaObat(idFormula);
						
					}
				}
				var td = c("td", tr,null,h.NAMA_FORMULA);
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.FORMULA_ID+"') >"+h.NAMA_FORMULA+"</a>";	
				td.setAttribute('title',h.NAMA_FORMULA);
			}
			pilih='#'+prod[0].FORMULA_ID;
		}
		jQuery.tableNavigation();
		$('#MSFO_table').fixheadertable({ 
			height:dHeight-124,
			zebra:true
		});
		
		var $rows = $('#MSFO_table tr');
		$('#kdMSFO').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('#formulaObatModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		
	}
	function tabelMSFO1(prod){
		var content=e("masterFormula1");
		content.innerHTML="";
		var pilih="";
		var div=e("addFOBody");
		var dHeight=div.offsetHeight;
		content.style.height=(dHeight-15)+"px";
		var content1=e("buatFormula1");
		content1.innerHTML="";
		content1.style.height=(dHeight-15)+"px";
		var label=c("label",content);
		label.innerHTML="Cari Formula";
		label.style.cssText="margin-left:15px";
		var input=c("input",content,null,"kdMSFO1");
		input.setAttribute("type","text");
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","MSFO1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA FORMULA";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h.FORMULA_ID);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					idFormula=this.id;
					selectFO(idFormula);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						idFormula=this.id;
						selectFO(idFormula);
					}
				}
				var td = c("td", tr,null,h.NAMA_FORMULA);
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.FORMULA_ID+"') >"+h.NAMA_FORMULA+"</a>";
				td.setAttribute('title',h.NAMA_FORMULA);
			}
			pilih="#"+prod[0].FORMULA_ID;
		}
		jQuery.tableNavigation();
		$('#MSFO1_table').fixheadertable({ 
			height:dHeight-100,
			zebra:true
		});
		
		var $rows = $('#MSFO1_table tr');
		$('#kdMSFO1').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});			
		$('#addFOModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		var btn=e("FOSave");
		btn.onclick=function(){
			var length=formulaObat.length;
			if(length!=0){
				for(var i=0;i<length;i++){
					var resep2=[];
					resep2[0]=formulaObat[i][1];
					resep2[1]=formulaObat[i][2];
					resep2[2]=formulaObat[i][3];
					resep2[3]=formulaObat[i][4];
					resep2[4]=formulaObat[i][5];
					resep2[5]=formulaObat[i][6];
					resep2[6]=formulaObat[i][7];
					resep2[7]="";
					resep2[8]=formulaObat[i][8];
					resep2[9]=formulaObat[i][9];
					resep2[10]=formulaObat[i][10];
					resep2[12]=formulaObat[i][12];
					resep2[13]=formulaObat[i][13];
					resep2[14]=formulaObat[i][14];
					resep2[15]=formulaObat[i][15];
					resep2[16]=formulaObat[i][16];
					resep2[17]=formulaObat[i][17];
					if(sOUrut!=null)
						obatResep.splice(sOUrut,0,resep2);
					else
						obatResep.push(resep2);
				}
			}else
				bootbox.alert("Silakan Pilih Formula Resep!");
			$('#addFOModal').modal('hide');
			formulaObat=[];idFormula=null;sOUrut=null;
			tabelResep(obatResep);
		}
	}
	function tambahMSFO(){
		bootbox.prompt({
			title:"Nama Formula Resep Baru?",
			value:"formula",
			callback: function(result){
				if(result!=null){
					if(result.length==0)
					 bootbox.alert("Silakan Masukkan Nama Formula!");
					else{
						var fo=result.trim();
						addMasterFormObat(fo);
					}
				}
			}
		});
		
		/*
		var formula=prompt("Nama Formula Resep Baru?","formula");
		if(formula!=null){
			if(formula.length==0)
				bootbox.alert("Silakan Masukkan Nama Formula!");
			else{
				var fo=formula.trim();
				addMasterFormObat(fo);
			}
		}*/				
	}
	function hapusMSFO(){
		if(idFormula!=null)
			deleteMasterFormObat(idFormula);
		else
			bootbox.alert("Silakan Pilih Nama Formula!");
	}
	function updateMSFO(){
		if(idFormula!=null){
			bootbox.prompt({
			  title:"Perubahan Nama Formula Resep ?",
			  value:oldNama,
			  callback: function(result){
				if(result!=null){
					if(result.length==0)
						bootbox.alert("Silakan Masukkan Nama Formula!");
					else{
						var fo=result.trim();
						updateMasterFormObat(fo);
					}
				}
			  }
			});
			/*var formula=prompt("Perubahan Nama Formula Resep ?",oldNama);
			if(formula!=null){
				if(formula.length==0)
					bootbox.alert("Silakan Masukkan Nama Formula!");
				else{
					var fo=formula.trim();
					updateMasterFormObat(fo);
				}
			}*/
		}else
			bootbox.alert("Silakan Pilih Nama Formula!");		
	}
	function doubleMSFO(){
		if(idFormula!=null)
			doubleMasterFormObat(oldNama);
		else
			bootbox.alert("Silakan Pilih Nama Formula!");
	}
	function tabelFO1(prod){
		formulaObat=[];
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FORMULA_ID;
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				if(h.SEDIAAN_ID!=null){	
					resep[3]=h.SEDIAAN_ID;
					resep[4]=h.SEDIAAN;
				}else{
					resep[3]="";
					resep[4]="";
				}
				if(h.SATUAN_ID!=null){	
					resep[5]=h.SATUAN_ID;
					resep[6]=h.SATUAN;
				}else{
					resep[5]="";
					resep[6]="";
				}
				var sum="";
				if(h.JUMLAH!=null){
					if(h.JUMLAH.substring(0,1)=='.')
						sum=0+h.JUMLAH;
					else
					sum=h.JUMLAH;
				}
				resep[7]=sum;
				resep[8]=h.SIGNA_ID;
				resep[9]=h.SIGNA_NAMA;
				resep[10]=h.SIGNA_DOKTER;
				resep[11]=h.URUT;
				resep[12]=h.TYPE;
				resep[13]=h.HEADER;
				resep[14]=h.NAMA_RACIKAN;
				resep[15]=h.FREE_DOSIS;
				formulaObat.push(resep);
			}
		}tabelFO(formulaObat);
	}
	function tabelFO2(prod){
		formulaObat=[];
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FORMULA_ID;
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				if(h.SEDIAAN_ID!=null){	
					resep[3]=h.SEDIAAN_ID;
					resep[4]=h.SEDIAAN;
				}else{
					resep[3]="";
					resep[4]="";
				}
				if(h.SATUAN_ID!=null){	
					resep[5]=h.SATUAN_ID;
					resep[6]=h.SATUAN;
				}else{
					resep[5]="";
					resep[6]="";
				}
				var sum="";
				if(h.JUMLAH!=null){
					if(h.JUMLAH.substring(0,1)=='.')
						sum=0+h.JUMLAH;
					else
					sum=h.JUMLAH;
				}
				resep[7]=sum;
				resep[8]=h.SIGNA_ID;
				resep[9]=h.SIGNA_NAMA;
				resep[10]=h.SIGNA_DOKTER;
				resep[11]=h.URUT;
				resep[12]=h.TYPE;
				resep[13]=h.HEADER;
				resep[14]=h.NAMA_RACIKAN;
				resep[15]=h.FREE_DOSIS;
				resep[16]=h.ROUTE_ID;
				resep[17]=h.ROUTE;
				formulaObat.push(resep);
			}
		}tabelFO3(formulaObat);
	}
	var isiRFO=[];
	function obat2(){
		var content=e("tabelKonten");
		content.innerHTML="";
		var form=c('form',content,null,'formObat2');
		form.setAttribute('action','javascript:addObatToFormO()');
		var table=c('table',form,null,'tabObat1');
		var tr=c('tr',table);
		var td=c('td',tr);
		td.innerHTML='Nama Obat';
		td.style.width='200px';
		td=c('td',tr);
		td.innerHTML='Dosis';
		td.style.width='100px';
		td=c('td',tr);
		td.innerHTML='Jumlah';
		td.style.width='50px';
		
		td=c('td',tr);
		td.innerHTML='Signa';
		td.style.width='280px';
		
		td=c('td',tr);
		td.innerHTML='<button tabindex=54 type="submit" class="btn btn-xs btn-primary" id="addO2"><span class="glyphicon glyphicon-plus"></span> Tambah</button>';
		td.setAttribute('rowspan',2);
		td.style.cssText='vertical-align:bottom';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="obat-id3" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="idSedian3" style="display:none"></input><input type="text" id="sedian3" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="idSatuan3" style="display:none"></input><input type="text" id="satuan3" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="pecah3" style="display:none"></input>';
		
		tr=c('tr',table);
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=51 id="nObat1" required="required"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text"  tabindex=52 id="dObat1"></input>';
		
		td=c('td',tr);
		td.innerHTML='<input type="text" style="text-align:right;" tabindex=52 id="jObat1" ></input>';
		td=c('td',tr,null,'signaObat1');
		var select=c('select',td,null,'signaO1');
		select.setAttribute('tabindex',53);
		isiSigna("1");
		
		tr=c('tr',table);
		td=c('td',tr);
		td.setAttribute('colspan',3);
		td=c('td',tr);
		//td.style.cssText='display:none';
		var button=c("button",td,null,"signaT1");
		button.setAttribute("type","button");
		button.innerHTML="Free Text";
		button.onclick=function(){
			var content1=e("signaO1");
			if(content1){
				var content2=e("signaObat1");
				content2.innerHTML="";
				input=c("input",content2,null,"signa_dokter2");
				input.setAttribute("type","text");
				input.setAttribute('tabindex',53);
				input.setAttribute('required','required');
				button=e("signaT1");
				button.innerHTML="Signa";	
			}else{
				var content2=e("signaObat1");
				content2.innerHTML="";
				input=c("select",content2,null,"signaO1");	
				isiSigna("1");
				button=e("signaT1");
				button.innerHTML="Free Text";
			}
		}
		var hr=c('hr',content);
		var table=c('table',content);
		tr=c('tr',table);
		td=c('td',tr);
		td.setAttribute('colspan',2);
		var button=c("button",td,null,"racikanFO");
		button.setAttribute("type","button");
		button.innerHTML="Racikan";
		button.onclick=function(){
			var ada=false;
			var a=0;
			isiRFO=[];cekResep=[];
			for(var i=0;i<formulaObat.length;i++){
				if(formulaObat[i][12]=='04'){
					ada=true;
					isiRFO[a]=i;
					cekResep[a]=formulaObat[i][1];
					a++;
				}
			}
			var res=hasDuplicates(cekResep);
			if(res){
				bootbox.alert('obat ganda!');
				return;
			}
			if(ada){
				$('#addRacikanModal1').modal('show');
				e('formRacik1').reset();
				isiBungkus('1');
				isiSigna('3');
				$('#addRacikanModal1').on('shown.bs.modal', function () {
					$('#nRacik1').focus();
				});
				$('#addRacikanModal1').on('hidden.bs.modal', function () {
					$('#nObat1').focus();
				});
			}else
				bootbox.alert('Tidak ada obat!');
		}
		$("#nObat1").keydown(function(event){
			if(event.keyCode==13){
				var nama=this.value.trim();
				sumPage=1;
				if(nama.length>=1){
					$("#addFormulaModal").modal('show');
					searchObatF(nama,sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#nObat1').focus(),10});
					});
				}
			}
		});
		/*$("#dObat1").keydown(function(event){
			if(event.keyCode==9 || event.keyCode==13){
				var nama=this.value.trim();
				if(nama.length<=1){
					$('#jObat1').removeAttr('disabled');
					setTimeout(function(){$('#jObat1').focus(),10});
				}else{
					$('#jObat1').attr('disabled',true);
					setTimeout(function(){$('#signaO1').focus(),10});
				}
				
			}
		});*/
		btn=e("signaT3");
		btn.onclick=function(){
			var content1=e("signaO3");
			if(content1){
				var content2=e("signaRacik1");
				content2.innerHTML="";
				input=c("input",content2,null,"signa_dokter4");
				input.setAttribute("type","text");
				input.setAttribute('tabindex',73);
				input.setAttribute('required','required');
				button=e("signaT3");
				button.innerHTML="Signa";	
			}else{
				var content2=e("signaRacik1");
				content2.innerHTML="";
				input=c("select",content2,null,"signaO3");	
				input.setAttribute('tabindex',73);
				isiSigna("3");
				button=e("signaT3");
				button.innerHTML="Free Text";
			}
		}
			
	}
	function tabelFO(prod){
		var content=e("tabelKonten1");
		content.innerHTML="";
		var content1=e("buatFormula");
		cHeight=content1.offsetHeight;
		cWidth=(bodyWidth*0.75);
		var col=(cWidth-180)/7;
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","FO_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		
		th.innerHTML="RACIKAN";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="DOSIS";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		th.innerHTML="SIGNA";
		
		th = c("th", tr);
		th.innerHTML="URUT";
		
		th = c("th", tr);
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trObat1');
				/*tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					e('addO1').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
					sFOUrut=this.id.split("_")[0];
					$('#nObat1').focus();
				}*/
				if(h[12]=='00'||h[12]=='04'){
					tr.style.background='#b0d9d7';
					tr.ondblclick=function(){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						e('addO2').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
						sFOUrut=this.id.split("_")[0];
						$('#nObat1').focus();
					}
					var td = c("td", tr);
					radio=c("input",td,null,"racikFO_"+i);
					radio.setAttribute("name","typeFO"+i);
					radio.setAttribute("type","checkbox");
					if(h[12]=='00'){
						$("#racikFO_"+i).prop("checked", false);
					}else{
						$("#racikFO_"+i).prop("checked", true);
					}
					$("#racikFO_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#racikFO_"+no).prop("checked", true);
							formulaObat[no][12]='04';
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#racikFO_"+no).prop("checked", false);
							formulaObat[no][12]='00';
						}
					});
				
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[4];
					td.setAttribute('title',h[4]);
					td.style.display='none';
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					td.innerHTML=h[15];
					td.setAttribute('title',h[15]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					td = c("td", tr);
					var button=c('button',td,null,i+'_deleteFO');
					button.setAttribute('type','button');
					button.innerHTML='Delete';
					button.onclick=function(){
						var id=this.id;
						noDelete=id.split('_')[0];
						formulaObat.splice(noDelete,1);
						tabelFO(formulaObat);
					}
				}else if(h[12]=='01'){
					tr.style.cssText='background:#000;color:#fff;';
					var td = c("td", tr,null,'tdRacikFO_'+i);
					td.innerHTML='*';
					
					td = c("td", tr);
					td.setAttribute('colspan',5);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					
					td = c("td", tr);
					var button=c('button',td,null,i+'_extraFO');
					button.setAttribute('type','button');
					button.innerHTML='Ekstrak';
					button.style.color='black';
					button.onclick=function(){
						var id=this.id;
						noExtra=id.split('_')[0];
						var header=formulaObat[noExtra][1];
						formulaObat.splice(noExtra,1);
						formulaObat.splice(noExtra,1);
						for(var i=0;i<formulaObat.length;i++){
							if(formulaObat[i][13]==header){
								formulaObat[i][12]='00'
								formulaObat[i][13]='0';
							}	
						}
						tabelFO(formulaObat);
					}
				}else if(h[12]=='02'||h[12]=='03'){
					var td = c("td", tr,null,'tdRacikFO_'+i);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					td = c("td", tr);
					td.innerHTML=h[4];
					td.setAttribute('title',h[4]);
					td.style.display='none';
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,'tKanan');
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}
			}
		}
		$('#FO_table').fixheadertable({ 
			colratio	 : [60,2*col,col,col,60,2*col,50,50],
			height:cHeight-191
		});
	}
	function tabelFO3(prod){
		var content=e("buatFormula1");
		cHeight=content.offsetHeight;
		cWidth=content.offsetWidth;
		var col=(cWidth-190)/9;
		content.innerHTML="";
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","FO1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="RACIKAN";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="DOSIS";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		th.innerHTML="SIGNA";
		th = c("th", tr);
		th.innerHTML="CATATAN";
		th = c("th", tr);
		th.innerHTML="ROUTE";
		th = c("th", tr);
		th.innerHTML="URUT";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				var tr = c("tr", tbody);
				if(h[12]=='01'){
					tr.style.cssText='background:#666;color:#fff;';
					var td = c("td", tr);
					td.innerHTML='*';
					
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					
					td = c("td", tr);
					td.innerHTML=h[17];
					td.setAttribute('title',h[17]);
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					
				}else if(h[12]=='02'){
					var td = c("td", tr);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					td.setAttribute('colspan',7);
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
		
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}else if(h[12]=='03'){
					var td = c("td", tr);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					td = c("td", tr);
					td = c("td", tr);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}else if(h[12]=='00'||h[12]=='04'){
					tr.style.background='#b0d9d7';
					var td = c("td", tr);
					td.innerHTML='';
		
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					td.innerHTML=h[15];
					td.setAttribute('title',h[15]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					td = c("td", tr);
					td.innerHTML=h[17];
					td.setAttribute('title',h[17]);
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}
			}
		}
		$('#FO1_table').fixheadertable({
			colratio	 : [60,2*col,col,col,60,col,col,col,col,50],
			height:cHeight-24,
		});
	}
	
	function addObatToFormO(){
		var resep2=[];
		resep2[0]=idFormula;
		resep2[1]=e("obat-id3").value;
		if(resep2[1]==""||resep2[1]==null){
			bootbox.alert("Pilih Obat!",function(){
				setTimeout(function(){$('#nObat1').focus();},10);
			});
			return;
		}
		var obat=e("nObat1").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Obat!",function(){
				setTimeout(function(){$('#nObat1').focus();},10);
			});
			return;
		}
		resep2[2]=obat;
		var idKemasan=e("idSedian3").value;
		resep2[3]=idKemasan;
		var kemasan=e("sedian3").value;
		resep2[4]=kemasan;
		var idSatuan=e("idSatuan3").value;
		resep2[5]=idSatuan;
		var satuan=e("satuan3").value;
		resep2[6]=satuan;
		var dosis=e("dObat1").value.trim();
		//if(dosis.length<=1){
			var qty=e("jObat1").value;
			var iNum;
			var pecah=e("pecah3").value;
		if(qty!=""){
			if(pecah=='Y')
				iNum=isNumber(qty);
			else
				iNum=isNumber1(qty);
			if(iNum==0){
				bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
					setTimeout(function(){$("#jObat1").focus();},10);
				});
				return;
			}
		}
				resep2[7]=qty;
			//	resep2[15]="";
		//}else{
			resep2[15]=dosis;
			//resep2[7]="";
		//}
		var sid=e("signaO1");
		var idSigna="";var signa="";
		if(sid){
			idSigna=sid.value;
			signa=$("#signaO1 option:selected").html();
		}
		var dok=e("signa_dokter2");
		var sDokter="";
		if(dok)
			sDokter=dok.value;
		resep2[8]=idSigna;
		resep2[9]=signa;
		resep2[10]=sDokter;
		resep2[12]='00';
		resep2[13]='0';
		if(sFOUrut!=null)
			formulaObat.splice(sFOUrut,0,resep2);
		else
			formulaObat.push(resep2);
		e("formObat2").reset();
		$('#nObat1').focus();
		
		tabelFO(formulaObat);
		sFOUrut=null;
		
	}
	var racikFO=[];
	function getKodeRacik2(){
		var kode='RF'+idFormula.substring(2)+moment().format('mmss');
		noRacik=eval(noRacik)+1;
		return kode;
	}
	function addRacikToFormula(){
		racikFO=[];
		
		var obat=e("nRacik1").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Nama Racik!",function(){
				setTimeout(function(){$('#nRacik1').focus();},10);
			});
			return;
		}
		var qty=e("jRacik1").value;
		var iNum=isNumber(qty);
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$('#jRacik1').focus();},10);
			});
			return;
		}var idRacik=getKodeRacik2();
		var sid=e("signaO3");
		var idSigna="";var signa="";
		if(sid){
			idSigna=sid.value;
			signa=$("#signaO3 option:selected").html();
		}
		var dok=e("signa_dokter4");
		var sDokter="";
		if(dok)
			sDokter=dok.value;
		
		for(var i=0;i<isiRFO.length;i++){
			var n=isiRFO[i];
			formulaObat[n][8]=idSigna;
			formulaObat[n][9]=signa;
			formulaObat[n][10]=sDokter;
			formulaObat[n][12]='03';
			formulaObat[n][13]=idRacik;
			racikFO.push(formulaObat[n]);
		}
		for(var i=isiRFO.length-1;i>=0;i--)
			formulaObat.splice(isiRFO[i],1);
		
		for(var i=isiRFO.length-1;i>=0;i--)
			formulaObat.splice(isiRFO[0],0,racikFO[i]);
		
		var resep3=[];
		var no=e("bRacik1").value;
		var nomor=no.split('_')[0];
		resep3[0]=idFormula;
		resep3[1]=bungkus[nomor][0];
		resep3[2]=bungkus[nomor][1];
		resep3[3]=bungkus[nomor][2];
		resep3[4]=bungkus[nomor][3];
		resep3[5]=bungkus[nomor][4];
		resep3[6]=bungkus[nomor][5];
		resep3[7]=qty;
		resep3[8]=idSigna;
		resep3[9]=signa;
		resep3[10]=sDokter;
		resep3[12]='02';
		resep3[13]=idRacik;
		resep3[15]="";
		sFOUrut=isiRFO[0];
		formulaObat.splice(sFOUrut,0,resep3);
		
		var resep2=[];
		resep2[0]=idRacik;
		resep2[1]=idRacik;
		resep2[2]=obat;
		resep2[3]=bungkus[nomor][2];
		resep2[4]=bungkus[nomor][3];
		resep2[5]=bungkus[nomor][4];
		resep2[6]=bungkus[nomor][5];
		resep2[7]=qty;
		resep2[8]=idSigna;
		resep2[9]=signa;
		resep2[10]=sDokter;
		resep2[12]='01';
		resep2[13]='0';
		resep2[14]=obat;
		resep2[15]="";
		formulaObat.splice(sFOUrut,0,resep2);
		$('#nObat1').focus();
		$('#addRacikanModal1').modal('hide');
		e('formRacik1').reset();
		sFOUrut=null;
		tabelFO(formulaObat);
}
	function tabelAddFormula(prod){
		var content=e("addFormulaBody");
		content.innerHTML="";
		var pilih="";
		var cWidth=bodyWidth*0.7;
		var cHeight=(bodyHeight*0.6)-48;
		var col=(cWidth-60)/9;
		var div=c('div',content);
		var label=c('label',div);
		label.innerHTML='Bahan Aktif';
		label.style.width='100px';
		var input=c('input',div,null,'bhnaktif2');
		input.setAttribute('type','text');
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","Fobat_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="BAHAN AKTIF";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.NAMA);
				tr.ondblclick=function(){
					var namaObat=this.id;
					$('#addFormulaModal').modal('hide');
					e("obat-id3").value=this.cells[0].id;
					e("nObat1").value=namaObat;
					e("idSedian3").value=this.cells[1].id;
					e("idSatuan3").value=this.cells[2].id;
					e("sedian3").value=this.cells[1].innerHTML;
					e("satuan3").value=this.cells[2].innerHTML;
					e("pecah3").value=this.cells[5].innerHTML;
				//	$('#jObat1').attr('disabled',true);
					var fda=this.cells[4].innerHTML;
					if(fda!=""){
						bootbox.alert('FDA : '+fda,function(){
							setTimeout(function(){$('#dObat1').focus();},10);
						});
					}
					$("#dObat1").focus();
					
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						var namaObat=this.id;
						$('#addFormulaModal').modal('hide');
						e("obat-id3").value=this.cells[0].id;
						e("nObat1").value=namaObat;
						e("idSedian3").value=this.cells[1].id;
						e("idSatuan3").value=this.cells[2].id;
						e("sedian3").value=this.cells[1].innerHTML;
						e("satuan3").value=this.cells[2].innerHTML;
						e("pecah3").value=this.cells[5].innerHTML;
						//$('#jObat1').attr('disabled',true);
						var fda=this.cells[4].innerHTML;
						if(fda!=""){
							bootbox.alert('FDA : '+fda,function(){
								setTimeout(function(){$('#dObat1').focus();},10);
							});
						}
						$("#dObat1").focus();
					}
				}
				var td = c("td", tr,null,h.OBAT_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick()>"+h.NAMA+"</a>";
				td.setAttribute('title',h.NAMA);
				td.style.cssText='text-align:left';
				
				td = c("td", tr,null,h.SEDIAAN_ID);
				td.innerHTML=h.SEDIAAN;
				td.setAttribute('title',h.SEDIAAN);
				td.style.display='none';
				
				td = c("td", tr,null,h.SATUAN_KECIL_ID);
				td.innerHTML=h.SATUAN;
				td.setAttribute('title',h.SATUAN);
				td = c("td", tr);
				if(h.BHN_AKTIF!=null){
					td.innerHTML=h.BHN_AKTIF;
					td.setAttribute('title',h.BHN_AKTIF);
				}else
					td.innerHTML="";
				
				td = c("td", tr);
				td.innerHTML=h.KATEGORI_FDA;
				td.style.display='none';
				
				td = c("td", tr);
				td.innerHTML=h.PECAH_YT;
				td.style.display='none';
			}
			pilih='#'+prod[0].OBAT_ID;
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevPage2');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			var obat=e('nObat1').value;
			if(obat.length!=0){
				sumPage=sumPage-32;
				searchObatF(obat,sumPage);
			}
		}
			
		var button=c('button',div,null,'nextPage2');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			var obat=e('nObat1').value;
			if(obat.length!=0)
				searchObatF(obat,sumPage);
		}
		if(prod.length!=16)
			$('#nextPage2').attr('disabled',true);
		if(sumPage==17)
			$('#prevPage2').attr('disabled',true);
		$('#Fobat_table').fixheadertable({ 
			colratio	 : [3*col,2*col,col,3*col],
			//width:cWidth-60,
			height:380
		});
		jQuery.tableNavigation();
			
		var $rows = $('#Fobat_table tr');
		$('#bhnaktif2').keyup(function(event) {
			if(event.keyCode==13){
				if(event.keyCode==13){
				sumPage=1;
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toUpperCase();
				searchBhnF(val,sumPage);
				var button=e('prevPage2');
				button.onclick=function(){
					var obat=e('bhnaktif2').value;
					if(obat.length!=0){
						sumPage=sumPage-32;
						searchBhnF(obat,sumPage);
					}
				}
				button=e('nextPage2');
				button.onclick=function(){
					var obat=e('bhnaktif2').value;
					if(obat.length!=0)
						searchBhnF(obat,sumPage);
				}
			}
			}
		});
		$('#addFormulaModal').on('shown.bs.modal', function () {
			$(pilih+' .activation').focus();
		});
		$(pilih+' .activation').focus();
	}

	var formulaTindakan=[],idTindakan,asalPoli,sFTUrut;
	function formulaTindakanModal(){
		$('#formulaTindakanModal').modal('show');
		alkes2();
		setTimeout("selectMasterFT()",200);
	}
	function enableFormAlkes(){
		$('#formAlkes1 input').removeAttr('disabled');
		$('#formAlkes1 button').removeAttr('disabled');
		$('#simpanTindakan').removeAttr('disabled');
		$('#nAlkes1').focus();
	}
	function tabelMSFT(prod){
		var content=e("masterTindakan");
		content.innerHTML="";
		var pilih="";
		$('#formAlkes1 input').attr('disabled',true);
		$('#formAlkes1 button').attr('disabled',true);
		$('#namaTindakan').attr('disabled',true);
		$('#simpanTindakan').attr('disabled',true);
		var div=e("formulaTindakanBody");
		var dHeight=div.offsetHeight;
		content.style.height=(dHeight-37)+"px";
		var content1=e("buatTindakan");
		content1.style.height=(dHeight-37)+"px";
		var label=c("label",content);
		label.innerHTML="Cari Tindakan";
		label.style.cssText="margin-left:10px";
		var input=c("input",content,null,"kdMSFT");
		input.setAttribute("type","text");
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","MSFT_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h.FT_ID);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					idTindakan=this.id;
					asalPoli=this.cells[0].id;
					e("namaTindakan").value=this.cells[0].id;
					enableFormAlkes();
					selectFormulaTindakan(idTindakan);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						idTindakan=this.id;
						asalPoli=this.cells[0].id;
						e("namaTindakan").value=this.cells[0].id;
						
						enableFormAlkes();
						selectFormulaTindakan(idTindakan);
					}
				}
				var td = c("td", tr,null,h.NAMA_TINDAKAN);
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.FT_ID+"')>"+h.NAMA_TINDAKAN+"</a>";
				td.setAttribute('title',h.NAMA_TINDAKAN);
			}	
			pilih='#'+prod[0].FT_ID;
		}
		jQuery.tableNavigation();
		$('#MSFT_table').fixheadertable({ 
			height:dHeight-124,
			zebra:true
		});
		var $rows = $('#MSFT_table tr');
		$('#kdMSFT').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});		
		$('#formulaTindakanModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
	}
	function tabelMSFT1(prod){
		var content=e("masterTindakan1");
		content.innerHTML="";
		var pilih="";
		var div=e("addFTBody");
		var dHeight=div.offsetHeight;
		content.style.height=(dHeight-15)+"px";
		var content1=e("buatTindakan1");
		content1.innerHTML="";
		content1.style.height=(dHeight-15)+"px";
		var label=c("label",content);
		label.innerHTML="Cari Tindakan";
		label.style.cssText="margin-left:15px";
		var input=c("input",content,null,"kdMSFT1");
		input.setAttribute("type","text");
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","MSFT1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h.FT_ID);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					idTindakan=this.id;
					formulaTindakan=[];
					selectFT(idTindakan);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						idTindakan=this.id;
						formulaTindakan=[];
						selectFT(idTindakan);
					}
				}
				var td = c("td", tr,null,h.NAMA_TINDAKAN);
				td.innerHTML="<a class='activation' href=javascript:myClick('"+h.FT_ID+"')>"+h.NAMA_TINDAKAN+"</a>";
				td.setAttribute('title',h.NAMA_TINDAKAN);
			}
			pilih='#'+prod[0].FT_ID;
		}
		jQuery.tableNavigation();
		$('#MSFT1_table').fixheadertable({ 
			height:dHeight-102,
			zebra:true
		});
		var $rows = $('#MSFT1_table tr');
		$('#kdMSFT1').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('#addFTModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		var btn=e("FTSave");
		btn.onclick=function(){
			var length=formulaTindakan.length;
			if(length!=0){
				for(var i=0;i<length;i++){
					var resep2=[];
					resep2[0]=formulaTindakan[i][1];
					resep2[1]=formulaTindakan[i][2];
					resep2[2]=formulaTindakan[i][3];
					if(sAUrut!=null)
						alkesResep.splice(sAUrut,0,resep2);
					else
						alkesResep.push(resep2);
				}
			}else
				bootbox.alert("Silakan Pilih Formula Tindakan!");
			$('#addFTModal').modal('hide');
			formulaTindakan=[];idTindakan=null;sAUrut=null;
			tabelAlkes(alkesResep);
		}
	}
	function tambahMSFT(){
		bootbox.prompt({
			  title:"Nama Formula Tindakan Baru?",
			  value:"tindakan",
			  callback: function(result){
				if(result!=null){
					if(result.length==0)
						bootbox.alert("Silakan Masukkan Nama Tindakan!");
					else{
						var ft=result.trim();
						addMasterFT(ft);
					}
				}
			  }
			});
		/*var formula=prompt("Nama Formula Tindakan Baru?","tindakan");
		if(formula!=null){
			if(formula.length==0)
				bootbox.alert("Silakan Masukkan Nama Tindakan!");
			else{
				var ft=formula.trim();
				addMasterFT(ft);
			}
		}	*/			
	}
	function hapusMSFT(){
		if(idTindakan!=null)
			deleteMasterFT(idTindakan);
		else
			bootbox.alert("Silakan Pilih Nama Tindakan!");
	}
	function updateMSFT(){
		if(idTindakan!=null){
			bootbox.prompt({
			  title:"Perubahan Nama Formula Tindakan ?",
			  value:asalPoli,
			  callback: function(result){
				if(result!=null){
					if(result.length==0)
						bootbox.alert("Silakan Masukkan Nama Tindakan!");
					else{
						var ft=result.trim();
						updateMasterFT(ft);
					}
				}
			  }
			});
			/*var formula=prompt("Perubahan Nama Formula Tindakan ?",asalPoli);
			if(formula!=null){
				if(formula.length==0)
					bootbox.alert("Silakan Masukkan Nama Tindakan!");
				else{
					var ft=formula.trim();
					updateMasterFT(ft);
				}
			}*/
		}else
			bootbox.alert("Silakan Pilih Nama Tindakan!");		
	}
	function doubleMSFT(){
		if(idTindakan!=null)
			doubleMasterFT(asalPoli);
		else
			bootbox.alert("Silakan Pilih Nama Tindakan!");
	}
	function tabelFT1(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FT_ID;
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				resep[3]=h.JUMLAH;
				resep[4]='Old';
				formulaTindakan.push(resep);
			}
		}tabelFT(formulaTindakan);
	}
	function tabelFT2(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FT_ID;
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				resep[3]=h.JUMLAH;
				resep[4]='Old';
				formulaTindakan.push(resep);
			}
		}tabelFT3(formulaTindakan);
	}
	function alkes2(){
		var content=e("tabelTindakan");
		content.innerHTML="";
		var form=c('form',content,null,'formAlkes1');
		form.setAttribute('action','javascript:addAlkesToFT()');
		var table=c('table',form,null,'tabAlkes1');
		var tr=c('tr',table);
		var td=c('td',tr);
		td.innerHTML='Nama Tindakan';
		td.style.width='300px';
		td=c('td',tr);
		td.innerHTML='Jumlah';
		td.style.width='80px';
		
		td=c('td',tr);
		td.innerHTML='<button tabindex=63 type="submit" class="btn btn-xs btn-primary" id="addA1"><span class="glyphicon glyphicon-plus"></span> Tambah</button>';
		td.setAttribute('rowspan',2);
		td.style.cssText='vertical-align:bottom';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="alkes-id2" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="isQty1" style="display:none"></input>';
		
		tr=c('tr',table);
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=61 id="nAlkes1" required="required"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" style="text-align:right;" tabindex=62 id="jAlkes1" required="required"></input>';
	
		$("#nAlkes1").keydown(function(event){
			if(event.keyCode==13){
				var nama=this.value.trim();
				if(nama.length>=1){
					sumPage=1;
					$('#addTindakanModal').modal('show');
					searchAlkesF(nama,sumPage);
				}else{
					bootbox.alert('Masukan min 1 Karakter!',function(){
						setTimeout(function(){$('#nAlkes1').focus(),10});
					});
				}
			}
		});
	}	
	function tabelFT(prod){
		var content=e("tabelTindakan1");
		content.innerHTML="";
		var content1=e("buatTindakan");
		cHeight=content1.offsetHeight;
		cWidth=(bodyWidth*0.75);
		var col=(cWidth-140);
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","FT_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trAlkes1');
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					sFTUrut=this.id.split("_")[0];
					e('addA1').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
					$("#nAlkes1").focus();
				}
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
				
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML=h[3];
				td.setAttribute('title',h[3]);
				
				
				td = c("td", tr);
				var button=c('button',td,null,i+'_deleteFA');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noDelete=id.split('_')[0];
					formulaTindakan.splice(noDelete,1);
					tabelFT(formulaTindakan);
				}
				
			}
		}
		$('#FT_table').fixheadertable({ 
			colratio	 : [col,60,50],
			//width:cWidth,
			height:cHeight-136,
			zebra:true
		});
	}
	function tabelFT3(prod){
		var content=e("buatTindakan1");
		content.innerHTML="";
		cHeight=content.offsetHeight;
		cWidth=content.offsetWidth;
		var col=(cWidth-70);
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","FT1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
	
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h[1]);

				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
				
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML=h[3];
				td.setAttribute('title',h[3]);
				
			}
		}
		$('#FT1_table').fixheadertable({ 
			colratio:[col,60],
			height:cHeight-24,
			zebra:true
		});
	}

	function addAlkesToFT(){
		var resep2=[];
		resep2[0]=idTindakan;
		resep2[1]=e("alkes-id2").value;
		if(resep2[1]==""||resep2[1]==null){
			bootbox.alert("Pilih Tindakan!",function(){
					setTimeout(function(){$('#nAlkes1').focus();},10);
			});
			return;
		}
		var obat=e("nAlkes1").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Tindakan!",function(){
				setTimeout(function(){$('#nAlkes1').focus();},10);
			});
			return;
		}
		resep2[2]=obat;
		var isQty=e("isQty1").value;
		if(isQty=='Y')
			var qty=e("jAlkes1").value;
		else
			var qty='1';
		var iNum=isNumber(qty);
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$('#jAlkes1').focus();},10);
			});
			return;
		}
		
		resep2[3]=qty;
		
		if(sFTUrut!=null)
			formulaTindakan.splice(sFTUrut,0,resep2);
		else
			formulaTindakan.push(resep2);
		e("formAlkes1").reset();
		$("#nAlkes1").focus();
		tabelFT(formulaTindakan);
		sFTUrut=null;
		
}
	function tabelAddTindakan(prod){
		var content=e("addTindakanBody");
		content.innerHTML="";
		var pilih="";
		var cWidth=bodyWidth*0.6;
		var cHeight=(bodyHeight*0.6)-48;
		var col=(cWidth-70);
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","FTin_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.NAMA_LAYAN1);
				tr.ondblclick=function(){
					var namaObat=this.id;
					$('#addTindakanModal').modal('hide');
					e("alkes-id2").value=this.cells[0].id;
					var nama=e("nAlkes1");
					nama.value=namaObat;
					var isQty=this.cells[1].innerHTML;
					e("isQty1").value=isQty;
					if(isQty=='Y'){
						$('#jAlkes1').removeAttr('disabled');
						$('#jAlkes1').focus();
					}else
						$('#jAlkes1').attr('disabled',true);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						var namaObat=this.id;
						$('#addTindakanModal').modal('hide');
						e("alkes-id2").value=this.cells[0].id;
						var nama=e("nAlkes1");
						nama.value=namaObat;
						var isQty=this.cells[1].innerHTML;
						e("isQty1").value=isQty;
						if(isQty=='Y'){
							$('#jAlkes1').removeAttr('disabled');
							$('#jAlkes1').focus();
						}else
							$('#jAlkes1').attr('disabled',true);
					}
				}
				var td = c("td", tr,null,h.LAYAN_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick()>"+h.NAMA_LAYAN1+"</a>";
				td.setAttribute('title',h.NAMA_LAYAN1);
				td.style.cssText='text-align:left';
				
				td = c("td", tr);
				td.innerHTML=h.ADAQTY;
				td.style.display='none';
			}
			pilih='#'+prod[0].LAYAN_ID;
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevP2');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			var alkes=e('nAlkes1').value;
			sumPage=sumPage-32;
			searchAlkesF(alkes,sumPage);
		}	
		var button=c('button',div,null,'nextP2');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			var alkes=e('nAlkes1').value;
			searchAlkesF(alkes,sumPage);
		}
		if(prod.length!=16)
			$('#nextP2').attr('disabled',true);
		if(sumPage==17)
			$('#prevP2').attr('disabled',true);
		jQuery.tableNavigation();
		$('#FTin_table').fixheadertable({ 
			height:380
		});
		
		$('#addTindakanModal').on('shown.bs.modal', function () {
			$(pilih+' .activation').focus();
		});
		$(pilih+' .activation').focus();
	}
	function anamnesa(prod){
		var h=prod[0];
		if(h.JENIS_PENYAKIT!=null)
			e('tPenyakit').innerHTML=h.JENIS_PENYAKIT;
		else
			e('tPenyakit').innerHTML="";
		
		if(h.KUNJUNGAN_KE!=null)
			e('tKunjungan').innerHTML=h.KUNJUNGAN_KE;
		else
			e('tKunjungan').innerHTML="";
		
		if(h.ANAM_AWAL!=null)
			e('aAwal').innerHTML=h.ANAM_AWAL;
		else
			e('aAwal').innerHTML="";
		
		if(h.TV_TEKANAN_DARAH!=null)
			e('tDarah').innerHTML=h.TV_TEKANAN_DARAH +' / ';
		else
			e('tDarah').innerHTML="";
		
		if(h.TV_TEKANAN_DARAH2!=null)
			e('tDarah1').innerHTML=h.TV_TEKANAN_DARAH2;
		else
			e('tDarah1').innerHTML="";
		
		if(h.TV_FREK_NADI!=null)
			e('fNadi').innerHTML=h.TV_FREK_NADI;
		else
			e('fNadi').innerHTML="";
		
		if(h.TV_SUHU!=null)
			e('suhu').innerHTML=h.TV_SUHU;
		else
			e('suhu').innerHTML="";
		
		if(h.TV_FREK_NAFAS!=null)
			e('fNafas').innerHTML=h.TV_FREK_NAFAS;
		else
			e('fNafas').innerHTML="";
		
		if(h.TV_SKOR_NYERI!=null)
			e('sNyeri').innerHTML=h.TV_SKOR_NYERI;
		else
			e('sNyeri').innerHTML="";
		
		if(h.TV_SKOR_JATUH!=null)
			e('sJatuh').innerHTML=h.TV_SKOR_JATUH;
		else
			e('sJatuh').innerHTML="";
		
		if(h.ANT_BB!=null)
			e('bBadan').innerHTML=h.ANT_BB;
		else
			e('bBadan').innerHTML="";
		
		if(h.ANT_TB!=null)
			e('tBadan').innerHTML=h.ANT_TB;
		else
			e('tBadan').innerHTML="";
		
		if(h.ANT_LK!=null)
			e('lKepala').innerHTML=h.ANT_LK;
		else
			e('lKepala').innerHTML="";
		
		if(h.ANT_IMT!=null)
			e('imt').innerHTML=h.ANT_IMT;
		else
			e('imt').innerHTML="";
		
		if(h.ANT_LING_LENGANATAS!=null)
			e('lLengan').innerHTML=h.ANT_LING_LENGANATAS;
		else
			e('lLengan').innerHTML="";
		
		/*if(h.ANT_TINGGI_LUTUT!=null)
			e('tLutut').innerHTML=h.ANT_TINGGI_LUTUT;
		else
			e('tLutut').innerHTML="";*/
		
		if(h.FUNG_ALAT_BANTU!=null)
			e('aBantu').innerHTML=h.FUNG_ALAT_BANTU;
		else
			e('aBantu').innerHTML="";
		
		if(h.FUNG_PROTHESA!=null)
			e('prothesa').innerHTML=h.FUNG_PROTHESA;
		else
			e('prothesa').innerHTML="";
		
		if(h.FUNG_CACAT_TUBUH!=null)
			e('cTubuh').innerHTML=h.FUNG_CACAT_TUBUH;
		else
			e('cTubuh').innerHTML="";
		
		if(h.FUNG_FUNG_ADL!=null)
			e('adl').innerHTML=h.FUNG_FUNG_ADL;
		else
			e('adl').innerHTML="";
		
		if(h.FUNG_RWT_JATUH!=null)
			e('rJatuh').innerHTML=h.FUNG_RWT_JATUH;
		else
			e('rJatuh').innerHTML="";
		
		if(h.STATUS_JIWA!=null)
			e('sJiwa').innerHTML=h.STATUS_JIWA;
		else
			e('sJiwa').innerHTML="";
		
		if(h.HAMBATAN_EDUKASI!=null)
			e('hEdukasi').innerHTML=h.HAMBATAN_EDUKASI;
		else
			e('hEdukasi').innerHTML="";
		
		if(h.HAMBATAN_EDUKASI_KET!=null)
			e('kHambatan').innerHTML=h.HAMBATAN_EDUKASI_KET;
		else
			e('kHambatan').innerHTML="";
		
		if(h.DERAJAT_TRANSFER!=null)
			e('dTransfer').innerHTML=h.DERAJAT_TRANSFER;
		else
			e('dTransfer').innerHTML="";
						
	}
	
	function templateModal(){
		$('#templateModal').modal('show');
		e('formTemp').reset();
		selectTemp();
		
		$('#addT').click(function(){
			$('#nTemp').removeAttr('disabled');
			$('#iTemp').removeAttr('disabled');
			$('#saveT').removeAttr('disabled');
			$('#batalT').removeAttr('disabled');
			$('#addT').attr('disabled',true);
		});
		$('#batalT').click(function(){
			$('#nTemp').attr('disabled',true);
			$('#iTemp').attr('disabled',true);
			$('#saveT').attr('disabled',true);
			$('#batalT').attr('disabled',true);
			e('formTemp').reset();
			$('#addT').removeAttr('disabled');
		});
		
		textHeight('iTemp');
	}
	function selectTemp(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTemp/'+idUser,
			type : "post",	
			dataType : "json",
			success : function(o)
			{
				var prod=o;
				tabelTemp(prod);
				$('#nTemp2').attr('disabled',true);
				$('#iTemp2').attr('disabled',true);
				e('iTemp2').value="";
				e('nTemp2').value="";
				$('#uTemp,#dTemp').attr('disabled',true);
			},error:function(o){
				var content=e('masterTemp');
				content.innerHTML="";
				content.innerHTML="Tidak ada Template.";
				$('#nTemp2').attr('disabled',true);
				$('#iTemp2').attr('disabled',true);
				e('iTemp2').value="";
				e('nTemp2').value="";
				$('#uTemp,#dTemp').attr('disabled',true);
			}	
		});
	}
	function selectTemp1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTemp/'+idUser,
			type : "post",	
			dataType : "json",
			success : function(o)
			{
				var prod=o;
				tabelTemp1(prod);
			},error:function(o){
				var content=e('masterTemp1');
				content.innerHTML="";
				content.innerHTML="Tidak ada Template.";
			}	
		});
	}
	function selectTemp2(idTemp,no){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTemp2/'+idUser,
			type : "post",
			data:{idTemp:idTemp},
			dataType : "json",
			success : function(o)
			{
				var prod=o;
				if(prod.length!=0){
					e("nTemp"+no).value=prod[0].NAMA_TEMPLATE;
					e("iTemp"+no).value=prod[0].ISI_TEMPLATE;
				}
			},error:function(o){
				
			}	
		});
	}
	function tabelTemp(prod){
		var content=e('masterTemp');
		content.innerHTML="";
		var pilih="";
		var dHeight=bodyHeight*0.75;
		content.style.height=(dHeight-165)+"px";
		var content1=e("isiTemp");
		content1.style.height=(dHeight-165)+"px";
		var label=c("label",content);
		label.innerHTML="Cari Template";
		label.style.cssText="margin:5px";
		var input=c("input",content,null,"kdTemp");
		input.setAttribute("type","text");
		input.value="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","temp_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TEMPLATE";
		var tbody=c("tbody",table);
			if(prod.length!=0){
				for (var i=0;i<prod.length;i++) {
					var h=prod[i];
					tr = c("tr", tbody,null,h.TEMPLATE_ID);
					tr.ondblclick=function(){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						idTemp=this.id;
						selectTemp2(idTemp,2);
						$('#uTemp,#dTemp').removeAttr('disabled');
						$('#nTemp2').removeAttr('disabled');
						$('#iTemp2').removeAttr('disabled');
						//e("nTemp2").value=this.cells[0].id;
						//e("iTemp2").value=this.cells[1].innerHTML;
					}
					tr.onkeydown=function(event){
						if(event.keyCode==13){
							$(this).closest('table').find('td').removeAttr("style");			
							$(this).children("td").css("background","#C0C0C0");
							idTemp=this.id;
							selectTemp2(idTemp,2);
							$('#uTemp,#dTemp').removeAttr('disabled');
							$('#nTemp2').removeAttr('disabled');
							$('#iTemp2').removeAttr('disabled');
							//e("nTemp2").value=this.cells[0].id;
							//e("iTemp2").value=this.cells[1].innerHTML;
						}
					}
					var td = c("td", tr,null,h.NAMA_TEMPLATE);
					td.innerHTML="<a class='activation' href=javascript:myClick('"+h.TEMPLATE_ID+"')>"+h.NAMA_TEMPLATE+"</a>";
					td.setAttribute('title',h.NAMA_TEMPLATE);
					td = c("td", tr,'nonetab');
					td.innerHTML=h.ISI_TEMPLATE;
				}	
				pilih='#'+prod[0].TEMPLATE_ID;
			}
			jQuery.tableNavigation();
			$('#temp_table').fixheadertable({ 
				height:dHeight-222,
				zebra:true
			});
			var $rows = $('#temp_table tr td:first-child');
			$('#kdTemp').keyup(function() {
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

				$rows.show().filter(function() {
					var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
					return !~text.indexOf(val);
				}).hide();
			});		
			$('#tempModal').on('shown.bs.modal', function () {
				$(pilih+' td .activation').focus();
			});
	}
	function addTemplate(){
		var nama=e('nTemp').value;
		var isi=e('iTemp').value;
		
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertTemp/'+idUser,
			type : "post",
			data:{nama:nama,isi:isi},
			success : function(o)
			{
				var prod=o;
				$('#nTemp').attr('disabled',true);
				$('#iTemp').attr('disabled',true);
				$('#saveT').attr('disabled',true);
				$('#batalT').attr('disabled',true);
				$('#addT').removeAttr('disabled');
				e('formTemp').reset();
				sudahDisimpan=true;
				bootbox.alert('Template Sudah Tersimpan!');
				selectTemp();
			},error:function(o){
				bootbox.alert('Template Gagal Tersimpan!');
			}	
		});
	}
	function updateTemplate(){
		var nama=e('nTemp2').value;
		if(nama.length==0){
			bootbox.alert('Silakan Isi Nama Template!',function(){
				setTimeout(function(){$('#nTemp2').focus();},10);
			});
			return;
		}
		var isi=e('iTemp2').value;
		if(isi.length==0){
			bootbox.alert('Silakan Isi Template!',function(){
				setTimeout(function(){$('#iTemp2').focus();},10);
			});;
			return;
		}
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateTemp/'+idUser,
			type : "post",
			data:{idTemp:idTemp,nama:nama,isi:isi,tanggal:tanggal},
			success : function(o)
			{
				var prod=o;
				sudahDisimpan=true;
				bootbox.alert('Template Sudah Tersimpan!');
				selectTemp();
			},error:function(o){
				bootbox.alert('Template Gagal Tersimpan!');
			}	
		});
	}
	function deleteTemplate(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteTemp/'+idUser,
			type : "post",
			data:{idTemp:idTemp,tanggal:tanggal},
			success : function(o)
			{
				var prod=o;
				sudahDisimpan=true;
				bootbox.alert('Template Sudah Di Hapus!');
				selectTemp();
			},error:function(o){
				bootbox.alert('Template Gagal  Di Hapus!');
			}	
		});
	}
	function addTempModal(){
		$('#addTempModal').modal('show');
		selectTemp1();
		e('iTemp3').value="";
		e('nTemp3').value="";
		$('#iTemp3').attr('disabled',true);
		$('#nTemp3').attr('disabled',true);
		
	}		
	function tabelTemp1(prod){
		var content=e('masterTemp1');
		content.innerHTML="";
		var pilih="";
		var dHeight=bodyHeight*0.75;
		content.style.height=(dHeight-46)+"px";
		var content1=e("isiTemp1");
		content1.style.height=(dHeight-46)+"px";
		var label=c("label",content);
		label.innerHTML="Cari Template";
		label.style.cssText="margin:5px";
		var input=c("input",content,null,"kdTemp1");
		input.setAttribute("type","text");
		input.value="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","temp1_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TEMPLATE";
		var tbody=c("tbody",table);
			if(prod.length!=0){
				for (var i=0;i<prod.length;i++) {
					var h=prod[i];
					tr = c("tr", tbody,null,h.TEMPLATE_ID);
					tr.ondblclick=function(){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						idTemp=this.id;
						selectTemp2(idTemp,3);
						//e("nTemp3").value=this.cells[0].id;
						//e("iTemp3").value=this.cells[1].innerHTML;
					}
					tr.onkeydown=function(event){
						if(event.keyCode==13){
							$(this).closest('table').find('td').removeAttr("style");			
							$(this).children("td").css("background","#C0C0C0");
							idTemp=this.id;
							selectTemp2(idTemp,3);
							//e("nTemp3").value=this.cells[0].id;
							//e("iTemp3").value=this.cells[1].innerHTML;
						}
					}
					var td = c("td", tr,null,h.NAMA_TEMPLATE);
					td.innerHTML="<a class='activation' href=javascript:myClick('"+h.TEMPLATE_ID+"') >"+h.NAMA_TEMPLATE+"</a>";
					td.setAttribute('title',h.NAMA_TEMPLATE);
					td = c("td", tr,'nonetab');
					td.innerHTML=h.ISI_TEMPLATE;
				}
				pilih='#'+h.TEMPLATE_ID;
			}
			jQuery.tableNavigation();
			$('#temp1_table').fixheadertable({ 
				height:dHeight-99,
				zebra:true
			});
			var $rows = $('#temp1_table tr td:first-child');
			$('#kdTemp1').keyup(function() {
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

				$rows.show().filter(function() {
					var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
					return !~text.indexOf(val);
				}).hide();
			});		
			$('#addTempModal').on('shown.bs.modal', function () {
				$(pilih+' td .activation').focus();
			});
	}
	
	function btnSimpan(){
		$( '#obatModal' ).on('hide.bs.modal', function() {
			//if(!resepProses)
				deleteLock();
		});
		$('#uTemp').click(function(){
			updateTemplate();
		});
		$('#addTemp').click(function(){
			var content=e('iTemp3').value;
			if(content.length!=0){
				e('O').value=content;
				autoSize('O');
				$('#addTempModal').modal('hide');
			}else 
				bootbox.alert('Silakan Pilih Template!');
		});
		textHeight('SKonsul');textHeight('S2Konsul');textHeight('S3Konsul');textHeight('OKonsul');textHeight('AKonsul');textHeight('PKonsul');
		textHeight('JSKonsul');textHeight('JS2Konsul');textHeight('JS3Konsul');textHeight('JOKonsul');textHeight('JAKonsul');textHeight('JPKonsul');
		$('#tbDokter1,#bbDokter1').keydown(function(event){
			if(event.keyCode==13 || event.keyCode==9){
				var bb=e('bbDokter1').value;
				var tb=e('tbDokter1').value;
				if(bb.length!=0){
					var iNum=isNumber(bb);
					if(!iNum){
						bootbox.alert('Silakan Isi Berat Badan Yang Benar!',function(){
							setTimeout(function(){$('#bbDokter1').focus(),10});
						});
						return;
					}
				}else{
					bootbox.alert('Silakan Isi Berat Badan!',function(){
						setTimeout(function(){$('#bbDokter1').focus(),10});
					});
					return;
				}
				if(tb.length!=0){
					var iNum=isNumber(tb);
					if(!iNum){
						bootbox.alert('Silakan Isi Tinggi Badan Yang Benar!',function(){
							setTimeout(function(){$('#tbDokter1').focus(),10});
						});
						return;
					}
				}else{
					bootbox.alert('Silakan Isi Tinggi Badan!',function(){
						setTimeout(function(){$('#tbDokter1').focus(),10});
					});
					return;
				}
				tb=tb/100;
				var imt=bb/(tb*tb);
				imt=imt.toFixed(2);
				e('imtDokter1').value=imt;
			}
		});

		$('#save_ringkasan').click(function(){
			save_ringkasan1();
		});
		
		$('#save_Asesmen_Perawat').click(function(){
			save_Asesmen_Perawat();
		});

		$('#save_Asesmen_Dokter').click(function(){
			save_Asesmen_Dokter();
		});

		$('#save_asesmen2').click(function(){
			save_asesmen2();
		});
		
		$('#add_pengantar').click(function(){
			save_pengantar();
		});

		$('#save_Transfer').click(function(){
			save_Transfer();
		});

		$("#tbDokter1,#bbDokter1").blur(function(){
			var bb=e('bbDokter1').value;
			var tb=e('tbDokter1').value;
			if(bb.length!=0){
				var iNum=isNumber(bb);
				if(!iNum){
					bootbox.alert('Silakan Isi Berat Badan Yang Benar!',function(){
						setTimeout(function(){$('#bbDokter1').focus(),10});
					});
					return;
				}
			}else{
				bootbox.alert('Silakan Isi Berat Badan!',function(){
					setTimeout(function(){$('#bbDokter1').focus(),10});
				});
				return;
			}
			if(tb.length!=0){
				var iNum=isNumber(tb);
				if(!iNum){
					bootbox.alert('Silakan Isi Tinggi Badan Yang Benar!',function(){
						setTimeout(function(){$('#tbDokter1').focus(),10});
					});
					return;
				}
			}else{
				bootbox.alert('Silakan Isi Tinggi Badan!',function(){
					setTimeout(function(){$('#tbDokter1').focus(),10});
				});
				return;
			}
			tb=tb/100;
			var imt=bb/(tb*tb);
			imt=imt.toFixed(2);
			e('imtDokter1').value=imt;
		});
		var simpan=e("obatSave");
		simpan.onclick=function(){
			var length1=obatResep.length;
			var old=false;
			if(length1!=0){
				var cekResep=[];
				for(var i=0;i<length1;i++){
					if(obatResep[i][12]=='04')
						obatResep[i][12]='00';
					
					if(obatResep[i][12]=='00')
						cekResep.push(obatResep[i][0]);
					
					if(obatResep[i][11] || rKe=='2')
						old=true;
				}
				var res=hasDuplicates(cekResep);
				if(res){
					bootbox.alert('Obat ganda!');
					return;
				}else{
				  if(old)
					deleteResep();
				  else{
					var a=0;
					for(var i=0;i<length1;i++){
						var a=a+1;
						addResep(a,obatResep[i][0],obatResep[i][1],obatResep[i][2],obatResep[i][4],obatResep[i][6],obatResep[i][8],obatResep[i][9],obatResep[i][10],obatResep[i][7],obatResep[i][12],obatResep[i][13],obatResep[i][14],obatResep[i][15],obatResep[i][16]);	
					}
					insertWorkResep(resepKe);
					resepKe=eval(resepKe)+1;
					rKe=resepKe;
				  }				 
				  sudahDisimpan=true;
				  bootbox.alert('Data Resep Sudah Tersimpan!');
				  $('#obatModal').modal('hide');
				}
			}else{
				deleteResep1();
				$('#obatModal').modal('hide');
			}
			setTimeout('getTotal()',1000);
			setTimeout('getLink()',1000);
		}
		var tutup=e("obatTutup");
		tutup.onclick=function(){
			resepKe=rKe;
		}
		btn=e("getFObat");
		btn.onclick=function(){
			$('#addFOModal').modal('show');
			formulaObat=[];
			setTimeout('selectMSFO()',200);
		}
		btn=e("getHResep");
		btn.onclick=function(){
			$('#getHRModal').modal('show');
			formulaObat=[];
			setTimeout('searchSejarah()',200);
		}
/*------------------ laboratorium simpan ------------------*/
		var save=e("labSave");
		save.onclick=function(){
			var length2=labPil.length;
			var old=false;
			var newPem=false;
			if(length2!=0){
				var cat=e("arealabBody").value;
				
				for(var i=0;i<length2;i++){
					if(labPil[i][8])
						newPem=true;
					if(labPil[i][11]=='old'){
						old=true;
					}
					
				}
				if(!newPem){
					deleteLab1();
					$('#labModal').modal('hide');
					setTimeout('getTotal()',300);
					return;
				}
				
				if(old)
					deleteLab();
				else{
					for(var i=0;i<length2;i++){
						if(labPil[i][8])
							addLab(labPil[i][0],cat,i,labPil[i][10]);
					}
					insertWorkLab(labKe);
					labKe=eval(labKe)+1;
					lKe=labKe;
					bootbox.alert('Data Pemeriksaan Laboratorium Sudah Tersimpan!');
				}	
				
				sudahDisimpan=true;
				//bootbox.alert('Data Pemeriksaan Laboratorium Sudah Tersimpan!');
				$('#labModal').modal('hide');
			}else{
				deleteLab1();
				$('#labModal').modal('hide');
			}
			setTimeout('getTotal()',300);
		}
		var tutup=e("labTutup");
		tutup.onclick=function(){
			labKe=lKe;
		}
/*------------------ Radiologi simpan ------------------*/
		var save=e("radSave");
		save.onclick=function(){
			var length3=radPil.length;
			var old=false;
			var newPem=false;
			if(length3!=0){
				var cat=e("arearadBody").value;
				for(var i=0;i<length3;i++){
					if(radPil[i][11])
						newPem=true;
					if(radPil[i][12]=='old'){
						old=true;
					}
				}
				if(!newPem){
					deleteRad1();
					$('#radModal').modal('hide');
					setTimeout('getTotal()',300);
					return;
				}
				if(old)
					deleteRad();
				else{
					for(var i=0;i<length3;i++){
						if(radPil[i][11])
							addRad(radPil[i][0],cat,radPil[i][9],radPil[i][10],i);
					}
					insertWorkRad(radKe);
					radKe=eval(radKe)+1;
					raKe=radKe;
					bootbox.alert('Data Pemeriksaan Radiologi Sudah Tersimpan!');
				}
				sudahDisimpan=true;
				//bootbox.alert('Data Pemeriksaan Radiologi Sudah Tersimpan!');
				$('#radModal').modal('hide');
			}else{
				deleteRad1();
				$('#radModal').modal('hide');
			}
			setTimeout('getTotal()',300);
		}
		var tutup=e("radTutup");
		tutup.onclick=function(){
			radKe=raKe;
		}
/*------------------ layanan simpan ------------------*/
		var simpan=e("alkesSave");
		simpan.onclick=function(){
			var length=alkesResep.length;
			var old=false;
			if(length!=0){
				var cekAlkes=[];
				for(var i=0;i<length;i++){
					cekAlkes.push(alkesResep[i][0]);
					if(alkesResep[i][4]=='Old' || aKe=='2')
						old=true;
				}
				var alk=hasDuplicates(cekAlkes);
				if(alk){
					bootbox.alert('Tindakan ganda!');
					return;
				}else{
					if(old)
						deleteAlkes();
					else{
						for(var i=0;i<length;i++){
							addAlkes(alkesResep[i][0],alkesResep[i][1],alkesResep[i][2],alkesResep[i][3]);
						}
						alkesKe=eval(alkesKe)+1;
						aKe=alkesKe;	
					}
					sudahDisimpan=true;
					bootbox.alert('Data Tindakan Sudah Tersimpan!');
					$('#alkesModal').modal('hide');
				}
			}else{
				deleteAlkes1();
				$('#alkesModal').modal('hide');
			}
			setTimeout('getTotal()',300);
		}
		var tutup=e("alkesTutup");
		tutup.onclick=function(){
			alkesKe=aKe;
		}
		btn=e("getFTindakan");
		btn.onclick=function(){
			$('#addFTModal').modal('show');
			formulaTindakan=[];
			setTimeout('selectMSFT()',200);
		}
	/*------------------ PPK simpan ------------------*/	
		var simpan=e("PPKSave");
		simpan.onclick=function(){
			/*if(idPPK==""){
				bootbox.alert('Silakan Pilih PPK!');
				return;
			}*/
			var length1=ppkRe.length;
			if(length1!=0){
				var cekResep=[];
				for(var i=0;i<length1;i++){
					if(ppkRe[i][12]=='04')
						ppkRe[i][12]='00';
					
					if(ppkRe[i][12]=='00')
						cekResep.push(ppkRe[i][1]);
				}
				var res=hasDuplicates(cekResep);
				if(res){
					bootbox.alert('Obat ganda!');
					return;
				}
				var a=0;
				var ada=false;
				if(resepKe==1){
					for(var i=0;i<length1;i++){
						if(ppkRe[i][16]){
							var a=a+1;
							ada=true;
							addResep(a,ppkRe[i][1],ppkRe[i][2],ppkRe[i][3],ppkRe[i][5],ppkRe[i][7],ppkRe[i][8],ppkRe[i][9],ppkRe[i][10],"",ppkRe[i][12],ppkRe[i][13],ppkRe[i][14],ppkRe[i][15],ppkRe[i][18]);							
						}
					}
				}else if(resepKe==2){
					for(var i=0;i<length1;i++){
						if(ppkRe[i][16]){
							ada=true;
							continue;
						}
					}
					if(ada)
						deleteResep2();					
				}
				if(ada){
					if(resepKe==1){
						insertWorkResep(resepKe);
						resepKe=eval(resepKe)+1;
						rKe=resepKe;
					}
				}
			}
			var length2=ppkLa.length;
			if(length2!=0){
				var ada1=false;
				if(labKe==1){
					for(var i=0;i<length2;i++){
						if(ppkLa[i][5]){
							ada1=true;
							addLab(ppkLa[i][1],"",ppkLa[i][2],ppkLa[i][4]);
						}
					}
				}else{
					for(var i=0;i<length2;i++){
						if(ppkLa[i][5]){
							ada1=true;
							continue;
						}
					}
					if(ada1)
						deleteLab2();
				}
				if(ada1){
					if(labKe==1){
						insertWorkLab(labKe);
						labKe=eval(labKe)+1;
						lKe=labKe;
					}
				}
			}	
			var length3=ppkRa.length;
			if(length3!=0){
				var ada2=false;
				if(radKe==1){
					for(var i=0;i<length3;i++){
						if(ppkRa[i][5]){
							ada2=true;
							addRad(ppkRa[i][1],"",'N','N',ppkRa[i][2]);
						}
					}
				}else if(radKe==2){
					for(var i=0;i<length3;i++){
						if(ppkRa[i][5]){
							ada2=true;
							continue;
						}
					}
					if(ada2)
						deleteRad2();
				}
				if(ada2){
					if(radKe==1){	
						insertWorkRad(radKe);
						radKe=eval(radKe)+1;
						raKe=radKe;
					}
				}
			}
			var length6=ppkTi.length;
			var ada5=false;
			if(length6!=0){
				var cekAlkes=[];
				for(var i=0;i<length6;i++){
					if(ppkTi[i][4])
						cekAlkes.push(ppkTi[i][1]);
					if(ppkTi[i][4])
						ada5=true;
				}
				var alk=hasDuplicates(cekAlkes);
				if(alk){
					bootbox.alert('Tindakan ganda!');
					return;
				}else{
					if(alkesKe==1){
						for(var i=0;i<length6;i++){
							if(ppkTi[i][4]){
								ada5=true;
								addAlkes(ppkTi[i][1],ppkTi[i][2],ppkTi[i][3],'');
							}
						}
					}else if(alkesKe==2){
						for(var i=0;i<length6;i++){
							if(ppkTi[i][4]){
								ada5=true;
								continue;
							}
						}
						if(ada5)
							deleteAlkes2();					
					}
				}
			}
			setTimeout('getTotal()',1000);
			var length4=ppk10.length;
			if(length4!=0){
				for(var i=0;i<length4;i++){
					if(ppk10[i][5]){
						if(ppk10[i][4]=='1'){
							var dd=e('btnf1').innerHTML;
								if(dd=="ICD 10")
									$('#btnf1').click();
							e('k1').value=ppk10[i][1];
							e('i1').value=ppk10[i][2];
							e('d1').value=ppk10[i][3];
						}else{
							var dia=[];
							dia[0]=ppk10[i][1];
							dia[1]=ppk10[i][2];
							dia[2]=ppk10[i][3];
							dia[3]='new';
							dia[4]=idEpisode+diag.length;
							diag.push(dia);
						}
					}	
				}
				table_diag();
			}
			var length5=ppk9.length;
			if(length5!=0){
				for(var i=0;i<length5;i++){
					if(ppk9[i][5]){
						if(ppk9[i][4]=='1'){
							var dd=e('btnf3').innerHTML;
								if(dd=="ICD 9 CM")
									$('#btnf3').click();
							e('k9').value=ppk9[i][1];
							e('i9').value=ppk9[i][2];
							e('d9').value=ppk9[i][3];
						}else{
							var tin=[];
							tin[0]=ppk9[i][1];
							tin[1]=ppk9[i][2];
							tin[2]=ppk9[i][3];
							tin[3]='new';
							tin[4]=idEpisode+tindak.length;
							tindak.push(tin);
						}
					}	
				}
				table_tindak();
			}
			$('#addPPKModal').modal('hide');
		}
	/*------------------ Template PPK simpan ------------------*/	
		var simpan=e("PPKSave1");
		simpan.onclick=function(){
			if(idPPK==""){
				bootbox.alert('Silakan Pilih PPK!');
				return;
			}
			var length1=ppkRe1.length;
			if(length1!=0){
				var cekResep=[];
				for(var i=0;i<length1;i++){
					if(ppkRe1[i][12]=='04')
						ppkRe1[i][12]='00';
					
					if(ppkRe1[i][12]=='00')
						cekResep.push(ppkRe1[i][1]);
				}
				var res=hasDuplicates(cekResep);
				if(res){
					bootbox.alert('Obat ganda!');
					return;
				}
				deletePResep(idPPK);
			}
			var length2=ppkLa1.length;
			if(length2!=0){
				var ada1=false;
				for(var i=0;i<length2;i++){
					if(ppkLa1[i][8]){
						ada1=true;
						continue;
					}
				}
				if(ada1)
					deletePLab(idPPK);
			}	
			var length3=ppkRa1.length;
			if(length3!=0){
				var ada2=false;
				for(var i=0;i<length3;i++){
					if(ppkRa1[i][11]){
						ada2=true;
						continue;
					}
				}
				if(ada2)
					deletePRad(idPPK);
			}
			var length4=diag1.length;
			if(length4!=0){
				var ada3=false;
				for(var i=0;i<length4;i++){
					if(diag1[i][5]){
						ada3=true;
						continue;
					}
				}
				if(ada3)
					deletePICD10(idPPK);
			}
			var length5=tindak1.length;
			if(length5!=0){
				var ada4=false;
				for(var i=0;i<length5;i++){
					if(tindak1[i][5]){
						ada4=true;
						continue;
					}
				}
				if(ada4)
					deletePICD9(idPPK);
			}
			var length6=ppkTi1.length;
			if(length6!=0){
				var ada5=false;
				for(var i=0;i<length6;i++){
					if(ppkTi1[i][4]){
						ada5=true;
						continue;
					}
				}
				if(ada5)
					deletePTin(idPPK);
			}
			sudahDisimpan=true;
			$('#PPKModal').modal('hide');
		}
/*------------------ formula obat simpan ------------------*/
		var simpan=e("simpanFormula");
		simpan.onclick=function(){
			var length=formulaObat.length;
			var old=false;
			if(idFormula){
				if(length!=0){
					var cekResep=[];
					for(var i=0;i<length;i++){
						if(formulaObat[i][12]=='00')
							cekResep.push(formulaObat[i][1]);
						if(formulaObat[i][11])
							old=true;
					}
					var res=hasDuplicates(cekResep);
					if(res){
						bootbox.alert('Obat ganda!');
						return;
					}else{
					  if(old)
						deleteFO();
					else{
					  var a=0;
					  for(var i=0;i<length;i++){
						var a=i+1;
						addFO(a,formulaObat[i][1],formulaObat[i][2],formulaObat[i][3],formulaObat[i][5],formulaObat[i][8],formulaObat[i][9],formulaObat[i][10],formulaObat[i][7],formulaObat[i][12],formulaObat[i][13],formulaObat[i][14],formulaObat[i][15]);
					  }
					  selectMasterFormObat();
					}
					  sudahDisimpan=true; 
					}
				}else
					bootbox.alert('Silakan Isi Formula Resep!');
			}else
				bootbox.alert('Silakan Pilih Formula Resep!');
		}
/*------------------ formula tindakan simpan ------------------*/
		var simpan=e("simpanTindakan");
		simpan.onclick=function(){
			var length=formulaTindakan.length;
			var old=false;
			if(idTindakan){
			  if(length!=0){
				var cekAlkes=[];
				for(var i=0;i<length;i++){
					cekAlkes.push(formulaTindakan[i][1]);
					if(formulaTindakan[i][6])
						old=true;
				}
				var alk=hasDuplicates(cekAlkes);
				if(alk){
					bootbox.alert('Tindakan ganda!');
					return;
				}else{
					if(old)
						deleteFT();
					else{
						for(var i=0;i<length;i++){
							addFT(formulaTindakan[i][1],formulaTindakan[i][2],formulaTindakan[i][3],formulaTindakan[i][5]);
						}
						selectMasterFT();
					}
					sudahDisimpan=true;
				}
			  }else
				bootbox.alert('Silakan Isi Formula Tindakan!');
			}else
				bootbox.alert('Silakan Pilih Formula Tindakan!');
		}
	/*------------------ anamnesa dokter simpan ------------------*/
		var simpan=e("anamSave");
		simpan.onclick=function(){
			var anam1=[];
			var td1=e('tdDokter1').value;
			if(td1.length!=0){
				var iNum=isNumber(td1);
				if(!iNum){
					bootbox.alert('Silakan Isi Tekanan Darah Atas Yang Benar!',function(){
						setTimeout(function(){$('#tdDokter1').focus(),10});
					});
					return;
				}
			}
			var td2=e('tdDokter1').value;
			if(td2.length!=0){
				var iNum=isNumber(td2);
				if(!iNum){
					bootbox.alert('Silakan Isi Tekanan Darah Bawah Yang Benar!',function(){
						setTimeout(function(){$('#tdDokter2').focus(),10});
					});
					return;
				}
			}
			var fn1=e('fnDokter1').value;
			if(fn1.length!=0){
				var iNum=isNumber(fn1);
				if(!iNum){
					bootbox.alert('Silakan Isi Frekuensi Nadi Yang Benar!',function(){
						setTimeout(function(){$('#fnDokter1').focus(),10});
					});
					return;
				}
			}
			var sh1=e('shDokter1').value;
			if(sh1.length!=0){
				var iNum=isNumber(sh1);
				if(!iNum){
					bootbox.alert('Silakan Isi Suhu Yang Benar!',function(){
						setTimeout(function(){$('#shDokter1').focus(),10});
					});
					return;
				}
			}
			var fn2=e('fn2Dokter1').value;
			if(fn2.length!=0){
				var iNum=isNumber(fn2);
				if(!iNum){
					bootbox.alert('Silakan Isi Frekuensi Nafas Yang Benar!',function(){
						setTimeout(function(){$('#fn2Dokter1').focus(),10});
					});
					return;
				}
			}
			var bb=e('bbDokter1').value;
			if(bb.length!=0){
				var iNum=isNumber(bb);
				if(!iNum){
					bootbox.alert('Silakan Isi Berat Badan Yang Benar!',function(){
						setTimeout(function(){$('#bbDokter1').focus(),10});
					});
					return;
				}
			}
			var tb=e('tbDokter1').value;
			if(tb.length!=0){
				var iNum=isNumber(tb);
				if(!iNum){
					bootbox.alert('Silakan Isi Tinggi Badan Yang Benar!',function(){
						setTimeout(function(){$('#tbDokter1').focus(),10});
					});
					return;
				}
			}
			anam1[0]=e('tdDokter1').value;
			anam1[1]=e('tdDokter2').value; 
			anam1[2]=e('fnDokter1').value;
			anam1[3]=e('shDokter1').value;
			anam1[4]=e('fn2Dokter1').value;
			anam1[5]=e('bbDokter1').value;
			anam1[6]=e('tbDokter1').value;
			anam1[7]=e('imtDokter1').value;
			if(anam1[0]!="" || anam1[1]!="")
				e('tdDokter').innerHTML=anam1[0]+" / "+anam1[1]+' mmHg';
			else
				e('tdDokter').innerHTML="";
			if(anam1[2]!="")
				e('fnDokter').innerHTML=anam1[2]+" x/menit ";
			else
				e('fnDokter').innerHTML="";
			if(anam1[3]!="")
				e('shDokter').innerHTML=anam1[3]+" c ";
			else
				e('shDokter').innerHTML="";
			if(anam1[4]!="")
				e('fn2Dokter').innerHTML=anam1[4]+" x/menit ";
			else
				e('fn2Dokter').innerHTML="";
			if(anam1[5]!="")
				e('bbDokter').innerHTML=anam1[5]+" kg ";
			else
				e('bbDokter').innerHTML="";
			if(anam1[6]!="")
				e('tbDokter').innerHTML=anam1[6]+" cm ";
			else
				e('tbDokter').innerHTML="";
			if(anam1[7]!="")
				e('imtDokter').innerHTML=anam1[7];
			else
				e('imtDokter').innerHTML="";
			anam[1]=anam1;
			$('#addAnamModal').modal('hide');
			setTimeout(function(){$('#O').focus(),10});
		}
	}
	
	function updateAnam(td1,td2,fnadi,suhu,fnafas,bb,tb,imt){
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateAnam/'+idUser,
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans,td1:td1,td2:td2,fnadi:fnadi,suhu:suhu,fnafas:fnafas,bb:bb,tb:tb,imt:imt},
			success : function(o)
			{
			
			},error:function(o){		
				bootbox.alert('Gagal Simpan Anamnesa Dokter!');
			}
		});
	}
	function imageLokalis(){
		textHeight('ketImage');
		e('formImage').reset();
		$('#image_menu').modal('show');
		$('#wPaint').wPaint({
			path: base_url+'asset/wPaint/',
			menuOrientation:'horizontal',
			menuOffsetTop: -50,
			imageStretch:true,
			lineWidth:   '1',
			fillStyle:   '#000000', 
			strokeStyle: '#000000'
		});
		$('#wPaint').wPaint('clear');
		var content=e('tempImage');
		content.innerHTML="";
		for(var i=0;i<9;i++){
			var anchor=c('a',content,'imgTemp','imgTo_'+i);
			var img=c('img',anchor);
			img.src=base_url+'../tempImg/temp_'+i+'.jpg';
			anchor.href='javascript:addImage1('+i+')';
		}
		$('#image_menu').on('shown.bs.modal', function () {
			$('#nImage').focus();
		});
	}
	function addImage1(no){
		var imageTo=base_url+'../tempImg/temp_'+no+'.jpg';
		$('#wPaint').wPaint('image', imageTo);
	}
	function addImage(){
		var pImg = $("#wPaint").wPaint("image");
		if(pImg.length<800){
			bootbox.alert('Silakan Pilih Image Totalis!');
			return;
		}
		
		var nama=e('nImage').value;
		var ket=e('ketImage').value;
		var images=[];
		images[0]=pImg;
		images[1]=nama;
		images[2]=ket;
		images[3]='new';
		periksaImg.push(images);
		$('#image_menu').modal('hide');
		table_img();
	}
	function saveImage(pImg,nama,ket,idGambar){
		
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertTotalis/'+idUser,
			type : "post",
			data : {idEpisode:idEpisode,idTransCo:idTransCo,idTrans:idTrans,idPasien:idPasien,idPoli:idPoli,pImg:pImg,nama:nama,ket:ket,idGambar:idGambar},
			success : function(o)
			{
				var prod = o;
			},error:function(o)
			{		
				bootbox.alert('Gagal Simpan Image Totalis!');
			}
		});
	}
	function selectTotalis(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTotalis',
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				e('formImage1').reset();
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var h=prod[i];
						var images=[];
						images[0]=h.GAMBAR_ID;
						images[1]=h.NAMA;
						images[2]=h.KETERANGAN;
						images[3]='old';
						periksaImg.push(images);
					}
				}
				table_img();
			},error:function(o)
			{
				e('formImage1').reset();				
			}
		});
	}
	function deleteTotalis(kode){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteTotalis',
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo,idGambar:kode},
			success : function(o)
			{
				var prod = o;	
				bootbox.alert('Data Lokalis Sudah Terhapus !');
			},error:function(o)
			{		
				bootbox.alert('Data Lokalis Gagal Terhapus!');
			}
		});
	}
	function table_img(){
		var content=e('imgTable');
		content.innerHTML="";
		cWidth=content.offsetWidth;
		var table=c('table',content);
		var tbody=c('tbody',table);
		if(periksaImg.length!=0){
		 for (var i=0;i<periksaImg.length;i++) {
			var h = periksaImg[i];
			tr = c("tr", tbody,null,i+'_img');
			tr.ondblclick=function(){
				var id=this.id;
				var no=id.split('_')[0];
				$('#image_menu1').modal('show');
				width=bodyWidth*0.55;
				height=bodyHeight*0.48;
				var paint=e('wPaint1');
					paint.innerHTML="";
				if(periksaImg[no][3]=='old')
					paint.style.cssText='background:white url('+base_url+'../imagePasien/'+periksaImg[no][0]+'.png) no-repeat scroll center; background-size:100% 100%; width:'+width+'px; height:'+height+'px; padding-bottom:5px; margin:20px auto;';
				else{
					paint.style.cssText='background:white; background-size:100% 100%; width:'+width+'px; height:'+height+'px; padding-bottom:5px; margin:20px auto;';
					var image = new Image();
					image.src = periksaImg[no][0];
					//image.src = base_url+'../imagePasien/'+periksaImg[no][0]+'.png?' + new Date().getTime();
					paint.appendChild(image);
				}
				e('nImage1').value=periksaImg[no][1];
				e('ketImage1').value=periksaImg[no][2];
				autoSize('ketImage1');
			}
			var tWidth=(cWidth/2)-25;
			var le=tWidth/6;
			var td = c("td", tr);
			if(h[1].length<le)
				td.innerHTML=h[1];
			else
				td.innerHTML=h[1].substring(0,le-3)+'...';
			td.setAttribute('title',h[1]);
			td.style.width=tWidth+'px';
			
			var td = c("td", tr);
			if(h[2].length<le)
				td.innerHTML=h[2];
			else
				td.innerHTML=h[2].substring(0,le-3)+'...';
			td.setAttribute('title',h[2]);
			td.style.width=tWidth+'px';
			td = c("td", tr);
			td.style.width='50px';
			if(doneP!='2_done'){
				var button=c('button',td,null,i+'_imgP');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noImg=id.split('_')[0];
					if(periksaImg[noImg][3]=="old"){
						deleteTotalis(periksaImg[noImg][0]);
						periksaImg.splice(noImg,1);
					}else{
						periksaImg.splice(noImg,1);
					}
					table_img();
				}
			}
		 }
		}
	}
	function dapatDokter(){
		$('#dapat_menu').modal('show');
		e('formDapat').reset();
		e('tanggal1').value=moment().format("DD-MM-YYYY");
		e('tanggal2').value=moment().format("DD-MM-YYYY");
		dapat(pasienInfo);
	}
	function getDapat(){
		
		var tanggal1=e('tanggal1').value;
		var tanggal2=e('tanggal2').value;
		var valid=validDate2(tanggal1,tanggal2);
		if(!valid)
			return;
		tanggal1=changeDate(tanggal1);
		tanggal2=changeDate(tanggal2);
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectDapat/'+idUser,
			type : "post",	
			data : {tanggal1:tanggal1,tanggal2:tanggal2},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content=e('tabelDpt');
				content.innerHTML="";
				if(prod.length!=0){
					dapat(prod)
				}else
					content.innerHTML="Tidak ada Pendapatan";
				
			},error:function(o)
			{
								
			}
		});
	}
	function dapat(prod){
		var content=e('tabelDpt');
		content.innerHTML="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","dapat_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="Tanggal";
		th = c("th", tr);
		th.innerHTML="Pasien";
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				if(h.TRANS_ID.substring(0,1)!=1)
					continue;
				var tr=c('tr',tbody);
				var td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
				td = c("td", tr);
				td.innerHTML=h.NAMA;
				td.setAttribute('title',h.NAMA);
			}
		}
		$('#dapat_table').fixheadertable({
			colratio:[150,200],
			width:370,
			height:173,
			zebra:true
		});
	}
	function totalPasien(){
		$('#total_menu').modal('show');
		var content=e('tabelTotal');
		content.innerHTML="";
		getTotal();
	}
	function getTotal(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTotal',
			type : "post",	
			data : {idEpisode:idEpisode,idTrans:idTrans,idPasien:idPasien},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content=e('tabelTotal');
				content.innerHTML="";
				var divtable = c("div",content,"table-content");
				var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","total_table");
				var thead=c("thead",table,"header");
				var tr = c("tr",thead);
				var th = c("th", tr);
				th.innerHTML="Nama Tindakan";
				th = c("th", tr);
				th.innerHTML="Harga";
				var tbody=c("tbody",table);
				/*var tr=c('tr',tbody,null,'bp1');
				var title=c('td',tr,'title1');
				tr.style.cssText='background:#b0d9d7;'
				title.innerHTML='Pemeriksaan';
				title.setAttribute('colspan','2');
				var tr=c('tr',tbody,null,'bp2');
				var td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML='Biaya Pemeriksaan';
				td.setAttribute('title','Biaya Pemeriksaan');
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML='Rp. 55,000';
				div.setAttribute('title','Rp. 55,000');*/
				var bayar=false;
				if(prod.length!=0){
					var total=0;
					var total1=0;
					for (var i=0;i<prod.length;i++) {
						var h=prod[i];
						if(i==0){
							var tr=c('tr',tbody);
							var title=c('td',tr,'title1');
							tr.style.cssText='background:#b0d9d7;'
							title.innerHTML=h.JENIS;
							title.setAttribute('colspan','2');
						}
						if(h.JENIS=='Pemeriksaan'){
							harga=formatNumber(h.HARGA);
							total=total+eval(h.HARGA);
							total1=total1+eval(h.HARGA);
							//$('#bp1,#bp2').attr('style','display:none');
							bayar=true;
						}else{
							var tr=c('tr',tbody);
							var td = c("td", tr);
							div=c('div',td,'tKiri');
							div.innerHTML=h.NAMA_LAYAN1;
							td.setAttribute('title',h.NAMA_LAYAN1);
							if(h.JENIS=='RESEP'||h.JENIS=='TINDAKAN'){
								if(h.QTY!=null)
									harga=h.QTY*h.HARGA;
								else
									harga=h.HARGA;
								total=total+eval(harga);
								total1=total1+eval(harga);
								harga=formatNumber(harga);
							}else{
								harga=formatNumber(h.HARGA);
								total=total+eval(h.HARGA);
								total1=total1+eval(h.HARGA);
							}
							td = c("td", tr);
							div=c('div',td,'tKanan');
							div.innerHTML='Rp. '+harga;
							div.setAttribute('title',harga);
						}
						if(i<prod.length-1){
							if(h.JENIS!=prod[i+1].JENIS){
								if(h.JENIS=='Pemeriksaan'){
									var tr=c('tr',tbody);
									var td = c("td", tr);
									div=c('div',td,'tKiri');
									div.innerHTML=h.NAMA_LAYAN1;
									td.setAttribute('title',h.NAMA_LAYAN1);
									td = c("td", tr);
									div=c('div',td,'tKanan');
									div.innerHTML='Rp. '+formatNumber(total1);
									div.setAttribute('title',formatNumber(total1));
								}else{
									var tr=c('tr',tbody);
									tr.style.cssText='color:red; font-weight:bold;'
									var td=c('td',tr);
									div=c('div',td,'tKiri');
									div.innerHTML='Subtotal';
									td=c('td',tr);
									div=c('div',td,'tKanan');
									div.innerHTML='Rp. '+formatNumber(total1);
									div.setAttribute('title','Rp. '+formatNumber(total1));
									td.setAttribute('colspan','2');
								}
								total1=0;
								var tr=c('tr',tbody);
								tr.style.cssText='background:#b0d9d7;'
								var title=c('td',tr,'title1');
								title.innerHTML=prod[i+1].JENIS;
								title.setAttribute('colspan','2');
							}
						}
						if(i==prod.length-1){
							if(h.JENIS=='Pemeriksaan'){
								var tr=c('tr',tbody);
								var td = c("td", tr);
								div=c('div',td,'tKiri');
								div.innerHTML=h.NAMA_LAYAN1;
								td.setAttribute('title',h.NAMA_LAYAN1);
								td = c("td", tr);
								div=c('div',td,'tKanan');
								div.innerHTML='Rp. '+formatNumber(total1);
								div.setAttribute('title',formatNumber(total1));
								total1=0;
							}else{
								var tr=c('tr',tbody);
								tr.style.cssText='color:red; font-weight:bold;'
								var td=c('td',tr);
								div=c('div',td,'tKiri');
								div.innerHTML='Subtotal';
								td=c('td',tr);
								div=c('div',td,'tKanan');
								div.innerHTML='Rp. '+formatNumber(total1);
								div.setAttribute('title','Rp. '+formatNumber(total1));
								td.setAttribute('colspan','2');
							}
						}
					}
					if(!bayar){
						total=eval(total);
					}	
					e('totalByr').innerHTML='Total = Rp. '+toRupiah(total);
					e('totalByr').innerHTML='Total = Rp. '+formatNumber(total);
				}else{
					
					e('totalByr').innerHTML='Total = Rp. 0';
				}
				$('#total_table').fixheadertable({
					colratio:[250,95],
					width:370,
					height:173
				});
			},error:function(o)
			{
								
			}
		});
	}
	/*function getTotal(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectTotal',
			type : "post",	
			data : {idEpisode:idEpisode,idTrans:idTrans,idPasien:idPasien},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content=e('tabelTotal');
				content.innerHTML="";
				var divtable = c("div",content,"table-content");
				var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","total_table");
				var thead=c("thead",table,"header");
				var tr = c("tr",thead);
				var th = c("th", tr);
				th.innerHTML="Nama Tindakan";
				th = c("th", tr);
				th.innerHTML="Harga";
				var tbody=c("tbody",table);
				var tr=c('tr',tbody);
				var title=c('td',tr,'title1');
				tr.style.cssText='background:#b0d9d7;'
				title.innerHTML='Pemeriksaan';
				title.setAttribute('colspan','2');
				var tr=c('tr',tbody);
				var td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML='Biaya Pemeriksaan';
				td.setAttribute('title','Biaya Pemeriksaan');
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML='Rp. 55,000';
				div.setAttribute('title','Rp. 55,000');
				if(prod.length!=0){
					var total=55000;
					var total1=0;
					for (var i=0;i<prod.length;i++) {
						var h=prod[i];
						if(i==0){
							var tr=c('tr',tbody);
							var title=c('td',tr,'title1');
							tr.style.cssText='background:#b0d9d7;'
							title.innerHTML=h.JENIS;
							title.setAttribute('colspan','2');
						}
						var tr=c('tr',tbody);
						var td = c("td", tr);
						div=c('div',td,'tKiri');
						div.innerHTML=h.NAMA_LAYAN1;
						td.setAttribute('title',h.NAMA_LAYAN1);
						if(h.JENIS=='RESEP'||h.JENIS=='TINDAKAN'){
							if(h.QTY!=null)
								harga=h.QTY*h.HARGA;
							else
								harga=h.HARGA;
							total=total+eval(harga);
							total1=total1+eval(harga);
							//harga=toRupiah(harga);
							harga=formatNumber(harga);
						}else{
							//harga=toRupiah(h.HARGA);
							harga=formatNumber(h.HARGA);
							total=total+eval(h.HARGA);
							total1=total1+eval(h.HARGA);
						}
						td = c("td", tr);
						div=c('div',td,'tKanan');
						div.innerHTML='Rp. '+harga;
						div.setAttribute('title',harga);
						//total=total+eval(h.HARGA);
						//total1=total1+eval(h.HARGA);
						if(i<prod.length-1){
							if(h.JENIS!=prod[i+1].JENIS){
								var tr=c('tr',tbody);
								tr.style.cssText='color:red; font-weight:bold;'
								var td=c('td',tr);
								div=c('div',td,'tKiri');
								div.innerHTML='Subtotal';
								td=c('td',tr);
								div=c('div',td,'tKanan');
								//div.innerHTML='Rp. '+toRupiah(total1);
								//div.setAttribute('title','Rp. '+toRupiah(total1));
								div.innerHTML='Rp. '+formatNumber(total1);
								div.setAttribute('title','Rp. '+formatNumber(total1));
								td.setAttribute('colspan','2');
								total1=0;
								var tr=c('tr',tbody);
								tr.style.cssText='background:#b0d9d7;'
								var title=c('td',tr,'title1');
								title.innerHTML=prod[i+1].JENIS;
								title.setAttribute('colspan','2');
							}
						}
						if(i==prod.length-1){
							var tr=c('tr',tbody);
							tr.style.cssText='color:red; font-weight:bold;'
							var td=c('td',tr);
							div=c('div',td,'tKiri');
							div.innerHTML='Subtotal';
							td=c('td',tr);
							div=c('div',td,'tKanan');
							//div.innerHTML='Rp. '+toRupiah(total1);
							//div.setAttribute('title','Rp. '+toRupiah(total1));
							div.innerHTML='Rp. '+formatNumber(total1);
							div.setAttribute('title','Rp. '+formatNumber(total1));
							td.setAttribute('colspan','2');
						}
					}
					e('totalByr').innerHTML='Total = Rp. '+toRupiah(total);
					e('totalByr').innerHTML='Total = Rp. '+formatNumber(total);
				}else{
					e('totalByr').innerHTML='Total = Rp. 55,000';
				}
				$('#total_table').fixheadertable({
					colratio:[250,95],
					width:370,
					height:173
				});
			},error:function(o)
			{
								
			}
		});
	}*/
	function selectPoli(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPoli',
			type : "post",
			data:{idPoli:idPoli},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("poliRujuk");
				content.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.POLI_ID;
						option.innerHTML=h.KETERANGAN;
					}
					selectDokter(prod[0].POLI_ID);
					if(idRekanan!='BPJS'){
						$( "#poliRujuk" ).change(function() {
							var str=$( "#poliRujuk option:selected" ).val();
							selectDokter(str);
						});
					}else{
						$( "#poliRujuk" ).change(function() {
							var content = e("dokterRujuk");
							content.innerHTML="";
							var option=c("option",content);
							option.value='DRRSUD';
							option.innerHTML='DOKTER RSUD';
						});
					}
					selectKonsul();
				}
				
			},error:function(o)
			{		
			
			}
		});
	}
	
	function selectDokter(idPoli2){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectDokter',
			type : "post",
			data:{idPoli2:idPoli2},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("dokterRujuk");
				content.innerHTML="";
				
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.DOKTER_ID;
						option.innerHTML=h.NAMA;
					}
				}else{
					var option=c("option",content);
					option.value='DRRSUD';
					option.innerHTML='DOKTER RSUD';
				}
				content.removeAttribute('disabled');
			},error:function(o)
			{		
			
			}
		});
	}
	function selectKonsul1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectKonsul1/'+idUser,
			type : "post",
			data:{idPasien:idPasien,idPoli:idPoli},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content1 = e("tanggal3");
				var content2 = e("poliRujuk");
				var content3 = e("dokterRujuk");
				$('#rujukSave').removeAttr('style');
				$('#ckSoap').removeAttr('style');
				$('#button3').removeAttr('style');
				
				if(prod.length!=0){
					var h = prod[0];
					var ccc=c('input',content1,'hide','episodeRujuk');
					ccc.style.cssText='display:none';
					e('episodeRujuk').value=h.EPISODE_ID;					
					content1.setAttribute('disabled',true);
					content2.setAttribute('disabled',true);
					content3.setAttribute('disabled',true);
					$('#rujukSave').attr('style','display:none');
					$('#ckSoap').attr('style','display:none');
					$('#jawabSave').removeAttr('style');
					$('#cjSoap').removeAttr('style');
					$('#formKonsul textarea').attr('disabled',true);
					$('#button3').attr('style','display:none');
					$('#formJKonsul textarea').removeAttr('disabled');
					$('#formJKonsul').removeAttr('style');
					$('#formKonsul label').attr('style','color:black');
					content1.value=h.TANGGAL;
					var option=c("option",content2);
					if(h.POLI_ID_RUJUKAN!=null){
						option.value=h.POLI_ID_RUJUKAN;
						option.innerHTML=h.POLI_RUJUK;
					}else{
						option.value='';
						option.innerHTML='';
					}
					content2.value=h.POLI_ID_RUJUKAN;
					var option=c("option",content3);
					if(h.DOKTER_ID_RUJUKAN!=null){
						option.value=h.DOKTER_ID_RUJUKAN;
						option.innerHTML=h.NAMA;
					}else{
						option.value='DOKTER RSUD';
						option.innerHTML='DOKTER RSUD';
					}
					e('SKonsul').value=h.SKONSUL;
					e('S2Konsul').value=h.S2KONSUL;
					e('S3Konsul').value=h.S3KONSUL;
					e('OKonsul').value=h.OKONSUL;
					e('AKonsul').value=h.AKONSUL;
					e('PKonsul').value=h.PKONSUL;
					autoSize("SKonsul");autoSize("S2Konsul");autoSize("S3Konsul");
					autoSize("OKonsul");autoSize("AKonsul");autoSize("PKonsul");
					
					if(h.JSKONSUL!=null){
						e('JSKonsul').value=h.JSKONSUL;
						e('JS2Konsul').value=h.JS2KONSUL;
						e('JS3Konsul').value=h.JS3KONSUL;
						e('JOKonsul').value=h.JOKONSUL;
						e('JAKonsul').value=h.JAKONSUL;
						e('JPKonsul').value=h.JPKONSUL;
						autoSize("JSKonsul");autoSize("JS2Konsul");autoSize("JS3Konsul");
						autoSize("JOKonsul");autoSize("JAKonsul");autoSize("JPKonsul");
						$('#jawabSave').attr('style','display:none');
						$('#cjSoap').attr('style','display:none');
						$('#formJKonsul textarea').attr('disabled',true);
						$('#formJKonsul label').attr('style','color:black');
					}
					
				}else{
					$('#formKonsul label').attr('style','color:red');
					$('#formJKonsul label').attr('style','color:red');
					$('#formJKonsul').attr('style','display:none');
					$('#formKonsul textarea').removeAttr('disabled');
				}
			},error:function(o)
			{		
			
			}
		});
	}
	function selectKonsul(){
		$.ajax({
			url :base_url+'index.php/clinicGigi_controller/selectKonsul/'+idUser,
			type : "post",
			data:{idTrans:idTrans},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content1 = e("tanggal3");
				var content2 = e("poliRujuk");
				var content3 = e("dokterRujuk");
				content3.innerHTML="";
				content1.removeAttribute('disabled');
				content2.removeAttribute('disabled');
				content3.removeAttribute('disabled');
				$('#rujukSave').removeAttr('style');
				$('#ckSoap').removeAttr('style');
				$('#button3').removeAttr('style');
				
				if(prod.length!=0){
					var h = prod[0];	
					content1.setAttribute('disabled',true);
					content2.setAttribute('disabled',true);
					content3.setAttribute('disabled',true);
					$('#rujukSave').attr('style','display:none');
					$('#jawabSave').attr('style','display:none');
					$('#ckSoap').attr('style','display:none');
					$('#cjSoap').attr('style','display:none');
					$('#formKonsul textarea').attr('disabled',true);
					$('#button3').attr('style','display:none');
					content1.value=h.TANGGAL;
					content2.value=h.POLI_ID_RUJUKAN;
					var option=c("option",content3);
					if(h.DOKTER_ID_RUJUKAN!=null){
						option.value=h.DOKTER_ID_RUJUKAN;
						option.innerHTML=h.NAMA;
					}else{
						option.value='DOKTER RSUD';
						option.innerHTML='DOKTER RSUD';
					}
					e('SKonsul').value=h.SKONSUL;
					e('S2Konsul').value=h.S2KONSUL;
					e('S3Konsul').value=h.S3KONSUL;
					e('OKonsul').value=h.OKONSUL;
					e('AKonsul').value=h.AKONSUL;
					e('PKonsul').value=h.PKONSUL;
					autoSize("SKonsul");autoSize("S2Konsul");autoSize("S3Konsul");
					autoSize("OKonsul");autoSize("AKonsul");autoSize("PKonsul");
					
					if(h.JSKONSUL!=null){
						e('JSKonsul').value=h.JSKONSUL;
						e('JS2Konsul').value=h.JS2KONSUL;
						e('JS3Konsul').value=h.JS3KONSUL;
						e('JOKonsul').value=h.JOKONSUL;
						e('JAKonsul').value=h.JAKONSUL;
						e('JPKonsul').value=h.JPKONSUL;
						autoSize("JSKonsul");autoSize("JS2Konsul");autoSize("JS3Konsul");
						autoSize("JOKonsul");autoSize("JAKonsul");autoSize("JPKonsul");
					}
					$('#formJKonsul textarea').attr('disabled',true);
					$('#formJKonsul label').attr('style','color:black');
					$('#formKonsul label').attr('style','color:black');
				}else{
					$('#formKonsul label').attr('style','color:red');
					$('#formJKonsul').attr('style','display:none');
					$('#formKonsul textarea').removeAttr('disabled');
				}
			},error:function(o)
			{		
			
			}
		});
	}
	function addKonsul(){
		var tanggal=e('tanggal3').value;
		var valid=validDate(tanggal);
		if(!valid)
			return;
		tanggal=changeDate(tanggal);
		var idPoli2=e('poliRujuk').value;
		var idDokter2=e('dokterRujuk').value;
		var sKonsul=e('SKonsul').value;
		var s2Konsul=e('S2Konsul').value;
		var s3Konsul=e('S3Konsul').value;
		var oKonsul=e('OKonsul').value;
		var aKonsul=e('AKonsul').value;
		var pKonsul=e('PKonsul').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertKonsul/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode,idTrans:idTrans,idPasien:idPasien,idPoli:idPoli,idPoli2:idPoli2,idDokter2:idDokter2,tanggal:tanggal,sKonsul:sKonsul,s2Konsul:s2Konsul,s3Konsul:s3Konsul,oKonsul:oKonsul,aKonsul:aKonsul,pKonsul:pKonsul},
			success : function(o)
			{
				var prod = o;
				$('#konsul_menu').modal('hide');
				bootbox.alert('Data Konsul Sudah Tersimpan!');
			},error:function(o)
			{		
			
			}
		});
	}
	function updateKonsul(){
		var episode1=e('episodeRujuk').value;
		var jsKonsul=e('JSKonsul').value;
		var js2Konsul=e('JS2Konsul').value;
		var js3Konsul=e('JS3Konsul').value;
		var joKonsul=e('JOKonsul').value;
		var jaKonsul=e('JAKonsul').value;
		var jpKonsul=e('JPKonsul').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateKonsul/'+idUser,
			type : "post",
			data:{idEpisode:episode1,idPasien:idPasien,idPoli2:idPoli,jsKonsul:jsKonsul,js2Konsul:js2Konsul,js3Konsul:js3Konsul,joKonsul:joKonsul,jaKonsul:jaKonsul,jpKonsul:jpKonsul},
			success : function(o)
			{
				var prod = o;
				$('#konsul_menu').modal('hide');
				bootbox.alert('Data Jawaban Konsul Sudah Tersimpan!');
			},error:function(o)
			{		
			
			}
		});
	}
	function selectLantai(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectLantai',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("lantaiKamar");
				content.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.UNIT_ID;
						option.innerHTML=h.NAMA_UNIT;
					}
				}
				selectRanap();
			},error:function(o)
			{		
			
			}
		});
	}
	function selectKelas(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectKelas',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("rawatKe");
				content.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.KELAS_ID;
						option.innerHTML=h.KETERANGAN;
					}
				}
			},error:function(o)
			{		
			
			}
		});
	}
	function insertRanap(){
		var kategori=e('kRawat').value;
		var ruang=e('rRawat').value;
		var lantai=e('lantaiKamar').value;
		var kelas=e('rawatKe').value;
		var plan=e('dPlan').value;
		var ket=e('ket_lain').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertRanap/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idPoli:idPoli,kategori:kategori,ruang:ruang,kelas:kelas,plan:plan,ket:ket,lantai:lantai},
			success : function(o)
			{
				var prod = o;
				sudahDisimpan=true;
				$('#formModal1').modal('hide');
				//bootbox.alert('Data Rawat Inap Sudah Tersimpan!');
				selectRanap1();
			},error:function(o)
			{		
			
			}
		});
	}
	function insertintruksi(){
		var ruang=e('rRawat').value;
		var ket=e('tanggal').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertintruksi/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idPoli:idPoli,kategori:kategori,ruang:ruang,kelas:kelas,plan:plan,ket:ket,lantai:lantai},
			success : function(o)
			{
				var prod = o;
				sudahDisimpan=true;
				$('#formModal1').modal('hide');
				//bootbox.alert('Data Rawat Inap Sudah Tersimpan!');
				selectRanap1();
			},error:function(o)
			{		
			
			}
		});
	}


	function selectRanap(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectRanap',
			type : "post",
			data:{idTrans:idTrans,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					e('kRawat').value=h.KATEGORI;
					var kategori=e('kRawat').value;
					//$('#kRawat').attr('disabled',true);
					e('rRawat').value=h.UNIT_ID;
					e('lantaiKamar').value=h.LANTAI_ID;
					var ruang=e('rRawat').value;
					if(ruang=='Ruang Rawat'){
						$('#lantaiKamar').removeAttr('style');
						$('#rawatKe').removeAttr('style');
						//$('#lantaiKamar').attr('disabled',true);
						//$('#rawatKe').attr('disabled',true);
						$('#ket_lain').attr('style','display:none');
					}else if(ruang=='Lainnya'){
						$('#lantaiKamar').attr('style','display:none');
						$('#rawatKe').attr('style','display:none');
						$('#ket_lain').removeAttr('style');
						//$('#ket_lain').attr('disabled',true);
					}else{
						$('#lantaiKamar').attr('style','display:none');
						$('#rawatKe').attr('style','display:none');
						$('#ket_lain').attr('style','display:none');
					}
					//$('#rRawat').attr('disabled',true);
					e('rawatKe').value=h.KELAS_ID;
					var kelas=e('rawatKe').value;
					e('dPlan').value=h.PLANNING;
					var plan=e('dPlan').value;
					//$('#dPlan').attr('disabled',true);
					e('ket_lain').value=h.KET_LAIN;
					var ket=e('ket_lain').value;
					//$('#formSave1').attr('style','display:none');
					var button=e('formSave1');
					button.onclick=function(){
						updateRanap();
					}
					$('#formPrint1').removeAttr('style');
				}else{
					var button=e('formSave1');
					button.onclick=function(){
						insertRanap();
					}
					//$('#formSave1').removeAttr('style');
					$('#formPrint1').attr('style','display:none');
				}
			},error:function(o)
			{		
			
			}
		});
	}
	function selectRanap1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectRanap1',
			type : "post",
			data:{idTrans:idTrans,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					printForm(prod);
				}
				
				
			},error:function(o)
			{		
			
			}
		});
	}
	function printForm(prod){
		var h=prod[0];
		var popupWin = window.open('', '_blank', 'width=700,height=550,location=no,left=200px');

        popupWin.document.open();

        popupWin.document.write('<html moznomarginboxes mozdisallowselectionprint><title>Formulir Permintaan Rawat Inap</title><link rel="stylesheet" type="text/css" href="'+base_url+'asset/css/print.css" /></head><body style="font-family:arial narrow;border:1px solid;" onload="window.print();window.close()">');
		//popupWin.document.write('<html moznomarginboxes mozdisallowselectionprint><title>Formulir Permintaan Rawat Inap</title><link rel="stylesheet" type="text/css" href="'+base_url+'asset/css/print.css" /></head><body style="font-family:arial;">');
		
		popupWin.document.write("<table id='tabelHead' style='border-bottom:1px solid; width:100%;'><tr><td style='border-right:1px solid;' rowSpan=2><img src='"+base_url+"asset/image/logoHead.png'></img></td><td style='text-align:center; font-weight:bold;font-size:18px;'>FORMULIR PERMINTAAN RAWAT INAP</td></tr>");
		popupWin.document.write("<tr><td td style='text-align:center;'>(001/FORM/MED/IV/2015)</td></tr></table>");
		popupWin.document.write("<table id='tabelForm'><tr><td>Mohon didaftarkan sebagai pasien rawat inap terhadap :</td></tr></table>");
		popupWin.document.write("<table style='position:relative; left:20px;'id='tabelForm1'><tr><td style='width:180px'>Nama</td><td style='width:10px'>:</td><td style='width:180px'>"+h.NAMA+"</td>");
		popupWin.document.write("<td style='width:100px;text-align:right'>Medrec</td><td style='width:10px'>:</td><td style='width:180px'>"+h.INT_PASIEN_ID+"</td></tr>");
		popupWin.document.write("<tr><td>Jenis Kelamin</td><td>:</td><td colspan=4>"+h.KELAMIN+"</td></tr>");
		if(h.TGL_LAHIR!=null){
			var tgllahir=h.TGL_LAHIR.substring(6,10)+'/'+h.TGL_LAHIR.substring(3,5)+'/'+h.TGL_LAHIR.substring(0,2);
			popupWin.document.write("<tr><td>Tgl. Lahir</td><td>:</td><td colspan=4>"+tgllahir+"  Thn/Bln/Hari</td></tr>");
		}else{
			popupWin.document.write("<tr><td>Tgl. Lahir</td><td>:</td></tr>");
		}
		popupWin.document.write("<tr><td>Asal Pasien</td><td>:</td><td colspan=4><input type='checkbox' checked=true></input>"+h.POLI+" <input type='checkbox'></input>I G D <input type='checkbox'></input> Kamar Bersalin / Operasi</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;' rowspan=3>Menuju Ruang Rawat</td><td style='vertical-align:top;' rowspan=3>:</td>");
		if(h.UNIT_ID=='ICCU')
			popupWin.document.write("<td><input type='checkbox' checked=true></input> ICCU&nbsp;");
		else 
			popupWin.document.write("<td><input type='checkbox'></input> ICCU&nbsp;");
		if(h.UNIT_ID=='PICU')
			popupWin.document.write("<input type='checkbox' checked=true></input> PICU </td>");
		else 
			popupWin.document.write("<input type='checkbox'></input> PICU </td>");
		if(h.UNIT_ID=='Ruang Rawat'){
			
			popupWin.document.write("<td colspan=5><input type='checkbox' checked=true></input> Ruang Rawat "+h.LANTAI+" "+h.KELAS+"</td></tr>");
		}else 
			popupWin.document.write("<td colspan=5><input type='checkbox'></input> Ruang Rawat </td></tr>");
		if(h.UNIT_ID=='ICU')
			popupWin.document.write("<tr><td><input type='checkbox' checked=true></input> ICU &nbsp; &nbsp;");
		else
			popupWin.document.write("<tr><td><input type='checkbox'></input> ICU &nbsp; &nbsp;");
		if(h.UNIT_ID=='NICU')
			popupWin.document.write("<input type='checkbox' checked=true></input> NICU </td>");
		else 
			popupWin.document.write("<input type='checkbox'></input> NICU </td>");
		if(h.UNIT_ID=='Rooming In')
			popupWin.document.write("<td colspan=5 style='font-weight:italic'><input type='checkbox' checked=true></input> Rooming In</td></tr>");
		else 
			popupWin.document.write("<td colspan=5 style='font-weight:italic'><input type='checkbox'></input> Rooming In</td></tr>");
		if(h.UNIT_ID=='HCU')
			popupWin.document.write("<tr><td><input type='checkbox' checked=true></input> HCU  &nbsp;");
		else
			popupWin.document.write("<tr><td><input type='checkbox'></input> HCU  &nbsp;");
		if(h.UNIT_ID=='PERINA')
			popupWin.document.write("<input type='checkbox' checked=true ></input> PERINA</td>");
		else 
			popupWin.document.write("<input type='checkbox'></input> PERINA</td>");
		if(h.UNIT_ID=='Lainnya'){
			popupWin.document.write("<td colspan=5><input type='checkbox' checked=true></input> Lainnya ");
			if(h.KET_LAIN!=null)
				popupWin.document.write(h.KET_LAIN+"</td></tr>");	
		}else
			popupWin.document.write("<td colspan=5><input type='checkbox'></input> Lainnya</td></tr>");
		popupWin.document.write("<tr><td>Kategori</td><td>:</td>");
		if(h.KATEGORI=='Infeksi')
			popupWin.document.write("<td colspan=8><input type='checkbox' checked=true></input> Infeksi ");
		else
			popupWin.document.write("<td  colspan=8><input type='checkbox'></input> Infeksi ");
		if(h.KATEGORI=='Non Infeksi')
			popupWin.document.write("<input type='checkbox' checked=true></input> Non Infeksi ");
		else
			popupWin.document.write("<input type='checkbox'></input> Non Infeksi ");
		if(h.KATEGORI=='Isolasi')
			popupWin.document.write("<input type='checkbox' checked=true></input> Isolasi</td></tr>");
		else
			popupWin.document.write("<input type='checkbox'></input> Isolasi</td></tr>");
		
		
		if(h.DIAGNOSA1!=null)
			popupWin.document.write("<tr><td>Diagnosa</td><td>:</td><td colspan=8>"+h.DIAGNOSA1+"</td></tr>");
		else
			popupWin.document.write("<tr><td>Diagnosa</td><td>:</td><td colspan=8>"+h.DIAGNOSA+"</td></tr>");
		if(h.PLANNING!=null)
			popupWin.document.write("<tr><td>Discharge Planning</td><td>:</td><td colspan=4>"+h.PLANNING+" hari</td></tr>");
		else
			popupWin.document.write("<tr><td>Discharge Planning</td><td>:</td><td colspan=4>____ hari</td></tr>");
		popupWin.document.write("<tr></tr>");
		popupWin.document.write("<tr><td colspan=3></td><td colspan=5>Jakarta, "+h.DATE1+" Jam "+h.DATE2+"</td></tr>");
		popupWin.document.write("<tr><td colspan=3></td><td style='padding-left:50px' colspan=5>Dokter Pemeriksa</td></tr>");
		popupWin.document.write("<tr style='height:75px'></tr>");
		popupWin.document.write("<tr><td colspan=3></td><td style='padding-left:30px' colspan=5>( "+h.DOKTER+" )</td></tr>");
		popupWin.document.write("<tr style='height:25px'></tr></table>");
		popupWin.document.write('</html>');

        popupWin.document.close();
		$('#formModal1').modal('hide');
	}
	function selectAllResep(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAllResep',
			type : "post",
			data : {idEpisode:idEpisode,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPrompt1(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Resep!');
			}
		});
	}
	function tabelPrompt1(prod){
		var content=e('promptBody');
		content.innerHTML="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","prompt_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NO RESEP";
		th = c("th", tr);
		th.innerHTML="DOKTER";
		th = c("th", tr);
		th.innerHTML="TANGGAL";
		var tbody=c("tbody",table);
		var i=0;
		if(prod.length!=0){
			while(i<prod.length){
				var h=prod[i];
				var ke=h.RESEP_KE;
				var tr=c('tr',tbody,null,ke+'_resep');
				tr.ondblclick=function(){
					resepResult=this.id.split('_')[0];
					$('#promptModal').modal('hide');
					resepKe=resepResult;
					$('#obatModal').modal('show');
					pasienKetModal(idPasien,"obatBody");
					setTimeout('searchResep()',300);
				}
				tr.onclick=function(){
					resepResult=this.id.split('_')[0];
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
				}
				if(h.VALID!=null || doneP=='1_done'){
					tr.style.cssText='color:red';
				}else{
					tr.style.cssText='color:blue';
				}var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h.TRANS_CO;
				div.setAttribute('title',h.TRANS_CO);
				td = c("td", tr);
				td.innerHTML=h.DOKTER;
				td.setAttribute('title',h.DOKTER);
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
				
				for (var j=i;j<prod.length;j++) {
					var h=prod[j];
					var tr=c('tr',tbody);
					if(h.TYPE=='00')
						tr.style.background='#b0d9d7';
					else if(h.TYPE=='01')
						tr.style.cssText='background:#666;color:#fff;';
						
					var td = c("td", tr,'tKiri');
					var div=c('div',td,'tKiri');
					div.innerHTML=h.NAMA_OBAT;
					td.setAttribute('title',h.NAMA);
					td.setAttribute('colspan',3);
					/*var div=c('div',td,'tKanan');
					div.innerHTML=h.QTY;
					div.setAttribute('title',h.QTY);*/
					if(j<prod.length-1)	var ke2=prod[j+1].RESEP_KE;
					if(ke!=ke2) break;
				}
				i=j;
				i++;		
			}	
		}
		$('#prompt_table').fixheadertable({
			colratio:[100,300,100],
			width:525,
			height:180,
		});
		
	}
	function selectAllLab(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAllLab',
			type : "post",
			data : {idEpisode:idEpisode,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPrompt2(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Laboratorium!');
			}
		});
	}
	function tabelPrompt2(prod){
		var content=e('promptBody');
		content.innerHTML="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","prompt_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NO LABORATORIUM";
		th = c("th", tr);
		th.innerHTML="DOKTER";
		th = c("th", tr);
		th.innerHTML="TANGGAL";
		var tbody=c("tbody",table);
		var i=0;
		if(prod.length!=0){
			while(i<prod.length){
				var h=prod[i];
				var ke=h.LAB_KE;
				var tr=c('tr',tbody,null,ke+'_laba');
				tr.ondblclick=function(){
					labResult=this.id.split('_')[0];
					$('#promptModal').modal('hide');
					labKe=labResult;
					$('#labModal').modal('show');
					pasienKetModal(idPasien,"labBody");
					setTimeout('formStruktur(1)',300);
					//setTimeout('searchLab()',600);
				}
				tr.onclick=function(){
					labResult=this.id.split('_')[0];
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
				}
				if(h.SAMPEL!=null || h.TRANS_BAYAR_ID!=null || doneP=='1_done'){
					tr.style.cssText='color:red';
				}else{
					tr.style.cssText='color:blue';
				}
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h.TRANS_CO;
				div.setAttribute('title',h.TRANS_CO);
				td = c("td", tr);
				td.innerHTML=h.DOKTER;
				td.setAttribute('title',h.DOKTER);
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
				for (var j=i;j<prod.length;j++) {
					var h=prod[j];
					var tr=c('tr',tbody);
					var td = c("td", tr);
					td.innerHTML=h.CAPTION;
					td.setAttribute('title',h.CAPTION);
					td.setAttribute('colspan',3);
					if(j<prod.length-1)	var ke2=prod[j+1].LAB_KE;
					if(ke!=ke2) break;
				}
				i=j;
				i++;		
			}	
		}
		$('#prompt_table').fixheadertable({
			colratio:[100,300,100],
			width:525,
			height:180,
		});
		
	}
	function selectAllRad(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAllRad',
			type : "post",
			data : {idEpisode:idEpisode,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPrompt3(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Radiologi!');
			}
		});
	}
	function tabelPrompt3(prod){
		var content=e('promptBody');
		content.innerHTML="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","prompt_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NO RADIOLOGI";
		th = c("th", tr);
		th.innerHTML="DOKTER";
		th = c("th", tr);
		th.innerHTML="TANGGAL";
		var tbody=c("tbody",table);
		var i=0;
		if(prod.length!=0){
			while(i<prod.length){
				var h=prod[i];
				var ke=h.RAD_KE;
				var tr=c('tr',tbody,null,ke+'_rada');
				tr.ondblclick=function(){
					radResult=this.id.split('_')[0];
					$('#promptModal').modal('hide');
					radKe=radResult;
					$('#radModal').modal('show');
					pasienKetModal(idPasien,"radBody");
					setTimeout('formStruktur(2)',300);
					//setTimeout('searchRad()',600);
				}
				tr.onclick=function(){
					radResult=this.id.split('_')[0];
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
				}
				if(h.SAMPEL!=0 || h.TRANS_BAYAR_ID!=null || doneP=='1_done'){
					tr.style.cssText='color:red';
				}else{
					tr.style.cssText='color:blue';
				}
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h.TRANS_CO;
				div.setAttribute('title',h.TRANS_CO);
				td = c("td", tr);
				td.innerHTML=h.DOKTER;
				td.setAttribute('title',h.DOKTER);
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
				for (var j=i;j<prod.length;j++) {
					var h=prod[j];
					var tr=c('tr',tbody);
					var td = c("td", tr);
					td.innerHTML=h.CAPTION;
					td.setAttribute('title',h.CAPTION);
					td.setAttribute('colspan',3);
					if(j<prod.length-1)	var ke2=prod[j+1].RAD_KE;
					if(ke!=ke2) break;
				}
				i=j;
				i++;		
			}	
		}
		$('#prompt_table').fixheadertable({
			colratio:[100,300,100],
			width:525,
			height:180,
		});
		
	}
	function selectAllAlkes(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAllAlkes',
			type : "post",
			data : {idEpisode:idEpisode,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPrompt4(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Tindakan!');
			}
		});
	}
	function tabelPrompt4(prod){
		var content=e('promptBody');
		content.innerHTML="";
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","prompt_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NO TINDAKAN";
		th = c("th", tr);
		th.innerHTML="DOKTER";
		th = c("th", tr);
		th.innerHTML="TANGGAL";
		var tbody=c("tbody",table);
		var i=0;
		if(prod.length!=0){
			while(i<prod.length){
				var h=prod[i];
				var ke=h.ALKES_KE;
				var tr=c('tr',tbody,null,ke+'_alkes');
				tr.ondblclick=function(){
					alkesResult=this.id.split('_')[0];
					$('#promptModal').modal('hide');
					alkesKe=alkesResult;
					$('#alkesModal').modal('show');
					pasienKetModal(idPasien,"alkesBody");
					setTimeout('searchAlkes()',300);
				}
				tr.onclick=function(){
					alkesResult=this.id.split('_')[0];
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
				}
				if(h.TRANS_BAYAR_ID!=null || doneP=='1_done'){
					tr.style.cssText='color:red';
				}else{
					tr.style.cssText='color:blue';
				}
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h.TRANS_CO;
				div.setAttribute('title',h.TRANS_CO);
				td = c("td", tr);
				td.innerHTML=h.DOKTER;
				td.setAttribute('title',h.DOKTER);
				td = c("td", tr);
				td.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
				
				for (var j=i;j<prod.length;j++) {
					var h=prod[j];
					var tr=c('tr',tbody);
					var td = c("td", tr);
					td.innerHTML=h.NAMA_LAYAN;
					td.setAttribute('title',h.CAPTION);
					td.setAttribute('colspan',3);
					if(j<prod.length-1)	var ke2=prod[j+1].ALKES_KE;
					if(ke!=ke2) break;
				}
				i=j;
				i++;		
			}	
		}
		$('#prompt_table').fixheadertable({
			colratio:[100,300,100],
			width:525,
			height:180,
		});
		
	}
	function selectValidResep(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectValidResep',
			type : "post",
			data : {idTrans:idEpisode},
			success : function(o)
			{
				var validResep = o;
				if(validResep!="")
					resepDisabled=true;
				else
					resepDisabled=false;
			},error:function(o)
			{		
				resepDisabled=false;
			}
		});
	}
	function selectValidLab(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectValidLab',
			type : "post",
			data : {idTrans:idTrans},
			success : function(o)
			{
				var validL = o;
				var validLab=validL.split('_')[0];
				var validLab2=validL.split('_')[1];
				if(validLab!="" || validLab2!="")
					labDisabled=true;
				else
					labDisabled=false;
			},error:function(o)
			{		
				labDisabled=false;
			}
		});
	}
	function selectValidRad(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectValidRad',
			type : "post",
			data : {idTrans:idTrans},
			success : function(o)
			{
				var validR = o;
				var validRad=validR.split('_')[0];
				var validRad2=validR.split('_')[1];
				if(validRad!=0 || validRad2!="" )
					radDisabled=true;
				else
					radDisabled=false;
			},error:function(o)
			{		
				radDisabled=false;
			}
		});
	}
	function selectValidAlkes(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectValidAlkes',
			type : "post",
			data : {idTrans:idTrans},
			success : function(o)
			{
				var validAlkes = o;
				if(validAlkes!="")
					alkesDisabled=true;
				else
					alkesDisabled=false;
			},error:function(o)
			{		
				alkesDisabled=false;
			}
		});
	}
	
	var konlength;
	function beep() {
		var snd = new Audio("data:audio/wav;base64,UklGRkjZAgBXQVZFZm10IBAAAAABAAIARKwAABCxAgAEABAAZGF0YdzYAgD+//7/AgABAP7/AAACAAAA//8AAAAAAAABAAAA//8AAAAA//8BAAEA/v///wEAAAD//wEAAQD/////AQABAAAA//8AAAEAAAD//wAAAQD//wAAAgD///7/AQABAP////8AAAEAAQD/////AQABAP//AAABAAAA//8AAAAAAAABAAAA/v///wIAAgD///3/AAADAAAA/v///wAAAgABAP3///8DAAAA//8BAAAA//8BAAAA/v8AAAMAAQD9////AQABAAEA///+/wIAAQD+/wAAAQABAAAA/v///wIAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAD+/wAAAgAAAP//AAAAAAAAAQAAAP7/AQACAP7///8DAAEA/P///wQAAQD9////AgAAAP//AQABAP////8BAAEA/v8AAAIA/////wIAAAD+/wAAAgAAAP7/AAACAAAA/v8AAAEAAAAAAAAA//8AAAEAAAD//wAAAQAAAAAAAQD///7/AQACAP////8BAAAA//8AAAEAAAAAAAEAAAD+/wAAAgAAAP//AQABAP7//v8CAAIA/v/+/wIAAQD+////AQABAAAAAAD//wAAAQAAAP//AAABAAAAAAAAAAAAAAAAAAAA//8AAAIAAAD+/wAAAQAAAAAAAAD//wAAAgAAAP7/AAACAP////8CAAEA/f///wMAAQD+/wAAAQD//wAAAgD///7/AgACAP7///8CAAEA/v/+/wEAAgAAAP7/AAABAAAAAAAAAP//AAABAAAA//8AAAEAAAD/////AAABAAAA//8AAAEA/////wEAAAD//wEAAAAAAAEAAAD/////AQABAP////8BAAEAAAD/////AQABAP//AAABAAAA/////wAAAgAAAP7/AQABAP//AAABAAAA//8AAAEAAAD//wEAAQD//wAAAAD//wAAAQAAAP////8BAAEA/////wEAAAAAAAEAAAD+/wAAAgAAAP7/AQACAP///v8BAAEAAAAAAP//AAABAAAA//8AAAEAAAAAAAEA/////wEAAQAAAAAAAAD/////AAACAAAA/v8AAAIAAAD//wAAAAABAAAA/v8AAAMAAAD+////AAABAAEA//8AAAAAAAABAAAA//8AAAEAAAAAAAAA/////wEAAQD/////AQABAAAA//8AAAAAAAABAAAA//8AAAAAAAABAAAA//8AAAAAAAABAAAA//8AAAEA/////wIAAQD+////AQABAAAA//8AAAEA/////wEAAQAAAP////8BAAIAAAD+////AgABAP7/AAACAAAA//8AAAAAAAAAAAAAAAABAAAA//8AAAEAAAAAAAAA//8BAAEA/////wAAAAABAAAA//8AAAEAAAD//wAAAQD/////AQABAP///v8BAAIA/////wAA//8BAAIA///+/wAAAQABAP///v8AAAIAAQD/////AAABAAAA//8BAAEA//8AAAAA/v8BAAMA///+/wAAAAABAAEA/////wEAAAD//wEAAAD//wEAAQAAAP////8BAAIA///+/wEAAQD+////AgABAP7///8BAAEAAAAAAAAA//8AAAEAAAAAAAEA/v/+/wIAAQD//wAAAAAAAAAA//8BAAIA/v/+/wIAAQD//wAAAQAAAP//AAABAAAA//8AAAEAAQD///7/AAABAAEAAAD+/wAAAQAAAAEAAAD+/wEAAgD/////AQAAAP//AAABAAAAAAAAAP//AAABAAAAAAAAAP//AAACAP///v8CAAIA/v/+/wEAAgAAAP//AAAAAAEAAAD//wAAAQAAAAAAAAD//wAAAQABAP////8AAAAAAAABAAAA//8AAAAAAAAAAAAAAAD/////AgABAP7/AAABAP//AAABAAAAAQAAAP//AAAAAAAAAQAAAP//AQABAAAAAAAAAP//AQABAP////8AAAAAAQABAP///////wAAAQAAAP//AAAAAP//AAABAAAA/////wAAAAAAAAEAAAD//wAAAAABAAEA/////wEAAgAAAP//AAABAAAAAAABAAAAAAABAAAA//8AAAEAAAD//wAAAAD//wEAAAAAAAAA/////wEAAAD///////8AAAIA///8/wIAAwD+//7/AgAAAP//AAABAAAAAAAAAAEAAQAAAP//AQACAAAAAAABAAAAAAACAAAA//8AAAEAAAABAP////8AAAIA///+/wAAAQD///////8AAAAA//8AAAAA/////wEAAAD//wAAAgABAP////8CAAEAAAAAAAEAAQAAAAIAAgAAAP//AQAAAAAAAQABAP3///8CAAEA/f///wEA///+////AAAAAP//AAAAAP//////////AAABAAAA//8AAAEAAQAAAP//AQABAAEAAQAAAP//AgACAAAAAQACAAAAAAACAAIAAAD//wIAAQABAAAAAgAAAP//AAAAAP7/AAABAP///v8AAP7//v8BAP///P/9/wEAAAD///3/AAABAAAA/v8BAAAAAAABAAEAAQABAAEAAgAAAAEAAgABAAIAAgABAP//AwACAP////8DAAEA/f8AAAIA/v/+/wAAAQD9//7/AAD///7////+////AAD//////v8AAAEAAAAAAAEA//8BAAMAAQAAAAIAAgACAP//AQACAAIAAAABAAIAAAAAAAEAAwAAAP7/AAACAP//AAD//wAAAAD///////////////8AAP//AAD//wAAAAAAAP//AgABAP////8AAAEAAQABAP////8AAAEA/v8AAAIAAQD//wEAAAABAAIAAQD9/wEAAAAAAP7/AAACAAEA/v///wIAAQD+////AwABAP////8DAAEAAQAAAAAAAAABAAAAAQD//wMAAAAAAAAAAAD+//7/AAABAP7/AAAAAP///v///wAA/P///wEAAAD8////AgADAP//AAD//wQAAQABAAIABAABAAMAAwACAAAABAACAAIAAwAAAAEAAQADAAAAAQD//wEA//8CAPz/AAD//wAA+v/+///////6//3///////v//f///////////////f8BAP7////+/wQAAQABAAEABQABAAQAAgAFAAIABQACAAUAAgADAAYAAwACAAMAAgD//wIAAQACAP7/AgD8//7//f/+//n//P/8////+v////3//P/8//3//f/8/////f/9/wEAAgABAAAAAQAFAP//AwAAAAYABAADAAQABgACAAQAAgAGAAEABQAHAAIABAAFAAMAAAD8/wAA/v/9/wEA/f/+//z////7//v//P/9//j//P/6//7/+P////3/+//7//r/AQD8//3/AAACAAQAAwABAAQABQAHAAYABQAIAAoABwAGAAMACQAGAAcABQACAAgABAAFAAEAAgABAAEAAAD+//z//v/8//z/+f////r//P/5//z/+v/3//r/+v/7//f//f/7////AgD+/wMAAgACAAEA/v8FAP7/BAADAAMABwAFAAUAAwAFAAYACwADAAYABgAIAAIAAgACAAEAAAAAAAAAAgD7/wQA//8BAP3/+P////j//P/4//3////8//n//f/+//7/9v8AAPn//v/8/////f8BAP//AwD+/wMAAwAEAAcABQAJAAkACAAHAAcABgAFAAYABwACAAgAAgAKAAMACAADAAMA/P////z/AAD3//7/+f/8//X/9P/3//P/9v/w//j/8v/5//X//f/1//z/+P8CAPr/AwD+/wkABQAKAAIADQAKAAkACwAOABUACwASAA0AEgAKAA4ACAAJAAQABwAAAAcA+v8EAPb/AgDy//v/8f/6/+7/9P/y//P/7v/x//D/9P/0//j/+f/1//3/+P8BAPn/BgABAAsAAwAOAAYAEgAIABQACgATAAwAFQARABMAEQASABIACQASAAUADwABAA0A/v8CAPf/+//z//L/7f/u/+n/7//p//D/6v/u/+n/5v/t/+v/7v/y//f/9P/6//X/AAD6/wUAAQAPAAkAFAALABsAEQAcABgAGwAWABsAFQAcAB4AFwAdABMAEAALAAQAAAACAPz//f/z//n/7f/z/+j/8f/o/+r/5P/n/+b/4//i/+P/5//i/+v/5//z//D////4/wMA//8IAAgAEAAOABQAEQAWABcAGgAcABgAIQAaABoAFwAZABIAGgAKABQAAgAIAPz/BQD5//3/8f/z/+v/4//k/+j/4P/x/+T/7v/m/+T/7v/o/+//7P/8//X/AAD5/wsAAwALAAQAEQAFABYAEwAaABkAHwAbABkAFQAUABUACwAdAAoAHQAGABEAAgAFAPz//v/2//3/8P8GAO7/BgDs//7/7v/r/+v/6f/0/+r/8//o//n/4f/2/+b/9//p/wEA8f8IAPj/EAD6/xUA9v8WAPj/FwANABQAHwAWACcAFgAdABAAFwALABMAAwARAPj/EADv/w4A6f8GAOX/+P/k/+//4f/p/+L/6P/j/+L/5P/l/+v/6P/0//H////y/wgA8v8SAPD/FQD9/xsADQAaABwAIwAdACkAGgArABAAJwAOAB0AFwAaABkACwAaAAgAFQAAAA8A9v8FAOr//f/e//P/1f/o/8n/7P/B/+j/wP/b/8j/0f/Q/9T/2v/g/+X/7f/1//f/AwD6/xgABAAoABEANQAaADwAHQBBACAAQgAtAEIANAA4ADgANAAqACgADAAZAAMA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EADQ/wkAvv/+/7n/+f/O//r/8v8CAPb/AgDY//z/1f/v//z/6v8WAO7/EwDz/woA8v8HAO7/BgDu/x0A+P9EAAcASQARACIAEAAJAAkAGQAFACQACwAVABIA/f8UAOz/DADW/wUA3v8FAPv/CQD9/wsA1f8GALn/+P/N/+7/7//v//f/9P/9//j/AADz//f/7f8GAO7/MAD1/z8A//8jAAEAAgD9/xIA/P8uAAMANgASADIAGQAjABYAAAANAO//BgD9/wgABAAMAOD/DAC6/wMAvv/5/9n/9//m//3/7/8BAO7//v/f//P/2f/r//7/6v8fAPH/FgD1////9f8MAPP/KwD3/0AABgBDABAAOwATABUADQD4/wYABgAIACAAEAAMABUA6P8SANj/BwDk/wAA6P8CAOz/BwDm/wUAzP/8/7P/8f/R/+z//v/w/wkA9v/1//b/9P/x/wgA7f8bAPP/JwD8/zMAAwAdAAIABAABABcAAwBAAA8ARAAZACMAGwADABAA/f8FAPT/AQD0/wUA9f8HAN3/AwC7//r/xf/0//D/9/8AAP//5/8AANf/+f/b/+//6f/t/wAA8/8cAPr/FwD+/wAA/v8FAPz/MwAEAEQADQAyABIAFwAMAA8AAgAGAP//EAADABwACgATAAsA4/8EANH/+f/r//b/9//7/+H/AQDN//3/x//2/8//8v/k//X/CQD+/xMAAwD1/wIA6v/6/w0A+f8nAP//JAAIABMACQAPAAUADAACABwABwA5AA8AQAASABIADADs/wAA8P/3//z/+f/u////2/8BAM//+f/I//T/z//y//D/+v/+////4v8BAMj/9//g//L/CADz/xgA/P8ZAAMAGgADABIAAwAaAAUAOAAMAEoAEwAqABEA//8IAAAA/v8XAAAAGQAGAA4ADAD9/wcA4f/8/9D/9P/e//T/7v/6/9n//f+2//n/w//x/+r/8f/+//n/BwABAAgAAAD7//v/9//3/xUA+v86AAMANAALABUACwAVAAYALwAHADsADgA4ABQAKAARAAQABgDh//r/5v/4/wEA/P/2/wMA0v8CAMX/+//Z//b/5v/5/+7//v/v////4v/4/9H/8v/r//D/HgD4/zAAAQAYAAcAEQACACMAAQAzAAQAOAAMADkADwAeAAsA+/8EAPz/AAAeAAMAIQALAPz/CgDW/wEA0//1/9H/8//U//j/3v/+/9b//f/B//j/0P/z//7/+P8bAAEABQAGAPH/AQD3//v/BwD5/xkAAQA0AAkAMAALABkACgARAAYANQAHAEQADgAmAA4A+/8FAOn/+f/d//P/4//3/+///v/v/wEAzf/9/8D/9//f//T/+v/6/+z/AADa//7/2P/4/+f/9P/9//f/IQABADAACAAXAAkAAwAEAB8AAwA4AAcAMwAOABgADQANAAUABQAAAAkAAAAaAAYAHgAJAPD/AwDG//j/yv/w/+P/9P/k//v/2P///9T/+//a//X/5P/0/wcA+v8cAAAABQACAOj//P/5//n/IAD8/zIABgAqAA0AJQANAB0ACgAZAAoAKgAMADQADwARAAsA3v8CANP/9//r//f/8//+/+v/BADf/wIA0//6/8n/9f/g//X//v/7//n//v/c//r/5f/0/w4A8/8oAPz/LQAGACgACQAYAAUACgACABsAAwA7AAsAMwAPAAcADQD1/wUABwADABEABQAMAAoA+f8GANv//f+9//P/w//y/+j/+P/v////0v///87/+f/r//P/BQD2/xAA/P8QAP//BgD8//j/+P8JAPj/OgD//0sACgAtAA8AGAAMACAACAAoAAgAIgANABcADQD6/wYA0v/8/87/+P/v//r/AgADAOX/BADG//7/yf/0/9X/8P/g//b/8//8//X//P/n//n/8P/1/x8A+f9AAAIAMAAKABQABgAYAAIAJAAAAC8ABwA6AAwALwAPAAoACQD4/wMADQABACAABgAAAAYA0v8BAMH/9f/C//H/zP/z/+P//f/u////2////9D/9//v//T/EwD6/w0AAAD3/wEA9//8/wcA+v8eAP//OwAJAEgAEQApABAABwAKAA8ABAAnAAYAHQAIAPv/BwDn//3/4f/3/+P/+P/0/////v8EAN7/AgC6//n/xP/y/+n/9P/3//z/7P8AAOn//v/1//j/AAD4/yAA/v81AAUAIAAIAP3/BQADAAEAJgADADcADAAkABAAFQAOAAkABgD+/wIABAACAA8AAwDv/wIAwv/6/7j/8v/a//L/8f/7/+//AgDq/wIA5//7/+D/9f/3//b/FgD7/xoAAgD7/wEA/P/9/yEA/P9AAAYAPgAPADQAEgAgAA0ACwAHAAwABAAkAAcAGgAHAOv/BADT//z/5f/5//f//f/1/wQA4v8BANP/+/+///H/yv/v//X/9f8LAPz/8v///+7/+/8JAPb/KQD7/zIAAQAsAAgAIQAGABEABAATAAIAPAAIAEgADwAmABIAAgALAP3/AwADAAAA/f8DAO3/BADd////vf/3/7r/9P/h//f/AQACAPH/BQDZ/wAA3//1//X/8v8DAPb/EAD+/xIAAAAFAP//BgD9/zAAAgBQAAoAQAARABYADgAOAAUAEgABABcAAgAXAAUACwAEAOj//v/S//j/4//4//7//f/r/wEAwv///7n/9f/F//P/2v/2//X///8FAAUA+/8EAOz//f8GAPv/LAD//ywACAASAAsADQAGABgAAgApAAQAOgAJAD4ADQAfAAkA9P8AAPL/+P8LAPn/AgD7/93/+v/H//X/yP/w/9L/8//r//z///8EAO7/BADM//z/0//2//z/+P8SAAEACAAIAAUACAASAAUAIQAFADYACQBHAA4AMQANAAYACAD+////HAD9/ysA//8SAAMA+P/+/+n/+f/a//T/4f/3//D/+//g//3/u//6/7P/9P/Z//X//v/9/wAABgD8/wgA/v8BAPj//P8KAP3/JwADACwACgAOAAoABAAEACQAAQBDAAYAOgAMACMACwAKAAMA7//6/+r/9/////f//P/8/9X/+/+6//j/0//2//H//v/4/wQA7f8HAOH/AADT//r/3v/3/woA/P8mAAUAFAAIAAQABgAZAAAANwACADsACAAvAAoAHQAIAAYAAQD9//z/GgD9/ygAAAAJAAIA4P/8/9z/9v/m//b/6f/7/9z////V//7/wv/5/8X/+P/v//z/GAAHAA4ADADy/wkA8v///wwA/P8cAP//JgAHACgACgAcAAcAEgADADEAAgBKAAYANQAHAAAAAQDo//j/7P/y//H/9f/x//r/6//8/9L/+v++//j/1P/4//z/AAD6/wUA2/8EANH/+v/m//f//P/5/xUAAwAlAAgAHwAKAAsABAAcAAEAPgADAD4ACQAXAAsABQAFAAgA/v8UAP7/GwD//xoAAwD7/wEAzv/6/8P/9f/k//f/6P/9/9H/AQDB//z/zP/6/+D/+v/7/wIAEAAGAAoABgDp//7/6//4/xYA+f8xAAIAJQAKABsACQAgAAUAKgAFADMABQA8AAkAIgAGAO7/AADT//f/6//2//3/+f/u/wAA2P///9P//f/S//r/4P/9//T/AQD0/wMA1P/+/83/+P/0//b/IgD9/yUABwAcAAkAGQAFABYA//8gAAAANwAFADYACgATAAkA9v8CAAwA/v8mAP//HAAFAP7/BADj//7/y//5/83/9v/k//n/8v/+/9r//v/E//v/3v/3/wYA+/8SAAIACQADAP///v/1//n//f/2/yAA/v87AAcAKwANABEADAAdAAYANgAGADIACAAaAAoA/f8FAOL//v/X//n/7//6/wYA///y/wMAyf///8f/+P/f//j/7v/6/+v////q//v/4f/3/+T/8/8LAPf/NgAAADEABwAQAAcABgAAAB4A/v8sAAMAKwAJACMADQANAAkA+P8EAAoAAgAiAAMAEgAGANz/AQDA//r/yf/2/9v/+P/j//7/7P8AAOH//v/X//r/7P/4/xcA/P8bAAEA/P8AAOz/+v8DAPb/HAD6/y0ABAA3AAsALAAOABIACAAWAAMAMAADACwABwD9/wgA3P8BANz/+//r//n/8//9//j/AgDn/wEAwv/9/8D/+P/p//j//v/9//H////h//v/8P/3/wgA+P8gAP//MgAHAC8ACQALAAUAAwABACMAAAA6AAcAKAAMAA8ACgAHAAMADAD+/wsA/f8LAP7/9f/+/8P/+v+t//T/zv/z/+7/+f/u/wEA2/8BAN7//f/n//v/+P/8/w4AAAAUAAIA9////+v/+/8NAPr/OQADADwADQArABIAIAANABoABwAZAAMAIwAEABwABgD2/wUA0f/9/+L/+P8AAPn//////+T/AADO//3/wv/3/8n/9//o//n/AQD///X//v/g//v/9v/3/yMA/P8uAAQAJAAJABUABwAOAAIAEAAAACoABQA+AAsALAAQAAIACwACAAMAFQD9/xMA///2/wAA2v/9/8X/+f/B//f/2v/5//v/AADz/wMA0/8CANL/+v/1//n/CgD8/wwAAgAIAAEAAwD//wUA/f8jAP//SwAHAEoADQAjAAsADQADABsA/f8iAP//GAACAAkAAwDz////3f/7/+r/+f8DAP7//f8DAM//AwC1//z/zP/5/+j/+v/2/wEA//8DAPn/AgDw//3/AwD9/ysA//84AAUAFgAFAP3/AAARAPr/KAD9/zIAAwAyAAgAHwAIAP7/AQD1//r/BwD4/wgA/P/h////vv/9/8b/+v/d//v/7v8BAPv/BQDz/wYA2f8CANT//f/6//z/GQAAAA8AAwD7/wEABQD9/x0A/v8xAAQAPgAKADcACwAQAAUA+//9/xAA+f8jAP3/DwABAO3/AQDj//v/7f/5//D/+v/0//7/5/8BAMH///+y//v/1v/6/wEA//8KAAUA9f8GAPX/AgACAP7/EQD//yMAAwApAAYADwAFAPr/AAAQAP3/OAAAADsACAAgAAkACQADAP7/+//z//f/+P/5//b/+//Z//7/uv/7/8v/+v/z//7/AAAFAOr/CADc/wMA2P/+/+X//P8AAP7/HgADABQAAwD9/wEACgD8/zYA//9DAAYAMgAJABkABgANAP7/CAD6/xQA+f8jAP//EAADAOP/AQDa//v/8f/5//n//f/j/wIAzv8CAMP/AADK////5v8BABAABgAUAAkA9v8HAO7///8NAPz/JAD//yYAAwAdAAMAGAD//xMA/P8kAP3/QwADAEAABwAPAAYA8f/9//f/9f8CAPj/9f/8/+T/AQDT/wEAyf8AANb/AQD6/wQAAAAKAN7/CQDF/wEA4P/8/wAA/P8RAAIAFgADABIAAgAHAP//FAD8/zUA//9GAAQAIwAFAAIAAAAHAPn/GQD4/xoA/P8XAAEAAwABAOb//v/X//r/6//7//b/AADb/wUAvP8EAMn/AADo////AQAEAA8ABgAMAAUA9f8AAOz/+v8LAPr/LQD//yIAAwAKAAMADQD8/yUA/f8xAAEANAAEACIABQD6////3P/3/+r/9P8CAPf/9v///9T/AQDP/wAA3//+/+//AQD4/wUA9/8GAN3/AwDN//7/6//8/xoA/v8mAAUAEwAGAAwAAwAZAP//IwAAADAAAwAyAAQAFQADAPb//f/9//n/HAD7/x4AAgD8/wQA4f8AANj/+v/U//n/3P/9/+T/AADU/wMAwP8BANH//f8DAP//GgADAAYABQD1/wAA9P/6/wEA+f8aAP3/NgADAC8ABgATAAUAEwABADUAAgBAAAYAJQAJAAIAAwDv//v/5f/4/+3/9//9//7/8/8DAM3/AwDE////4f/8//b//v/s/wIA3P8BANn//v/k//v//v/9/ygAAQAwAAUAEgAEAAMAAAAcAP3/NQACADEABwAdAAYAEQACAAYA/P8KAPz/IAD//xkAAwDn/wIAxP/8/8r/9v/i//j/4P/+/9b/AgDS/wIA0/8BAOT/AAALAAEAGgAEAP3/AwDi//7/9f/5/xsA+/8uAAIALwAFACkABgAcAAMAHAABADEAAgA7AAUAFQAFAOn////i//j/9v/3//r//f/1/wIA5f8EANH/AgDJ//7/4f/9//r/AADq/wMAzv8AANz//P8BAPv/IAD//yoAAgAmAAMAEgD//wUA/f8cAPz/PAABAC8ABgALAAUAAQD//xEA/f8YAAAAFAAFAAAABADf/wAAv//6/87/9//t//v/7P8CANP/BgDQ/wIA5/////3//v8JAP//DAAAAPz//v/u//z/BQD6/zUAAABBAAYAKAAKABQABgAbAAMAIAADACMABgAdAAYA//8EANr//f/a//j/+//5/wYAAQDo/wQA0P8BAND/+//Y//n/6f/7//f//v/v////3v/+/+r/+v8cAPz/NwABACQABQALAAQACwAAABAAAAAkAAQANQAHACwACgALAAcA/P8BABMA/v8hAAIAAQAEAN7/AQDM//r/y//3/9n/+f/x//7/8/8EANr/AwDQ////8f/5/xAA+/8KAP7/+P/8//f/+/8BAPr/GQD+/zsABABDAAoAIgALAAcABwAUAAEAKgAEAB4ABgACAAYA8P8AAOb/+//p//v/AAD+/wIAAgDe/wUAvf/+/8j/+f/o//j/9v/+/+7/AQDv/wAA8v/9/////f8jAP7/MgACABoABAD8/wEABgD+/ysAAAA6AAYAMAAJACAABwALAAIA/v///woA/f8QAAEA8P8CAMP//P++//j/2//3/+z//v/r/wQA4/8GANr/AgDW//3/8//6/xEA/P8LAP//7f////P/+/8XAPz/NgACADsABwA1AAkAHgAFAAoAAQATAP//KgACAB0ABQD0/wQA4v/+//D/+//8//7/+f8CAOr/BADT/wEAu//7/8z/9//1//n/AQD//+z/AQDn/////f/8/xoA/f8iAP//IwABABMAAQAAAP//DgD9/zoAAQBFAAYAJwAJAAYAAwACAP7/AgD8/wEA///4/wEA5P8AAMX//f/H//r/7v/9/wUABADy/wgA3P8FAN///v/v//n//v/6/w4A/P8JAP7/+f/+//z//P8qAP7/SAADADYABwAXAAUADQABAA0A//8YAAIAHgADABMABQDv/wIA2v/+/+7//P8FAAEA7f8FAM//BQDE//7/zf/6/+H/+v/8//3/BAABAPT/AgDk//7/BgD7/yYA/P8kAAAACwABAAYA/v8MAP//IAABADYABgA7AAkAGAAIAPP/AgD1//v/CgD8/wAAAADl/wIA0v///8///P/W//z/7/8BAPv/BQDn/wYAyP8AANf/+v/8//f/EAD8/wkA//8JAP//DQD9/xoA/v80AP//RAAEACkABQABAAIA+//9/xoA/f8lAAIAFAAFAP//AwDp/wAA2//+/+f////1/wMA5f8HAMD/BADA////5//7/wMAAAAGAAQAAwADAPn/AAD3//v/DQD4/ysA+/8oAP7/CAAAAAEA/P8jAP3/OwABADoABgAoAAUACgACAO///P/w//z/BQD+/wEABADb/wUAyP8CANv////z/wMA9v8HAO//CADg/wUA0v///+P/+f8OAPr/IgD9/w0AAQD///7/EgD8/y8A/v80AAAALwACABkAAgD+/////v/9/x8A//8qAAMADAAGAOb/AQDg//3/6P/8/+n/AADn/wQA3P8EAMX/AQDK//3/8//9/xIAAgAFAAcA6/8EAOz//v8CAPr/EgD6/yMA/v8hAAEAEAACAAoAAQArAAAAQwAFAC8ABQABAAMA7f/8/+z/+v/z//z/+v////X/AgDY/wIAyP///9///f/9/wEA9v8FANz/BQDV////5//7//7/+/8ZAP7/IgACABIABAD+/wEAFAD+/zUAAAA1AAMAFwAEAAYA//8HAP3/EQD+/x8AAQAhAAQA//8EANX////S//v/7P/7/+//AQDd/wMA0f8CANf////n//7/AQAAABMAAgADAAMA5P///+z/+v8UAPr/KgD+/yIAAwAYAAQAGAACACAAAwAvAAIAOQAEABwAAgDr////2v/5//P/+f8BAP7/9f8DAOL/AwDY/wEA1f///+j////9/wIA+f8FANr/AwDX//7/+v/7/xkA/v8bAAMAFAAFAAsAAwAHAAAAFwD+/zAAAAAwAAIADAADAPj///8OAPz/HgD+/xcAAQD+/wAA4P/9/8n/+f/L//r/5//7//P/AwDZ/wUAyf8CAOD///8AAAEACAAEAAUABQD5/wEA8P////3/+v8lAP3/OgAAACUABgAOAAMAGAABAC4A//8uAAIAHAABAAMA///i//v/3f/6//f/+v8KAAAA8/8EAND/AwDN//7/4P///+n/AQDv/wUA7f8DAOL/AQDn//z/DAD7/ywA//8mAAUACgAEAAgAAAAcAPz/KAD+/y0AAAAlAAEADQAAAP////8SAP3/KAAAABQAAgDl/wAAzf/6/9L/+v/e//z/6/8CAPH/BgDg/wYA0/8CAOj/AAAMAAEADgAEAPX/BADu////AAD7/xcA/P8sAP//NQAEACQABQAJAAQAEQD//ywA/v8pAAAABgAAAOz//P/q//r/8f/7//z///8CAAMA6v8EAMb/AgDG//3/6f/+//j/AgDu/wUA4v8DAOz////9//7/FAAAACgAAgAdAAUA/f8DAP///v8fAP3/NQACACUABAAOAAMABwD//wkA/v8QAP3/FwD+/////v/Q//z/v//4/93/+f/4////9v8FAOf/BgDi/wQA4/8BAPD/AQAGAAMACAAEAOz/BADm////CAD9/y0AAQAvAAYAJAAIABgABgARAAEAFAD+/ycA/f8kAP7//////+H//P/x//r/BQD8/wQAAQDu/wEA2v///8r/+//S//z/7//9/wYAAgDx/wQA4P8BAPP//f8VAP7/IAADABoABQALAAUAAgACAAcA/v8nAP//PQADACcABgAEAAQABQD//xQA/f8VAP7/AAD9/+j//f/O//r/zP/7/+b//P8EAAMA+P8FANv/BADZ//7/8P/8/wAA/v8FAAEAAwABAPz/AAD9//7/HQD+/z8AAwA4AAgAFgAIAAkAAwAWAP7/IAD//xwAAAAOAAAA8v///+D//v/s//3/BwAAAPz/AwDU/wIAwP/+/9D/+//k//7/9v8CAPz/AwDz/wIA5v////n/+/8cAP3/JQABAAsAAgABAP//EQD7/yUA/P8zAP//NgADACAABAACAAIA+//8/xAA/P8NAP3/6v8AAM7//v/Q//7/3/////D/BQD8/wgA7/8IANH/BADQ//7/8//8/w0AAAAFAAIA+P8BAAIA/f8UAPz/KAD//zgAAwAtAAMACwACAAEA+/8dAPr/MQD9/yAAAQD//wEA9f8AAPP////3/wIA//8DAO//BADK/wMAu////9r//v/9/wIAAAAFAPH/BQDw/wAA9P/8/wEA+/8ZAPz/HwAAAAoAAQD+//7/GQD8/zoA/v86AAMAJAAEABIAAgADAP///f/8/wcA/f8FAP//4/8BAMX/AADT/wAA8/8DAPn/CQDr/wkA2/8FANP//v/c//3//P/8/xUAAAAJAAEA9P/+/wQA+/8mAPv/MwD//ygAAgAWAAEACgD+/wgA/P8eAPz/MAD//xgAAwDx/wIA6P////X////5/wIA5/8EANT/BADF/wIAxf8AAOP/AQAHAAQABQAGAOv/AwDp//z/AwD4/xgA+f8eAPv/GwD9/xUA/P8RAPv/KAD8/0MA//86AAQADgAFAPX/AAD6//7/BQD///7/AgDy/wMA2/8EAM3/BADZ/wQA+/8GAPz/CQDe/wYAzP8AAOH/+v/8//v/EAD8/xgA/v8TAP3/BwD7/xIA+P8yAPr/PQD9/x0AAQAIAP//DgD7/x0A/f8kAAEAHwAEAAcABQDl/wYA1/8CAOz/AwDz/wUA2f8HAL//BQDJ/wIA3v8CAPf/BAAEAAQAAAACAOj//P/n//j/CQD0/yoA+f8jAPz/FAD9/xgA+v8pAPv/MwD9/zgAAgAlAAIA/v8CAOb//f/3//z/CQAAAPr/BQDb/wgA1P8IANv/BwDn/wgA9P8IAPD/BgDU/wMAyP/9/+P/+P8NAPv/FgD+/wsA/v8IAPr/DwD3/xoA9/8tAPr/MgD9/xsAAAAEAP7/EAD8/ygA/v8kAAQAAwAGAOz/BQDd/wMA3P8DAOn/BADu/wYA2v8IAMT/BgDS/wMA+v8EAAgABgD8/wQA7f///+v/+f/z//b/EgD3/ywA+/8mAP7/DwD+/xQA+/8vAPr/NwD//yIAAQAJAAEA9f/+/+v//f/1//7/BgACAPb/BgDU/wgAzP8EAOP/BAD0/wQA7v8FAOH/AgDc//3/3v/6//n/+/8eAPz/IwAAAAwA//8DAPr/GQD4/y4A+/8sAP//IQACABUAAQAIAAEAEAD//yQAAwAZAAYA7v8HAND/AwDX/wAA6v8BAOz/AwDn/wUA3P8DANT/AgDi////BwD//xIA///6//3/5v/4//j/8v8WAPb/KQD6/y4A//8pAAAAGAD//xgA/f8uAP//MwACABEABgDu/wMA7P8AAPn/AQD8/wQA+P8HAOj/CADQ/wgAx/8EAOP/AgD3/wIA6/8CANn//f/l//n////4/xgA+/8kAP3/IgD+/wwA+/8EAPj/HgD4/zoA/f8uAAMAEwAEAAkAAQASAAIAFgADABQABwACAAYA3f8GAML/AwDT/wAA7/8CAO//BgDZ/wUA1f8DAOL////1////BAD+/wkA/f/3//r/6v/4/wMA9f8tAPn/NgD//yYAAgAaAAAAHAD//x4A//8kAAEAIAADAAUABADk/wEA6P8AAAEAAAADAAcA6P8JANT/BwDO/wQA1v8CAOn/AAD6/wEA8f///97//f/p//n/EgD6/yQA/f8YAP//BwD8/wMA+v8JAPr/IAD9/zMAAQArAAUACwADAAEAAAAUAP7/GAABAAAABADl/wIA1f8AANP//v/h////9/8CAPT/BADa/wYA0/8CAO//AQAGAP//BAAAAPr//P/2//r/+//5/xMA/P8yAAAAOgAGAB4ABgAKAAIAFgD9/ycA/v8dAAEACgACAPn/AADp////7f/+/wEAAAD9/wMA3P8FAMD/AADN//3/6v/8//b////2////9P/9/+7//P/7//v/GgD9/ysA/v8WAAAAAAD9/woA/P8mAP7/MAADAC4ABgAhAAYACwAFAP//AAALAAAADQABAPH/AwDM/wEAzP/+/+D//v/u/wAA8P8CAOz/AwDc/wIA2P/+//P//P8QAP3/CgD+//b//v/7//r/FwD8/y0AAAA2AAQALwAEABcAAwACAP//EAD9/yYAAAAZAAMA+P8EAOj/AADu//7/9P8AAPP/AQDq/wQA0v8CAMD/AADV//7/+f///wMAAQDx/wIA7P8AAPr//v8NAP7/GwD//yMA//8UAP3/AwD8/xAA+v8yAP7/OQACACIABQAKAAMABQD//wMA/v8CAP///v8BAOj/AgDK/wIAz/8AAO7/AQD+/wYA6v8HANj/BQDW/wAA4//+//f//f8MAP3/CQD+//n//v/9//z/IwD9/zkAAQAuAAIAGAAAAA8A/f8OAPv/GgD+/yQAAAAaAAMA9v8DAOX/AQD0////AAACAO7/BQDZ/wQAzv8CANX/AADm////AAABAAcAAgDy/wMA5/8AAAIA/f8bAP7/HgD//xAA/v8NAPz/DgD8/x0A/v80AAEAOAAEABYABAD4////+//6/woA+/8BAP//7/8BAN7/AgDX/wEA3P8BAPX/AgD+/wUA6P8GAM7/AwDd/////v/9/w4A//8OAP//DAD//wYA/v8QAP//KgAAADsAAgAoAAIABwD//wYA+v8aAPr/HwD//xUAAgADAAEA7P8AAN///v/q//7/9P8AAOP/AwDF/wMAyv8AAOf/AAD9/wEAAQADAP7/AgDy/wAA8P/+/wkA/P8nAP3/JgD//w4AAAALAP3/JAD+/zMAAAA0AAMAJgACAAoA///x//z/9f/6/wcA+/8AAAAA4P8CAND/AgDb/wEA6P8EAO3/BQDs/wcA3v8EANL/AgDm////DAD//xsAAAANAAEAAwD//xIA/v8jAP7/KwAAAC8A//8eAP7/CAD9/woA+v8iAPz/JgABAAgAAwDp/wEA4////+T//v/n/wAA6f8DAN3/BQDJ/wYAz/8CAPT/AgAMAAQAAAAFAOv/AgDt//7/+//8/w4A/f8kAP7/JQD+/xMAAAARAP7/KwD+/z4AAQAqAAIACwAAAPv/+v/2//n/+P/6/wAA/v/5/wEA3P8DAM3/AgDi/wEA9v8DAO//BQDc/wUA2f8CAOP/AAD2/wAADwABABkAAgAEAAMA9v8BAAwA/v8oAP7/LQD//x0A/v8RAPr/DwD6/xIA+/8fAP7/IAAAAP7/AQDb//3/2v/6/+r//P/s/wAA3f8DANT/BADU/wMA4P8EAPr/AwAMAAQA/f8EAOX/AQDw//7/EQD9/yQAAQAjAAEAHQACABgAAAAaAAEAKQAAADQAAAAcAP//9f/8/+r/+P/7//j/AQD9//f/AADn/wIA2f8CANP/AQDi/wAA+P8CAPP/AwDa/wIA3f8AAPz//v8WAAAAHAACABgAAwANAAEACAAAABgA/v82AP//NQAAABcA//8HAPz/EwD8/xsA/v8WAAEAAwAAAOn//v/Q//v/0v/7/+n//v/t/wIA1v8FAM3/BADe/wIA9v8DAP7/AwABAAMA9v8BAPD////+//3/JgD+/zkAAAApAAMAFQABAB0AAAAmAAAAKAABACAA//8MAP3/7v/6/+r/+v/8//r/CAAAAO7/AwDT/wMAz/8AANr////j/wEA7v8BAOj/AgDc/wIA3/8AAAIAAAAgAAIAGQAEAAUAAwAHAAAAEwD+/yMAAAAwAAAALQAAABMAAAAFAP//EgD//yEAAQANAAIA6P///9f/+//W//v/3f/9/+z/AQDu/wQA3f8FAND/AwDm/wAAAgAAAAQAAQDy/wAA8P////z//v8QAAAAJgABADEAAwAeAAQACwADABUAAAAtAAAAKgAAABEA///6//v/8v/6//H/+//8////AAABAOj/AwDK/wEAzf/+/+f//v/0/wIA7f8DAOj/AwDu/wEA+f8BABEAAgAjAAEAFgACAP//AAACAP7/IwD+/zMAAAAsAAIAHAAAABEA/v8JAP//DgD+/xMA/v/+/wAA2P/8/83/+//j//v/8/8AAO//AwDl/wUA3/8DAN3/AgDt////BQD//wcAAADy/wAA8v///w8A//8qAAEALwAFACgABAAbAAMAEAAAABMA/v8nAP7/JAD+/wMA/f/q//v/8P/7//n////2/wIA5/8DANj/AQDJ/wAA0P/+/+3/AAD+/wEA7P8EAOT/AQD0/wAADwAAABoAAAAZAAEADwD+/wYA//8NAP7/LwD//z4AAQAqAAMADQABAAsAAAAQAP//DQAAAAAA///s//3/0v/8/83//f/j//7/+v8DAOv/BgDX/wUA2f8AAOr//v/3//7/AwD+/wMA/v/7/////f///xwA//84AAEAMwAEABkABAATAAAAGAD//x4AAAAhAAAAFgD///r/AADl////7f//////AgD0/wQA2P8CAMz//v/V//z/4//+//X/AAD7/wEA8v8CAOf/AAD7//7/GwD+/yEA//8NAAAACAD//xAA//8hAAEAMAACADQABAAeAAMAAAACAPz/AAANAP//CgAAAO//AADb//3/1//8/9z//v/s/wEA9v8EAO3/BADV/wEA3P/+//j//P8NAP//BgAAAAEAAgAHAAAAEwADACQAAgA0AAQAKAADAA0AAgAFAP//GwD//ygAAAAZAAAAAQD///P//f/n////6/////P/AADp/wEAzP8AAMT//f/e//3/+v8AAPz/AwD4/wMA9f8BAPj/AAAGAP3/HgD+/yMA/v8QAAAACAD//x4AAAA0AAEAMgAEACAAAgANAAAA+v/+//f//v8EAP3/AwD//+b////Q////2f///+7/AgDy/wUA7P8FAOP/AgDd/wAA5f/9/wUA/v8ZAP//DgABAAEAAQAOAP//JwAAAC4AAgAmAAEAGgAAAAoA//8HAP7/HAD9/ycA/v8OAAAA7v///+T//v/s////7f8BAOb/AQDd/wAA0P8AAND/AQDq/wIABgAEAAEABQDv/wQA8P///wQA/P8TAPz/HAD9/xwA/f8TAP7/DgD//yIA//84AAEALQACAAsAAgD3//7/9/////n////5/wEA8v8AAN7/AQDO/wIA2v8DAPT/BAD1/wYA3/8DANf////m//z/+f/9/wwA//8VAAAADwAAAAMAAQAQAP7/LAD+/zIA//8dAAAADgD9/w4A/f8WAP7/GgABABgAAQABAAEA4f8BANj////r/wAA8P8BAN//AgDQ/wAA1P///+L/AQD1/wMABQAEAAMAAwDv/wEA8f/+/w4A/P8lAP7/HwAAABgAAAAaAAAAIwABACwAAgAzAAEAIwAAAAEA/v/t//3/+//8/wYA/v/5/wEA4v8AANj/AADV/wIA4P8DAPD/AwDz/wIA4P8AANr//f/z//z/FAD+/xcAAgATAAIADwABABAAAAAaAAAALgAAAC8AAAAaAAEABAAAABAA//8gAAEAGgADAAMAAgDv/wAA3P///9v////o////7/8AAN7/AADN/wAA2/////j/AgABAAQA/f8DAPf//v/z//z/+//7/xUA/P8pAP7/IgABABAAAQAXAAAAKQABAC0AAgAeAAEADAAAAPf//v/u////+v///wUAAQD0/wIA1v8CAM//AQDe/wEA6v8CAOr/AQDo//7/4f/9/+L//P/7//3/GAD//xkAAgAFAAEAAgD//xMA/f8jAP//JQAAACIAAAAUAAAABwACABAAAgAfAAIAFAADAPH/AgDb/wAA3//+/+j/AADr/wAA6////+D////W////5P8AAP//AQAIAAEA9////+7//P/8//r/EQD8/x8AAAAnAAIAIAAEABEABAAUAAMAKAABACoAAQAPAAEA9/////L//v/5/wAA/P8BAPv/AQDt/wEA1P8AAM7/AADm////9f8AAO7/AADj//3/6v/7//v//f8MAAAAGgACABoAAQAHAAIAAwD//x0AAAAwAAEAKgAEABgABAAQAAMAEgADABIAAwATAAEABAAAAOL//f/O//3/3v/7//H//v/u/wAA3/8AAN3//v/l////8v8AAAMAAAAKAP//+v/+//H//P8HAP3/JQAAACoABQAhAAYAGQAFABYABAAYAAMAIAABACAAAQAIAAAA7P////D//v////7//P8AAOj////a//3/0P/8/9T//P/l//3/+P/9//D//v/j//3/7v/9/wwAAAAYAAQAFAAFAA0AAgAJAAEADQABACAAAQAxAAQAKAAFAA0ABQAJAAMAFAACABQAAwABAAAA7//9/93/+v/Y//v/5f/7//j//f/z//3/3P/+/9f//P/s//3/+v/9/////v/9//3/+v/9//r///8NAAIAKAAGACwACQAWAAkACwAGABYAAwAgAAMAGwACABIAAQD/////8P8AAPH//v8CAP///v///+T//v/Q//v/2//6/+v/+//1//3/+P/8//T/+//r//3/9v///xAAAQAcAAMADAAEAP//AgAIAAEAGwAEACQABwAmAAgAGgAHAAUABwD+/wQACwABAAwA///0//7/2//7/9v/+v/n//v/8f/9//b//f/y//z/3//8/9z/+//z//z/CQD9/wUA/v/6//7////+/xAAAgAcAAYAKAAJACUACAATAAgABwAEABcAAgAlAAEAGgADAP//AADz/wAA8/////X////3//3/8f/7/9n/+f/N//n/4P/5//v//P8BAP7/9P/+//D//f/6////BQADABUABAAeAAQAEgAEAAUAAgAVAAIALgAEADIABwAgAAcAEAAEAAYAAgABAAAAAQD+/wAA+//r//z/1P/7/9r//P/v//7/9////+r/AADh//z/4P/7/+j//f/6//7/DgD//wsAAAD+/wEABQACAB8ABAAsAAgAJAAJABkABgASAAQAEAACABkAAQAiAAEAFAAAAPP/AADn//7/8f/+//f//v/r//3/3f/6/9X/+P/W//r/5v/8//7//v8BAP//8P///+v//v//////EQABABYAAgARAAIAEAABABAAAwAbAAUALwAGAC8ABwATAAYA//8CAAAA/v8HAP3/AAD9//T//P/m//z/3P/9/93////y/wAA+P8AAOb////V//3/4v/8//b//v8EAAAACAAAAAgA//8CAAEACgADACAABAAuAAYAHQAEAAgAAQAKAP7/GAD+/xoAAQAWAAAABgAAAO//AADj//7/7f/+//b//P/n//z/0f/8/9b//P/m//7/9f8CAP3/AQD+/wEA8/8AAPH/AAAFAAAAHQACABsAAwANAAMADgABABwAAwAkAAUAKQAFAB8AAwAKAAAA9P/+//v//P8IAPz/AAD+/+b//f/b//3/3//9/+j/AQDu/wAA8f///+T//f/c//3/7f/+/w4AAAAWAAMADQACAAcAAgAQAAMAGgAFACUABgAqAAQAHQACAAkAAAANAP//HAD//xwAAQADAAEA7////+f//f/i//3/5f/9/+v//P/f//z/0f/9/9j//v/z/wAABAABAP3/AgD2////+P/+//////8QAAEAIwACACMAAgASAAIAEgACACYAAgAxAAUAIwAEAA8AAAAAAPz/+f/8//r//P8BAP3/9v/+/9v////Q/wAA4P8AAPD/AQDt/wEA5P/+/+P//f/n//7/9/8BAA8AAgAYAAIACQACAAMAAQATAAAAJAACACYAAgAdAAAAFwD9/xAA/f8PAP7/GgAAABUAAAD4/wIA4P/+/9///f/r//z/6//+/+L//v/e//7/2f8BAOD/AgD5/wQABgADAPn/AQDq////9f/+/w4AAAAcAAIAHwADAB0AAQAWAAEAFgACACQAAgAsAAIAFwAAAPz//P/2//r////7/////v/3/wAA6////9z/AQDV/wAA4/8AAPT////v//7/3//+/+T//f/4/wAABwACABAABAASAAIACwACAAYAAgATAAIAKQACACUAAgASAAEACQAAABAA//8TAAMAEAACAAMAAQDu//7/2f/8/97//P/x//z/8v/+/97/AADZ////4/////L/AQD8/wEAAgD+//z//f/z//7/AQAAAB4AAgAqAAQAHgAEABYAAwAaAAMAHwAFACAABQAeAAIADAD///T//f/w//z//f/9/wAAAADr/wEA3P8AANn////f////5/8AAPX//v/y//7/6v/+/+3/AAAJAAEAHAADABYABAAMAAEADQABABIAAQAeAAMAKgACACcAAgASAAAABwD//xEA//8YAAEABQAAAO3//f/f//r/2//5/+H/+//w//3/8P/+/+L/AADa/wEA7v8BAAIAAQACAAEA+v/+//z//f8CAAAAEAADACMABQArAAUAGgAFAA4AAwAVAAIAJAACAB4AAgAOAP7/AAD8//T/+//w//3/+f////n/AADl/wEA0f///9b//f/o//3/8v/9/+7//f/u//z/7v/+//b/AQAMAAIAHQADABMAAgADAAEACAAAAB0AAgAnAAQAIgAEABkAAQAOAAAABAAAAAoAAAANAAAA+v/+/97//f/Z//v/5//8//D////u/wEA6v8AAOT/AADi/wAA8P8AAAYA/v8FAP7/9//+//j//v8MAAAAGwAEACAABQAeAAMAFgACAAsAAgARAAIAIQABABsAAQACAP//8v/8//T//P/4////9f8BAO3/AADi//3/1P/9/93//P/2//3//v////L/AADt/wAA+f8CAAkABAASAAYAFQADABAAAQAGAAEADQADACQAAwArAAUAGwADAAoAAQAJAP//CgAAAAYAAAAAAP7/8//7/9//+//c//r/7f/8//n////t/wEA4v8AAOb////w////+/8AAAcA//8HAP//AAAAAAAAAwAYAAUALAAIACYABwAWAAQAEQABABAAAQAUAAIAFgABABAA///5//7/6v/9//H//v/8/wAA7/8AAN3//v/X//r/3P/6/+j//P/5//3/AAD+//f////u/wAA//8CABUAAgAXAAMADQABAAwA//8QAAEAGQAEACYABgAqAAUAGAAEAAEAAQAAAP//CgD//wUA///0//3/5v/6/+H/+v/h//3/7v////b/AADs/wAA3P8AAOP//v/7//7/BwAAAAQAAAADAAAABAABAAwABAAcAAUAKgAFAB8AAwAKAAEABgD//xUAAAAZAAEAEAABAAIA///2//3/6////+/////2////7f/+/9j//f/W//v/6P/8//n////5/wEA+f8AAPb/AAD0/wEAAQACABUAAgAYAAIACgACAAYAAQAXAAMAJAAFACMABgAbAAMADgAAAP7////8//7/BQD+/wEA/v/q//z/3P/8/+P//P/v/wAA8P8CAO7/AQDo////4f/+/+n//f8DAP7/DwAAAAYAAQD//wEACgADABoABgAgAAYAIQAEABwAAAAOAAAADQAAABoAAAAfAAEACwAAAPX//v/w//z/8//+//D////t//7/5f/8/9r/+//a//z/8f/9/wIAAAD9/wMA8f8BAPT/AQABAAEADAADABYAAgAbAAEAEgACABAABAAgAAUALgAHACQABQAOAAIAAwD8/wAA/P////3//v/9//n//P/n//z/2v/8/+P//v/0////8f8BAOX////i//z/6//8//j//v8IAAAAEAABAAkAAwAAAAQADgAFACMABQAnAAUAGgADABEA//8QAP//EQABABUAAgAUAAEAAgD//+n//f/l//z/8P/8/+///v/j//z/2//7/9//+//o//7/9/8AAAMAAQD+/wEA8P8BAPX///8NAAAAGgACABcAAwAUAAIAFQADABcABQAfAAYAJgAEABsAAgACAP//9v/8//7//f8AAP7/9f8AAOj//f/i//z/3f/+/+b////y/wAA8////+T//f/i//z/9v/8/wgA//8MAAIADAACAAkAAgAKAAMAEgAEACQAAwAnAAIAFgABAAcAAAARAAAAFwADABIABAAEAAAA9v/+/+b//P/l//3/7v/9//P//f/j//3/2v/8/+b//P/4/////P8CAP3/AQD4/wAA9v////v/AAATAAEAIgACABsABAAOAAQAFQAFAB4ABgAfAAcAGAADAAwA/v/7//z/8f/9//v//f8AAP//8////97//v/c//z/5v/+/+r////t////7f/8/+j/+//q//z/AAD+/xQAAQAUAAQABwAEAAkAAwAVAAMAHgAFACMABAAjAAIAFAACAAkAAwAPAAQAGAAEAAwAAwDz////5P/7/+X/+//m//3/6v/+/+v//f/h//z/2v/8/+j//f/+////BAAAAPr////4//z/AgD+/w8A//8cAAIAJAAEAB0ABQARAAYAFAAGACQABgAiAAQADwABAP///v/7//3/+v8AAPr/AQD5/wAA7P/+/9f//f/X//z/6f/8//L////t//3/6f/7/+//+//6//z/BgAAABQAAQARAAIABAABAAYAAQAaAAIAJgADACAABAAUAAIADwACAAwAAwALAAYADQADAAEAAQDn//7/2//8/+T//P/u////6/8AAOT////k//z/5//9//H///8BAP7/BgD+//r//f/3//z/CQD8/x0A//8eAAMAGQADABQABAASAAQAFAAFAB0AAwAcAAEABgD///L//v/1/////f8CAPn/BADt/wIA5P///97//v/f//7/7v/+//n//v/w//3/6P/8//b//P8JAP//EAABABAAAQANAP//CgD//wsAAAAbAAIAJwABAB0ABAAKAAIACQADAA0AAwAJAAQA/f8BAPH//v/k//z/3v/9/+j////3/wAA8f8AAOP//v/k//z/8v/8//v//v8AAP7/AQD8/////P/+//7/EAABACQAAwAkAAYAFQAGABAABAAYAAQAHAAEABgABAAQAAEA//8AAPD/AQDy/wIA/f8CAPj/AQDj////2v/7/+H/+v/p//z/8f/9//b//P/z//r/8P/7//r//P8PAP//FgABAAoAAgAHAAAAEAAAABsAAwAhAAQAJAAFABkABQAIAAYAAwAFAA0ABQALAAMA+f8BAOf//f/l//z/5//+/+3/AQDy/wAA7v/+/+D//P/i//v/9P/6/wMA/f////3/+v/8/wAA/P8LAP//FAACACEABAAfAAQAEgAEAAwAAwAaAAMAIQADABUAAwAAAAEA+P8BAPT/AgDy/wQA9f8DAPH/AADe//3/2f/7/+b/+//3//3/9/////L//f/0//z/+//9/wMA//8QAAAAFQAAAAoAAAAEAAAAEgABACIABAAiAAYAFwAGABAABQAHAAQAAwAEAAUAAgADAAAA8P/8/97//P/j//z/8f/+//L/AQDs////5//7/+b/+v/q//r/+P/8/wcA/f8CAP7/+v///wQAAAAXAAMAHgAIABsACAAWAAYAEQAFAA8ABQAVAAUAGwAEAAwAAwD2/wEA8P8AAPf/AAD3/wAA7v/+/+b/+f/h//f/3v/3/+v/+f/9//v//f/8//H/+//z//z/AgD9/w4AAQAQAAQAEAADAA4ABAAMAAUAFwAHACYACQAlAAkAEAAIAAUABAAGAAMABgACAAAAAAD3//z/7P/6/+H/+v/k//z/8v/9//P//f/m//r/4P/3/+z/9//5//r/AgD+/wgAAAAIAAAABQADAAsABQAfAAgAJgAKABkACQAOAAcAEAAEABUABQATAAQADwADAAMAAADy//7/6P/9//D//P/z//r/5f/4/9n/9v/e//T/5//4//H//P/5//7/+v/9//L//f/0//7/BwABABkABAAWAAYADwAGABIABgAaAAgAIAAKACQACgAeAAcADQAEAP3/AQABAP7/BQD9//n/+//n//r/4v/4/+T/+v/o//z/7//8//D/+f/n//f/4v/3//D/+f8GAP3/CAABAAQAAwAFAAMADQAFABMACAAgAAoAJAAJABoACAANAAYAEQAEABsABAAWAAQABAACAPj////w//3/6//9/+7//P/x//n/5f/3/9r/9v/g//f/9f/7//z//v/5////9//9//v//f8AAAAADgADABoABQAXAAcADAAGABEABwAgAAgAJQAKABoACAAOAAQABAAAAPv////7//7////9//T//P/h//z/3P/7/+n//P/x//3/7//8/+3/+f/u//j/7v/6//r//v8LAAEADwAEAAUABAAGAAUAFAAFACAACAAeAAgAGgAHABQABAANAAQADQADABYAAwAPAAIA+f8AAOj//P/p//r/7f/6/+v/+f/n//f/5P/1/+H/9//n//r/+f/9/wEA///4//7/8//+/////v8NAAMAFAAHABgACQAYAAkAEwAKABMACwAgAAsAIgAKABIABwD//wIA/P/+//3//P/6//z/8//6/+v/+f/f//j/2//5/+j/+f/0//n/7f/4/+X/9v/s//b/+P/7/wMAAQALAAQADwAFAAsABgAKAAcAGAAJACYACgAfAAsAEgAIABAABQATAAUAEgAGAA4ABQAEAAEA8v/+/+L/+//n//n/8v/5/+3/+P/i//f/4v/3/+r/+P/z//z//P/+/wIA/P/+//z/+f/9/wYAAAAaAAQAHwAIABYACQAUAAgAGAAHABoACQAcAAgAGgAGAAsAAwD4/wAA9v/+//7//f/7//7/6//9/+T/+v/j//n/5f/6/+3/+//0//r/8P/4/+j/+f/v//v/BgD//xAABAAMAAUACgADAAsAAwAPAAQAFwAHAB4ABwAZAAcACQAFAAQAAwAOAAQADwAEAAIAAgD1//7/7P/7/+j/+v/q//v/8//6//D/+v/l//r/5P/6//T//P8AAP7///////3//f////z/AQD//woAAwAZAAcAHQAJABAACQALAAcAFAAGAB0ACAAWAAcADQAEAAIAAAD5//7/9f/+//3//v/6//7/6v/8/97/+v/m//n/8f/6//P/+v/y//n/9P/3//P/+v/6//7/CgACABQABAALAAQABAADAAwAAwAaAAYAHQAJABsACQAWAAcADQAGAAcABQAMAAQADAACAP3/AADo//3/5v/5/+v/+v/u//r/6//6/+z/+f/m//n/5//6//T//P8DAP3////9//j//P/8//3/DAABABYABwAbAAoAHAAKABUACAAOAAcAFQAGAB4ABQAVAAQAAAABAPf//v/3//3/9//+//L//v/u//v/4//5/9v/+P/i//j/8//5//X/+f/u//n/7v/6//n//f8DAAIACwAGABAABgAOAAUABwAFAA8ABgAgAAkAIwAKABUACQAMAAYACwADAAoAAwAGAAIAAgD///X/+//j//n/4f/4/+7/+P/y//r/6v/6/+X/+f/p//n/7//7//j//f8BAP7/AgD+//r//////wIAEwAGAB8ACwAZAAsAFAAIABQABQAVAAUAFwAFABgABAAPAAEA/P/+//L//f/6//z////9//P//f/o//v/4//5/+T/+v/q//v/9v/8//r//P/z//3/7///////AgALAAUADAAGAAgABAAKAAIADQADABMABgAdAAgAIAAHABEABQAFAAEACAD//w4A/v8EAP7/+P/8/+3/+f/n//n/5v/6//H//P/2//3/7f/9/+T//f/t//3//P///wAAAgD//wIAAQABAAIAAwAIAAYAFwAKACEACgAaAAgADwAFABEAAgAbAAEAFwACAA0AAQADAPz/+P/7//D/+v/0//v/9v/7/+z/+v/b//j/3f/3/+j/+f/x//v/8v/+//b//v/0////9v8CAAIABQASAAcAEQAHAAoABgAMAAUAGgAHACAACgAgAAoAGwAGABIAAQAGAP7/BgD8/wkA+/8AAPr/6v/4/+H/9//l//f/6v/5/+n/+//r//v/5v/6/+L/+//q//3//f8AAAQAAgD+/wMA/v8EAAwABgAYAAsAHgANACEACwAcAAcAEQAEABIAAwAbAAMAGwACAAgA///6//z/9v/5//b/+f/w//v/7v/4/+b/+P/b//f/2//4/+3/+//3//7/9P8AAO//AAD4/wEAAQAEAAkABwARAAcAFAAGAAwABQAMAAYAGwAIACQACQAbAAgADgACAAgA/f8GAPz/AAD7////+//4//r/5//5/97/+f/o//r/8//9//H//v/p//z/6//8//D//f/5/wAAAwACAAsAAgAFAAQAAwAFABEABwAhAAoAHwAKABcABgATAAIAEgAAABEAAQAUAAIAEQAAAAAA/f/v//r/8P/5//X/+f/w//v/5//6/+P/+P/l//n/6//7//b//v8BAP///P8AAPb/AQD+/wIADwAFABUABwATAAcAEwAFABQABgAWAAgAHQAKACIACQAVAAUAAgAAAP7//P8DAPz/AAD8//T//P/r//r/5P/5/+L/+v/p//v/9P/8//H/+//m//v/6f/6//n//f8EAAEABwADAAoABAAMAAQADgAGABYACAAhAAkAHwAHABEABAAMAAIAEgABABIAAwAKAAQA/v8BAPT//P/o//r/6f/6//D/+v/v//r/4P/6/9v/+P/n//r/8v/8//f////8////+//+//r/AAABAAIAEwAFABoABgATAAYADgAFABcABgAdAAgAHAAKABcABgANAAEA/v/9//j//P/+//3////+//D//f/j//r/5f/5/+v/+v/s//v/7//7/+3/+v/p//r/6//8//////8MAAEACwAEAAUABAAMAAQAFAAHABkACQAcAAgAGwAFAA8AAgAKAAIADwADABQABAAHAAIA9v/+/+//+v/u//n/7P/6/+7/+//r//r/5P/5/+D/+v/v//z////+/wIAAQD6/wAA/f///wMAAQAMAAQAEwAGABsABgAUAAYADwAHABcABwAhAAkAHAAHAAwAAwACAP3//f/7//n//P/5//7/+P/+/+3//f/i//v/5//6//P/+//2//3/7//8//D/+v/1//v//P/+/wcAAQARAAIADgADAAcAAwAMAAUAGgAHAB8ACAAWAAcADwAEAAsAAgAGAAMABwAFAAkABAD9/wAA6v/8/+T/+v/q//n/7v/8/+j//f/m//v/6P/6/+z/+//2//3/AwD+/wUA/v/8//3//f/9/w0AAAAXAAQAFwAHABUABgAUAAYAEgAGABUACAAaAAcAFQAFAAEAAAD1//3/+P/9//r////y/wAA6//+/+T/+v/h//n/4//5//D/+v/2//r/7f/6/+z/+f/5//v/BgD//w0AAgAOAAMADwADAAwAAwAPAAYAGwAIACEACAAVAAcACwAEAAwAAwAPAAUACQAFAP//AgD1//3/6P/5/+P/+f/r//r/8v/8/+n/+//h//n/6P/4//T/+v/7//3////+/wAA/f/+//7/AAAAABAABAAeAAcAGwAJABIACAAVAAcAGwAIABoACAAUAAYADAABAP3//v/z//z/9f////v/AADy////5P/9/+L/+P/o//f/6//6//H/+//0//v/8v/7//D//P/9//7/DgABABIABAALAAMADAADABIABAAWAAYAGgAIABwABgATAAQACQADAAgAAwAPAAQABwADAPf////r//r/6v/4/+r/+v/v//3/8v/9//D//f/o//v/7v/7//3//P8EAP///v////3///8EAP//DAADABUABwAfAAgAHAAHABEABgAOAAQAFwAFABcABAALAAMA/v/+//r//P/1//3/9P////X////v//3/4f/5/+D/+P/t//j/9v/8//P//f/y//3/9//8//7///8GAAIAEwAEABUAAwANAAQACgADABUABQAdAAgAGQAJABIABwAPAAMACAACAAQAAgAFAAEA/v/9/+r/+v/e//f/4v/3/+z/+//s//3/6f/9/+r/+v/r//r/7//8//7//v8FAAAAAAAAAPz/AQAJAAIAGAAGAB4ACgAbAAkAGgAHABMABQAPAAYAEwAGABQABAAFAAEA9f/+//P//P/3//7/8v///+r//v/k//n/4P/2/9//9//s//n/9//8//X//f/v//3/9//9/wYAAAAOAAMAEAAFABIABAAPAAQADgAGABYABwAiAAkAHAAIAA8ABgAJAAIACgABAAQAAQD8////8//6/+j/9//g//f/5//5//L//P/x//3/5//8/+j/+f/x//n/+v/9////AAAFAAEABQACAAQABAAPAAcAHwAJACEACwAXAAkAEQAFABQABAATAAUAEQAEAAsAAQACAP3/9P/7//L/+v/4//v/9f/8/+f/+f/g//b/5f/1/+3/+P/2//3//f////7////6/wAA//8CAA8ABAAWAAcAEAAIAAwABwAQAAcAFgAJABoACwAdAAoAFwAGAAgAAQD///7/AgD9/wAA/f/y//r/5v/4/+b/9f/p//f/7//7//X//P/2//z/7v/5/+3/+f/5//z/BwAAAAUAAwADAAQABwAEAA0ABwATAAkAHAALABwACQASAAcACQAEAA0AAwASAAMACQACAPz////1//v/7v/6/+z//P/u//z/7v/6/+T/9//d//X/6P/3//f/+//8////+/8AAP3///8AAP7/AwACAA4ABQAVAAYAEQAIAAoABwASAAcAHAAJAB0ACgATAAgADAADAAMAAAD7//7/+v/+//v//P/v//n/4//3/+P/9v/u//n/8f/9/+7//f/t//r/7v/4/+//+v/9//7/CQACAAoABAAEAAUACQAFABUABwAcAAoAGAAKABYACAAPAAUACQAEAAoABAARAAMACAABAPn//f/w//r/8v/5//H/+//s//v/6P/4/+b/9f/k//b/7v/5//7//v8CAAAA+/8AAPr///8DAAAADAADAA0ABwAQAAgADwAIAA0ACAASAAkAHgAJABwACAANAAQAAQD//////f/+//3/+P/9//T/+//v//j/5//3/+r/+f/1//v/+v/+//H//P/t//r/9P/6/////v8GAAIADQAGAA8ABgAKAAYACgAHABcACAAcAAkAFQAIAAsABAAKAAIACgACAAgAAwAFAAEAAAD+//L/+v/q//n/8P/5//T/+//s//r/5v/4/+n/+P/z//r/+f///wIAAwAGAAIAAQABAP7/AAAKAAMAFgAGABUACQAQAAgAEQAHABMABgAVAAcAFgAHABIAAwADAP7/9P/7//b/+f/7//r/9v/7/+v/+f/p//f/6f/3/+v/+v/x//3/9v/9//H//P/t//v/9//9/wgAAgANAAcACwAIAAwABwAPAAYAEAAIABcACgAZAAkAEgAHAAYABAAHAAEADgABAAsAAQD/////9f/6/+7/9//p//f/6v/5/+//+v/r//n/4//4/+j/+P/2//z//v8BAPz/AgD8/wEA/v///wEAAQALAAUAFwAIABcACgAPAAkADwAHABcABwAZAAcAEQAGAAkAAQAAAP3/+P/7//f//P/8//3/9//8/+r/+v/k//f/7f/5//L//P/y//3/8P/9//L/+v/z//v//f///wsABAARAAYACQAGAAYABQAPAAQAFgAGABYACQAUAAcAEQAEAAoAAwAIAAIADgACAAkAAQD6//3/7P/4/+3/9//u//j/7v/7/+3/+//v//n/7P/5//H/+//+////BgABAP//AgD7////AQD//wwAAwARAAgAFQAKABYACgARAAcADgAGABUABQAYAAUADAACAP3//v/5//r/+f/6//n//P/2//3/9f/6/+v/+P/n//f/7v/6//j//f/0//3/8P/9//T/+/8AAP//BwAEAA4ACAARAAgADAAGAAcABQAQAAUAGgAHABgACAAPAAYACgACAAkAAQAGAAAAAwAAAP7//f/x//n/5P/3/+X/9//u//r/7v/8/+n//P/q//r/8v/7//f//v/+/wIABAADAAEAAQD9/wEABgABABUABgAcAAkAFgAKABMABwAUAAQAEwAEABIABAASAAIABwD///j//P/z//v/+v/7//f//f/u//3/5f/5/+T/+P/j//n/6P/8//L//v/0//7/7//9//X//v8FAAEADwAGAA0ABwAMAAUADQACAA4AAwAUAAUAHQAHABwABwAPAAQACAAAAAsAAAAKAP////////T//P/s//j/5v/4/+j/+//w//3/8//+/+r//P/o//v/8//8//3/AAD+/wIA/f8CAAAAAAACAP//CwAEABcACAAeAAoAFQAJAA0ABAARAAIAFQACABEAAwAJAAEAAgD+//n/+//1//z/+f/9//r//v/u//z/4//6/+b/+P/u//v/8v/+//X/AAD5//7/+v/9//7/AAAKAAMAFAAHAA4ABgAHAAQACwACABQABAAYAAcAGAAIABUABQAMAAEAAwD//wUA/v8FAP7/+f/9/+n/+v/m//j/6//5/+///f/w////8//+//D//P/v//z/+P///wQAAQAFAAMAAQABAAQAAQAQAAIAFgAHABoACgAaAAkAFAAFAAwAAgANAAEAEwACAA4AAgD//wAA9v/9//X/+//z//z/8f/9/+///P/o//n/4f/4/+b/+v/1//3/+/8AAPf/AAD5//7/AgD//wgAAgAPAAYAEwAHABEABQAKAAMADwACABoABQAeAAcAFAAHAAoAAwAEAP7/AAD9//r//v/4//3/7//7/+P/+f/h//n/7f/7//L//v/w////6//8//D/+v/z//z/+v8AAAMAAgAIAAIAAwABAAkAAgAXAAQAIAAJABwACgAUAAcAEAACAA4AAAAMAAEADwACAAsAAQD7////8P/7//L/+//0//z/7f/9/+X/+//k//n/5v/4/+v//P/2/wAA/P8BAPf/AAD2////AQAAAA0AAwAPAAYADgAGAA4AAwARAAIAEwAEABwABwAdAAgAEQAFAAIAAAABAP3/AAD8//v//v/y//3/7f/7/+j/+f/p//v/8f/+//n////0//7/7P/8//H/+//8//7/AQACAAQABAAHAAIACgACAA0AAwAVAAcAHAAJABYACAAIAAMABwAAAAwA//8MAAEABwACAAAA///3//z/7//6//D/+//1//v/8P/8/+b/+v/n//n/8v/7//r////+/wIAAgABAAIA//8BAP//CQACABQABQAUAAcADAAGAAsAAwASAAMAFwAGABYACAARAAYABgABAPr//f/2//v/+//8//n//P/t//v/5//5/+z/+f/x//v/8//+//X//v/z//z/8P/7//f//f8HAAEAEAAFAAwABgAKAAQAEQADABYABQAYAAkAFwAJABEABgAFAAEAAwAAAAoAAAAMAAIA/v8CAPL//f/t//n/6//5/+r/+v/s//z/6//7/+b/+v/o//r/9//9/wMAAgACAAMA/v8BAAIA//8HAAAADAAFABIACAAVAAcADgAEAAwAAwAWAAQAHAAGABQABwAGAAMA/P/9//j/+f/0//v/9v/8//X//f/r//z/5P/6/+r/+v/z//3/8////+7//v/w//z/9v/8//z///8IAAQAEAAGAAoABQAHAAQADQAEABcABwAWAAkADgAHAAoAAwAIAP//BwAAAAoAAQAKAAIA/v///+//+//u//f/8v/4//L/+//t//z/7f/7/+7/+v/z//z//P8AAAUAAgACAAIA+/8AAP////8KAAIAEAAGABAACAARAAcAEQAEABAABAATAAYAFgAHAA0ABAD8////9v/6//r/+f/8//v/9//9//P//P/v//n/6//4/+7/+v/5//z/+P/+//L//f/z//z/AAD+/wkAAwANAAcADgAHAA4ABAAKAAQADQAGABUACAAUAAkACQAFAAQAAQAIAP7/CwAAAAYAAQD//wAA9f/7/+r/+P/o//b/8P/5//T//P/u//3/6//7//T/+//9//7/AQABAAQAAgAFAAAAAQD//wQAAQAQAAUAGQAJABMACQAPAAYAEgADABUABAASAAUADAAFAAIAAAD2//v/7//4//b/+v/7//3/8v/+/+n//P/q//n/7P/5//D//P/0//7/9//+//X//f/3//3/BAABABEABQAPAAcACgAFAAsAAwAPAAMAEQAGABUACAAUAAYADAAEAAQAAAAIAAAADAABAAMAAgD0//7/7P/6/+r/9//r//j/8P/8//T//f/w//3/7P/7//X//P8AAP//AgACAP3/AgD+////BAD//wkAAwASAAYAFwAIABIABwALAAQADQADABQABAARAAUABAAEAP3////5//v/9//7//n//f/7////8//+/+b/+//n//n/8P/6//b//f/0////9v/+//r//P/+//7/BgACAA8ABQAOAAUABgADAAYAAQARAAMAFQAGABIACAANAAUACwABAAcAAAAHAAEABwACAP//AQDu//z/6P/5/+//+P/2//v/9f////X////0//3/9P/8//j//f8CAAAABAABAP3/AQD9////CAABABIABAAUAAkAEQAIABAABQAKAAIACgACAA8ABAAMAAQA/v8BAPb//f/3//r//f/8//n////z////7v/8/+j/+f/o//j/9f/7//z//v/5////+P/+/wEA/v8KAAEADgAEAA4ABQAOAAQACQACAAoAAwASAAUAGQAIABEACAAIAAQABQD//wYAAAAAAAEA+v8BAPH//v/o//r/5P/3/+3/+f/3//3/9f///+7//v/x//v/+P/7/////v8CAAEABgABAAQAAAAFAAAADwADABwABwAZAAkAEAAIAA0AAwAOAAIADAADAAoABQAFAAMA/P/+//L/+//0//v/+v/9//T//v/o//3/4//5/+b/9//t//n/9P/9//3/AAD9////+//+/wEA//8OAAIADwAFAAkABgAIAAMADQADABEABAAWAAgAGAAIABEABgAEAAEAAQD//wQA//8AAAAA9P///+z/+//r//j/7f/4//L//P/5////9v///+7//P/v//r/+//8/wMA//8CAAIAAgACAAcAAAALAAMAEQAFABcACQAVAAgACgAFAAUAAgALAAEADgAEAAUABAD+/wEA+f/9//X/+v/0//z/9v/9//L//f/n//r/5P/3//D/+P/8//z//v8AAP7/AQD/////AQD//wQAAAAOAAQAEQAGAAoABgAIAAQADwAEABgABwAWAAkADwAHAAgAAwD///7/+v/9//v//f/5//7/7v/8/+b/+P/r//f/9v/5//n//v/3////9v/+//P/+//1//v/AgD+/wsAAgAKAAUABwAEAA4ABAAXAAYAGQAJABQACgAQAAcACAADAAQAAAAHAAEACgACAAAAAQDz//3/8f/5//T/+P/z//r/7v/8/+v/+//o//j/6f/3//T/+v8CAP//BAACAP//AgACAAEACQABAA8ABAARAAcAEwAHABAABgAMAAUAEQAGABkACAATAAgABgAEAPz//v/7//v/+P/7//T//f/x//z/6//6/+b/9//s//j/9v/7//f//v/v//7/7v/9//X/+/////7/BQACAA0ABgANAAUACgAFAA4ABQAYAAcAGAAJAA8ACAAHAAUACgABAAoAAAAJAAIABwABAP7////x//r/7f/3//H/+P/z//v/6v/8/+b/+v/q//f/8v/5//r//v8CAAIAAgADAPz/AQD8/wAACAACABEABgAPAAkADQAIABAABgATAAUAFQAHABUABwAPAAUAAAAAAPf//P/7//r//v/8//f//f/w//v/7v/4/+//9//y//n/+P/9//j////x//7/7f/8//r//P8HAAAADAAFAAsABwALAAYACwAEAA0ABgASAAgAFQAIAAsABwADAAMABwAAAA0AAAAJAAEAAQAAAPn/+//z//f/7//2//P/+f/1//v/7//7/+n/+f/x//n//v/8/wQAAQADAAQAAgAEAAEAAQACAAEACwAEABQACAASAAkADAAIAA4ABgAVAAYAEwAGAAsABgADAAEA+//8//X/+f/3//r/+//8//X//P/q//r/6f/3//H/+P/1//v/9f////X//v/1//3/9//9/wIA//8PAAQAEQAIAAkACAAIAAUADgAFABIABgARAAgADwAHAAoABAAEAAEABQAAAAkAAAADAAAA9f/9/+z/+P/t//b/7//3/+7/+//u//z/7v/7/+z/+v/0//v/AQD//wUAAgD+/wQA+v8CAAEAAAAKAAIAEAAHABUACgAVAAkADwAHAA4ABAAUAAQAEwAEAAYAAwD7//7/+f/6//r/+f/5//z/+P/9//P/+//p//n/6P/3//D/+f/2//3/8v////D//v/1//z////9/wYAAQAOAAYADgAIAAgABgAFAAQADgAEABYABgATAAgADAAGAAwAAgAMAAAACgAAAAgAAQACAP//8//8/+r/+P/u//f/9f/6//P//f/v//7/8P/7//X/+v/5//z/AAABAAIAAwD9/wIA+f8AAAIAAAAQAAMAFQAIABEACQAQAAgADwAEAA4ABAAOAAQADgADAAMAAQD5//3/+v/6/wAA+//+//3/9v/+//D/+//u//j/7f/5//P//P/5//7/9/8AAPP//v/7//3/CAAAAA8ABAAMAAcACQAHAAgABAAHAAQADQAFABQABwAQAAcABwAFAAMAAQAIAP//BgD///7////1//z/7v/4/+r/9v/u//j/9f/8//b//f/v//3/8P/7//r/+/8BAP//AQACAAIAAwACAAIABAABAAsAAwAXAAcAGQAKABAACQAKAAYADgACAA4AAgAJAAMAAwABAP3//v/2//v/9f/6//r/+//4//3/7P/7/+X/+P/q//f/8f/5//T//f/4////+v////v//v8AAP//DAACABIABgAMAAgABgAGAAoABAASAAQAFAAHABUACQASAAcACQADAAMAAAAFAP7/AwD///f//f/r//r/6//3/+//9//x//v/8//+//T//v/v//z/7//6//n//P8CAAAAAQADAP7/AwADAAEADQABABMABQAYAAkAFwAKAA8ABwAIAAQACgACAA8AAgAIAAIA/P8AAPj//f/4//r/9//7//b//f/z//3/6//7/+X/+P/r//j/9//7//r////4/wEA+v///wEA/v8GAAEADAAFAA4ABwAKAAcAAwAEAAkAAwAVAAQAFwAIABAABwAJAAUABQAAAAAA/v/9//7/+//+//P//P/p//n/6//3//X/+f/5//3/9f/+//H//f/0//v/9//7//7//v8GAAIABgAEAAAAAwAFAAMAEgAEABkACAAVAAoADwAJAAsABQAIAAIACAABAAwAAgAGAAEA+v/+//T/+//4//r/+P/6//L//P/s//v/7P/4/+3/9//0//r////+/wMAAQD9/wEA/f8AAAYA//8OAAMADgAHAAwACAAMAAYADAAEAA8ABQAYAAcAGAAIAAsABwD+/wIA///9//3//P/5//z/8v/8/+7/+v/r//f/7f/4//X/+v/5//7/8v/+/+7//P/1//v/AAD9/wQAAQAHAAQACAAEAAkABAAMAAQAFwAHABsACQASAAoABwAGAAYAAgAJAAAACAABAAQAAQD//wAA9//8//D/+f/y//n/9P/6/+z/+v/k//r/6P/4//H/+f/5//3//v8BAAAAAgD+/wEA/v8AAAYAAQAQAAUADwAIAAgACAAKAAYAEQAEABQABQAUAAYAEAAHAAUAAgD5//7/+P/7//z/+//4//z/7//7/+z/+f/w//j/8//6//b//f/2//7/8//+/+///P/3//3/BQAAAAsABAAHAAYABwAFAA0ABAAQAAUAFAAIABQACQAOAAgABAADAAMAAAALAP//CwAAAAEAAAD5//3/9v/6//P/+f/y//r/9P/7//D//P/r//r/7//6//3//P8FAAEAAwADAP//AwABAAEABAABAAkABAAPAAcADgAIAAkABwAKAAUAEwAEABcABQAPAAYABAAEAP3////4//v/+P/7//v//P/5//z/8P/8/+z/+v/y//r/+P/8//b//v/y//7/9P/8//f//P/+//7/CQACAA0ABgAIAAUABQAEAAwAAwAUAAUAEQAIAAsACAAHAAUABAAAAAQA//8JAP//CAAAAPz////v//v/7//5//L/+P/x//v/7f/8/+///P/w//v/9f/8//////8GAAIAAQADAPz/AQABAAAACwACABAABQAQAAgAEAAHAA4ABQANAAMAEwAEABUABAAMAAQA/P8AAPn/+//6//n/+//6//f//P/0//z/7//7/+v/+f/x//v/+P/9//X//v/w//7/8//9/////v8HAAIACwAFAAwABwALAAYACQAEAA8ABAAWAAYAFAAIAAkABgAHAAMACgD//wwA//8IAAAAAgAAAPf//f/u//r/7f/4//X/+f/1//z/7//9/+7//P/1//v/+//9//7/AAAAAAIA/v8CAPr/AAABAAAADQADABMABgAOAAgACwAGAA0ABAAQAAMADwAEAAwABAAEAAIA+f/+//X/+//9//r////9//j//v/x//3/8P/7//H/+v/z//z/9v/+//f////z//7/9////wQAAAAMAAQACQAGAAQABgAFAAMACAADAAsABAAQAAYAEAAGAAcAAwADAAAACQD+/wwA/v8EAP//+P/+//H/+v/v//j/8P/4//X/+//4//3/8//+//H//f/5//3/AgAAAAEAAwD9/wMA/v8CAAIAAQAIAAMAEQAGABUACQAQAAkACAAFAAwAAwARAAIADAADAAIAAgD7//7/9//7//f/+f/6//r//P/8//T//P/q//v/6//4//P/+f/2//z/9f////f////6////AAABAAkAAwAQAAcADAAIAAUABgAHAAQAEAAEABMABgAQAAgADAAGAAkAAgAFAP//BgD9/wcA/v/9//3/7v/7/+r/+P/v//f/8//4//P//P/z//3/8v/9//L//P/3//7/AQAAAAEAAwD8/wMA/v8CAAoAAwASAAUAFAAJABMACQAQAAcACgAEAAsAAgAPAAIACwACAP//AAD4//z/+v/5//z/+f/5//v/9f/8/+7/+//o//n/6f/5//T/+//5//7/9v8BAPb/AAD//wAABgACAAoABgAKAAcACQAHAAQABQAIAAQAEwAFABcABgAQAAYACQADAAcA//8HAPz/BAD8/////f/4//v/7v/5/+v/9//1//j/+v/7//f//v/y////9P/+//j//v/8/wAA//8CAAIABAD//wQAAgAEAA4ABAAXAAcAEwAJAAwACAAJAAQACgACAAoAAAAKAAEABgAAAP3//f/2//r/+//4//7/+f/6//z/7//8/+z/+//u//r/8//6//r//v8AAAAA/f8CAPz/AgACAAIADAAEAAwABwAHAAcABgAFAAkABAANAAQAEgAFABMABgAMAAUAAgAAAAAA/f8EAPv////8//T//P/u//r/7f/4/+//+P/1//r/+v/9//f////w//7/8v/+//3///8CAAEAAQAEAAMABQAHAAQADAAFABMABgAYAAgAEwAIAAgABQAGAAEACwD//wwA//8FAAAA///+//r/+//1//n/9f/5//f/+v/x//z/5//7/+b/+v/w//r/+P/9//v/AQD9/wMA//8DAP//AgAFAAMADQAFAA4ABwAIAAcACAAFABEABAAYAAQAFgAFABAABAAKAAEAAQD9//7/+/8AAPv//f/8//H//P/q//r/7//5//X/+f/2//3/9f////P/AADv//7/8/////7/AAAGAAMABAAFAAMABQAKAAQAEgAFABMABwASAAcADQAGAAYAAgAFAP//CgD//w0A//8DAAAA+f/9//f/+v/4//j/9v/6//T//P/v//3/6//8/+v/+//2//3/AAD//wAAAwD8/wQA/v8CAAQAAgAIAAMACgAFAAwABgAJAAUACAAEABEAAwAYAAQAEgAFAAYAAwD//////v/7//z/+//8//z/+f/9//P//P/t//v/8v/7//r//f/6/wAA8/8BAPL/AAD3/////f///wMAAgAKAAQACAAFAAUABAAKAAMAEgADABEABQAJAAQABQACAAYA//8HAP7/CAD//wcA////////8//8//H/+v/2//n/9v/8/+///v/s//7/7//9//X//f/8////BAACAAMABAD+/wMA/v8CAAkAAgAOAAQADAAFAAsABQANAAMADwADABIAAgATAAMADAACAP7////3//v/+//5//z/+v/3//z/8v/9/+///P/v//v/8f/8//f//v/3/wEA8f8BAPH/AAD8////BgABAAoABAAKAAUACwAFAAwAAwAOAAMAFAADABQABAAKAAMABgAAAAoA/v8OAP//CgD//wIA///4//3/8f/7/+3/+v/z//v/8//9/+7////q//7/8f/+//v//v///wEA//8DAP//AwD9/wIAAAABAAgAAgARAAQADgAFAAsABAAPAAIAFAACABIAAgAOAAIABQAAAP7//f/5//r//P/6/////P/4//3/7v/+/+7//P/z//z/9v/+//b/AAD1/wEA8/8BAPX/AAD//wAACwADAAsABQAGAAYABgAEAAsAAwAOAAIADwADAA4AAgAJAAEABQD+/wgA/f8NAP7/BwD///n//v/x//v/8f/6//L/+v/z//3/9P////P/AADw////9////wEAAAADAAMA/f8EAPv/AwAAAAIABwACAA0AAwASAAUAEAAFAAsABAAMAAEAEQABAA8AAQAEAAAA+v/9//n/+v/5//n/+//7//v//f/1//7/7P/9/+z//P/0//3/+f////X/AgDz/wIA+P8BAP//AQAHAAIADgAFAA4ABgAIAAUABgADAA4AAgATAAMADwADAAkAAgAIAAAABwD+/wYA/f8EAP7//f/9//D//P/q//r/7//5//b/+//0//7/8f8AAPH/AAD1////+f8AAAEAAgADAAQA//8EAP3/AwAHAAIAEQADABQABQASAAYAEQAFAA8AAwANAAEADgAAAAwAAAAAAP7/+P/8//n/+v/+//r/+//8//T//v/v//3/7P/8/+v//P/z//3/+P8AAPb/AgD0/wIA/P8BAAcAAgAMAAQACwAGAAoABgAIAAQACAACAA8AAgAUAAIAEAACAAgAAQAHAP7/CgD9/wcA/f/+//3/9v/8/+//+v/s//n/8f/6//j//f/2////7/8AAPD////4/////v8BAP//AwAAAAQA//8EAAEAAwAJAAMAFAAEABQABgANAAYACgADAAwAAQAMAAAACQD//wMA/v/+//z/+P/7//n/+v/+//v/+//9//D//f/r//z/7v/8//T//P/4/////P8CAPz/AwD8/wIAAAACAAsAAwAPAAUACQAGAAQABQAIAAMADQACAA8AAwARAAMADQACAAQAAAABAP3/BAD8/wMA/P/3//z/7v/7/+7/+v/x//r/9f/8//j////3/wEA8v8AAPP////8////BAABAAMAAwAAAAQABAADAAoAAwAQAAQAFAAFABMABgAKAAQABQACAAkA//8MAP//BQD///3//v/5//z/+P/6//f/+//3//z/8//9/+r//f/m//z/7//8//r//v/9/wEA+/8DAP3/AwABAAIABgACAAwABAAPAAUACQAFAAUABAAMAAIAFAACABUAAgAOAAMACQAAAAQA/v8AAPz////8//3//P/z//v/6//7/+7/+v/2//z/+f/+//X/AQDz/wAA9P8AAPf//////wAABgADAAUABAACAAQABgADABEAAwAVAAQAEgAFAA4ABAAKAAIABwAAAAgA/v8LAP//BAD+//n//f/2//v/+f/7//n//P/z//3/7v/9/+v//f/s//z/8//9//7/AAAAAAIA+/8DAPv/AgADAAEACQACAAoABAAKAAUACAAEAAgAAwAMAAIAFAACABIAAwAIAAIAAAAAAAAA/v////z//P/9//b//P/z//z/7//8//L//P/6//7//P8AAPT/AQDx/wAA9v////7///8DAAEABgADAAcABAAGAAMACQACABIAAwAUAAMADQAEAAQAAgAEAAAABwD//wcA/v8FAP//AQD+//j//v/1//z/+P/8//n//f/x//7/7P/+/+7//f/3//7//P8AAAEAAgACAAMA/v8DAP7/AQAHAAEADgACAA0AAwAHAAQACQACAA0AAQAQAAEAEAACAAwAAQACAAAA+v/+//r//P/+//z/+P/9//H//f/v//3/8v/9//X//v/4/wAA+P8BAPT/AQDw////+f///wUAAAAKAAIACAAEAAkAAwAMAAIAEAACABIAAgATAAMADAADAAQAAQAFAP//CwD+/wgA/v8AAP//+P/+//X//f/y//z/8//9//P//v/v//7/6v/+/+///v/7////AQABAAAAAwD+/wMAAAABAAIAAAAIAAEADwADAA4ABAAJAAMACgACABEAAQAUAAEADQACAAYAAAD/////+v/8//v//P/8//z/+P/9//D//f/t//3/8//9//j////1/wAA9P8BAPT/AAD3/wAAAAAAAAoAAgAMAAQABwAEAAQAAwAKAAIAEAACAA8AAwAMAAMACQACAAUAAAAGAP7/CgD+/wgA/v/8//7/8//9//P/+//1//z/9P/9//L//v/y////8//+//j///8CAAAABgACAAAAAwD8/wIAAAABAAgAAQAMAAMADQAEAA0ABQAKAAQACgACABAAAQARAAEABwAAAPz////5//z/+v/7//r/+//4//z/9v/9//D//f/v//3/9v/+//v////4/wAA9P8BAPf/AAABAAAABwACAAsABAAMAAUABwAEAAUAAwALAAIAEQACAA4AAwAHAAIABAAAAAYA//8GAP3/BAD+/////v/2//3/7v/8//D/+//2//z/9f/+//D////x////9/8AAP3/AAABAAIAAwADAAAAAwD9/wIABAABAA8AAgATAAQADwAEAAwABAANAAIADgABAA0AAAAKAAAAAgD///j//f/2//v/+//7//z//P/1//7/8P/+/+///v/x//7/9P////f/AAD3/wEA9P8BAPr/AQAFAAIADQADAAsABQAIAAQACAADAAoAAQAOAAEAEgACABAAAgAIAAEABAD//wgA/f8IAP3/AQD+//f//f/y//z/8P/8//H//P/1//7/9v////D/AADw/wAA+P8AAAAAAgAAAAMA//8DAP//AgACAAEACQACABIAAwAUAAQADwAEAAgAAwALAAAADQD//woA//8DAP///v/+//r//P/6//v//P/8//3//f/z//7/7P/+/+7//v/1//7/9/////j/AQD4/wEA+/8BAP//AgAJAAMADgAEAAoABQADAAQABgACAA0AAQAQAAIADgACAAsAAgAGAAAAAwD+/wUA/f8FAP3//P/9//H//P/v//v/8//7//b//P/3//7/9/8AAPX/AQD2/wEA/f8BAAQAAgADAAMA/v8DAAAAAgAJAAIADwADABIABQAQAAUACwAEAAUAAQAHAP//CwD//wgA///9//7/+f/9//v/+//8//v/+v/8//f//f/w//7/7P/9/+///f/4//7//P8AAPn/AQD6/wIAAQABAAcAAwALAAMADAAEAAkABAAFAAIACAABABEAAgATAAIADAADAAYAAQAEAP//AgD+/wAA/f/9//3/9v/9/+3//P/t//z/9P/8//n//v/2/wAA8/8BAPX/AAD6/wAA/v8BAAMAAgAEAAIAAAACAAQAAgANAAIAFAAEABEABAALAAQACAACAAkAAAAJAP7/CgD//wcA///9//7/9//9//r//P/7//3/9v/+/+7//v/s//7/7v////P////6/wAA/v8CAPz/AgD7/wIAAgABAAsAAgAKAAMABwADAAYAAgAJAAEADAABABIAAQATAAIACwABAAEA//8BAP3/AgD8//7//f/3//3/8v/9//D//f/y//3/9/////v/AAD3/wEA8v8BAPX/AQD+/wEAAQACAAIAAgACAAMABgACAAkAAgAQAAIAFAADAA8AAwAGAAEABAD//wkA/v8KAP7/BQD//wAA/v/7//7/9//9//j//P/7//3/9v///+7////t////9f////v/AAD9/wIA//8DAP//AwAAAAIABgACAA0AAwAMAAMABgADAAUAAgALAAEAEAABAA8AAQALAAEABAD///z//f/7//z//v/8//v//f/z//3/7v/9//L//f/2//7/+P////j/AQD1/wEA8/8BAPf/AQABAAEABgACAAQAAwADAAMACQACAA4AAwAQAAMADwADAAoAAgAEAAAAAwD+/wgA/f8JAP7/AQD///n//f/2//3/9v/8//b//f/1//7/8////+7////w////+v8AAAEAAgAAAAMA/f8DAAAAAgAEAAIACQACAAwAAwANAAIACQACAAkAAQAQAAAAFAABAA8AAQAFAAAA///+//3//P/8//v//P/8//r//f/y//7/7v/+//P//v/5/wAA+P8BAPT/AgD0/wEA+P8BAP7/AQAFAAIACgACAAgAAwAGAAIACgACABEAAgAQAAIACgACAAYAAAAGAP//BgD+/wkA/v8HAP////////T//v/z//z/9//9//f//v/x////8P8AAPH/AAD1/wAA/P8BAAMAAgABAAMA/f8CAP//AgAIAAEADAACAAoAAgAJAAIACgABAAsAAQAOAAEAEAABAAoAAAD+////+v/9//3/+//+//z/+v/9//b//v/z//7/8v////X////7/wAA+v8BAPX/AgD2/wEA/v8BAAYAAgAIAAMABwADAAcAAwAGAAIACgACAA8AAgAOAAIABwABAAMA//8GAP7/CQD+/wUA/v8AAP7/+f/9//L//f/y//z/9//9//f//v/y////8P8AAPb/AAD9/wEAAQACAAEAAgABAAMA/v8CAAIAAQAKAAIAEAACAAwAAwAJAAIACwABAA4AAQAOAAEACgAAAAMA///8//3/+P/8//z//P/+//3/+f/+//H//v/x//7/9P/+//f////4/wAA+P8BAPb/AQD4/wEAAQABAAoAAgAKAAMABgADAAcAAgALAAIADQACAA4AAgAMAAEABgAAAAIA//8FAP7/CAD//wIA///4//7/8v/9//L//P/z//z/9f/+//f////z/wAA8v8AAPj/AAAAAAEAAQACAP7/AgD9/wEAAQABAAYAAQAMAAIADwADAAwAAwAIAAIACQABAA4AAAANAAAAAwAAAP7//v/7//z/+//8//z//f/9//7/9/////D////w//7/9//+//r////4/wEA+P8BAPv/AQAAAAEABgACAAsAAgAKAAMABQADAAYAAgANAAEAEAACAAwAAQAIAAEABgAAAAUA//8FAP7/BQD//////v/0//3/8P/8//T//P/4//3/9/////b/AAD1/wEA9/8AAPv/AAACAAEAAwACAP7/AgD+/wIABgABAA0AAgAPAAMADQADAAsAAgAJAAEACQAAAAwAAAAKAP//AAD///r//f/7//z//v/9//z//v/3////8////+///v/w//7/9//+//v/AAD5/wEA9/8CAP7/AQAGAAIACQACAAkAAwAHAAMABQACAAYAAgAMAAEAEAABAAsAAgAEAAAABAD//wUA/v8DAP7////+//f//f/x//z/7v/8//T//P/5//7/9/8AAPP/AQD0/wAA+v8AAP7/AAAAAAEAAQACAAAAAgABAAIACQACABEAAwAQAAMACgADAAgAAgAKAAEACgAAAAkAAAAEAP7//v/+//j//f/6//z//f/9//r////y////7f////D//v/0////+P8AAPz/AQD7/wIA+/8CAAAAAQAJAAEADAACAAgAAgAGAAIACQABAAwAAQAQAAEAEAABAAwAAQAFAAAAAwD+/wUA/v8DAP7/+v/+//L//f/x//3/8//9//b//v/5/wEA9/8BAPP/AgD0/wAA/f8AAAIAAQACAAIAAQACAAQAAgAIAAIADQACABEAAgAQAAIACQACAAYAAAAKAP//DAD//wYA//////7/+//9//r//f/5//3/+//+//j////w////7f////T////7/wAA/f8BAPz/AgD9/wIA//8CAAMAAgAJAAIACwACAAcAAgAFAAIACgABABAAAQAPAAEACgABAAYAAAACAP/////+/wEA/f/+//3/9v/9/+///f/x//3/+P/+//n/AAD3/wEA9v8BAPX/AQD4/wAA//8AAAUAAQADAAIAAQACAAUAAgANAAIADwACAA0AAgAKAAEABgAAAAQA//8HAP7/CAD+/wMA/v/5//7/9//9//r//f/5//7/9v/+//L////u////7v////b////+/wEA//8DAPz/AwD9/wMABAACAAgAAgAKAAIACgACAAkAAgAIAAEADAABABIAAQAPAAAABgAAAAAA/v8AAP3////9//z//f/4//3/8//9/+7//f/x//7/+f////r/AQD1/wIA8/8CAPf/AQD9/wEAAgACAAYAAwAGAAMABAADAAgAAwAQAAIAEQACAAwAAQAHAAAABwD//wgA/v8IAP7/BgD+/wAA/v/4//3/9f/8//j//f/5//7/8////+7////w////9f8AAPv/AQAAAAIAAAADAP3/AwD+/wIABgABAAwAAgALAAIACAACAAkAAQALAAEADgAAAA4AAAALAP//AgD+//z//f/+//z/AAD8//v//f/2//3/8//+//T//v/3////+v8AAPr/AQD2/wIA9P8BAPv/AQAEAAEABwADAAUAAwAGAAMABwACAAoAAgANAAEADgABAAcAAAADAP//BAD+/wkA/v8GAP7/AAD+//r//f/3//3/9f/9//f//v/4//7/9P8AAPD/AAD0/wAA/f8BAAIAAgABAAMAAAADAAAAAwACAAIACAACAAwAAgALAAMABgADAAcAAgANAAEADQAAAAgAAAADAP7//f/9//r//P/7//z//f/8//n//f/y//7/8f/+//b////6/wAA+v8BAPn/AgD4/wIA+v8BAAAAAgAJAAIACgAEAAYABAAFAAMACgACAA0AAgAMAAEACgABAAYAAAADAP//BAD+/wYA/f8DAP7/+v/9//T//P/1//v/9v/8//b//f/1//7/8/////P/AAD4/wEAAAACAAQAAwABAAQA/v8DAAIAAgAIAAIACwACAAwAAwAMAAMACAADAAgAAQAMAAAADAD//wUA///9//3/+//8//3//P/8//z/+v/9//f//v/y//7/8f/+//f////7/wEA+v8CAPb/AgD5/wIA//8CAAUAAgAJAAMACQAEAAYAAwAFAAIACgABAA8AAQANAAAABwAAAAUA//8FAP7/BQD+/wQA/f////3/9//9//H//P/z//3/+P/+//f////0/wAA9P8BAPj/AQD9/wIAAQADAAMAAwD//wMA/f8CAAMAAQALAAIADQACAAsAAwAJAAIACQABAAkAAAAKAP//CQD+/wIA/v/6//3/+v/8//7//P/+//3/+f/+//X////0//7/9f////n/AAD8/wEA+v8CAPf/AgD7/wEABAACAAkAAwAHAAMABQADAAUAAgAGAAEACgAAAA0AAAALAAAABAAAAAIA//8FAP7/BQD+/////v/5//3/9f/9//P//P/2//3/+v/+//r/AAD1/wEA9f8BAPz/AQABAAIAAgADAAEAAwD//wIAAQABAAUAAgAMAAIADgADAAkAAwAGAAEACAAAAAoA//8HAP//AgD+//7//f/6//3/+v/9//z//f/8//7/9f/+//D////y////9/8AAPn/AQD6/wEA+/8CAPz/AgAAAAIACAACAAwAAwAJAAMABQACAAcAAQALAAAADQAAAAwAAQAKAAAABAAAAAIA//8DAP7/AwD+//z//f/0//7/8v/9//X//v/2////+P8AAPf/AQD2/wEA9/8BAP3/AQADAAIAAwACAP//AgACAAEABwABAAwAAQAPAAIADgACAAoAAQAGAAAACAD+/wsA/v8HAP7////+//z//f/8//7/+//+//r////3////8v8AAO//AADz/wAA+v8BAPz/AgD6/wIA+/8CAP//AQAEAAIACAACAAoAAgAGAAEABAABAAYA//8NAP//DgAAAAoAAAAFAP//BAD//wIA/v8BAP7////9//n//v/z//7/8//+//j////7/wEA+P8BAPb/AQD3/wEA+v8BAP7/AQADAAEAAgACAAAAAQACAAEACgABAA4AAQANAAIACQABAAcAAAAGAP//BwD+/wgA/v8FAP7//f/+//n//v/7//7//P////j////0/wAA8v8AAPP/AAD3/wAA/P8BAP//AgD8/wIA/f8BAAIAAQAIAAEACAABAAcAAQAFAAEABgAAAAgAAAANAAAADQABAAcAAQAAAAAAAAD+/wEA/v/+//7/+f/+//X//v/z//7/9P////n/AAD7/wEA+P8CAPX/AQD4/wEA//8AAAIAAQADAAEAAwABAAQAAQAGAAEADQABABAAAQAMAAEABQABAAUA//8GAP7/BgD+/wMA/v//////+v////b////4//7/+f////X////w/wAA8P8AAPb/AQD6/wEA/f8CAP7/AgD+/wIA//8BAAQAAQAKAAEACgABAAYAAQAGAAAACgD//w0A//8NAAAACgAAAAQA///+//7//f/+/wAA/f/8//7/9v////P////1/wAA9/8BAPn/AQD6/wIA+P8CAPb/AQD7/wEAAwABAAYAAgAEAAIABAABAAcAAQALAAAADQABAA0AAAAJAAAABAD//wMA/v8HAP3/BwD+/wEA///7////+f////j////5////+P////b/AADy/wEA9P8BAPv/AgAAAAIAAAADAP7/AgAAAAEAAwAAAAcAAAAKAAAACgAAAAYAAAAGAAAACgD//w0AAAAKAAAAAwAAAAAA///9//7//f/+//3//v/7////9v8AAPP/AAD3/wAA+/8BAPr/AQD4/wEA+P8BAPv/AQD//wAABQABAAcAAQAFAAEAAwABAAcAAAAMAAAACwABAAgAAAAFAAAAAwD//wQA/v8FAP7/BAD///7////3////9v/+//n////4////9v8AAPX/AAD2/wEA+P8BAP7/AgADAAIAAQACAP7/AQABAAAABgAAAAkAAAAJAAEACAABAAcAAAAIAAAACgAAAAwAAAAGAAAA/v////v//v/9//7//f/+//r////3////9P8AAPP/AAD2/wAA+/8BAPr/AQD4/wEA+f8BAAAAAAAFAAEABgABAAcAAQAGAAEABgABAAkAAAANAAAADAAAAAYAAAADAP//BQD+/wYA//8EAP//AAD///r////1////9P////j////4////9P8AAPP/AQD4/wEA/P8CAAAAAQABAAIAAAABAP//AAACAAAACQAAAAwAAAAJAAEABwAAAAgAAAALAAAACwAAAAkA//8EAP///v////r//v/9//7//v////n/AAD1/wAA9P8BAPb/AQD5/wEA+v8BAPv/AQD4/wEA+v8AAAEAAAAHAAEABwABAAQAAQAFAAAABwAAAAkA//8LAP//CQAAAAQA//8BAP//BAD//wYA//8CAP//+/////f////2////9v////n////5/wAA9/8BAPb/AQD6/wEAAQABAAEAAQAAAAEAAAAAAAIAAAAGAAAACwAAAAwAAQAJAAEABQABAAcAAAALAAAACQAAAAMA/////////P/+//v//v/8/////f8AAPj/AADz/wEA9P8AAPn/AAD7/wAA+/8AAPr/AAD8/wAA//8AAAUAAQAJAAEACAABAAQAAAAFAAAACgAAAAwAAAAKAAEABgAAAAQAAAACAAAAAgD//wMA///+////9v////P////2//7/+P////f/AAD3/wAA9/8BAPj/AQD8/wEAAgABAAMAAQAAAAAAAAAAAAYAAAALAAEADAACAAsAAgAJAAEABgABAAcAAAAJAAAABwAAAAAA///7////+//+//z//v/7////+P////X/AADy/wAA8/8AAPj////7/wAA+v8BAPr/AAD+/wEABAABAAcAAQAIAAEABwABAAUAAAAGAAAACwAAAA0AAQAJAAEABAAAAAMAAAAEAP//AwD//wAA///7////9f/+//P//v/3//7/+v////n/AAD2/wEA+P8BAPz/AQD//wAAAgAAAAMAAAACAAEAAwAAAAgAAQANAAEADAACAAgAAQAGAAEABwAAAAcA//8HAP//BAD////////6////+/////3////7/wAA9v8AAPX/AAD2/wAA+f8AAPz/AAD//wEA/v8BAP7/AQABAAEACAABAAkAAQAGAAEABQAAAAYAAAAIAAAACwABAAoAAQAGAAEAAQAAAAAA//8CAP////////r////1////9P////X////4/wAA+/8AAPr/AQD3/wEA+f8BAP//AAACAAAAAgAAAAIAAAAEAAAABgAAAAkAAQAMAAEACwABAAUAAQAEAAAABgD//wYA//8CAP///v////r////4////+P////r////4/wAA8/8AAPL/AAD2/////P8AAP7/AAD+/wEA//8BAAEAAQAFAAEACQABAAoAAAAHAAEABQAAAAgAAAAMAAAACwABAAgAAQAEAAAAAAD///7///////7//f////f////y////9P////f////5/wAA+f8BAPn/AQD5/wEA+/8AAAEAAAAFAAAABAABAAMAAQAGAAEACgABAAwAAgALAAEACQABAAUAAAAEAAAABgD//wYA//8BAAAA+v////n////5////+v////j/AAD2/wAA9P8AAPT/AAD5/wAA//8AAAAAAQD+/wEAAAABAAQAAQAHAAAACAAAAAkAAAAHAAAABgAAAAkAAAALAAAACgABAAMAAAAAAP////////7//v/9////+/////f////0/wAA9v8AAPv/AAD8/wEA+f8BAPn/AQD8/wAAAAAAAAQAAAAGAAAABQABAAQAAQAGAAEACwABAAwAAAAIAAAABAD//wQA//8EAP//BAD//wMA///+////+f////f////6////+/////f/AAD2/wAA9v8AAPn/AAD9/wEAAQABAAIAAgAAAAEAAQABAAYAAAAJAAAACAAAAAcAAAAGAAAABwAAAAgAAAAJAAAABgAAAP/////8/////f/+//7//v/6////9v////X/AAD1/wAA+P8BAPz/AQD9/wEA+v8BAPr/AAD+/wAABAAAAAYAAAAFAAEABgABAAYAAQAIAAEACwAAAAsAAAAGAAAAAgAAAAIA//8EAP//AgAAAP7/AAD7/wAA9/////b////4////+f8AAPb/AAD0/wAA9/8AAP3/AQAAAAEAAQABAAEAAQABAAAAAwAAAAcA//8KAP//CQAAAAUAAAAGAAAACQAAAAkAAAAHAAAAAwD////////8/////f////3////6/wAA9f8AAPX/AAD4/wAA+v8BAPv/AQD7/wEA+/8AAPv/AAAAAAAABgAAAAcAAAAFAAEABQAAAAcAAAAJAAAACQAAAAgA//8FAAAAAgAAAAMAAAAFAAAAAgAAAPz/AAD4////+P////n////5/wAA+f8AAPj/AQD3/wEA+v8BAAAAAQADAAEAAQABAAAAAAACAAAABQAAAAgAAAAJAAAACAAAAAUAAQAGAAAACQAAAAkAAAADAAAA/v////3////8/////P8AAPz/AAD5/wAA9v8BAPb/AAD6/wAA/f8BAPz/AQD7/wAA/f8AAP//AAADAAAABgAAAAcAAAAFAAAABAAAAAgAAAAKAAAACAAAAAQA//8DAAAAAgAAAAIAAAACAAAA//8AAPn/AAD1////9/////n////5/wAA9/8AAPj/AQD6/wAA/f8BAAEAAAADAAAAAQAAAAAAAAAEAP//CAAAAAoAAAAIAAAABwABAAcAAQAGAAAABwAAAAYA//8AAP//+/////v////8////+/8AAPj/AAD2/wAA9v8AAPf/AAD6/wAA/f8AAPz/AAD7/wAA/v8AAAQAAAAGAAEABwABAAYAAQAGAAEABgAAAAkAAAALAAAACAAAAAMAAAACAAAAAwAAAAIAAAD/////+/////j////2////9/////r/AAD5/wAA9/8BAPj/AQD8/wEAAAABAAIAAQACAAAAAgAAAAMAAAAGAAAACwAAAAsAAQAIAAEABQABAAcAAQAHAAAABgAAAAMA////////+/////v////9/////P8AAPj/AAD1/wAA9/////r/AAD8/wAA/f8AAP3/AAD9/wEAAAAAAAYAAQAJAAEABwABAAUAAQAGAAAACAAAAAgAAAAIAAAABgAAAAIAAAAAAAAAAgAAAAEAAAD8////+P////b////3////+P8AAPr/AAD6/wEA+v8BAPr/AQD//wAABAAAAAMAAQACAAAAAwAAAAUAAAAIAAAACgABAAkAAQAGAAEABAAAAAUAAAAGAP//AwD///7//v/7////+/////r////7/wAA+v8AAPb/AAD1/wAA+P8AAP3/AAD+/wEA/v8BAP//AQABAAEABAABAAcAAQAJAAEABgAAAAQAAAAFAAAACAAAAAgAAAAGAAAAAwAAAAEAAAAAAP////////7////5////9f/+//X////5/wAA+v8AAPr/AQD6/wEA+/8BAP3/AQAAAAAABAAAAAMAAQACAAEAAwAAAAgAAQAKAAEACQABAAcAAAAFAAAAAwAAAAQA//8EAP//AQD///v////5////+v////v////5/wAA9/////b////2/wAA+f8AAP7/AAD//wEA/v8BAP//AQADAAEABgABAAcAAQAHAAEABgABAAUAAAAGAAAACQAAAAgAAAAEAAAAAAAAAAAA//8AAP///v////v//v/5////9v////f////7/wAA/f8BAPv/AQD6/wAA/f8AAAEAAAADAAAABAAAAAQAAQADAAEABAABAAgAAQAKAAEABwABAAMAAAADAAAAAwD//wIA//8BAP////////v////5////+/////z/AAD6/wAA9/////j////6/wAA/f8BAAAAAQABAAEAAAABAAEAAQAEAAEACAABAAcAAQAFAAAABAAAAAYAAAAHAAAABwAAAAUAAAABAAAA/f8AAP3////+/////P////j////3////+P8AAPr/AAD8/wEA/f8BAPz/AQD7/wAA/v8AAAMAAAAFAAAABAABAAQAAQAFAAEABwABAAgAAAAJAAEABgAAAAIAAAABAP//AwD//wIA///+////+/////r////5/wAA+v////r////5/wAA9v8AAPj/AAD9/wAAAAABAAAAAQAAAAEAAQAAAAMAAAAFAAAACAAAAAcAAAAFAAAABAAAAAYAAAAIAAAABgAAAAMAAAAAAP///v////3////9////+/////f////2////+f8AAPv/AAD7/wEA+/8AAPv/AAD8/wAA//8AAAMAAQAFAAEABAABAAMAAQAGAAEACAABAAkAAQAGAAAABQAAAAIAAAACAAAAAwD//wIA///+/wAA+v////r////7////+v////n////5////+f8AAPr/AAD//wEAAQABAAEAAQD//wAAAgAAAAUAAAAHAAAABgAAAAYAAAAFAAEABQABAAcAAQAIAAEABQAAAAAAAAD+/////v////3////8////+v////j/AAD4/wAA+v8AAP3/AAD9/wAA+/8AAPz/AAD//wAAAgAAAAQAAAAFAAEABAABAAQAAAAGAAAACQAAAAgAAAAEAAAAAgAAAAIAAAACAAAAAQAAAAAAAAD8/wAA+f////n////8////+/////n////5/wAA/P8AAP7/AAABAAEAAgAAAAIAAAABAAAAAwAAAAcAAAAIAAAABgAAAAUAAQAFAAEABgABAAYAAQAFAAAAAgAAAP3/AAD8/////f////3////6/wAA+P8AAPj/AAD5/wAA+/8AAP3/AAD9/wAA/P8AAP3///8CAAAABQAAAAUAAQAFAAEABQAAAAYAAAAHAAAACAAAAAcAAAADAAAAAQAAAAIAAAACAAAAAAAAAPz/AAD6////+P////j////5////+v8AAPj/AAD4/wAA/P8AAAAAAAABAAAAAQAAAAEAAAACAAAABAAAAAcAAAAIAAEABwABAAUAAQAGAAEACAABAAcAAAADAAAAAAAAAP3////8/////P////3/AAD6/wAA9/8AAPj/AAD7/wAA/P8AAPz/AAD8/////v8AAAAAAAAEAAAABwAAAAYAAAAEAAAABQAAAAcAAAAIAAAABgAAAAUAAAADAAAAAQAAAAEAAAACAAAA//8AAPr////4////+f////r/AAD6/wAA+v8AAPr/AAD7/wAA/v8AAAIAAAADAAAAAQAAAAEAAAAEAAAABwAAAAcAAQAHAAEABgABAAQAAQAFAAAABgAAAAQAAAD//wAA/P////z////8/wAA/P8AAPv/AAD6/wAA+P8AAPn/AAD9/wAA/v8AAP3/AAD+/wAAAAAAAAMAAQAFAAEABgABAAYAAAAEAAAABQAAAAcAAAAHAAEABQABAAIAAQABAAAAAAAAAP//AAD+/wAA/P////j////3////+f////v/AAD7/wAA+v8AAPz/AAD+/wAAAAAAAAMAAAADAAAAAgAAAAIAAAAGAAAACQABAAgAAQAGAAEABQAAAAQAAAAEAAAAAwAAAAEAAAD9////+v////v////8////+/8AAPj////4////+P////r/AAD9/wAA//8AAP7/AAD+/wAAAQAAAAUAAQAGAAEABQAAAAUAAAAFAAAABgAAAAcAAAAHAAEABAAAAAAAAAAAAAAAAQD////////8////+f////j////4////+v8AAPz/AAD8/wEA+/8AAPz/AAAAAAEAAQAAAAEAAAACAAAAAgAAAAQAAAAGAAEACAABAAcAAQAEAAAAAwAAAAQAAAAEAAAAAQD////////8////+/////v////9/wAA/P8AAPn/AAD4/wAA+/8AAP3/AAD+/wAA//8AAAAAAAAAAAEAAwABAAYAAQAGAAEABAAAAAMAAAAFAAAABgABAAUAAQAEAAAAAgAAAP//AAD///////////7////7////+P////n////7/wAA/P8AAP3/AAD9/wAA/f8AAP7/AAACAAAABAAAAAMAAAACAAAABAAAAAYAAQAHAAEABwABAAUAAAADAAAAAQAAAAIAAAACAAAA//8AAPz////7////+/8AAPv/AAD7/wAA+/////n/AAD5/wAA/P8AAAAAAAAAAAAAAAAAAAEAAAADAAEABQABAAYAAAAGAAAABAAAAAMAAAAFAAEABgABAAUAAQACAAAAAAAAAP/////+/////f////z////5////+P////n/AAD8/wAA/f8AAPz/AAD8/wAA/v8AAP//AAACAAAABAAAAAMAAAADAAEABAABAAcAAQAHAAEABQABAAMAAAACAAAAAgAAAAIAAAABAAAA/v////v////6/////P////z////6////+f////n/AAD7/wAA/v8AAAAAAAABAAAAAAAAAAEAAAAEAAEABgABAAUAAAAEAAAABAAAAAQAAQAFAAEABgABAAQAAQABAAAA/////////////////f////v////6////+f8AAPv/AAD9/wAA/v8AAPz/AAD8/wAA//8AAAEAAAACAAAAAwAAAAMAAAADAAEABQABAAYAAQAGAAEAAwAAAAEAAAACAAAAAgAAAAEAAAD//wAA/f////v////7/////P////z////7////+f////v/AAD+/wAAAAAAAAEAAAABAAAAAQAAAAIAAAAEAAAABgAAAAUAAQADAAAABAABAAUAAQAFAAEABAABAAIAAAD//wAA/f////7////+/////P////n////6////+/8AAP3/AAD9/wAA/v8AAP3/AAD+/wAAAQAAAAQAAAAEAAEAAwABAAQAAQAFAAEABgABAAYAAQAFAAEAAwAAAAEAAAABAAAAAgAAAAAAAAD9/wAA+/////v////7////+/////v////6////+v////z/AAAAAAAAAQAAAAEAAAABAAAAAgAAAAMAAAAFAAEABgABAAUAAQAEAAEABAABAAYAAQAFAAEAAgABAAAAAAD+/////f////3////9////+/////n////6/////P////3////9/////f////7//////wAAAgAAAAQAAAAFAAAAAwABAAQAAQAGAAEABwABAAUAAQAEAAAAAgAAAAIAAAABAAEAAQAAAAAAAAD8////+v////v////8////+/////r////7/////P8AAP7/AAABAAAAAgAAAAEAAAABAAAAAgAAAAUAAAAFAAEABQABAAUAAQAEAAEABAABAAUAAQAEAAEAAQAAAP7/AAD+/////v8AAP3/AAD8/wAA+/////r////7/////f////7/AAD+/wAA/f8AAP//AAACAAAAAwAAAAQAAAAEAAAABAABAAQAAQAFAAEABgABAAQAAAABAAAAAQAAAAEAAAABAAAA//8AAP3////7////+v////v////8/////P8AAPv/AAD8/wAA/v8AAAAAAAACAAAAAgAAAAIAAAACAAAABAAAAAYAAQAGAAEABAABAAMAAQAEAAEABAABAAMAAAABAAAA/v////z////8/////f8AAPz/AAD6/wAA+v////v////8/wAA/f8AAP7/AAD//wAA//8AAAEAAAAEAAAABQABAAQAAQAEAAAABAABAAUAAQAFAAEABQAAAAMAAAABAAAAAAAAAAEAAAAAAAAA/f8AAPv////6////+v////v////8/wAA/P8AAPz/AAD9/wAA//8AAAIAAAACAAAAAQAAAAIAAAADAAAABAABAAYAAQAGAAEABAABAAMAAQAEAAEABAAAAAEAAAD//////f////z////8/wAA/f8AAPz/AAD6////+v////v////9/wAA/v8AAP7/AAD//wAAAAAAAAIAAAAEAAAABQABAAMAAAACAAAAAwAAAAUAAQAEAAEAAwAAAAIAAAABAAAAAAAAAAAAAAD//wAA/P////r////6/////P////3/AAD9/wAA/f8AAP3/AAD+/wAAAAAAAAIAAAACAAAAAQAAAAIAAAAEAAEABQABAAUAAQAEAAAAAwAAAAIAAAACAAAAAgAAAAAAAAD9/////P////3/AAD9/wAA/P8AAPz/AAD7////+/8AAP3/AAD//wAAAAAAAP//AAAAAAAAAgABAAQAAQAFAAEABAAAAAQAAAACAAAAAwAAAAQAAAAEAAAAAgAAAAAAAAAAAAAA//8AAP7////9////+/////r////7/////f8AAP7/AAD9/wAA/f8AAP//AAAAAAAAAgAAAAMAAAADAAAAAwABAAMAAQAFAAEABgABAAUAAQADAAAAAgAAAAIAAAABAAAAAAD////////8/////P////3////9/wAA/P////r////7/////P8AAP7/AAD//wAAAAAAAAAAAQABAAEAAwABAAUAAQAEAAEABAAAAAMAAAAEAAEABAABAAQAAQAEAAAAAQAAAP//AAD//wAA//////3////7////+v////v////8/wAA/f8AAP7/AAD+/wAA/f8AAP//AAABAAAAAgAAAAIAAQACAAAAAwABAAQAAQAFAAEABQABAAQAAQACAAAAAQAAAAIAAAABAAAA//8AAP7////9/////P////3////9/////P////v////8/////v8AAP//AAAAAAAAAAAAAAEAAAACAAEAAwABAAQAAQAEAAEAAgABAAIAAQAEAAEABAABAAMAAQACAAAAAAAAAP//AAD+/////v////3////7////+/////z////+/wAA/v8AAP7/AAD+/wAA/v8AAAAAAAACAAAAAwABAAIAAQACAAEAAwABAAQAAQAEAAEAAwABAAIAAAABAAAAAAAAAAEAAAAAAAAA/v////3////8/////f////z////8/////P////z////9/wAAAAAAAAEAAAABAAAAAQAAAAIAAAADAAEABAABAAQAAQAEAAEAAwABAAMAAQAEAAEABAABAAIAAAAAAAAA//////7////9/////f////z////7////+/////3/AAD+/wAA/v8AAP3/AAD+/wAAAAAAAAIAAAADAAAABAABAAMAAQADAAEABAABAAUAAQAEAAEAAwAAAAIAAAABAAAAAQAAAAEAAAAAAAAA/v////z////8/////f////z////7////+/////3////+/wAAAAAAAAEAAAABAAAAAQAAAAIAAAADAAAABAABAAMAAQADAAEAAwABAAQAAQAEAAEAAwAAAAEAAAD//wAA/v////7////+/////f////z////8/////P8AAP3/AAD+/wAA/v8AAP7/AAD+/wAAAQAAAAIAAQACAAEAAwABAAMAAQADAAEABAABAAQAAQADAAAAAQAAAAAAAAABAAAAAQAAAAAAAAD+/////f////z////8/////f////3////8/////f//////AAAAAAAAAQAAAAEAAAABAAAAAQAAAAIAAAAEAAAABAABAAMAAQACAAEAAwABAAMAAQACAAAAAQAAAP//AAD+/wAA/f8AAP7/AAD+/wAA/P////z////8/////v8AAP7/AAD//wAA//8AAP//AAAAAAAAAgAAAAQAAQADAAEAAgAAAAMAAAAEAAEABAABAAMAAAACAAAAAQAAAAAAAAAAAAAAAAAAAP//AAD9/////P////z////8/wAA/f8AAP3////9/////f8AAP//AAABAAAAAgAAAAEAAAABAAAAAgAAAAMAAAAEAAEABAABAAMAAQACAAEAAwABAAMAAAACAAAAAAAAAP7/AAD+/wAA/f8AAP3/AAD9/////P////v////8/wAA/v8AAP//AAD+/wAA//8AAAAAAAACAAAAAwABAAQAAAADAAAAAgAAAAMAAAAEAAAABAABAAMAAAABAAAAAQAAAAAAAAAAAAAA//8AAP7////8/////P////z/AAD9/wAA/f8AAP3/AAD+/wAA//8AAAAAAAACAAAAAQAAAAEAAAABAAAAAwAAAAQAAQAEAAEAAwABAAMAAAACAAAAAgAAAAIAAAABAAAA/v8AAP3/AAD+/wAA/v8AAP3/AAD9/wAA/P8AAPz/AAD9/wAA//8AAP//AAD//wAA//8AAAEAAAADAAAAAwABAAMAAAACAAAAAgAAAAIAAAADAAAAAwAAAAIAAAAAAAAAAAAAAAAAAAD//wAA/v8AAP3////8/////P8AAP3/AAD+/wAA/v8AAP7/AAD//wAAAAAAAAEAAAABAAAAAQAAAAEAAAACAAAAAwAAAAQAAQADAAEAAgAAAAIAAAACAAAAAQAAAAAAAAD//wAA/v8AAP3/AAD+/wAA/v8AAP3/AAD8/wAA/P////3/AAD+/wAA//8AAAAAAAAAAAAAAQAAAAIAAAAEAAEABAAAAAMAAAACAAAAAwAAAAMAAAADAAAAAgAAAAEAAAAAAAAA//8AAP//AAD+/wAA/f////z////8/////f8AAP7/AAD+/wAA/v8AAP7/AAD//wAAAQAAAAEAAAABAAAAAQAAAAIAAAADAAEABAABAAQAAQADAAAAAgAAAAEAAAACAAAAAQAAAAAAAAD+/wAA/v8AAP7/AAD+/wAA/v8AAP3////8/////f8AAP7/AAD//wAA//8AAAAAAAABAAAAAgAAAAIAAQADAAAAAwAAAAIAAAACAAAAAwAAAAMAAAACAAAAAQAAAAAAAAAAAAAA//8AAP/////+/////f////z////9/wAA/v8AAP7/AAD+/wAA//8AAP//AAAAAAAAAQAAAAIAAAABAAAAAQAAAAIAAAADAAEAAwABAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAP//AAD+/wAA/v////7/AAD+/wAA/f8AAP3////9/wAA/v8AAP//AAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAQACAAAAAgAAAAIAAAACAAAAAgAAAAMAAAACAAAAAAAAAP//AAD//wAA//8AAP7////9/////f////3/AAD+/wAA//8AAP//AAD+/wAA//8AAAAAAAABAAAAAQAAAAIAAAACAAAAAgAAAAMAAQADAAEAAwAAAAIAAAABAAAAAQAAAAEAAAAAAAAA//8AAP//AAD+/////f8AAP7/AAD+/wAA/f8AAP3/AAD+/wAA//8AAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAAMAAAACAAAAAgAAAAIAAAADAAAAAwAAAAIAAAABAAAAAAAAAP//AAD//wAA//8AAP7/AAD9/wAA/f8AAP7/AAD+/wAA//8AAP//AAD//wAA//8AAAAAAAABAAAAAgAAAAEAAAACAAAAAgAAAAMAAQADAAAAAgAAAAEAAAAAAAAAAQAAAAEAAAAAAAAA//8AAP7////+/wAA/v8AAP7/AAD+/wAA/f8AAP3/AAD//wAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAgABAAIAAAACAAAAAQAAAAIAAAACAAAAAgAAAAEAAAAAAAAA//////7/AAD+/wAA//8AAP7/AAD9/wAA/v8AAP7/AAD//wAA//8AAP//AAD//wAAAAAAAAEAAAACAAAAAgAAAAIAAAACAAAAAgAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAD//wAA/v8AAP3////+/////v8AAP7/AAD+/wAA/v8AAP7/AAD//wAAAQAAAAEAAAABAAAAAQAAAAEAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAAAAAD/////////////AAD+/wAA/v8AAP7/AAD9/wAA/f8AAP7/AAD//wAA//8AAP//AAAAAAAAAQAAAAIAAAACAAAAAgAAAAIAAAACAAAAAwAAAAMAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAD//wAA/v////3/AAD9/wAA/v8AAP7/AAD+/wAA/v8AAP//AAAAAAAAAQAAAAEAAAABAAAAAQAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAP//AAD//wAA//8AAP//AAD//wAA/v8AAP7/AAD+/wAA/v8AAP//AAD//wAA//8AAAAAAAAAAAAAAgAAAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD+/wAA/v////7/AAD+/wAA//8AAP//AAD//wAA//8AAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAAAAAAA//8AAP//AAD+/wAA/v8AAP//AAD+/wAA/v8AAP7/AAD+/wAA//8AAP//AAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAACAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAA//8AAP7/AAD9/wAA/v8AAP7/AAD+/wAA//8AAP//AAD//wAA//8AAAAAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAgAAAAEAAAABAAAAAQAAAAEAAAAAAAAA//8AAP//AAD//wAA//8AAP7/AAD+/wAA/v8AAP7/AAD//wAA//8AAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAABAAAAAQAAAAIAAAACAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAD//wAA//8AAP7/AAD+/wAA/v8AAP//AAD//wAA//8AAP//AAD//wAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD//wAA//8AAP7/AAD+/wAA/v8AAP//AAD//wAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAP//AAD//wAA/v8AAP7/AAD+/wAA//8AAP//AAD//wAA//8AAP//AAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD//wAA//8AAP7/AAD+/wAA//8AAP//AAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAA//8AAP//AAD//wAA/v8AAP7/AAD//wAA//8AAP//AAD//wAA//8AAP//AAAAAAAAAQAAAAEAAAABAAAAAQAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAAAAAAAP//AAD//wAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAAAAAAAP//AAD//wAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAP//AAAAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAAAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD//wAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMSVNUQAAAAElORk9JQ09QNAAAAChjKSAmIChwKSAyMDA4IE1pY3Jvc29mdCBDb3JwLiBBbGwgUmlnaHRzIFJlc2VydmVkAAA=");
		snd.play();
	}
	function selectAllKonsul(){
		//setTimeout("selectAllKonsul()",60000);
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAllKonsul/'+idUser,
			type : "post",	
			data : {tanggal:now1},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var kLength=prod.length;
				konsulTab(prod);
				if(kLength!=konlength){
					konlength=kLength;
					beep();
				}
			},error:function(o)
			{
				e('konsul1').innerHTML="";
				e('konsul1').innerHTML="Tidak Ada Pasien";
			}
		});
	}
	function konsulTab(prod){
		var content=e("konsul1");
		content.innerHTML="";
		var pilih="";
		cHeight=(bodyHeight-265)/2;
		
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","KON_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="TANGGAL";
		
		th = c("th", tr);
		th.innerHTML="PASIEN";
		
		th = c("th", tr);
		th.innerHTML="MRN";
		
		th = c("th", tr);
		th.innerHTML="RUANG/POLI";
		
		th = c("th", tr);
		th.innerHTML="DOKTER";
		
		th = c("th", tr);
		th.innerHTML="TGL.LAHIR";

		th = c("th", tr);
		th.innerHTML="JENIS KELAMIN";
		
		th = c("th", tr);
		th.innerHTML="PENJAMIN";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,h.PASIEN_ID,h.EPISODE_ID);
				var med=h.MRN;	
				var nama=h.PASIEN;
				
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.TANGGAL;
				td.setAttribute('title',h.TANGGAL);
				td = c("td", tr);
				div=c('div',td);
				div.innerHTML=nama;
				td.setAttribute('title',nama);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=med;
				td.setAttribute('title',med);
				var ruang=h.RUANG_ID;
				var poli=h.POLI;
				td = c("td", tr);
				if(ruang!=null){
					div=c('div',td,'tKiri');
					div.innerHTML=ruang;
					td.setAttribute('title',ruang);	
				}else{
					div=c('div',td,'tKiri');
					div.innerHTML=poli;
					td.setAttribute('title',poli);	
				}
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.DOKTER;
				td.setAttribute('title',h.DOKTER);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.TGL_LAHIR;
				td.setAttribute('title',h.TGL_LAHIR);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.KELAMIN;
				td.setAttribute('title',h.KELAMIN);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.PENJAMIN;
				td.setAttribute('title',h.PENJAMIN);
			}
			
			//pilih='#'+prod[0].TRANS_ID;
		}
		jQuery.tableNavigation();
		$('#KON_table').fixheadertable({ 
			colratio	 : [70,150,55,100,150,70,90,100],
			width:810,
			height:cHeight
		});
	}
	function selectAllVisit(){
		//setTimeout("selectAllVisit()",60000);
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAllVisit/'+idUser,
			type : "post",	
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				visitTab(prod);
			},error:function(o)
			{
				e('visit1').innerHTML="";
				e('visit1').innerHTML="Tidak Ada Pasien";
			}
		});
	}
	function visitTab(prod){
		var content=e("visit1");
		content.innerHTML="";
		var pilih="";
		cHeight=(bodyHeight-265)/2;
		
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","visit_table");
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PASIEN";
		
		th = c("th", tr);
		th.innerHTML="MRN";
		
		th = c("th", tr);
		th.innerHTML="RUANG";
		
		th = c("th", tr);
		th.innerHTML="TGL.LAHIR";

		th = c("th", tr);
		th.innerHTML="JENIS KELAMIN";
		
		th = c("th", tr);
		th.innerHTML="PENJAMIN";
		
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,h.PASIEN_ID,h.EPISODE_ID);
				var med=h.MRN;	
				var nama=h.PASIEN;
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=nama;
				td.setAttribute('title',nama);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=med;
				td.setAttribute('title',med);
				var ruang=h.RUANG_ID;
				var poli=h.POLI;
				td = c("td", tr);
				if(ruang!=null){
					div=c('div',td,'tKiri');
					div.innerHTML=ruang;
					td.setAttribute('title',ruang);	
				}else{
					div=c('div',td,'tKiri');
					div.innerHTML=poli;
					td.setAttribute('title',poli);	
				}
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.TGL_LAHIR;
				td.setAttribute('title',h.TGL_LAHIR);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.KELAMIN;
				td.setAttribute('title',h.KELAMIN);
				td = c("td", tr);
				div=c('div',td,'tKiri');
				div.innerHTML=h.PENJAMIN;
				td.setAttribute('title',h.PENJAMIN);
			}
			
			//pilih='#'+prod[0].TRANS_ID;
		}
		jQuery.tableNavigation();
		$('#visit_table').fixheadertable({ 
			colratio	 : [150,55,55,70,90,100],
			width:545,
			height:cHeight
		});
	}
	
	function PPKModal(){
		$('#addPPKModal').modal('show');
		ppk9=[];
		ppk10=[];
		ppkRe=[];
		ppkLa=[];
		ppkRa=[];
		ppkTi=[];
		e('ppkresep-vr').innerHTML="";
		e('ppklab-vr').innerHTML="";
		e('ppkrad-vr').innerHTML="";
		e('ppktin-vr').innerHTML="";
		e('icd10-vr').innerHTML="";
		e('icd9-vr').innerHTML="";
		idPPK="";
		pilihanPPK();
		selectPPK();
		var content=e("ppkresep-vr").className;
		if(content=='tab-pane active')
			ppkResep(ppkRe);
		var content1=e("ppklab-vr").className;
		if(content1=='tab-pane active')
			ppkLab(ppkLa);;
		var content2=e("ppkrad-vr").className;
		if(content2=='tab-pane active')
			ppkRad(ppkRa);
		var content3=e("ppktin-vr").className;
		if(content3=='tab-pane active')
			ppkTindak(ppkTi);
		var content4=e("icd10-vr").className;
		if(content4=='tab-pane active')
			ppkicd10(ppk10);
		var content5=e("icd9-vr").className;
		if(content5=='tab-pane active')
			ppkicd9(ppk9);	
		
		$("#ICD9-li").click(function(){
			ppkicd9(ppk9);
		});
		$("#ICD10-li").click(function(){
			ppkicd10(ppk10);
		});
		$("#PPKResep-li").click(function(){
			ppkResep(ppkRe);
		});
		$("#PPKLab-li").click(function(){
			ppkLab(ppkLa);
		});
		$("#PPKRad-li").click(function(){
			ppkRad(ppkRa);
		});
		$("#PPKTin-li").click(function(){
			ppkTindak(ppkTi);
		});
		
	}
	function selectPPK(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPPK/'+idUser,
			type : "post",
			data :{poli:idPoli},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				idPPK="";
				tabelPPK(prod);
			},error:function(o){
				formulaPPK=[];
				var content=e("masterPPK");
				content.innerHTML="";
				content.innerHTML="Tidak Ada PPK!";
			}
		});
	}
	var idPPK="";
	function tabelPPK(prod){
		var content=e("masterPPK");
		content.innerHTML="";
		var pilih="";
		var dHeight=bodyHeight*0.75;
		content.style.height=(dHeight-40)+"px";
		var content1=e("buatPPK");
		content1.style.height=(dHeight-40)+"px";
		var content1=e("pilihPPK");
		content1.style.height=(dHeight-40)+"px";
		var label=c("label",content);
		label.innerHTML="Cari PPK";
		label.style.cssText="margin-top:5px;margin-left:10px;margin-right:5px;";
		var input=c("input",content,null,"kdPPK");
		input.setAttribute("type","text");
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","PPK_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="KODE"; 
		
		th = c("th", tr);
		th.innerHTML="NAMA PPK";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h.PPK_ID);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					ppk9=[];ppk10=[];ppkRe=[];ppkLa=[];ppkRa=[];ppkTi=[];
					idPPK=this.id;
					selectPICD9(idPPK);
					selectPICD10(idPPK);
					selectPResep(idPPK);
					selectPLab(idPPK);
					selectPRad(idPPK);
					selectPTindak(idPPK);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						ppk9=[];ppk10=[];ppkRe=[];ppkLa=[];ppkRa=[];ppkTi=[];
						idPPK=this.id;
						selectPICD9(idPPK);
						selectPICD10(idPPK);
						selectPResep(idPPK);
						selectPLab(idPPK);
						selectPRad(idPPK);
						selectPTindak(idPPK);
					}
				}
				var td = c("td", tr,null,h.KODE_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick() >"+h.KODE_ID+"</a>";	
				td.setAttribute('title',h.KODE_ID);
				var td = c("td",tr);
				td.innerHTML=h.NAMA_PPK
			}
			pilih='#'+prod[0].PPK_ID;
		}
		jQuery.tableNavigation();
		$('#PPK_table').fixheadertable({
			colratio:[60,200],
			width:285,
			height:dHeight-94,
			zebra:true
		});
		
		var $rows = $('#PPK_table tr');
		$('#kdPPK').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('#addPPKModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		
	}
	function pilihanPPK(){
		var content=e('pilihRe');
		content.innerHTML="";
		if(ppkRe.length!=0){
			var div=c("div",content," title1");
			div.innerHTML="Resep";
			div.style.cssText='display:none';
			var tabel=c('table',content,'table table-striped');
			for(var r=0;r<ppkRe.length;r++){
				if(ppkRe[r][16]){
					var old=true;
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.innerHTML=ppkRe[r][2];
					if(ppkRe[r][12]=='01')
						td.style.cssText='border-bottom:1px solid black; color:#fff;background:#666';
					else if(ppkRe[r][12]=='00')
						td.style.cssText='border-bottom:1px solid black; background:#b0d9d7';
					else
						td.style.cssText='border-bottom:1px solid black; '; 
				}
			}
			if(old)
				div.style.cssText='display:block';
		}
		var content1=e('pilihLa');
		content1.innerHTML="";
		if(ppkLa.length!=0){
			var div=c("div",content1," title1");
			div.innerHTML="Lab";
			div.style.cssText='display:none';
			var tabel=c('table',content1,'table table-striped');
			for(var l=0;l<ppkLa.length;l++){
				if(ppkLa[l][5]){
					var tr=c('tr',tabel);
					var old1=true;
					var td=c('td',tr);
					td.innerHTML=ppkLa[l][3];
					if(ppkLa[l][4]=='Y')
						td.style.cssText='border-bottom:1px solid black; color:red;';
					else
						td.style.cssText='border-bottom:1px solid black; color:black;';
				}
			}
			if(old1)
				div.style.cssText='display:block';
		}
		var content2=e('pilihRa');
		content2.innerHTML="";
		if(ppkRa.length!=0){
			var div=c("div",content2," title1");
			div.innerHTML="Rad";
			div.style.cssText='display:none';
			var tabel=c('table',content2,'table table-striped');
			for(var ra=0;ra<ppkRa.length;ra++){
				if(ppkRa[ra][5]){
					var old2=true;
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.innerHTML=ppkRa[ra][3];
					td.style.cssText='border-bottom:1px solid black; '; 
				}
			}
			if(old2)
				div.style.cssText='display:block';
		}
		var content3=e('pilihI10');
		content3.innerHTML="";
		if(ppk10.length!=0){
			var div=c("div",content3," title1");
			div.innerHTML="ICD 10";
			div.style.cssText='display:none';
			var tabel=c('table',content3,'table table-striped');
			for(var ii=0;ii<ppk10.length;ii++){
				if(ppk10[ii][5]){
					var old3=true;
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.innerHTML=ppk10[ii][3];
					if(ppk10[ii][4]=='1')
						td.style.cssText='border-bottom:1px solid black; color:red;';
					else
						td.style.cssText='border-bottom:1px solid black; color:black;';
				}
			}
			if(old3)
				div.style.cssText='display:block';
		}
		var content4=e('pilihI9');
		content4.innerHTML="";
		if(ppk9.length!=0){
			var div=c("div",content4," title1");
			div.innerHTML="ICD 9";
			div.style.cssText='display:none';
			var tabel=c('table',content4,'table table-striped');
			for(var i9=0;i9<ppk9.length;i9++){
				if(ppk9[i9][5]){
					var tr=c('tr',tabel);
					var old4=true;
					var td=c('td',tr);
					td.innerHTML=ppk9[i9][3];
					if(ppk9[i9][4]=='1')
						td.style.cssText='border-bottom:1px solid black; color:red;';
					else
						td.style.cssText='border-bottom:1px solid black; color:black;';
				}
			}
			if(old4)
				div.style.cssText='display:block';
		}
		var content5=e('pilihTi');
		content5.innerHTML="";
		if(ppkTi.length!=0){
			var div=c("div",content2," title1");
			div.innerHTML="Tindak";
			div.style.cssText='display:none';
			var tabel=c('table',content5,'table table-striped');
			for(var ti=0;ti<ppkTi.length;ti++){
				if(ppkTi[ti][4]){
					var old5=true;
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.innerHTML=ppkTi[ti][2];
					td.style.cssText='border-bottom:1px solid black; '; 
				}
			}
			if(old5)
				div.style.cssText='display:block';
		}
	}
	var ppk9=[],ppk10=[],ppkRe=[],ppkLa=[],ppkRa=[],ppkTi=[];
	function selectPICD9(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPICD9',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPICD9(prod);
			},error:function(o){
				tabelPICD9(pasienInfo);
			}
		});
	}
	function selectPICD10(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPICD10',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPICD10(prod);
			},error:function(o){
				tabelPICD10(pasienInfo);
			}
		});
	}
	function selectPResep(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPResep',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPResep(prod);
			},error:function(o){
				tabelPResep(pasienInfo);
			}
		});
	}
	function selectPLab(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPLab',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPLab(prod);
			},error:function(o){
				tabelPLab(pasienInfo);
			}
		});
	}
	function selectPRad(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPRad',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelPRad(prod);
			},error:function(o){
				tabelPRad(pasienInfo);
			}
		});
	}
	function tabelPResep(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FORMULA_RESEP;
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				if(h.SEDIAAN_ID!=null){	
					resep[3]=h.SEDIAAN_ID;
					resep[4]=h.SEDIAAN;
				}else{
					resep[3]="";
					resep[4]="";
				}
				if(h.SATUAN_ID!=null){	
					resep[5]=h.SATUAN_ID;
					resep[6]=h.SATUAN;
				}else{
					resep[5]="";
					resep[6]="";
				}
				var sum="";
				if(h.JUMLAH!=null){
					if(h.JUMLAH.substring(0,1)=='.')
						sum=0+h.JUMLAH;
					else
					sum=h.JUMLAH;
				}
				resep[7]=sum;
				resep[8]=h.SIGNA_ID;
				resep[9]=h.SIGNA_NAMA;
				resep[10]=h.SIGNA_DOKTER;
				resep[11]=h.URUT;
				resep[12]=h.TYPE;
				resep[13]=h.HEADER;
				resep[14]=h.NAMA_RACIKAN;
				resep[15]=h.FREE_DOSIS;
				resep[16]=false;
				resep[17]='RESEP';
				resep[18]=h.ROUTE_ID;
				resep[19]=h.ROUTE;
				ppkRe.push(resep);
			}
		}
		ppkResep(ppkRe);
	}
	function tabelPLab(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var picd=[];
				picd[0]=h.FORMULA_LAB;
				picd[1]=h.TEST_ID;
				picd[2]=h.NOMOR;
				picd[3]=h.CAPTION;
				picd[4]=h.CITO;
				picd[5]=false;
				picd[6]=h.ADA_CITO;
				picd[7]='LAB';
				ppkLa.push(picd);
			}
		}
		ppkLab(ppkLa);
	}
	function tabelPRad(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var picd=[];
				picd[0]=h.FORMULA_RAD;
				picd[1]=h.TEST_ID;
				picd[2]=h.NOMOR;
				picd[3]=h.CAPTION;
				picd[4]=h.KANAN;
				picd[5]=false;
				picd[6]=h.KIRI;
				picd[7]='RAD';
				ppkRa.push(picd);
			}
		}
		ppkRad(ppkRa);
	}
	function tabelPICD10(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var picd=[];
				picd[0]=h.FORMULA_ICD10;
				picd[1]=h.KODE;
				picd[2]=h.KODE_ICD;
				picd[3]=h.DIAGNOSA;
				picd[4]=h.STATUS;
				picd[5]=false;
				picd[6]='ICD10';
				ppk10.push(picd);
			}
		}
		ppkicd10(ppk10);
	}
	function tabelPICD9(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var picd=[];
				picd[0]=h.FORMULA_ICD9;
				picd[1]=h.KODE;
				picd[2]=h.KODE_ICD;
				picd[3]=h.TINDAKAN;
				picd[4]=h.STATUS;
				picd[5]=false;
				picd[6]='ICD9';
				ppk9.push(picd);
			}
		}
		ppkicd9(ppk9);
	}
	function ppkResep(prod){
		var content=e("ppkresep-vr");
		content.innerHTML="";
		cHeight=e('buatPPK').offsetHeight;
		cWidth=content.offsetWidth;
		if(prod.length!=0){
			var div=c('div',content);
			
			var radio=c("input",div,null,"PILResep");
			radio.style.cssText='margin:5px; margin-bottom:0px;';
			var label=c("label",div);
			label.innerHTML="Check All";
			label.style.cssText='top:-3px;position:relative;';
			radio.setAttribute("type","checkbox");
			$("#PILResep").on("click", function(){
				if($(this).is(":checked")){
					$(this).prop("checked", true);
					for(var a=0;a<prod.length;a++){
						$("#PILRE_"+a).prop("checked", true);
						ppkRe[a][16]=true;
					}
				}else if($(this).is(":not(:checked)")){
					$(this).prop("checked", false);
					for(var a=0;a<prod.length;a++){
						$("#PILRE_"+a).prop("checked", false);
						ppkRe[a][16]=false;
					}
				}
				pilihanPPK();
			});
		}
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","ppkRe_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PILIH";
		
		th = c("th", tr);
		th.innerHTML="RACIKAN";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		th = c("th", tr);
		th.innerHTML="DOSIS";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		th.innerHTML="SIGNA";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trObat1');
				if(h[12]=='00'||h[12]=='04'){
					tr.style.background='#b0d9d7';
					var td = c("td", tr);
					var radio=c("input",td,null,"PILRE_"+i);
					radio.setAttribute("type","checkbox");
					if(h[16]){
						$("#PILRE_"+i).prop("checked", true);
					}else{
						$("#PILRE_"+i).prop("checked", false);
					}
					$("#PILRE_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#PILRE_"+no).prop("checked", true);
							ppkRe[no][16]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$('#PILResep').prop("checked", false);
							$(this).prop("checked", false);
							ppkRe[no][16]=false;
						}
						pilihanPPK();
					});
					
					var td = c("td", tr);
					td.innerHTML='';
				
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
						
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					
				}else if(h[12]=='01'){
					tr.style.cssText='background:#000;color:#fff;';
					var td = c("td", tr);
					var radio=c("input",td,null,"PILRE_"+i);
					radio.setAttribute("type","checkbox");
					if(h[16]){
						$("#PILRE_"+i).prop("checked", true);
					}else{
						$("#PILRE_"+i).prop("checked", false);
					}
					$("#PILRE_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#PILRE_"+no).prop("checked", true);
							ppkRe[no][16]=true;
							for(var a=0;a<ppkRe.length;a++){
								if(ppkRe[a][13]==ppkRe[no][1])
									ppkRe[a][16]=true;
							}
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$(this).prop("checked", false);
							$('#PILResep').prop("checked", false);
							ppkRe[no][16]=false;
							for(var a=0;a<ppkRe.length;a++){
								if(ppkRe[a][13]==ppkRe[no][1])
									ppkRe[a][16]=false;
							}
						}
						pilihanPPK();
					});
					
					var td = c("td", tr);
					td.innerHTML='*';
					
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					
				}else if(h[12]=='02'){
					var td = c("td", tr);
					td.innerHTML='';
					td = c("td", tr);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					td.setAttribute('colspan',5);
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
		
				}else if(h[12]=='03'){
					var td = c("td", tr);
					td.innerHTML='';
					td = c("td", tr);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,'tKanan');
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
				}
			}
		}
		$('#ppkRe_table').fixheadertable({ 
			colratio	 : [60,60,200,100,100,80],
			width:625,
			height:cHeight-104
		});
	}
	
	function ppkLab(prod){
		var content=e("ppklab-vr");
		content.innerHTML="";
		cHeight=e('buatPPK').offsetHeight;
		cWidth=content.offsetWidth;
		if(prod.length!=0){
			var div=c('div',content);
			var radio=c("input",div,null,"PILLA");
			radio.style.cssText='margin:5px; margin-bottom:0px;';
			var label=c("label",div);
			label.innerHTML="Check All";
			label.style.cssText='top:-3px;position:relative;';
			radio.setAttribute("type","checkbox");
			$("#PILLA").on("click", function(){
				if($(this).is(":checked")){
					$(this).prop("checked", true);
					for(var a=0;a<prod.length;a++){
						$("#PILLA_"+a).prop("checked", true);
						ppkLa[a][5]=true;
					}
				}else if($(this).is(":not(:checked)")){
					$(this).prop("checked", false);
					for(var a=0;a<prod.length;a++){
						$("#PILLA_"+a).prop("checked", false);
						ppkLa[a][5]=false;
						$("#utamaLa_"+a).prop("checked", false);
						ppkLa[a][4]='N';
					}
				}
				pilihanPPK();
			});
		}
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","ppklab_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PILIH";
		
		th = c("th", tr);
		th.innerHTML="PEMERIKSAAN";
		
		th = c("th", tr);
		th.innerHTML="CITO";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h[1]);
				var td = c("td", tr);
				var radio=c("input",td,null,"PILLA_"+i);
				radio.setAttribute("type","checkbox");
				if(h[5]){
						$("#PILLA_"+i).prop("checked", true);
					}else{
						$("#PILLA_"+i).prop("checked", false);
					}
					$("#PILLA_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#PILLA_"+no).prop("checked", true);
							ppkLa[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$(this).prop("checked", false);
							$("#PILLA").prop("checked", false);
							ppkLa[no][5]=false;
							$("#utamaLa_"+no).prop("checked", false);
							ppkLa[no][4]='N';
						}
						pilihanPPK();
					});
					
				td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[3];
				div.setAttribute('title',h[3]);
		
				td = c("td", tr);
				if(h[6]=='Y' || h[6]=='C'){
					radio=c("input",td,null,"utamaLa_"+i);
					radio.setAttribute("type","checkbox");
					if(h[4]=='Y'){
						$("#utamaLa_"+i).prop("checked", true);
					}else{
						$("#utamaLa_"+i).prop("checked", false);
					}
					$("#utamaLa_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#utamaLa_"+no).prop("checked", true);
							ppkLa[no][4]='Y';
							$("#utamaLa_"+no).prop("checked", true);
							ppkLa[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#utamaLa_"+no).prop("checked", false);
							ppkLa[no][4]='N';
						}
						pilihanPPK();
					});
				}
			}
		}
		$('#ppklab_table').fixheadertable({
			colratio	 : [60,300,60],
			width:445,
			height:cHeight-104
		});
	}
	
	function ppkRad(prod){
		var content=e("ppkrad-vr");
		content.innerHTML="";
		cHeight=e('buatPPK').offsetHeight;
		cWidth=content.offsetWidth;
		if(prod.length!=0){
			var div=c('div',content);
			var radio=c("input",div,null,"PILRA");
			radio.style.cssText='margin:5px; margin-bottom:0px;';
			var label=c("label",div);
			label.innerHTML="Check All";
			label.style.cssText='top:-3px;position:relative;';
			radio.setAttribute("type","checkbox");
			$("#PILRA").on("click", function(){
				if($(this).is(":checked")){
					$(this).prop("checked", true);
					for(var a=0;a<prod.length;a++){
						$("#PILRA_"+a).prop("checked", true);
						ppkRa[a][5]=true;
					}
				}else if($(this).is(":not(:checked)")){
					$(this).prop("checked", false);
					for(var a=0;a<prod.length;a++){
						$("#PILRA_"+a).prop("checked", false);
						ppkRa[a][5]=false;
					}
				}
				pilihanPPK();
			});
		}
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","ppkrad_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PILIH";
		
		th = c("th", tr);
		th.innerHTML="PEMERIKSAAN";
					
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h[1]);
				var td = c("td", tr);
				var radio=c("input",td,null,"PILRA_"+i);
				radio.setAttribute("type","checkbox");
				if(h[5]){
						$("#PILRA_"+i).prop("checked", true);
					}else{
						$("#PILRA_"+i).prop("checked", false);
					}
					$("#PILRA_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#PILRA_"+no).prop("checked", true);
							ppkRa[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#PILRA_"+no).prop("checked", false);
							$("#PILRA").prop("checked", false);
							ppkRa[no][5]=false;
						}
						pilihanPPK();
					});
					
				td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[3];
				div.setAttribute('title',h[3]);
			}
		}
		$('#ppkrad_table').fixheadertable({
			colratio	 : [60,400],
			width:485,
			height:cHeight-104
		});
	}
	function ppkicd10(prod){
		var content=e("icd10-vr");
		content.innerHTML="";
		cHeight=e('buatPPK').offsetHeight;
		cWidth=content.offsetWidth;
		if(prod.length!=0){
			var div=c('div',content);
			var radio=c("input",div,null,"PIL10");
			radio.style.cssText='margin:5px; margin-bottom:0px;';
			var label=c("label",div);
			label.innerHTML="Check All";
			label.style.cssText='top:-3px;position:relative;';
			radio.setAttribute("type","checkbox");
			$("#PIL10").on("click", function(){
				if($(this).is(":checked")){
					$(this).prop("checked", true);
					for(var a=0;a<prod.length;a++){
						$("#PIL10_"+a).prop("checked", true);
						ppk10[a][5]=true;
					}
				}else if($(this).is(":not(:checked)")){
					$(this).prop("checked", false);
					for(var a=0;a<prod.length;a++){
						$("#PIL10_"+a).prop("checked", false);
						ppk10[a][5]=false;
					}
				}
				pilihanPPK();
			});
		}
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","icd10_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PILIH";
		
		th = c("th", tr);
		th.innerHTML="KODE";
		
		th = c("th", tr);
		th.innerHTML="DIAGNOSA";
		
		th = c("th", tr);
		th.innerHTML="UTAMA";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h[1]);
				var td = c("td", tr);
				var radio=c("input",td,null,"PIL10_"+i);
				radio.setAttribute("type","checkbox");
				if(h[5]){
						$("#PIL10_"+i).prop("checked", true);
					}else{
						$("#PIL10_"+i).prop("checked", false);
					}
					$("#PIL10_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#PIL10_"+no).prop("checked", true);
							ppk10[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#PIL10").prop("checked", false);
							$("#PIL10_"+no).prop("checked", false);
							ppk10[no][5]=false;
						}
						pilihanPPK();
					});
					
				td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
		
				td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[3];
				div.setAttribute('title',h[3]);
				
				td = c("td", tr);
				radio=c("input",td,null,"utama10_"+i);
				radio.setAttribute("type","radio");
				radio.setAttribute("name","radio10");
				if(h[4]=='1'){
						$("#utama10_"+i).prop("checked", true);
					}else{
						$("#utama10_"+i).prop("checked", false);
					}
					$("#utama10_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#utama10_"+no).prop("checked", true);
							for(var a=0;a<ppk10.length;a++)
								ppk10[a][4]='2';
							ppk10[no][4]='1';
							$("#PIL10_"+no).prop("checked", true);
							ppk10[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#utama10_"+no).prop("checked", false);
							ppk10[no][4]='2';
						}
						pilihanPPK();
					});
			}
		}
		$('#icd10_table').fixheadertable({
			colratio	 : [60,100,300,80],
			width:565,
			height:cHeight-104
		});
	}
	function ppkicd9(prod){
		var content=e("icd9-vr");
		content.innerHTML="";
		cHeight=e('buatPPK').offsetHeight;
		cWidth=content.offsetWidth;
		if(prod.length!=0){
			var div=c('div',content);
			var radio=c("input",div,null,"PIL9");
			radio.style.cssText='margin:5px; margin-bottom:0px;';
			var label=c("label",div);
			label.innerHTML="Check All";
			label.style.cssText='top:-3px;position:relative;';
			radio.setAttribute("type","checkbox");
			$("#PIL9").on("click", function(){
				if($(this).is(":checked")){
					$(this).prop("checked", true);
					for(var a=0;a<prod.length;a++){
						$("#PIL9_"+a).prop("checked", true);
						ppk9[a][5]=true;
					}
				}else if($(this).is(":not(:checked)")){
					$(this).prop("checked", false);
					for(var a=0;a<prod.length;a++){
						$("#PIL9_"+a).prop("checked", false);
						ppk9[a][5]=false;
					}
				}
				pilihanPPK();
			});
		}
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","icd9_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PILIH";
		
		th = c("th", tr);
		th.innerHTML="KODE";
		
		th = c("th", tr);
		th.innerHTML="TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="UTAMA";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h[1]);
				var td = c("td", tr);
				var radio=c("input",td,null,"PIL9_"+i);
				radio.setAttribute("type","checkbox");
				if(h[5]){
						$("#PIL9_"+i).prop("checked", true);
					}else{
						$("#PIL9_"+i).prop("checked", false);
					}
					$("#PIL9_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#PIL9_"+no).prop("checked", true);
							ppk9[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#PIL9").prop("checked", false);
							$("#PIL9_"+no).prop("checked", false);
							ppk9[no][5]=false;
						}
						pilihanPPK();
					});
					
				td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
		
				td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[3];
				div.setAttribute('title',h[3]);
				
				td = c("td", tr);
				radio=c("input",td,null,"utama9_"+i);
				radio.setAttribute("type","radio");
				radio.setAttribute("name","radio9");
				if(h[4]=='1'){
						$("#utama9_"+i).prop("checked", true);
					}else{
						$("#utama9_"+i).prop("checked", false);
					}
					$("#utama9_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#utama9_"+no).prop("checked", true);
							for(var a=0;a<ppk9.length;a++)
								ppk9[a][4]='2';
							ppk9[no][4]='1';
							$("#PIL9_"+no).prop("checked", true);
							ppk9[no][5]=true;
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#utama9_"+no).prop("checked", false);
							ppk9[no][4]='2';
							
						}
						pilihanPPK();
					});
			}
		}
		$('#icd9_table').fixheadertable({
			colratio	 : [60,100,300,80],
			width:565,
			height:cHeight-104
		});
	}
	var disabledPPK=true;
	function disabledFormPPK(){
		$('#formObat3 input').attr('disabled',true);
		$('#formObat3 select').attr('disabled',true);
		$('#formObat3 button').attr('disabled',true);
		$('#formAlkes2 input').attr('disabled',true);
		$('#formAlkes2 button').attr('disabled',true);
		$('#PPKSave1').attr('disabled',true);
		$('#form4 input').attr('disabled',true);
		$('#form5 input').attr('disabled',true);
		e('formObat3').reset();
		e('formAlkes2').reset();
		e('form4').reset();
		e('form5').reset();
		e('diagTable1').innerHTML="";
		e('tindakTable1').innerHTML="";
		disabledPPK=true;
	}
	function enableFormPPK(){
		$('#formObat3 input').removeAttr('disabled');
		$('#formObat3 select').removeAttr('disabled');
		$('#formObat3 button').removeAttr('disabled');
		$('#formAlkes2 input').removeAttr('disabled');
		$('#formAlkes2 button').removeAttr('disabled');
		$('#PPKSave1').removeAttr('disabled');
		$('#form4 input').removeAttr('disabled');
		$('#form5 input').removeAttr('disabled');
		$('#nObat2').focus();
		disabledPPK=false;
	}
	var tindak1=[],diag1=[],ppkRe1=[],ppkLa1=[],ppkRa1=[],ppkTi1=[];
	function formulaPPKModal(){
		$('#PPKModal').modal('show');
		tindak1=[];diag1=[];ppkRe1=[];ppkLa1=[];ppkRa1=[];ppkTi1=[];
		e('tabResep1').innerHTML="";
		e('tabTindak1').innerHTML="";
		e('ppklab-vr1').innerHTML="";
		e('ppkrad-vr1').innerHTML="";
		e('icd10-vr1').innerHTML="";
		e('icd9-vr1').innerHTML="";
		pilihanPPK1();
		selectPPK1();
		obat3();
		alkes3();
		formStrukturPPK('1');
		formStrukturPPK('2');
		ppki();

		var content=e("ppkresep-vr1").className;
		if(content=='tab-pane active')
			tabelPResep1(ppkRe1);
		var content1=e("ppklab-vr1").className;
		if(content1=='tab-pane active')
			labBodyPPK1();
		var content2=e("ppkrad-vr1").className;
		if(content2=='tab-pane active')
			radBodyPPK1();
		var content3=e("ppktin-vr1").className;
		if(content3=='tab-pane active')
			ppkTindak1(ppkTi1);
		var content4=e("icd10-vr1").className;
		if(content4=='tab-pane active')
			table_diag1();
		var content5=e("icd9-vr1").className;
		if(content5=='tab-pane active')
			table_tindak1();

		$("#ICD9-li1").click(function(){
			table_tindak1();
		});
		$("#ICD10-li1").click(function(){
			table_diag1();
		});
		$("#PPKResep-li1").click(function(){
			tabelPResep1(ppkRe1);
		});
		$("#PPKLab-li1").click(function(){
			labBodyPPK1();
		});
		$("#PPKRad-li1").click(function(){
			radBodyPPK1();
		});
		$("#PPKTin-li1").click(function(){
			ppkTindak1(ppkTi1);
		});
		
		disabledFormPPK();
	}
	function pilihanPPK1(){
		var content=e('pilihRe1');
		content.innerHTML="";
		if(ppkRe1.length!=0){
			var div=c("div",content," title1");
			div.innerHTML="Resep";
			div.style.cssText='display:none';
			var tabel=c('table',content,'table table-striped');
			for(var r=0;r<ppkRe1.length;r++){
				var old=true;
				var tr=c('tr',tabel);
				var td=c('td',tr);
				td.innerHTML=ppkRe1[r][2];
				if(ppkRe1[r][12]=='01')
					td.style.cssText='border-bottom:1px solid black; color:#fff;background:#666';
				else if(ppkRe1[r][12]=='00')
					td.style.cssText='width:100%; border-bottom:1px solid black; background:#b0d9d7';
				else
					td.style.cssText='width:100%; border-bottom:1px solid black; '; 
			}
			if(old)
				div.style.cssText='display:block';
		}
		var content1=e('pilihLa1');
		content1.innerHTML="";
		if(ppkLa1.length!=0){
			var div=c("div",content1," title1");
			div.innerHTML="Lab";
			div.style.cssText='display:none';
			var tabel=c('table',content1,'table table-striped');
			for(var l=0;l<ppkLa1.length;l++){
				if(ppkLa1[l][8]){
					var tr=c('tr',tabel);
					var old1=true;
					var td=c('td',tr);
					td.innerHTML=ppkLa1[l][3];
					if(ppkLa1[l][10]=='Y')
						td.style.cssText='width:100%; border-bottom:1px solid black; color:red;';
					else
						td.style.cssText='width:100%; border-bottom:1px solid black; color:black;';
				}
			}
			if(old1)
				div.style.cssText='display:block';
		}
		var content2=e('pilihRa1');
		content2.innerHTML="";
		if(ppkRa1.length!=0){
			var div=c("div",content2," title1");
			div.innerHTML="Rad";
			div.style.cssText='display:none';
			var tabel=c('table',content2,'table table-striped');
			for(var ra=0;ra<ppkRa1.length;ra++){
				if(ppkRa1[ra][11]){
					var old2=true;
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.innerHTML=ppkRa1[ra][3];
					td.style.cssText='width:100%; border-bottom:1px solid black; '; 
				}
			}
			if(old2)
				div.style.cssText='display:block';
		}
		var content3=e('pilihI101');
		content3.innerHTML="";
		if(diag1.length!=0){
			var div=c("div",content3," title1");
			div.innerHTML="ICD 10";
			div.style.cssText='display:none';
			var tabel=c('table',content3,'table table-striped');
			for(var ii=0;ii<diag1.length;ii++){
					var old3=true;
					var tr=c('tr',tabel);
					var td=c('td',tr);
					td.innerHTML=diag1[ii][3];
					if(diag1[ii][4]=='1')
						td.style.cssText='width:100%; border-bottom:1px solid black; color:red;';
					else
						td.style.cssText='width:100%; border-bottom:1px solid black; color:black;';
			}
			if(old3)
				div.style.cssText='display:block';
		}
		var content4=e('pilihI91');
		content4.innerHTML="";
		if(tindak1.length!=0){
			var div=c("div",content4," title1");
			div.innerHTML="ICD 9";
			div.style.cssText='display:none';
			var tabel=c('table',content4,'table table-striped');
			for(var i9=0;i9<tindak1.length;i9++){
					var tr=c('tr',tabel);
					var old4=true;
					var td=c('td',tr);
					td.innerHTML=tindak1[i9][3];
					if(tindak1[i9][4]=='1')
						td.style.cssText='width:100%; border-bottom:1px solid black; color:red;';
					else
						td.style.cssText='width:100%; border-bottom:1px solid black; color:black;';
			}
			if(old4)
				div.style.cssText='display:block';
		}
		var content5=e('pilihTi1');
		content5.innerHTML="";
		if(ppkTi1.length!=0){
			var div=c("div",content2," title1");
			div.innerHTML="Tindak";
			div.style.cssText='display:none';
			var tabel=c('table',content5,'table table-striped');
			for(var ti=0;ti<ppkTi1.length;ti++){
				var old5=true;
				var tr=c('tr',tabel);
				var td=c('td',tr);
				td.innerHTML=ppkTi1[ti][2];
				td.style.cssText='border-bottom:1px solid black; '; 
			}
			if(old5)
				div.style.cssText='display:block';
		}
	}
	function addPPK(){
		$('#insert_PPK').modal('show');
		e('formPPK1').reset();
	}
	function insertPPK(){
		var kode=e('kodePPK').value;
		var nama=e('namaPPK').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPPK/'+idUser,
			type : "post",
			data:{idPoli:idDept,kode:kode,nama:nama},
			success : function(o)
			{
				var prod = o;
				$('#insert_PPK').modal('hide');
				selectPPK1();
			},error:function(o)
			{		
			
			}
		});
	}
	function updPPK(){
		if(idPPK!=""){
			$('#update_PPK').modal('show');
			e('formPPK2').reset();
			e('namaPPK1').value=namaPP;
			e('kodePPK1').value=kodePP;
		}else
			bootbox.alert('Silakan Pilik PPK!');
	}
	function updatePPK(){
		var kode=e('kodePPK1').value;
		var nama=e('namaPPK1').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/updatePPK/'+idUser,
			type : "post",
			data:{idFormula:idPPK,kode:kode,nama:nama,idPoli:idDept},
			success : function(o)
			{
				var prod = o;
				$('#update_PPK').modal('hide');
				selectPPK1();
			},error:function(o)
			{		
			
			}
		});
	}
	function delPPK(){
		if(idPPK!=""){
			 bootbox.confirm('Yakin Master PPK dihapus?',function(result){
				if (result == true){
					deletePPK();
				}
			 });
		}else
			bootbox.alert('Silakan Pilik PPK!');
	}
	function deletePPK(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePPK',
			type : "post",
			data:{idFormula:idPPK},
			success : function(o)
			{
				var prod = o;
				selectPPK1();
			},error:function(o)
			{		
			
			}
		});
	}
	function selectPPK1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPPK/'+idUser,
			type : "post",
			data :{poli:idDept},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				idPPK="";
				tabelPPK1(prod);
				idPPK="";
				tindak1=[];diag1=[];ppkRe1=[];ppkLa1=[];ppkRa1=[];ppkTi1=[];
				selectPICD91(idPPK);
				selectPICD101(idPPK);
				selectPResep1(idPPK);
				selectPTindak1(idPPK);
				formStrukturPPK('1');
				formStrukturPPK('2');
				disabledFormPPK();

			},error:function(o){
				var content=e("masterPPK1");
				content.innerHTML="";
				content.innerHTML="Tidak Ada PPK!";
			}
		});
	}
	var namaPP="";
	var kodePP="";
	function tabelPPK1(prod){
		namaPP="";
		kodePP="";
		var content=e("masterPPK1");
		content.innerHTML="";
		var pilih="";
		var dHeight=bodyHeight*0.75;
		content.style.height=(dHeight-40)+"px";
		var content1=e("buatPPK1");
		content1.style.height=(dHeight-40)+"px";
		var content1=e("pilihPPK1");
		content1.style.height=(dHeight-40)+"px";
		var label=c("label",content);
		label.innerHTML="Cari PPK";
		label.style.cssText="margin-top:5px;margin-left:10px;margin-right:5px;";
		var input=c("input",content,null,"kdPPK1");
		input.setAttribute("type","text");
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","PPK_table1");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="KODE"; 
		
		th = c("th", tr);
		th.innerHTML="NAMA PPK";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h.PPK_ID);
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					tindak1=[];diag1=[];ppkRe1=[];ppkLa1=[];ppkRa1=[];ppkTi1=[];
					idPPK=this.id;
					namaPP=this.cells[1].innerHTML;
					kodePP=this.cells[0].id;
					enableFormPPK();
					selectPICD91(idPPK);
					selectPICD101(idPPK);
					selectPResep1(idPPK);
					selectPTindak1(idPPK);
					formStrukturPPK('1');
					formStrukturPPK('2');
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						tindak1=[];diag1=[];ppkRe1=[];ppkLa1=[];ppkRa1=[];ppkTi1=[];
						idPPK=this.id;
						namaPP=this.cells[1].innerHTML;
						kodePP=this.cells[0].id;
						enableFormPPK();
						selectPICD91(idPPK);
						selectPICD101(idPPK);
						selectPResep1(idPPK);
						selectPTindak1(idPPK);
						formStrukturPPK('1');
						formStrukturPPK('2');
					}
				}
				var td = c("td", tr,null,h.KODE_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick() >"+h.KODE_ID+"</a>";	
				td.setAttribute('title',h.KODE_ID);
				var td = c("td",tr);
				td.innerHTML=h.NAMA_PPK
			}
			pilih='#'+prod[0].PPK_ID;
		}
		jQuery.tableNavigation();
		$('#PPK_table1').fixheadertable({
			colratio:[60,200],
			width:285,
			height:dHeight-94,
			zebra:true
		});
		
		var $rows = $('#PPK_table1 tr');
		$('#kdPPK1').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
		$('#PPKModal').on('shown.bs.modal', function () {
			$(pilih+' td .activation').focus();
		});
		
	}
	var isiRPO=[];
	function obat3(){
		var content=e("tabResep");
		content.innerHTML="";
		var form=c('form',content,null,'formObat3');
		form.setAttribute('action','javascript:addObatToPPKO()');
		var table=c('table',form,null,'tabObat3');
		table.style.cssText='margin-left:5px';
		var tr=c('tr',table);
		var td=c('td',tr);
		td.innerHTML='Nama Obat';
		td.style.width='200px';
		td=c('td',tr);
		td.innerHTML='Dosis';
		td.style.width='100px';
		td=c('td',tr);
		td.innerHTML='Jumlah';
		td.style.width='50px';
		
		td=c('td',tr);
		td.innerHTML='Signa';
		td.style.width='200px';
		
		td=c('td',tr);
		td.innerHTML='<button tabindex=154 type="submit" class="btn btn-xs btn-primary" id="addO2"><span class="glyphicon glyphicon-plus"></span> Tambah</button>';
		td.setAttribute('rowspan',2);
		td.style.cssText='vertical-align:bottom';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="obat-id4" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="idSedian4" style="display:none"></input><input type="text" id="sedian4" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="idSatuan4" style="display:none"></input><input type="text" id="satuan4" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="pecah4" style="display:none"></input>';
		
		tr=c('tr',table);
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=151 id="nObat2" required="required"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text"  tabindex=152 id="dObat2"></input>';
		
		td=c('td',tr);
		td.innerHTML='<input type="text" style="text-align:right;" tabindex=152 id="jObat2" ></input>';
		td=c('td',tr,null,'signaObat4');
		var select=c('select',td,null,'signaO4');
		select.setAttribute('tabindex',153);
		isiSigna("4");
		
		tr=c('tr',table);
		td=c('td',tr);
		td.setAttribute('colspan',3);
		td=c('td',tr);
		//td.style.cssText='display:none';
		var button=c("button",td,null,"signaT4");
		button.setAttribute("type","button");
		button.innerHTML="Free Text";
		button.onclick=function(){
			var content1=e("signaO4");
			if(content1){
				var content2=e("signaObat4");
				content2.innerHTML="";
				input=c("input",content2,null,"signa_dokter5");
				input.setAttribute("type","text");
				input.setAttribute('tabindex',153);
				input.setAttribute('required','required');
				button=e("signaT4");
				button.innerHTML="Signa";	
			}else{
				var content2=e("signaObat4");
				content2.innerHTML="";
				input=c("select",content2,null,"signaO4");	
				isiSigna("4");
				button=e("signaT4");
				button.innerHTML="Free Text";
			}
		}
		var hr=c('hr',content);
		var table=c('table',content);
		tr=c('tr',table);
		td=c('td',tr);
		td.setAttribute('colspan',2);
		var button=c("button",td,null,"racikanPPK");
		button.setAttribute("type","button");
		button.innerHTML="Racikan";
		button.onclick=function(){
			var ada=false;
			var a=0;
			isiRPO=[];cekResep=[];
			for(var i=0;i<ppkRe1.length;i++){
				if(ppkRe1[i][12]=='04'){
					ada=true;
					isiRPO[a]=i;
					cekResep[a]=ppkRe1[i][1];
					a++;
				}
			}
			var res=hasDuplicates(cekResep);
			if(res){
				bootbox.alert('obat ganda!');
				return;
			}
			if(ada){
				$('#addRacikanModal2').modal('show');
				e('formRacik2').reset();
				isiBungkus('2');
				isiSigna('5');
				$('#addRacikanModal2').on('shown.bs.modal', function () {
					$('#nRacik2').focus();
				});
				$('#addRacikanModal2').on('hidden.bs.modal', function () {
					$('#nObat2').focus();
				});
			}else
				bootbox.alert('Tidak ada obat!');
		}
		$("#nObat2").keydown(function(event){
			if(event.keyCode==13){
				var nama=this.value.trim();
				sumPage=1;
				if(nama.length>=1){
					$("#addFormulaPPKModal").modal('show');
					searchObatP(nama,sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#nObat2').focus(),10});
					});
				}
			}
		});
		/*$("#dObat2").keydown(function(event){
			if(event.keyCode==9 || event.keyCode==13){
				var nama=this.value.trim();
				if(nama.length<=1){
					$('#jObat2').removeAttr('disabled');
					setTimeout(function(){$('#jObat2').focus(),10});
				}else{
					$('#jObat2').attr('disabled',true);
					setTimeout(function(){$('#signaO4').focus(),10});
				}
				
			}
		});*/
		btn=e("signaT5");
		btn.onclick=function(){
			var content1=e("signaO5");
			if(content1){
				var content2=e("signaRacik2");
				content2.innerHTML="";
				input=c("input",content2,null,"signa_dokter6");
				input.setAttribute("type","text");
				input.setAttribute('tabindex',173);
				input.setAttribute('required','required');
				button=e("signaT5");
				button.innerHTML="Signa";	
			}else{
				var content2=e("signaRacik2");
				content2.innerHTML="";
				input=c("select",content2,null,"signaO5");	
				input.setAttribute('tabindex',173);
				isiSigna("5");
				button=e("signaT5");
				button.innerHTML="Free Text";
			}
		}
	}
	function selectPICD91(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPICD9',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelTindak1(prod);
			},error:function(o){
				tabelTindak1(pasienInfo);
			}
		});
	}
	function selectPICD101(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPICD10',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelDiag1(prod);
			},error:function(o){
				tabelDiag1(pasienInfo);
			}
		});
	}
	function selectPResep1(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPResep',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelResepPPK(prod);
			},error:function(o){
				tabelResepPPK(pasienInfo);
			}
		});
	}
	function selectPLab1(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPLab',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelLabPPK1(prod);
			},error:function(o){
				tabelLabPPK1(pasienInfo);
			}
		});
	}
	function selectPRad1(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPRad',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelRadPPK1(prod);
			},error:function(o){
				tabelRadPPK1(pasienInfo);
			}
		});
	}
	function searchObatP(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectObat',
			type : "post",
			data:{obat:nama,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddFormulaPPK(prod);
			},error:function(o){
				
			}
		});
	}
	function searchBhnP(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectBhn',
			type : "post",
			data:{obat:nama,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddFormulaPPK(prod);
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Bahan!');
			}
		});
	}	
	function tabelAddFormulaPPK(prod){
		var content=e("addFormulaPPKBody");
		content.innerHTML="";
		var pilih="";
		var cWidth=bodyWidth*0.7;
		var cHeight=(bodyHeight*0.6)-48;
		var col=(cWidth-60)/9;
		var div=c('div',content);
		var label=c('label',div);
		label.innerHTML='Bahan Aktif';
		label.style.width='100px';
		var input=c('input',div,null,'bhnaktif3');
		input.setAttribute('type','text');
		
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","Pobat_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="BAHAN AKTIF";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.NAMA);
				tr.ondblclick=function(){
					var namaObat=this.id;
					$('#addFormulaPPKModal').modal('hide');
					e("obat-id4").value=this.cells[0].id;
					e("nObat2").value=namaObat;
					e("idSedian4").value=this.cells[1].id;
					e("idSatuan4").value=this.cells[2].id;
					e("sedian4").value=this.cells[1].innerHTML;
					e("satuan4").value=this.cells[2].innerHTML;
					e("pecah4").value=this.cells[5].innerHTML;
					//$('#jObat2').attr('disabled',true);
					var fda=this.cells[4].innerHTML;
					if(fda!=""){
						bootbox.alert('FDA : '+fda,function(){
							setTimeout(function(){$('#dObat2').focus();},10);
						});
					}
					$("#dObat2").focus();
					
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						var namaObat=this.id;
						$('#addFormulaPPKModal').modal('hide');
						e("obat-id4").value=this.cells[0].id;
						e("nObat2").value=namaObat;
						e("idSedian4").value=this.cells[1].id;
						e("idSatuan4").value=this.cells[2].id;
						e("sedian4").value=this.cells[1].innerHTML;
						e("satuan4").value=this.cells[2].innerHTML;
						e("pecah4").value=this.cells[5].innerHTML;
						//$('#jObat2').attr('disabled',true);
						var fda=this.cells[4].innerHTML;
						if(fda!=""){
							bootbox.alert('FDA : '+fda,function(){
								setTimeout(function(){$('#dObat2').focus();},10);
							});
						}
						$("#dObat2").focus();
					}
				}
				var td = c("td", tr,null,h.OBAT_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick()>"+h.NAMA+"</a>";
				td.setAttribute('title',h.NAMA);
				td.style.cssText='text-align:left';
				
				td = c("td", tr,null,h.SEDIAAN_ID);
				td.innerHTML=h.SEDIAAN;
				td.setAttribute('title',h.SEDIAAN);
				td.style.display='none';
				
				td = c("td", tr,null,h.SATUAN_KECIL_ID);
				td.innerHTML=h.SATUAN;
				td.setAttribute('title',h.SATUAN);
				td = c("td", tr);
				if(h.BHN_AKTIF!=null){
					td.innerHTML=h.BHN_AKTIF;
					td.setAttribute('title',h.BHN_AKTIF);
				}else
					td.innerHTML="";
				
				td = c("td", tr);
				td.innerHTML=h.KATEGORI_FDA;
				td.style.display='none';
				
				td = c("td", tr);
				td.innerHTML=h.PECAH_YT;
				td.style.display='none';
			}
			pilih='#'+prod[0].OBAT_ID;
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevPage3');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			var obat=e('nObat2').value;
			if(obat.length!=0){
				sumPage=sumPage-32;
				searchObatP(obat,sumPage);
			}
		}
			
		var button=c('button',div,null,'nextPage3');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			var obat=e('nObat2').value;
			if(obat.length!=0)
				searchObatP(obat,sumPage);
		}
		if(prod.length!=16)
			$('#nextPage3').attr('disabled',true);
		if(sumPage==17)
			$('#prevPage3').attr('disabled',true);
		$('#Pobat_table').fixheadertable({ 
			colratio	 : [3*col,2*col,col,3*col],
			//width:cWidth-60,
			height:380
		});
		jQuery.tableNavigation();
			
		var $rows = $('#Pobat_table tr');
		$('#bhnaktif3').keyup(function(event) {
			if(event.keyCode==13){
				if(event.keyCode==13){
				sumPage=1;
				var val = $.trim($(this).val()).replace(/ +/g, ' ').toUpperCase();
				searchBhnF(val,sumPage);
				var button=e('prevPage3');
				button.onclick=function(){
					var obat=e('bhnaktif3').value;
					if(obat.length!=0){
						sumPage=sumPage-32;
						searchBhnP(obat,sumPage);
					}
				}
				button=e('nextPage3');
				button.onclick=function(){
					var obat=e('bhnaktif3').value;
					if(obat.length!=0)
						searchBhnP(obat,sumPage);
				}
			}
			}
		});
		$('#addFormulaPPKModal').on('shown.bs.modal', function () {
			$(pilih+' .activation').focus();
		});
		$(pilih+' .activation').focus();
	}
	var sPOUrut;
	function addObatToPPKO(){
		var resep2=[];
		resep2[0]=idPPK;
		resep2[1]=e("obat-id4").value;
		if(resep2[1]==""||resep2[1]==null){
			bootbox.alert("Pilih Obat!",function(){
				setTimeout(function(){$('#nObat2').focus();},10);
			});
			return;
		}
		var obat=e("nObat2").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Obat!",function(){
				setTimeout(function(){$('#nObat2').focus();},10);
			});
			return;
		}
		resep2[2]=obat;
		var idKemasan=e("idSedian4").value;
		resep2[3]=idKemasan;
		var kemasan=e("sedian4").value;
		resep2[4]=kemasan;
		var idSatuan=e("idSatuan4").value;
		resep2[5]=idSatuan;
		var satuan=e("satuan4").value;
		resep2[6]=satuan;
		var dosis=e("dObat2").value.trim();
		//if(dosis.length<=1){
			var qty=e("jObat2").value;
			var iNum;
			var pecah=e("pecah4").value;
		if(qty!=""){
			if(pecah=='Y')
				iNum=isNumber(qty);
			else
				iNum=isNumber1(qty);
			if(iNum==0){
				bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
					setTimeout(function(){$("#jObat2").focus();},10);
				});
				return;
			}
		}
				resep2[7]=qty;
			//	resep2[15]="";
		//}else{
			resep2[15]=dosis;
		//	resep2[7]="";
		//}
		var sid=e("signaO4");
		var idSigna="";var signa="";
		if(sid){
			idSigna=sid.value;
			signa=$("#signaO4 option:selected").html();
		}
		var dok=e("signa_dokter5");
		var sDokter="";
		if(dok)
			sDokter=dok.value;
		resep2[8]=idSigna;
		resep2[9]=signa;
		resep2[10]=sDokter;
		resep2[12]='00';
		resep2[13]='0';
		if(sPOUrut!=null)
			ppkRe1.splice(sPOUrut,0,resep2);
		else
			ppkRe1.push(resep2);
		e("formObat3").reset();
		$('#nObat2').focus();
		
		tabelPResep1(ppkRe1);
		sPOUrut=null;
		
	}
	var racikPO=[];
	function getKodeRacik3(){
		var kode='RP'+idPPK.substring(2)+noRacik+moment().format('mmss');
		noRacik=eval(noRacik)+1;
		return kode;
	}
	function addRacikToPPK(){
		racikPO=[];
		
		var obat=e("nRacik2").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Nama Racik!",function(){
				setTimeout(function(){$('#nRacik2').focus();},10);
			});
			return;
		}
		var qty=e("jRacik2").value;
		var iNum=isNumber(qty);
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$('#jRacik2').focus();},10);
			});
			return;
		}var idRacik=getKodeRacik3();
		var sid=e("signaO5");
		var idSigna="";var signa="";
		if(sid){
			idSigna=sid.value;
			signa=$("#signaO5 option:selected").html();
		}
		var dok=e("signa_dokter6");
		var sDokter="";
		if(dok)
			sDokter=dok.value;
		
		for(var i=0;i<isiRPO.length;i++){
			var n=isiRPO[i];
			ppkRe1[n][8]=idSigna;
			ppkRe1[n][9]=signa;
			ppkRe1[n][10]=sDokter;
			ppkRe1[n][12]='03';
			ppkRe1[n][13]=idRacik;
			racikPO.push(ppkRe1[n]);
		}
		for(var i=isiRPO.length-1;i>=0;i--)
			ppkRe1.splice(isiRPO[i],1);
		
		for(var i=isiRPO.length-1;i>=0;i--)
			ppkRe1.splice(isiRPO[0],0,racikPO[i]);
		
		var resep3=[];
		var no=e("bRacik2").value;
		var nomor=no.split('_')[0];
		resep3[0]=idPPK;
		resep3[1]=bungkus[nomor][0];
		resep3[2]=bungkus[nomor][1];
		resep3[3]=bungkus[nomor][2];
		resep3[4]=bungkus[nomor][3];
		resep3[5]=bungkus[nomor][4];
		resep3[6]=bungkus[nomor][5];
		resep3[7]=qty;
		resep3[8]=idSigna;
		resep3[9]=signa;
		resep3[10]=sDokter;
		resep3[12]='02';
		resep3[13]=idRacik;
		resep3[15]="";
		sPOUrut=isiRPO[0];
		ppkRe1.splice(sPOUrut,0,resep3);
		
		var resep2=[];
		resep2[0]=idRacik;
		resep2[1]=idRacik;
		resep2[2]=obat;
		resep2[3]=bungkus[nomor][2];
		resep2[4]=bungkus[nomor][3];
		resep2[5]=bungkus[nomor][4];
		resep2[6]=bungkus[nomor][5];
		resep2[7]=qty;
		resep2[8]=idSigna;
		resep2[9]=signa;
		resep2[10]=sDokter;
		resep2[12]='01';
		resep2[13]='0';
		resep2[14]=obat;
		resep2[15]="";
		ppkRe1.splice(sPOUrut,0,resep2);
		$('#nObat2').focus();
		$('#addRacikanModal2').modal('hide');
		e('formRacik2').reset();
		sPOUrut=null;
		tabelPResep1(ppkRe1);
}
function tabelResepPPK(prod){
		ppkRe1=[];
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FORMULA_RESEP;
				resep[1]=h.OBAT_ID;
				resep[2]=h.NAMA_OBAT;
				if(h.SEDIAAN_ID!=null){	
					resep[3]=h.SEDIAAN_ID;
					resep[4]=h.SEDIAAN;
				}else{
					resep[3]="";
					resep[4]="";
				}
				if(h.SATUAN_ID!=null){	
					resep[5]=h.SATUAN_ID;
					resep[6]=h.SATUAN;
				}else{
					resep[5]="";
					resep[6]="";
				}
				var sum="";
				if(h.JUMLAH!=null){
					if(h.JUMLAH.substring(0,1)=='.')
						sum=0+h.JUMLAH;
					else
					sum=h.JUMLAH;
				}
				resep[7]=sum;
				resep[8]=h.SIGNA_ID;
				resep[9]=h.SIGNA_NAMA;
				resep[10]=h.SIGNA_DOKTER;
				resep[11]=h.URUT;
				resep[12]=h.TYPE;
				resep[13]=h.HEADER;
				resep[14]=h.NAMA_RACIKAN;
				resep[15]=h.FREE_DOSIS;
				ppkRe1.push(resep);
			}
		}tabelPResep1(ppkRe1);
	}
function tabelPResep1(prod){
		var content=e("tabResep1");
		content.innerHTML="";
		var content1=e("buatPPK1");
		cHeight=bodyHeight*0.75;
		cWidth=(bodyWidth*0.75);
		var col=(cWidth-180)/7;
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","PO_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		
		th.innerHTML="RACIKAN";
		
		th = c("th", tr);
		th.innerHTML="NAMA OBAT";
		
		/*th = c("th", tr);
		th.innerHTML="SEDIAN";*/
		
		th = c("th", tr);
		th.innerHTML="SATUAN";
		
		th = c("th", tr);
		th.innerHTML="DOSIS";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		th.innerHTML="SIGNA";
		
		th = c("th", tr);
		th.innerHTML="URUT";
		
		th = c("th", tr);
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trObat3');
				/*tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					e('addO1').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
					sFOUrut=this.id.split("_")[0];
					$('#nObat1').focus();
				}*/
				if(h[12]=='00'||h[12]=='04'){
					tr.style.background='#b0d9d7';
					tr.ondblclick=function(){
						$(this).closest('table').find('td').removeAttr("style");			
						$(this).children("td").css("background","#C0C0C0");
						e('addO3').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
						sPOUrut=this.id.split("_")[0];
						$('#nObat2').focus();
					}
					var td = c("td", tr);
					radio=c("input",td,null,"racikPO_"+i);
					radio.setAttribute("name","typePO"+i);
					radio.setAttribute("type","checkbox");
					if(h[12]=='00'){
						$("#racikPO_"+i).prop("checked", false);
					}else{
						$("#racikPO_"+i).prop("checked", true);
					}
					$("#racikPO_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							$("#racikPO_"+no).prop("checked", true);
							ppkRe1[no][12]='04';
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							$("#racikPO_"+no).prop("checked", false);
							ppkRe1[no][12]='00';
						}
					});
				
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[4];
					td.setAttribute('title',h[4]);
					td.style.display='none';
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					td.innerHTML=h[15];
					td.setAttribute('title',h[15]);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					td = c("td", tr);
					var button=c('button',td,null,i+'_deletePO');
					button.setAttribute('type','button');
					button.innerHTML='Delete';
					button.onclick=function(){
						var id=this.id;
						noDelete=id.split('_')[0];
						ppkRe1.splice(noDelete,1);
						tabelPResep1(ppkRe1);
					}
				}else if(h[12]=='01'){
					tr.style.cssText='background:#000;color:#fff;';
					var td = c("td", tr,null,'tdRacikPO_'+i);
					td.innerHTML='*';
					
					td = c("td", tr);
					//td.setAttribute('colspan',5);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					if(h[7]!=null){
						div.innerHTML=h[7];
						div.setAttribute('title',h[7]);
					}else
						td.innerHTML="";
					
					td = c("td", tr);
					if(h[8]){
						td.innerHTML=h[9];
						td.setAttribute('title',h[9]);
					}else{
						td.innerHTML=h[10];
						td.setAttribute('title',h[10]);
					}
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
					
					td = c("td", tr);
					var button=c('button',td,null,i+'_extraPO');
					button.setAttribute('type','button');
					button.innerHTML='Ekstrak';
					button.style.color='black';
					button.onclick=function(){
						var id=this.id;
						noExtra=id.split('_')[0];
						var header=ppkRe1[noExtra][1];
						ppkRe1.splice(noExtra,1);
						ppkRe1.splice(noExtra,1);
						for(var i=0;i<ppkRe1.length;i++){
							if(ppkRe1[i][13]==header){
								ppkRe1[i][12]='00'
								ppkRe1[i][13]='0';
							}	
						}
						tabelPResep1(ppkRe1);
					}
				}else if(h[12]=='02'){
					var td = c("td", tr,null,'tdRacikO_'+i);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					td.setAttribute('colspan',5);
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
		
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}else if(h[12]=='03'){
					var td = c("td", tr,null,'tdRacikPO_'+i);
					td.innerHTML='*';
					td = c("td", tr);
					var div=c('div',td,'tKiri');
					div.innerHTML=h[2];
					div.setAttribute('title',h[2]);
					td = c("td", tr);
					td.innerHTML=h[4];
					td.setAttribute('title',h[4]);
					td.style.display='none';
					
					td = c("td", tr);
					td.innerHTML=h[6];
					td.setAttribute('title',h[6]);
					
					td = c("td", tr);
					if(h[15]!=null){
						td.innerHTML=h[15];
						td.setAttribute('title',h[15]);
					}else
						td.innerHTML="";
					
					td = c("td", tr,'tKanan');
					div=c('div',td,'tKanan');
					div.innerHTML=h[7];
					div.setAttribute('title',h[7]);
					
					td = c("td", tr);
					
					td = c("td", tr);
					div=c('div',td,'tKanan');
					div.innerHTML=i+1;
				}
			}
		}
		pilihanPPK1();
		$('#PO_table').fixheadertable({ 
			colratio	 : [60,200,100,150,60,150,40,90],
			width:877,
			height:(cHeight-230),
		});
	}
	function labBodyPPK(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var lab=[];
				lab[0]=h.COMP_ID;
				lab[1]=h.JENIS;
				lab[2]=h.LABEL;
				lab[3]=h.CAPTION;
				lab[4]=h.POSX;
				lab[5]=h.POSY;
				lab[6]=h.HEIGHT;
				lab[7]=h.WIDTH;
				lab[8]=false;
				lab[9]=h.ADA_CITO;
				if(lab[9]=='C')
					lab[10]='Y';
				else
					lab[10]='N';
				lab[12]=h.HARGA;
				ppkLa1.push(lab);
			}
		}
		var content=e("ppklab-vr1");
		content.innerHTML="";
		pHeight=bodyHeight*0.75;
		content.style.height=((pHeight/2)+70)+"px";
	
		var div=c("div",content,null,'labPPK1-vr');
		
		labBodyPPK1();
	}
	function tabelLabPPK1(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var noLab=h.NOMOR;
				ppkLa1[noLab][8]=true;
				ppkLa1[noLab][10]=h.CITO;
				ppkLa1[noLab][11]=true;
			}
		}
		var content=e('labPPK1-vr');
		labBodyPPK1();
	}
	function labBodyPPK1(){
		var content=e("labPPK1-vr");
		content.innerHTML="";
		var content1=e("ppklab-vr1");
		cHeight=(bodyHeight*0.75)-88;
		div=c("div",content,null,"checkLabPPK");
		cWidth=(bodyWidth*0.92);
		div.style.cssText="position:relative;height:"+cHeight+"px;";
		var div1=c("div",div);
		
		var title=c('div',div1,'title1');
		title.innerHTML='CITO';
		title.style.cssText="position:absolute; height:25px; text-align:center; font-Weight:bold; font-size:18px;top:1500px;width:"+cWidth+"px;";
		title=c('div',div1,'title1');
		title.innerHTML='Rujukan Luar';
		title.style.cssText="position:absolute; height:25px; text-align:center; font-Weight:bold; font-size:18px;top:2000px;width:"+cWidth+"px;";
		
		if(ppkLa1.length!=0){
			for(var i=0;i<ppkLa1.length;i++){
				var h=ppkLa1[i];
				var div=c("div",div1);
				var wi=eval(h[7]);
				div.style.cssText="position:absolute; top:"+h[5]+"px;left:"+h[4]+"px;height:"+h[6]+"px;width:"+wi+"px;";
				if(h[1]==2){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="blue";
				}else if(h[1]==5){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="red";
				}else{
					var check=c("input",div,null,"checkLabPPK_"+i);
					check.setAttribute("type","checkbox");
					check.setAttribute('title','Rp. '+toRupiah(h[12]));
					if(h[8]){
						$("#checkLabPPK_"+i).prop("checked", true);
					}else{
						$("#checkLabPPK_"+i).prop("checked", false);
					}
					$("#checkLabPPK_"+i).on("click", function(){
						if($(this).is(":checked")){
							$(this).prop("checked", true);
							var no=this.id.split("_")[1];
							ppkLa1[no][8]=true;
						}else if($(this).is(":not(:checked)")){
							//$(this).attr("checked","false");
							var no=this.id.split("_")[1];
							$("#cito_"+no).prop("checked", false);
							ppkLa1[no][8]=false;
							ppkLa1[no][10]='N';
						}
						pilihanPPK1();
					});
					if(disabledPPK)
						$("#checkLabPPK_"+i).attr('disabled',true);
					label=c("label",div);
					label.innerHTML=h[3];
					//label.setAttribute('title','Rp. '+toRupiah(h[12]));
					if(h[9]=='Y'){
						label.style.width=(h[7]-120)+"px";
						check=c("input",div,null,"citoPPK_"+i);
						check.setAttribute("type","checkbox");
						
						label=c("label",div);
						label.innerHTML="Cito";
						label.style.width="20px";
						if(h[10]=='Y'){
							$("#citoPPK_"+i).prop("checked", true);
						}else{
							$("#citoPPK_"+i).prop("checked", false);
						}
						$("#citoPPK_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								$("#checkLabPPK_"+no).prop("checked", true);
								ppkLa1[no][10]='Y';
								ppkLa1[no][8]=true;
							}else if(
								$(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								ppkLa1[no][10]='N';
							}
							pilihanPPK1();
						});
						if(disabledPPK)
							$("#citoPPK_"+i).attr('disabled',true);
					}
				}
			}
			pilihanPPK1();
		}
	}
	function radBodyPPK(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var rad=[];
				rad[0]=h.COMP_ID;
				rad[1]=h.JENIS;
				rad[2]=h.LABEL;
				rad[3]=h.CAPTION;
				rad[4]=h.POSX;
				rad[5]=h.POSY;
				rad[6]=h.HEIGHT;
				rad[7]=h.WIDTH;
				rad[8]=h.ADA_POSISI;
				rad[9]='N';
				rad[10]='N';
				rad[11]=false;
				rad[13]=h.HARGA;
				ppkRa1.push(rad);
			}
		}
		var content=e("ppkrad-vr1");
		content.innerHTML="";
		pHeight=bodyHeight*0.75;
		content.style.height=((pHeight/2)+70)+"px";
		
		div=c("div",content,null,"radPPK1-vr");
		
		radBodyPPK1();
		
	}
	
	function tabelRadPPK1(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var noRad=h.NOMOR;
				ppkRa1[noRad][9]=h.KIRI;
				ppkRa1[noRad][10]=h.KANAN;
				ppkRa1[noRad][11]=true;
				ppkRa1[noRad][12]=true;
			}
		}
		radBodyPPK1();
		
	}
	function radBodyPPK1(){
		var content=e("radPPK1-vr");
		content.innerHTML="";
		var content1=e("ppkrad-vr1");
		cHeight=(bodyHeight*0.75)-88;
		div=c("div",content,null,"checkRadPPK");
		div.style.cssText="position:relative;height:"+cHeight+"px;";
		var div1=c("div",div);
		
		if(ppkRa1.length!=0){
			for(var i=0;i<ppkRa1.length;i++){
				var h=ppkRa1[i];
				var div=c("div",div1);
				var wi=eval(h[7]);
				div.style.cssText="position:absolute; top:"+h[5]+"px; left:"+h[4]+"px; height:"+h[6]+"px; width:"+wi+"px;";
				if(h[1]==5||h[1]==2){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="blue";
				}else if(h[1]==6){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="red";	
				}else if(h[1]==0){
					var label=c("label",div);
					label.innerHTML=h[3];
					label.style.color="blue";
					div.style.cssText="position:absolute; top:"+h[5]+"px; left:"+h[4]+"px; height:"+h[6]+"px; width:"+wi+"px; text-align:center;";
				}else{
					var check=c("input",div,null,"checkRadPPK_"+i);
					check.setAttribute("type","checkbox");
					check.setAttribute('title','Rp. '+toRupiah(h[13]));
					if(h[11]){
						$("#checkRadPPK_"+i).prop("checked", true);
					}else{
						$("#checkRadPPK_"+i).prop("checked", false);
					}
					$("#checkRadPPK_"+i).on("click", function(){
						if($(this).is(":checked")){
							var no=this.id.split("_")[1];
							ppkRa1[no][11]=true;
							if(ppkRa1[no][8]=='Y'){
								$("#kiriPPK_"+no).prop("checked", true);
								ppkRa1[no][9]='Y';
								$("#kananPPK_"+no).prop("checked", true);
								ppkRa1[no][10]='Y';
							}
						}else if($(this).is(":not(:checked)")){
							var no=this.id.split("_")[1];
							ppkRa1[no][11]=false;
							if(ppkRa1[no][8]=='Y'){
								$("#kiriPPK_"+no).prop("checked", false);
								ppkRa1[no][9]='N';
								$("#kananPPK_"+no).prop("checked", false);
								ppkRa1[no][10]='N';
							}
						}
						pilihanPPK1();
					});
					if(disabledPPK)
						$("#checkRadPPK_"+i).attr('disabled',true);
					
					label=c("label",div);
					label.innerHTML=h[3];
					//label.setAttribute('title','Rp. '+toRupiah(h[13]));
					if(h[8]=='Y'){
						label.style.width=(h[7]-100)+"px";
						check=c("input",div,null,"kiriPPK_"+i);
						check.setAttribute("type","checkbox");
						if(radDisabled)
							check.setAttribute('disabled',true);
						label=c("label",div);
						label.innerHTML="Ki";
						label.style.width="15px";
						check=c("input",div,null,"kananPPK_"+i);
						check.setAttribute("type","checkbox");
						if(radDisabled)
							check.setAttribute('disabled',true);
						label=c("label",div);
						label.innerHTML="Ka";
						label.style.width="15px";
						if(h[9]=='Y'){
							$("#kiriPPK_"+i).prop("checked", true);
						}else{
							$("#kiriPPK_"+i).prop("checked", false);
						}
						if(h[10]=='Y'){
							$("#kananPPK_"+i).prop("checked", true);
						}else{
							$("#kananPPK_"+i).prop("checked", false);
						}
						
						$("#kiriPPK_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								$("#checkRadPPK_"+no).prop("checked", true);
								ppkRa1[no][11]=true;
								ppkRa1[no][9]='Y';
							}else if($(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								ppkRa1[no][9]='N';
							}
						});
						$("#kananPPK_"+i).on("click", function(){
							if($(this).is(":checked")){
								var no=this.id.split("_")[1];
								$("#checkRadPPK_"+no).prop("checked", true);
								ppkRa1[no][11]=true;
								ppkRa1[no][10]='Y';
							}else if($(this).is(":not(:checked)")){
								var no=this.id.split("_")[1];
								ppkRa1[no][10]='N';
							}
						});
					}
				}
			}
			
		}pilihanPPK1();
	}
	function formStrukturPPK(no){
		$.ajax({
			url :base_url+'index.php/clinic_controller/getForm',
			type : "post",
			data : {idForm:no,idRekanan:idRekanan},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(no==1){
					labBodyPPK(prod);
					selectPLab1(idPPK);
				}else{
					radBodyPPK(prod);
					selectPRad1(idPPK);
				}
			}
		});
	}
	function ppki(){
		var content=e("icd10-vr1");
		content.innerHTML="";
		var form =c("form",content,"form-horizontal","form4");
		form.setAttribute("role","form");
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-8","pl1");
		label.innerHTML="ICD 10 Utama";
		
		div=c("div",form,"form-group form-group-sm");
		var div1=c("div",div,"col-sm-8","pdd1");
		input =c("input",div1,null,"pk1");
		input.setAttribute("type","text");
		input.style.display='none';
		input =c("input",div1,"form-control","pd1");
		input.setAttribute('tabindex',300);
		input.setAttribute("type","text");
		input.setAttribute("required","required");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","pi1");
		input.setAttribute('tabindex',301);
		input.setAttribute("type","text");
		input.setAttribute("required","required");
				
		/*div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf5');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',302);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#pi1').attr('style','display:none');
				$('#pd1').unbind('keydown');
				this.innerHTML='ICD 10';
				e('pd1').value="";
				e('pi1').value="";
				e('pk1').value="";
				$('#pd1').focus();
				$('#pdd1').attr('class','col-xs-10');
			}else{
				$('#pi1').removeAttr('style');
				$('#pi1').attr('style','display:block');
				this.innerHTML='Free Text';
				e('pd1').value="";
				$('#pd1').focus();
				$('#pdd1').attr('class','col-sm-8')
				$('#pd1').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICD(diagnosa,'3',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#pd1').focus(),10});
							});
						}
					}
				
				});
			}
		}*/
				
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-8","pl2");
		label.innerHTML="ICD 10";
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-8","pdd2");
		input =c("input",div1,null,"pk2");
		input.setAttribute("type","text");
		input.style.display='none';
		input =c("input",div1,"form-control","pd2");
		input.setAttribute('tabindex',303);
		input.setAttribute("type","text");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","pi2");
		input.setAttribute('tabindex',304);
		input.setAttribute("type","text");
		
		/*div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf6');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',305);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#pi2').attr('style','display:none');
				$('#pd2').unbind('keydown');
				
				$('#pd2').keydown(function(event){
					if(event.keyCode==13){
						var diagnosa=e('pd2').value;
						if(diagnosa.length==0){
							bootbox.alert('Masukkan Data Diagnosa!');
							return;
						}
						var dia=[];
						dia[0]="";
						dia[1]="";
						dia[2]=diagnosa;
						dia[3]='new';
						dia[4]=idPPK+diag.length;
						diag1.push(dia);
						table_diag1();
						e('pd2').value="";
						e('pi2').value="";
						$("#pd2").focus();
						
					}
					
				});
				this.innerHTML='ICD 10';
				e('pd2').value="";
				e('pi2').value="";
				e('pk2').value="";
				$("#pd2").focus();
				$('#pdd2').attr('class','col-xs-10');
			}else{
				$('#pi2').removeAttr('style');
				$('#pi2').attr('style','display:block');
				this.innerHTML='Free Text';
				e('pd2').value="";
				$('#pdd2').attr('class','col-sm-8');
				$("#pd2").focus();
				$('#pd2').unbind('keydown');
				$('#pd2').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICD(diagnosa,'4',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#pd2').focus(),10});
							});
						}
					}
				
				});
			}
		}*/
			
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-11","diagTable1");
		
		var content1=e("icd9-vr1");
		content1.innerHTML="";
		var form =c("form",content1,"form-horizontal","form5");
		form.setAttribute("role","form");
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-8");
		label.innerHTML="ICD 9 CM Utama";	
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-8","pdd9");
		input =c("input",div1,null,"pk9");
		input.setAttribute("type","text");
		input.style.display='none';
		input =c("input",div1,"form-control","pd9");
		input.setAttribute('tabindex',306);
		input.setAttribute("type","text");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","pi9");
		input.setAttribute('tabindex',307);
		input.setAttribute("type","text");
		
		/*div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf7');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',308);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#pi9').attr('style','display:none');
				$('#pd9').unbind('keydown');
				this.innerHTML='ICD 9 CM';
				e('pd9').value="";
				e('pi9').value="";
				e('pk9').value="";
				$('#pd9').focus();
				$('#pdd9').attr('class','col-xs-10');
			}else{
				$('#pi9').removeAttr('style');
				$('#pi9').attr('style','display:block');
				this.innerHTML='Free Text';
				e('pd9').value="";
				$('#pd9').focus();
				$('#pdd9').attr('class','col-sm-8')
				$('#pd9').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICDCM(diagnosa,'3',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#pd9').focus(),10});
							});
						}
					}
				
				});
			}
		}*/
		div=c("div",form,"form-group form-group-sm");
		label=c("label",div,"col-sm-8");
		label.innerHTML="ICD 9 CM";
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-8",'ptin9');
		input =c("input",div1,"form-control","ptindak");
		input.setAttribute('tabindex',309);
		input.setAttribute("type","text");
		
		div1=c("div",div,"col-xs-2");
		input =c("input",div1,"form-control","ptindakICD");
		input.setAttribute('tabindex',310);
		input.setAttribute("type","text");
		
		/*div1=c("div",div,"col-xs-2");
		input =c("button",div1,null,'btnf8');
		input.innerHTML='Free Text';
		input.setAttribute('tabindex',311);
		input.setAttribute("type","button");
		input.onclick=function(){
			if(this.innerHTML=='Free Text'){
				$('#ptindakICD').attr('style','display:none');
				$('#ptindak').unbind('keydown');
				
				$('#ptindak').keydown(function(event){
					if(event.keyCode==13){
						var diagnosa=e('ptindak').value;
						if(diagnosa.length==0){
							bootbox.alert('Masukkan Data ICD 9!');
							return;
						}
						var dia=[];
						dia[0]="";
						dia[1]="";
						dia[2]=diagnosa;
						dia[3]='new';
						dia[4]=idEpisode+tindak.length;
						tindak1.push(dia);
						table_tindak1();
						e('ptindak').value="";
						e('ptindakICD').value="";
						$("#ptindak").focus();
						
					}
					
				});
				this.innerHTML='ICD 9 CM';
				e('ptindak').value="";
				$("#ptindak").focus();
				$('#ptin9').attr('class','col-xs-10');
			}else{
				$('#ptindakICD').removeAttr('style');
				$('#ptindakICD').attr('style','display:block');
				this.innerHTML='Free Text';
				e('ptindak').value="";
				e('ptindakICD').value="";
				$('#ptin9').attr('class','col-sm-8');
				$("#ptindak").focus();
				$('#ptindak').unbind('keydown');
				$('#ptindak').keydown(function(event){
					if(event.keyCode==13){
						sumPage=1;
						var diagnosa=this.value.trim();
						if(diagnosa.length>=1){
							$("#icdModal").modal('show');
							selectICDCM(diagnosa,'4',sumPage);
						}else{
							bootbox.alert('Masukkan min 1 Karakter!',function(){
								setTimeout(function(){$('#ptindak').focus(),10});
							});
						}
					}
				
				});
			}
		}*/
		
		div=c("div",form,"form-group form-group-sm");
		div1=c("div",div,"col-sm-11","tindakTable1");
		buttonICD1();
		disabledFormPPK();
	}
	function buttonICD1(){
		$("#pd1").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var diagnosa=this.value.trim();
				if(diagnosa.length>=1){
					$("#icdModal").modal('show');
					selectICD(diagnosa,'3',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#pd1').focus(),10});
					});
				}
			}
		});
		$("#pd1").hover(function(event){
			var diagnosa=this.value.trim();
			this.title=diagnosa;
		});
		$("#pi1").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var kode=this.value.trim();
				if(kode.length>=1){
					$("#icdModal").modal('show');
					selectICD2(kode,'3',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#pi1').focus(),10});
					});
				
			}
		});
		$("#pd2").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var diagnosa=this.value.trim();
				if(diagnosa.length>=1){
					$("#icdModal").modal('show');
					selectICD(diagnosa,'4',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#pd2').focus(),10});
					});
				}
			}
		});
		$("#pi2").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var kode=this.value.trim();
				if(kode.length>=1){
					$("#icdModal").modal('show');
					selectICD2(kode,'4',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#pi2').focus(),10});
					});
				}
			}
		});
		$("#pd9").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var tin=this.value.trim();
				if(tin.length>=1){
					$("#icdModal").modal('show');
					selectICDCM(tin,'3',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#pd9').focus(),10});
					});
				}
			}
		});
		$("#pi9").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var kode=this.value.trim();
				if(kode.length>=1){
					$("#icdModal").modal('show');
					selectICDCM2(kode,'3',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#pi9').focus(),10});
					});
				}
			}
		});
		$("#ptindak").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var tin=this.value.trim();
				if(tin.length>=1){
					$("#icdModal").modal('show');
					selectICDCM(tin,'4',sumPage);
				}else{
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#ptindak').focus(),10});
					});
				}
			}
		});
		$("#ptindakICD").keydown(function(event){
			if(event.keyCode==13){
				sumPage=1;
				var tin=this.value.trim();
				if(tin.length>=1){
					$("#icdModal").modal('show');
					selectICDCM2(tin,'4',sumPage);
				}else
					bootbox.alert('Masukkan min 1 Karakter!',function(){
						setTimeout(function(){$('#ptindakICD').focus(),10});
					});
			}
		});
	}
	function table_diag1(){
		var content=e('diagTable1');
		content.innerHTML="";
		cWidth=bodyWidth*0.6;
		
		var table=c('table',content);
		var tbody=c('tbody',table);
		if(diag1.length!=0){
			for (var i=0;i<diag1.length;i++) {
				var h = diag1[i];
			  if(h[4]=='2'){
				tr = c("tr", tbody);
				var td = c("td", tr);
				var le=(cWidth-100)/6;
				if(h[3].length<le)
					td.innerHTML=h[3];
				else
					td.innerHTML=h[3].substring(0,le-3)+'...';
				td.setAttribute('title',h[3]);
				td.style.width=(cWidth-100)+'px';
				
				td = c("td", tr);
				td.innerHTML=h[2];
				td.style.width='50px';
				td = c("td", tr);
				td.style.width='50px';
				var button=c('button',td,null,i+'_diag1');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noDiag1=id.split('_')[0];
					diag1.splice(noDiag1,1);
					$("#pd2").focus();
					table_diag1();
				}
			  }else if(h[4]=='1'){
				e('pd1').value=h[3];
				e('pi1').value=h[2];
				e('pk1').value=h[1];
			  }
			}
		}pilihanPPK1();
	}
	function table_tindak1(){
		var content=e('tindakTable1');
		content.innerHTML="";
		cWidth=bodyWidth*0.6;
		
		var table=c('table',content);
		var tbody=c('tbody',table);
		if(tindak1.length!=0){
			for (var i=0;i<tindak1.length;i++) {
				var h = tindak1[i];
			 if(h[4]=='2'){
				tr = c("tr", tbody);
				
				var td = c("td", tr);
				var le=(cWidth-100)/6;
				if(h[3].length<le)
					td.innerHTML=h[3];
				else
					td.innerHTML=h[3].substring(0,le-3)+'...';
				td.setAttribute('title',h[3]);
				td.style.width=(cWidth-100)+'px';
				td = c("td", tr);
				td.innerHTML=h[2];
				td.style.width='50px';
				td = c("td", tr);
				td.style.width='50px';
				var button=c('button',td,null,i+'_tindak1');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noTindak1=id.split('_')[0];
					tindak1.splice(noTindak1,1);
					$("#ptindak").focus();
					table_tindak1();
				}
			  }else if(h[4]=='1'){
					e('pd9').value=h[3];
					e('pi9').value=h[2];
					e('pk9').value=h[1];
			  }
			}
			
		}pilihanPPK1();
	}
	function tabelTindak1(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var picd=[];
				picd[0]=h.FORMULA_ICD9;
				picd[1]=h.KODE;
				picd[2]=h.KODE_ICD;
				picd[3]=h.TINDAKAN;
				picd[4]=h.STATUS;
				picd[5]=true;
				picd[6]='ICD9';
				tindak1.push(picd);
			}
		}
		table_tindak1();
	}
	function tabelDiag1(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var picd=[];
				picd[0]=h.FORMULA_ICD10;
				picd[1]=h.KODE;
				picd[2]=h.KODE_ICD;
				picd[3]=h.DIAGNOSA;
				picd[4]=h.STATUS;
				picd[5]=true;
				picd[6]='ICD10';
				diag1.push(picd);
			}
		}
		table_diag1();
	}
	function deletePResep(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePResep',
			type : "post",
			data : {idFormula:idFormula},
			success : function(o)
			{
				var prod = o;
				var a=0;
				for(var i=0;i<ppkRe1.length;i++){
					var a=i+1;
					insertPResep(a,ppkRe1[i][1],ppkRe1[i][2],ppkRe1[i][3],ppkRe1[i][5],ppkRe1[i][8],ppkRe1[i][9],ppkRe1[i][10],ppkRe1[i][7],ppkRe1[i][12],ppkRe1[i][13],ppkRe1[i][14],ppkRe1[i][15]);
				}
			},error:function(o){
				bootbox.alert('Data Formula Resep PPK Gagal Terhapus!');
			}
		});
	}
	function insertPResep(urut,idObat,obat,idKemasan,idSatuan,idSigna,signa,sDokter,qty,type,header,racik,dosis){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPResep/'+idUser,
			type : "post",
			data : {idFormula:idPPK,idObat:idObat,obat:obat,idKemasan:idKemasan,idSatuan:idSatuan,jumlah:qty,idSigna:idSigna,signa:signa,sDokter:sDokter,urut:urut,type:type,header:header,racik:racik,dosis:dosis},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula Resep PPK Gagal Tersimpan!');
			}
		});
	}
	function deletePLab(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePLab',
			type : "post",
			data : {idFormula:idFormula},
			success : function(o)
			{
				var prod = o;
				for(var i=0;i<ppkLa1.length;i++){
					if(ppkLa1[i][8])
						insertPLab(i,ppkLa1[i][0],ppkLa1[i][3],ppkLa1[i][9],ppkLa1[i][10]);
				}
			},error:function(o){
				bootbox.alert('Data Formula Laboratorium PPK Gagal Terhapus!');
			}
		});
	}
	function insertPLab(nomor,test,caption,adacito,cito){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPLab/'+idUser,
			type : "post",
			data : {idFormula:idPPK,nomor:nomor,test:test,caption:caption,adacito:adacito,cito:cito},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula Laboratorium PPK Gagal Tersimpan!');
			}
		});
	}
	function deletePRad(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePRad',
			type : "post",
			data : {idFormula:idFormula},
			success : function(o)
			{
				var prod = o;
				for(var i=0;i<ppkRa1.length;i++){
					if(ppkRa1[i][11])
						insertPRad(i,ppkRa1[i][0],ppkRa1[i][3]);
				}
			},error:function(o){
				bootbox.alert('Data Formula Radiologi PPK Gagal Terhapus!');
			}
		});
	}
	function insertPRad(nomor,test,caption){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPRad/'+idUser,
			type : "post",
			data : {idFormula:idPPK,nomor:nomor,test:test,caption:caption},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula Radiologi PPK Gagal Tersimpan!');
			}
		});
	}
	function deletePICD9(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePICD9',
			type : "post",
			data : {idFormula:idFormula},
			success : function(o)
			{
				var prod = o;
				for(var i=0;i<tindak1.length;i++){
					insertPICD9(tindak1[i][1],tindak1[i][2],tindak1[i][3],tindak1[i][4]);
				}
			},error:function(o){
				bootbox.alert('Data Formula ICD9 PPK Gagal Terhapus!');
			}
		});
	}
	function insertPICD9(kode,kodeICD,tindakan,status){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPICD9/'+idUser,
			type : "post",
			data : {idFormula:idPPK,kode:kode,kodeICD:kodeICD,tindakan:tindakan,status:status},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula ICD9 PPK Gagal Tersimpan!');
			}
		});
	}
	function deletePICD10(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePICD10',
			type : "post",
			data : {idFormula:idFormula},
			success : function(o)
			{
				var prod = o;
				for(var i=0;i<diag1.length;i++){
					insertPICD10(diag1[i][1],diag1[i][2],diag1[i][3],diag1[i][4]);
				}
			},error:function(o){
				bootbox.alert('Data Formula ICD10 PPK Gagal Terhapus!');
			}
		});
	}
	function insertPICD10(kode,kodeICD,diagnosa,status){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPICD10/'+idUser,
			type : "post",
			data : {idFormula:idPPK,kode:kode,kodeICD:kodeICD,diagnosa:diagnosa,status:status},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula ICD10 PPK Gagal Tersimpan!');
			}
		});
	}
	function updateRanap(){
		var kategori=e('kRawat').value;
		var ruang=e('rRawat').value;
		var lantai=e('lantaiKamar').value;
		var kelas=e('rawatKe').value;
		var plan=e('dPlan').value;
		var ket=e('ket_lain').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateRanap',
			type : "post",
			data:{idEpisode:idEpisode,idTransCo:idTransCo,kategori:kategori,ruang:ruang,kelas:kelas,plan:plan,ket:ket,lantai:lantai},
			success : function(o)
			{
				var prod = o;
				sudahDisimpan=true;
				$('#formModal1').modal('hide');
				//bootbox.alert('Data Rawat Inap Sudah Tersimpan!');
				selectRanap1();
			},error:function(o)
			{		
			
			}
		});
	}
	var resumeM=[],diagM=[],obatM=[];
	function formulirModal4(){
		if(idPasien){
			if(idTransCo){
				resumeM=[];
				sejarahReLab1();
				pasienRes();
				selectRNosa();
				selectRDiag();
				selectRSOAP();
				selectResepR();
				setTimeout('selectResume()',1000);
				$('#formModal2').modal('show');	
				textHeight('labR');
				textHeight('citraR');
				textHeight('lainR');
				textHeight('konsulR');
				textHeight('kontrolR');
				textHeight('instruksiR');
				$('#labR').focus();
			}else
				bootbox.alert("Diagnosa tidak ditemukan");
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function selectRNosa(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectNosa',
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					e('poliR').innerHTML=poliklinik;
					e('dokterR').innerHTML=user;
					resumeM[0]=poliklinik;
					resumeM[1]=user;
					e('tglR').innerHTML=h.TGL;
					e('tglR2').innerHTML=h.TGL;
					resumeM[2]=h.TGL;
					if(h.KICD9!=null){
						e('tindakR1').innerHTML=h.TINDAKAN1;
						e('kode2R').innerHTML=h.IDTIN1;
						resumeM[3]=h.IDTIN1;
						resumeM[4]=h.TINDAKAN1;
					}else if(h.TINDAKAN1!=null){
						resumeM[3]='-';
						resumeM[4]=h.TINDAKAN;
						e('tindakR1').innerHTML=h.TINDAKAN;
					}else{
						resumeM[3]='-';
						resumeM[4]='-';
					}
					e('jamR').innerHTML='<label>Jam </label>'+h.JAM;
					resumeM[5]=h.JAM;
					if(h.KICD1!=null){
						e('diagR').innerHTML=h.DIAGNOSA1;
						e('kode1R').innerHTML=h.ICD1;
						resumeM[6]=h.DIAGNOSA1;
						resumeM[7]=h.ICD1;
					}else{
						e('diagR').innerHTML=h.DIAGNOSA;
						e('kode1R').innerHTML='';
						resumeM[6]=h.DIAGNOSA;
						resumeM[7]='';
					}
				}
			},error:function(o)
			{
								
			}
		});
	}
	function selectRSOAP(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP',
			type : "post",	
			data : {idTrans:idTrans,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				
				if(prod.length!=0){
					var length=prod.length;
					var h=prod[length-1];
					var s=h.S.replace(/\n/g, "<br />");
					if(h.S2!=null){
						var s2=h.S2.replace(/\n/g, "<br />");
						var s3=h.S3.replace(/\n/g, "<br />");
					}else{
						var s2=s;
						var s3=s;
					}
					var o=h.O.replace(/\n/g, "<br />");
					e('soap1').innerHTML=s;
					e('soap2').innerHTML=s2;
					e('soap3').innerHTML=s3;
					e('soap4').innerHTML=o;
					resumeM[8]=s;
					resumeM[9]=s2;
					resumeM[10]=s3;
					resumeM[11]=o;
				}
			},error:function(o)
			{
				
			}
		});
	}
	
	function selectRDiag(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectDiag',
			type : "post",	
			data : {idTrans:idTrans,idTransCo:idTransCo},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content=e('diagR2');
				content.innerHTML="";
				diagM=[];
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var dia=[];
						var tr=c('tr',content);
						tr.style.width=bodyWidth*0.7+'px';
						var td=c('td',tr,'col-sm-7');
						if(prod[i].KODE!=null){
							td.innerHTML=prod[i].NM_DIAG1;
							dia[0]=prod[i].NM_DIAG1;
						}else{
							td.innerHTML=prod[i].DIAGNOSA;
							dia[0]=prod[i].DIAGNOSA;
						}
						
						var td=c('td',tr,'col-sm-3');
						td.innerHTML='<label>Kode ICD-10</label>';
						var td=c('td',tr,'col-sm-2');
						if(prod[i].KODE!=null){
							td.innerHTML=prod[i].KODE_ICD;
							dia[1]=prod[i].KODE_ICD;
						}else{
							td.innerHTML='-';
							dia[1]='-';
						}
						diagM.push(dia);
					}
				}
			},error:function(o)
			{		
			}
		});
	}
	function selectResepR(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectResep',
			type : "post",
			data : {idTrans:idTrans,idTransCo:idTransCo,resepKe:1},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content=e('obatR');
				content.innerHTML="";
				obatM=[];
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var h=prod[i];
						var tr=c('tr',content);
						var td=c('td',tr);
						td.innerHTML=h.NAMA_OBAT;
						obatM[i]=h.NAMA_OBAT;
					}
				}
			},error:function(o)
			{		
				bootbox.alert('Tidak Ada Data Resep!');
			}
		});
	}
	function selectResume(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectResume',
			type : "post",
			data:{idTransCo:idTransCo,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				e('formResume').reset();
				if(prod.length!=0){
					var h=prod[0];
					e('labR').value=h.LAB;
					e('citraR').value=h.PENCITRAAN;
					e('konsulR').value=h.KONSULTASI;
					e('lainR').value=h.LAINNYA;
					e('kontrolR').value=h.KONTROL;
					e('instruksiR').value=h.INTRUKSI;
					autoSize('labR');
					autoSize('citraR');
					autoSize('lainR');
					autoSize('konsulR');
					autoSize('kontrolR');
					autoSize('instruksiR');
					$('#formResume').attr('action','javascript:updateResume()');
					$('#formPrint1').removeAttr('style');
				}else{
					e('labR').value=isiLabResume;
					autoSize('labR');
					$('#formResume').attr('action','javascript:addResume()');
				}
			},error:function(o)
			{		
			
			}
		});
	}
	function selectResumeM(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectResume',
			type : "post",
			data:{idTransCo:idTransCo,idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					if(h.LAB!=null){
						var lab=h.LAB.replace(/\n/g, "<br />");
						resumeM[12]=lab;
					}else
						resumeM[12]="-";
					if(h.PENCITRAAN!=null){
						var pencitraan=h.PENCITRAAN.replace(/\n/g, "<br />");
						resumeM[13]=pencitraan;
					}else
						resumeM[13]="-";
					if(h.KONSULTASI!=null){
						var konsultasi=h.KONSULTASI.replace(/\n/g, "<br />");
						resumeM[14]=konsultasi;
					}else
						resumeM[14]="-";
					if(h.LAINNYA!=null){
						var lainnya=h.LAINNYA.replace(/\n/g, "<br />");
						resumeM[15]=lainnya;
					}else
						resumeM[15]="-";
					if(h.KONTROL!=null){
						var kontrol=h.KONTROL.replace(/\n/g, "<br />");
						resumeM[16]=kontrol;
					}else
						resumeM[16]="-";
					if(h.INTRUKSI!=null){
						var intruksi=h.INTRUKSI.replace(/\n/g, "<br />");
						resumeM[17]=intruksi;
					}else
						resumeM[17]="-";
					printForm1();
				}
			},error:function(o)
			{		
			
			}
		});
	}
	function addResume(){
		var lab=e('labR').value;
		var citra=e('citraR').value;
		var lain=e('lainR').value;
		var konsultasi=e('konsulR').value;
		var kontrol=e('kontrolR').value;
		var instruksi=e('instruksiR').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertResume/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode,idTrans:idTrans,idTransCo:idTransCo,idPasien:idPasien,idPoli:idPoli,lab:lab,citra:citra,lain:lain,konsultasi:konsultasi,kontrol:kontrol,instruksi:instruksi},
			success : function(o)
			{
				var prod = o;
				sudahDisimpan=true;
				$('#formModal2').modal('hide');
				selectResumeM();
				//bootbox.alert('Data Rawat Inap Sudah Tersimpan!');
			},error:function(o)
			{		
			
			}
		});
	}
	function updateResume(){
		var lab=e('labR').value;
		var citra=e('citraR').value;
		var lain=e('lainR').value;
		var konsultasi=e('konsulR').value;
		var kontrol=e('kontrolR').value;
		var instruksi=e('instruksiR').value;
		$.ajax({
			url :base_url+'index.php/clinic_controller/updateResume/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode,idTransCo:idTransCo,lab:lab,citra:citra,lain:lain,konsultasi:konsultasi,kontrol:kontrol,instruksi:instruksi},
			success : function(o)
			{
				var prod = o;
				sudahDisimpan=true;
				$('#formModal2').modal('hide');
				selectResumeM();
				//bootbox.alert('Data Rawat Inap Sudah Tersimpan!');
			},error:function(o)
			{		
			
			}
		});
	}
	function pasienRes(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/pasien',
			type : "post",	
			data : {idPasien:idPasien,idTrans:idTrans},
			dataType : "json",
			success : function(o)
			{
				var prod=o;
				var h=prod[0];
				resumeM[18]=h.NAMA;
				resumeM[19]=h.INT_PASIEN_ID;
				resumeM[20]=h.TGL_LAHIR;
				resumeM[21]=h.KELAMIN;
			},error:function(o)
			{		
			
			}
		});
	}
	function printForm1(prod){
		var h=resumeM;
		var popupWin = window.open('', '_blank', 'width=1000,height=800,location=no,left=200px');

        popupWin.document.open();

        popupWin.document.write('<html moznomarginboxes mozdisallowselectionprint><title>Formulir Resume Medis Rawat Jalan</title><link rel="stylesheet" type="text/css" href="'+base_url+'asset/css/print.css" /></head><body style="font-family:arial;border:1px solid; height:auto;" onload="window.print();window.close()">');
		//popupWin.document.write('<html moznomarginboxes mozdisallowselectionprint><title>Formulir Resume Medis Rawat Jalan</title><link rel="stylesheet" type="text/css" href="'+base_url+'asset/css/print.css" /></head><body style="font-family:arial; border:1px solid; height:auto; overflow:auto;">');
		
		popupWin.document.write("<table id='tabelHead' style='border-bottom:1px solid; position: relative; float:left;width:60%;height:100px;'>");
		popupWin.document.write("<tr><td style='width:135px; border-right:1px solid;' rowSpan=3><img src='"+base_url+"asset/image/logoHead.png'></img></td>");
		popupWin.document.write("<td style='text-align:center; font-weight:bold;font-size:18px;'>FORMULIR RESUME</td></tr>");
		popupWin.document.write("<tr><td td style='text-align:center;font-weight:bold;font-size:18px;'>MEDIS RAWAT JALAN</td></tr>");
		popupWin.document.write("<tr><td td style='text-align:center;'>(001/FORM/MED/IV/2015)</td></tr></table>");
		popupWin.document.write("<table id='tabelHead1' style='border-bottom:1px solid;border-left:1px solid;position: relative; font-size:12px; float:left; width:40%;height:100px;'>");
		popupWin.document.write("<tr><td style='width:85px;'>Nama Pasien</td><td>:</td><td>"+h[18]+"</td></tr>");
		popupWin.document.write("<tr><td style='width:85px;'>NO. RM</td><td>:</td><td>"+h[19]+"</td></tr>");
		popupWin.document.write("<tr><td style='width:85px;'>Tgl Lahir</td><td>:</td><td>"+h[20]+"</td></tr>");
		popupWin.document.write("<tr><td style='width:85px;'>Jenis Kelamin</td><td>:</td><td>"+h[21]+"</td></tr></table>");
		
		popupWin.document.write("<table id='tabelForm' style='border-bottom:1px solid; border-right:1px solid;font-size:12px; position: relative; float:left;width:50%;height:30px;'>");
		popupWin.document.write("<tr style='border-bottom:1px solid;'><td style='width:120px;'>Poliklinik</td><td>:</td><td>"+h[0]+"</td></tr>");
		popupWin.document.write("<tr><td style='width:120px;'>Tgl Kunjungan</td><td>:</td><td>"+h[2]+" Jam "+h[5]+"</td></tr></table>");
		
		popupWin.document.write("<table id='tabelForm1' style='border-bottom:1px solid;font-size:12px;  position: relative; float:left;width:50%;height:30px;'>");
		popupWin.document.write("<tr><td>Dokter yang Merawat</td></tr>");
		popupWin.document.write("<tr><td>"+h[1]+"</td></tr></table>");
		
		popupWin.document.write("<table id='tabelForm2' style='width:100%; border-bottom:1px solid; font-size:12px; height:auto;'>");
		popupWin.document.write("<tr><td style='width:150px;'>Diagnosa Utama</td><td style='width:5px;'>:</td><td>"+h[6]+"</td>");
		popupWin.document.write("<td style='width:100px;'>Kode ICD-10</td><td style='width:40px;'>"+h[7]+"</td></tr>");
		popupWin.document.write("<tr><td style='width:150px;'>Diagnosa Sekunder</td><td style='width:5px;'>:</td>");
		if(diagM.length<=3 || diagM.length>0){
			popupWin.document.write("<td>1. "+diagM[0][0]+"</td><td>Kode ICD-10</td><td>"+diagM[0][1]+"</td></tr>");
			popupWin.document.write("<tr><td style='width:150px;'>(Komorbid)</td><td></td>");
			if(diagM[1][0]!=null)
				popupWin.document.write("<td>2. "+diagM[1][0]+"</td><td>Kode ICD-10</td><td>"+diagM[1][1]+"</td></tr>");
			else
				popupWin.document.write("<td>2.</td><td>Kode ICD-10</td><td></td></tr>");
			popupWin.document.write("<tr><td style='width:150px;'></td><td></td>");
			if(diagM[2][0]!=null)
				popupWin.document.write("<td>3. "+diagM[2][0]+"</td><td>Kode ICD-10</td><td>"+diagM[2][1]+"</td></tr>");
			else
				popupWin.document.write("<td>3.</td><td>Kode ICD-10</td><td></td></tr>");
		}else if(diagM.length==0){
			popupWin.document.write("<td>1.</td><td>Kode ICD-10</td><td></td></tr>");
			popupWin.document.write("<tr><td style='width:150px;'>(Komorbid)</td><td></td>");
			popupWin.document.write("<td>2.</td><td>Kode ICD-10</td><td></td></tr>");
			popupWin.document.write("<tr><td style='width:150px;'></td><td></td>");
			popupWin.document.write("<td>3.</td><td>Kode ICD-10</td><td></td></tr>");
		}
		popupWin.document.write("<tr><td style='width:150px;'>Penatalaksanaan</td><td style='width:5px;'>:</td><td colspan=3>"+h[4]+"</td></tr>");
		if(h[4]!='-')
			popupWin.document.write("<tr><td></td><td></td><td>Tanggal Dilakukan : "+h[2]+"</td><td>Kode ICD-9 CM</td><td>"+h[3]+"</td></tr>");
		else
			popupWin.document.write("<tr><td></td><td></td><td>Tanggal Dilakukan : -</td><td>Kode ICD-9 CM</td><td>"+h[3]+"</td></tr>");	
		popupWin.document.write("</table>");
		
		popupWin.document.write("<table id='tabelForm3' style='width:100%; font-size:12px;'>");
		popupWin.document.write("<tr><td style='width:180px;font-weight:bold;'>Anamnesa</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;'><li>Keluhan Utama</li></td><td style='vertical-align:top;width:5px;'>:</td><td>"+h[8]+"</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;'><li>Gejala Penyerta</li></td><td style='vertical-align:top;'>:</td><td>"+h[9]+"</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;'><li>Riwayat Penyakit Dahulu</li></td><td style='vertical-align:top;'>:</td><td>"+h[10]+"</td></tr>");
		popupWin.document.write("<tr><td style='font-weight:bold;'>Temuan Penting</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;'><li>Pemeriksaan Fisik</li></td><td style='vertical-align:top;'>:</td><td>"+h[11]+"</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;' ><li>Pemeriksaan Penunjang</li></td><td style='vertical-align:top;'>:</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;' ><ul><li type='square'>Laboratorium</li></td><td style='vertical-align:top;'>:</td><td>"+h[12]+"</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;' ><ul><li type='square'>Pencitraan Diagnostik</li></td><td style='vertical-align:top;'>:</td><td>"+h[13]+"</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;' ><ul><li type='square'>Lainnya</li></td><td style='vertical-align:top;'>:</td><td>"+h[15]+"</td></tr>");
		popupWin.document.write("<tr><td style='font-weight:bold;'>Konsultasi</td><td style='vertical-align:top;'>:</td><td>"+h[14]+"</td></tr>");
		popupWin.document.write("<tr><td style='font-weight:bold;'>Obat</td><td style='vertical-align:top;'>:</td>");
		if(obatM.length!=0){
			var aa="";
			for(var j=0;j<obatM.length;j++){
				var aa=aa+", "+obatM[j];
			}
			var aa=aa.substring(1,aa.length);
			popupWin.document.write("<td>"+aa+"</td></tr>");
		}else
			popupWin.document.write("<td></td></tr>");
		popupWin.document.write("<tr><td style='font-weight:bold;text-decoration:underline;'>Instruksi Lanjut</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;'><li>Kontrol Ulang</li></td><td style='vertical-align:top;width:5px;'>:</td><td>"+h[16]+"</td></tr>");
		popupWin.document.write("<tr><td style='vertical-align:top;'><li>Segera Bawa ke RS Bila</li></td><td style='vertical-align:top;'>:</td><td>"+h[17]+"</td></tr>");
		popupWin.document.write("</table>");
		popupWin.document.write("<table id='tabelForm4' style='width:300px;float:right; font-size:12px;'>");
		popupWin.document.write("<tr><td style='width:200px;'>Jakarta, </td><td style='width:100px;'>Jam :</td></tr>");
		popupWin.document.write("<tr><td style='width:300px; text-align:center;'>Dokter yang Merawat </td></tr>");
		popupWin.document.write("<tr><td style='height:50px;'> </td></tr>");
		popupWin.document.write("<tr><td style='width:300px; text-align:center;'>( "+user+" ) </td></tr>");
		popupWin.document.write("<tr><td style='width:300px; text-align:center;'>Nama Jelas & Tanda Tangan </td></tr>");
		
		popupWin.document.write("<table id='tabelForm5' style='width:400px; margin-top:100px;border-collapse: collapse;border:1px solid;border-left:0px; border-bottom:0px;font-size:12px;'>");
		popupWin.document.write("<tr><td style='text-align:center;border:1px solid;border-left:0px;' colspan=2>Telah Diverifikasi </td>");
		popupWin.document.write("<td style='text-align:center;border:1px solid;' colspan=2>Telah Dikode </td></tr>");
		popupWin.document.write("<tr><td style='text-align:center;border:1px solid; border-left:0px;width:80px' >Tanggal </td>");
		popupWin.document.write("<td style='text-align:center; border:1px solid;width:120px' >Paraf Verifikator </td>");
		popupWin.document.write("<td style='text-align:center; border:1px solid;width:80px' >Tanggal </td>");
		popupWin.document.write("<td style='text-align:center; border:1px solid;width:120px' >Paraf Koder </td></tr>");
		popupWin.document.write("<tr><td style='height:50px;border:1px solid;border-left:0px;border-bottom:0px;' ></td><td style='height:50px;border:1px solid;border-bottom:0px;' ></td><td style='height:50px;border:1px solid;border-bottom:0px;' ></td><td style='height:50px;border:1px solid;border-bottom:0px;' ></td></tr>");
		
		popupWin.document.write('</html>');

        popupWin.document.close();
		
	}
	
	function selectPTindak(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPTin',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelTindakPPK(prod);
			},error:function(o){
				tabelTindakPPK(pasienInfo);
			}
		});
	}
	function selectPTindak1(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectPTin',
			type : "post",
			data:{formula:idFormula},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				tabelTindakPPK1(prod);
			},error:function(o){
				tabelTindakPPK1(pasienInfo);
			}
		});
	}
	function deletePTin(idFormula){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deletePTin',
			type : "post",
			data : {idFormula:idFormula},
			success : function(o)
			{
				var prod = o;
				for(var i=0;i<ppkTi1.length;i++){
					if(ppkTi1[i][4])
						insertPTin(ppkTi1[i][1],ppkTi1[i][2],ppkTi1[i][3]);
				}
			},error:function(o){
				bootbox.alert('Data Formula Tindakan PPK Gagal Terhapus!');
			}
		});
	}
	function insertPTin(idLayan,nama,qty){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertPTin/'+idUser,
			type : "post",
			data : {idFormula:idPPK,idLayan:idLayan,nama:nama,qty:qty},
			success : function(o)
			{
				var prod = o;
			},error:function(o){
				bootbox.alert('Data Formula Tindakan PPK Gagal Tersimpan!');
			}
		});
	}
	function tabelTindakPPK(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FORMULA_TINDAK;
				resep[1]=h.LAYAN_ID;
				resep[2]=h.NAMA;
				resep[3]=h.JUMLAH;
				resep[4]=false;
				resep[5]='TINDAK';
				ppkTi.push(resep);
			}
		}ppkTindak(ppkTi);
	}
	function tabelTindakPPK1(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var resep=[];
				resep[0]=h.FORMULA_TINDAK;
				resep[1]=h.LAYAN_ID;
				resep[2]=h.NAMA;
				resep[3]=h.JUMLAH;
				resep[4]=true;
				resep[5]='TINDAK';
				ppkTi1.push(resep);
			}
		}ppkTindak1(ppkTi1);
	}
	function alkes3(){
		var content=e("tabTindak");
		content.innerHTML="";
		var form=c('form',content,null,'formAlkes2');
		form.setAttribute('action','javascript:addTindakToPPK()');
		var table=c('table',form,null,'tabAlkes2');
		var tr=c('tr',table);
		var td=c('td',tr);
		td.innerHTML='Nama Tindakan';
		td.style.width='300px';
		td=c('td',tr);
		td.innerHTML='Jumlah';
		td.style.width='80px';
		
		td=c('td',tr);
		td.innerHTML='<button tabindex=163 type="submit" class="btn btn-xs btn-primary" id="addA2"><span class="glyphicon glyphicon-plus"></span> Tambah</button>';
		td.setAttribute('rowspan',2);
		td.style.cssText='vertical-align:bottom';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="alkes-id3" style="display:none"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" id="isQty2" style="display:none"></input>';
		
		tr=c('tr',table);
		td=c('td',tr);
		td.innerHTML='<input type="text" tabindex=161 id="nAlkes2" required="required"></input>';
		td=c('td',tr);
		td.innerHTML='<input type="text" style="text-align:right;" tabindex=162 id="jAlkes2" required="required"></input>';
	
		$("#nAlkes2").keydown(function(event){
			if(event.keyCode==13){
				var nama=this.value.trim();
				if(nama.length>=1){
					sumPage=1;
					$('#addTindakanPPKModal').modal('show');
					searchAlkesP(nama,sumPage);
				}else{
					bootbox.alert('Masukan min 1 Karakter!',function(){
						setTimeout(function(){$('#nAlkes2').focus(),10});
					});
				}
			}
		});
	}	
	function ppkTindak(prod){
		console.log(prod);
		var content=e("ppktin-vr");
		content.innerHTML="";
		cHeight=e('buatPPK').offsetHeight;
		cWidth=content.offsetWidth;
		if(prod.length!=0){
			var div=c('div',content);
			
			var radio=c("input",div,null,"PILTindak");
			radio.style.cssText='margin:5px; margin-bottom:0px;';
			var label=c("label",div);
			label.innerHTML="Check All";
			label.style.cssText='top:-3px;position:relative;';
			radio.setAttribute("type","checkbox");
			$("#PILTindak").on("click", function(){
				if($(this).is(":checked")){
					$(this).prop("checked", true);
					for(var a=0;a<prod.length;a++){
						$("#PILTI_"+a).prop("checked", true);
						ppkTi[a][4]=true;
					}
				}else if($(this).is(":not(:checked)")){
					$(this).prop("checked", false);
					for(var a=0;a<prod.length;a++){
						$("#PILTI_"+a).prop("checked", false);
						ppkTi[a][4]=false;
					}
				}
				pilihanPPK();
			});
		}
		var divtable = c("div",content,"table-content");
		var table = c("table",divtable,"table table-condensed table-hover table-striped","tindak_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="PILIH";
		
		th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
	
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,h[1]);
				var td = c("td", tr);
				var radio=c("input",td,null,"PILTI_"+i);
				radio.setAttribute("type","checkbox");
				if(h[4]){
					$("#PILTI_"+i).prop("checked", true);
				}else{
					$("#PILTI_"+i).prop("checked", false);
				}
				$("#PILTI_"+i).on("click", function(){
					if($(this).is(":checked")){
						$(this).prop("checked", true);
						var no=this.id.split("_")[1];
						$("#PILTI_"+no).prop("checked", true);
						ppkTi[no][4]=true;
					}else if($(this).is(":not(:checked)")){
						var no=this.id.split("_")[1];
						$('#PILTindak').prop("checked", false);
						$(this).prop("checked", false);
						ppkTi[no][4]=false;
					}
					pilihanPPK();
				});
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
				
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML=h[3];
				td.setAttribute('title',h[3]);
				
			}
		}
		$('#tindak_table').fixheadertable({ 
			colratio:[60,300,60],
			width:445,
			height:cHeight-24,
			zebra:true
		});
	}
	function ppkTindak1(prod){
		var content=e("tabTindak1");
		content.innerHTML="";
		var content1=e("buatPPK1");
		cHeight=bodyHeight*0.75;
		cWidth=(bodyWidth*0.75);
		var col=(cWidth-180)/7;
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"table table-condensed table-hover table-striped","tindak1_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
		
		th = c("th", tr);
		th.innerHTML="JUMLAH";
		
		th = c("th", tr);
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h=prod[i];
				tr = c("tr", tbody,null,i+'_trAlkes2');
				tr.ondblclick=function(){
					$(this).closest('table').find('td').removeAttr("style");			
					$(this).children("td").css("background","#C0C0C0");
					sPTUrut=this.id.split("_")[0];
					e('addA2').innerHTML='<span class="glyphicon glyphicon-plus"></span> Sisip';
					$("#nAlkes2").focus();
				}
				var td = c("td", tr);
				var div=c('div',td,'tKiri');
				div.innerHTML=h[2];
				div.setAttribute('title',h[2]);
				
				td = c("td", tr);
				div=c('div',td,'tKanan');
				div.innerHTML=h[3];
				td.setAttribute('title',h[3]);
				
				
				td = c("td", tr);
				var button=c('button',td,null,i+'_deletePA');
				button.setAttribute('type','button');
				button.innerHTML='Delete';
				button.onclick=function(){
					var id=this.id;
					noDelete=id.split('_')[0];
					ppkTi1.splice(noDelete,1);
					ppkTindak1(ppkTi1);
				}
				
			}
		}
		pilihanPPK1();
		$('#tindak1_table').fixheadertable({ 
			colratio	 : [300,60,50],
			width:435,
			height:cHeight-136,
			zebra:true
		});
	}
	
	var sPTUrut;
	function addTindakToPPK(){
		var resep2=[];
		resep2[0]=idTindakan;
		resep2[1]=e("alkes-id3").value;
		if(resep2[1]==""||resep2[1]==null){
			bootbox.alert("Pilih Tindakan!",function(){
					setTimeout(function(){$('#nAlkes2').focus();},10);
			});
			return;
		}
		var obat=e("nAlkes2").value;
		if(obat.length==0){
			bootbox.alert("Masukkan Tindakan!",function(){
				setTimeout(function(){$('#nAlkes2').focus();},10);
			});
			return;
		}
		resep2[2]=obat;
		var isQty=e("isQty2").value;
		if(isQty=='Y')
			var qty=e("jAlkes2").value;
		else
			var qty='1';
		var iNum=isNumber(qty);
		if(iNum==0){
			bootbox.alert("Masukkan Jumlah Yang Benar!",function(){
				setTimeout(function(){$('#jAlkes2').focus();},10);
			});
			return;
		}
		
		resep2[3]=qty;
		resep2[4]=true;
		resep2[5]='TINDAK';
		if(sPTUrut!=null)
			ppkTi1.splice(sFPUrut,0,resep2);
		else
			ppkTi1.push(resep2);
		e("formAlkes2").reset();
		$("#nAlkes2").focus();
		ppkTindak1(ppkTi1);
		sPTUrut=null;
		
}
	function searchAlkesP(nama,sum){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectAlkes',
			type : "post",
			data:{alkes:nama,jumlah:sum},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				sumPage=eval(sumPage)+16;
				tabelAddTindakanPPK(prod);
			},error : function(o){
			
			}
		});
	}
	function tabelAddTindakanPPK(prod){
		var content=e("addTindakanPPKBody");
		content.innerHTML="";
		var pilih="";
		var cWidth=bodyWidth*0.6;
		var cHeight=(bodyHeight*0.6)-48;
		var col=(cWidth-70);
		var divtable = c("div",content,"table-content");
		
		var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","FTinPPK_table");
		
		var thead=c("thead",table,"header");
		var tr = c("tr",thead);
		var th = c("th", tr);
		th.innerHTML="NAMA TINDAKAN";
			
		var tbody=c("tbody",table);
		if(prod.length!=0){
			for (var i=0;i<prod.length;i++) {
				var h = prod[i];
				tr = c("tr", tbody,null,h.NAMA_LAYAN1);
				tr.ondblclick=function(){
					var namaObat=this.id;
					$('#addTindakanPPKModal').modal('hide');
					e("alkes-id3").value=this.cells[0].id;
					var nama=e("nAlkes2");
					nama.value=namaObat;
					var isQty=this.cells[1].innerHTML;
					e("isQty2").value=isQty;
					if(isQty=='Y'){
						$('#jAlkes2').removeAttr('disabled');
						$('#jAlkes2').val('1');
						$('#jAlkes2').focus();
					}else
						$('#jAlkes2').attr('disabled',true);
				}
				tr.onkeydown=function(event){
					if(event.keyCode==13){
						var namaObat=this.id;
						$('#addTindakanPPKModal').modal('hide');
						e("alkes-id3").value=this.cells[0].id;
						var nama=e("nAlkes2");
						nama.value=namaObat;
						var isQty=this.cells[1].innerHTML;
						e("isQty2").value=isQty;
						if(isQty=='Y'){
							$('#jAlkes2').removeAttr('disabled');
							$('#jAlkes2').val(1);
							$('#jAlkes2').focus();
						}else
							$('#jAlkes2').attr('disabled',true);
					}
				}
				var td = c("td", tr,null,h.LAYAN_ID);
				td.innerHTML="<a class='activation' href=javascript:myClick()>"+h.NAMA_LAYAN1+"</a>";
				td.setAttribute('title',h.NAMA_LAYAN1);
				td.style.cssText='text-align:left';
				
				td = c("td", tr);
				td.innerHTML=h.ADAQTY;
				td.style.display='none';
			}
			pilih='#'+prod[0].LAYAN_ID;
		}
		var div=c('div',content);
		div.innerHTML="";
		if(prod.length==0)
			div.setAttribute('style','display:none');
		var button=c('button',div,null,'prevP3');
		button.setAttribute('type','button');
		button.innerHTML='<<';
		button.onclick=function(){
			var alkes=e('nAlkes2').value;
			sumPage=sumPage-32;
			searchAlkesP(alkes,sumPage);
		}	
		var button=c('button',div,null,'nextP3');
		button.setAttribute('type','button');
		button.innerHTML='>>';
		button.onclick=function(){
			var alkes=e('nAlkes2').value;
			searchAlkesP(alkes,sumPage);
		}
		if(prod.length!=16)
			$('#nextP3').attr('disabled',true);
		if(sumPage==17)
			$('#prevP3').attr('disabled',true);
		jQuery.tableNavigation();
		$('#FTinPPK_table').fixheadertable({ 
			height:380
		});
		
		$('#addTindakanPPKModal').on('shown.bs.modal', function () {
			$(pilih+' .activation').focus();
		});
		$(pilih+' .activation').focus();
	}
	function getLink(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectLinkResep',
			type : "post",
			data:{idEpisode:idEpisode},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					if(prod[0].ADA=='0'){
						e('ketResep').innerHTML="Tidak Ada Resep!";
						e('ketResep').style.cssText='color:black;padding-left:10px;font-size:30px;';
					}else if(prod[0].ADA=='1'){
						e('ketResep').innerHTML="Resep Sudah Terkirim!";
						e('ketResep').style.cssText='color:blue;padding-left:10px;font-size:30px;';
					}else if(prod[0].ADA=='2'){
						e('ketResep').innerHTML="Resep Belum Dikirim!";
						e('ketResep').style.cssText='color:red;padding-left:10px;font-size:30px;';
					}
				}else{
					e('ketResep').innerHTML="";
				}
			},error : function(o){
			
			}
		});
	}
	function selectMulaiPeriksa(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectMulaiPeriksa/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode},
			success : function(o)
			{
				var prod = o;
				if(prod>0){
					$('#mlp').attr('style','display:none;');
					enabledForm1();
					if(kunjungan>1)
						selectSOAPLM();
				}else{
					disabledForm();
					$('#mlp').removeAttr('style');
					$('#mlp').removeAttr('disabled');
				}
				
			},error : function(o){}
		});
	}
	function insertMulaiPeriksa(){
		$('#mlp').attr('disabled',true);
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertMulaiPeriksa/'+idUser,
			type : "post",
			data:{idEpisode:idEpisode,idTrans:idTrans,idPasien:idPasien,idPoli:idPoli},
			success : function(o)
			{
				var prod = o;
				selectMulaiPeriksa();
				getTotal();
			},error : function(o){}
		});
	}
	function deleteAlergi(alergi,tgl){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteAlergi',
			type : "post",
			data:{idPasien:idPasien,alergi:alergi,tanggal:tgl},
			success : function(o)
			{
				var prod = o;
				bootbox.alert('Data Alergi Sudah di Hapus!');
				pasienAlergi(idPasien,"tabelAlergi");
			},error:function(o)
			{}
		});
	}
	function insertLock(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertLock/'+idUser,
			type : "post",
			data:{idTransCo:idTransCo},
			success : function(o){},
			error : function(o){}
		});
	}
	function deleteLock(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/deleteLock',
			type : "post",
			data:{idTransCo:idTransCo},
			success : function(o){},
			error : function(o){}
		});
	}
	function selectSOAPLM(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAPLM',
			type : "post",	
			data : {idPasien:idPasien,idPoli:idPoli},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					e("S").value=h.S;
					e("O").value=h.O;
					e("A").value=h.A;
					e("P").value=h.P;
					autoSize("S");autoSize("S2");autoSize("S3");
					autoSize("O");autoSize("A");autoSize("P");
					$('#cSoap').removeAttr('disabled');
				}
			},error:function(o)
			{
				
			}
		});
	}
	var hasilLab=[];
	function sejarahReLab1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/sejarahReLab1',
			type : "post",
			data:{idEpisode:idEpisode,idPasien:idPasien},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				hasilLab=[];
				isiLabResume="";
				if(prod.length!=0){
					for(var i=0;i<prod.length;i++){
						var h=prod[i];
						labResumeR(h.SAMPEL);
					}
					
				}
			}
		});
	}
	function labResumeR(idSampel){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectHasilLab',
			type : "post",	
			data : {idPasien:mrn,idSampel:idSampel},
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				hasilLabResume(prod);
			}
		});
	}
	function hasilLabResume(prod){
		if(prod.length!=0){
			for(var i=0;i<prod.length;i++){
				var h=prod[i];
				var lab=[];
				lab[0]=h.TEST_ID;
				lab[1]=h.NAMA_TES;
				lab[2]=h.SUB_STRUCTURE_TYPE;
				lab[3]=h.RESULT_VALUE;
				if(h.UNITS!=null)
					lab[4]=h.UNITS;
				else
					lab[4]="";
				lab[5]=h.RESULT_FLAG;
				hasilLab.push(lab);
			}
			hasilLabResume1(hasilLab);
		}
	}
	var isiLabResume='';
	function hasilLabResume1(prod){
		 isiLabResume="";
		if(prod.length!=0){
		  for (var i=0;i<prod.length;i++) {
			var h = prod[i];
			var tes=h[1].replace(".","").trim();
			isiLabResume=isiLabResume+', '+ tes +' = '+h[3]+' '+h[4] ;
		  }
		  isiLabResume=isiLabResume.substring(1,isiLabResume.length);
		}
	}
	function insertDisplay(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/insertDisplay',
			type : "post",
			data:{idEpisode:idEpisode,no:no_urut,idPoli:idPoli,poli:poliklinik,ruang:ruangan,pasien:nama_pasien},
			success : function(o)
			{
				var prod = o;
			},error : function(o){}
		});
	}

	function asesmenrajal(){
		if(idPasien){
			Asesmen_Perawat();
			selectpasien();
			$('#asesmenrajal').modal('show');
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

	function asesmenlanjutanrajal(){
		if(idPasien){
			Asesmen_Dokter();
			selectpasien();
			$('#asesmenlanjutanrajal').modal('show');
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function form_Ringksasan(){
		if(idPasien){
			data_pasien();
			selectDiagnosa2();
			select_Dokter();
			$('#ringkasan').modal('show');
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

	function form_konsul(){
		if(idPasien){
			select_Dokter5();
			select_Ases_RJ2();
			$('#form_konsul').modal('show');
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	
	function form_transfer(){
		if(idPasien){
			selectTrans();
			selectLantai3();
			selectLantai2();
			Tampil_Asesmen_Lanjutan();
			Tampil_Asesmen_SOAP();
			Tampil_Diagnosa();
			$('#form_transfer').modal('show');
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

	function surat_pengatar_ri(){
		if(idPasien){
			select_penjamin();
			select_pasien();
			Tampil_Diagnosa();
			select_SOAP4();
			select_Ases_RJ1();
			selectLantai4();
			selectTrans();
			$('#surat_pengatar_ri').modal('show');
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}
	function save_pengantar(RUANG4,TRANS_ID4,TRANS_SOAP4,KELUHAN_UTAMA4,DN_UTAMA4,ICD4,DN_SEKUNDER1,ICD_4,TERAPI4){
		if(idPasien!=null){
		bootbox.confirm('Apakah Form Pengantar Rawat Inap akan di simpan?',function(result){
		if (result == true){
		
		var RUANG4 =$('#lantaiKamar4').val();
		var TRANS_ID4 =$('#TRANS_ID4').val();
		var TRANS_SOAP4 =$('#TRANS_SOAP4').val();
		var KELUHAN_UTAMA4 =$('#KELUHAN_UTAMA4').val();
		var DN_UTAMA4 =$('#DN_UTAMA4').val();
		var ICD4 =$('#ICD4').val();
		var DN_SEKUNDER1 =$('#DN_SEKUNDER1').val();
		var ICD_4 =$('#ICD_4').val();
		var TERAPI4 =$('#TERAPI4').val();
			$.ajax({
			url :base_url+'index.php/clinic_controller/save_pengantar/',
			type : "post",	
			data : {idEpisode:idEpisode,idPasien:idPasien,lantaiKamar4:RUANG4,TRANS_ID4:TRANS_ID4,TRANS_SOAP4:TRANS_SOAP4,
				KELUHAN_UTAMA4:KELUHAN_UTAMA4,DN_UTAMA4:DN_UTAMA4,ICD4:ICD4,DN_SEKUNDER1:DN_SEKUNDER1,ICD_4:ICD_4,TERAPI4:TERAPI4,idUser:idUser},
			success : function(o)
				{
					bootbox.alert('Data Pengantar Rawat Inap Sudah Tersimpan!');
					sudahDisimpan=true;
					$('#surat_pengatar_ri').modal('SHOW');
				},error:function(o){
					bootbox.alert('Data Pengantar Rawat Inap Gagal Tersimpan!');	
				}
			});		
		}
		});
		}
	}

	function save_ringkasan1(){
			if(idPasien!=null){
			bootbox.confirm('Apakah Ringkasan akan di simpan?',function(result){
			if (result == true){
			var TGL_MASUK=e('TGL_MASUK').value;
			if(TGL_MASUK.length==0){
				bootbox.alert('Silakan Isi Tanggal Masuk!',function(){
					setTimeout(function(){$("#TGL_MASUK").focus();},10);
				});
				return ;
			}
				var TEMPERATUR=e('TEMPERATUR').value;
				if(TEMPERATUR.length==0){
					bootbox.alert('Silakan Isi Vital Sign!',function(){
						setTimeout(function(){$("#TEMPERATUR").focus();},10);
					});
					return ;
				}
				var R_NADI=e('R_NADI').value;
				if(R_NADI.length==0){
						bootbox.alert('Silakan Isi Vital Sign!',function(){
							setTimeout(function(){$("#R_NADI").focus();},10);
						});
						return ;
				}
				var R_NAFAS=e('R_NAFAS').value;
				if(R_NAFAS.length==0){
						bootbox.alert('Silakan Isi Vital Sign!',function(){
							setTimeout(function(){$("#R_NAFAS").focus();},10);
						});
						return ;
				}
				var D_DIET=e('D_DIET').value;
				if(D_DIET.length==0){
						bootbox.alert('Silakan Isi Data Diet!',function(){
							setTimeout(function(){$("#D_DIET").focus();},10);
						});
						return ;
				}
				var D_EDUKASI=e('D_EDUKASI').value;
				if(D_EDUKASI.length==0){
						bootbox.alert('Silakan Isi Edukasi!',function(){
							setTimeout(function(){$("#D_EDUKASI").focus();},10);
						});
						return ;
				}
				var GCS_E=e('GCS_E').value;
				if(GCS_E.length==0){
						bootbox.alert('Silakan Isi GCS E!',function(){
							setTimeout(function(){$("#GCS_E").focus();},10);
						});
						return ;
				}
				var GCS_V=e('GCS_V').value;
				if(GCS_V.length==0){
						bootbox.alert('Silakan Isi GCS V!',function(){
							setTimeout(function(){$("#GCS_V").focus();},10);
						});
						return ;
				}
				var GCS_M=e('GCS_M').value;
				if(GCS_M.length==0){
						bootbox.alert('Silakan Isi GCS M!',function(){
							setTimeout(function(){$("#GCS_M").focus();},10);
						});
						return ;
				}

				var ALERGI=e('ALERGI').value;
				if(ALERGI.length==0){
						bootbox.alert('Silakan Isi Alergi!',function(){
							setTimeout(function(){$("#ALERGI").focus();},10);
						});
						return ;
				}
				var INTRUKSI_KE1=e('INTRUKSI_KE1').value;
				if(INTRUKSI_KE1.length==0){
						bootbox.alert('Silakan Isi Intruksi!',function(){
							setTimeout(function(){$("#INTRUKSI_KE1").focus();},10);
						});
						return ;
				}
				var TGL_INTRUKSI1=e('TGL_INTRUKSI1').value;
				if(TGL_INTRUKSI1.length==0){
						bootbox.alert('Silakan Isi Tgl. Intruksi!',function(){
							setTimeout(function(){$("#TGL_INTRUKSI1").focus();},10);
						});
						return ;
				}
			var TGL_KELUAR=$('#TGL_KELUAR').val();
			var CARA_PULANG =$('#CARA_PULANG').val();
			var DOKTER1 =$('#DOKTER1').val();
			var DOKTER2=$('#DOKTER2').val();
			var DOKTER3 =$('#DOKTER3').val();   
			var TRANS_ID1 =$('#TRANS_ID1').val();
			var TRANS_SOAP1 =$('#TRANS_SOAP1').val();
			var KELUHAN_UTAMA=$('#KELUHAN_UTAMA').val();
			var D_UTAMA=$('#D_UTAMA').val();
			var ICD10_1=$('#ICD10_1').val();
			var D_SEKUNDER=$('#D_SEKUNDER').val();
			var ICD10_2=$('#ICD10_2').val();
			var P_TINDAKAN=$('#P_TINDAKAN').val();
			var ICD9=$('#INTRUKSI_KE2').val();
			var PEMERIKSAAN_MEDIK=$('#PEMERIKSAAN_MEDIK').val();
			var P_FISIK3=$('#P_FISIK3').val();
			var INTRUKSI_KE2 =$('#INTRUKSI_KE2').val();
			var TGL_INTRUKSI2=$('#TGL_INTRUKSI2').val();
			var PEMERIKSAAN_TERAPI=$('#PEMERIKSAAN_TERAPI').val();
			$.ajax({
				url :base_url+'index.php/clinic_controller/save_ringkasan1/',
				type : "post",	
				data : {idEpisode:idEpisode,idPasien:idPasien,TGL_MASUK:TGL_MASUK,TGL_KELUAR:TGL_KELUAR,
					ALERGI:ALERGI,CARA_PULANG:CARA_PULANG,DOKTER1:DOKTER1,DOKTER2:DOKTER2,DOKTER3:DOKTER3,
					TRANS_ID1:TRANS_ID1,TRANS_SOAP1:TRANS_SOAP1,KELUHAN_UTAMA:KELUHAN_UTAMA,D_UTAMA:D_UTAMA,ICD10_1:ICD10_1,D_SEKUNDER:D_SEKUNDER,
					ICD10_2:ICD10_2,P_TINDAKAN:P_TINDAKAN,ICD9:ICD9,PEMERIKSAAN_MEDIK:PEMERIKSAAN_MEDIK,P_FISIK3:P_FISIK3,
					INTRUKSI_KE1:INTRUKSI_KE1,TGL_INTRUKSI1:TGL_INTRUKSI1,INTRUKSI_KE2:INTRUKSI_KE2,TGL_INTRUKSI2:TGL_INTRUKSI2,
					D_DIET:D_DIET,D_EDUKASI:D_EDUKASI,idUser:idUser,GCS_E:GCS_E,GCS_M:GCS_M,GCS_V:GCS_V,GCS_M:GCS_M,PEMERIKSAAN_TERAPI:PEMERIKSAAN_TERAPI},
				success : function(o)
				{
					bootbox.alert('Data Ringkasan Sudah Tersimpan!');
					sudahDisimpan=true;
					$('#ringkasan').modal('show');
				},error:function(o){
					bootbox.alert('Data Ringkasan Gagal Tersimpan!');	
				}
				});		
				}
			});
		}
	}

	function save_Asesmen_Perawat(ANAMNESE,PSIKOLOGIS,TRANS_ID2,TRANS_SOAP2,RD2,RK2,RO2,SK_NYERI,R_JATUH1,R_JATUH2,TINDAKAN2,K_FUNSIONAL,R_NUTRISIONAL1,
		R_NUTRISIONAL2,IMT2,P_FISIK,P_KEPERAWATAN,K_EDUKASI,NAMA_USER){
		if(idPasien!=null){
		bootbox.confirm('Apakah Asesmen akan di simpan?',function(result){
		if (result == true){
		
			var ANAMNESE=e('ANAMNESE').value;
			if(ANAMNESE.length==0){
				bootbox.alert('Silakan Isi Tanggal Anamnese!',function(){
					setTimeout(function(){$("#ANAMNESE").focus();},10);
				});
				return ;
			}
			var SK_NYERI=e('SK_NYERI').value;
			if(SK_NYERI.length==0){
				bootbox.alert('Silakan Isi Skala Nyeri !',function(){
					setTimeout(function(){$("#SK_NYERI").focus();},10);
				});
				return ;
			}
			var PSIKOLOGIS =$('#PSIKOLOGIS').val();			
			var TRANS_ID2 =$('#TRANS_ID2').val();
			var TRANS_SOAP2 =$('#TRANS_SOAP2').val();
			var RD2 =$('#RD2').val();			
			var RK2 =$('#RK2').val();
			var RO2 =$('#RO2').val();
			var R_JATUH1 =$('#R_JATUH1').val();
			var R_JATUH2 =$('#R_JATUH2').val();
			var TINDAKAN2 =$('#TINDAKAN2').val();
			var K_FUNSIONAL =$('#K_FUNSIONAL').val();
			var K_EDUKASI =$('#K_EDUKASI').val();
			var R_NUTRISIONAL1 =$('#R_NUTRISIONAL1').val();
			var R_NUTRISIONAL2=$('#R_NUTRISIONAL2').val();
			var IMT2=$('#IMT2').val();
			var P_FISIK=$('#P_FISIK').val();
			var P_KEPERAWATAN=$('#P_KEPERAWATAN').val();
			var NAMA_USER=$('#NAMA_USER').val();
		$.ajax({
		url :base_url+'index.php/clinic_controller/save_Asesmen_Perawat/',
		type : "post",	
		data : {idEpisode:idEpisode,idPasien:idPasien,ANAMNESE:ANAMNESE,PSIKOLOGIS:PSIKOLOGIS,TRANS_ID2:TRANS_ID2,TRANS_SOAP2:TRANS_SOAP2,
			RD2:RD2,RK2:RK2,RO2:RO2,
			SK_NYERI:SK_NYERI,R_JATUH1:R_JATUH1,R_JATUH2:R_JATUH2,TINDAKAN2:TINDAKAN2,
			K_FUNSIONAL:K_FUNSIONAL,R_NUTRISIONAL1:R_NUTRISIONAL1,
			R_NUTRISIONAL2:R_NUTRISIONAL2,IMT2:IMT2,P_FISIK:P_FISIK,P_KEPERAWATAN:P_KEPERAWATAN,
			K_EDUKASI:K_EDUKASI,NAMA_USER:NAMA_USER},
		success : function(o)
				{
				bootbox.alert('Data Asesmen Sudah Tersimpan!');
				sudahDisimpan=true;
				$('#asesmenrajal').modal('hide');
			},error:function(o){
				bootbox.alert('Data Asesmen Gagal Tersimpan!');	
			}
				});		
		}
		});
	}
	}

	function save_asesmen2(TRANS_ID3,TRANS_SOAP3,KELUHAN_UTAMA2,TELAAH2,GCSE2,GCSV2,GCSM2,T_DARAH12,T_DARAH22,TEMPERATUR2,D_NADI2,N_FAFAS2,SATURASI_O22,
		LOKALIS2,P_FISIK2,P_MEDIK2,TERAPI2,RENCANA2,TGL_RENCANA2,DN_UTAMA2,ICD_102,DN_SEKUNDER2,ICD_103){
		if(idPasien!=null){
		bootbox.confirm('Apakah Asesmen akan di simpan?',function(result){
		if (result == true){
		
			var GCSE2=e('GCSE2').value;
			if(GCSE2.length==0){
				bootbox.alert('Silakan Isi GCS E!',function(){
					setTimeout(function(){$("#GCSE2").focus();},10);
				});
				return ;
			}
			var GCSV2=e('GCSV2').value;
			if(GCSV2.length==0){
				bootbox.alert('Silakan Isi GCS V !',function(){
					setTimeout(function(){$("#GCSV2").focus();},10);
				});
				return ;
			}

			var GCSM2=e('GCSM2').value;
			if(GCSM2.length==0){
				bootbox.alert('Silakan Isi GCS M !',function(){
					setTimeout(function(){$("#GCSM2").focus();},10);
				});
				return ;
			}

			var T_DARAH12=e('T_DARAH12').value;
			if(T_DARAH12.length==0){
				bootbox.alert('Silakan Isi Tekanan Darah !',function(){
					setTimeout(function(){$("#T_DARAH12").focus();},10);
				});
				return ;
			}

			var TEMPERATUR2=e('TEMPERATUR2').value;
			if(TEMPERATUR2.length==0){
				bootbox.alert('Silakan Isi Temperatur !',function(){
					setTimeout(function(){$("#TEMPERATUR2").focus();},10);
				});
				return ;
			}

			var P_MEDIK2=e('P_MEDIK2').value;
			if(P_MEDIK2.length==0){
				bootbox.alert('Silakan Isi Pemeriksaan Medik !',function(){
					setTimeout(function(){$("#P_MEDIK2").focus();},10);
				});
				return ;
			}

			var TERAPI2=e('TERAPI2').value;
			if(TERAPI2.length==0){
				bootbox.alert('Silakan Isi Terapi !',function(){
					setTimeout(function(){$("#TERAPI2").focus();},10);
				});
				return ;
			}
			var TGL_RENCANA2=e('TGL_RENCANA2').value;
			if(TGL_RENCANA2.length==0){
				bootbox.alert('Silakan Isi Tanggal Rencana !',function(){
					setTimeout(function(){$("#TGL_RENCANA2").focus();},10);
				});
				return ;
			}
			var KELUHAN_UTAMA2=$('#KELUHAN_UTAMA2').val();
			var TELAAH2=$('#TELAAH2').val();
			var TRANS_ID3 =$('#TRANS_ID3').val();
			var TRANS_SOAP3 =$('#TRANS_SOAP3').val();
			var T_DARAH22 =$('#T_DARAH22').val();
			var D_NADI2 =$('#D_NADI2').val();
			var N_FAFAS2 =$('#N_FAFAS2').val();
			var SATURASI_O22 =$('#SATURASI_O22').val();
			var LOKALIS2 =$('#LOKALIS2').val();
			var P_FISIK2=$('#P_FISIK2').val();
			var RENCANA2 =$('#RENCANA2').val();
			var DN_UTAMA2=$('#DN_UTAMA2').val();
			var ICD_102=$('#ICD_102').val();
			var DN_SEKUNDER2=$('#DN_SEKUNDER2').val();
			var ICD_103=$('#ICD_103').val();
		$.ajax({
		url :base_url+'index.php/clinic_controller/save_asesmen2/',
		type : "post",	
		data : {idEpisode:idEpisode,idPasien:idPasien,TRANS_ID3:TRANS_ID3,TRANS_SOAP3:TRANS_SOAP3,KELUHAN_UTAMA2:KELUHAN_UTAMA2,TELAAH2:TELAAH2,GCSE2:GCSE2,GCSV2:GCSV2,GCSM2:GCSM2,
			T_DARAH12:T_DARAH12,T_DARAH22:T_DARAH22,TEMPERATUR2:TEMPERATUR2,D_NADI2:D_NADI2,N_FAFAS2:N_FAFAS2,SATURASI_O22:SATURASI_O22,
			LOKALIS2:LOKALIS2,P_FISIK2:P_FISIK2,P_MEDIK2:P_MEDIK2,TERAPI2:TERAPI2,RENCANA2:RENCANA2,TGL_RENCANA2:TGL_RENCANA2,
			DN_UTAMA2:DN_UTAMA2,ICD_102:ICD_102,DN_SEKUNDER2:DN_SEKUNDER2,ICD_103:ICD_103,idUser:idUser},
		success : function(o)
				{
				bootbox.alert('Data Asesmen Sudah Tersimpan!');
				sudahDisimpan=true;
				$('#asesmenrajal').modal('hide');
			},error:function(o){
				bootbox.alert('Data Asesmen Gagal Tersimpan!');	
			}
				});		
		}
		});
	}
	}

	function save_Asesmen_Dokter(TRANS_ID2,TRANS_SOAP2,KELUHAN_UTAMA1,TELAAH,GCSE1,GCSV1,GCSM1,T_DARAH1,T_DARAH2,TEMPERATUR1,D_NADI1,N_FAFAS,SATURASI_O2,
		LOKALIS,P_FISIK1,P_MEDIK1,P_TERAPI1,RENCANA1,TGL_RENCANA1){
		if(idPasien!=null){
		bootbox.confirm('Apakah Asesmen akan di simpan?',function(result){
		if (result == true){
		
			var GCSE1=e('GCSE1').value;
			if(GCSE1.length==0){
				bootbox.alert('Silakan Isi GCS E!',function(){
					setTimeout(function(){$("#GCSE1").focus();},10);
				});
				return ;
			}
			var GCSV1=e('GCSV1').value;
			if(GCSV1.length==0){
				bootbox.alert('Silakan Isi GCS V !',function(){
					setTimeout(function(){$("#GCSV1").focus();},10);
				});
				return ;
			}

			var GCSM1=e('GCSM1').value;
			if(GCSM1.length==0){
				bootbox.alert('Silakan Isi GCS M !',function(){
					setTimeout(function(){$("#GCSM1").focus();},10);
				});
				return ;
			}

			var T_DARAH1=e('T_DARAH1').value;
			if(T_DARAH1.length==0){
				bootbox.alert('Silakan Isi Tekanan Darah !',function(){
					setTimeout(function(){$("#T_DARAH1").focus();},10);
				});
				return ;
			}

			var TEMPERATUR1=e('TEMPERATUR1').value;
			if(TEMPERATUR1.length==0){
				bootbox.alert('Silakan Isi Temperatur !',function(){
					setTimeout(function(){$("#TEMPERATUR1").focus();},10);
				});
				return ;
			}

			var P_MEDIK1=e('P_MEDIK1').value;
			if(P_MEDIK1.length==0){
				bootbox.alert('Silakan Isi Pemeriksaan Medik !',function(){
					setTimeout(function(){$("#P_MEDIK1").focus();},10);
				});
				return ;
			}

			var P_TERAPI1=e('P_TERAPI1').value;
			if(P_TERAPI1.length==0){
				bootbox.alert('Silakan Isi Terapi !',function(){
					setTimeout(function(){$("#P_TERAPI1").focus();},10);
				});
				return ;
			}
			var TGL_RENCANA1=e('TGL_RENCANA1').value;
			if(TGL_RENCANA1.length==0){
				bootbox.alert('Silakan Isi Tanggal Rencana !',function(){
					setTimeout(function(){$("#TGL_RENCANA1").focus();},10);
				});
				return ;
			}
			var KELUHAN_UTAMA1=$('#KELUHAN_UTAMA1').val();
			var TELAAH=$('#TELAAH').val();
			var TRANS_ID2 =$('#TRANS_ID2').val();
			var TRANS_SOAP2 =$('#TRANS_SOAP2').val();
			var T_DARAH2 =$('#T_DARAH2').val();
			var D_NADI1 =$('#D_NADI1').val();
			var N_FAFAS =$('#N_FAFAS').val();
			var SATURASI_O2 =$('#SATURASI_O2').val();
			var LOKALIS =$('#LOKALIS').val();
			var RENCANA1 =$('#RENCANA1').val();
			var P_FISIK1 =$('#P_FISIK1').val();
			var DN_UTAMA1=$('#DN_UTAMA1').val();
			var ICD_10=$('#ICD_10').val();
			var DN_SEKUNDER=$('#DN_SEKUNDER').val();
			var ICD_11=$('#ICD_11').val();
		$.ajax({
		url :base_url+'index.php/clinic_controller/save_Asesmen_Dokter/',
		type : "post",	
		data : {idEpisode:idEpisode,idPasien:idPasien,TRANS_ID2:TRANS_ID2,TRANS_SOAP2:TRANS_SOAP2,KELUHAN_UTAMA1:KELUHAN_UTAMA1,TELAAH:TELAAH,GCSE1:GCSE1,GCSV1:GCSV1,GCSM1:GCSM1,
			T_DARAH1:T_DARAH1,T_DARAH2:T_DARAH2,TEMPERATUR1:TEMPERATUR1,D_NADI1:D_NADI1,N_FAFAS:N_FAFAS,SATURASI_O2:SATURASI_O2,
			LOKALIS:LOKALIS,P_FISIK1:P_FISIK1,P_MEDIK1:P_MEDIK1,P_TERAPI1:P_TERAPI1,RENCANA1:RENCANA1,TGL_RENCANA1:TGL_RENCANA1,DN_UTAMA1:DN_UTAMA1,ICD_10:ICD_10,DN_SEKUNDER:DN_SEKUNDER,ICD_11:ICD_11,idUser:idUser},
		success : function(o)
				{
				bootbox.alert('Data Asesmen Sudah Tersimpan!');
				sudahDisimpan=true;
				$('#asesmenrajal').modal('hide');
			},error:function(o){
				bootbox.alert('Data Asesmen Gagal Tersimpan!');	
			}
				});		
		}
		});
	}
	}

	function data_pasien(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/data_pasien',
			type : "post",	
			data : {idEpisode:idEpisode,idPasien:idPasien},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#TGL_MASUK1').val(h.TGL_MASUK);
					$('#REKANAN').val(h.NAMA);
					$('#DOKTER1').val(h.NAMA_DOKTER);
					$('#DOKTER_CREATED').val(h.NAMA_DOKTER);
					selectSOAP1();
					selectDiagnosa1();
					Asesmen_Dokter();
					select_FISIK();
					selectTrans();
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectSOAP1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#R_DAHULU').val(h.S2);
					$('#R_KELUARGA').val(h.S3);
					$('#P_FISIK3').val(h.O);
					$('#KELUHAN_UTAMA').val(h.S);
					$('#DOKTER_CREATED').val(h.DOKTER);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectDiagnosa2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectDiagnosa1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#DN_UTAMA').val(h.DIAGNOSA);
					$('#ICD10_1').val(h.ICD10);

					// UNTUK FORM RINGKASAN PASIEN PULANG
					$('#D_SEKUNDER').val(h.DIAGNOSA);
					$('#ICD10_2').val(h.ICD10);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function Asesmen_Dokter(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/Asesmen_Dokter',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#GCS_E').val(h.GCS_E);
					$('#GCS_V').val(h.GCS_V);
					$('#GCS_M').val(h.GCS_M);
					$('#T_D1').val(h.TKN_DARAH1);
					$('#T_D2').val(h.TKN_DARAH2);
					$('#TEMPERATUR').val(h.TEMP);
					$('#R_NADI').val(h.NADI);
					$('#R_NAFAS').val(h.NAFAS);
					$('#S_o2').val(h.O2);
					$('#CARA_PULANG').val(h.TINDAK_LANJUT);
					$('#PEMERIKSAAN_TERAPI').val(h.P_TERAPI);

					// UNTUK ASESMEN AWAL DOKTER
					$('#GCSE1').val(h.GCS_E);
					$('#GCSV1').val(h.GCS_V);
					$('#GCSM1').val(h.GCS_M);
					$('#T_DARAH1').val(h.TKN_DARAH1);
					$('#T_DARAH2').val(h.TKN_DARAH2);
					$('#TEMPERATUR1').val(h.TEMP);
					$('#D_NADI1').val(h.NADI);
					$('#N_FAFAS').val(h.NAFAS);
					$('#SATURASI_O2').val(h.O2);
					$('#LOKALIS').val(h.GMBR_LOKALITAS);
					$('#P_MEDIK1').val(h.P_MEDIK);
					$('#P_TERAPI1').val(h.P_TERAPI);
					$('#RENCANA1').val(h.TINDAK_LANJUT);
					$('#TGL_RENCANA1').val(h.TGL_RENCANA);

					// UNTUK ASESMEN LANJUTAN DOKTER
					$('#GCSE2').val(h.GCS_E);
					$('#GCSV2').val(h.GCS_V);
					$('#GCSM2').val(h.GCS_M);
					$('#T_DARAH12').val(h.TKN_DARAH1);
					$('#T_DARAH22').val(h.TKN_DARAH2);
					$('#TEMPERATUR2').val(h.TEMP);
					$('#D_NADI2').val(h.NADI);
					$('#N_FAFAS2').val(h.NAFAS);
					$('#SATURASI_O22').val(h.O2);
					$('#LOKALIS2').val(h.GMBR_LOKALITAS);
					$('#P_MEDIK2').val(h.P_MEDIK);
					$('#TERAPI2').val(h.P_TERAPI);
					$('#RENCANA2').val(h.TINDAK_LANJUT);
					$('#TGL_RENCANA2').val(h.TGL_RENCANA);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function Asesmen_Perawat(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/Asesmen_Perawat',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					// UNTUK ASESMEN AWAL PERAWAT
					$('#ANAMNESE').val(h.ANAMNESE);
					$('#PSIKOLOGIS').val(h.PSIKOLOGIS);
					$('#RD2').val(h.S1);
					$('#RK2').val(h.S2);
					$('#RO2').val(h.S3);
					$('#SK_NYERI').val(h.SK_NYERI);
					$('#R_JATUH1').val(h.R_JATUH1);
					$('#R_JATUH2').val(h.R_JATUH2);
					$('#TINDAKAN2').val(h.TINDAKAN);
					$('#K_FUNSIONAL').val(h.K_FUNSIONAL);
					$('#R_NUTRISIONAL1').val(h.R_NUTRISIONAL1);
					$('#R_NUTRISIONAL2').val(h.R_NUTRISIONAL2);
					$('#IMT2').val(h.IMT);
					$('#P_FISIK').val(h.P_FISIK);
					$('#P_KEPERAWATAN').val(h.P_KEPERAWATAN);
					$('#K_EDUKASI').val(h.K_EDUKASI);
					$('#NAMA_USER').val(h.USER_ID);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_FISIK(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_FISIK',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#PEMERIKSAAN_MEDIK').val(h.CAPTION);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectTrans(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];

					$('#TRANS_ID1').val(h.TRANS_ID);
					$('#TRANS_SOAP1').val(h.TRANS_SOAP);

					$('#TRANS_ID2').val(h.TRANS_ID);
					$('#TRANS_SOAP2').val(h.TRANS_SOAP);

					$('#TRANS_ID3').val(h.TRANS_ID);
					$('#TRANS_SOAP3').val(h.TRANS_SOAP);

					$('#TRANS_ID4').val(h.TRANS_ID);
					$('#TRANS_SOAP4').val(h.TRANS_SOAP);

					//TRANSER
					$('#TRANS_ID02').val(h.TRANS_ID);
					$('#TRANS_SOAP02').val(h.TRANS_SOAP);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectpasien(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectpasien',
			type : "post",	
			data : {idPasien:idPasien},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#SOSIAL1').val(h.SOSIAL);
					$('#SPRITUAL1').val(h.AGMA);
					$('#EKONOMI1').val(h.KERJA);
					$('#KULTURAL1').val(h.SUKU1);
					selectSOAP2();
					data_perawat();
					selectVital1();
					selectDiagnosa2();
					select_Dokter();
					selectTrans();
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectSOAP2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#RD2').val(h.S2);
					$('#RK2').val(h.S3);
					$('#P_FISIK').val(h.O);
					$('#P_FISIK1').val(h.O);
					$('#P_FISIK2').val(h.O);
					$('#KELUHAN_UTAMA1').val(h.S);
					$('#KELUHAN_UTAMA2').val(h.S);
					$('#TELAAH').val(h.S);
				//	$('#TELAAH2').val(h.S);
					$('#TERAPI2').val(h.P);
					$('#P_TERAPI1').val(h.P);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function data_perawat(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectKet1',
			type : "post",	
			data : {idTrans:idTrans},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#NAMA_USER').val(h.SUSTER);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_Dokter(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#NAMA_DOKTER').val(h.NAMA_DOKTER);
					$('#NAMA_DOKTER2').val(h.DOKTER);
				
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectVital1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectVital1',
			type : "post",	
			data : {idTrans:idTrans},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#IMT2').val(h.ANT_IMT);
					$('#T_DARAH1').val(h.TD_DOKTER);
					$('#T_DARAH2').val(h.TD2_DOKTER);
					$('#TEMPERATUR1').val(h.SUHU_DOKTER);
					$('#D_NADI1').val(h.FNADI_DOKTER);

					$('#T_DARAH12').val(h.TD_DOKTER);
					$('#T_DARAH22').val(h.TD2_DOKTER);
					$('#TEMPERATUR2').val(h.SUHU_DOKTER);
					$('#D_NADI2').val(h.FNADI_DOKTER);
					$('#N_FAFAS2').val(h.FNAFAS_DOKTER);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectDiagnosa1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectDiagnosa1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#DN_UTAMA1').val(h.DIAGNOSA);
					$('#ICD_10').val(h.ICD10);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectDiagnosa2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/Tampil_Diagnosa',
			type : "post",	
			data : {idPasien:idPasien,idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];

					$('#D_UTAMA').val(h.DIAGNOSA);
					$('#ICD10_1').val(h.ICD1);

					$('#DN_UTAMA1').val(h.DIAGNOSA);
					$('#ICD_10').val(h.ICD1);

					$('#DN_UTAMA2').val(h.DIAGNOSA);
					$('#ICD_102').val(h.ICD1);

					
				}
			},error:function(o)
			{
				
			}
		});
	}

	function Cetak_Asesmen(){
		if(idPasien){
			var win = window.open(base_url+'index.php/laporan/Asesmen_Awal/'+idEpisode,"_blank");	
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

	function Cetak_Ringkasan(){
		if(idPasien){
			var win = window.open(base_url+'index.php/laporan/Ringkasan/'+idEpisode,"_blank");	
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

	function Asesmen_Lanjutan(){
		if(idPasien){
			var win = window.open(base_url+'index.php/laporan/Asesmen_Lanjutan/'+idEpisode,"_blank");	
		}else
			bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
	}

//UNTUK PENGANTAR RAWAT INAP
	function select_penjamin(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_penjamin',
			type : "post",	
			data : {idPasien:idPasien},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#NAMA_PENJAMIN').val(h.NAMA);
					$('#NAMA_DOKTER').val(h.NAMA_DOKTER);
					$('#NAMA_DOKTER3').val(h.NAMA_DOKTER);
					$('#DOKTER0').val(h.NAMA_DOKTER);
					$('#PENJAMIN0').val(h.NAMA);
					$('#NAMA_DOKTER0').val(h.NAMA_DOKTER);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_pasien(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_pasien',
			type : "post",	
			data : {idPasien:idPasien},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#NM_PASIEN').val(h.NAMA);
					$('#TGL_LAHIR').val(h.TGL_LAHIR1);
					$('#NO_RM').val(h.PASIEN_ID);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_DIAG(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/Tampil_Diagnosa',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#DN_UTAMA3').val(h.DIAGNOSA);
					$('#ICD3').val(h.ICD1);

					
					
					$('#DN_UTAMA5').val(h.DIAGNOSA);
					$('#ICD5').val(h.ICD1);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_SOAP4(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectSOAP1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#KELUHAN_UTAMA4').val(h.S);
					$('#SOPA1').val(h.S);

					$('#PEM_FISIK').val(h.O);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_Ases_RJ(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_Ases_RJ',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#NAMA_DOKTER4').val(h.NAMA_DOKTER);
					$('#TERAPI4').val(h.P_TERAPI);
					//Untuk Form Transfer
					$('#PEN_MEDIK').val(h.P_MEDIK);
					$('#TERAPI5').val(h.P_TERAPI);
					$('#GCS_E5').val(h.GCS_E);
					$('#GCS_V5').val(h.GCS_V);
					$('#GCS_M5').val(h.GCS_M);
					$('#T_DARAH5').val(h.TKN_DARAH1);
					$('#T_DARAH52').val(h.TKN_DARAH2);
					$('#TEMPERATUR5').val(h.TEMP);
					$('#NADI5').val(h.NADI);
					$('#NAFAS5').val(h.NAFAS);
					$('#SATURASI5').val(h.O2);
				}
			},error:function(o)
			{
				
			}
		});
	}

	function select_Ases_RJ1(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_Ases_RJ1',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					$('#TERAPI4').val(h.P_TERAPI);
				
				}
			},error:function(o)
			{
				
			}
		});
	}

	function selectLantai4(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectLantai',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("lantaiKamar4");
				content.innerHTML="";
				var option=c("option",content);
				option.value="";
				option.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.UNIT_ID;
						option.innerHTML=h.NAMA_UNIT;
					}
					/*pasienDokter(prod[0].UNIT_ID);
					$( "#lantaiKamar" ).change(function() {
							var str=$( "#lantaiKamar option:selected" ).val();
							pasienDokter(str);
					});*/
				}
				
			},error:function(o)
			{		
			
			}
		});
	}

	function selectLantai3(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectLantai',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("lantaiKamar3");
				content.innerHTML="";
				var option=c("option",content);
				option.value="";
				option.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.UNIT_ID;
						option.innerHTML=h.NAMA_UNIT;
					}
					/*pasienDokter(prod[0].UNIT_ID);
					$( "#lantaiKamar" ).change(function() {
							var str=$( "#lantaiKamar option:selected" ).val();
							pasienDokter(str);
					});*/
				}
				
			},error:function(o)
			{		
			
			}
		});
	}
	function selectLantai2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/selectLantai',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("lantaiKamar2");
				content.innerHTML="";
				var option=c("option",content);
				option.value="";
				option.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.UNIT_ID;
						option.innerHTML=h.NAMA_UNIT;
					}
					/*pasienDokter(prod[0].UNIT_ID);
					$( "#lantaiKamar" ).change(function() {
							var str=$( "#lantaiKamar option:selected" ).val();
							pasienDokter(str);
					});*/
				}
				
			},error:function(o)
			{		
			
			}
		});
	}

	function select_Dokter5(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_Dokter5',
			type : "post",
			dataType : "json",
			success : function(o)
			{
				var prod = o;
				var content = e("dokter_konsul");
				content.innerHTML="";
				if(prod.length!=0){
					for (var i=0;i<prod.length;i++) {
						var h = prod[i];
						var option=c("option",content);
						option.value=h.DOKTER_ID;
						option.innerHTML=h.NAMA;
					}
				}
			},error:function(o)
			{		
			
			}
		});
	}

	function select_Ases_RJ2(){
		$.ajax({
			url :base_url+'index.php/clinic_controller/select_Asesmen_perawat2',
			type : "post",	
			data : {idEpisode:idEpisode},
			dataType:'json',
			success : function(o)
			{
				var prod = o;
				if(prod.length!=0){
					var h=prod[0];
					//Untuk Form Konsul
					$('#P_DAHULU3').val(h.S1);
					$('#R_ALERGI3').val(h.S2);
					$('#R_OBAT3').val(h.S3);

					
				}
			},error:function(o)
			{
				
			}
		});
	}

//AKHIR UNTUK PENGANTAR RAWAT INAP
function Cetak_Pengantar(){
	if(idPasien){
		var win = window.open(base_url+'index.php/laporan/Pengantar/'+idEpisode,"_blank");	
	}else
		bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
}

//FORM TRANSFER
function save_Transfer(TRANS_ID2,TRANS_SOAP2,TRANS1,TRANS2,lantaiKamar2,lantaiKamar3,TRANS3,TRANS4,TRANS5,TRANS6,TRANS7,TRANS8,TRANS9,TRANS10,TRANS11,
	TRANS12,TRANS13,TRANS14,TRANS15,TRANS16,TRANS17,TRANS18,TRANS19,TRANS20,TRANS21,TRANS22,TRANS23,
	TRANS24,TRANS25,TRANS26,TRANS27,TRANS28){
	if(idPasien!=null){
	bootbox.confirm('Apakah Asesmen akan di simpan?',function(result){
	if (result == true){
		var TRANS_ID2=$('#TRANS_ID2').val();
		var TRANS_SOAP2=$('#TRANS_SOAP2').val();
		var	TRANS1=$('#TRANS1').val();
		var TRANS2=$('#TRANS2').val();
		var lantaiKamar2=$('#lantaiKamar2').val();
		var lantaiKamar3=$('#lantaiKamar3').val();
		var TRANS3=$('#TRANS3').val();
		var TRANS4=$('#TRANS4').val();
		var TRANS5=$('#TRANS5').val();
		var TRANS6=$('#TRANS6').val();
		var TRANS7=$('#TRANS7').val();
		var TRANS8=$('#TRANS8').val();
		var TRANS9=$('#TRANS9').val();
		var TRANS10=$('#TRANS10').val();
		var TRANS11=$('#TRANS11').val();
		var TRANS12=$('#TRANS12').val();
		var TRANS13=$('#TRANS13').val();
		var TRANS14=$('#TRANS14').val();
		var TRANS15=$('#TRANS15').val();
		var TRANS16=$('#TRANS16').val();
		var TRANS17=$('#TRANS17').val();
		var TRANS18=$('#TRANS18').val();
		var TRANS19=$('#TRANS19').val();
		var TRANS20=$('#TRANS20').val();
		var TRANS21=$('#TRANS21').val();
		var TRANS22=$('#TRANS22').val();
		var TRANS23=$('#TRANS23').val();
		var TRANS24=$('#TRANS24').val();
		var TRANS25=$('#TRANS25').val();
		var TRANS26=$('#TRANS26').val();
		var TRANS27=$('#TRANS27').val();
		var TRANS28=$('#TRANS28').val();
	$.ajax({
	url :base_url+'index.php/clinic_controller/simpan_tranfer/',
	type : "post",	
	data : {idEpisode:idEpisode,idPasien:idPasien,TRANS_ID2:TRANS_ID2,TRANS_SOAP2:TRANS_SOAP2,TRANS1:TRANS1,lantaiKamar2:lantaiKamar2,lantaiKamar3:lantaiKamar3,TRANS2:TRANS2,TRANS3:TRANS3,TRANS4:TRANS4,TRANS5:TRANS5,
		TRANS6:TRANS6,TRANS7:TRANS7,TRANS8:TRANS8,TRANS9:TRANS9,TRANS10:TRANS10,TRANS11:TRANS11,TRANS12:TRANS12,TRANS13:TRANS13,
		TRANS14:TRANS14,TRANS15:TRANS15,TRANS16:TRANS16,TRANS17:TRANS17,TRANS18:TRANS18,TRANS19:TRANS19,TRANS20:TRANS20,TRANS21:TRANS21,
		TRANS22:TRANS22,TRANS23:TRANS23,TRANS24:TRANS24,TRANS25:TRANS25,TRANS26:TRANS26,TRANS27:TRANS27,TRANS28:TRANS28,idUser:idUser},
	success : function(o)
			{
			bootbox.alert('Data Asesmen Sudah Tersimpan!');
			sudahDisimpan=true;
			$('#form_transfer').modal('SHOW');
		},error:function(o){
			bootbox.alert('Data Asesmen Gagal Tersimpan!');	
		}
			});		
	}
	});
}
}
function Tampil_Asesmen_SOAP(){
	$.ajax({
		url :base_url+'index.php/clinic_controller/Tampil_Asesmen_SOAP',
		type : "post",	
		data : {idEpisode:idEpisode},
		dataType:'json',
		success : function(o)
		{
			var prod = o;
			if(prod.length!=0){
				var h=prod[0];
				//Untuk Form Konsul
				$('#TRANS3').val(h.S2);
				$('#TRANS4').val(h.S3);
				$('#TRANS6').val(h.S);
				$('#TRANS13').val(h.O);
			}
		},error:function(o)
		{
			
		}
	});
}
function Tampil_Asesmen_Lanjutan(){
	$.ajax({
		url :base_url+'index.php/clinic_controller/Tampil_Asesmen_dokter',
		type : "post",	
		data : {idEpisode:idEpisode},
		dataType:'json',
		success : function(o)
		{
			var prod = o;
			if(prod.length!=0){
				var h=prod[0];
				$('#TRANS20').val(h.GCS_E);
				$('#TRANS21').val(h.GCS_M);
				$('#TRANS22').val(h.GCS_V);
				$('#TRANS23').val(h.TKN_DARAH1);
				$('#TRANS24').val(h.TKN_DARAH2);
				$('#TRANS25').val(h.TEMP);
				$('#TRANS26').val(h.NADI);
				$('#TRANS27').val(h.NAFAS);
				$('#TRANS28').val(h.O2);
				$('#TRANS14').val(h.P_MEDIK);
				$('#TRANS15').val(h.P_TERAPI);

			}
		},error:function(o)
		{
			
		}
	});
}
function Tampil_Diagnosa(){
	$.ajax({
		url :base_url+'index.php/clinic_controller/Tampil_Diagnosa',
		type : "post",	
		data : {idPasien:idPasien,idEpisode:idEpisode},
		dataType:'json',
		success : function(o)
		{
			var prod = o;
			if(prod.length!=0){
				var h=prod[0];
				$('#TRANS7').val(h.DIAGNOSA);
				$('#TRANS8').val(h.ICD1);

				// UNTUK FORM PENGANTAR
				$('#DN_UTAMA4').val(h.DIAGNOSA);
				$('#ICD4').val(h.ICD1);
			}
		},error:function(o)
		{
			
		}
	});
}
function Cetak_Transfer(){
	if(idPasien){
		var win = window.open(base_url+'index.php/laporan/Transfer/'+idEpisode,"_blank");	
	}else
		bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
}

// UNTUK DATA ASESMEN
function Data_Asesmen(){
	if(idPasien){
		Get_Asesmen();
		$('#Data_Asesmen').modal('show');
	}else
		bootbox.alert("Pasien tidak ditemukan. Silakan pilih pasien terlebih dahulu.");
}

function Get_Asesmen(){
	$.ajax({
		url :base_url+'index.php/clinic_controller/Data_Asesmen',
		type : "post",	
		data : {idEpisode:idEpisode},
		dataType : "json",
		success : function(o)
		{
			var prod = o;
			var content=e('tabel_asesmen');
			content.innerHTML="";
			if(prod.length!=0){
				Tabel_Data_Asesmen(prod)
			}else
				content.innerHTML="Tidak ada Data";
			
		},error:function(o)
		{
							
		}
	});
}

function Tabel_Data_Asesmen(prod){
	var content=e('tabel_asesmen');
	content.innerHTML="";
	var divtable = c("div",content,"table-content");
	var table = c("table",divtable,"navigateable table table-condensed table-hover table-striped","asesmen_table");
	var thead=c("thead",table,"header");
	var tr = c("tr",thead);
	var th = c("th", tr);
	th.innerHTML="KODE BERKAS";
	th = c("th", tr);
	th.innerHTML="NAMA BERKAS";
	th = c("th", tr);

	var tbody=c("tbody",table);
	if(prod.length!=0){
		for (var i=0;i<prod.length;i++) {
			var h=prod[i];
			var tr=c('tr',tbody);
			var td = c("td", tr);
			td.innerHTML=h.KODE_BERKAS;
			td.setAttribute('title',h.KODE_BERKAS);
			td = c("td", tr);
			td.innerHTML="<a class='activation' href=javascript:AssClick('"+h.KODE_BERKAS+"') >"+h.NAMA_BERKAS+"</a>";
			td.setAttribute('title',h.NAMA_BERKAS)
		}
	}
	$('#asesmen_table').fixheadertable({
		colratio:[90,400,200],
		width:500,
		height:173,
		zebra:true
	});
}

function AssClick(kode){
	if (kode==1015)
	{
		Cetak_Asesmen();
	}
	else if (kode==1016)
	{
		Asesmen_Lanjutan();
	}
	else if (kode==1013)
	{
		Cetak_Ringkasan();
	}
	else if (kode==1020)
	{
		Cetak_Transfer();
	}
	else if (kode==1021)
	{
		Cetak_Pengantar();
	}
	
	
}