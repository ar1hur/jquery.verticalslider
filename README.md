#jquery.verticalslider
=====================

a tiny jquery plugin to slide images vertically

##The markup
``` html
<div class="my-slider-element">
  <div class="images">
    <ul>
      <li><img src="images/1.png"/></li>
      <li><img src="images/2.png"/></li>
      <li><img src="images/3.png"/></li>
      ...
    </ul>
  </div>      
  <a href="#" class="sprite-icons next">vor</a>					
  <a href="#" class="sprite-icons prev">zurück</a>	      
</div>
```    
##options (defaults)
``` js
startAt: 1,         // position of item to start
showItems: 4,       // number of items to see in viewport/container at once
navNext: '.next',   // css class of next button
navPrev: '.prev',   // css class of previous button
speed: 800,         // animation speed
hideNav: true,	    // hide navigation buttons when scrolling is not possible
rows:1              // set number of items in a row
```     
##usage
``` js
$(document).ready(function() {
  $('.my-slider-element').verticalSlider();
});
``` 