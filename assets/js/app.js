$(function(){
    $("#page_top").click(function(e){
        e.preventDefault();
        $("body").animate({"scrollTop": "0px"}, 1000);
    });

});