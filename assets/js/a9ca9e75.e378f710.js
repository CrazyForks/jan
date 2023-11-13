"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[419],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=r.createContext({}),c=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(o.Provider,{value:t},e.children)},f="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,o=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),f=c(n),u=i,m=f["".concat(o,".").concat(u)]||f[u]||d[u]||a;return n?r.createElement(m,s(s({ref:t},p),{},{components:n})):r.createElement(m,s({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,s=new Array(a);s[0]=u;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l[f]="string"==typeof e?e:i,s[1]=l;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},974:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={title:"Files"},s=void 0,l={unversionedId:"docs/modules/files",id:"docs/modules/files",title:"Files",description:"Files can be used by threads, assistants and fine-tuning",source:"@site/docs/docs/modules/06_files.md",sourceDirName:"docs/modules",slug:"/docs/modules/files",permalink:"/docs/modules/files",draft:!1,editUrl:"https://github.com/janhq/jan/tree/main/docs/docs/docs/modules/06_files.md",tags:[],version:"current",lastUpdatedBy:"Daniel",lastUpdatedAt:1699848756,formattedLastUpdatedAt:"Nov 13, 2023",sidebarPosition:6,frontMatter:{title:"Files"},sidebar:"docsSidebar",previous:{title:"Messages",permalink:"/docs/modules/messages"},next:{title:"User Interface",permalink:"/docs/user-interface"}},o={},c=[{value:"Files Object",id:"files-object",level:2},{value:"File API",id:"file-api",level:2},{value:"Files Filesystem",id:"files-filesystem",level:2}],p={toc:c},f="wrapper";function d(e){let{components:t,...n}=e;return(0,i.kt)(f,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Files can be used by ",(0,i.kt)("inlineCode",{parentName:"p"},"threads"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"assistants")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"fine-tuning")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Equivalent to: ",(0,i.kt)("a",{parentName:"p",href:"https://platform.openai.com/docs/api-reference/files"},"https://platform.openai.com/docs/api-reference/files"))),(0,i.kt)("h2",{id:"files-object"},"Files Object"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Equivalent to: ",(0,i.kt)("a",{parentName:"li",href:"https://platform.openai.com/docs/api-reference/files"},"https://platform.openai.com/docs/api-reference/files")),(0,i.kt)("li",{parentName:"ul"},"Note: OAI's struct doesn't seem very well designed"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"files.json"))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  // Public properties (OpenAI Compatible: https://platform.openai.com/docs/api-reference/files/object)\n  "id": "file-BK7bzQj3FfZFXr7DbL6xJwfo",\n  "object": "file",\n  "bytes": 120000,\n  "created_at": 1677610602,\n  "filename": "salesOverview.pdf",\n  "purpose": "assistants"\n}\n')),(0,i.kt)("h2",{id:"file-api"},"File API"),(0,i.kt)("h2",{id:"files-filesystem"},"Files Filesystem"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Files can exist in several parts of Jan's filesystem"),(0,i.kt)("li",{parentName:"ul"},"TODO: are files hard copied into these folders? Or do we define a ",(0,i.kt)("inlineCode",{parentName:"li"},"files.json")," and only record the relative filepath?")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh="},"/files                  # root `/files` for finetuning, etc\n/assistants\n    /jan\n        /files          # assistant-specific files\n/threads\n    /jan-12938912\n        /files          # thread-specific files\n\n")))}d.isMDXComponent=!0}}]);