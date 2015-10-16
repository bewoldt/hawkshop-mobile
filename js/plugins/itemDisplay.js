
$(function() {
	$("#cartAdd").attr({'class': 'inactive'});
	var store = $("#itemDisplay").attr("store");
	var itemNum = $("#itemNumber").text();
	var itemName = $("#itemTitle").text();
	var host = window.location.href;
	parseHost = host.match(/^(.+?)ePOS/);
	var baseurl = parseHost[1];

	if($("#itemNumber").length && $("#itemPhoto").length){

		loadImages(itemNum,itemName,store,baseurl);

		$("#imageAttr").change(function() {
			var menuOpt = $(this).find("option:selected").attr("optId");
			 if($(this).val()!='null'){
			    getAttrImage(menuOpt,itemNum,store,baseurl);
			} else {
				getAttrImage('default',itemNum,store,baseurl);
			}
		});
	}

	if($("#attrSelect").length) {
		$("#attrSelect select").change( function() {
			menuId = '#'+$(this).attr("id");
			changeMenu(itemNum,menuId,store,baseurl);
		});
	} else {
		oneAttr(itemNum,store,baseurl);
	}
});

function changeMenu(itemNum,menuId,store,baseurl) {
	var menuselected = 1; var imgselected = 1; var getNotes = 0;
	$('#menuPrice').html('<span class="checking">checking...</span>');
	$("#submitDetail").val('');
	$("#customerNotes").val('');
	$('#cartLimit').html('').attr({style: 'display: none;'});
	$('#qtyCart').html('').attr({style: 'display: none;'});
	$("#availNotes").children().html('').attr({style:"display: none;"});
	$("#itemLocation").html('').attr({style: "display: none;"});
	$("#cartAdd").attr({'class': 'inactive'});
	$("#attrSelect .itemMenu").each(function() {
		if($(this).val()=='null'){ return menuselected = 0; };
	});
	if($(menuId).val()!='null'){
		if((menuId=='#imageAttr') || (menuId=='#otherAttr1')){
			filterMenus('1',itemNum,store,baseurl);
		} else if ((menuId=='#otherAttr2') && ($("#otherAttr3").length)){
			filterMenus('2',itemNum,store,baseurl);
		}
	}
	if(menuselected==1){
		if($("#customField").length){
			var getNotes = 1;
		}
		if($("#attrSelect").attr("selecttype")=='multi'){
		   if($("#imageAttr").length) {
			var val1 = $("#imageAttr").val();
		   } else {
			var val1 = $("#otherAttr1").val();
		   }
		   $.getJSON(
			   baseurl+'ePOS?form=shared3/json/detail_lookup.html',
			   {item: itemNum, store: store, attr_code_1: $("#attrCode1").val(), attr_code_2: $("#attrCode2").val(), attr_code_3: $("#attrCode3").val(), attr_value_1: val1, attr_value_2: $("#otherAttr2").val(), attr_value_3: $("#otherAttr3").val(), onhand: $("#itemDetails").attr("onhand"), getNotes: getNotes},
			   function(jd) {
				   setPrice(jd.price,jd.sale,jd.onhandCode,jd.onhandQty,jd.cartQty,jd.location,jd.cartlimit,jd.qty_control,jd.qty_available,jd.notes);
				   $("#submitDetail").val(jd.id);
			   }
		   );
		} else {
		   if($("#imageAttr").length) {
			var detailid = $("#imageAttr").val();
		   } else {
			var detailid = $("#oneAttr").val();
		   }
		   $.getJSON(
			   baseurl+'ePOS?form=shared3/json/detail_lookup.html',
			   {item: itemNum, store: store, detailid: detailid, onhand: $("#itemDetails").attr("onhand"), getNotes: getNotes},
			   function(jd) {
				   setPrice(jd.price,jd.sale,jd.onhandCode,jd.onhandQty,jd.cartQty,jd.location,jd.cartlimit,jd.qty_control,jd.qty_available,jd.notes);
			   }
		   );
		}

	} else {
		restoreDefault();
		filterMenus('1',itemNum,store,baseurl);
	}
}

function filterMenus(menuNum,itemNum,store,baseurl) {
	if($("#attrSelect").attr("selecttype")=='multi'){
		if($("#imageAttr").length){
			var optId1 = $("#imageAttr option:selected").attr("optId");
		} else {
			var optId1 = $("#otherAttr1 option:selected").attr("optId");
		}
		if(menuNum=='1'){

			$.getJSON(
				baseurl+'ePOS?form=shared3/json/attr_menus.html',
				{item: itemNum, store: store, attr_code: $("#attrCode2").val(), attr_wpc: $("#attrCode2").attr("wpc"), filter1: optId1},
				function(menuTwo) {
					redrawMenu(menuTwo,'#otherAttr2',menuNum,itemNum,store,baseurl);
				}
			);
		} else if (menuNum=='2'){
			if($("#attrCode1").val()!='null'){
				var filter1 = optId1;
				var filter2 = $("#otherAttr2 option:selected").attr("optId");
				if(filter2=='null'){
					var filter2 = '';
				}
			} else {
				var filter1 = $("#otherAttr2 option:selected").attr("optId");
				if(filter1=='null'){
					var filter1 = '';
				}
			}
			$.getJSON(
				baseurl+'ePOS?form=shared3/json/attr_menus.html',
				{item: itemNum, store: store, attr_code: $("#attrCode3").val(), attr_wpc: $("#attrCode3").attr("wpc"), filter1: filter1, filter2: filter2},
				function(menuThree) {
					redrawMenu(menuThree,'#otherAttr3',menuNum,itemNum,store,baseurl);
				}
			);
		}
	}
}

function redrawMenu(fm,menuId,menuNum,itemNum,store,baseurl) {
	var nullOpt = menuId + ' option:first-child';
	var selOpt = menuId + ' option:selected';
	saveSel = $(selOpt).val();
	var selSet = 0;
	nullText = $(nullOpt).text();
	nullNew = $('<option></option>').attr("value", "null").text(nullText);
	$(menuId).empty().append(nullNew);
	for(var nm=0; nm < fm.attrs.length; nm++)
	{
		if(fm.attrs[nm].atlabel==saveSel){
			var option = $('<option></option>').attr("value", fm.attrs[nm].atlabel).attr("optId", fm.attrs[nm].atid).text(fm.attrs[nm].atlabel).attr("selected", "selected");
			var selSet = 1;
		} else {
			var option = $('<option></option>').attr("value", fm.attrs[nm].atlabel).attr("optId", fm.attrs[nm].atid).text(fm.attrs[nm].atlabel);
		}
		$(menuId).append(option);
	}
	if(($("#otherAttr2").val()!='null') && ($("#otherAttr3").length) && (menuNum=='1')){
		filterMenus('2',itemNum,store,baseurl);
	}
	if((selSet==0) && (saveSel!='null')){
		$('#itemPrice').attr({style: 'display: none;'});
		if($('#menuPrice').length) {$('#menuPrice').attr({style: 'display: inline-block;'}).attr({'class': 'notAvail'}).html('Sorry! The option you selected is not available');}
		$("#messageBin").append($("#orderOptions"));
	}
}

function oneAttr(itemNum,store,baseurl) {
	$('#menuPrice').html('<span class="checking">checking...</span>');
	$('#cartLimit').html('').attr({style: 'display: none;'});
	$('#qtyCart').html('').attr({style: 'display: none;'});
	$("#availNotes").children().html('').attr({style:"display: none;"});
	$("#itemLocation").html('').attr({style: "display: none;"});
	$("#cartAdd").attr({'class': 'inactive'});
	if($("#customField").length){
		var getNotes = 1;
	}
	var detailid = $("#oneDetail").val();
	$.getJSON(
		baseurl+'ePOS?form=shared3/json/detail_lookup.html',
		{item: itemNum, store: store, detailid: detailid, onhand: $("#itemDetails").attr("onhand"), getNotes: getNotes},
		function(jd) {
			setPrice(jd.price,jd.sale,jd.onhandCode,jd.onhandQty,jd.cartQty,jd.location,jd.cartlimit,jd.qty_control,jd.qty_available,jd.notes);
		}
	);

}


function setPrice(price,sale,onhandCode,onhandQty,cartQty,location,cartlimit,qty_control,qty_available,notes) {
	$('#itemPrice').attr({style: 'display: none;'});
	var maxQty = parseFloat($("#orderOptions").attr("maxqty"));
	if($("#itemQty option:last-child").val()){
		var menuQty = parseFloat($('#itemQty option:last-child').val());
	} else {
		var menuQty = 0;
	}
	if(menuQty<maxQty){ setQty(maxQty,0,'none'); }
	if($('#menuPrice').length) {$('#menuPrice').attr({style: 'display: inline-block;'});}
	if((price!='') && (price!='failed')){

	   $("#cartAdd").removeClass('inactive');
	   if($("#orderOptions").parent().attr("id")=='messageBin'){
		   $("#itemOrder").append($("#orderOptions"));
	   }
	   if($("#zeroPrice").length && (price==$("#zeroPrice").attr("zero"))){
		  $('#menuPrice').attr({style: 'display: none;'});
		  $("#messageBin").append($("#orderOptions"));
		  $("#zeroPrice").html('Pricing is not yet available for this option.<br>Please contact the store for purchasing information.').removeAttr("style");
	   } else {
		  $("#zeroPrice").html('').attr({style: 'display: none;'});
		  var saleInt = parseFloat(sale); var priceInt = parseFloat(price);
		  if(saleInt<priceInt){
			  $("#menuPrice").removeAttr("class").html('<span class="itemSale">Sale!</span> $'+sale);
			  var thisSavings = parseFloat(price)-parseFloat(sale); var thisSavings = thisSavings.toFixed(2);
			  $("#regPrice").html('Regularly $'+price+'.').removeAttr("style");
			  if(thisSavings>1){
				  $("#regPrice:last").append(' <span class="saleSave">You save $'+thisSavings+'!</span>')
			  }
		  } else {
			  $("#menuPrice").removeAttr("class").html('$'+price);
		  }
	   }
	   setOnhand(onhandCode,onhandQty,cartQty);
	   if((location!='') && ($("#itemLocation").length)){
		   $("#itemLocation").html('Store Location: '+location).removeAttr("style");
	   }
	} else {
	   $("#menuPrice").attr({'class': 'notAvail'}).html('Sorry! This option is not available');
	   $("#messageBin").append($("#orderOptions"));
	}
	if(((cartlimit!='') && (cartlimit!='0')) || (qty_control==1)){
		 checkQty(cartlimit,qty_control,qty_available,cartQty);
	}
	if($("#customField").length && notes!=''){
		$("#customerNotes").val(notes);
	}

}

function checkQty(cartlimit,qty_control,qty_available,cartQty){
	if($("#itemQty option:last-child").val()){
		var menuQty = parseFloat($('#itemQty option:last-child').val());
	} else {
		var menuQty = 0;
	}
	var limitEnforced = 'onhand';
	var newQty = menuQty;
	if((cartlimit!='') && (cartlimit!='0')){
	    var cartLimit = parseFloat(cartlimit);
		if(cartLimit<newQty){
			var newQty = cartLimit;
		}

		if($("#cartLimitItem").length==''){
			$('#cartLimit').html('Limit '+cartlimit+' per order').removeAttr("style");
		} else {
			$('#cartLimit').html('Limit '+cartlimit+' of this option').removeAttr("style");
		}
		if(cartQty==cartlimit){
			var limitEnforced = 'cart';
		}
	}
	if((qty_control=='1') && (qty_available!='')){
		var qtyLimit = parseFloat(qty_available);
		if(qtyLimit!=0){
			if($("#onhandItemDisplay").length==''){
				$("#onhandDisplay").html('<b>'+qtyLimit+'</b> available').removeAttr("style");
			} else {
				$("#onhandDisplay").html('<b>'+qtyLimit+'</b> of this option available').removeAttr("style");
			}
		} else {
			$("#cartAdd").attr({'class': 'inactive'});
			if($("#onhandItemDisplay").length==''){
				$("#onhandDisplay").html('<span class="noStock">Sold Out!</span>').removeAttr("style");
			} else {
				$("#onhandDisplay").html('<b>This option is Sold Out!</b>').removeAttr("style");
			}
		}
		if(qtyLimit<newQty){
			var newQty = qtyLimit;
		}
		if(cartQty==qtyLimit){
			var limitEnforced = 'event';
		}
	}

	if(cartQty!=0){
		cartQty = parseFloat(cartQty);
		if(newQty>cartQty){
			newQty = newQty - cartQty;
		} else {
			newQty = 0;
		}
	}
	if((newQty<menuQty)){
		setQty(newQty,cartQty,limitEnforced);
	}
}


function setQty(newQty,cartQty,limitEnforced){

	var newQty = parseFloat(newQty);
	if($("#itemQty option:last-child").val()){
		var menuQty = parseFloat($('#itemQty option:last-child').val());
	} else {
		var menuQty = 0;
	}
	if(menuQty > newQty){
		$("#itemQty option").each(function()
		{
			var thisValue = parseFloat($(this).val());
			if(thisValue > newQty){
				$(this).remove();
			}
		});
	} else if (newQty > menuQty){
		for (var q = menuQty+1; q <= newQty; q++)
		{
			$('#itemQty').append( new Option(q,q) );
		}
	}

	if(cartQty!=0){
		if(newQty!=0){
			if($("#qtyCartItem").length==''){
				$('#qtyCart').html(cartQty +' in cart!').removeAttr("style");
			} else {
				if($("#attrSelect").length) {
					$('#qtyCart').html(cartQty +' of this option').removeAttr("style");
				}
			}
		} else {
			$("#cartAdd").attr({'class': 'inactive'});
			if(limitEnforced=='cart'){
				$('#qtyCart').html('You have reached the order limit for this option').removeAttr("style");
			} else {
				$('#qtyCart').html('All available copies of this option are in your cart').removeAttr("style");
			}
		}
	}
}


function restoreDefault() {
	$('#menuPrice').attr({style: 'display: none;'});
	$('#itemPrice').attr({style: 'display: inline-block;'});
	if($("#orderOptions").parent().attr("id")=='messageBin'){
		$("#itemOrder").append($("#orderOptions"));
	}
	var maxQty = parseFloat($("#orderOptions").attr("maxqty"));
	setQty(maxQty,'0','none');
}


function setOnhand(onhandCode,onhandQty,cartQty) {
	var menuQty = parseFloat($('#itemQty option:last-child').val());
	if(onhandQty!='Error'){var onhandQty = parseFloat(onhandQty)};
	if($('#itemDetails').attr("onhand")!=0){ var checkQty = 1 } else { var checkQty = 0; };

	if(onhandCode<0){
		var thisStock = '#stockNote' + onhandCode;
		$("#stockDisplay").html($(thisStock).html()).removeAttr("style");
		if($(thisStock).attr("class")=='stockNo'){
			$("#messageBin").append($("#orderOptions"));
		}
		if($('#itemDetails').attr("onhand")!=1){ var checkQty = 0 };
		if((onhandCode=='-4') || (onhandCode=='-5') || (onhandCode=='-6')){ var checkQty = 0 };
	}
	if(checkQty==1){
		var stockLimit = parseFloat(($("#itemDetails").attr("limit")));
		if(onhandQty=='Error'){
			$("#onhandDisplay").html('<span class="noOnhand">On-hand lookup is currently unavailable</span>').removeAttr("style");
		} else {
			if(onhandQty<=stockLimit){
			    var bkorder = $("#itemDetails").attr("back");
			    if(bkorder=='YES'){
					$("#onhandDisplay").html('<span class="noStock">On Backorder</span>').removeAttr("style");
				} else {
					$("#onhandDisplay").html('<span class="noStock">OUT OF STOCK</span>').removeAttr("style");
					$("#messageBin").append($("#orderOptions"));
				}
			} else {
				var showCount = ($("#itemDetails").attr("showcount"));
				if(showCount!='NO'){
					var limitEnforced = 'none';
					if($("#onhandItemDisplay").length==''){
						$("#onhandDisplay").html('<b>'+onhandQty+'</b> available').removeAttr("style");
					} else {
						$("#onhandDisplay").html('<b>'+onhandQty+'</b> of this option available').removeAttr("style");
					}
					var newQty = onhandQty;
					if(cartQty!=0){
						cartQty = parseFloat(cartQty);
						if(onhandQty>cartQty){
							newQty = newQty - cartQty;
						} else {
							newQty = 0;
							var limitEnforced = 'onhand';
						}
					}
					if((newQty<menuQty)){
						setQty(newQty,cartQty,limitEnforced);
					}
				}
			}
		}

	}
}


function loadImages(itemNum,itemName,store,baseurl) {
	var attrCode = $("#attrCode1").val();
	var menuType = $("#attrSelect").attr("selecttype");
	$.getJSON(
		baseurl+'ePOS?form=shared3/json/item_images.html',
		{item: itemNum, attrCode: attrCode, menuType: menuType, store: store},
		function(mainImg) {
			createImages(mainImg,itemNum,itemName,store,baseurl);
		}
	);
}

function createImages(mainImg,itemNum,itemName,store,baseurl) {

	sizePhoto('#attrMain img','0',store);

	if(($("#oneAttrLabel").length) && ($("#oneAttrLabel").attr("hasImg")=='Y')){
		if($("#oneDetail").length){
			var optId = $("#oneDetail").val();
		} else {
			var optId = $("#imageAttr").attr("optId");
		}
		getAttrImage(optId,itemNum,store,baseurl);
	} else {

		var attrId = '#attrMain';
		$(attrId).click(function() {
			expandImage($("#photoThumb a:last"),itemName,'main');
			return false;
		});
		$('#photoClick').off('click');
		$("#photoClick").click(function() {
			expandImage($("#photoThumb a:last"),itemName,'main');
			return false;
		});

		if($("#imageSelector").length){
			if($('#attrFrame').css('display')=='none'){
				$("#attrFrame").removeAttr("style");

			}
			for(var m=0; m < mainImg.attrs.length; m++)
			{
				var caption = mainImg.attrs[m].atname;
				var caption = caption.replace(/\"/g,"&#34;");
				$("#photoThumb").append('<a href="#" id="' + mainImg.attrs[m].atid +'-ic"><img src="'+mainImg.attrs[m].atzoom+'" id="'+ mainImg.attrs[m].atid +'-icon" alt="'+ caption +'" class="attrMini" ></a>');
				// $("#attrList").append('<a href="'+mainImg.attrs[m].atstandard+'" id="' + mainImg.attrs[m].atid +'-ic" menuOpt="'+ caption +'" style="display: none;"><img src="'+mainImg.attrs[m].aticon+'" id="'+ mainImg.attrs[m].atid +'-icon" alt="'+ caption +'" class="attrMini" ></a>');
			}
			var attrFrameWidth = $("#photoThumb").find("img:first").width() - (parseInt($("#attrFrame").css('padding-left'))*2);
			if($("#itemPhoto").attr("sized")!='2'){
// 				$("#attrFrame").width(attrFrameWidth);
			}

			$("#attrList img")
				.error(function() {
					$(this).parent().remove();
				})
				.load(function() {
					$(this).parent().removeAttr("style");
				}
			);
			// initialize owlcarousel
			$('#photoThumb').owlCarousel({
				items:1
			});

			// $("a:has(img.attrMini)").hoverIntent(function() {
			// 	getAttrImage($(this).attr("id"),itemNum,store,baseurl);
			// },hoverOut);
			// $("a:has(img.attrMini)").click(function() {
			// 	var menuAttr = $(this).attr("menuOpt");
			// 	$("#imageAttr option").each(function () {
			// 		if($(this).text()==menuAttr){
			// 			$("#imageAttr").val($(this).val());
			// 		}
			// 	});
			// 	changeMenu(itemNum,'#imageAttr',store,baseurl);
			// 	return false;
			// });


			var preSelected = $("#imageAttr option:selected").text();
			var preSelectedOpt = $("#imageAttr option:selected").attr("optId");
			var preSelectedVal = $("#imageAttr").val();
			if(preSelectedVal!='null'){
				getAttrImage(preSelectedOpt,itemNum,store,baseurl);
			}
			$("#itemPhoto").mouseleave(function() {
				var menuOpt = $("#imageAttr option:selected").attr("optId");
				var menuVal = $("#imageAttr").val();
				if(menuVal!='null'){
					getAttrImage(menuOpt,itemNum,store,baseurl);
				}
			});

		} else {
			$("#attrCaption").attr({style: 'display: none;'});
			$("#attrFrame").attr({style: 'display: none;'});
		}
		if($("#attrSelect").length) {
			if($("#imageAttr").length){
				var menuId = '#imageAttr';
			} else {
				var menuId = '#otherAttr1';
			}
			changeMenu(itemNum,menuId,store,baseurl);
		}
	}

	loadMain('#attrMain img','1',store,'');
}

function hoverOut() {
}

function getAttrImage(optId,itemNum,store,baseurl) {
	var IconId = '#' + optId;
	if( IconId.search(/(.+)-ic$/) < 0){
		var IconId = IconId + '-ic';
	}
	if($("#photoThumb a:first").attr("id")!=$("#photoThumb a:last").attr("id")){
		$("#photoThumb a:first").detach().appendTo($("#photoBin")).show();
	}
	if(($(IconId).length) || ($("#oneAttrLabel").length) || (optId=='default')){
		if($('#noImage').css('display')!='none'){
			$('#noImage').fadeOut('fast');
		}
		$("#photoClick").removeAttr("style");

		if(optId!='default'){
			var mainId = optId.replace('-ic','');
			var attrId = '#attrMain_'+mainId;
		} else {
			var mainId = 'default';
			var attrId = '#attrMain';
		}

		var itemName = $("#itemTitle").text();
		if($(attrId).length){
			if(($(attrId).parent().attr("id"))!='photoThumb'){
				var currentHeight = $("#photoThumb").height();
				var oldImage = $("#photoThumb a:first");
				oldImage.attr("class", "gallery").css("z-index", "90");
				$(attrId).attr("class", "gallery").height(currentHeight).detach().css('z-index', '80').appendTo($("#photoThumb")).show();
				oldImage.fadeOut('fast', function() {
					oldImage.detach().appendTo($("#photoBin")).show();
				});
			}
			if(($(IconId).length==0) && (mainId!='default')){
				var label = $("#imageAttr option:selected").text();
				noImage(label);
			}

			selectedImage(mainId);

			var attrIdimg = attrId + ' img';
			loadMain(attrIdimg,'1',store,'');
			$(attrId).click(function() {
				expandImage($("#photoThumb a:last"),itemName,'attr');
				return false;
			});
			$('#photoClick').off('click');
			$("#photoClick").click(function() {
				expandImage($("#photoThumb a:last"),itemName,'attr');
				return false;
			});

		} else {
			if($("#attrSelect").attr("selecttype")=='multi'){

				$.getJSON(
					baseurl+'ePOS?form=shared3/json/attr_images.html',
					{item: itemNum, store: store, attrId: mainId},
					function(aImg) {
						attrImage(aImg.zoom,aImg.standard,aImg.icon,aImg.label,mainId,itemNum,store);
					}
				);

			} else {
				$.getJSON(
					baseurl+'ePOS?form=shared3/json/detail_images.html',
					{item: itemNum, store: store, detailid: mainId},
					function(aImg) {
						attrImage(aImg.zoom,aImg.standard,aImg.icon,aImg.label,mainId,itemNum,store);
					}
				);

			}


		}
	} else {
		var label = $("#imageAttr option:selected").text();
	    noImage(label);
	}
}

function attrImage(zoom,standard,icon,label,mainId,itemNum,store) {

	if(zoom!='none'){
		var itemName = $("#itemTitle").text();
		var itemAlt = itemName + ' ' + label;
		var itemAlt = itemAlt.replace(/\"/g,"&#34;");

		if($("#attrFrame").length){
			selectedImage(mainId);
		}

		var oldImage = $("#photoThumb").children(":first");
		if(standard!=''){
			oldImage.attr("class", "gallery").css("z-index", "90");
			$("#photoThumb").append('<a href="'+zoom+'"  id="attrMain_'+mainId+'" class="gallery" style="z-index:80"><img src="'+zoom+'" alt="'+itemAlt+'" id="attrMainImg_'+mainId+'"></a>');
		} else {
			noImage(label);
		}

		var attrId = '#attrMain_'+mainId;
		var attrIdimg = attrId + ' img';
		loadMain(attrIdimg,'1',store,oldImage);
		$(attrId).click(function() {
			expandImage($("#photoThumb a:last"),itemName,'attr');
			return false;
		});
		$('#photoClick').off('click');
		$("#photoClick").click(function() {
			expandImage($("#photoThumb a:last"),itemName,'attr');
			return false;
		});
	} else {
		if($("#oneAttrLabel").length==0){
			noImage(label);
		}
	}

}

function noImage(label) {
	var store = $("#itemDisplay").attr("store");
	var itemNum = $("#itemNumber").text();
	var host = window.location.href;
	parseHost = host.match(/^(.+?)ePOS/);
	var baseurl = parseHost[1];
	getAttrImage('default',itemNum,store,baseurl);
	var caption = label.replace(/\"/g,"&#34;");
	var standard = $("#photoThumb").find("img:last");
	var ImgWidth = $("#photoThumb").width();
	var ImgHeight = $("#photoThumb").height();
	var ImgHalf = parseInt((ImgHeight/2)-20);
	if(ImgHalf<0){ var ImgHalf = 1 };
	$("#attrCaption").text(caption);
	$("#noImage").fadeIn('fast').width(ImgWidth).height(ImgHeight);
	$("#noImageText").css('margin-top',ImgHalf+'px');
	$("a:has(img.attrMini)").removeAttr("class");
	$("#photoClick").attr({style: 'display: none;'});
}

function loadMain(img,step,store,oldImage){
	$(img)
	.error(function() {
		var label = $("#imageAttr option:selected").text()
		noImage(label);
	})
	.load(function() {
		if(oldImage!=''){
			oldImage.fadeOut('fast', function() {
    			oldImage.detach().appendTo($("#photoBin")).show();
  			});
  		}
		sizePhoto(img,step,store);
	});
}

function sizePhoto(img,step,store){
	var sized = $("#itemPhoto").attr("sized");
	$("#photoClick").removeAttr("style");
	var ImgWidth = $(img).width();
	var ImgHeight = $(img).height();
	var ImgFrame = $(img).parent();
	var currentHeight = $("#photoThumb").height();
// 	$(ImgFrame).height(currentHeight);
	if(sized==0){
		var resize = 1;
	} else {
		var currentWidth = $("#itemPhoto").width();
		if((currentWidth<ImgWidth) || (currentHeight<ImgHeight) || (currentWidth=='') || (currentWidth=='0')){ var resize = 1; } else { var resize = 0; };
	}
	if((ImgWidth=='') || (ImgWidth=='0')){
		var resize = 0;
	}
	if((resize==1)){
// 		$("#itemPhoto").width(ImgWidth);
// 		$("#photoFrame").width(ImgWidth);
// 		$("#photoThumb").width(ImgWidth);
// 		$("#photoThumb").height(ImgHeight);
		if(($('#attrFrame').css('display')=='none') && ($("#imageSelector").length)){
			$("#attrFrame").removeAttr("style");
		}
		var attrPadding = parseInt($("#attrFrame").css('padding-left'))*2;
		var frameWidth = parseFloat($("#itemDisplay").width());
		var minWidth = 300;
		if($("#catShare").length){
			if(parseFloat($("#catShare").width())>minWidth){
				var minWidth = parseFloat($("#catShare").width());
			}
		}
		var photoPercent = (parseFloat(ImgWidth/frameWidth))*100;
		var infoPercent = 90 - parseInt(photoPercent);
		var infoWidth = (parseInt(frameWidth*(infoPercent/100)));
		if(infoWidth>minWidth) {
			var attrFrameWidth = ImgWidth - attrPadding;
// 			$("#attrFrame").width(attrFrameWidth);
			var infoPercent = infoPercent +'%';
// 			$("#itemInfo").width(infoPercent);
			$("#itemPhoto").attr("sized", "1");
		} else {
// 			$("#itemInfo").width(frameWidth);
// 			$("#itemPhoto").width(frameWidth);
			var attrFrameWidth = frameWidth - attrPadding;
// 			$("#attrFrame").width(attrFrameWidth);
			$("#itemPhoto").attr("sized", "2");
		}
	}
}

function selectedImage(mainId) {
	var iconId = '#'+mainId+'-ic';
	var caption = $(iconId).attr("menuOpt");
	$("a:has(img.attrMini)").removeAttr("class");
	if(mainId!='default'){
		$(iconId).attr({'class':'selected'});
		$("#attrCaption").text(caption);
	} else {
		$("#attrCaption").text('');
	}
}


function expandImage(full,name,type) {
	var fullID = full.attr("id");
	var fullImg = '#' + fullID + ' img:first';
	var fullLabel = $(fullImg).attr("alt");
	var store = $("#itemDisplay").attr("store");
	var loaded = 0;
	if(type=='main'){
		var newFrame = 'largeFrameMain';
		var newPhoto = 'photoLargeMain';
		var newZoom = 'zoomLoadMain';
	} else {
		var mainId = fullID.replace('attrMain_','')
		var newFrame = 'largeFrame' + mainId;
		var newPhoto = 'photoLarge' + mainId;
		var newZoom = 'zoomLoad' + mainId;
	}
	var newFrameId = '#'+newFrame; var newPhotoId = '#'+newPhoto; var newZoomId = '#'+newZoom;
	var fullPath = full.attr("href");
	if(fullLabel!=''){
		var zoomTitle = fullLabel;
	} else {
		var zoomTitle = name;
	}
	if($(newFrameId).length==''){
		$("#photoBin").append('<div id="'+newFrame+'" title="Loading..."><div id="'+newZoom+'" class="zoomBack"><div class="zoomLoad"></div></div><img src="'+fullPath+'" id="'+newPhoto+'"></div><div id="'+newFrame+'_Title" style="display:none;">'+zoomTitle+'</div>');
	} else {
		var loaded = 1;
	}

	img = $(newPhotoId);

	$(newPhotoId)
    .error(function() {
		var noneImg = 'webitemimages/'+store+'/none.jpg';
		$(this).attr("src", noneImg);
	})
    .load(function() {
		sizeZoom($(this),newFrameId,newPhotoId,newZoomId);
    });


	$(newFrameId).width(200).height(200);
	$(newFrameId).dialog({modal: true, height: 200, width: 200});


	if(loaded==1){
		sizeZoom(img,newFrameId,newPhotoId);
	}


}

function sizeZoom(zoom,newFrameId,newPhotoId,newZoomId) {
		var fWidth = $(window).width()-50;
		var fHeight = $(window).height()-50;
        pic_real_width = $(newPhotoId).width();
        pic_real_height = $(newPhotoId).height();
        var findTitleId = newFrameId + '_Title';
        var titleId = newFrameId.replace('#','#ui-dialog-title-');
        var newTitle = $(findTitleId).html();
        $(titleId).html(newTitle);
        var dragTitle = newTitle + ' (Click and drag to view full image)';
        if(pic_real_width==0){ pic_real_width = 700 }
		if((pic_real_width<fWidth)) {
			var fWidth = pic_real_width + 50;
		};
		if((pic_real_height<fHeight) && (pic_real_height>0)) {
			var fHeight = pic_real_height + 50;
		};
		$(newZoomId).remove();
		$(newFrameId).dialog("widget").animate({
			  width: fWidth,
			  height: fHeight
			}, {
			duration: 500,
			step: function() {
			  $(newFrameId).dialog('option', 'position', 'center');
			}
		});
		$(newFrameId).width(fWidth).height(fHeight);
		if ( (pic_real_width>fWidth) && (pic_real_height>fHeight) ) {
		    $(titleId).html(dragTitle);
			$(newPhotoId).draggable();
		} else if(pic_real_width>fWidth) {
		    $(titleId).html(dragTitle);
			$(newPhotoId).draggable({ axis: "x" });
		} else if(pic_real_height>fHeight) {
		    $(titleId).html(dragTitle);
			$(newPhotoId).draggable({ axis: "y" });
		}
}

function checkItem() {
	var menuselected = 1;
	$("#attrSelect .itemMenu").each(function() {
	 if($(this).val()=='null'){ return menuselected = 0; };
	});
	if(($("#orderOptions").parent().attr("id")=='messageBin') || ($("#cartAdd").attr("class")=='inactive') || (menuselected==0)){
		return false;
	}
}
