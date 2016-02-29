/**
 *  Copyright 2015 Andrew Cox
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function($) {
  'use strict';

  $.bootTabSlider = function(element, options) {
    var $element = $(element),
        plugin = this,
        tabs = $element.find('.nav-tabs > li').toArray(),
        $wrapper = $(element).find('.boottab-slider__wrapper'),
        $nav = $(element).find('.nav-tabs'),
        $scrollLeft = $element.find('.boottab-slider__scroll-left'),
        $scrollRight = $element.find('.boottab-slider__scroll-right');
    plugin.DEFAULTS = {
      complete: null
    };
    plugin.settings = {};

    /**
     * init
     *
     * @description Intializes the plugin. Returns nothing
     */
    plugin.init = function() {
      plugin.settings = $.extend({}, plugin.DEFAULTS, options);
      bindListeners();
      plugin.resetTabs();

      /** Callback function on setup complete */
      if ($.isFunction( plugin.settings.complete )) {
        plugin.settings.complete.call( this );
      }
    };

    /**
     * totalTabWidth
     *
     * @description Determine width of all nav tabs - private
     * @return {Number} Total width of nav tabs
     */
    var totalTabWidth = function() {
      var total = 0;
      $.each(tabs, function(index, tab) {
        var tabWidth = $(tab).outerWidth();
        total += tabWidth;
      });

      return total;
    };

    /**
     * resetTabs
     *
     * @description Reset tabs to their original position and determine scrollability. Returns nothing - public
     */
    plugin.resetTabs = function() {
      var containerWidth = $wrapper.outerWidth();
      $nav.css('left', 0);
      $scrollLeft.fadeOut();

      if (containerWidth < totalTabWidth()) {
        $scrollRight.fadeIn();
      } else {
        $scrollRight.fadeOut();
      }
    };

    /**
     * scrollTabs
     *
     * @description Scroll tabs left or right depending on current position. Returns nothing - public
     */
    plugin.scrollTabs = function(direction) {
      var totalWidth = $wrapper.outerWidth();
      var tabWidth = totalTabWidth();
      var currentOffset = $nav.position().left;
      var nextIndex = findClosestTabIndex(direction, totalWidth, tabWidth, currentOffset);
      var newPosition;

      if (direction === 'right') {
        if (nextIndex >= 0) {
          var $nextTab = $nav.find('> li').eq(nextIndex);
          newPosition = $nextTab.position().left;

          if (newPosition > Math.abs(tabWidth - totalWidth)) {
            $nav.css('left', -(Math.abs(tabWidth - totalWidth)));
            $scrollRight.fadeOut();
          } else {
            $nav.css('left', -newPosition);
          }
        } else {
          $nav.css('left', -(Math.abs(tabWidth - totalWidth)));
          $scrollRight.fadeOut();
        }
        $scrollLeft.fadeIn();
      } else if (direction === 'left') {
        if (nextIndex >= 0) {
          var $nextElement = $nav.find('> li').eq(nextIndex);
          newPosition = $nextElement.position().left - totalWidth;

          if (newPosition <= 0) {
            $nav.css('left', 0);
            $scrollLeft.fadeOut();
          } else {
            $nav.css('left', -newPosition);
          }
        } else {
          $nav.css('left', 0);
          $scrollLeft.fadeOut();
        }

        $scrollRight.fadeIn();
      }
    };

    /**
     * findClosestTabIndex
     *
     * @description Return the index of the closest tab that's not fully visible - private
     * @param {String} Nav tab scroll direction
     * @return {Number} Index of closest tab
     */
    var findClosestTabIndex = function(direction, totalWidth, tabWidth, currentOffset) {
      var scrollIndex = -1;

      if (direction === 'right') {
        totalWidth += Math.abs(currentOffset);
        $.each(tabs, function(index, tab) {
          var tabWidth = $(tab).outerWidth();
          totalWidth -= tabWidth;

          if (totalWidth <= 0) {
            scrollIndex = index;
            return false;
          }
        });
        return scrollIndex;
      } else if (direction === 'left') {
        var reverseArray = tabs.reverse();
        var targetIndex = tabWidth - Math.abs(currentOffset);

        $.each(reverseArray, function(index, tab) {
          var tabWidth = $(tab).outerWidth();
          targetIndex -= tabWidth;

          if (targetIndex < 0) {
            scrollIndex = Math.abs(index - reverseArray.length);
            return false;
          }
        });
        return scrollIndex;
      }
    };

    /**
     * bindListeners
     *
     * @description Add click listeners to scroll links. Returns nothing - private
     */
    var bindListeners = function() {
      $scrollLeft.on('click', function(event) {
        plugin.scrollTabs('left');
      });
      $scrollRight.on('click', function(event) {
        plugin.scrollTabs('right');
      });

      $(window).resize(function() {
        plugin.resetTabs();
      });
    };

    plugin.init();
  };

  $.fn.bootTabSlider = function( options ) {
    /** Return jQuery object for chaining */
    return this.each(function(index) {

      /** If plugin is not yet attached to this element, attach */
      if (undefined === $(this).data('bootTabSlider')) {
        var plugin = new $.bootTabSlider(this, options, index);
        $(this).data('bootTabSlider', plugin);
      }
    });
  };

})(jQuery);
