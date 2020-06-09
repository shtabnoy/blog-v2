!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=14)}([function(e,n){e.exports=require("react")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("@emotion/core")},function(e,n){e.exports=require("node-fetch")},function(e,n){e.exports=require("react-router-dom")},function(e,n){e.exports=require("react-dom/server")},function(e,n){e.exports=require("@apollo/react-hooks")},function(e,n){e.exports=require("apollo-boost")},function(e,n){e.exports=require("@apollo/react-common")},function(e,n){e.exports=require("@apollo/react-ssr")},function(e,n){e.exports=require("apollo-client")},function(e,n){e.exports=require("apollo-link-http")},function(e,n){e.exports=require("apollo-cache-inmemory")},function(e,n,t){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var i=t(2),o=t(4),a=r(t(16)),l=r(t(17)),u=t(21),c="undefined"==typeof window?u.createMemoryHistory({initialEntries:["/","/articles/1"]}):u.createBrowserHistory();n.default=function(){return i.jsx(o.Router,{history:c},i.jsx(o.Switch,null,i.jsx(o.Route,{path:"/",exact:!0},i.jsx(l.default,null)),i.jsx(o.Route,{path:"/articles/:id"},i.jsx(a.default,null))))}},function(e,n,t){e.exports=t(15)},function(e,n,t){"use strict";t.r(n);var r=t(0),i=t.n(r),o=t(1),a=t.n(o),l=t(5),u=t.n(l),c=t(8),s=t(9),d=t(10),f=t(11),p=t(12),h=(t(4),t(3)),x=t.n(h),y=t(13),v=t.n(y);function b(e){var n=e.content,t=e.state;return i.a.createElement("html",null,i.a.createElement("head",null,i.a.createElement("meta",{charSet:"utf-8"}),i.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),i.a.createElement("title",null,"Bloggy Blog")),i.a.createElement("body",null,i.a.createElement("div",{id:"root",dangerouslySetInnerHTML:{__html:n}}),i.a.createElement("script",{dangerouslySetInnerHTML:{__html:"window.__APOLLO_STATE__=".concat(JSON.stringify(t).replace(/</g,"\\u003c"),";")}}),i.a.createElement("script",{src:"/bundle.js",charSet:"UTF-8"})))}var g,m;g=new d.ApolloClient({ssrMode:!0,link:Object(f.createHttpLink)({uri:"http://localhost:1337/graphql",credentials:"same-origin",fetch:x.a}),cache:new p.InMemoryCache}),m=i.a.createElement(c.ApolloProvider,{client:g},i.a.createElement(v.a,null)),Object(s.getDataFromTree)(m).then((function(){var e=u.a.renderToString(m),n=g.extract();console.log(n);var t=i.a.createElement(b,{content:e,state:n});a.a.writeFileSync("build/client/index.html","<!doctype html>\n".concat(u.a.renderToStaticMarkup(t))),x()("http://localhost:1337/upload/files").then((function(e){return e.json()})).then((function(e){var n=e.map((function(e){return e.url}));Promise.all(n.map((function(e){return x()("http://localhost:1337"+e).then((function(e){return e.ok?e.text():null})).then((function(n){if(n){var t="build/client/images";a.a.existsSync(t)||a.a.mkdirSync(t),a.a.writeFileSync(t+"/"+e.split("/")[2],n)}})).catch(console.error)})))})).catch(console.error)}))},function(e,n,t){"use strict";var r=this&&this.__makeTemplateObject||function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e};Object.defineProperty(n,"__esModule",{value:!0});var i,o=t(2),a=t(4),l=t(6),u=t(7).gql(i||(i=r(["\n  query getArticle($id: ID!) {\n    article(id: $id) {\n      id\n      title\n      body\n      user {\n        username\n      }\n      cover {\n        url\n        name\n        hash\n        ext\n      }\n      category {\n        name\n        image {\n          url\n        }\n      }\n      created_at\n      updated_at\n    }\n  }\n"],["\n  query getArticle($id: ID!) {\n    article(id: $id) {\n      id\n      title\n      body\n      user {\n        username\n      }\n      cover {\n        url\n        name\n        hash\n        ext\n      }\n      category {\n        name\n        image {\n          url\n        }\n      }\n      created_at\n      updated_at\n    }\n  }\n"])));n.default=function(){var e=a.useParams(),n=l.useQuery(u,{variables:{id:e.id}}),t=n.loading,r=n.error,i=n.data;if(i&&i.article){var c=i.article,s=c.id,d=c.title,f=c.body;return o.jsx("div",null,o.jsx("div",null,s),o.jsx("div",null,d),o.jsx("div",null,f))}return t?o.jsx("div",null,"Loading..."):r?o.jsx("div",null,"Error happened"):o.jsx("div",null,"Article loaded.")}},function(e,n,t){"use strict";var r=this&&this.__makeTemplateObject||function(e,n){return Object.defineProperty?Object.defineProperty(e,"raw",{value:n}):e.raw=n,e},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o,a,l=t(2),u=i(t(0)),c=t(6),s=t(7),d=i(t(18)),f=i(t(20)),p=s.gql(o||(o=r(["\n  query getArticles {\n    articles(start: 0) {\n      id\n      title\n      body\n      user {\n        username\n      }\n      cover {\n        url\n        name\n        hash\n        ext\n      }\n      category {\n        name\n        image {\n          url\n        }\n      }\n      created_at\n      updated_at\n    }\n  }\n"],["\n  query getArticles {\n    articles(start: 0) {\n      id\n      title\n      body\n      user {\n        username\n      }\n      cover {\n        url\n        name\n        hash\n        ext\n      }\n      category {\n        name\n        image {\n          url\n        }\n      }\n      created_at\n      updated_at\n    }\n  }\n"]))),h=f.default.header(a||(a=r(["\n  padding: 32px;\n  position: absolute;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n\n  .search {\n    width: 350px;\n    display: flex;\n    align-items: center;\n    position: relative;\n    transition: width 0.5s ease-in-out;\n\n    .hidden-border {\n      background-color: white;\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      bottom: 0;\n      transition: width 0.5s ease-in-out;\n    }\n\n    svg {\n      min-width: 30px;\n      position: absolute;\n      left: 8px;\n      &:hover ~ input {\n        width: 100%;\n      }\n    }\n\n    input {\n      padding: 15px 0px 14px 48px;\n      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.7);\n      border: 0;\n      border-radius: 32px;\n      width: 0%;\n      color: white;\n      font-size: 16px;\n      opacity: 1;\n      transition: width 0.5s ease-in-out;\n      background-color: #5d6afb;\n      &::-webkit-input-placeholder {\n        color: #b4bafd;\n      }\n\n      &:focus {\n        width: 100%;\n        padding-right: 8px;\n      }\n      &:hover {\n        width: 100%;\n      }\n    }\n  }\n"],["\n  padding: 32px;\n  position: absolute;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  box-sizing: border-box;\n\n  .search {\n    width: 350px;\n    display: flex;\n    align-items: center;\n    position: relative;\n    transition: width 0.5s ease-in-out;\n\n    .hidden-border {\n      background-color: white;\n      position: absolute;\n      width: 100%;\n      height: 1px;\n      bottom: 0;\n      transition: width 0.5s ease-in-out;\n    }\n\n    svg {\n      min-width: 30px;\n      position: absolute;\n      left: 8px;\n      &:hover ~ input {\n        width: 100%;\n      }\n    }\n\n    input {\n      padding: 15px 0px 14px 48px;\n      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.7);\n      border: 0;\n      border-radius: 32px;\n      width: 0%;\n      color: white;\n      font-size: 16px;\n      opacity: 1;\n      transition: width 0.5s ease-in-out;\n      background-color: #5d6afb;\n      &::-webkit-input-placeholder {\n        color: #b4bafd;\n      }\n\n      &:focus {\n        width: 100%;\n        padding-right: 8px;\n      }\n      &:hover {\n        width: 100%;\n      }\n    }\n  }\n"])));n.default=function(){var e=c.useQuery(p),n=e.loading,t=e.error,r=e.data;if(n)return l.jsx("p",null,"Loading...");if(t)return l.jsx("p",null,"Error :(");var i=r.articles.filter((function(e){return e.cover&&e.cover.url.endsWith(".svg")}));return l.jsx(u.default.Fragment,null,l.jsx(h,null,"Home page"),l.jsx(d.default,{articles:i}))}},function(e,n,t){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},i=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(i,o){function a(e){try{u(r.next(e))}catch(e){o(e)}}function l(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var n;e.done?i(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,l)}u((r=r.apply(e,n||[])).next())}))},o=this&&this.__generator||function(e,n){var t,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(o){return function(l){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=n.call(e,a)}catch(e){o=[6,e],r=0}finally{t=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,l])}}},a=this&&this.__read||function(e,n){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var r,i,o=t.call(e),a=[];try{for(;(void 0===n||n-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(t=o.return)&&t.call(o)}finally{if(i)throw i.error}}return a},l=this&&this.__spread||function(){for(var e=[],n=0;n<arguments.length;n++)e=e.concat(a(arguments[n]));return e},u=this&&this.__values||function(e){var n="function"==typeof Symbol&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")},c=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n};Object.defineProperty(n,"__esModule",{value:!0});var s=t(2),d=c(t(0)),f=t(19),p=200,h=200,x="undefined"!=typeof window?window.innerWidth:0,y="undefined"!=typeof window?window.innerHeight:0,v=function(e,n,t,r,i,o){var a,u;if(e&&!n.find((function(e){return e.x===t&&e.y===r}))&&i){var c={id:e.id,cover:(null===(a=e.cover)||void 0===a?void 0:a.hash)+(null===(u=e.cover)||void 0===u?void 0:u.ext),x:t,y:r,text:e.title};return o(l(n,[c])),!0}return!1};n.default=function(e){var n,t,l=e.articles,c=a(d.useState({}),2),b=c[0],g=c[1],m=a(d.useState([{id:l[0].id,x:x/2,y:y/2,cover:(null===(n=l[0].cover)||void 0===n?void 0:n.hash)+(null===(t=l[0].cover)||void 0===t?void 0:t.ext),text:l[0].title}]),2),w=m[0],_=m[1],j=function(e){e.currentTarget.to({scaleX:1.1,scaleY:1.1,duration:.1});var n=e.currentTarget.children[0];n.setShadowColor("black"),n.setShadowBlur(10),n.setShadowOffset({x:10,y:10}),n.setShadowOpacity(.5)},S=function(e){e.currentTarget.to({scaleX:1,scaleY:1,duration:.1});var n=e.currentTarget.children[0];n.setShadowColor("black"),n.setShadowBlur(0),n.setShadowOffset({x:0,y:0}),n.setShadowOpacity(0)};return d.useEffect((function(){i(void 0,void 0,void 0,(function(){var e,n;return o(this,(function(t){switch(t.label){case 0:return e=w[w.length-1],[4,(i=e.cover,new Promise((function(e,n){var t="undefined"!=typeof window?new window.Image:{src:"",onload:function(){},onerror:function(){}};t.src="/images/"+i,t.onload=function(n){return e(n.target)},t.onerror=function(e){return n(e)}})))];case 1:return n=t.sent(),g((function(t){var i;return r(r({},t),((i={})[e.id]=n,i))})),[2]}var i}))}))}),[w]),s.jsx(d.default.Fragment,null,s.jsx(f.Stage,{width:x,height:y,style:{background:"linear-gradient(to bottom, #3542A8, #841E71)"},draggable:!0,onDragMove:function(e){return function(e,n,t,r){var i,o,a=e.target.getStage().attrs.x,l=e.target.getStage().attrs.y;if(!(n.length>=r.length))try{for(var c=u(n),s=c.next();!s.done;s=c.next()){var d=s.value,f=r[n.length];if(v(f,n,d.x-400,d.y,d.x-p-h+a>0,t))break;if(v(f,n,d.x+400,d.y,d.x+p+h+a<x,t))break;if(v(f,n,d.x+p,d.y-350,d.x+p+h+a<x&&d.y-p-h+l>0,t))break;if(v(f,n,d.x+p,d.y+350,d.x+p+h+a<x&&d.y+p+h+l<y,t))break;if(v(f,n,d.x-p,d.y-350,d.x-p-h+a>0&&d.y-p-h+l>0,t))break;if(v(f,n,d.x-p,d.y+350,d.x-p-h+a>0&&d.y+p+h+l<y,t))break}}catch(e){i={error:e}}finally{try{s&&!s.done&&(o=c.return)&&o.call(c)}finally{if(i)throw i.error}}}(e,w,_,l)}},s.jsx(f.Layer,null,w.map((function(e){return s.jsx(f.Group,{key:e.id,x:e.x,y:e.y,onMouseOver:j,onMouseOut:S},s.jsx(f.RegularPolygon,{radius:p,sides:6,stroke:"rgba(255,255,255,0.9)",fillLinearGradientStartPoint:{x:0,y:-p},fillLinearGradientEndPoint:{x:0,y:p},fillLinearGradientColorStops:[.3,"#4456D6",1,"#D931BA"]}),e.text&&s.jsx(f.Text,{text:e.text,fontSize:18,width:400,offsetY:90,offsetX:p,align:"center",fill:"white"}),b[e.id]&&s.jsx(f.Image,{offset:{x:Number(b[e.id].width)/2,y:Number(b[e.id].width)/2},image:b[e.id]}))})))))}},function(e,n){e.exports=require("react-konva")},function(e,n){e.exports=require("@emotion/styled")},function(e,n){e.exports=require("history")}]);