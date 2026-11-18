/* Desenho dos hambúrgueres em SVG (largura 200), montado camada por camada. */

function drips(color,y,xs,len){return xs.map((x,i)=>{const l=len*(.6+((i*37)%10)/14);return `<path d="M${x-5} ${y} Q${x-5} ${y+l} ${x} ${y+l+3} Q${x+5} ${y+l} ${x+5} ${y} Z" fill="${color}"/>`}).join("")}
function wave(y,amp,step,x0,x1){let d=`M${x0} ${y}`;let up=true;for(let x=x0;x<x1;x+=step){d+=` Q${x+step/2} ${y+(up?-amp:amp)} ${x+step} ${y}`;up=!up}return d}
const L={
 topBun:{h:64,svg:()=>`<path d="M12 64 Q10 6 100 4 Q190 6 188 64 Z" fill="url(#g-bun)"/>
   <path d="M40 22 Q70 10 112 12" stroke="#ffd29a" stroke-opacity=".45" stroke-width="6" fill="none" stroke-linecap="round"/>
   ${[[60,24],[84,16],[108,18],[132,22],[72,38],[98,32],[124,36],[150,34],[50,44],[146,48],[110,48],[84,50]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.8" transform="rotate(${(i*29)%50-25} ${x} ${y})" fill="#fff3d6"/>`).join("")}`},
 patty:{h:22,svg:()=>`<rect x="10" y="0" width="180" height="22" rx="11" fill="url(#g-meat)"/>
   ${[24,46,70,92,118,140,164].map((x,i)=>`<circle cx="${x}" cy="${8+(i%3)*3}" r="1.8" fill="#24100a"/>`).join("")}
   <path d="M22 4 H178" stroke="#8c4a26" stroke-width="2" stroke-linecap="round" opacity=".7"/>`},
 bottomBun:{h:26,svg:()=>`<path d="M14 0 H186 Q190 24 168 26 H32 Q10 24 14 0 Z" fill="url(#g-bunb)"/><rect x="14" y="0" width="172" height="5" fill="#f3d5a0" opacity=".55"/>`},
 cheddar:{h:7,svg:()=>`<rect x="12" y="0" width="176" height="8" rx="4" fill="#f59a1b"/>${drips("#f59a1b",5,[30,64,104,140,170],9)}`},
 cheese:{h:6,svg:()=>`<rect x="16" y="0" width="168" height="6" fill="#f7c533"/><path d="M16 4 L8 16 L28 6 Z M184 4 L192 16 L172 6 Z M96 5 L100 15 L106 5 Z" fill="#f7c533"/>`},
 mozz:{h:6,svg:()=>`<rect x="14" y="0" width="172" height="7" rx="3.5" fill="#f6e3a6"/>${drips("#f6e3a6",4,[40,96,150],6)}`},
 onion:{h:13,svg:()=>`<rect x="10" y="2" width="180" height="10" rx="5" fill="#7a3e14"/>${[8,30,54,78,102,126,150,170].map((x,i)=>`<path d="M${x} ${7} q12 ${i%2?-8:8} 24 0" stroke="${i%2?"#c98a3e":"#a85f22"}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join("")}`},
 jelly:{h:10,svg:()=>`<rect x="12" y="0" width="176" height="10" rx="5" fill="#c4161c"/><path d="M28 3 H130" stroke="#ff7a68" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>${drips("#c4161c",7,[44,92,150],10)}`},
 lettuce:{h:13,svg:()=>`<path d="${wave(8,8,16,0,200)} L200 15 L0 15 Z" fill="#5fae2e"/><path d="${wave(9,4,16,4,196)}" stroke="#9edb57" stroke-width="2.5" fill="none"/>`},
 tomato:{h:12,svg:()=>[10,72,134].map(x=>`<rect x="${x}" y="0" width="58" height="13" rx="6.5" fill="#e0301e"/><rect x="${x+8}" y="4" width="42" height="5" rx="2.5" fill="#ff8a66" opacity=".75"/>`).join("")},
 egg:{h:13,svg:()=>`<path d="M10 8 Q14 -2 60 2 Q100 -4 140 2 Q190 0 190 9 Q188 15 100 14 Q12 15 10 8 Z" fill="#fbf6ea"/><ellipse cx="104" cy="5" rx="24" ry="6" fill="#f5a613"/><ellipse cx="98" cy="3" rx="8" ry="2" fill="#ffd36a"/>`},
 calabresa:{h:13,svg:()=>[6,42,78,114,150].map(x=>`<ellipse cx="${x+22}" cy="7" rx="22" ry="7.5" fill="#a33a26" stroke="#6e2216" stroke-width="1.5"/>${[8,16,26,34].map(d=>`<circle cx="${x+d}" cy="${5+(d%4)}" r="1.8" fill="#efb796"/>`).join("")}`).join("")},
 bacon:{h:13,svg:()=>`<path d="${wave(7,5,20,2,198)}" stroke="#8f2c1b" stroke-width="11" fill="none" stroke-linecap="round"/><path d="${wave(6,5,20,2,198)}" stroke="#f0bba0" stroke-width="2.5" fill="none" stroke-dasharray="16 6"/>`},
 lombo:{h:12,svg:()=>[8,70,132].map(x=>`<rect x="${x}" y="0" width="62" height="13" rx="4" fill="#c9705e" stroke="#8e4436" stroke-width="1.5"/><path d="M${x+6} 4 H${x+56}" stroke="#f3b9aa" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>`).join("")},
 coalho:{h:9,svg:()=>`<rect x="12" y="0" width="176" height="10" rx="3" fill="#f3dfa8"/>${[24,52,80,108,136,164].map(x=>`<path d="M${x} 2 l10 6" stroke="#a8641e" stroke-width="3" stroke-linecap="round" opacity=".75"/>`).join("")}`},
 ham:{h:9,svg:()=>`<path d="M10 5 Q14 -1 100 1 Q186 -1 190 5 Q186 11 100 10 Q14 11 10 5 Z" fill="#f2a3a0"/><path d="M26 4 H174" stroke="#fcd0cc" stroke-width="2" stroke-linecap="round"/>`},
 redonion:{h:8,svg:()=>[14,58,102,146].map(x=>`<ellipse cx="${x+20}" cy="4" rx="20" ry="4" fill="none" stroke="#9b3b78" stroke-width="3"/>`).join("")},
 cream:{h:11,svg:()=>`<path d="M14 8 Q24 -3 48 3 Q70 -4 94 3 Q120 -4 144 3 Q168 -3 186 8 Q184 13 100 13 Q16 13 14 8 Z" fill="#fffaf0"/>${drips("#fffaf0",10,[60,128],6)}`}
};
function burgerSVG(m,size){
  const stack=["topBun",...m.top];
  for(let i=0;i<=size;i++){stack.push(...m.perPatty,"patty")}
  stack.push("bottomBun");
  let y=0;const parts=[];
  stack.forEach((k,i)=>{const l=L[k];parts.push(`<g transform="translate(0 ${y})">${l.svg()}</g>`);y+=l.h-(i===0?2:1)});
  const H=y+4;
  // pinta de baixo para cima, para cada camada cobrir a de baixo
  return `<svg viewBox="0 -10 200 ${H+10}" role="img" aria-label="${m.name} ${SIZES[size].toLowerCase()}">${parts.reverse().join("")}</svg>`;
}
