	/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
 (function($){$.fn.superfish=function(op){var sf=$.fn.superfish,c=sf.c,$arrow=$(['<span class="',c.arrowClass,'"> &#xbb;</span>'].join("")),over=function(){var $$=$(this),menu=getMenu($$);clearTimeout(menu.sfTimer);$$.showSuperfishUl().siblings().hideSuperfishUl();},out=function(){var $$=$(this),menu=getMenu($$),o=sf.op;clearTimeout(menu.sfTimer);menu.sfTimer=setTimeout(function(){o.retainPath=($.inArray($$[0],o.$path)>-1);$$.hideSuperfishUl();if(o.$path.length&&$$.parents(["li.",o.hoverClass].join("")).length<1){over.call(o.$path);}},o.delay);},getMenu=function($menu){var menu=$menu.parents(["ul.",c.menuClass,":first"].join(""))[0];sf.op=sf.o[menu.serial];return menu;},addArrow=function($a){$a.addClass(c.anchorClass).append($arrow.clone());};return this.each(function(){var s=this.serial=sf.o.length;var o=$.extend({},sf.defaults,op);o.$path=$("li."+o.pathClass,this).slice(0,o.pathLevels).each(function(){$(this).addClass([o.hoverClass,c.bcClass].join(" ")).filter("li:has(ul)").removeClass(o.pathClass);});sf.o[s]=sf.op=o;$("li:has(ul)",this)[($.fn.hoverIntent&&!o.disableHI)?"hoverIntent":"hover"](over,out).each(function(){if(o.autoArrows){addArrow($(">a:first-child",this));}}).not("."+c.bcClass).hideSuperfishUl();var $a=$("a",this);$a.each(function(i){var $li=$a.eq(i).parents("li");$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});});o.onInit.call(this);}).each(function(){var menuClasses=[c.menuClass];if(sf.op.dropShadows&&!($.browser.msie&&$.browser.version<7)){menuClasses.push(c.shadowClass);}$(this).addClass(menuClasses.join(" "));});};var sf=$.fn.superfish;sf.o=[];sf.op={};sf.IE7fix=function(){var o=sf.op;if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined){this.toggleClass(sf.c.shadowClass+"-off");}};sf.c={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",arrowClass:"sf-sub-indicator",shadowClass:"sf-shadow"};sf.defaults={hoverClass:"sfHover",pathClass:"overideThisToUse",pathLevels:1,delay:800,animation:{opacity:"show"},speed:"normal",autoArrows:true,dropShadows:true,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.extend({hideSuperfishUl:function(){var o=sf.op,not=(o.retainPath===true)?o.$path:"";o.retainPath=false;var $ul=$(["li.",o.hoverClass].join(""),this).add(this).not(not).removeClass(o.hoverClass).find(">ul").hide().css("visibility","hidden");o.onHide.call($ul);return this;},showSuperfishUl:function(){var o=sf.op,sh=sf.c.shadowClass+"-off",$ul=this.addClass(o.hoverClass).find(">ul:hidden").css("visibility","visible");sf.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){sf.IE7fix.call($ul);o.onShow.call($ul);});return this;}});})(jQuery);

 $(document).ready(function($) { 

   $('ul.menu, ul#children, ul.sub-menu').superfish({ 
		delay:       100,								// 0.1 second delay on mouseout 
		animation:   {opacity:'show',height:'show'},	// fade-in and slide-down animation 
		dropShadows: false								// disable drop shadows 
	});

 });

 $(document).ready(function() {
	// Create the dropdown base
 $("<select />").appendTo("#navigation");

      // Create default option "Go to..."
      $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Go to..."
     }).appendTo("#navigation select");
      
      // Populate dropdown with menu items
      $("#navigation > ul > li:not([data-toggle])").each(function() {

      	var el = $(this);

      	var hasChildren = el.find("ul"),
       children    = el.find("li > a");
       
       if (hasChildren.length) {

        $("<optgroup />", {
         "label": el.find("> a").text()
       }).appendTo("#navigation select");

        children.each(function() {

         $("<option />", {
           "value"   : $(this).attr("href"),
           "text": " - " + $(this).text()
         }).appendTo("optgroup:last");

       });

      } else {
      	
        $("<option />", {
          "value"   : el.find("> a").attr("href"),
          "text"    : el.find("> a").text()
        }).appendTo("#navigation select");

      } 

    });

      $("#navigation select").change(function() {
        window.location = $(this).find("option:selected").val();
      });

	//END -- Menus to <SELECT>
	
// Scroll to Top script
jQuery(document).ready(function($){
  $('a[href=#top]').click(function(){
    $('html, body').animate({scrollTop:0}, 'slow');
    return false;
  });
});
}); //END -- JQUERY document.ready


function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}


var request = createCORSRequest("get", "http://www.topix.com/rss/city/east-palo-alto-ca.xml");
if (request){
    request.onload = function(data) {
        $(data).find("channel").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("East Palo Alto News: " + el.find("East Palo Alto News").text());
        console.log("author     : " + el.find("author").text());
        console.log("Local news for East Palo Alto, CA continually updated from thousands of sources on the web.: " + el.find("Local news for East Palo Alto, CA continually updated from thousands of sources on the web.").text()); 
      }); 
    };
    //request.onreadystatechange = handler;
    request.send();
}

  /*$.get("http://www.topix.com/rss/city/east-palo-alto-ca.xml", function (data) {
  $(data).find("channel").each(function () { // or "item" or whatever suits your feed
    var el = $(this);

    console.log("------------------------");
    console.log("East Palo Alto News: " + el.find("East Palo Alto News").text());
    console.log("author     : " + el.find("author").text());
    console.log("Local news for East Palo Alto, CA continually updated from thousands of sources on the web.: " + el.find("Local news for East Palo Alto, CA continually updated from thousands of sources on the web.").text()); 
  }); 
});*/

// $.ajax({
//   url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://www.topix.com/rss/city/east-palo-alto-ca.xml"),
//   dataType : 'json',
//   success  : function (data) {
//     if (data.responseData.feed && data.responseData.feed.entries) {
//       $.each(data.responseData.feed.entries, function (i, e) {
//         console.log("------------------------");
//         console.log("title      : " + e.title);
//         console.log("author     : " + e.author);
//         console.log("description: " + e.description);
//       });
//     }
//   }
// });

//$.get(FEED_URL, function (data) {
 //   $(data).find("entry").each(function () { // or "item" or whatever suits your feed
    //    var el = $(this);

   //     console.log("------------------------");
   //     console.log("title      : " + el.find("title").text());
   //     console.log("author     : " + el.find("author").text());
   //     console.log("description: " + el.find("description").text());
 //   });
//});