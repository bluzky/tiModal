/*
 * module: flexModal
 * version: 1.1
 * author: dzung nguyen
 * email: bluesky.1289@gmail.com
 *
 * License: WTFGL
 */

var FlexModal = (function($) {
  /*
  overlay: 0.5,   // transparent value for overlay layer
  events: {},     // events map for binding within dialog content
  modal: false,   // show as a modal dialog ( does not close when click outside of dialog)
   */
  var defaultOptions = {
    overlay: 0.5,
    events: {},
    modal: false,
    modalPosition: function(modal){
      var width = modal.offsetWidth;
      var height = modal.offsetHeight;
      var position = {};
      position["top"] = "50%";
      position["left"] = "50%";
      position["margin-left"] = (-width/2) + "px";
      position["margin-top"] = (-height/2) + "px";
      return position;
    }
  };

  var currentModal = undefined;
  var currentOptions = undefined;
  var initialSize = undefined;

  var flex = {};
  flex.extend = function(obj) {
      [].slice.call(arguments, 1).forEach(function(source) {
          for (var attr in source) {
              obj[attr] = source[attr];
          }
      });
      return obj;
  };

  flex.FlexClass = function(methods) {
      var klass = function() {
          this.initialize.apply(this, arguments);
      };

      for (var property in methods) {
          klass.prototype[property] = methods[property];
      }

      if (!klass.prototype.initialize)
          klass.prototype.initialize = function() {};

      return klass;
  };

  flex.removeEvent = function(el){
    if(el.length == undefined){
      var elClone = el.cloneNode(true);
      el.parentNode.replaceChild(elClone, el);
      return elClone;
    }else{
      var result = [];
      for(var i = 0; i < el.length; i++){
        result.push(flex.removeEvent(el[i]));
      }
      return result;
    }
  }

  flex.bindEvent = function(el, eventName, callback){
    if(el.length == undefined){
      el.addEventListener(eventName, callback);
    }else{
      for(var i = 0; i < el.length; i++){
        flex.bindEvent(el[i], eventName, callback);
      }
    }
  }

  flex.cssAttributeName = function(cssName){
    return cssName.replace(/\-(.?)/i, function(a, b, c){
      return b.toUpperCase();
    });
  }

  flex.applyCss = function(el, css){
    for(var attribute in css){
      var attName = flex.cssAttributeName(attribute);
      el.style[attName] = css[attribute];
    }
  }

  // create overlay element
  function createOverlay() {
    if (document.querySelectorAll('#flex-overlay').length == 0) {
      var overlay = document.createElement("div");
      overlay.id = 'flex-overlay';
      document.body.appendChild(overlay);
    }
  }

  var FlexModal = flex.FlexClass({
    initialize: function(modal, options){

      if(typeof modal == "string"){
        modal = document.querySelector(modal);
      }
      this.modalView = modal;
      createOverlay();
      this.initialSize = undefined;
      this.options = flex.extend({}, defaultOptions, options);
      this.bindEvent();
    },

    bindEvent: function(){
      // map events
      // click .ok : handleOK
      // handle function will be invoked when button with class .ok is clicked
      var self = this;
      Object.keys(this.options.events).map(function(key, index) {
        var els = key.split(" ");
        var targets = self.modalView.querySelectorAll(els[1]);
        targets = flex.removeEvent(targets);
        flex.bindEvent(targets, els[0], function(e){
          if(self.options.events[key] != undefined){
            self.options.events[key](e);
          }
        });
      });

      window.addEventListener('resize', this.onResize.bind(this));
    },

    initSize: function(){
      var width = this.modalView.outerWidth;
      var height = this.modalView.outerHeight;
      this.initialSize = this.initialSize || {width: width, height: height};
    },

    render: function(){
      var overlay = document.querySelector('#flex-overlay');
      overlay = flex.removeEvent(overlay);
      if (!this.options.modal) {
        overlay.addEventListener('click', this.hideModal.bind(this));
      }

      var css = {
        "opacity": "1",
        "position": "fixed",
        "z-index": 1000
      };

      this.modalView.removeAttribute('style');
      flex.applyCss(this.modalView, {
        'display': 'block',
        'opacity': '1'
      });

      this.initSize();

      var self = this;
      setTimeout(function(){
        css = flex.extend(css, self.calculatePosition());
        flex.applyCss(self.modalView, css);

        flex.applyCss(overlay,{
          'display': 'block',
          'opacity': self.options.overlay
        });
      }, 10);
    },

    hideModal: function(){
      var overlay = document.querySelector('#flex-overlay');
      flex.applyCss(overlay,{
        'display': 'none',
        'opacity': '0'
      })

      this.modalView.style.display = 'none';
      window.removeEventListener('resize', this.onResize.bind(this));
    },

    onResize: function(){
      var css = this.calculatePosition();
      flex.applyCss(this.modalView, css);
    },

    calculatePosition: function(){
      if(typeof this.options.modalPosition == 'function'){
        var width = this.modalView.offsetWidth;
        var height = this.modalView.offsetHeight;
        var position =  this.options.modalPosition(this.modalView);

        if( width >= window.innerWidth){
          position['left'] = position['margin-left'] = '0';
        }if(height >= window.innerHeight){
          position['top'] = position['margin-top'] = '0';
        }

        return position;
      }else if(typeof this.options.modalPosition == 'object'){
        return this.options.modalPosition;
      }
      return {};
    }

  });

  if($ != null){
    $.fn.flexModal = function(options) {
      currentModal = new FlexModal(this.get(0), options);
      currentModal.render();
    };

    $.fn.closeFlexModal = function(){
      if(currentModal){
        currentModal.hideModal();
        currentModal = null;
      }
    }
  }

  function create(control, options){
    return currentModal = new FlexModal(control, options);
  }

  function closeCurrent(){
    if(currentModal != null){
      currentModal.hideModal();
      currentModal = null;
    }
  }

  return {
    create: create,
    close: closeCurrent
  };
})(jQuery);
