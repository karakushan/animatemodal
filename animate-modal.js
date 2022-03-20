(function ($) {
    window.AnimateModal = class {
        constructor(options = {}) {
            this.options = {
                animate: false,
                width: 600,
                wrapperClass: '.animate-modal-wrapper',
                outSpeed: 400,
                ...options
            }

            const self = this

            this.isOpen = false;


            // закрытие модального окна при клике по фону
            $(this.options.wrapperClass).on('click', function (e) {
                if ($(self.options.wrapperClass).has(e.target).length === 0) {
                    self.close();
                }
            });

            // закрытие модального окна при клике по кнопке с атрибутами data-action="modal-close"
            $(this.options.wrapperClass).on('click', '[data-action="modal-close"]', function (e) {
                e.preventDefault();
                self.close();
            });

            // открытие модального окна при клике по кнопке с атрибутами data-action="modal-open"
            $(document).on('click', '[data-action="modal-open"]', function (e) {
                e.preventDefault();
                let el = this;
                self.close(self).then(function (res) {
                    if ($(el).attr('href')) {
                        self.open($(el).attr('href'))
                    } else if ($(el).attr('data-target')) {
                        self.open($(el).attr('data-target'))
                    }
                })
            });
        }

        // Функция для открытия модального окна
        open(modalId) {
            let modalContent = $(modalId).find('.modal-content');

            if (this.options.animate) {
                modalContent.addClass(this.options.animate);
            }

            if (modalContent.width() > $(window).width()) {
                $(modalContent).css({
                    "display": "flex",
                    "width": ($(window).width() - this.options.offset * 2) + "px"
                })
            } else {
                modalContent.css({
                    "width": this.options.width + 'px',
                })
            }

            $(modalId).css({
                "display": "flex",
                "overflow-y": "scroll"
            })

            $('body').css({
                "overflow": "hidden"
            })

            this.isOpen = true;
        }

        // Функция для закрытия модального окна
        close() {
            let self = this
            return new Promise((resolve) => {
                $(self.options.wrapperClass).fadeOut(self.options.outSpeed, function () {
                    $('body').css({
                        overflow: "auto"
                    });
                    $(self.options.wrapperClass).find('.modal-content')
                        .removeClass(self.options.animate);
                    self.isOpen = false;
                    resolve(true)
                });
            })

        }

    }
})(jQuery);