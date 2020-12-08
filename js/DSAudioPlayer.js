/*! DSAudioPlayer v1.0 | (c) 2016, Danial Sabagh | http://danialsabagh.com | http://mersadesign.com */
(function($){
    /*! roundSlider v1.0 | (c) 2015, Soundar | MIT license | http://roundsliderui.com/licence.html */
    (function($,window,undefined){"use strict";function $proxy(n,t){return typeof $.proxy=="function"?$.proxy(n,t):function(i){n.call(t,i)}}function $data(n,t,i){return typeof $.data=="function"?$.data(n,t,i):i?void 0:$(n).hasClass("rs-control")}function $isPlainObject(n){if(typeof $.isPlainObject=="function")return $.isPlainObject(n);var t=JSON.stringify(n);return typeof n=="object"&&n.length===undefined&&t.length>2&&t.substr(0,1)==="{"&&t.substr(t.length-1)==="}"}function isNumber(n){return n=parseFloat(n),typeof n=="number"&&!isNaN(n)}function createElement(n){var t=n.split(".");return $(document.createElement(t[0])).addClass(t[1]||"")}function getdistance(n,t){return Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y))}function setTransform(n,t){return n.css("-webkit-transform","rotate("+t+"deg)"),n.css("-moz-transform","rotate("+t+"deg)"),n.css("-ms-transform","rotate("+t+"deg)"),n.css("-o-transform","rotate("+t+"deg)"),n.css("transform","rotate("+t+"deg)"),n}function RoundSlider(n,t){n.id&&(window[n.id]=this);this.control=$(n);this.options=$.extend({},this.defaults,t);this._raise("beforeCreate")!==!1?(this._init(),this._raise("create")):this._removeData()}function CreateRoundSlider(n,t){for(var i,r,u=0;u<this.length;u++)if(i=this[u],r=$data(i,pluginName),r){if($isPlainObject(n))typeof r.option=="function"?r.option(n):i.id&&window[i.id]&&typeof window[i.id].option=="function"&&window[i.id].option(n);else if(typeof n=="string"&&typeof r[n]=="function"){if((n=="option"||n.startsWith("get"))&&t[2]===undefined)return r[n](t[1]);r[n](t[1],t[2])}}else $data(i,pluginName,new RoundSlider(i,n));return this}var pluginName="roundSlider";$.fn[pluginName]=function(n){return CreateRoundSlider.call(this,n,arguments)};RoundSlider.prototype={pluginName:pluginName,version:"1.0",options:{},defaults:{min:0,max:100,step:1,value:null,radius:85,width:18,handleSize:"+0",startAngle:0,endAngle:"+360",animation:!0,showTooltip:!0,editableTooltip:!0,readOnly:!1,disabled:!1,keyboardAction:!0,mouseScrollAction:!1,sliderType:"default",circleShape:"full",handleShape:"round",beforeCreate:null,create:null,start:null,drag:null,change:null,stop:null,tooltipFormat:null},_props:function(){return{numberType:["min","max","step","radius","width","startAngle"],booleanType:["animation","showTooltip","editableTooltip","readOnly","disabled","keyboardAction","mouseScrollAction"],stringType:["sliderType","circleShape","handleShape"]}},control:null,_init:function(){this._initialize();this._update();this._render()},_initialize:function(){(this._isBrowserSupport=this._isBrowserSupported(),this._isBrowserSupport)&&(this._originalObj=this.control.clone(),this._isReadOnly=!1,this._checkDataType(),this._refreshCircleShape())},_render:function(){if(this.container=createElement("div.rs-container"),this.innerContainer=createElement("div.rs-inner-container"),this.block=createElement("div.rs-block rs-outer rs-border"),this.container.append(this.innerContainer.append(this.block)),this.control.addClass("rs-control").empty().append(this.container),this._setRadius(),this._isBrowserSupport)this._createLayers(),this._setProperties(),this._setValue(),this._bindControlEvents("_bind"),this._checkIE();else{var n=createElement("div.rs-msg");n.html(typeof this._throwError=="function"?this._throwError():this._throwError);this.control.empty().addClass("rs-error").append(n)}},_update:function(){this._validateSliderType();this._updateStartEnd();this._validateStartEnd();this._handle1=this._handle2=this._handleDefaults();this._analyzeModelValue();this._validateModelValue()},_createLayers:function(){var i=this.options.width,t=this._start,n;n=createElement("div.rs-path rs-transition");this._rangeSlider||this._showRange?(this.block1=n.clone().addClass("rs-range-color").rsRotate(t),this.block2=n.clone().addClass("rs-range-color").css("opacity","0").rsRotate(t),this.block3=n.clone().addClass("rs-path-color").rsRotate(t),this.block4=n.addClass("rs-path-color").css({opacity:"1","z-index":"1"}).rsRotate(t-180),this.block.append(this.block1,this.block2,this.block3,this.block4).addClass("rs-split")):this.block.append(n.addClass("rs-path-color"));this.lastBlock=createElement("span.rs-block").css({padding:i});this.innerBlock=createElement("div.rs-inner rs-bg-color rs-border");this.lastBlock.append(this.innerBlock);this.block.append(this.lastBlock);this._appendHandle();this._appendOverlay();this._appendHiddenField()},_setProperties:function(){this._prechange=this._predrag=this.options.value;this._setHandleShape();this._addAnimation();this._appendTooltip();this.options.showTooltip||this._removeTooltip();this.options.disabled?this.disable():this.options.readOnly&&this._readOnly(!0);this.options.mouseScrollAction&&this._bindScrollEvents("_bind")},_setValue:function(){if(this._rangeSlider)this._setHandleValue(1),this._setHandleValue(2);else{this._showRange&&this._setHandleValue(1);var n=this.options.sliderType=="default"?this._active||1:parseFloat(this.bar.children().attr("index"));this._setHandleValue(n)}},_appendTooltip:function(){this.container.children(".rs-tooltip").length===0&&(this.tooltip=createElement("span.rs-tooltip rs-tooltip-text"),this.container.append(this.tooltip),this._tooltipEditable(),this._updateTooltip())},_removeTooltip:function(){this.container.children(".rs-tooltip").length!=0&&this.tooltip&&this.tooltip.remove()},_tooltipEditable:function(){if(this.tooltip&&this.options.showTooltip){var n;this.options.editableTooltip?(this.tooltip.addClass("edit"),n="_bind"):(this.tooltip.removeClass("edit"),n="_unbind");this[n](this.tooltip,"click",this._editTooltip)}},_editTooltip:function(){this.tooltip.hasClass("edit")&&!this._isReadOnly&&(this.input=createElement("input.rs-input rs-tooltip-text").css({height:this.tooltip.outerHeight(),width:this.tooltip.outerWidth()}),this.tooltip.html(this.input).removeClass("edit").addClass("hover"),this.input.val(this._getTooltipValue(!0)).focus(),this._bind(this.input,"blur",this._focusOut),this._bind(this.input,"change",this._focusOut))},_focusOut:function(n){n.type=="change"?(this.options.value=this.input.val().replace("-",","),this._analyzeModelValue(),this._validateModelValue(),this._setValue(),this.input.val(this._getTooltipValue(!0))):this.tooltip.addClass("edit").removeClass("hover");this._raiseEvent("change")},_setHandleShape:function(){var n=this.options.handleShape;this._handles().removeClass("rs-handle-dot rs-handle-square");n=="dot"?this._handles().addClass("rs-handle-dot"):n=="square"?this._handles().addClass("rs-handle-square"):this.options.handleShape=this.defaults.handleShape},_setHandleValue:function(n){this._active=n;var t=this["_handle"+n];this.options.sliderType!="min-range"&&(this.bar=this._activeHandleBar());this._changeSliderValue(t.value,t.angle)},_setAnimation:function(){this.options.animation?this._addAnimation():this._removeAnimation()},_addAnimation:function(){this.options.animation&&this.control.addClass("rs-animation")},_removeAnimation:function(){this.control.removeClass("rs-animation")},_setRadius:function(){var t=this.options.radius,i=t*2,n=this.options.circleShape,r=i,u=i,f,e;if(this.container.removeClass().addClass("rs-container"),n.indexOf("half")===0){switch(n){case"half-top":case"half-bottom":r=t;u=i;break;case"half-left":case"half-right":r=i;u=t}this.container.addClass(n.replace("half-","")+" half")}else n.indexOf("quarter")===0?(r=u=t,f=n.split("-"),this.container.addClass(f[0]+" "+f[1]+" "+f[2])):this.container.addClass("full "+n);e={height:r,width:u};this.control.css(e);this.container.css(e)},_border:function(){return parseFloat(this.block.css("border-top-width"))*2},_appendHandle:function(){(this._rangeSlider||!this._showRange)&&this._createHandle(1);(this._rangeSlider||this._showRange)&&this._createHandle(2);this._startLine=this._addSeperator(this._start,"rs-start");this._endLine=this._addSeperator(this._start+this._end,"rs-end")},_addSeperator:function(n,t){var r=createElement("span.rs-seperator").css({width:this.options.width,"margin-left":this._border()/2}),i=createElement("span.rs-bar rs-transition "+t).append(r).rsRotate(n);return this.container.append(i),i},_updateSeperator:function(){this._startLine.rsRotate(this._start);this._endLine.rsRotate(this._start+this._end)},_createHandle:function(n){var t=createElement("div.rs-handle rs-move"),i;t.attr({index:n,tabIndex:"0"});var r=this.control[0].id,r=r?r+"_":"",u=r+"handle"+(this.options.sliderType=="range"?"_"+(n==1?"start":"end"):"");return t.attr({role:"slider","aria-label":u}),i=createElement("div.rs-bar rs-transition").css("z-index","4").append(t).rsRotate(this._start),i.addClass(this.options.sliderType=="range"&&n==2?"rs-second":"rs-first"),this.container.append(i),this._refreshHandle(),this.bar=i,this._active=n,n!=1&&n!=2&&(this["_handle"+n]=this._handleDefaults()),this._bind(t,"focus",this._handleFocus),this._bind(t,"blur",this._handleBlur),t},_refreshHandle:function(){var hSize=this.options.handleSize,h,w,isSquare=!0,s,diff;if(typeof hSize=="string"&&isNumber(hSize))if(hSize.charAt(0)==="+"||hSize.charAt(0)==="-")try{hSize=eval(this.options.width+hSize.charAt(0)+Math.abs(parseFloat(hSize)))}catch(e){console.warn(e)}else hSize.indexOf(",")&&(s=hSize.split(","),isNumber(s[0])&&isNumber(s[1])&&(w=parseFloat(s[0]),h=parseFloat(s[1]),isSquare=!1));isSquare&&(h=w=isNumber(hSize)?parseFloat(hSize):this.options.width);diff=(this.options.width+this._border()-w)/2;this._handles().css({height:h,width:w,margin:-h/2+"px 0 0 "+diff+"px"})},_handleDefaults:function(){return{angle:this._valueToAngle(this.options.min),value:this.options.min}},_handles:function(){return this.container.children("div.rs-bar").find(".rs-handle")},_activeHandleBar:function(){return $(this.container.children("div.rs-bar")[this._active-1])},_handleArgs:function(){var n=this["_handle"+this._active];return{element:this._activeHandleBar().children(),index:this._active,value:n?n.value:null,angle:n?n.angle:null}},_raiseEvent:function(n){return this._updateTooltip(),n=="change"&&this._updateHidden(),this["_pre"+n]!==this.options.value?(this["_pre"+n]=this.options.value,this._raise(n,{value:this.options.value,handle:this._handleArgs()})):void 0},_elementDown:function(n){var u,t,r,h,i;if(!this._isReadOnly)if(u=$(n.target),u.hasClass("rs-handle"))this._handleDown(n);else{var f=this._getXY(n),e=this._getCenterPoint(),o=getdistance(f,e),s=this.block.outerWidth()/2,c=s-(this.options.width+this._border());o>=c&&o<=s&&(n.preventDefault(),t=this.control.find(".rs-handle.rs-focus"),this.control.attr("tabindex","0").focus().removeAttr("tabindex"),r=this._getAngleValue(f,e),h=r.angle,i=r.value,this._rangeSlider&&(t=this.control.find(".rs-handle.rs-focus"),this._active=t.length==1?parseFloat(t.attr("index")):this._handle2.value-i<i-this._handle1.value?2:1,this.bar=this._activeHandleBar()),this._changeSliderValue(i,h),this._raiseEvent("change"))}},_handleDown:function(n){n.preventDefault();var t=$(n.target);t.focus();this._removeAnimation();this._bindMouseEvents("_bind");this.bar=t.parent();this._active=parseFloat(t.attr("index"));this._handles().removeClass("rs-move");this._raise("start",{handle:this._handleArgs()})},_handleMove:function(n){n.preventDefault();var u=this._getXY(n),f=this._getCenterPoint(),t=this._getAngleValue(u,f),i,r;i=t.angle;r=t.value;this._changeSliderValue(r,i);this._raiseEvent("drag")},_handleUp:function(){this._handles().addClass("rs-move");this._bindMouseEvents("_unbind");this._addAnimation();this._raiseEvent("change");this._raise("stop",{handle:this._handleArgs()})},_handleFocus:function(n){if(!this._isReadOnly){var t=$(n.target);this._handles().removeClass("rs-focus");t.addClass("rs-focus");this.bar=t.parent();this._active=parseFloat(t.attr("index"));this.options.keyboardAction&&(this._bindKeyboardEvents("_unbind"),this._bindKeyboardEvents("_bind"));this.control.find("div.rs-bar").css("z-index","4");this.bar.css("z-index","5")}},_handleBlur:function(){this._handles().removeClass("rs-focus");this.options.keyboardAction&&this._bindKeyboardEvents("_unbind")},_handleKeyDown:function(n){var t,r,i,u;this._isReadOnly||(t=n.keyCode,t==27&&this._handles().blur(),t>=35&&t<=40)&&(t>=37&&t<=40&&this._removeAnimation(),r=this["_handle"+this._active],n.preventDefault(),t==38||t==37?i=this._round(this._limitValue(r.value+this.options.step)):t==39||t==40?i=this._round(this._limitValue(r.value-this._getMinusStep(r.value))):t==36?i=this._getKeyValue("Home"):t==35&&(i=this._getKeyValue("End")),u=this._valueToAngle(i),this._changeSliderValue(i,u),this._raiseEvent("change"))},_handleKeyUp:function(){this._addAnimation()},_getMinusStep:function(n){if(n==this.options.max){var t=(this.options.max-this.options.min)%this.options.step;return t==0?this.options.step:t}return this.options.step},_getKeyValue:function(n){return this._rangeSlider?n=="Home"?this._active==1?this.options.min:this._handle1.value:this._active==1?this._handle2.value:this.options.max:n=="Home"?this.options.min:this.options.max},_elementScroll:function(n){if(!this._isReadOnly){n.preventDefault();var i=n.originalEvent||n,r,t,f,u;(u=i.wheelDelta?i.wheelDelta/60:i.detail?-i.detail/2:0,u!=0)&&(this._updateActiveHandle(n),r=this["_handle"+this._active],t=r.value+(u>0?this.options.step:-this._getMinusStep(r.value)),t=this._limitValue(t),f=this._valueToAngle(t),this._removeAnimation(),this._changeSliderValue(t,f),this._raiseEvent("change"),this._addAnimation())}},_updateActiveHandle:function(n){var t=$(n.target);t.hasClass("rs-handle")&&t.parent().parent()[0]==this.control[0]&&(this.bar=t.parent(),this._active=parseFloat(t.attr("index")));this.bar.find(".rs-handle").hasClass("rs-focus")||this.bar.find(".rs-handle").focus()},_bindControlEvents:function(n){this[n](this.control,"mousedown",this._elementDown);this[n](this.control,"touchstart",this._elementDown)},_bindScrollEvents:function(n){this[n](this.control,"mousewheel",this._elementScroll);this[n](this.control,"DOMMouseScroll",this._elementScroll)},_bindMouseEvents:function(n){this[n]($(document),"mousemove",this._handleMove);this[n]($(document),"mouseup",this._handleUp);this[n]($(document),"mouseleave",this._handleUp);this[n]($(document),"touchmove",this._handleMove);this[n]($(document),"touchend",this._handleUp);this[n]($(document),"touchcancel",this._handleUp)},_bindKeyboardEvents:function(n){this[n]($(document),"keydown",this._handleKeyDown);this[n]($(document),"keyup",this._handleKeyUp)},_changeSliderValue:function(n,t){var r=this._oriAngle(t),i=this._limitAngle(t);if(this._rangeSlider||this._showRange){if(this._active==1&&r<=this._oriAngle(this._handle2.angle)||this._active==2&&r>=this._oriAngle(this._handle1.angle)){this["_handle"+this._active]={angle:t,value:n};this.options.value=this._rangeSlider?this._handle1.value+","+this._handle2.value:n;this.bar.rsRotate(i);this._updateARIA(n);var e=this._oriAngle(this._handle2.angle)-this._oriAngle(this._handle1.angle),u="1",f="0";e<=180&&(u="0",f="1");this.block2.css("opacity",u);this.block3.css("opacity",f);(this._active==1?this.block4:this.block2).rsRotate(i-180);(this._active==1?this.block1:this.block3).rsRotate(i)}}else this["_handle"+this._active]={angle:t,value:n},this.options.value=n,this.bar.rsRotate(i),this._updateARIA(n)},_updateARIA:function(n){var i=this.options.min,r=this.options.max,t;this.bar.children().attr({"aria-valuenow":n});this.options.sliderType=="range"?(t=this._handles(),t.eq(0).attr({"aria-valuemin":i}),t.eq(1).attr({"aria-valuemax":r}),this._active==1?t.eq(1).attr({"aria-valuemin":n}):t.eq(0).attr({"aria-valuemax":n})):this.bar.children().attr({"aria-valuemin":i,"aria-valuemax":r})},_getXY:function(n){return n.type.indexOf("mouse")==-1&&(n=(n.originalEvent||n).changedTouches[0]),{x:n.pageX,y:n.pageY}},_getCenterPoint:function(){var n=this.block.offset();return{x:n.left+this.block.outerWidth()/2,y:n.top+this.block.outerHeight()/2}},_getAngleValue:function(n,t){var r=Math.atan2(n.y-t.y,t.x-n.x),i=-r/(Math.PI/180);return i<this._start&&(i+=360),i=this._checkAngle(i),this._processStepByAngle(i)},_checkAngle:function(n){var i=this._oriAngle(n),t;return i>this._end&&(t=this._oriAngle(this["_handle"+this._active].angle),n=this._start+(t<=this._end-t?0:this._end)),n},_processStepByAngle:function(n){var t=this._angleToValue(n);return this._processStepByValue(t)},_processStepByValue:function(n){var r=this.options.step,e,t,u,f,i,o;return e=(n-this.options.min)%r,t=n-e,u=this._limitValue(t+r),f=this._limitValue(t-r),i=n>=t?n-t<u-n?t:u:t-n>n-f?t:f,i=this._round(i),o=this._valueToAngle(i),{value:i,angle:o}},_round:function(n){var t=this.options.step.toString().split(".");return t[1]?parseFloat(n.toFixed(t[1].length)):Math.round(n)},_oriAngle:function(n){var t=n-this._start;return t<0&&(t+=360),t},_limitAngle:function(n){return n>360+this._start&&(n-=360),n<this._start&&(n+=360),n},_limitValue:function(n){return n<this.options.min&&(n=this.options.min),n>this.options.max&&(n=this.options.max),n},_angleToValue:function(n){var t=this.options;return this._oriAngle(n)/this._end*(t.max-t.min)+t.min},_valueToAngle:function(n){var t=this.options;return(n-t.min)/(t.max-t.min)*this._end+this._start},_appendHiddenField:function(){this._hiddenField=createElement("input").attr({type:"hidden",name:this.control[0].id||"",value:this.options.value});this.control.append(this._hiddenField)},_updateHidden:function(){this._hiddenField.val(this.options.value)},_updateTooltip:function(){this.tooltip&&!this.tooltip.hasClass("hover")&&this.tooltip.html(this._getTooltipValue());this._updateTooltipPos()},_updateTooltipPos:function(){this.tooltip&&this.tooltip.css(this._getTooltipPos())},_getTooltipPos:function(){var n=this.options.circleShape,t;if(n=="full"||n=="pie"||n.indexOf("custom")===0)return{"margin-top":-this.tooltip.outerHeight()/2,"margin-left":-this.tooltip.outerWidth()/2};if(n.indexOf("half")!=-1){switch(n){case"half-top":case"half-bottom":t={"margin-left":-this.tooltip.outerWidth()/2};break;case"half-left":case"half-right":t={"margin-top":-this.tooltip.outerHeight()/2}}return t}return{}},_getTooltipValue:function(n){if(this._rangeSlider){var t=this.options.value.split(",");return n?t[0]+" - "+t[1]:this._tooltipValue(t[0])+" - "+this._tooltipValue(t[1])}return n?this.options.value:this._tooltipValue(this.options.value)},_tooltipValue:function(n){var t=this._raise("tooltipFormat",{value:n,handle:this._handleArgs()});return t!=null&&typeof t!="boolean"?t:n},_validateStartAngle:function(){var n=this.options.startAngle;return n=(isNumber(n)?parseFloat(n):0)%360,n<0&&(n+=360),this.options.startAngle=n,n},_validateEndAngle:function(){var end=this.options.endAngle;if(typeof end=="string"&&isNumber(end)&&(end.charAt(0)==="+"||end.charAt(0)==="-"))try{end=eval(this.options.startAngle+end.charAt(0)+Math.abs(parseFloat(end)))}catch(e){console.warn(e)}return end=(isNumber(end)?parseFloat(end):360)%360,end<=this.options.startAngle&&(end+=360),end},_refreshCircleShape:function(){var n=this.options.circleShape,i=["half-top","half-bottom","half-left","half-right","quarter-top-left","quarter-top-right","quarter-bottom-right","quarter-bottom-left","pie","custom-half","custom-quarter"],t;i.indexOf(n)==-1&&(t=["h1","h2","h3","h4","q1","q2","q3","q4","3/4","ch","cq"].indexOf(n),n=t!=-1?i[t]:n=="half"?"half-top":n=="quarter"?"quarter-top-left":"full");this.options.circleShape=n},_appendOverlay:function(){var n=this.options.circleShape;n=="pie"?this._checkOverlay(".rs-overlay",270):(n=="custom-half"||n=="custom-quarter")&&(this._checkOverlay(".rs-overlay1",180),n=="custom-quarter"&&this._checkOverlay(".rs-overlay2",this._end))},_checkOverlay:function(n,t){var i=this.container.children(n);i.length==0&&(i=createElement("div"+n+" rs-transition rs-bg-color"),this.container.append(i));i.rsRotate(this._start+t)},_checkDataType:function(){var i=this.options,r,n,t,u=this._props();for(r in u.numberType)n=u.numberType[r],t=i[n],i[n]=isNumber(t)?parseFloat(t):this.defaults[n];for(r in u.booleanType)n=u.booleanType[r],t=i[n],i[n]=t=="false"?!1:!!t;for(r in u.stringType)n=u.stringType[r],t=i[n],i[n]=(""+t).toLowerCase()},_validateSliderType:function(){var n=this.options.sliderType.toLowerCase();this._rangeSlider=this._showRange=!1;n=="range"?this._rangeSlider=this._showRange=!0:n.indexOf("min")!=-1?(this._showRange=!0,n="min-range"):n="default";this.options.sliderType=n},_updateStartEnd:function(){var n=this.options.circleShape;n!="full"&&(n.indexOf("quarter")!=-1?this.options.endAngle="+90":n.indexOf("half")!=-1?this.options.endAngle="+180":n=="pie"&&(this.options.endAngle="+270"),n=="quarter-top-left"||n=="half-top"?this.options.startAngle=0:n=="quarter-top-right"||n=="half-right"?this.options.startAngle=90:n=="quarter-bottom-right"||n=="half-bottom"?this.options.startAngle=180:(n=="quarter-bottom-left"||n=="half-left")&&(this.options.startAngle=270))},_validateStartEnd:function(){this._start=this._validateStartAngle();this._end=this._validateEndAngle();var n=this._start<this._end?0:360;this._end+=n-this._start},_analyzeModelValue:function(){var n=this.options.value,t=this.options.min,f=this.options.max,u,r,i=typeof n=="string"?n.split(","):[n];this._rangeSlider?r=typeof n=="string"?i.length>=2?(isNumber(i[0])?i[0]:t)+","+(isNumber(i[1])?i[1]:f):isNumber(i[0])?t+","+i[0]:t+","+t:isNumber(n)?t+","+n:t+","+t:typeof n=="string"?(u=i.pop(),r=isNumber(u)?parseFloat(u):t):r=isNumber(n)?parseFloat(n):t;this.options.value=r},_validateModelValue:function(){var r=this.options.value,i;if(this._rangeSlider){var u=r.split(","),n=parseFloat(u[0]),t=parseFloat(u[1]);n=this._limitValue(n);t=this._limitValue(t);n>t&&(t=n);this._handle1=this._processStepByValue(n);this._handle2=this._processStepByValue(t);this.options.value=this._handle1.value+","+this._handle2.value}else i=this._showRange?2:this._active||1,this["_handle"+i]=this._processStepByValue(this._limitValue(r)),this._showRange&&(this._handle1=this._handleDefaults()),this.options.value=this["_handle"+i].value},_isBrowserSupported:function(){for(var t=["borderRadius","WebkitBorderRadius","MozBorderRadius","OBorderRadius","msBorderRadius","KhtmlBorderRadius"],n=0;n<t.length;n++)if(document.body.style[t[n]]!==undefined)return!0},_throwError:function(){return"This browser doesn't support the border-radious property."},_checkIE:function(){var n=window.navigator.userAgent;(n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0)&&this.control.css({"-ms-touch-action":"none","touch-action":"none"})},_raise:function(n,t){var i=this.options[n],r=!0;return t=t||{},i&&(t.type=n,typeof i=="string"&&(i=window[i]),$.isFunction(i)&&(r=i.call(this,t),r=r===!1?!1:r)),this.control.trigger($.Event?$.Event(n,t):n),r},_bind:function(n,t,i){$(n).bind(t,$proxy(i,this))},_unbind:function(n,t,i){$.proxy?$(n).unbind(t,$.proxy(i,this)):$(n).unbind(t)},_getInstance:function(){return $data(this.control[0],pluginName)},_removeData:function(){var n=this.control[0];$.removeData&&$.removeData(n,pluginName);n.id&&delete window[n.id]},_destroyControl:function(){this.control.empty().removeClass("rs-control").height("").width("");this._removeAnimation();this._bindControlEvents("_unbind")},_updateWidth:function(){this.lastBlock.css("padding",this.options.width);this._refreshHandle()},_readOnly:function(n){this._isReadOnly=n;this.container.removeClass("rs-readonly");n&&this.container.addClass("rs-readonly")},_get:function(n){return this.options[n]},_set:function(n,t){var i=this._props();if($.inArray(n,i.numberType)!=-1){if(!isNumber(t))return;t=parseFloat(t)}else $.inArray(n,i.booleanType)!=-1?t=t=="false"?!1:!!t:$.inArray(n,i.stringType)!=-1&&(t=t.toLowerCase());if(this.options[n]!=t){this.options[n]=t;switch(n){case"startAngle":case"endAngle":this._validateStartEnd();this._updateSeperator();this._appendOverlay();case"min":case"max":case"step":case"value":this._analyzeModelValue();this._validateModelValue();this._setValue();this._updateHidden();this._updateTooltip();break;case"radius":this._setRadius();this._updateTooltipPos();break;case"width":this._removeAnimation();this._updateWidth();this._updateTooltipPos();this._addAnimation();this.container.children().find(".rs-seperator").css({width:this.options.width,"margin-left":this._border()/2});break;case"handleSize":this._refreshHandle();break;case"handleShape":this._setHandleShape();break;case"animation":this._setAnimation();break;case"showTooltip":this.options.showTooltip?this._appendTooltip():this._removeTooltip();break;case"editableTooltip":this._tooltipEditable();this._updateTooltipPos();break;case"disabled":this.options.disabled?this.disable():this.enable();break;case"readOnly":this.options.readOnly?this._readOnly(!0):!this.options.disabled&&this._readOnly(!1);break;case"mouseScrollAction":this._bindScrollEvents(this.options.mouseScrollAction?"_bind":"_unbind");break;case"circleShape":this._refreshCircleShape();this.options.circleShape=="full"&&(this.options.startAngle=0,this.options.endAngle="+360");case"sliderType":this._destroyControl();this._init()}return this}},option:function(n,t){if(this._getInstance()&&this._isBrowserSupport){if($isPlainObject(n)){(n.min!==undefined||n.max!==undefined)&&(n.min!==undefined&&(this.options.min=n.min,delete n.min),n.max!==undefined&&(this.options.max=n.max,delete n.max),n.value==undefined&&this._set("value",this.options.value));for(var i in n)this._set(i,n[i])}else if(n&&typeof n=="string"){if(t===undefined)return this._get(n);this._set(n,t)}return this}},getValue:function(n){if(this.options.sliderType=="range"&&n&&isNumber(n)){var t=parseFloat(n);if(t==1||t==2)return this["_handle"+t].value}return this._get("value")},setValue:function(n,t){if(n&&isNumber(n)){if(t&&isNumber(t))if(this.options.sliderType=="range"){var i=parseFloat(t),r=parseFloat(n);i==1?n=r+","+this._handle2.value:i==2&&(n=this._handle1.value+","+r)}else this.options.sliderType=="default"&&(this._active=t);this._set("value",n)}},disable:function(){this.options.disabled=!0;this.container.addClass("rs-disabled");this._readOnly(!0)},enable:function(){this.options.disabled=!1;this.container.removeClass("rs-disabled");this.options.readOnly||this._readOnly(!1)},destroy:function(){this._getInstance()&&(this._destroyControl(),this._removeData(),this._originalObj.insertAfter(this.control),this.control.remove())}};$.fn.rsRotate=function(n){return setTransform(this,n)};typeof $.fn.outerHeight=="undefined"&&($.fn.outerHeight=function(){return this[0].offsetHeight},$.fn.outerWidth=function(){return this[0].offsetWidth});typeof $.fn.hasClass=="undefined"&&($.fn.hasClass=function(n){return this[0].className.split(" ").indexOf(n)!==-1});typeof $.fn.offset=="undefined"&&($.fn.offset=function(){return{left:this[0].offsetLeft,top:this[0].offsetTop}});$.fn[pluginName].prototype=RoundSlider.prototype})(jQuery,window)




    function initAudioPlayer() {
        $(".DSAudioPlayer").append('<div class="blur"></div><div class="mainSection"> <div class="panel1"> <div class="top"> <div class="trackTitle">Track Title</div> <div class="trackSinger">Track Artist</div> </div> <div class="middle"> <div class="centered-vertically"></div> <div class="backward"></div> <div class="play"><div id="slider"></div><div class="playpausebtn"></div><div class="frontTiming">00:00 / 00:00</div></div> <div class="forward"></div> </div> </div> <div class="panel2" style="display:none"> <ul></ul> </div> <div class="panel3" style="display:none"> </div> </div> <div class="dashboard"> <div class="centered-vertically"></div> <div class="shuffle"></div> <div class="repeat"></div> <div class="grid-button"><span class="grid open"></span></div> <div class="sound shake"></div> <div class="share-button"> <div href="#" class="social-toggle"></div> <div class="social-networks"> <ul> <li class="social-twitter"> <a href="#"></a> </li> <li class="social-facebook"> <a href="#"></a> </li> <li class="social-gplus"> <a href="#"></a> </li> <li class="social-email"> <a href="#"></a> </li> </ul> </div> </div> </div>');

        var audio, tracksArray, currentTrack, currentIndex, currentRow, randomValue, repeating, shuffling;
        var playbtn, forwardbtn, backwardbtn;
        tracksArray = [];
        playbtn = $(".playpausebtn");
        forwardbtn = $(".forward");
        backwardbtn = $(".backward");
        repeating, shuffling = false;

        var hash = window.location.hash;
        var indexVal;


        audio = new Audio();
        audio.loop = false;

        var xmlPath= $(".DSAudioPlayer").attr("data-xmlPath");


        $.ajax({
            url: xmlPath,
            dataType: "xml",
            success: parse,
            error: function () {
                alert("Error: Something went wrong with loading the playlist!");
            }
        });
        function parse(document) {

            var artworkBlur = $(document).find("artworkBlur").text();
            var autoplay = $(document).find("autoplay").text();
            var shareButton = $(document).find("shareButton").text();
            var muteButton = $(document).find("muteButton").text();
            var repeatButton = $(document).find("repeatButton").text();
            var shuffleButton = $(document).find("shuffleButton").text();

            if(autoplay.length > 0 && autoplay == "true"){  audio.autoplay = true;  };
            if(shareButton.length > 0 && shareButton == "false"){   $("div.share-button").remove(); };
            if(muteButton.length > 0 && muteButton == "false"){ $("div.sound").remove();    };
            if(repeatButton.length > 0 && repeatButton == "false"){ $("div.repeat").remove();   };
            if(shuffleButton.length > 0 && shuffleButton == "false"){   $("div.shuffle").remove();  };
            if(artworkBlur.length > 0){
                $("div.DSAudioPlayer .blur").css({
                    "filter": 'blur(' + artworkBlur + ')',
                    "-webkit-filter": "blur(" + artworkBlur + ")",
                    "-ms-filter": "blur(" + artworkBlur + ")",
                    "-o-filter": "blur(" + artworkBlur + ")",
                    "-moz-filter": "blur(" + artworkBlur + ")"
                });
            }


            $(document).find("track").each(function () {
                tracksArray.push($(this).find('url').text());
                var img = $(this).find('artwork').text();
                var url = $(this).find('url').text();

                $(".panel2 ul").append(
                    "<li class='list' id='row" + tracksArray.length + "'>" +
                    "   <div class='leftBox'><div class='listNum'><span>" + numberingStyle(tracksArray.length) + "</span></div>" +
                    "<p class='title'>" + checkStrLendth( $(this).find('title').text(), 15 ) + "</p>" +
                    "<p class='singer'>" + checkStrLendth( $(this).find('artist').text(), 18 ) + "</p>" +
                    "</div>" +
                    "<div class='rightBox'>" +
                    "<div class='artwork' style='background: url(" + img + ") no-repeat'></div>" +
                    "<p class='duration'><span class='cur'>00:00</span><span class='slash'> / </span><span class='due'>00:00</span></p>" +
                    "<div class='resources'>" +
                    checkResource($(this).find('apple').text(), 'apple') +
                    checkResource($(this).find('amazon').text(), 'amazon') +
                    downloadable($(this).find('download').text(), $(this).find('url').text()) +
                    "</div>" +
                    "</div>" +
                    "</li>"
                );

                $("li#row"+tracksArray.length+" .leftBox .title").attr("data-title", $(this).find('title').text());
                $("li#row"+tracksArray.length+" .leftBox .singer").attr("data-artist", $(this).find('artist').text());
            });

            checkURL();
            getDurations();
        };




        playbtn.on("click tap", function () {
            closeShareButton();
            if (audio.paused) {
                audio.play();
                $(this).css("background-image", "url(img/pause.png)");

            } else {
                audio.pause();
                $(this).css("background-image", "url(img/play.png)");
            }
        });
        forwardbtn.on("click", function () {
            closeShareButton();
            removeCurSpan();
            $("#row" + currentRow + " .leftBox .title .eq").remove();
            playNextSong();


        });
        backwardbtn.on("click", function () {
            closeShareButton();
            removeCurSpan();
            $("#row" + currentRow + " .leftBox .title .eq").remove();
            if (currentIndex <= 0) {
                currentTrack = tracksArray[tracksArray.length - 1];
                currentIndex = tracksArray.indexOf(currentTrack);
                currentRow = currentIndex+1;
            } else {
                currentTrack = tracksArray[currentIndex - 1];
                currentIndex = tracksArray.indexOf(currentTrack);
                currentRow = currentIndex+1;
            }
            playThis(currentTrack);
            changeAppearance(currentIndex + 1);

        });
        $(".sound").on("click", function () {
            closeShareButton();
            if (audio.muted) {
                audio.muted = false;
                $(this).css("background-image", "url(img/volume-high.png)");

            } else {
                audio.muted = true;
                $(this).css("background-image", "url(img/volume-low.png)");
            }
        });
        $(".repeat").on("click", function () {
            closeShareButton();
            $(this).toggleClass("active");
            if ($(this).hasClass("active")) {
                audio.loop = true;
                $(this).css({
                    "background-color": "rgba(255,255,255,0.3)",
                    "-webkit-transform": "rotate(180deg)",
                    "-o-transform": "rotate(180deg)",
                    "-ms-transform": "rotate(180deg)",
                    "-moz-transform": "rotate(180deg)",
                    "transform": "rotate(180deg)"
                });
            } else {
                audio.loop = false;
                $(this).css({
                    "background-color": "transparent",
                    "-webkit-transform": "rotate(0)",
                    "-o-transform": "rotate(0)",
                    "-ms-transform": "rotate(0)",
                    "-moz-transform": "rotate(0)",
                    "transform": "rotate(0)"
                });
                $(this).css("-webkit-transform", "");
            }

        });
        $(".shuffle").on("click", function () {
            closeShareButton();
            $(this).toggleClass("active");
            if ($(this).hasClass("active")) {
                shuffling = true;
                $(this).css("background-color", "rgba(255,255,255,0.3)");
            } else {
                shuffling = false;
                $(this).css("background-color", "transparent");
            }
        });
        $('div.panel2').on("click", "ul li", function(event){
            closeShareButton();
            if(event.target.nodeName != "A"){
                removeCurSpan();
                $("#row" + currentRow + " .leftBox .title .eq").remove();
                var indexValue = parseInt( $(this).attr("id").substr(3), 10);
                currentIndex = indexValue - 1;
                currentTrack = tracksArray[currentIndex];
                currentRow = currentIndex+1;
                playThis(currentTrack);
                changeAppearance(currentIndex + 1);
            }

        });
        $('.share-button').on("click", function(){
            var trackURL = getTrackURL();
            setFBShareAttr(trackURL);
            setTWShareAttr(trackURL);
            setGPShareAttr(trackURL);
            setEmailAttr(trackURL);
        });
        $(".play").hover(function(){
            closeShareButton();
        });



        $(audio).on("ended", function () {
            $("#row" + currentRow + " .leftBox .title .eq").remove();
            if (this.loop) {
                this.play();
            }
            else if(shuffling) {
                removeCurSpan();
                var nextTrack = getRandomValue(tracksArray.length);
                currentIndex = nextTrack;
                currentTrack = tracksArray[nextTrack];
                currentRow = currentIndex+1;
                this.src = currentTrack;
                this.play();
                changeAppearance(currentIndex + 1);
            }
            else{
                playbtn.css("background-image", "url(img/play.png)");
                removeCurSpan()
                playNextSong();
            }
        });
        $(audio).on("timeupdate", function(){
            $(".middle .play .frontTiming").html(getReadableTime(this.currentTime) + " / " + getReadableTime(this.duration));
            $("#row"+currentRow+" .rightBox .duration .cur").html(getReadableTime(this.currentTime));
            $("#row"+currentRow+" .rightBox .duration .cur").css({display: "inline"});
            $("#row"+currentRow+" .rightBox .duration .slash").css({display: "inline"});
            seektimeupdate();
        });
        $(audio).on("playing", function(){
            $(playbtn).css("background-image", "url(img/pause.png)");
            var val = parseInt(currentIndex, 10) + 1;
            var EQLocation = $("#row" + val + " .leftBox .title");


            if(!EQLocation.find("div").hasClass("eq")){
                EQLocation.append("<div class='eq'><div class='bar1'></div><div class='bar2'></div><div class='bar3'></div></div>");
            };
        });
        $(audio).on("pause", function(){
            $("#row" + currentRow + " .leftBox .title .eq").remove();
        })


        function playThis(src) {
            audio.src = src
            audio.play();
            $(playbtn).css("background-image", "url(img/pause.png)");
        }

        function getRandomValue(maxValue) {
            x = Math.floor((Math.random() * maxValue) + 0);
            if (randomValue == x) {
                getRandomValue(maxValue);
            } else {
                randomValue = x;
            }
            return randomValue;
        }

        function getReadableTime(value) {
            var durmins = Math.floor(value / 60);
            var dursecs = Math.floor(value - durmins * 60);
            if (dursecs < 10) {
                dursecs = "0" + dursecs;
            }
            if (durmins < 10) {
                durmins = "0" + durmins;
            }
            return durmins + ":" + dursecs;
        }

        function numberingStyle(value) {
            if (value < 10) {
                value = "0" + value;
            }
            return value;
        }

        var i = 0;
        function getDurations() {
            audio.src = currentTrack;
            var arraySize = tracksArray.length;
            if (i < arraySize) {
                audio.src = tracksArray[i];
                $(audio).on('loadedmetadata', function() {
                    $("li#row" + (i+1) + " .rightBox .duration .due").html(getReadableTime(audio.duration));
                    i++;
                    $(this).off('loadedmetadata');
                    getDurations();
                });
            }
        }
        $(audio).off('loadedmetadata');

        function playNextSong(){
            if (tracksArray.length <= currentIndex + 1) {
                currentTrack = tracksArray[0];
                currentIndex = tracksArray.indexOf(currentTrack);
                currentRow = currentIndex+1;
            } else {
                currentTrack = tracksArray[currentIndex + 1];
                currentIndex = tracksArray.indexOf(currentTrack);
                currentRow = currentIndex+1;
            }
            playThis(currentTrack);
            changeAppearance(currentIndex + 1);
        }

        function removeCurSpan(){
            $("#row" + currentRow + " .rightBox .duration .cur").css({display: "none"});
            $("#row" + currentRow + " .rightBox .duration .slash").css({display: "none"});
        }

        function changeAppearance(idName) {
            idName = "row" + idName;
            var bg = $("#" + idName + " .rightBox .artwork").css("background-image");
            $(".blur").css("background-image", bg);

            var title = $("#" + idName + " .leftBox .title").attr("data-title");
            $(".trackTitle").html( checkStrLendth(title, 27) );

            var artist = $("#" + idName + " .leftBox .singer").attr("data-artist");
            $(".trackSinger").html( checkStrLendth(artist, 27) );
        }

        function checkResource(link, resourceName){
            var con = link.length > 0;
            if(con && resourceName == 'apple'){
                return "<a href='"+ link +"' class='apple' target='_blank' title='Listen it on Apple Music'></a>";
            }
            else if(con && resourceName == 'amazon'){
                return "<a href='" + link + "' class='amazon' target='_blank' title='Listen it on Amazon'></a>";
            }
            else{return " ";}
        }

        function downloadable(text,url){
            if(text === 'true'){
                return "<a href='" + url + "' class='download' target='_blank' title='Downlod it' download></a>";
            }
            else{ return " "; }
        }

        function checkURL(){
            var hash = window.location.hash;
            var indexVal;
            if(hash.length > 0){
                var indexVal = hash.substr(4);
            };
            if(indexVal >=0  && indexVal < tracksArray.length){
                indexVal = parseInt(indexVal);
                currentTrack = tracksArray[indexVal];
                currentIndex = tracksArray.indexOf(currentTrack);
                currentRow = currentIndex+1;
                audio.src = currentTrack;
                changeAppearance(currentIndex + 1);
                $(playbtn).css("background-image", "url(img/pause.png)");
                audio.autoplay = true
            }else{
                currentTrack = tracksArray[0];
                currentIndex = tracksArray.indexOf(currentTrack);
                currentRow = currentIndex+1;
                audio.src = currentTrack;
                changeAppearance(currentIndex + 1);
            }
        }

        function getTrackURL(){
            var url = window.location.toString();
            url = url.replace(/(#mp-[^#\s]+)/, "");
            url = url + "#mp-" + currentIndex;
            return url;
        }

        function setFBShareAttr(trackURL){
            var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(trackURL);
            $("li.social-facebook").find("a").attr("href", url);
        }

        function setTWShareAttr(trackURL){
            var url = "https://twitter.com/home?status=" + encodeURIComponent(trackURL);
            $("li.social-twitter").find("a").attr("href", url);
        }

        function setGPShareAttr(trackURL){
            var url = "https://plus.google.com/share?url=" + encodeURIComponent(trackURL);
            $("li.social-gplus").find("a").attr("href", url);
        }

        function setEmailAttr(trackURL){

            var trackArtist = $("li#row" + currentRow + " .leftBox .singer").attr("data-artist");
            var trackTitle = $("li#row" + currentRow + " .leftBox .title").attr("data-title");
            var subjectText = trackTitle + " by " + trackArtist;
            var bodyText = "Check out the track " + trackTitle + " by " + trackArtist + " on " + trackURL;

            var url = 'mailto:' + '' + '?subject=' + subjectText + '&body=' +   bodyText;
            $(".social-email > a").on("click", function(event){
                event.preventDefault();
                window.location = url;

            });
        }

        function closeShareButton(){
            if($(".social-networks").hasClass("open-menu")){
                $(".social-networks").removeClass("open-menu");
            }
        }

        function checkStrLendth(str, lendth){
            var val = str.length;
            if(val > lendth){
                return str.substring(0,lendth-1) + "...";
            }
            else{
                return str;
            }
        }

        $(window).keypress(function (e) {
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault();
                if (audio.paused) {
                    audio.play();
                    $(playbtn).css("background-image", "url(img/pause.png)");

                } else {
                    audio.pause();
                    $(playbtn).css("background-image", "url(img/play.png)");
                }
            }
        });



        $("#slider").roundSlider({
            width: 8,
            radius: "70",
            handleSize: "15,15",
            value: 0,
            max: "100",
            startAngle: 90,
            step: "0.005",
            showTooltip: false,
            editableTooltip: false,
            sliderType: "min-range",

            drag: function (args) {
                seek(args);
            },
            change: function (args) {
                seek(args);
            }
        });

        function seektimeupdate(){
            var nt = audio.currentTime * (100 / audio.duration);
            $("#slider").roundSlider("option", "value", nt);
        }
        function seek(event){
            var val = event.value;
            $("#slider").roundSlider("option", "value", val);
            seekto = audio.duration * (val / 100);
            audio.currentTime = seekto;
        }

        $('.social-toggle').on('click', function() {
            $(this).next().toggleClass('open-menu');
        });
        $("div.grid-button").on("click", function() {
            closeShareButton();
            $(".grid").toggleClass("open close");
            var visibleObj = $('.mainSection > div:visible');
            if ($("div.panel2").css("display") == "none") {
                var inVisibleObj = $("div.panel2")
            }
            else {
                var inVisibleObj = $("div.panel1")
            }
            visibleObj.fadeOut(500, function() {
                inVisibleObj.fadeIn(500);
            })
        });

    }

    $(document).ready(function(){
        initAudioPlayer();
    });

    $('.social-toggle').on('click', function() {
        $(this).next().toggleClass('open-menu');
    });

})(jQuery);
