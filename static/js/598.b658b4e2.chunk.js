"use strict";(self.webpackChunkreact_chess=self.webpackChunkreact_chess||[]).push([[598],{598:function(e,r,t){function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function o(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}t.r(r),t.d(r,{default:function(){return p}});var l=t(791);function a(e,r){if(null==e)return{};var t,n,c=function(e,r){if(null==e)return{};var t,n,c={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(c[t]=e[t]);return c}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(c[t]=e[t])}return c}var u=t(184),i=["playerColor","canSelect","onSelect"],s=l.lazy((function(){return t.e(28).then(t.bind(t,28))})),f=function(e){e.playerColor;var r=e.canSelect,t=e.onSelect,n=a(e,i),c=n.x,o=n.y,l=n.figure,f=n.color,b=n.isSelected,p=n.canMove,y=n.isUnderAtack;return(0,u.jsx)("div",{onClick:function(){r(n)&&t(n)},style:{top:"".concat(2.5*o,"rem"),left:"".concat(2.5*c,"rem")},className:["absolute w-10 h-10 flex items-center justify-center",r(n)?"cursor-pointer":"cursor-default",r(n)?"hover:bg-accent":"",p?"hover:bg-green-500":"",b?"bg-accent":"",y?"bg-red-500":""].join(" "),children:l&&f?(0,u.jsx)(s,{name:l,color:f}):p&&(0,u.jsx)("div",{className:"w-3 h-3 rounded-[50%] bg-green-500"})})},b=l.memo(f),p=function(e){var r=e.playerColor,t=e.board,n=e.onTurn,c=(0,l.useCallback)((function(e){var t=r===e.color;return e.canMove||e.isUnderAtack||t}),[r]);return(0,u.jsx)("div",{className:"absolute w-full h-full",children:t.map((function(e){return(0,u.jsx)(b,o(o({},e),{},{canSelect:c,playerColor:r,onSelect:n}),e.id)}))})}}}]);
//# sourceMappingURL=598.b658b4e2.chunk.js.map