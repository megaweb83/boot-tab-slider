# Boot Tab Slider

Boot Tab Slider is a useful extension to bring full responsiveness to the Bootstrap Nav Tabs functionality with a simple jQuery plugin. Boasts cross-browser support back to IE9. Easy to implement, extend, and supports jQuery chaining.

## Live Demo

Coming Soon

## Installation

Download the necessary files:

* Javascript from `src/js/jquery.boot-tab-slider.js` or `dist/js/jquery.boot-tab-slider.min.js`
* CSS from `dist/js/jquery.boot-tab-slider.min.css`

Place them in your directory and link to them from your implementation page - include the CSS link in the `head`, and the Javascript file after the jQuery and Bootstrap js scripts and before the closing `body` tag.

## Implementation

To instantiate the Boot Tab Slider, add the standard nav tab structure from the [Bootstrap website](http://getbootstrap.com/javascript/#tabs). Then add the class `boot-tab-slider` to the container div in the snippet above. Then wrap the nav tabs in an additional container, with the class of `boot-tab-slider__wrapper`. It should look like the following, once finalized:

```html
<div class="boot-tab-slider" id="my-slider-container">
  <div class="boot-tab-slider__wrapper">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
      <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
      <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
    </ul>
  </div>
  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="home">...</div>
    <div role="tabpanel" class="tab-pane" id="profile">...</div>
    <div role="tabpanel" class="tab-pane" id="messages">...</div>
    <div role="tabpanel" class="tab-pane" id="settings">...</div>
  </div>
</div>
```

Then initialize the Boot Tab Slider on the container by targeting that element in a script tag or separate js file (this can be whatever selector you want):

```javascript
// Default setup
$('#my-slider-container').bootTabSlider();
```

**Note:** This plugin does not currently support the Bootstrap dropdown nav tabs functionality.

## Options

The Boot Tab Slider plugin currently only accepts one option:

* **complete:** null (function) callback function after initialization of the boot tab slider

## Public Methods

This plugin exposes two public methods that can be called on the target element after instantiation. They are:

* **resetTabs:** Returns nav tabs to original position and shows / hides nav buttons

* **scrollTabs:** Scrolls nav tabs left or right, takes one parameter for direction of either "right" or "left"

Example usage:

```javascript
// Reset tab position
$('#my-slider-container').data('bootTabSlider').resetTabs();

// Invoke scroll left or right
$('#my-slider-container').data('bootTabSlider').scrollTabs('right');
```
