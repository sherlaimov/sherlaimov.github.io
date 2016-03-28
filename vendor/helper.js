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
    var options = {
        placement: 'top',
        html: true,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    };
    $('[data-toggle="tooltip"]').tooltip(options);

});