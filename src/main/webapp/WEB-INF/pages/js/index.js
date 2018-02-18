$("document").ready(function(){
  $(".tab-slider--body").hide();
  $(".tab-slider--body:first").show();
});

$(".tab-slider--nav li").click(function() {
  $(".tab-slider--body").hide();
  var activeTab = $(this).attr("rel");
  $("#"+activeTab).fadeIn();
    $('.tab-slider--tabs').removeClass('slide');
    $('.tab-slider--tabs').removeClass('slide3');
    $('.tab-slider--tabs').removeClass('slide4');
    $('.tab-slider--tabs').removeClass('slide5');
	if($(this).attr("rel") == "tab2"){
		$('.tab-slider--tabs').addClass('slide');
	}
    if($(this).attr("rel") == "tab3"){
        $('.tab-slider--tabs').addClass('slide3');
    }
    if($(this).attr("rel") == "tab4"){
        $('.tab-slider--tabs').addClass('slide4');
    }
    if($(this).attr("rel") == "tab5"){
        $('.tab-slider--tabs').addClass('slide5');
    }
  $(".tab-slider--nav li").removeClass("active");
  $(this).addClass("active");
});