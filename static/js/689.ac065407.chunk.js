"use strict";(self.webpackChunkreact_chess=self.webpackChunkreact_chess||[]).push([[689],{671:function(e,t,c){c(791);t.Z=c.p+"static/media/bishop.cf781aa194cfdc1a617acf2b1a262bb7.svg"},611:function(e,t,c){c(791);t.Z=c.p+"static/media/bishop_black.c9e8285789f5c2a3f5a55a2be5db5286.svg"},690:function(e,t,c){c(791);t.Z=c.p+"static/media/king.3f959aab36df6290a8e0f17c7d242c19.svg"},646:function(e,t,c){c(791);t.Z=c.p+"static/media/king_black.7c3272c2b0d61b83b8fd05b98525a817.svg"},812:function(e,t,c){c(791);t.Z=c.p+"static/media/knight.d47944d2cee4f8c707d1907706c142fa.svg"},990:function(e,t,c){c(791);t.Z=c.p+"static/media/knight_black.7930be9e07b51bc0e069b1d77e31261a.svg"},90:function(e,t,c){c(791);t.Z=c.p+"static/media/pawn.50273cc6d86861932d0a01c38274009a.svg"},672:function(e,t,c){c(791);t.Z=c.p+"static/media/pawn_black.be5d44ca5ee868885d216188996e3a00.svg"},425:function(e,t,c){c(791);t.Z=c.p+"static/media/queen.7a1aecff0f22ff68c43f9b7f8a81d0b4.svg"},948:function(e,t,c){c(791);t.Z=c.p+"static/media/queen_black.cf388bf415c0d33ec16f23593b8d0d91.svg"},918:function(e,t,c){c(791);t.Z=c.p+"static/media/rook.9e48b84f189eea24339f8a679e7a664f.svg"},827:function(e,t,c){c(791);t.Z=c.p+"static/media/rook_black.fdc575582c2cbe2ec82093702945226f.svg"},689:function(e,t,c){function n(e,t,c){return t in e?Object.defineProperty(e,t,{value:c,enumerable:!0,configurable:!0,writable:!0}):e[t]=c,e}function r(e,t){var c=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),c.push.apply(c,n)}return c}function a(e){for(var t=1;t<arguments.length;t++){var c=null!=arguments[t]?arguments[t]:{};t%2?r(Object(c),!0).forEach((function(t){n(e,t,c[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(c)):r(Object(c)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(c,t))}))}return e}function o(e,t){if(null==e)return{};var c,n,r=function(e,t){if(null==e)return{};var c,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)c=a[n],t.indexOf(c)>=0||(r[c]=e[c]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)c=a[n],t.indexOf(c)>=0||Object.prototype.propertyIsEnumerable.call(e,c)&&(r[c]=e[c])}return r}c.r(t),c.d(t,{default:function(){return g}});var i=c(791),f=c(184),s={rook:c(918).Z,knight:c(812).Z,bishop:c(671).Z,queen:c(425).Z,king:c(690).Z,pawn:c(90).Z,rook_black:c(827).Z,knight_black:c(990).Z,bishop_black:c(611).Z,queen_black:c(948).Z,king_black:c(646).Z,pawn_black:c(672).Z},b=function(e){var t=e.name,c=e.color;return(0,f.jsx)("img",{width:30,height:30,className:"select-none",src:s["black"===c?t+"_black":t],alt:""})},l=i.memo(b),u=["playerColor","onSelect"],d=function(e){var t=e.playerColor,c=e.onSelect,n=o(e,u),r=n.x,a=n.y,s=n.figure,b=n.color,d=n.isSelected,p=n.canMove,g=n.isUnderAtack,m=(0,i.useMemo)((function(){return p||g||t===b}),[t,g,p,b]);return(0,f.jsx)("div",{onClick:function(){m&&c(n)},style:{top:"".concat(2.5*a,"rem"),left:"".concat(2.5*r,"rem")},className:["absolute w-10 h-10 flex items-center justify-center",m?"cursor-pointer":"cursor-default",m?"hover:bg-accent":"",p?"hover:bg-green-500":"",d?"bg-accent":"",g?"bg-red-500":""].join(" "),children:s&&b?(0,f.jsx)(l,{name:s,color:b}):p&&(0,f.jsx)("div",{className:"w-3 h-3 rounded-[50%] bg-green-500"})})},p=i.memo(d),g=function(e){var t=e.playerColor,c=e.board,n=e.onTurn;return(0,f.jsx)("div",{className:"absolute w-full h-full",children:c.map((function(e){return(0,f.jsx)(p,a(a({},e),{},{playerColor:t,onSelect:n}),e.id)}))})}}}]);
//# sourceMappingURL=689.ac065407.chunk.js.map