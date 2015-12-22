(function($){

  // create overlay element
  var overlay = $("<div id='lean-overlay'></div>");
  $("body").append(overlay);

  $.fn.extend({
    triggerModel: function(options) {
      var defaults = {
        top: 100,
        overlay: 0.5,
        events: {}
      };

      function close_modal(modal) {
        // $("#lean-overlay").fadeOut(200);
        $("#lean-overlay").css({'display': 'none', opacity: 0});
        modal.css({
          "display": "none"
        })
      }

      options = $.extend(defaults, options);
      var self = this;
      // map events
      // click .ok : handleOK
      // handle function will be invoked when button with class .ok is clicked
      $.map( options.events, function(handler, action){
        var els = action.split(" ");
        $(els[1]).on(els[0], function(e){
          if(handler != undefined){
            close_modal(self);
            handler(e);
          }
        });
      });

      var o = options;
      var modal_height = this.outerHeight();
      var modal_width = this.outerWidth();
      $("#lean-overlay").css({
        "display": "block",
        opacity: 0
      });
      $("#lean-overlay").fadeTo(200, o.overlay);
      // $("#lean-overlay").css({'display': "block", opacity: 0.5});

      this.css({
        "display": "block",
        "position": "fixed",
        "opacity": 0,
        "z-index": 11000,
        "left": 50 + "%",
        "margin-left": -(modal_width / 2) + "px",
        "top": o.top + "px"
      });
      this.fadeTo(200, 1);
    }
  })

    $.fn.extend({

        leanModal: function(options) {

            var defaults = {
                top: 100,
                overlay: 0.5,
                closeButton: null
            }

            var overlay = $("<div id='lean_overlay'></div>");

            $("body").append(overlay);

            options =  $.extend(defaults, options);

            return this.each(function() {

                var o = options;

                $(this).click(function(e) {

              	var modal_id = $(this).attr("href");

				$("#lean_overlay").click(function() {
                     close_modal(modal_id);
                });

                $(o.closeButton).click(function() {
                     close_modal(modal_id);
                });

              	var modal_height = $(modal_id).outerHeight();
        	  	var modal_width = $(modal_id).outerWidth();

        		$('#lean_overlay').css({ 'display' : 'block', opacity : 0 });

        		$('#lean_overlay').fadeTo(200,o.overlay);

        		$(modal_id).css({

        			'display' : 'block',
        			'position' : 'fixed',
        			'opacity' : 0,
        			'z-index': 11000,
        			'left' : 50 + '%',
        			'margin-left' : -(modal_width/2) + "px",
        			'top' : o.top + "px"

        		});

        		$(modal_id).fadeTo(200,1);

                e.preventDefault();

              	});

            });

			function close_modal(modal_id){

        		$("#lean_overlay").fadeOut(200);

        		$(modal_id).css({ 'display' : 'none' });

			}

        }
    });

})(jQuery);
