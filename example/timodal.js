/*
 * module: tiModal
 * version: 1.2
 * author: dzung nguyen
 * email: bluesky.1289@gmail.com
 *
 * License: WTFGL
 */

var tiModal = (function() {
  var defaultOptions = {
    backgroundColor: "rgba(0,0,0,0.5)",
    events: {},
    modal: false
  };

  var defaultEvents = {
    "click [data-modal-toggle=close]": function(e){this.close();}
  };

  // list of all created modal
  var activeModals = [];

  function extend(obj) {
      [].slice.call(arguments, 1).forEach(function(source) {
          for (var attr in source) {
              obj[attr] = source[attr];
          }
      });
      return obj;
  };

  // TiModal class definition
  var TiModal = function(html, options){
    options = options || {};
    this.options = extend({}, defaultOptions, options);

    function createOverlay() {
        var overlay = document.createElement("div");
        overlay.className = 'tioverlay';
        overlay.style["backgroundColor"] = "" + this.options.backgroundColor;
        document.body.appendChild(overlay);

        this.overlay = overlay;
    }

    createOverlay.call(this);
    if(this.overlay == null){
      throw("Cannot initialize modal");
    }else {
      this.overlay.innerHTML = html;
    }

    events = extend({}, defaultEvents, options.events);
    this._bindEvents(events);
  }

  TiModal.prototype._bindEvents = function(eventMap){
    var self = this;
    Object.keys(eventMap).map(function(key, index) {
      var parts = key.split(" ");
      var eventName = parts[0];
      var selector = parts[1];

      var targets = self.overlay.querySelectorAll(selector);
      if(typeof eventMap[key] === "function"){
        self._bindEvent(targets, eventName, eventMap[key].bind(self));
      }
    });

    // event click on overlay
    if(this.options.modal == false){
      this.overlay.addEventListener("click", function(e){
        if(self.overlay == e.target)
          self.close();
      })
    }
  }

  TiModal.prototype._bindEvent = function(elements, eventName, callback){
    if(elements.length == undefined){
      elements.addEventListener(eventName, callback);
    }else{
      for(var i = 0; i < elements.length; i++){
        this._bindEvent(elements[i], eventName, callback);
      }
    }
  }

  TiModal.prototype.show = function(){
    this.overlay.style["display"] = "block";
  }

  TiModal.prototype.hide = function(){
    this.overlay.style["display"] = "none";
  }

  TiModal.prototype.dispose = function(){
    this.overlay.parentNode.removeChild(this.overlay);
  }

  TiModal.prototype.close = function(){
    var index = activeModals.indexOf(this);
    if(index >= 0){
      activeModals.splice(index, 1);
    }
    this.dispose();
  }

  // create new modal instance
  function create(html, options){
    var modal = new TiModal(html, options);
    activeModals.push(modal);
    return modal;
  }

  // close last opened modal
  function closeCurrent(){
    if(activeModals.length > 0){
      var index = activeModals.length - 1;
      activeModals[index].dispose();
      activeModals.splice(index, 1);
    }
  }

  // close and clean all modal
  function closeAll(){
    for(var i = activeModals.length - 1; i >= 0; i-- ){
      activeModals[i].dispose();
    }
    activeModals = [];
  }

  return {
    create: create,
    close: closeCurrent,
    closeAll: closeAll
  };
})();
