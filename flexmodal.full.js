/*
 * module: flexModal
 * version: 0.1
 * author: dzung nguyen
 * email: bluesky.1289@gmail.com
 *
 * License: WTFGL
 */

(function($) {

  /*
  @align : default [center] : option to calculat position of dialog. it could be one of these
                  value : left, right, top, bottom, center, top-left, top-right, bottom-left, bottom-right
  top: "50%",     // top postion of modal dialog
  left: "50%",    // left postion of modal dialog
  overlay: 0.5,   // transparent value for overlay layer
  events: {},     // events map for binding within dialog content
  modal: false,   // show as a modal dialog ( does not close when click outside of dialog)
   */
  var defaultOptions = {
    align: "center",
    x_offset: "0",
    y_offset: "0",
    overlay: 0.5,
    events: {},
    modal: false,
  };

  var currentModal = undefined;
  var currentOptions = undefined;
  var initialSize = undefined;

  function ensureInit() {
    if ($('#flex-overlay').length == 0) {
      // create overlay element
      var overlay = $("<div id='flex-overlay'></div>");
      $("body").append(overlay);
    }
  }

  /*
    Logic for setting CSS property base on align option
   */
  function calculatePostionCss(modal, options) {
    var position = {
      width: "",
      height: ""
    }
    var width = modal.outerWidth();
    var height = modal.outerHeight();

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    if(initialSize == undefined){
      initialSize = {
        width: width,
        height: height
      };
    }

    if(width > windowWidth - options.x_offset || width < initialSize.width){
      width = windowWidth - options.x_offset ;
      position.width = width + "px";
    }

    if(height > windowHeight - options.y_offset || height < initialSize.height){
      height = windowHeight - options.y_offset;
      position.height = height + "px";
    }

    var x_margin = ((options.x_offset - width) / 2) + "px";
    var y_margin = ((options.y_offset - height) / 2) + "px";

    switch (options.align) {
      case "center":
        position["top"] = "50%";
        position["left"] = "50%";
        position["margin-left"] = x_margin;
        position["margin-top"] = y_margin;
        break;
      case "top":
        position["top"] = 0;
        position["left"] = "50%";
        position["margin-left"] = x_margin;
        position["margin-top"] = options.y_offset + "px";
        break;
      case "left":
        position["top"] = "50%";
        position["left"] = 0;
        position["margin-top"] = y_margin;
        position["margin-left"] = options.x_offset + "px";
        break;
      case "bottom":
        position["bottom"] = 0;
        position["left"] = "50%";
        position["margin-left"] = x_margin;
        position["margin-bottom"] = options.y_offset + "px";
        break;
      case "right":
        position["top"] = "50%";
        position["right"] = 0;
        position["margin-top"] = y_margin;
        position["margin-right"] = options.x_offset + "px";
        break;
    }

    return position;
  }

  /*
    Hide the modal dialog
   */
  function hideModal(modal) {
    $("#flex-overlay").css({
      'display': 'none',
      opacity: 0
    });

    if (typeof modal == 'string')
      modal = $(modal);

    modal.css({
      "display": "none"
    });

    // clear current modal data
    currentModal = undefined;
    currentOptions = undefined;
  }

  /*

   */
  function renderModal(options, update) {
    var modal = this;
    // bind click even on overlay
    $('#flex-overlay').off();
    if (!options.modal) {
      $('#flex-overlay').on('click', function(e) {
        hideModal(modal);
      });
    }

    var css = {
      "display": "block",
      "position": "fixed",
      "z-index": 1000
    };

    css = $.extend(css, calculatePostionCss(this, options));
    this.removeAttr('style'); // clear all current css
    this.css(css);

    // show overlay with animation
    if(update != true){
      $("#flex-overlay").css({
        "display": "block",
        opacity: 0
      });
      $("#flex-overlay").fadeTo(200, options.overlay);

      this.css("opacity", "0");
      this.fadeTo(200, 1);
    }
  }

  function updateModalSize(event){
    if(currentModal != null && currentOptions != null){
      renderModal.call(currentModal, currentOptions, true);
    }
  }

  /*
    Show an HTML node as a dialog
    Ex: $('#popup').flexModal();
      this code will show up a modal using html content in #popup element
   */
  $.fn.flexModal = function(options) {
    ensureInit();
    initialSize = undefined;
    options = $.extend({}, defaultOptions, options);

    // map events
    // click .ok : handleOK
    // handle function will be invoked when button with class .ok is clicked
    var self = this;
    $.map(options.events, function(handler, action) {
      var els = action.split(" ");
      $(els[1]).off();
      $(els[1]).on(els[0], function(e) {
        if (handler != undefined) {
          hideModal(self);
          handler(e);
        }
      });
    });

    renderModal.call(this, options);

    // store current modal
    currentModal = this;
    currentOptions = options;
  };

  $.fn.flexBindModal = function(options) {
    ensureInit();
    initialSize = undefined;
    options = $.extend({}, defaultOptions, options);

    return this.each(function() {
      $(this).click(function(e) {

        var modalId = $(this).attr("data-toggle");
        var modal = $(modalId);

        // bind click even on overlay
        $('#flex-overlay').off();
        $('#flex-overlay').on('click', function(e) {
          hideModal(modalId);
        });

        // find all element in dialog which has attribute data-event
        // data-trigger="click"
        // data-event="onClickFunction"
        // onClickFunction function will be invoked when element is clicked
        modal.find('[data-event]').off();
        modal.find('[data-event]').each(function() {
          var evtName = $(this).attr('data-trigger');

          $(this).on(evtName, function(e) {
            var eventHandler = $(this).attr('data-event');
            if (eventHandler != "" && typeof window[eventHandler] == 'function') {
              hideModal(modal);
              window[eventHandler](e);
            }
          })
        });

        renderModal.call(modal, options);
        // store current modal
        currentModal = modal;
        currentOptions = options;
        e.preventDefault();
      });

    });
  }

  // update modal dialog size when window resize
  $( window ).resize(updateModalSize);
})(jQuery);
