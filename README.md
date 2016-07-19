# FlexModal
FlexModal is a

### - lightweight

### - pure javascript

 library to create modal dialog.

It's simple, flexible and easy to customize. You can change source code if you want.

## **[Download](https://github.com/bluzky/flexModal/releases/tag/v1.3)**


## How to use FlexModal

### 1. CSS.

#### Add following CSS rules to your css stylesheet before using FlexModal
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

.popup{
  background-color: #fff;
  display: none;
  position: absolute;
  left: 0;
  top: 0;
}
```



### 2. Basic usage

#### **Html code**

```html
<button id="show-modal">Show modal</button>
<div class="popup" id="popup">
  This is a simple dialog
</div>
```



#### Bind button clicked event with a function to show modal

**Pure Javascript**

```javascript
var button = document.querySelector('#show-modal');
button.addEventListener('click', function(){
  var modal = FlexModal.create('#popup');
  modal.render();
});
```

**Using jquery**

```js
$(document).ready(function(){
  $('#show-modal').click(function(){
    $('#popup').flexModal();
  });
});
```



### 3. Binding event using code

#### **Html code**
```html
<button id="show-modal">Show modal</button>
<div class="popup" id="popup">
  This is a dialog modal with 2 buttons
  <button id="ok">OK</button>
  <button class="cancel">Cancel</button>
</div>
```



#### **PureJavascript**

```javascript

modal.render();
function onOk(e){
  FlexModal.close();
  alert('You click OK button');
}

function onCancel(e){
  FlexModal.close();
  alert('You click Cancel button');
}

var button = document.querySelector('#show-modal');
button.addEventListener('click', function(){
  var modal =  FlexModal.create(
                              '#popup',
                              {
                                  events:{
                                      'click #ok': onOk, // bind click event on button #ok with function onOk
                                      'click .cancel': onCancel // bind click event on button with class .cancel  with function onCancel
                                  }
                              }
                            );
  modal.render();
});
```



**Using Jquery**

```js
function onOk(e){
  $(this).closeFlexModal();
  alert('You click OK button');
}

function onCancel(e){
  $(this).closeFlexModal();
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



### 4. API

#### 4.1 Javascript

- Create modal

  `FlexModal.create(control, options)`

  - control: Dom Node or selector are accepted
  - options: see below

- Hide current modal

  `FlexModal.close()`

#### 4.2 Jquery

- Create modal

  `.flexModal(options)`

- Hide current modal

  `.closeFlexModal()`



### 5. All possible options

```javascript
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
```

| **option**      | **type** | **default** | **description**                          |
| --------------- | -------- | ----------- | ---------------------------------------- |
| `overlay`       | number   | 0.5         | The opacity of overlay layer             |
| `event`         | object   | {}          | Map of event will be bind for this modal. **format**: `"event selector": callbackFunction` |
| `modal`         | boolean  | false       | `false`: close modal when click on the overlay   `true`: only close modal when call close modal API |
| `modalPosition` | function |             | Function which return custom modal position. By default modal will be display at the center of the page. |
|                 |          |             |                                          |
