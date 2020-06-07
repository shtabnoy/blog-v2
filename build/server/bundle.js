!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=12)}([function(e,n){e.exports=require("react")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("@emotion/core")},function(e,n){e.exports=require("react-router-dom")},function(e,n){e.exports=require("node-fetch")},function(e,n){e.exports=require("react-dom/server")},function(e,n){e.exports=require("@apollo/react-common")},function(e,n){e.exports=require("@apollo/react-ssr")},function(e,n){e.exports=require("apollo-client")},function(e,n){e.exports=require("apollo-link-http")},function(e,n){e.exports=require("apollo-cache-inmemory")},function(e,n,t){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=t(2),i=t(3),a=r(t(14)),l=r(t(15));n.default=function(){return o.jsx(i.Switch,null,o.jsx(i.Route,{path:"/"},o.jsx(l.default,null)),o.jsx(i.Route,{path:"/articles/:id"},o.jsx(a.default,null)))}},function(e,n,t){e.exports=t(13)},function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),i=t(1),a=t.n(i),l=t(5),u=t.n(l),c=t(6),s=t(7),d=t(8),f=t(9),p=t(10),h=t(3),x=t(4),y=t.n(x),b=t(11),g=t.n(b);function v(e){var n=e.content,t=e.state;return o.a.createElement("html",null,o.a.createElement("head",null,o.a.createElement("meta",{charSet:"utf-8"}),o.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),o.a.createElement("title",null,"Bloggy Blog")),o.a.createElement("body",null,o.a.createElement("div",{id:"root",dangerouslySetInnerHTML:{__html:n}}),o.a.createElement("script",{dangerouslySetInnerHTML:{__html:"window.__APOLLO_STATE__=".concat(JSON.stringify(t).replace(/</g,"\\u003c"),";")}}),o.a.createElement("script",{src:"/bundle.js",charSet:"UTF-8"})))}var w,m;w=new d.ApolloClient({ssrMode:!0,link:Object(f.createHttpLink)({uri:"http://localhost:1337/graphql",credentials:"same-origin",fetch:y.a}),cache:new p.InMemoryCache}),m=o.a.createElement(c.ApolloProvider,{client:w},o.a.createElement(h.StaticRouter,{location:"/",context:{}},o.a.createElement(g.a,null))),Object(s.getDataFromTree)(m).then((function(){var e=u.a.renderToString(m),n=w.extract(),t=o.a.createElement(v,{content:e,state:n});a.a.writeFileSync("build/client/index.html","<!doctype html>\n".concat(u.a.renderToStaticMarkup(t))),y()("http://localhost:1337/upload/files").then((function(e){return e.json()})).then((function(e){var n=e.map((function(e){return e.url}));Promise.all(n.map((function(e){return y()("http://localhost:1337"+e).then((function(e){return e.ok?e.text():null})).then((function(n){if(n){var t="build/client/images";a.a.existsSync(t)||a.a.mkdirSync(t),a.a.writeFileSync(t+"/"+e.split("/")[2],n)}})).catch(console.error)})))})).catch(console.error)}))},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(2),o=t(3);n.default=function(){var e=o.useParams();return console.log(e),r.jsx("div",null,"Article 1092k")}},function(e,n,t){"use strict";var r=this&&this.__makeTemplateObject||function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var i,a,l=t(2),u=o(t(0)),c=t(16),s=t(17),d=o(t(18)),f=o(t(20)),p=s.gql(i||(i=r(["\n  query getArticles {\n    articles(start: 0) {\n      id\n      title\n      body\n      user {\n        username\n      }\n      cover {\n        url\n        name\n      }\n      category {\n        name\n        image {\n          url\n        }\n      }\n      created_at\n      updated_at\n    }\n  }\n"],["\n  query getArticles {\n    articles(start: 0) {\n      id\n      title\n      body\n      user {\n        username\n      }\n      cover {\n        url\n        name\n      }\n      category {\n        name\n        image {\n          url\n        }\n      }\n      created_at\n      updated_at\n    }\n  }\n"]))),h=f.default.header(a||(a=r(["\n  padding: 32px;\n  position: absolute;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n\n  .search {\n    width: 350px;\n    display: flex;\n    align-items: center;\n    position: relative;\n    transition: width 0.5s ease-in-out;\n\n    .hidden-border {\n      background-color: white;\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      bottom: 0;\n      transition: width 0.5s ease-in-out;\n    }\n\n    svg {\n      min-width: 30px;\n      position: absolute;\n      left: 8px;\n      &:hover ~ input {\n        width: 100%;\n      }\n    }\n\n    input {\n      padding: 15px 0px 14px 48px;\n      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.7);\n      border: 0;\n      border-radius: 32px;\n      width: 0%;\n      color: white;\n      font-size: 16px;\n      opacity: 1;\n      transition: width 0.5s ease-in-out;\n      background-color: #5d6afb;\n      &::-webkit-input-placeholder {\n        color: #b4bafd;\n      }\n\n      &:focus {\n        width: 100%;\n        padding-right: 8px;\n      }\n      &:hover {\n        width: 100%;\n      }\n    }\n  }\n"],["\n  padding: 32px;\n  position: absolute;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n\n  .search {\n    width: 350px;\n    display: flex;\n    align-items: center;\n    position: relative;\n    transition: width 0.5s ease-in-out;\n\n    .hidden-border {\n      background-color: white;\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      bottom: 0;\n      transition: width 0.5s ease-in-out;\n    }\n\n    svg {\n      min-width: 30px;\n      position: absolute;\n      left: 8px;\n      &:hover ~ input {\n        width: 100%;\n      }\n    }\n\n    input {\n      padding: 15px 0px 14px 48px;\n      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.7);\n      border: 0;\n      border-radius: 32px;\n      width: 0%;\n      color: white;\n      font-size: 16px;\n      opacity: 1;\n      transition: width 0.5s ease-in-out;\n      background-color: #5d6afb;\n      &::-webkit-input-placeholder {\n        color: #b4bafd;\n      }\n\n      &:focus {\n        width: 100%;\n        padding-right: 8px;\n      }\n      &:hover {\n        width: 100%;\n      }\n    }\n  }\n"])));n.default=function(){var e=c.useQuery(p),n=e.loading,t=e.error,r=e.data;if(n)return l.jsx("p",null,"Loading...");if(t)return l.jsx("p",null,"Error :(");var o=r.articles.filter((function(e){return e.cover&&e.cover.url.endsWith(".svg")}));return l.jsx(u.default.Fragment,null,l.jsx(h,null),l.jsx(d.default,{articles:o}))}},function(e,n){e.exports=require("@apollo/react-hooks")},function(e,n){e.exports=require("apollo-boost")},function(e,n,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var o in n=arguments[t])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,l)}u((r=r.apply(e,n||[])).next())}))},i=this&&this.__generator||function(e,n){var t,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},a=this&&this.__read||function(e,n){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,o,i=t.call(e),a=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return a},l=this&&this.__spread||function(){for(var e=[],n=0;n<arguments.length;n++)e=e.concat(a(arguments[n]));return e},u=this&&this.__values||function(e){var n="function"==typeof Symbol&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")},c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n};Object.defineProperty(n,"__esModule",{value:!0});var s=t(2),d=c(t(0)),f=t(19),p=200,h=200,x="undefined"!=typeof window?window.innerWidth:0,y="undefined"!=typeof window?window.innerHeight:0,b=function(e,n,t,r,o,i){if(e&&!n.find((function(e){return e.x===t&&e.y===r}))&&o){var a={id:e.id,coverUrl:e.cover.url,x:t,y:r,text:e.title};return i(l(n,[a])),!0}return!1};n.default=function(e){var n=e.articles,t=a(d.useState({}),2),l=t[0],c=t[1],g=a(d.useState([{id:n[0].id,x:x/2,y:y/2,coverUrl:n[0].cover.url,text:n[0].title}]),2),v=g[0],w=g[1],m=function(e){e.currentTarget.to({scaleX:1.1,scaleY:1.1,duration:.1});var n=e.currentTarget.children[0];n.setShadowColor("black"),n.setShadowBlur(10),n.setShadowOffset({x:10,y:10}),n.setShadowOpacity(.5)},_=function(e){e.currentTarget.to({scaleX:1,scaleY:1,duration:.1});var n=e.currentTarget.children[0];n.setShadowColor("black"),n.setShadowBlur(0),n.setShadowOffset({x:0,y:0}),n.setShadowOpacity(0)};return d.useEffect((function(){o(void 0,void 0,void 0,(function(){var e,n;return i(this,(function(t){switch(t.label){case 0:return e=v[v.length-1],[4,(o=e.coverUrl,new Promise((function(e,n){var t="undefined"!=typeof window?new window.Image:{src:"",onload:function(){},onerror:function(){}};t.src="http://localhost:1337"+o,t.onload=function(n){return e(n.target)},t.onerror=function(e){return n(e)}})))];case 1:return n=t.sent(),c((function(t){var o;return r(r({},t),((o={})[e.id]=n,o))})),[2]}var o}))}))}),[v]),s.jsx(d.default.Fragment,null,s.jsx(f.Stage,{width:x,height:y,style:{background:"linear-gradient(to bottom, #3542A8, #841E71)"},draggable:!0,onDragMove:function(e){return function(e,n,t,r){var o,i,a=e.target.getStage().attrs.x,l=e.target.getStage().attrs.y;if(!(n.length>=r.length))try{for(var c=u(n),s=c.next();!s.done;s=c.next()){var d=s.value,f=r[n.length];if(b(f,n,d.x-400,d.y,d.x-p-h+a>0,t))break;if(b(f,n,d.x+400,d.y,d.x+p+h+a<x,t))break;if(b(f,n,d.x+p,d.y-350,d.x+p+h+a<x&&d.y-p-h+l>0,t))break;if(b(f,n,d.x+p,d.y+350,d.x+p+h+a<x&&d.y+p+h+l<y,t))break;if(b(f,n,d.x-p,d.y-350,d.x-p-h+a>0&&d.y-p-h+l>0,t))break;if(b(f,n,d.x-p,d.y+350,d.x-p-h+a>0&&d.y+p+h+l<y,t))break}}catch(e){o={error:e}}finally{try{s&&!s.done&&(i=c.return)&&i.call(c)}finally{if(o)throw o.error}}}(e,v,w,n)}},s.jsx(f.Layer,null,v.map((function(e){return s.jsx(f.Group,{key:e.id,x:e.x,y:e.y,onMouseOver:m,onMouseOut:_},s.jsx(f.RegularPolygon,{radius:p,sides:6,stroke:"rgba(255,255,255,0.9)",fillLinearGradientStartPoint:{x:0,y:-p},fillLinearGradientEndPoint:{x:0,y:p},fillLinearGradientColorStops:[.3,"#4456D6",1,"#D931BA"]}),e.text&&s.jsx(f.Text,{text:e.text,fontSize:18,width:400,offsetY:90,offsetX:p,align:"center",fill:"white"}),l[e.id]&&s.jsx(f.Image,{offset:{x:Number(l[e.id].width)/2,y:Number(l[e.id].width)/2},image:l[e.id]}))})))))}},function(e,n){e.exports=require("react-konva")},function(e,n){e.exports=require("@emotion/styled")}]);