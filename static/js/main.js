(function(){
    // Responsive Tabbed Navigation - by CodyHouse.co
  function TabbedNavigation( element ) {
    this.element = element;
    this.navigation = this.element.getElementsByClassName("cd-tabs__navigation")[0];
    this.navigationElements = this.navigation.getElementsByClassName("cd-tabs__list")[0];
    this.content = this.element.getElementsByClassName("cd-tabs__panels")[0];
    this.activeTab;
    this.activeContent;
    this.init();
  };

  TabbedNavigation.prototype.init = function() {
    var self = this;
    //listen for the click on the tabs navigation
    this.navigation.addEventListener("click", function(event){
      event.preventDefault();
      var selectedItem = event.target.closest('.cd-tabs__item');
      if(selectedItem && !Util.hasClass(selectedItem, "cd-tabs__item--selected")) {
        self.activeTab = selectedItem;
        self.activeContent = document.getElementById(self.activeTab.getAttribute("href").replace('#', ''));
        self.updateContent();
      }
    });

    //listen for the scroll in the tabs navigation
    this.navigationElements.addEventListener('scroll', function(event){
      self.toggleNavShadow();
    });
  };

  TabbedNavigation.prototype.updateContent = function() {
    var self = this;
    var actualHeight = this.content.offsetHeight;
    //update navigation classes
    Util.removeClass(this.navigation.querySelectorAll(".cd-tabs__item--selected")[0], "cd-tabs__item--selected");
    Util.addClass(this.activeTab, "cd-tabs__item--selected");
    //update content classes
    Util.removeClass(this.content.querySelectorAll(".cd-tabs__panel--selected")[0], "cd-tabs__panel--selected");
    Util.addClass(this.activeContent, "cd-tabs__panel--selected");
    //set new height for the content wrapper
    if(window.requestAnimationFrame && window.getComputedStyle(this.element).getPropertyValue('display') == 'block') {
      Util.setHeight(actualHeight, this.activeContent.offsetHeight, this.content, 200, function(){
        self.content.removeAttribute('style');
      });
    }
  };

  TabbedNavigation.prototype.toggleNavShadow = function() {
    //show/hide tabs navigation gradient layer
    this.content.removeAttribute("style");
    var navItems = this.navigationElements.getElementsByClassName("cd-tabs__item"),
      navigationRight = Math.floor(this.navigationElements.getBoundingClientRect().right),
      lastItemRight = Math.ceil(navItems[navItems.length - 1].getBoundingClientRect().right);
    ( navigationRight >= lastItemRight )
      ? Util.addClass(this.element, "cd-tabs--scroll-ended")
      : Util.removeClass(this.element, "cd-tabs--scroll-ended");
  };

  var tabs = document.getElementsByClassName("js-cd-tabs"),
    tabsArray = [],
    resizing = false;
  if( tabs.length > 0 ) {
    for( var i = 0; i < tabs.length; i++) {
      (function(i){
        tabsArray.push(new TabbedNavigation(tabs[i]));
      })(i);
    }

    window.addEventListener("resize", function(event) {
      if( !resizing ) {
        resizing = true;
        (!window.requestAnimationFrame) ? setTimeout(checkTabs, 250) : window.requestAnimationFrame(checkTabs);
      }
    });
  }

  function checkTabs() {
    tabsArray.forEach(function(tab){
      tab.toggleNavShadow();
    });
    resizing = false;
  };
})();


// Utility function
function Util () {};

/*
	class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

/*
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

/*
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){
    if (!currentTime) currentTime = timestamp;
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.setAttribute("style", "height:"+val+"px;");
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };

  //set the height of the element before starting animation -> fix bug on Safari
  element.setAttribute("style", "height:"+start+"px;");
  window.requestAnimationFrame(animateHeight);
};

/*
	Smooth Scroll
*/

Util.scrollTo = function(final, duration, cb) {
  var start = window.scrollY || document.documentElement.scrollTop,
      currentTime = null;

  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    window.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};

/*
  Focus utility classes
*/

//Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};

/*
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

/*
	Polyfills
*/
//Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}

//Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/*
	Animation curves
*/
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};