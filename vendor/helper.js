$(window).scroll(function(e){
    //console.log(e);
    var $el = $('.info-box');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 116 && !isPositionFixed){
        $el.addClass('info-box-sticky');
    }
    if ($(this).scrollTop() < 116 && isPositionFixed)
    {
        $el.removeClass('info-box-sticky');
    }
});