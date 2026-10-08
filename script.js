(function(){
  // Mobile menu
  var t=document.querySelector('.nav__toggle'),l=document.querySelector('.nav__links');
  if(t&&l){t.addEventListener('click',function(){var o=l.classList.toggle('open');t.setAttribute('aria-expanded',o)});
  l.addEventListener('click',function(){l.classList.remove('open');t.setAttribute('aria-expanded',false)})}

  // 52 weekends of 2027 (Saturday starts)
  var g=document.getElementById('grid52'),cap=document.getElementById('grid52Cap');
  var fmt=function(d){return d.toLocaleDateString('en-GB',{day:'numeric',month:'long'})};
  var d=new Date(2027,0,2),n=1;
  while(g&&d.getFullYear()===2027&&n<=52){
    var sun=new Date(d);sun.setDate(d.getDate()+1);
    var b=document.createElement('button');
    b.textContent=n;
    b.setAttribute('aria-label','Weekend '+n+', '+fmt(d)+' and '+fmt(sun));
    b.dataset.t='Weekend '+n+'  ·  '+fmt(d)+' & '+fmt(sun);
    g.appendChild(b);
    d.setDate(d.getDate()+7);n++;
  }
  var show=function(e){if(e.target.dataset&&e.target.dataset.t)cap.textContent=e.target.dataset.t};
  if(g){g.addEventListener('mouseover',show);g.addEventListener('focusin',show)}

  // Product slider
  // Bound calendar: wire-O loops and flipping pages
  var wires=document.getElementById('wires');
  if(wires){var N=22;for(var q=0;q<N;q++){var x=(q+.5)*(100/N)+'%';
    var hl=document.createElement('i');hl.className='cal__hole';hl.style.left=x;wires.appendChild(hl);
    var lp=document.createElement('i');lp.className='cal__loop';lp.style.left=x;wires.appendChild(lp)}}
  var arts=document.querySelectorAll('.product__art'),dots=document.querySelectorAll('#dots button'),cur=0;
  function go(i){cur=i;arts.forEach(function(a,k){a.classList.toggle('is-flipped',k<i)});dots.forEach(function(b,k){b.classList.toggle('is-on',k===i)})}
  dots.forEach(function(b,i){b.addEventListener('click',function(){go(i)})});
  var slide=document.getElementById('slide');
  if(slide)slide.addEventListener('click',function(){go((cur+1)%arts.length)});
  if(arts.length>1)setInterval(function(){go((cur+1)%arts.length)},4500);

  // Shop gallery thumbs
  document.querySelectorAll('.item__thumbs').forEach(function(w){
    var m=document.getElementById(w.dataset.main);
    w.addEventListener('click',function(e){var b=e.target.closest('.thumb');if(!b||!m)return;
      m.src=b.dataset.src;w.querySelectorAll('.thumb').forEach(function(t){t.classList.toggle('is-on',t===b)})});
  });

  // Shopify Buy Button (seasonal calendar)
  var buyNode=document.getElementById('buy-seasonal');
  if(buyNode){
    var ld=function(){
      if(window.ShopifyBuy&&window.ShopifyBuy.UI)return init();
      var sc=document.createElement('script');sc.async=true;
      sc.src='https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      sc.onload=init;document.head.appendChild(sc);
    };
    var init=function(){
      var client=ShopifyBuy.buildClient({domain:'x35x1q-0s.myshopify.com',storefrontAccessToken:'03281bcfad170191d337fb99460cd800'});
      var btn={'font-family':'Jost, sans-serif','font-size':'11px','letter-spacing':'.28em','text-transform':'uppercase','padding':'17px 34px','border-radius':'0','background-color':'#7a1f3d',':hover':{'background-color':'#6e1c37'},':focus':{'background-color':'#6e1c37'}};
      ShopifyBuy.UI.onReady(client).then(function(ui){
        window.__wcUI=ui;
        ui.createComponent('product',{
          id:'11297317355847',node:buyNode,
          moneyFormat:'%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options:{
            product:{iframe:false,contents:{img:false,title:false,price:true,button:true},
              styles:{product:{'@media (min-width: 601px)':{'max-width':'100%','margin-left':'0','margin-bottom':'0'},'margin-left':'0','margin-bottom':'0','max-width':'100%'},
                button:btn,price:{'font-family':'Cormorant Garamond, serif','font-size':'30px','font-weight':'400','color':'#14161c'}},
              text:{button:'Add to cart'}},
            cart:{styles:{button:btn},text:{total:'Subtotal',button:'Checkout'}},
            toggle:{styles:{toggle:{'background-color':'#7a1f3d',':hover':{'background-color':'#6e1c37'},':focus':{'background-color':'#6e1c37'}}}}
          }
        });
      });
    };
    ld();
  }
  // Nav cart opens the Shopify cart when it is available
  var navCart=document.querySelector('a.cart');
  if(navCart)navCart.addEventListener('click',function(e){if(window.__wcUI){e.preventDefault();window.__wcUI.openCart()}});

  // Cart (placeholder counter; swap for Shopify/Stripe checkout)
  var c=0;try{c=+localStorage.getItem('wc_cart')||0}catch(e){}
  var cc=document.getElementById('cartCount');if(cc)cc.textContent=c;
  var add=document.getElementById('addToCart');
  if(add)add.addEventListener('click',function(){
    c++;cc.textContent=c;try{localStorage.setItem('wc_cart',c)}catch(e){}
    this.textContent='Added';var s=this;setTimeout(function(){s.textContent='Add to cart'},1400);
  });

  // Scroll reveal
  var els=document.querySelectorAll('.block>*:not(.label),.hero__stage,.hero__title,.hero__sub,.tabs');
  els.forEach(function(e){e.classList.add('rv')});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
    els.forEach(function(e){io.observe(e)});
  }else els.forEach(function(e){e.classList.add('in')});
})();
