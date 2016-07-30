'use strict';
var barcodes = [
  'ITEM000000',
  'ITEM000000',
  'ITEM000001-3',
  'ITEM000002-2',
  'ITEM000003-2'
];
var formattedTags = [
  { barcode: 'ITEM000001', count: 3 },
  { barcode: 'ITEM000001', count: 1 },
  { barcode: 'ITEM000002', count: 2 },
  { barcode: 'ITEM000003', count: 1 } ];
var goods =[ { barcode: 'ITEM000000', count: 1 },
  { barcode: 'ITEM000001', count: 3 },
  { barcode: 'ITEM000002', count: 2 },
  { barcode: 'ITEM000003', count: 1 } ];
var items = [ { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3 ,
  count: 5 },
  {  barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5,
    count: 2 },
  {  barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15 ,
    count: 1 }];
function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001 ',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}
function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
var promotionItems = [ { barcode: 'ITEM000000',
  name: '可口可乐',
  unit: '瓶',
  price: 3,
  count: 5,
  payprice: 12,
  saved: 3 },
  { barcode: 'ITEM000002',
    name: '苹果',
    unit: '斤',
    price: 5.5,
    count: 2,
    payprice: 11,
    saved: 0 },
  { barcode: 'ITEM000003',
    name: '荔枝',
    unit: '斤',
    price: 15,
    count: 1,
    payprice: 15,
    saved: 0 } ]
;
var totalprice ={ totalprice: 38, saved: 3 };
var receiptItems ={ receiptItems:
  [ { name: '可口可乐', unit: '瓶', price: 3, count: 5, payprice: 12 },
    { name: '苹果', unit: '斤', price: 5.5, count: 2, payprice: 11 },
    { name: '荔枝', unit: '斤', price: 15, count: 1, payprice: 15 } ],
  totalprice: 38,
  saved: 3 };
//0.匹配
function  compare(array,barcode){
  for(let arr of array){
    if(arr.barcode === barcode){
      return arr;
    }
  }
  return null;
}
//1.识别条形码
 function getCountItems(tags){
   var formattedTags = [];
   for(let tag of tags){
     if(tag.indexOf('-')<0){
      formattedTags.push({"barcode":tag ,"count":1});
     }else{
       var temp = tag.split("-");
       formattedTags.push({"barcode":temp[0],"count":parseInt(temp[1])});
     }


   }
   return formattedTags;
 }
//2.再次格式化并汇总商品
function getCurrentBarcodes(formattedTags){
  var result = [];
  for(var i=0;i<formattedTags.length;i++){
    var barcode = formattedTags[i].barcode;
    var item = compare(result,barcode);
    if(item === null){
      result.push({barcode:barcode,count:formattedTags[i].count})
    }else{
     item.count +=  formattedTags[i].count ;
    }
  }
  return result;
}
//3.获得详细商品信息的对象
function getCartItems(currentedBarcodes,allItems){
  let result = [];
  for(let countbarcode of currentedBarcodes){
    let item = compare(allItems,countbarcode.barcode);
    if(item !== null){
      let cartItem = {
        barcode:item.barcode,
        name:item.name,
        unit:item.unit,
        price:item.price,
        count:countbarcode.count
      };
      result.push(cartItem);
    }
  }
  return result;
}
//4.获取促销信息，计算商品价格及优惠价格
function getPromotionsItems(cartItems,promotions){
  let result = [];
  let promotion = promotions[0];
  for(let cartItem of cartItems){
    let saved = 0;
    let haspromoted = false;
    for(let barcode of promotion.barcodes) {
      if (cartItem.barcode === barcode) {
        haspromoted = true;
      }
    }
      if(promotion.type === "BUY_TWO_GET_ONE_FREE" && haspromoted){
        var savedcount = Math.floor(cartItem.count/3);
        saved = savedcount*cartItem.price;
      }
     let payprice = cartItem.count*cartItem.price-saved;
      result.push({
        barcode:cartItem.barcode,
        name:cartItem.name,
        unit:cartItem.unit,
        price:cartItem.price,
        count:cartItem.count,
        payprice,
        saved
      });
    }
    return result;
}
//5.计算总价格
function getTotalprice(promotionItems){
  let result = {
    totalprice:0,
    saved:0
  };
  for(let promotionItem of promotionItems){
    result.totalprice += promotionItem.payprice;
    result.saved += promotionItem.saved;
  }
  return result;
}
//6.生成小票数据
function getReceipt(promotionItems,totalprice){
  let receiptItems = [];
  for(let promotion of promotionItems){
    receiptItems.push({
      name: promotion.name,
      unit: promotion.unit,
      price: promotion.price,
      count: promotion.count,
      payprice: promotion.payprice
    });
  }
  return {
    receiptItems,
    totalprice:totalprice.totalprice,
    saved:totalprice.saved
  };
}
//7.生成小票字符串
function printReceiptString(receiptItems){
  let totalprice = receiptItems.totalprice;
  let saved = receiptItems.saved;
  let receiptString = "";
  for(let receiptItem of receiptItems.receiptItems){
    receiptString += `名称:${receiptItem.name},数量:${receiptItem.count},单价:${receiptItem.price.toFixed(2)}(元),小计:${receiptItem.payprice.toFixed(2)}(元)`;
    receiptString += "\n";
  }
  const result = `*****<没钱赚商店>收据****
    ${receiptString}---------------------
    总计:${totalprice.toFixed(2)}(元)
    节省:${saved.toFixed(2)}(元)
    **************`;
  return result;
}
//8.控制台打印小票
function printReceipt(tags){
  let allItems = loadAllItems();
  let formattedTags = getCountItems(tags);
  let countedBarcodes = getCurrentBarcodes(formattedTags);
  let cartItems = getCartItems(countedBarcodes,allItems);
  let promotions = loadPromotions();
  let promotionItems = getPromotionsItems(cartItems,promotions);
  let totalprice = getTotalprice(promotionItems);
  let receiptItems = getReceipt(promotionItems,totalprice);
  let receiptString = printReceipt(receiptItems);
  console.log(receiptString);

}

// console.log(getCountItems(barcodes));
//console.log(getCurrentBarcodes(formattedTags));
//console.log(getCartItems(goods,loadAllItems()));
//console.log(getPromotionsItems(items,loadPromotions()));
//console.log(getTotalprice(promotionItems));
//console.log(getReceipt(promotionItems,totalprice));
console.log(printReceiptString(receiptItems));
//console.log(printReceipt(barcodes));
