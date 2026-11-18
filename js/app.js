/* Carrinho, renderização do cardápio, formulário e envio pelo WhatsApp.
   Depende de js/menu.js e js/burger-art.js (carregados antes). */

const brl=v=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const $=id=>document.getElementById(id);
let cart={};
try{cart=JSON.parse(localStorage.getItem("wb-cart")||"{}")||{}}catch(e){cart={}}
function save(){try{localStorage.setItem("wb-cart",JSON.stringify(cart))}catch(e){}}
/* Chaves do carrinho: hambúrguer "id|tamanho|adicional,adicional"; bebida "id" ou "id|sabor". */
function itemInfo(k){const [id,a,b]=k.split("|");const m=MENU.find(x=>x.id===id);if(!m)return null;
  if(m.p!==undefined){if(!m.p)return null;const size=Number(a);if(!(size in m.p))return null;
    const ex=(b?b.split(","):[]).map(e=>EXTRAS.find(x=>x.id===e));if(ex.some(e=>!e))return null;
    let label=m.name+(m.single?"":" "+SIZES[size].toLowerCase());if(ex.length)label+=" + "+ex.map(e=>e.name).join(", ");
    return {m,label,price:m.p[size]+ex.reduce((t,e)=>t+e.price,0)}}
  if(m.flavors){const f=m.flavors[Number(a)];if(!f)return null;return {m,label:`${m.name} (${f})`,price:m.price}}
  return {m,label:m.name,price:m.price}}
function add(k,btn){cart[k]=(cart[k]||0)+1;save();update();
  if(btn){const t=btn.textContent;btn.classList.add("done");btn.textContent="Adicionado";setTimeout(()=>{btn.classList.remove("done");btn.textContent=t},900)}
  toast(itemInfo(k).label+" no carrinho")}

/* janela de adicionais, aberta ao adicionar um hambúrguer */
let pending=null;
function openExtras(m,size,btn){
  pending={m,size,btn};
  $("exTitle").textContent=m.name+(m.single?"":" "+SIZES[size].toLowerCase());
  $("exList").innerHTML=EXTRAS.map(e=>`<label class="ex"><input type="checkbox" value="${e.id}"><span>${e.name}</span><b>+ ${brl(e.price)}</b></label>`).join("");
  exTotal();$("extras").hidden=false;$("scrim").hidden=false;document.body.style.overflow="hidden";$("exOk").focus()}
function chosenExtras(){return [...$("exList").querySelectorAll("input:checked")].map(i=>i.value)}
function exTotal(){if(!pending)return;const t=pending.m.p[pending.size]+chosenExtras().reduce((s,id)=>s+EXTRAS.find(e=>e.id===id).price,0);
  $("exOk").textContent=`Adicionar ao carrinho · ${brl(t)}`}
function closeExtras(){$("extras").hidden=true;pending=null;if($("sheet").hidden){$("scrim").hidden=true;document.body.style.overflow=""}}
$("exList").addEventListener("change",exTotal);
$("exOk").onclick=()=>{const {m,size,btn}=pending;const ex=chosenExtras();closeExtras();add(m.id+"|"+size+(ex.length?"|"+ex.join(","):""),btn)};
$("exCancel").onclick=closeExtras;$("exClose").onclick=closeExtras;

function render(){
  MENU.forEach(m=>{
    if(m.p!==undefined){
      const el=document.createElement("article");el.className="burger";
      let size=0;
      const sizes=m.p&&!m.single;
      el.innerHTML=`<div class="art"></div><div class="info"><h3>${m.name}<span class="num">nº ${m.n}</span></h3><p>${m.desc}</p>
        ${sizes?`<div class="size-pick" role="group" aria-label="Tamanho do ${m.name}">${SIZES.map((s,i)=>`<button type="button" aria-pressed="${i===0}">${s}</button>`).join("")}</div>`:""}
        ${m.p?`<button class="add" type="button"></button>`:`<p class="ask">Valor sob consulta pelo WhatsApp</p>`}</div>`;
      const art=el.querySelector(".art"),addBtn=el.querySelector(".add"),picks=[...el.querySelectorAll(".size-pick button")];
      const paint=(anim)=>{art.innerHTML=burgerSVG(m,size);if(anim)art.firstChild.classList.add("grow");
        if(addBtn){addBtn.textContent=`Adicionar · ${brl(m.p[size])}`;addBtn.setAttribute("aria-label",`Adicionar ${m.name}${m.single?"":" "+SIZES[size].toLowerCase()}, ${brl(m.p[size])}`)}
        picks.forEach((b,i)=>b.setAttribute("aria-pressed",i===size))};
      picks.forEach((b,i)=>b.onclick=()=>{if(size!==i){size=i;paint(true)}});
      if(addBtn)addBtn.onclick=()=>openExtras(m,size,addBtn);
      paint(false);
      $(m.cat==="art"?"g-art":"g-esp").appendChild(el);
    }else{
      const r=document.createElement("div");r.className="row";let f=0;
      const many=m.flavors&&m.flavors.length>1;
      r.innerHTML=`<div><strong>${m.name}</strong>${m.flavors&&!many?`<small>${m.flavors[0]}</small>`:""}
        ${many?`<div class="flavors" role="group" aria-label="Sabor do ${m.name}">${m.flavors.map((s,i)=>`<button type="button" aria-pressed="${i===0}">${s}</button>`).join("")}</div>`:""}</div>
        <button class="add" type="button" aria-label="Adicionar ${m.name}, ${brl(m.price)}">+ ${brl(m.price)}</button>`;
      const fl=[...r.querySelectorAll(".flavors button")];
      fl.forEach((b,i)=>b.onclick=()=>{f=i;fl.forEach((x,j)=>x.setAttribute("aria-pressed",j===f))});
      const b=r.querySelector(".add");b.onclick=()=>add(m.flavors?m.id+"|"+f:m.id,b);
      $("g-beb").appendChild(r);
    }
  });
  EXTRAS.forEach(e=>{const r=document.createElement("div");r.className="row";
    r.innerHTML=`<div><strong>${e.name}</strong></div><span class="price">${brl(e.price)}</span>`;$("g-adi").appendChild(r)});
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
$("cartTop").onclick=openSheet;$("barBtn").onclick=openSheet;$("close").onclick=closeSheet;
$("scrim").onclick=()=>{if(!$("extras").hidden)closeExtras();else closeSheet()};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if(!$("extras").hidden)closeExtras();else closeSheet()}});
const tabs=[...document.querySelectorAll("#tabs a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)tabs.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-35% 0px -60% 0px"});
document.querySelectorAll("section.cat").forEach(s=>io.observe(s));
render();update();
