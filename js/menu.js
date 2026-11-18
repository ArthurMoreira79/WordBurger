/* Dados do cardápio e configuração da loja.
   Para alterar preços, nomes ou itens, edite apenas este arquivo. */

/* WhatsApp da loja (DDI + DDD + número, só dígitos) */
const PHONE="5598981552129";

/* Hambúrgueres: p = preços [simples, duplo, triplo] (null = valor ainda não informado);
   single = sem opção de tamanho; top = camadas de cima para baixo; perPatty = camadas repetidas a cada carne.
   Bebidas: price = preço único; flavors = sabores para escolher (opcional). */
const MENU=[
 {id:"top",n:1,cat:"art",name:"Top Burger",desc:"Pão brioche selado na chapa, molho supreme, blend de hambúrguer de 70 gramas, queijo cheddar.",p:[13,15,17],top:[],perPatty:["cheddar"]},
 {id:"play",n:2,cat:"art",name:"Play Burger",desc:"Pão brioche selado na chapa, molho supreme, Blend de 70 grama levemente defumado, cebola caramelizada.",p:[13,15,17],top:["onion"],perPatty:[]},
 {id:"wood",n:3,cat:"art",name:"Wood Word",desc:"Pão brioche selado na chapa, molho supreme, Blend de 70 gramas levemente defumado, generosa fatia de queijo mussarela, deliciosa geleia de abacaxi com pimenta.",p:[15,17,20],top:["jelly"],perPatty:["mozz"]},
 {id:"salada",n:4,cat:"art",name:"Word Salada",desc:"Pão brioche selado na chapa, molho supreme, Blend de 70 gramas levemente defumado, ovo, generosa fatia de queijo mussarela, Alface e tomate.",p:[16,18,21],top:["lettuce","tomato","egg"],perPatty:["mozz"]},
 {id:"calabresa",n:5,cat:"art",name:"Word Calabresa",desc:"Pão brioche selado na chapa, molho imperius, Blend de 70 gramas levemente defumado, ovo, generosa fatia de queijo mussarela e calabresa.",p:[20,23,24],top:["calabresa","egg"],perPatty:["mozz"]},
 {id:"bacon",n:6,cat:"art",name:"Word Bacon",desc:"Pão brioche selado na chapa, molho supreme, Blend de 70 grama levemente defumado, molho supreme, ovo, generosa fatia de queijo mussarela e delicioso bacon.",p:[21,24,26],top:["bacon","egg"],perPatty:["mozz"]},
 {id:"eguas",n:7,cat:"esp",name:"Éguas doido",desc:"Pão brioche selado na chapa, molho supreme, Blend de 70 gramas, lapada de queijo Coalho, Bacon.",p:[32,33,35],top:["bacon"],perPatty:["coalho"]},
 {id:"antiga",n:8,cat:"esp",name:"Das Antiga",desc:"Pão de Leite selado na chapa, carne de hambúrguer Texas Burger, ovo, presunto, queijo, alface, tomate, cebola roxa, kat chup e maionese.",p:[16],single:true,top:["lettuce","tomato","redonion","ham","egg"],perPatty:["cheese"]},
 {id:"lata",cat:"beb",name:"Refrigerante lata 350 ML",flavors:["Coca-Cola","Coca zero","Jesus","Fanta","Antártica","Antártica zero"],price:6},
 {id:"limoneto",cat:"beb",name:"Limoneto 500 Ml",price:7},
 {id:"litro",cat:"beb",name:"Refrigerante de 1L",flavors:["Coca-Cola","Coca zero","Jesus","Antártica"],price:12},
 {id:"doislitros",cat:"beb",name:"Refrigerante de 2 L",flavors:["Coca-Cola"],price:15}
];
const SIZES=["Simples","Duplo","Triplo"];

/* Adicionais: oferecidos ao colocar um hambúrguer no carrinho. */
const EXTRAS=[
 {id:"ovo",name:"Ovo",price:2},
 {id:"cebola",name:"Cebola caramelizada",price:3},
 {id:"geleia",name:"Geleia de abacaxi c/ pimenta",price:5},
 {id:"cheddar",name:"Queijo cheddar",price:4},
 {id:"mussarela",name:"Queijo mussarela",price:5},
 {id:"calabresa",name:"Calabresa",price:5},
 {id:"bacon",name:"Bacon",price:6}
];
