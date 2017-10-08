# TiModal
TiModal is a

### - lightweight

### - pure javascript

 library to create modal dialog.

It's simple, flexible and easy to customize. You can change source code if you want.

## **[Download](https://github.com/bluzky/TiModal/releases/tag/v2.1)**


## How to use TiModal

### 1. CSS.

#### Add following CSS rules to your css stylesheet before using TiModal
```css
/* REQUIRED CSS */
.tioverlay {
  position: fixed;
  z-index:100;
  top: 0px;
  left: 0px;
  height:100%;
  width:100%;
  display: none;
  text-align: center;
  overflow-y: auto;
}

/* CUSTOM CSS*/
.popup-wrapper {
  margin: 20px auto;
  display: inline-block;
  background: #fff;
  border-radius: 3px;
  padding: 30px;
  text-align: left;
}

.popup-content-wrapper .close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  z-index: 20;
  padding: 0;
}
```



### 2. Basic usage

#### **Html code**

```html
<button id="show-default-modal" class="btn-default">Default modal</button>

<!-- template for modal -->
<script type="text" id="default-modal">
    <div class="popup-wrapper">
      Hello my friend!
      <br/>
      This is a default modal
      <br/>
      <b>Click on overlay to hide me.</b>
    </div>
  </script>

```



#### Bind button clicked event with a function to show modal

**Pure Javascript**

```javascript
var button = document.querySelector('#show-default-modal');
button.addEventListener('click', function(){
  var html = document.getElementById("default-modal").innerHTML;
  var modal = tiModal.create(html)
  .show();
});
```

**Using jquery**

```js
$('#show-default-modal').click(function(){
  var html = $('#default-modal').html();
  tiModal.create(html).show();
});
```



### 3. Binding event using code

#### **Html code**
```html
<button id="show-confirm-modal" class="btn-default">Confirm modal</button>

<script type="text" id="confirm-modal">
    <div class="popup-wrapper">
      <div class="popup-header"> Warning </div>
      <div class="popup-content">
        This action cannot be reverted.
        Do you want to proceed?
      </div>
      <div class="popup-footer">
        <button class="btn-success cancel">Bring me back</button>
        <button class="btn-danger ok">Do it!</button>
      </div>
    </div>
  </script>
```



#### **Javascript**

```javascript

$('#show-confirm-modal').click(function(){
  var html = $('#confirm-modal').html();
  tiModal.create(html, {
    events: {
      'click .cancel': function(e){
        this.close();
      },
      'click .ok': function(e){
        this.close();
        alert('User has been deleted!')
      }
    }
  }).show();
});
```



### 4. API

#### 4.1 Public methods

- Create modal

  `TiModal.create(html, options)`

  **Params**

  - `html`: html template for modal
  - `options`: see below

  **Return** Modal object

- Hide current modal

  `TiModal.closeCurrent()`

- Hide all modal

  `TiModal.closeAll()`



#### 4.2 Modal object methods

- `.show()` : show dialog
- `.hide()` : hide dialog
- `.dispose()` : destroy dialog and remove from the memory


### 5. All possible options

```javascript
modal: false | true,
```

| **option** | **type** | **default** | **description**                          |
| ---------- | -------- | ----------- | ---------------------------------------- |
| `modal`    | boolean  | false       | `false`: close modal when click on the overlay   `true`: only close modal when call close modal API |
