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

	function myClick(kode){
		//$('#'+kode).dblclick();
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

    function Pasien_Baru(){
			$('#Pasien_Baru').modal('show');
	}

	