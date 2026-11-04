/* Dados do cardápio e configuração da loja.
   Para alterar preços, nomes ou itens, edite apenas este arquivo. */

/* WhatsApp da loja (DDI + DDD + número, só dígitos) */
const PHONE="5598981552129";

/* Hambúrgueres: p = preços [simples, duplo, triplo]; top = camadas de cima para baixo;
   perPatty = camadas repetidas a cada carne. Demais itens: price = preço único. */
const MENU=[
 {id:"top",n:1,cat:"art",name:"Top Burger",desc:"Creme de queijo cheddar.",p:[13,15,17],top:[],perPatty:["cheddar"]},
 {id:"play",n:2,cat:"art",name:"Play Burger",desc:"Cebola caramelizada.",p:[13,15,17],top:["onion"],perPatty:[]},
 {id:"wood",n:3,cat:"art",name:"Wood Word",desc:"Generosa fatia de queijo e suave geleia de pimenta.",p:[15,17,19],top:["jelly"],perPatty:["cheese"]},
 {id:"salada",n:4,cat:"art",name:"Word Salada",desc:"Queijo mussarela, alface e tomate.",p:[16,18,21],top:["lettuce","tomato"],perPatty:["mozz"]},
 {id:"calabresa",n:5,cat:"art",name:"Word Calabresa",desc:"Ovo, generosa fatia de queijo mussarela e fatias de calabresa.",p:[20,23,24],top:["calabresa","egg"],perPatty:["mozz"]},
 {id:"bacon",n:6,cat:"art",name:"Word Bacon",desc:"Ovo, generosa fatia de queijo mussarela e bacon.",p:[21,24,26],top:["bacon","egg"],perPatty:["mozz"]},
 {id:"nordestino",n:7,cat:"esp",name:"Nordestino",desc:"Bacon, lombo defumado e creme cheese.",p:[32,35,38],top:["cream","lombo","bacon"],perPatty:[]},
 {id:"batata",cat:"por",name:"Batata frita tradicional",desc:"250 g",price:15},
 {id:"batatacb",cat:"por",name:"Batata frita com cheddar e bacon",desc:"Coberta com queijo cheddar e bacon",price:20},
 {id:"coca",cat:"beb",name:"Coca-Cola",desc:"Lata",price:6},
 {id:"cocazero",cat:"beb",name:"Coca-Cola Zero",desc:"Lata",price:6},
 {id:"jesus",cat:"beb",name:"Guaraná Jesus",desc:"Lata",price:6},
 {id:"fanta",cat:"beb",name:"Fanta",desc:"Lata",price:6},
 {id:"guarana",cat:"beb",name:"Guaraná Antarctica",desc:"Lata",price:6}
];
const SIZES=["Simples","Duplo","Triplo"];
