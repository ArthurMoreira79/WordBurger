/* Carrinho, renderização do cardápio, formulário e envio pelo WhatsApp.
   Depende de js/menu.js e js/burger-art.js (carregados antes). */

const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $=id=>document.getElementById(id);
let cart={};
try{cart=JSON.parse(localStorage.getItem("wb-cart")||"{}")||{}}catch(e){cart={}}
function save(){try{localStorage.setItem("wb-cart",JSON.stringify(cart))}catch(e){}}
function itemInfo(k){const [id,s]=k.split("|");const m=MENU.find(x=>x.id===id);if(!m)return null;
  const size=s!=null?Number(s):null;return {m,size,label:m.name+(size!=null?" "+SIZES[size].toLowerCase():""),price:size!=null?m.p[size]:m.price}}
function add(k,btn){cart[k]=(cart[k]||0)+1;save();update();
  if(btn){const t=btn.textContent;btn.classList.add("done");btn.textContent="Adicionado";setTimeout(()=>{btn.classList.remove("done");btn.textContent=t},900)}
  toast(itemInfo(k).label+" no carrinho")}

function render(){
  MENU.forEach(m=>{
    if(m.p){
      const el=document.createElement("article");el.className="burger";
      let size=0;
      el.innerHTML=`<div class="art"></div><div class="info"><h3>${m.name}<span class="num">nº ${m.n}</span></h3><p>${m.desc}</p>
        <div class="size-pick" role="group" aria-label="Tamanho do ${m.name}">${SIZES.map((s,i)=>`<button type="button" aria-pressed="${i===0}">${s}</button>`).join("")}</div>
        <button class="add" type="button"></button></div>`;
      const art=el.querySelector(".art"),addBtn=el.querySelector(".add"),picks=[...el.querySelectorAll(".size-pick button")];
      const paint=(anim)=>{art.innerHTML=burgerSVG(m,size);if(anim)art.firstChild.classList.add("grow");
        addBtn.textContent=`Adicionar · ${brl(m.p[size])}`;addBtn.setAttribute("aria-label",`Adicionar ${m.name} ${SIZES[size].toLowerCase()}, ${brl(m.p[size])}`);
        picks.forEach((b,i)=>b.setAttribute("aria-pressed",i===size))};
      picks.forEach((b,i)=>b.onclick=()=>{if(size!==i){size=i;paint(true)}});
      addBtn.onclick=()=>add(m.id+"|"+size,addBtn);
      paint(false);
      $(m.cat==="art"?"g-art":"g-esp").appendChild(el);
    }else{
      const r=document.createElement("div");r.className="row";
      r.innerHTML=`<div><strong>${m.name}</strong><small>${m.desc}</small></div><button class="add" type="button" aria-label="Adicionar ${m.name}, ${brl(m.price)}">+ ${brl(m.price)}</button>`;
      const b=r.querySelector("button");b.onclick=()=>add(m.id);
      $(m.cat==="por"?"g-por":"g-beb").appendChild(r);
    }
  });
}

function totals(){let n=0,t=0;for(const k in cart){const i=itemInfo(k);if(!i){delete cart[k];continue}n+=cart[k];t+=cart[k]*i.price}return {n,t}}
function update(){
  const {n,t}=totals();
  $("cartCount").textContent=n;$("bar").hidden=n===0;
  $("barTxt").textContent=n===1?"Ver carrinho (1 item)":`Ver carrinho (${n} itens)`;
  $("barTot").textContent=brl(t);$("total").textContent=brl(t);
  const Ls=$("lines");Ls.innerHTML="";
  const keys=Object.keys(cart);
  if(!keys.length)Ls.innerHTML=`<p class="empty">Seu carrinho está vazio. Escolha um lanche no cardápio.</p>`;
  keys.forEach(k=>{const i=itemInfo(k),q=cart[k];
    const row=document.createElement("div");row.className="line";
    row.innerHTML=`<div class="nm">${i.label}<small>${brl(i.price)} cada</small></div><div class="pr">${brl(i.price*q)}</div>
      <div class="qty"><button type="button" aria-label="Tirar um ${i.label}">−</button><output>${q}</output><button type="button" aria-label="Pôr mais um ${i.label}">+</button></div>`;
    const [mi,pl]=row.querySelectorAll("button");
    mi.onclick=()=>{cart[k]--;if(cart[k]<=0)delete cart[k];save();update()};
    pl.onclick=()=>{cart[k]++;save();update()};
    Ls.appendChild(row)});
  refreshLink();
}
function modo(){return document.querySelector('input[name="modo"]:checked').value}
function message(){
  const {t}=totals();
  const lines=Object.keys(cart).map(k=>{const i=itemInfo(k);return `• ${cart[k]}x ${i.label} — ${brl(i.price*cart[k])}`});
  const nome=$("nome").value.trim(),end=$("end").value.trim(),pag=$("pag").value,troco=$("troco").value.trim(),obs=$("obs").value.trim();
  let s=`*Novo pedido — Wordburguer Lanches* 🍔\n\n${lines.join("\n")}\n\n*Total dos itens:* ${brl(t)}\n\n*Nome:* ${nome}\n*${modo()==="Entrega"?"Entrega":"Retirada no local"}*`;
  if(modo()==="Entrega")s+=`\n*Endereço:* ${end}`;
  s+=`\n*Pagamento:* ${pag}`;if(pag==="Dinheiro"&&troco)s+=` (troco para R$ ${troco})`;
  if(obs)s+=`\n*Obs.:* ${obs}`;
  if(modo()==="Entrega")s+=`\n\n_Taxa de entrega a combinar._`;
  return s;
}
function problems(){
  if(!Object.keys(cart).length)return "Adicione pelo menos um item para enviar.";
  if(!$("nome").value.trim())return "Preencha seu nome para enviar.";
  if(modo()==="Entrega"&&!$("end").value.trim())return "Preencha o endereço de entrega para enviar.";
  return "";
}
function refreshLink(){
  const p=problems(),a=$("send");
  $("endWrap").hidden=modo()!=="Entrega";$("trocoWrap").hidden=$("pag").value!=="Dinheiro";
  if(p){a.setAttribute("aria-disabled","true");a.href="#";$("err").textContent=p;$("err").hidden=false}
  else{a.setAttribute("aria-disabled","false");a.href=`https://wa.me/${PHONE}?text=${encodeURIComponent(message())}`;$("err").hidden=true}
}
$("form").addEventListener("input",refreshLink);$("form").addEventListener("change",refreshLink);
$("form").addEventListener("submit",e=>e.preventDefault());
$("copy").onclick=()=>{const txt=message();const ok=()=>toast("Pedido copiado. Cole no WhatsApp da loja.");
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok).catch(()=>fallback(txt));else fallback(txt)};
function fallback(txt){const ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast("Pedido copiado.")}catch(e){toast("Selecione e copie o texto.")}ta.remove()}
let tt;function toast(m){const t=$("toast");t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,1800)}
function openSheet(){$("sheet").hidden=false;$("scrim").hidden=false;document.body.style.overflow="hidden";$("close").focus()}
function closeSheet(){$("sheet").hidden=true;$("scrim").hidden=true;document.body.style.overflow=""}
$("cartTop").onclick=openSheet;$("barBtn").onclick=openSheet;$("close").onclick=closeSheet;$("scrim").onclick=closeSheet;
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSheet()});
const tabs=[...document.querySelectorAll("#tabs a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)tabs.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -60% 0px"});
document.querySelectorAll("section.cat").forEach(s=>io.observe(s));
render();update();
