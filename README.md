# FlexModal
FlexModal is a lightweight Jquery plugin to create modal dialog.
It's simple, easy to customize. You can change source code if you want.


## How to use FlexModal

### 1. Basic usage.

#### Css class for overlay layer
```css
#flex-overlay {
  position: fixed;
  z-index:100;
  top: 0px;
  left: 0px;
  height:100%;
  width:100%;
  background: #000;
  display: none;
}
```

#### Html code
```html
<button id="show-modal">Show modal</button>
<div class="popup" id="popup">
  This is a simple dialog
</div>
```

#### Bind button clicked event with a function to show modal
```js
$(document).ready(function(){
  $('#show-modal').click(function(){
    $('#popup').flexModal();
  });
});
```

### 2. Binding event on dialog using htm attribute
#### add css class as above
#### Html code
```html
<button id="show-modal" data-toggle="#popup">Show modal</button>
<div class="popup" id="popup">
  This is a modal with button
  <button data-event="onOk" data-trigger="click">OK</button>
  <button data-event="onCancel" data-trigger="click">Cancel</button>
</div>

```

- `data-toggle="#popup"` : this is used if you want flexModal automatically bind action element with a modal when invoke function `$('[data-toggle]').flexBindModal();`

- For element you want to listen to its events, specify two attributes:
    - `data-trigger`: name of event you want to handle: click, hover,...
    - `data-event`: name of function to handle this event

#### Javascript
```js
$(document).ready(function(){
  $('[data-toggle]').flexBindModal();
});
function onOk(e){
  alert('You click OK button');
}

function onCancel(e){
  alert('You click Cancel button');
}
```

**Notes:**

Current **flexModal** only support listening to 1 event for each element on modal dialog.

If you want to listen to more than one event for an element, you can customize options as below.


### 3. Binding event using code
#### add Css class as in #1
#### Html code
```html
<button id="show-modal">Show modal</button>
<div class="popup" id="popup">
  This is a dialog modal with 2 buttons
  <button id="ok">OK</button>
  <button class="cancel">Cancel</button>
</div>
```

#### Javascript binding event
```js
function onOk(e){
  alert('You click OK button');
}

function onCancel(e){
  alert('You click Cancel button');
}

$(document).ready(function(){
    $('#show-modal').click(function(){
      $('#popup').flexModal({
          events:{
              'click #ok': onOk, // bind click event on button #ok with function onOk
              'click .cancel': onCancel // bind click event on button with class .cancel  with function onCancel
          }
      });
    }
});
```


## 2. All possible options
