(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var n=e.g.document;if(!t&&n&&(n.currentScript&&(t=n.currentScript.src),!t)){var r=n.getElementsByTagName("script");r.length&&(t=r[r.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=()=>{const e=new Map,t=(e,t,n)=>{const r=[];r.push([parseInt(e[0]).toString(),parseInt(e[1]).toString()]);let a=1;for(;a<n;)t?r.push([(parseInt(e[0])+parseInt(a)).toString(),parseInt(e[1]).toString()]):r.push([parseInt(e[0]).toString(),(parseInt(e[1])+parseInt(a)).toString()]),++a;return r},n=(e,t=r())=>{let n=!0;e.forEach((e=>{(e[0]>10||e[1]>10)&&(n=!1)}));for(const r of e)for(const e of t.keys())if(e)for(const a of t.get(e))if(a.every(((e,t)=>e===r[t]))){n=!1;break}return n},r=()=>(e.get(null)||e.set(null,[]),e);return{receiveAttack:(e,t=r())=>{let n,a="missed!",o=!1;e:for(const r of t.keys())if(null!==r)for(const i of t.get(r))if(i.every(((t,n)=>t==e[n]))){n=r,o=!0,a="that's a hit!",n.hit();break e}return t.get(null).push(e),{status:o,message:a,ship:n}},placeShip:(e,a,o,i=r())=>{const s=t(e,a,o);if(!n(s))return{status:!1,ship:null,message:"Collision"};const c=(e=>{let t=0;const n=()=>e,r=()=>t;return{hit:()=>++t,isSunk:(e=n(),t=r())=>e<=t,getHits:r,getLength:n}})(o);return i.set(c,s),{status:!0,ship:c,message:"Ship places"}},checkShipForCollisions:n,iterateThroughCoordinates:t,getBoard:r,getShipsLeft:(e=r())=>{const t=new Map;let n=!1,a="There are no ships left";for(const r of e.keys())r&&(r.isSunk()||(t.set(r,e.get(r)),a="Some ships are still there",n=!0));return{status:n,message:a,shipsLeft:t}},checkIfAlreadyHit:(e,t=r())=>{if(null!=t.get(null))return!1;for(const n of t.get(null))if(n.every(((t,n)=>t==e[n])))return!0}}},n=(e,t=!1)=>{let n=!0;const r=()=>n,a=(e,t=!1,n=null)=>{const r=[[-1,0],[0,-1],[0,1],[1,0]];let o,i;if(t){let t=0,s=!0;e:for(;t<r.length-1;){o=n[0]+r[t][0],i=n[1]+r[t][1];for(const n of e){if([o,i].every(((e,t)=>e===n[t]))){s=!1,++t;continue e}s=!0}if(s)return[o,i]}return a(e,!1,null)}o=Math.floor(10*Math.random()+1),i=Math.floor(10*Math.random()+1);for(const t of e)if([o,i].every(((e,n)=>e==t[n])))return a(e);return[o,i]};return{name:e,ai:t,getTurn:r,switchTurn:()=>n=!r(),makeRandomMove:a}},r=e.p+"949a894f942277ea41fc.svg",a=e.p+"3a8867c3226546d69514.svg";var o=function(){function e(e){var t=this;this._insertTag=function(e){var n;n=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,n),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var n=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{n.insertRule(e,n.cssRules.length)}catch(e){}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),i=Math.abs,s=String.fromCharCode,c=Object.assign;function l(e){return e.trim()}function u(e,t,n){return e.replace(t,n)}function d(e,t){return e.indexOf(t)}function f(e,t){return 0|e.charCodeAt(t)}function h(e,t,n){return e.slice(t,n)}function p(e){return e.length}function m(e){return e.length}function g(e,t){return t.push(e),e}var y=1,v=1,b=0,x=0,w=0,k="";function E(e,t,n,r,a,o,i){return{value:e,root:t,parent:n,type:r,props:a,children:o,line:y,column:v,length:i,return:""}}function S(e,t){return c(E("",null,null,"",null,null,0),e,{length:-e.length},t)}function C(){return w=x>0?f(k,--x):0,v--,10===w&&(v=1,y--),w}function A(){return w=x<b?f(k,x++):0,v++,10===w&&(v=1,y++),w}function $(){return f(k,x)}function I(){return x}function N(e,t){return h(k,e,t)}function M(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function T(e){return y=v=1,b=p(k=e),x=0,[]}function z(e){return k="",e}function j(e){return l(N(x-1,O(91===e?e+2:40===e?e+1:e)))}function L(e){for(;(w=$())&&w<33;)A();return M(e)>2||M(w)>3?"":" "}function B(e,t){for(;--t&&A()&&!(w<48||w>102||w>57&&w<65||w>70&&w<97););return N(e,I()+(t<6&&32==$()&&32==A()))}function O(e){for(;A();)switch(w){case e:return x;case 34:case 39:34!==e&&39!==e&&O(w);break;case 40:41===e&&O(e);break;case 92:A()}return x}function H(e,t){for(;A()&&e+w!==57&&(e+w!==84||47!==$()););return"/*"+N(t,x-1)+"*"+s(47===e?e:A())}function R(e){for(;!M($());)A();return N(e,x)}var G="-ms-",P="-moz-",_="-webkit-",q="comm",F="rule",W="decl",D="@keyframes";function J(e,t){for(var n="",r=m(e),a=0;a<r;a++)n+=t(e[a],a,e,t)||"";return n}function Y(e,t,n,r){switch(e.type){case"@import":case W:return e.return=e.return||e.value;case q:return"";case D:return e.return=e.value+"{"+J(e.children,r)+"}";case F:e.value=e.props.join(",")}return p(n=J(e.children,r))?e.return=e.value+"{"+n+"}":""}function V(e,t){switch(function(e,t){return(((t<<2^f(e,0))<<2^f(e,1))<<2^f(e,2))<<2^f(e,3)}(e,t)){case 5103:return _+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return _+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return _+e+P+e+G+e+e;case 6828:case 4268:return _+e+G+e+e;case 6165:return _+e+G+"flex-"+e+e;case 5187:return _+e+u(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return _+e+G+"flex-item-"+u(e,/flex-|-self/,"")+e;case 4675:return _+e+G+"flex-line-pack"+u(e,/align-content|flex-|-self/,"")+e;case 5548:return _+e+G+u(e,"shrink","negative")+e;case 5292:return _+e+G+u(e,"basis","preferred-size")+e;case 6060:return _+"box-"+u(e,"-grow","")+_+e+G+u(e,"grow","positive")+e;case 4554:return _+u(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return u(u(u(e,/(zoom-|grab)/,_+"$1"),/(image-set)/,_+"$1"),e,"")+e;case 5495:case 3959:return u(e,/(image-set\([^]*)/,_+"$1$`$1");case 4968:return u(u(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+_+e+e;case 4095:case 3583:case 4068:case 2532:return u(e,/(.+)-inline(.+)/,_+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(p(e)-1-t>6)switch(f(e,t+1)){case 109:if(45!==f(e,t+4))break;case 102:return u(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1"+P+(108==f(e,t+3)?"$3":"$2-$3"))+e;case 115:return~d(e,"stretch")?V(u(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==f(e,t+1))break;case 6444:switch(f(e,p(e)-3-(~d(e,"!important")&&10))){case 107:return u(e,":",":"+_)+e;case 101:return u(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+_+(45===f(e,14)?"inline-":"")+"box$3$1"+_+"$2$3$1"+G+"$2box$3")+e}break;case 5936:switch(f(e,t+11)){case 114:return _+e+G+u(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return _+e+G+u(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return _+e+G+u(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return _+e+G+e+e}return e}function Z(e){return z(K("",null,null,null,[""],e=T(e),0,[0],e))}function K(e,t,n,r,a,o,i,c,l){for(var f=0,h=0,m=i,y=0,v=0,b=0,x=1,w=1,k=1,E=0,S="",N=a,M=o,T=r,z=S;w;)switch(b=E,E=A()){case 40:if(108!=b&&58==z.charCodeAt(m-1)){-1!=d(z+=u(j(E),"&","&\f"),"&\f")&&(k=-1);break}case 34:case 39:case 91:z+=j(E);break;case 9:case 10:case 13:case 32:z+=L(b);break;case 92:z+=B(I()-1,7);continue;case 47:switch($()){case 42:case 47:g(U(H(A(),I()),t,n),l);break;default:z+="/"}break;case 123*x:c[f++]=p(z)*k;case 125*x:case 59:case 0:switch(E){case 0:case 125:w=0;case 59+h:v>0&&p(z)-m&&g(v>32?X(z+";",r,n,m-1):X(u(z," ","")+";",r,n,m-2),l);break;case 59:z+=";";default:if(g(T=Q(z,t,n,f,h,a,c,S,N=[],M=[],m),o),123===E)if(0===h)K(z,t,T,T,N,o,m,c,M);else switch(y){case 100:case 109:case 115:K(e,T,T,r&&g(Q(e,T,T,0,0,a,c,S,a,N=[],m),M),a,M,m,c,r?N:M);break;default:K(z,T,T,T,[""],M,0,c,M)}}f=h=v=0,x=k=1,S=z="",m=i;break;case 58:m=1+p(z),v=b;default:if(x<1)if(123==E)--x;else if(125==E&&0==x++&&125==C())continue;switch(z+=s(E),E*x){case 38:k=h>0?1:(z+="\f",-1);break;case 44:c[f++]=(p(z)-1)*k,k=1;break;case 64:45===$()&&(z+=j(A())),y=$(),h=m=p(S=z+=R(I())),E++;break;case 45:45===b&&2==p(z)&&(x=0)}}return o}function Q(e,t,n,r,a,o,s,c,d,f,p){for(var g=a-1,y=0===a?o:[""],v=m(y),b=0,x=0,w=0;b<r;++b)for(var k=0,S=h(e,g+1,g=i(x=s[b])),C=e;k<v;++k)(C=l(x>0?y[k]+" "+S:u(S,/&\f/g,y[k])))&&(d[w++]=C);return E(e,t,n,0===a?F:c,d,f,p)}function U(e,t,n){return E(e,t,n,q,s(w),h(e,2,-2),0)}function X(e,t,n,r){return E(e,t,n,W,h(e,0,r),h(e,r+1,-1),r)}var ee=function(e,t,n){for(var r=0,a=0;r=a,a=$(),38===r&&12===a&&(t[n]=1),!M(a);)A();return N(e,x)},te=new WeakMap,ne=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,n=e.parent,r=e.column===n.column&&e.line===n.line;"rule"!==n.type;)if(!(n=n.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||te.get(n))&&!r){te.set(e,!0);for(var a=[],o=function(e,t){return z(function(e,t){var n=-1,r=44;do{switch(M(r)){case 0:38===r&&12===$()&&(t[n]=1),e[n]+=ee(x-1,t,n);break;case 2:e[n]+=j(r);break;case 4:if(44===r){e[++n]=58===$()?"&\f":"",t[n]=e[n].length;break}default:e[n]+=s(r)}}while(r=A());return e}(T(e),t))}(t,a),i=n.props,c=0,l=0;c<o.length;c++)for(var u=0;u<i.length;u++,l++)e.props[l]=a[c]?o[c].replace(/&\f/g,i[u]):i[u]+" "+o[c]}}},re=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},ae=[function(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case W:e.return=V(e.value,e.length);break;case D:return J([S(e,{value:u(e.value,"@","@"+_)})],r);case F:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=/(::plac\w+|:read-\w+)/.exec(e))?e[0]:e}(t)){case":read-only":case":read-write":return J([S(e,{props:[u(t,/:(read-\w+)/,":-moz-$1")]})],r);case"::placeholder":return J([S(e,{props:[u(t,/:(plac\w+)/,":-webkit-input-$1")]}),S(e,{props:[u(t,/:(plac\w+)/,":-moz-$1")]}),S(e,{props:[u(t,/:(plac\w+)/,G+"input-$1")]})],r)}return""}))}}];const oe=function(e){for(var t,n=0,r=0,a=e.length;a>=4;++r,a-=4)t=1540483477*(65535&(t=255&e.charCodeAt(r)|(255&e.charCodeAt(++r))<<8|(255&e.charCodeAt(++r))<<16|(255&e.charCodeAt(++r))<<24))+(59797*(t>>>16)<<16),n=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&n)+(59797*(n>>>16)<<16);switch(a){case 3:n^=(255&e.charCodeAt(r+2))<<16;case 2:n^=(255&e.charCodeAt(r+1))<<8;case 1:n=1540483477*(65535&(n^=255&e.charCodeAt(r)))+(59797*(n>>>16)<<16)}return(((n=1540483477*(65535&(n^=n>>>13))+(59797*(n>>>16)<<16))^n>>>15)>>>0).toString(36)},ie={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var se=/[A-Z]|^ms/g,ce=/_EMO_([^_]+?)_([^]*?)_EMO_/g,le=function(e){return 45===e.charCodeAt(1)},ue=function(e){return null!=e&&"boolean"!=typeof e},de=function(e){var t=Object.create(null);return function(n){return void 0===t[n]&&(t[n]=e(n)),t[n]}}((function(e){return le(e)?e:e.replace(se,"-$&").toLowerCase()})),fe=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(ce,(function(e,t,n){return pe={name:t,styles:n,next:pe},t}))}return 1===ie[e]||le(e)||"number"!=typeof t||0===t?t:t+"px"};function he(e,t,n){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return pe={name:n.name,styles:n.styles,next:pe},n.name;if(void 0!==n.styles){var r=n.next;if(void 0!==r)for(;void 0!==r;)pe={name:r.name,styles:r.styles,next:pe},r=r.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var a=0;a<n.length;a++)r+=he(e,t,n[a])+";";else for(var o in n){var i=n[o];if("object"!=typeof i)null!=t&&void 0!==t[i]?r+=o+"{"+t[i]+"}":ue(i)&&(r+=de(o)+":"+fe(o,i)+";");else if(!Array.isArray(i)||"string"!=typeof i[0]||null!=t&&void 0!==t[i[0]]){var s=he(e,t,i);switch(o){case"animation":case"animationName":r+=de(o)+":"+s+";";break;default:r+=o+"{"+s+"}"}}else for(var c=0;c<i.length;c++)ue(i[c])&&(r+=de(o)+":"+fe(o,i[c])+";")}return r}(e,t,n);case"function":if(void 0!==e){var a=pe,o=n(e);return pe=a,he(e,t,o)}}if(null==t)return n;var i=t[n];return void 0!==i?i:n}var pe,me=/label:\s*([^\s;\n{]+)\s*(;|$)/g,ge=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,a="";pe=void 0;var o=e[0];null==o||void 0===o.raw?(r=!1,a+=he(n,t,o)):a+=o[0];for(var i=1;i<e.length;i++)a+=he(n,t,e[i]),r&&(a+=o[i]);me.lastIndex=0;for(var s,c="";null!==(s=me.exec(a));)c+="-"+s[1];return{name:oe(a)+c,styles:a,next:pe}};function ye(e,t,n){var r="";return n.split(" ").forEach((function(n){void 0!==e[n]?t.push(e[n]+";"):r+=n+" "})),r}var ve=function(e,t,n){!function(e,t,n){var r=e.key+"-"+t.name;!1===n&&void 0===e.registered[r]&&(e.registered[r]=t.styles)}(e,t,n);var r=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var a=t;do{e.insert(t===a?"."+r:"",a,e.sheet,!0),a=a.next}while(void 0!==a)}};function be(e,t){if(void 0===e.inserted[t.name])return e.insert("",t,e.sheet,!0)}function xe(e,t,n){var r=[],a=ye(e,r,n);return r.length<2?n:a+t(r)}var we=function e(t){for(var n="",r=0;r<t.length;r++){var a=t[r];if(null!=a){var o=void 0;switch(typeof a){case"boolean":break;case"object":if(Array.isArray(a))o=e(a);else for(var i in o="",a)a[i]&&i&&(o&&(o+=" "),o+=i);break;default:o=a}o&&(n&&(n+=" "),n+=o)}}return n};var ke=function(e){var t=function(e){var t=e.key;if("css"===t){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var r,a,i=e.stylisPlugins||ae,s={},c=[];r=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),n=1;n<t.length;n++)s[t[n]]=!0;c.push(e)}));var l,u,d,f,h=[Y,(f=function(e){l.insert(e)},function(e){e.root||(e=e.return)&&f(e)})],p=(u=[ne,re].concat(i,h),d=m(u),function(e,t,n,r){for(var a="",o=0;o<d;o++)a+=u[o](e,t,n,r)||"";return a});a=function(e,t,n,r){l=n,J(Z(e?e+"{"+t.styles+"}":t.styles),p),r&&(g.inserted[t.name]=!0)};var g={key:t,sheet:new o({key:t,container:r,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:s,registered:{},insert:a};return g.sheet.hydrate(c),g}(e);t.sheet.speedy=function(e){this.isSpeedy=e},t.compat=!0;var n=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=ge(n,t.registered,void 0);return ve(t,a,!1),t.key+"-"+a.name};return{css:n,cx:function(){for(var e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];return xe(t.registered,n,we(r))},injectGlobal:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=ge(n,t.registered);be(t,a)},keyframes:function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];var a=ge(n,t.registered),o="animation-"+a.name;return be(t,{name:a.name,styles:"@keyframes "+o+"{"+a.styles+"}"}),o},hydrate:function(e){e.forEach((function(e){t.inserted[e]=!0}))},flush:function(){t.registered={},t.inserted={},t.sheet.flush()},sheet:t.sheet,cache:t,getRegisteredStyles:ye.bind(null,t.registered),merge:xe.bind(null,t.registered,n)}}({key:"css"}),Ee=(ke.flush,ke.hydrate,ke.cx,ke.merge,ke.getRegisteredStyles,ke.injectGlobal),Se=(ke.keyframes,ke.css);ke.sheet,ke.cache;const Ce=e.p+"fc2b5060f7accec5cf74.ttf",Ae=(()=>{const e=document.body,t=Se`
    background-color: white;
    box-sizing: border-box;
    border: 0.1px dotted grey;
    height: 10%;
    width: 10%;
    &:hover {
      border: 1px solid grey;
      background-color: #e6e4df;
    }
  `,n=Se`
    background-color: black;
    box-sizing: border-box;
    border: 0.1px dotted grey;
    height: 10%;
    width: 10%;
  `,o=Se`
    width: 100px;
    text-align: center;
    height: 40px;
    display: flex;
    align-self: center;
    justify-self: center;
    justify-content: center;
    align-items: center;
    border-color: transparent;
    background-color: hsl(220, 90%, 56%);
    color: white;
    border-radius: 0.25em;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    transition: 0.3s;
    &:active {
      transform: translateY(3px);
    }
  `,i=Se`
    width: 100px;
    text-align: center;
    height: 40px;
    display: flex;
    align-self: center;
    justify-self: center;
    justify-content: center;
    align-items: center;
    border-color: transparent;
    background-color: red;
    color: white;
    border-radius: 0.25em;
    margin-bottom: 20px;
    box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    transition: 0.3s;
    &:active {
      transform: translateY(3px);
    }
  `,s=Se`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    transition: width 0.3s;
  `,c=Se`
    display: block;
    filter: invert();
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  `,l=()=>{const e=document.createElement("span"),t=Se`
      font-size: 4rem;
      font-weight: bold;
      align-self: center;
    `;return e.textContent="BATTLESHIP GAME",e.className=t,e},u=()=>{const e=document.createElement("h1");e.setAttribute("style","grid-column: 1 / 3; display: flex; justify-content: center;"),e.id="main-h",e.textContent="Game started. Place your ships!";const t=document.createElement("h2");t.setAttribute("style","display: flex; justify-content: center;"),t.id="subheadline-1",t.textContent="";const n=document.createElement("h2");return n.setAttribute("style","display: flex; justify-content: center;"),n.id="subheadline-1",n.textContent="AI",[e,t,n]},d=e=>{document.getElementById("main-h").textContent="";let t=0;!function n(){t<e.length&&(document.getElementById("main-h").textContent+=e.charAt(t),++t,setTimeout(n,20))}()},f=e=>{const t=document.createElement("div"),n=Se`
      border: 1px solid black;
      position: relative;
      background-color: white;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex: 1 1 100%;
      flex-wrap: wrap;
      width: 25vw;
      height: 25vw;
      justify-self: center;
    `;t.className=n,t.setAttribute("player-data",e);let r=1,a=1;for(;r<11;){for(a=1;a<11;)t.appendChild(h(a,r,e)),++a;++r}return t},h=(e,n,r)=>{const a=document.createElement("div");return a.id=`${r}-${e}-${n}`,a.className=t,a},p=()=>{const e=document.createElement("button");e.textContent="Reset",e.type="button",e.id="reset";const t=o;return e.className=t,e},m=()=>{const e=document.createElement("button");e.textContent="Horizontal",e.setAttribute("flip-data","horizontal"),e.type="button",e.id="flip";const t=o;return e.className=t,e.addEventListener("click",(function(){"Horizontal"===this.textContent?(this.textContent="Vertical",this.className=i,this.setAttribute("flip-data","vertical")):(this.textContent="Horizontal",this.className=o,this.setAttribute("flip-data","horizontal"))})),e};return{init:()=>{Ee`
      @font-face {
        font-family: 'Roboto';
        src: ${Ce};
      }

      @keyframes animatehide {
        from {opacity: 1}
        to {opacity: 0}
      }

      body {
        margin: 0;
        min-height: 100vh;
        min-width: 100vw;
        font-family: 'Roboto', sans-serif;
        display: grid;
        grid-template-rows: 100px 1fr;
        grid-template-columns: 1fr;
      }
    `,(()=>{const t=document.createElement("div"),n=Se`
      background-color: grey;
      display: flex;
      justify-content: center;
    `;t.className=n,t.appendChild(l()),e.appendChild(t)})(),(t=>{const n=document.createElement("div"),r=Se`
      display: grid;
      grid-template-rows: repeat(5, min-content);
      grid-template-columns: repeat(2, 1fr);
      align-items: top;
    `;n.className=r,n.id="content",n.append(...u(t)),n.append(m()),n.append(p()),n.append(f("player")),n.append(f("opponent")),e.appendChild(n)})()},changeContentHeadline:d,placeShips:e=>{if(!(e.getBoard().size<1))for(const t of e.getBoard().keys())if(t)for(const r of e.getBoard().get(t)){const e=document.getElementById(`player-${r[0]}-${r[1]}`);e.setAttribute("ship-hits-data",t.getHits()),e.className=n}},createModal:()=>{const t=document.createElement("div"),n="300px",r="30px",a=Se`
      height: 100vh;
      width: 100vw;
      background-color: white;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      display: flex;
      flex-flow: column wrap;
      overflow: auto;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: ${500}ms;
    `;t.id="modal",t.className=a;const o=document.createElement("h1");o.textContent="Welcome to battleship game!";const i=document.createElement("input"),s=Se`
      // flex: 1 1 100%;
      box-sizing: border-box;
      height: ${r};
      width: ${n};
      margin-bottom: 20px;
      border: 0.1px solid grey;
      border-radius: 0.25em;
      padding: 5px;
      &:focus {
        border: 2px solid hsl(220, 90%, 56%);
        outline: none;
      }
    `;i.id="input-name",i.type="text",i.placeholder="Enter your name",i.className=s,i.addEventListener("keypress",(e=>{"Enter"===e.key&&(t.style.opacity="0",setTimeout((()=>t.style.display="none"),500))}));const c=document.createElement("button"),l=Se`
      box-sizing: content-box;
      height: ${r};
      width: ${n};
      padding: 0;
      color: white;
      border-color: transparent;
      background-color: hsl(220, 90%, 56%);
      color: white;
      border-radius: 0.25em;
      box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    `;c.id="create-name",c.type="button",c.textContent="Submit",c.className=l,c.addEventListener("click",(()=>{t.style.opacity="0",setTimeout((()=>t.style.display="none"),500)})),t.append(o,i,c),e.append(t);let u="";return c.addEventListener("click",(()=>{const e=document.getElementById("input-name").value;return localStorage.setItem("player-name",JSON.stringify(e)),document.getElementById("subheadline-1").textContent=e,u=e})),i.addEventListener("keyup",(e=>{if("Enter"===e.key){const e=document.getElementById("input-name").value;return localStorage.setItem("player-name",JSON.stringify(e)),document.getElementById("subheadline-1").textContent=e,u=e}})),u},highlightShipPlacement:(e,t)=>{const n=Se`
      background-color: blue;
      box-sizing: border-box;
      border: 0.1px dotted grey;
      height: 10%;
      width: 10%;
    `,r=Se`
      background-color: red;
      box-sizing: border-box;
      border: 0.1px dotted grey;
      height: 10%;
      width: 10%;
    `;return e.forEach((e=>{const a=document.getElementById(`player-${e[0]}-${e[1]}`);a&&(a.className=t?n:r)})),e},attackDOMManipulation:(e,t,n)=>{const o=new Image;o.src=a,e.status?o.src=r:o.src=a,"opponent"===t.id.split("-")[0]?o.className=s:e.status?o.className=c:o.className=s,t.append(o),d(`${n}: ${e.message}`)}}})(),$e=Ae;window.onload=()=>{(()=>{let e,r=t(),a=t();const o=n("AI",!1);o.switchTurn();const i=()=>{document.body.innerHTML="",r=t(),a=t(),$e.init(),(()=>{if(e=JSON.parse(localStorage.getItem("player-name")),e)return e=n(e),void(document.getElementById("subheadline-1").textContent=e.name);e=n($e.createModal())})(),s(),document.getElementById("reset").addEventListener("click",(()=>i()))},s=()=>(l(5),c(),$e.placeShips(r)),c=()=>{for(let e=2;e<6;++e){let t,n;n=Math.random()<.5;e:for(;;){t=[Math.floor(10*Math.random()+1),Math.floor(10*Math.random()+1)];const r=a.iterateThroughCoordinates(t,n,e);if(a.checkShipForCollisions(r))break e}a.placeShip(t,n,e)}},l=e=>{let t,n,a,o=document.querySelectorAll('div[player-data="player"]>div');const i=o=>{const[,i,s]=[...o.target.id.split("-")];n=[i,s],a=document.getElementById("flip").getAttribute("flip-data"),a="horizontal"===a;const c=r.iterateThroughCoordinates([i,s],a,e),l=r.checkShipForCollisions(c);t=$e.highlightShipPlacement(c,l)},s=()=>{if(!t)return;const e=Se`
        background-color: white;
        box-sizing: border-box;
        border: 0.1px dotted grey;
        height: 10%;
        width: 10%;
        &:hover {
          border: 1px solid grey;
          background-color: #e6e4df;
        }
      `;t.forEach((t=>{const n=document.getElementById(`player-${t[0]}-${t[1]}`);n&&(n.className=e)})),$e.placeShips(r)},c=()=>{if(r.placeShip(n,a,e).status)return $e.placeShips(r),e>2?$e.changeContentHeadline("Ship placed. Place another"):$e.changeContentHeadline("All ships placed. FIGHT!"),o=document.querySelectorAll('div[player-data="player"]>div'),o.forEach((e=>{e.removeEventListener("mouseover",i),e.removeEventListener("mouseout",s),e.removeEventListener("click",c)})),e>2?l(e-1):f();$e.changeContentHeadline("Cannot place ship here")};o.forEach((e=>{e.addEventListener("mouseover",i),e.addEventListener("mouseout",s),e.addEventListener("click",c)}))};let u;const d=()=>{if(e.switchTurn(),o.switchTurn(),!o.getTurn())return;let t;t=void 0===u?o.makeRandomMove(r.getBoard().get(null)):o.makeRandomMove(r.getBoard().get(null),!0,u);const n=p(t,r);n.status&&(u=t);const a=document.getElementById(`player-${t[0]}-${t[1]}`);$e.attackDOMManipulation(n,a,o.name),m(r)||(e.switchTurn(),o.switchTurn(),f())},f=()=>{document.querySelectorAll('div[player-data="opponent"]>div').forEach((e=>{e.addEventListener("click",h,{once:!0,capture:!0})}))},h=t=>{const[,n,r]=t.target.id.split("-");if(!n||!r||a.checkIfAlreadyHit([n,r]).status)return void $e.changeContentHeadline("You already hit here");const o=p([n,r],a);$e.attackDOMManipulation(o,t.target,e.name),document.querySelectorAll('div[player-data="opponent"]>div').forEach((e=>{e.removeEventListener("click",h,{once:!0,capture:!0})})),m(a)||setTimeout(d,1e3)},p=(e,t)=>t.receiveAttack(e),m=e=>!e.getShipsLeft().status&&($e.changeContentHeadline("WINNER"),document.querySelectorAll('div[player-data="opponent"]>div').forEach((e=>{e.removeEventListener("click",h)})),!0);return{createNewGame:i}})().createNewGame()}})();