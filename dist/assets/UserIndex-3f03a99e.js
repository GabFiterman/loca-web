import{_ as c,o as a,c as n,a as e,b as i,t as r,j as u,u as d}from"./index-ad6e9f44.js";const _={key:0,class:"container-fluid UserIndex"},h={class:"row no-wrap"},g={key:0,class:"col"},m=["src"],p={class:"col-1"},v={key:0,class:"UserIndex__menu"},U={class:"container UserIndex__dashboard"},f={class:"row"},w={class:"col"},b={class:"secondaryTitle bold"},y={class:"row"},I={class:"col"},M={key:0,class:"row mt-2"},L={class:"col"},k=["src"],D={class:"row mt-4"},x={class:"col"},C=["innerHTML"],O={name:"UserIndex",mixins:[u],data(){return{username:this.$route.params.username,showUserMenu:!1}},methods:{toggleUserMenu(){this.showUserMenu=!this.showUserMenu},handleLogOff(){const t=d();t.isUserLogged&&t.setUserLogin(!1),this.$router.push("/login")}},computed:{isUserLogged(){return d().isUserLogged},avatarInitial(){return this.username[0].toUpperCase()}}},P=Object.assign(O,{setup(t){return(s,o)=>s.textData?(a(),n("main",_,[e("div",h,[s.logoFile?(a(),n("div",g,[e("img",{src:`/img/${s.logoFile}`,alt:"",class:"logo--default"},null,8,m)])):i("",!0),e("div",p,[e("p",{class:"UserIndex__avatar",onClick:o[0]||(o[0]=(...l)=>s.toggleUserMenu&&s.toggleUserMenu(...l))},r(s.avatarInitial),1),s.showUserMenu?(a(),n("div",v,[e("p",{onClick:o[1]||(o[1]=(...l)=>s.handleLogOff&&s.handleLogOff(...l))},"Sair")])):i("",!0)])]),e("div",U,[e("div",f,[e("div",w,[e("h2",b,r(s.textData.InitialPage.title)+" "+r(s.username),1)])]),e("div",y,[e("div",I,[e("p",null,r(s.textData.InitialPage.subtitle),1)])]),s.textData?(a(),n("div",M,[e("div",L,[e("iframe",{class:"youtubeVideo",src:`https://www.youtube.com/embed/${s.textData.InitialPage.mainResource.src}`,title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:""},null,8,k)])])):i("",!0),e("div",D,[e("div",x,[e("div",{innerHTML:s.textData.InitialPage.contactUs},null,8,C)])])])])):i("",!0)}}),$=c(P,[["__scopeId","data-v-9eabc16b"]]);export{$ as default};
