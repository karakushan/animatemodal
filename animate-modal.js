(function ($) {
    $.fn.animatemodal = function (options) {

        // дефолтные опции плагина
        var opt = $.extend({
            offset: 20,
            animate: false,
            width: 600
        }, options);

        return this.each(function () {
            var el = this;
            var modal = this.getAttribute('data-target');
            var modalContent = $(modal).find('.modal-content');
            var modalWidth = modalContent.width();
            var winWidth = $(window).width();
            var contentOffset = opt.offset * 2;

            function close_modal(modal) {
                $(modal).css({
                    display: "none"
                })
                $('body').css({
                    overflow: "auto"
                })
                modalContent.removeClass(opt.animate);
            }

            // закрытие модального окна при клике по фону
            $(modal).on('click', function (e) {
                if ($(modal).has(e.target).length === 0) {
                    close_modal(modal);
                }
            });

            // закрытие модального окна при клике по кнопке
            $(modal + ' [data-action="modal-close"]').on('click', function (e) {
                e.preventDefault();
                close_modal(modal);
            });

            // открытие модального окна
            $(el).on('click', function (event) {
                event.preventDefault();
                if (opt.animate) {
                    modalContent.addClass(opt.animate);
                }
                if (modalWidth > winWidth) {
                    $(modalContent).css({
                        display: "block",
                        "margin-left": -( (winWidth - contentOffset) / 2) + 'px',
                        "width": (winWidth - contentOffset) + "px"
                    })
                } else {
                    modalContent.css({
                        width: opt.width + 'px',
                        "margin-left": -( opt.width / 2) + 'px'
                    })
                }
                $(modal).css({
                    display: "block",
                    "overflow-y": "scroll"

                })
                $('body').css({
                    overflow: "hidden"
                })
            });
        });
    };
})(jQuery);