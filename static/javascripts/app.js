	
/*
$.each(praias, function(i, item) {
        $('#praiaslista').append('<li class="arrow" idpraia="'+item.id+'"><strong>'+item.praia+'</strong><small>'+item.cidade+'</small></li>')
    });
    
    $( "li" ).each(function() {
      $(this).click(function() {
          idp = $(this).attr('idpraia');
          $.post("http://pixel.capella.pro/cetesb/info.php", { id: idp })
            .done(function(data) {
                showpraia(idp, data);
                console.log(idp);
          });
      });
    });
 
    function showpraia(idpraias, status){
        var result = $.grep(praias, function(e){ return e.id == idpraias; });
        console.log(result);
        console.log(idpraias);
        
		$$('div #praianome').html(result[0].praia+' - '+result[0].cidade);
		$$('div #praialocal').html(result[0].local);
        
        if(status == 0){
			Lungo.Router.article("form", "form-normal");
        } else {
			Lungo.Router.article("form", "form-normal2");
        }
		

    }
    

    
    
    
    
    
    
    
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };




    $( "#search" )
      .change( function () {
        var filter = $(this).val();
          console.log(filter);
        if(filter) {
          // this finds all links in a list that contain the input,
          // and hide the ones not containing the input while showing the ones that do
          $("#praiaslista").find(":not(:Contains(" + filter + "))").parent().hide();
          $("#praiaslista").find(":Contains(" + filter + ")").parent().show();
        } else {
          $("#praiaslista").find("li").slideDown();
        }
        return false;
      })
    .keyup( function () {
        // fire the above change event after every letter
        $(this).change();
    });
    
    */

$.each(praias,function(a,b){$("#praiaslista").append('<li class="arrow" idpraia="'+b.id+'"><strong>'+b.praia+"</strong><small>"+b.cidade+"</small></li>")});$("li").each(function(){$(this).click(function(){idp=$(this).attr("idpraia");$.post("http://pixel.capella.pro/cetesb/info.php",{id:idp}).done(function(a){showpraia(idp,a);console.log(idp)})})});
function showpraia(a,b){var c=$.grep(praias,function(b){return b.id==a});console.log(c);console.log(a);$$("div #praianome").html(c[0].praia+" - "+c[0].cidade);$$("div #praialocal").html(c[0].local);0==b?Lungo.Router.article("form","form-normal"):Lungo.Router.article("form","form-normal2")}jQuery.expr[":"].Contains=function(a,b,c){return 0<=(a.textContent||a.innerText||"").toUpperCase().indexOf(c[3].toUpperCase())};
$("#search").change(function(){var a=$(this).val();console.log(a);a?($("#praiaslista").find(":not(:Contains("+a+"))").parent().hide(),$("#praiaslista").find(":Contains("+a+")").parent().show()):$("#praiaslista").find("li").slideDown();return!1}).keyup(function(){$(this).change()});