"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[75,972],{6820:function(e,t,a){a.d(t,{Z:function(){return o}});a(2791);var s=a(3168),n=a(364),i=a(3504),r="Breadcrumbs_main__Pfxmq",l="Breadcrumbs_block__esy2n",c=a(184),o=(0,n.$j)((function(e){return{currentlanguage:e.common.currentlanguage}}),null)((function(e){e.currentlanguage;var t=e.active,a=e.items,n=(0,s.$)().t;return(0,c.jsxs)("div",{className:r,children:[(0,c.jsxs)("div",{className:l,children:[(0,c.jsx)(i.OL,{to:"/",children:n("navigation.breadcrumbMain")}),(0,c.jsx)("span",{children:">"})]}),a&&a.map((function(e){return(0,c.jsxs)("div",{className:l,children:[(0,c.jsx)(i.OL,{to:e.href,children:e.title}),(0,c.jsx)("span",{children:">"})]},e.href)})),(0,c.jsx)("p",{children:t})]})}))},7604:function(e,t,a){a.d(t,{Z:function(){return Z}});var s=a(885),n=a(2791),i=a(364),r="SmallItem_main__x7HX-",l="SmallItem_image__xlWNf",c="SmallItem_info__juLgQ",o="SmallItem_left__yViBi",d="SmallItem_price__koIZq",m="SmallItem_inAction__eFI7z",u="SmallItem_discount__ZOaXW",_="SmallItem_buyBut__W86Ev",h=a(6375),x=a(6151),j=a(3168),g=a(2426),p=a.n(g),v=a(7941),f="Baige_main__HFBZW",b="Baige_new__nQ3zh",y="Baige_currency__d6172",N=a(184),I=function(e){var t=e.type,a=void 0===t?"new":t,s=e.value;(0,j.$)().t;return(0,N.jsx)("div",{className:(0,v.cx)(f,"new"===a?b:""),children:(0,N.jsxs)("label",{children:["new"===a&&"NEW","discount"===a&&(s.includes("%")?"-"+s:(0,N.jsxs)("span",{children:["-",s,(0,N.jsx)("label",{className:y,children:"\xa0\u0433\u0440\u043d."})]}))]})})},C=a(6871),k=a(5920),w=a(6434),Z=(0,i.$j)((function(e){return{currentLanguage:e.common.currentLanguage}}),null)((function(e){var t=e.item,a=e.currentLanguage,i=e.className,g=(0,j.$)().t,f=(0,n.useState)(!1),b=(0,s.Z)(f,2),y=b[0],Z=b[1],S=(0,n.useState)(null),T=(0,s.Z)(S,2),L=T[0],P=T[1],A=(0,C.s0)(),B=20*t.rating,M=function(){var e="ru"===a?t.name:t.name_ua;A("/item/".concat(e))},F=(0,k.Q)(t.price);return(0,n.useEffect)((function(){t&&t.action&&P((0,w.a)(t.price,t.action.discount))}),[t]),(0,n.useEffect)((function(){p()(t.created_at).diff(p()(),"days")>=-30&&Z(!0)}),[]),(0,N.jsxs)("div",{className:(0,v.cx)(r,i),onClick:M,children:[y&&(0,N.jsx)(I,{type:"new"}),t.action&&!t.action.from_items_count&&!t.action.from_sum_in_bill&&(0,N.jsx)(I,{type:"discount",value:t.action.discount}),(0,N.jsx)("img",{src:t.images[0],alt:"image",className:l}),(0,N.jsxs)("div",{className:c,children:[(0,N.jsxs)("div",{className:o,children:[(0,N.jsx)("p",{children:"ru"===a?t.name:t.name_ua}),(0,N.jsx)(h.i,{size:"22px",ratingValue:B,readonly:!0})]}),(0,N.jsxs)("div",{className:d,children:[t.action&&0===t.action.from_sum_in_bill&&!t.action.from_items_count&&(0,N.jsxs)("p",{className:u,children:[L," \u0433\u0440\u043d"]}),(0,N.jsxs)("p",{className:(0,v.cx)(d,t.action&&0===t.action.from_sum_in_bill&&!t.action.from_items_count?m:void 0),children:[F," \u0433\u0440\u043d"]})]})]}),(0,N.jsx)(x.Z,{className:_,onClick:M,children:g("actions.buy")})]})}))},519:function(e,t,a){a.d(t,{Z:function(){return d}});a(2791);var s={main:"SmallItemsList_main__c5mdz",header:"SmallItemsList_header__D1zKL",slider:"SmallItemsList_slider__g5AvO",item:"SmallItemsList_item__oXrVT"},n=a(3168),i=a(3504),r=a(6954),l=a(7604),c=a(7941),o=a(184),d=function(e){var t=e.items,a=e.href,d=e.title,m=e.slidesToShow,u=void 0===m?5:m,_=(0,n.$)().t;return(0,o.jsxs)("div",{className:s.main,children:[(0,o.jsxs)("div",{className:s.header,children:[(0,o.jsx)("h4",{children:d}),a&&t.length>=5&&(0,o.jsx)(i.OL,{to:a,children:_("items.listTextHref")})]}),(0,o.jsx)("div",{className:(0,c.cx)(s.slider,t.length<5?s.notFull:""),children:(0,o.jsx)(r.Z,{slidesToShow:u,children:t.map((function(e){return(0,o.jsx)(l.Z,{item:e,className:s.item},e._id)}))})})]})}},6954:function(e,t,a){a.d(t,{Z:function(){return h}});var s=a(1413),n=a(3400),i=(a(2791),a(5717)),r="Slider_main__XUYQb",l="Slider_slideBut__WU2lx",c="Slider_slider__zVo6c",o=a(3853),d=a(9030),m=a(184);function u(e){var t=e.className,a=e.style,i=e.onClick,r=e.type,c=(0,d.Z)().width;return(0,m.jsx)("div",{className:t,style:(0,s.Z)((0,s.Z)({},a),{},{display:"block",padding:0,zIndex:5,right:"items"===r?c<768?"4%":0:c<768?"9%":"5%",top:c<768&&"items"===r?"43%":"48%"}),children:(0,m.jsx)(n.Z,{onClick:i,className:l,children:(0,m.jsx)(o.Rgz,{})})})}function _(e){var t=e.className,a=e.style,i=e.onClick,r=e.type,c=(0,d.Z)().width;return(0,m.jsx)("div",{className:t,style:(0,s.Z)((0,s.Z)({},a),{},{display:"block",padding:0,zIndex:5,left:"items"===r?"-20px":"4%",top:c<768&&"items"===r?"43%":"48%"}),children:(0,m.jsx)(n.Z,{onClick:i,className:l,children:(0,m.jsx)(o.Ao2,{})})})}var h=function(e){var t=e.children,a=e.dots,n=void 0!==a&&a,l=e.infinite,o=void 0===l||l,d=e.speed,h=void 0===d?500:d,x=e.slidesToShow,j=void 0===x?1:x,g=e.slidesToScroll,p=void 0===g?1:g,v=e.autoplay,f=void 0!==v&&v,b=e.vertical,y=void 0!==b&&b,N=e.verticalSwiping,I=void 0!==N&&N,C=e.type,k=void 0===C?"items":C,w=e.responsive,Z=void 0===w?[{breakpoint:1170,settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:862,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]:w,S={dots:n,infinite:o,speed:h,slidesToShow:j,slidesToScroll:p,autoplay:f,swipeToSlide:!0,adaptiveHeight:!0,arrows:!0,draggable:!0,vertical:y,verticalSwiping:I,nextArrow:(0,m.jsx)(u,{type:k}),prevArrow:(0,m.jsx)(_,{type:k}),className:c,responsive:Z};return(0,m.jsx)("div",{className:r,children:(0,m.jsx)(i.Z,(0,s.Z)((0,s.Z)({},S),{},{children:t}))})}},1075:function(e,t,a){a.r(t),a.d(t,{default:function(){return Pt}});var s=a(1413),n=a(2982),i=a(885),r=a(2791),l=a(364),c=a(6871),o=a(8813),d=a(5833),m=a(5406),u=a(2401),_=a(7711),h=a(265),x=a(6434),j=a(5369),g=a(6151),p=a(68),v=a(3400),f=a(8825),b=a(6375),y=a(6820),N=a(5717),I="CustomVerticalSlider_main__bL5R5",C="CustomVerticalSlider_slideBut__gP+9P",k="CustomVerticalSlider_slider__NzEgk",w=a(3853),Z=a(9030),S=a(184);function T(e){var t=e.className,a=e.style,n=e.onClick,i=(0,Z.Z)().width;return(0,S.jsx)("div",{className:t,style:(0,s.Z)((0,s.Z)({},a),{},{display:"block",padding:0,zIndex:5,left:i>862?"35%":"25%",top:"97%"}),children:(0,S.jsx)(v.Z,{onClick:n,className:C,children:(0,S.jsx)(w.tv1,{})})})}function L(e){var t=e.className,a=e.style,n=e.onClick,i=(0,Z.Z)().width;return(0,S.jsx)("div",{className:t,style:(0,s.Z)((0,s.Z)({},a),{},{display:"block",padding:0,zIndex:5,left:i>862?"35%":"25%",top:"-10px"}),children:(0,S.jsx)(v.Z,{onClick:n,className:C,children:(0,S.jsx)(w.iRh,{})})})}var P=function(e){var t=e.children,a=e.dots,n=void 0!==a&&a,i=e.infinite,r=void 0===i||i,l=e.speed,c=void 0===l?500:l,o=e.slidesToShow,d=void 0===o?1:o,m=e.slidesToScroll,u=void 0===m?1:m,_=e.autoplay,h={dots:n,infinite:r,speed:c,slidesToShow:d,slidesToScroll:u,autoplay:void 0===_||_,swipeToSlide:!0,adaptiveHeight:!0,arrows:!0,draggable:!0,vertical:!0,verticalSwiping:!0,nextArrow:(0,S.jsx)(T,{}),prevArrow:(0,S.jsx)(L,{}),className:k};return(0,S.jsx)("div",{className:I,children:(0,S.jsx)(N.Z,(0,s.Z)((0,s.Z)({},h),{},{children:t}))})},A=a(1469),B=a(6078),M=a(7941),F="Item_mainContainer__hJh8t",z="Item_main__uyd1G",V="Item_container__XcHXn",E="Item_itemName__U-jHm",O="Item_content__j78u-",D="Item_images__GmK+v",H="Item_info__YhTSk",W="Item_slider__PcqhP",$="Item_smallVideoContainer__iT6wu",R="Item_videoShield__0+NHx",X="Item_smallImage__m1c1Q",q="Item_activeImg__-i3JD",G="Item_currentImageBlock__S189T",U="Item_currentImage__CclbE",Q="Item_currentVideo__lKmGI",Y="Item_ratingCodeBlock__w36J8",K="Item_priceBlock__kA7NR",J="Item_price__ocO5R",ee="Item_inAction__3kddj",te="Item_discount__PAtwc",ae="Item_buyBut__TBVkT",se="Item_likeBut__86oev",ne="Item_unlikeBut__DbMOd",ie="Item_actionBlock__hkbJQ",re="Item_delivery__lviHR",le="Item_deliveryTitle__uU4Ke",ce="Item_deliveryPoints__Da0va",oe="Item_deliveryPoint__G9MpC",de="Item_modalButtons__Jk+ca",me="Item_descriptionBlock__ktVYh",ue="Item_descriptionContainer__KIGGt",_e="Item_leftDescription__p1kVj",he="Item_rightDescription__8CcDe",xe="Item_infoContainer__Xm9DO",je="Item_infoPoint__u6qwi",ge="Item_descText__pUXjN",pe="Item_fullDescText__8N2Yj",ve="Item_hidingBlock__LufYo",fe="Item_same__WCsc3",be="Item_viewed__iq5S5",ye="Item_comments__ZUcrU",Ne="Item_commentsHeader__3Wlxy",Ie="Item_reviews__ve56A",Ce="Item_emptyReview__u8kl-",ke="Item_form__QDT9x",we="Item_sliderHorizontal__lr3NL",Ze="Item_loadMoreButt__XDXAa",Se=a(519),Te=a(1134),Le=a(3168),Pe=a(8297),Ae=a(6987),Be=a(5726),Me="CommentForm_main__xLV9C",Fe="CommentForm_review__H-XQa",ze="CommentForm_rating__8hMG6",Ve="CommentForm_container__JghgI",Ee="CommentForm_submit__u7CZO",Oe="CommentForm_auth__sdMlA",De="CommentForm_commentBut__EG6dT",He=(0,l.$j)((function(e){return{isAuth:e.user.isAuth,user:e.user.user,currentItem:e.items.currentItem}}),{addComment:u.Ir,setIsOpenLogin:Pe.Ze,getComments:u.li})((function(e){var t=e.isAuth,a=e.user,s=e.currentItem,n=e.addComment,l=e.setIsOpenLogin,c=e.getComments,o=(0,Le.$)().t,d=(0,Te.cI)(),m=d.handleSubmit,u=d.control,_=d.reset,h=(0,r.useState)(!1),x=(0,i.Z)(h,2),j=x[0],p=x[1],v=(0,r.useState)(80),f=(0,i.Z)(v,2),y=f[0],N=f[1],I=function(){p(!j)};return(0,r.useEffect)((function(){_({text:"",rating:y})}),[]),(0,S.jsx)("div",{className:Me,children:t?(0,S.jsxs)("div",{className:Fe,children:[j&&(0,S.jsx)(Be.Z,{onClose:I,title:o("items.reviews.openFormButt"),children:(0,S.jsxs)("form",{onSubmit:m((function(e){switch(y){case 20:e.rating=1;break;case 40:e.rating=2;break;case 60:e.rating=3;break;case 80:e.rating=4;break;case 100:e.rating=5}e.user_id=a._id,e.item_id=s._id,n(e).then((function(e){e&&c(s._id,1,5)})),p(!1)})),children:[(0,S.jsx)(Te.Qr,{name:"text",control:u,defaultValue:"",rules:{required:o("errors.required")},render:function(e){var t=e.field,a=t.onChange,s=t.value,n=e.fieldState.error;return(0,S.jsx)(Ae.Z,{onChange:a,value:s,error:n,label:"\u0422\u0435\u043a\u0441\u0442...",multiline:!0,rows:4})}}),(0,S.jsxs)("div",{className:Ve,children:[(0,S.jsxs)("div",{className:ze,children:[(0,S.jsxs)("label",{children:[o("items.reviews.ratingLabel"),":"]}),(0,S.jsx)(b.i,{ratingValue:y,onClick:function(e){return N(e)},size:"22px"})]}),(0,S.jsx)(g.Z,{className:Ee,type:"submit",children:o("items.reviews.submit")})]})]})}),(0,S.jsx)(g.Z,{className:De,onClick:I,children:o("items.reviews.openFormButt")})]}):(0,S.jsxs)("div",{className:Oe,children:[(0,S.jsx)("p",{children:o("auth.authText")}),(0,S.jsx)("button",{onClick:function(){return l(!0)},children:o("auth.enter")})]})})})),We="Comment_main__D9+kK",$e="Comment_header__zMLzx",Re="Comment_info__UZjwg",Xe="Comment_date__qMhpl",qe="Comment_textContainer__p9hP6",Ge=a(2426),Ue=a.n(Ge),Qe=function(e){var t=e.item,a=20*t.rating;return(0,S.jsxs)("div",{className:We,children:[(0,S.jsxs)("div",{className:$e,children:[(0,S.jsxs)("div",{className:Re,children:[(0,S.jsx)("p",{children:t.user_id.first_name?t.user_id.first_name:t.user_id.email}),(0,S.jsx)(b.i,{size:"22px",allowHalfIcon:!0,readonly:!0,ratingValue:a})]}),(0,S.jsx)("p",{className:Xe,children:Ue()(t.created_at).format("DD/MM/YYYY H:mm")})]}),(0,S.jsx)("div",{className:qe,children:t.text.split("\n").map((function(e){return(0,S.jsx)("p",{children:e},e)}))})]})},Ye=a(5920),Ke="NeedAuthModal_main__BMCYM",Je=(0,l.$j)(null,{setIsOpenLogin:Pe.Ze})((function(e){var t=e.onClose,a=e.setIsOpenLogin,s=(0,Le.$)().t;return(0,S.jsx)(Be.Z,{title:"",onClose:t,children:(0,S.jsxs)("div",{className:Ke,children:[(0,S.jsx)("p",{children:s("modals.auth.needAuth")}),(0,S.jsxs)("button",{onClick:function(){a(!0),t()},children:[s("modals.auth.action"),"."]})]})})})),et=a(4942),tt=a(9124),at=a(3896),st=a(5229),nt=a(8820),it=a(1969),rt="Content_tabs__5KXtk",lt="Content_tab__olPRg",ct="Content_activeTab__NGIAI",ot="Content_body__Vy8UP",dt="Content_type__IbkdU",mt="Content_status__aW1Hg",ut="Content_content__lph5B",_t="Content_dropdown__6wKOW",ht="Content_viewSymbol__TUTLc",xt="Content_checkTwo__Q0aPg",jt=a(7945),gt=a.n(jt),pt=(a(4655),a(3504)),vt=function(e){var t=(0,r.useState)(!1),a=(0,i.Z)(t,2),s=(a[0],a[1],(0,r.useState)(!1)),n=(0,i.Z)(s,2),l=n[0],c=n[1];(0,r.useEffect)((function(){gt().init({duration:1e3})}),[]);var o=(0,r.useState)("garant"),d=(0,i.Z)(o,2),m=d[0],u=d[1],_=(0,Le.$)().t;return(0,S.jsxs)("div",{className:ot,children:[(0,S.jsxs)("div",{className:rt,children:[(0,S.jsx)("span",{className:lt+" "+("garant"===m&&ct),onClick:function(){u("garant")},children:_("modals.payment_guarantee.tabs.guarantee.tab1.header")}),(0,S.jsx)("span",{className:lt+" "+("return"===m&&ct),onClick:function(){u("return")},children:_("modals.payment_guarantee.tabs.guarantee.tab2.header")})]}),"garant"===m&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.one")}),(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.two")}),(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.three")}),(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.four")}),(0,S.jsxs)("ul",{children:[(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.five")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.six")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.seven")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.eight")})]}),(0,S.jsx)("input",{type:"checkbox",className:xt,id:"checkTwo",hidden:!0,onChange:function(){c(!l)}}),(0,S.jsxs)("label",{htmlFor:"checkTwo",children:[(0,S.jsx)("div",{className:_t,children:(0,S.jsxs)("span",{children:[(0,S.jsx)("span",{className:ht,children:l?"-":"+"}),_("modals.payment_guarantee.tabs.guarantee.tab2.header")]})}),(0,S.jsxs)("div",{className:ut,children:[(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.ten")}),(0,S.jsxs)("p",{children:[_("modals.payment_guarantee.tabs.guarantee.tab1.eleven")," ",(0,S.jsx)(pt.OL,{to:"/guarantee_and_refund",children:_("modals.payment_guarantee.tabs.guarantee.tab1.eleven1")})]}),(0,S.jsxs)("p",{children:[_("modals.payment_guarantee.tabs.guarantee.tab1.twelve")," ",(0,S.jsx)(pt.OL,{to:"/guarantee_and_refund",children:_("modals.payment_guarantee.tabs.guarantee.tab1.eleven1")})]}),(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.thirteen")}),(0,S.jsxs)("ul",{children:[(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.fourteen")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.sixteen")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.seventeen")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.eighteen")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab1.nineteen")})]})]})]})]}),"return"===m&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)("p",{children:[_("modals.payment_guarantee.tabs.guarantee.tab2.one")," ",(0,S.jsx)("a",{rel:"noreferrer",href:"http://zakon2.rada.gov.ua/laws/show/1023-12",children:_("modals.payment_guarantee.tabs.guarantee.tab2.one1")}),", ",_("modals.payment_guarantee.tabs.guarantee.tab2.one2")]}),(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab2.two")}),(0,S.jsxs)("ul",{children:[(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab2.three")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab2.four")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab2.five")}),(0,S.jsx)("li",{children:_("modals.payment_guarantee.tabs.guarantee.tab2.six")})]}),(0,S.jsx)("p",{children:_("modals.payment_guarantee.tabs.guarantee.tab2.seven")})]})]})},ft=function(e){var t=(0,Le.$)().t;return(0,S.jsxs)("div",{className:ot,children:[(0,S.jsxs)("div",{className:dt,children:[(0,S.jsx)("h4",{children:t("modals.payment_guarantee.tabs.payment.two")}),(0,S.jsxs)("ul",{children:[(0,S.jsxs)("li",{children:[t("modals.payment_guarantee.tabs.payment.three")," ",(0,S.jsx)(pt.OL,{to:"/contacts",children:t("modals.payment_guarantee.tabs.payment.three1")})]}),(0,S.jsx)("li",{children:t("modals.payment_guarantee.tabs.payment.four")}),(0,S.jsx)("li",{children:t("modals.payment_guarantee.tabs.payment.five")})]})]}),(0,S.jsxs)("div",{className:dt,children:[(0,S.jsx)("h4",{children:t("modals.payment_guarantee.tabs.payment.six")}),(0,S.jsx)("ul",{children:(0,S.jsxs)("li",{children:[t("modals.payment_guarantee.tabs.payment.seven")," ",(0,S.jsx)("a",{rel:"noreferrer",href:"https://www.liqpay.ua/ru",target:"_blank",children:"LiqPay"})," ",t("modals.payment_guarantee.tabs.payment.eight")]})})]}),(0,S.jsxs)("div",{className:mt,children:[(0,S.jsx)("h4",{children:t("modals.payment_guarantee.tabs.payment.nine")}),(0,S.jsxs)("ol",{children:[(0,S.jsx)("li",{children:t("modals.payment_guarantee.tabs.payment.ten")}),(0,S.jsxs)("li",{children:[t("modals.payment_guarantee.tabs.payment.eleven")," ",(0,S.jsx)(pt.OL,{to:"/delivery",children:t("modals.payment_guarantee.tabs.payment.eleven1")}),"."]}),(0,S.jsxs)("li",{children:[t("modals.payment_guarantee.tabs.payment.twelve"),(0,S.jsxs)("ul",{children:[(0,S.jsx)("li",{children:t("modals.payment_guarantee.tabs.payment.thirteen")}),(0,S.jsx)("li",{children:t("modals.payment_guarantee.tabs.payment.fourteen")})]})]})]})]})]})},bt="PaymentGuaranteeModal_window__LpRMr",yt="PaymentGuaranteeModal_header__NmIz4",Nt="PaymentGuaranteeModal_content__PoFs4",It=(0,st.Z)((function(e){var t;return{root:{"& .MuiTab-textColorPrimary":(t={color:"white",textTransform:"initial",fontSize:"16px",fontWeight:"700",fontFamily:"Montserrat"},(0,et.Z)(t,"textTransform","uppercase"),(0,et.Z)(t,"transitionDuration",".3s"),(0,et.Z)(t,"color","rgba(75, 94, 163, .5)"),t),"& .MuiTab-textColorPrimary:last-child":{borderTopRightRadius:"16px"},"& .Mui-selected":{opacity:1,color:"#4B5EA3 !important"},"& .MuiTabs-indicator":{backgroundColor:"#E86589",height:"2px"}}}})),Ct=(0,l.$j)((function(e){return{currentLanguage:e.common.currentLanguage}}),null)((function(e){var t=e.onClose,a=e.modalValue,s=(0,Le.$)().t,n=It(),l=(0,r.useState)(a),c=(0,i.Z)(l,2),o=c[0],d=c[1];return(0,S.jsx)(it.Z,{children:(0,S.jsxs)("div",{className:bt,children:[(0,S.jsxs)("div",{className:yt,children:[(0,S.jsxs)(tt.Z,{value:o,onChange:function(e,t){d(t)},classes:n,children:[(0,S.jsx)(at.Z,{label:s("modals.payment_guarantee.tabs.payment.title")}),(0,S.jsx)(at.Z,{label:s("modals.payment_guarantee.tabs.guarantee.title")})]}),(0,S.jsx)(v.Z,{onClick:t,children:(0,S.jsx)(nt.oHP,{})})]}),(0,S.jsxs)("div",{className:Nt,children:[0===o&&(0,S.jsx)(ft,{}),1===o&&(0,S.jsx)(vt,{})]})]})})})),kt=a(1856),wt=a(1110),Zt=a(1272),St=a(4270),Tt=a(6954),Lt=function(e){var t=e.item,a=e.currentLanguage,s=e.categoriesWithParents,n=e.currentImage,i=e.setCurrentImage,l=e.isFullDesc,c=e.handleFullText,o=e.sameItems,d=e.comments,m=e.totalComments,u=e.discount,_=e.handleLike,h=e.user,x=e.isOpenNeedAuthModal,j=e.handleOpenAuthModal,N=e.isLiked,I=e.addToCart,C=e.setModalValue,k=e.modalValue,Z=e.viewedItems,T=e.siteInfo,L=e.handlePageSize,Te=t.name_ua,Le=s.map((function(e){return{href:"/catalog?pageNumber=1&pageSize=25&searchBy=category&from=asc&searchValue=".concat(e._id),title:e.name_ua}})),Pe=t.description_ua,Ae=20*t.rating,Be=(0,Ye.Q)(t.price),Me=(0,r.useRef)(null);return(0,S.jsxs)(Zt.Z,{className:F,children:[(0,S.jsx)(St.q,{htmlAttributes:{lang:"ua",amp:void 0},title:"".concat((0,f.t)("siteName")," | ").concat(t.name_ua),meta:[{name:"description",content:(0,f.t)("siteDescription")}]}),null!=k&&(0,S.jsx)(Ct,{modalValue:k,onClose:function(){return C(null)}}),x&&(0,S.jsx)(Je,{onClose:j}),(0,S.jsx)(B.Z,{className:z,children:(0,S.jsxs)(A.Z,{className:V,children:[(0,S.jsx)(y.Z,{items:Le,active:Te}),(0,S.jsx)("h2",{className:E,children:"ru"===a?t.name:t.name_ua}),(0,S.jsxs)("div",{className:O,children:[(0,S.jsxs)("div",{className:D,children:[(0,S.jsx)("div",{className:W,children:(0,S.jsxs)(P,{slidesToShow:t.images.length>3?4:t.images.length,vertical:!0,children:[t.images.map((function(e){return(0,S.jsx)("img",{src:e,alt:"item image",className:(0,M.cx)(X,e===n?q:void 0),onClick:function(){return i(e)}},e)})),t.video_link&&(0,S.jsxs)("div",{className:$,onClick:function(){return i(t.video_link)},children:[(0,S.jsx)("div",{className:R}),(0,S.jsx)("iframe",{src:"".concat(t.video_link,"?disablekb=1"),frameborder:"0"})]})]})}),(0,S.jsx)("div",{className:we,children:(0,S.jsxs)(Tt.Z,{slidesToShow:4,responsive:[{breakpoint:862,settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:568,settings:{slidesToShow:t.images.length>5?6:5,slidesToScroll:1}},{breakpoint:400,settings:{slidesToShow:4,slidesToScroll:1}}],children:[t.images.map((function(e){return(0,S.jsx)("img",{src:e,alt:"item image",className:(0,M.cx)(X,e===n?q:void 0),onClick:function(){return i(e)}},e)})),t.video_link&&(0,S.jsxs)("div",{className:$,onClick:function(){return i(t.video_link)},children:[(0,S.jsx)("div",{className:R}),(0,S.jsx)("iframe",{src:"".concat(t.video_link,"?disablekb=1"),frameborder:"0"})]})]})}),(0,S.jsx)(kt.M,{exitBeforeEnter:!0,children:(0,S.jsx)(wt.E.div,{variants:{initial:{opacity:0,transform:"scale(.8)"},animate:{opacity:1,transform:"scale(1)"},exit:{opacity:0,transform:"scale(.5)"}},initial:"initial",animate:"animate",exit:"exit",transition:{duration:.2},className:G,children:n&&n.includes("https://www.youtube.com/embed")?(0,S.jsx)("iframe",{src:"".concat(n,"?disablekb=1"),allow:"fullscreen",frameborder:"0",className:Q}):(0,S.jsx)("img",{src:n,alt:t.name_ua,className:U})},n)})]}),(0,S.jsxs)("div",{className:H,children:[(0,S.jsxs)("div",{className:Y,children:[(0,S.jsx)(b.i,{size:"22px",ratingValue:Ae,allowHalfIcon:!0,readonly:!0}),(0,S.jsxs)("span",{children:[(0,f.t)("items.code")," ",t.code]})]}),(0,S.jsxs)("div",{className:K,children:[t.action&&0===t.action.from_sum_in_bill&&!t.action.from_items_count&&(0,S.jsxs)("p",{className:te,children:[u," \u0433\u0440\u043d."]}),(0,S.jsxs)("p",{className:(0,M.cx)(J,t.action&&0===t.action.from_sum_in_bill&&!t.action.from_items_count?ee:void 0),children:[Be," \u0433\u0440\u043d."]})]}),(0,S.jsxs)("div",{className:ie,children:[(0,S.jsx)(g.Z,{className:ae,onClick:I,disabled:t.count<=0,children:t.count>0?(0,f.t)("actions.buy"):(0,f.t)("items.empty")}),(0,S.jsx)(p.Z,{title:N?(0,f.t)("actions.unlike"):(0,f.t)("actions.like"),children:(0,S.jsx)(v.Z,{onClick:_,className:(0,M.cx)(h&&N?ne:se),children:(0,S.jsx)(w.$aX,{})})})]}),(0,S.jsxs)("div",{className:re,children:[(0,S.jsx)("p",{className:le,children:"\u0414\u041e\u0421\u0422\u0410\u0412\u041a\u0410"}),(0,S.jsxs)("div",{className:ce,children:[(0,S.jsxs)("div",{className:oe,children:[(0,S.jsx)("h4",{children:(0,f.t)("items.delivery.type1.label")}),(0,S.jsxs)("p",{children:[(0,f.t)("items.delivery.type1.value")," ",T&&T[0].courier_delivery," \u0433\u0440\u043d. ",(0,f.t)("items.delivery.type2.value")]})]}),(0,S.jsxs)("div",{className:oe,children:[(0,S.jsx)("h4",{children:(0,f.t)("items.delivery.type2.label")}),(0,S.jsx)("p",{children:(0,f.t)("items.delivery.type2.value")})]}),(0,S.jsxs)("div",{className:oe,children:[(0,S.jsx)("h4",{children:(0,f.t)("items.delivery.type3.label")}),(0,S.jsxs)("p",{children:[(0,f.t)("items.delivery.type3.value")," ",T&&T[0].office_delivery," \u0433\u0440\u043d. ",(0,f.t)("items.delivery.type2.value")]})]})]})]}),(0,S.jsxs)("div",{className:de,children:[(0,S.jsx)("button",{onClick:function(){return C(0)},children:"\u041e\u041f\u041b\u0410\u0422\u0410"}),(0,S.jsx)("button",{onClick:function(){return C(1)},children:(0,f.t)("navigation.footer.guarantee")})]})]})]})]})}),(0,S.jsx)(B.Z,{className:me,children:(0,S.jsxs)(A.Z,{className:ue,children:[(0,S.jsxs)("div",{className:_e,children:[(0,S.jsx)("h4",{children:(0,f.t)("items.description")}),(0,S.jsx)("div",{ref:Me,className:(0,M.cx)(ge,l?pe:void 0),children:Pe.length>0?Pe.split("\n").map((function(e){return(0,S.jsx)("p",{children:e},e)})):(0,S.jsx)("p",{children:(0,f.t)("items.emptyDesc")})}),!l&&t.description_ua.length>150&&(0,S.jsx)("div",{className:ve}),Me&&Me.current&&Pe.length>0&&Me.current.clientHeight>80&&(0,S.jsx)("button",{onClick:c,children:l?(0,f.t)("items.hide"):(0,f.t)("items.details")})]}),(0,S.jsxs)("div",{className:he,children:[(0,S.jsx)("h4",{children:"\u0425\u0410\u0420\u0410\u041a\u0422\u0415\u0420\u0418\u0421\u0422\u0418\u041a\u0418"}),(0,S.jsxs)("div",{className:xe,children:[t.country_ua&&(0,S.jsxs)("div",{className:je,children:[(0,S.jsx)("p",{children:(0,f.t)("items.info.country")}),(0,S.jsx)("p",{children:t.country_ua})]}),(0,S.jsxs)("div",{className:je,children:[(0,S.jsx)("p",{children:(0,f.t)("items.info.age")}),(0,S.jsxs)("p",{children:[t.min_age," - ",t.max_age," ","\u0440\u043e\u043a\u0438"]})]}),(0,S.jsxs)("div",{className:je,children:[(0,S.jsx)("p",{children:(0,f.t)("items.info.gender")}),(0,S.jsxs)("p",{children:["all"===t.gender&&"\u0414\u043b\u044f \u0432\u0441\u0456\u0445","male"===t.gender&&"\u0414\u043b\u044f \u0445\u043b\u043e\u043f\u0447\u0438\u043a\u0456\u0432","female"===t.gender&&"\u0414\u043b\u044f \u0434\u0456\u0432\u0447\u0430\u0442\u043e\u043a"]})]}),t.material&&(0,S.jsxs)("div",{className:je,children:[(0,S.jsx)("p",{children:(0,f.t)("items.info.material")}),(0,S.jsx)("p",{children:t.material_ua})]}),t.size&&(0,S.jsxs)("div",{className:je,children:[(0,S.jsx)("p",{children:(0,f.t)("items.info.size")}),(0,S.jsxs)("p",{children:[t.size,"\u0441\u043c"]})]})]})]})]})}),(0,S.jsx)(B.Z,{children:(0,S.jsxs)(A.Z,{children:[o.length>0&&(0,S.jsx)("div",{className:fe,children:(0,S.jsx)(Se.Z,{href:"/",title:(0,f.t)("items.sameItemsTitle"),items:o,slidesToShow:5})}),Z.length>0&&(0,S.jsx)("div",{className:be,children:(0,S.jsx)(Se.Z,{title:(0,f.t)("items.viewed"),items:Z,slidesToShow:5})}),(0,S.jsxs)("div",{className:ye,children:[(0,S.jsx)("div",{className:ke,children:(0,S.jsx)(He,{})}),(0,S.jsxs)("div",{className:Ne,children:[(0,S.jsx)("h4",{children:(0,f.t)("items.reviews.title")}),(0,S.jsx)("span",{children:m})]}),(0,S.jsxs)("div",{className:Ie,children:[d.length>0?d.map((function(e){return(0,S.jsx)(Qe,{item:e},e._id)})):(0,S.jsx)("div",{className:Ce,children:(0,S.jsx)("p",{children:(0,f.t)("items.reviews.empty")})}),m>d.length&&(0,S.jsx)(g.Z,{className:Ze,onClick:L,children:"\u0411\u0456\u043b\u044c\u0448\u0435 \u0432\u0456\u0434\u0433\u0443\u043a\u0456\u0432"})]})]})]})})]})},Pt=(0,l.$j)((function(e){return{isFetching:e.common.isFetching,currentItem:e.items.currentItem,currentLanguage:e.common.currentLanguage,categoriesWithParents:e.categories.categoriesWithParents,sameItems:e.items.items,comments:e.comments.comments,totalComments:e.comments.total,newComment:e.comments.newComment,isAuth:e.user.isAuth,user:e.user.user,cartItems:e.cart.items,viewedItems:e.items.viewedItems,siteInfo:e.common.siteInfo}}),{getItem:_.rV,getCategoriesWithParents:m.IL,getSame:_.y,getComments:u.li,updateProfile:h.ck,setCartItems:d.w0,setAddToCartResult:d.hx,setViewedItems:_.M$,setEmptyCommentsData:u.BY})((function(e){var t=e.currentItem,a=e.isFetching,l=e.getItem,d=e.currentLanguage,m=e.getCategoriesWithParents,u=e.categoriesWithParents,_=e.getSame,h=e.sameItems,g=e.getComments,p=e.comments,v=e.totalComments,f=e.isAuth,b=e.user,y=e.updateProfile,N=e.setCartItems,I=e.cartItems,C=e.setAddToCartResult,k=e.setViewedItems,w=e.viewedItems,Z=e.siteInfo,T=e.setEmptyCommentsData,L=(0,c.UO)().name,P=(0,r.useState)(null),A=(0,i.Z)(P,2),B=A[0],M=A[1],F=(0,r.useState)(!1),z=(0,i.Z)(F,2),V=z[0],E=z[1],O=(0,r.useState)(5),D=(0,i.Z)(O,2),H=D[0],W=D[1],$=(0,r.useState)(0),R=(0,i.Z)($,2),X=R[0],q=(R[1],(0,r.useState)(null)),G=(0,i.Z)(q,2),U=G[0],Q=G[1],Y=(0,r.useState)(!1),K=(0,i.Z)(Y,2),J=K[0],ee=K[1],te=(0,r.useState)(!1),ae=(0,i.Z)(te,2),se=ae[0],ne=ae[1],ie=(0,r.useState)(null),re=(0,i.Z)(ie,2),le=re[0],ce=re[1];return(0,r.useEffect)((function(){T([]),l(L)}),[L]),(0,r.useEffect)((function(){if(t&&t.action&&Q((0,x.a)(t.price,t.action.discount)),t&&b&&b.liked_items){var e=[],a=(0,s.Z)({},b);a.liked_items&&a.liked_items.forEach((function(t){e.push(t._id)}));var n=!1;e.length>0&&(e.forEach((function(e){e===t._id&&(n=!0,ne(!0))})),n||ne(!1))}else ne(!1)}),[t,b]),(0,r.useEffect)((function(){if(t&&t.category&&m(t.category._id),t&&t.tags&&_(t.tags,t._id),t&&M(t.images[0]),t){var e=(0,n.Z)(w),a=!1;e.forEach((function(e){e._id===t._id&&(a=!0)})),a||(15===e.length&&e.splice(0,1),e.push(t)),k(e)}}),[t]),(0,r.useEffect)((function(){return function(){return T([])}}),[]),(0,r.useEffect)((function(){t&&g(t._id,X+1,H)}),[t,H]),t||a?(0,S.jsxs)(S.Fragment,{children:[a&&(0,S.jsx)(o.Z,{}),t&&(0,S.jsx)(Lt,{item:t,currentLanguage:d,categoriesWithParents:u,currentImage:B,setCurrentImage:M,isFullDesc:V,handleFullText:function(){E(!V)},sameItems:h,comments:p,totalComments:v,discount:U,handleLike:function(){if(f){var e=[],a=(0,s.Z)({},b);b.liked_items&&b.liked_items.forEach((function(t){e.push(t._id)})),se?e.forEach((function(s,n){s===t._id&&(e.splice(n,1),a.liked_items=e,y(b._id,a),ne(!1))})):(e.push(t._id),a.liked_items=e,y(b._id,a),ne(!0))}else ee(!0)},user:b,isLiked:se,isOpenNeedAuthModal:J,handleOpenAuthModal:function(){ee(!J)},addToCart:function(){var e=(0,n.Z)(I),a=!1,s=null;e.forEach((function(e,n){e.item._id===t._id&&(e.count+1<=t.count&&(e.count+=1),a=!0,s=n)})),a||e.push({item:t,count:1}),N(e),C(e[s||e.length-1])},modalValue:le,setModalValue:ce,viewedItems:w,siteInfo:Z,handlePageSize:function(){W(H+H)}})]}):(0,S.jsx)(j.default,{})}))},5369:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});a(2791);var s="NotFound_container__nL+3x",n=a(6789),i=a(6078),r=a(1469),l=a(3168),c=a(3504),o=a(4270),d=(a(7945),a(4655),a(184)),m=function(){var e=(0,l.$)().t;return(0,d.jsx)(i.Z,{children:(0,d.jsxs)(r.Z,{className:s,children:[(0,d.jsx)(o.q,{htmlAttributes:{lang:"ua",amp:void 0},title:"".concat(e("siteName")," | ").concat(e("notFound.title")),meta:[{name:"description",content:e("siteDescription")}]}),(0,d.jsxs)("h4",{"data-aos":"fade-down","data-aos-duration":"500",children:[e("notFound.title"),"..."]}),(0,d.jsx)(c.OL,{to:"/",children:e("notFound.link")}),(0,d.jsx)("img",{src:n,alt:"not found","data-aos":"zoom-in","data-aos-duration":"700"})]})})}},6789:function(e,t,a){e.exports=a.p+"static/media/error404.09f8f61a59f7e3cc07a4.png"}}]);
//# sourceMappingURL=75.f15a7084.chunk.js.map