(function($) {

  // create overlay element
  var overlay = $("<div id='bluz-overlay'></div>");
  $("body").append(overlay);

  /*
    Hide the modal dialog
   */
  function closeModal(modal) {
    $("#bluz-overlay").css({
      'display': 'none',
      opacity: 0
    });

    if(typeof modal == 'string')
      modal = $(modal);

    modal.css({
      "display": "none"
    })
  }

  var defaultOptions = {
    top: "50%",
    left: "50%",
    overlay: 0.5,
    events: {},
    clickOutClose: true,
  };

  $.fn.bluzModal = function(options) {
      options = $.extend(defaultOptions, options);

      var self = this;
      // map events
      // click .ok : handleOK
      // handle function will be invoked when button with class .ok is clicked
      $.map(options.events, function(handler, action) {
        var els = action.split(" ");
        $(els[1]).off();
        $(els[1]).on(els[0], function(e) {
          if (handler != undefined) {
            closeModal(self);
            handler(e);
          }
        });
      });

      // bind click even on overlay
      $('#bluz-overlay').off();
      $('#bluz-overlay').on('click', function(e){
        closeModal(self);
      });

      // calculat position of dialog
      var o = options;
      var modal_height = this.outerHeight();
      var modal_width = this.outerWidth();

      // show overlay with animation
      $("#bluz-overlay").css({
        "display": "block",
        opacity: 0
      });
      $("#bluz-overlay").fadeTo(200, o.overlay);

      this.css({
        "display": "block",
        "position": "fixed",
        "opacity": 0,
        "z-index": 1000,
        "left": o.left,
        "margin-left": -(modal_width / 2) + "px",
        "top": o.top
      });
      this.fadeTo(200, 1);
    };

    $.fn.bluzBindModal = function(options) {
      options = $.extend(defaultOptions, options);

      return this.each(function() {
        var o = options;

        $(this).click(function(e) {

          var modalId = $(this).attr("data-toggle");
          var modal = $(modalId);

          // bind click even on overlay
          $('#bluz-overlay').off();
          $('#bluz-overlay').on('click', function(e){
            closeModal(modalId);
          });

          // find all element in dialog which has attribute data-event
          // data-trigger="click"
          // data-event="onClickFunction"
          // onClickFunction function will be invoked when element is clicked
          modal.find('[data-event]').off();
          modal.find('[data-event]').each(function(){
            var evtName = $(this).attr('data-trigger');

            $(this).on(evtName, function(e){
              var eventHandler = $(this).attr('data-event');
              if(eventHandler != "" && typeof window[eventHandler] == 'function'){
                closeModal(modalId);
                window[eventHandler](e);
              }
            })
          });

          var modal_height = modal.outerHeight();
          var modal_width = modal.outerWidth();

          // show overlay with animation
          $("#bluz-overlay").css({
            "display": "block",
            opacity: 0
          });

          $("#bluz-overlay").fadeTo(200, o.overlay);

          modal.css({
            "display": "block",
            "position": "fixed",
            "opacity": 0,
            "z-index": 1000,
            "left": o.left,
            "margin-left": -(modal_width / 2) + "px",
            "top": o.top
          });

          modal.fadeTo(200, 1);
          e.preventDefault();
        });

      });
    }
})(jQuery);
