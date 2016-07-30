'use strict';

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      category: '食品',
      subCategory: '碳酸饮料',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '荔枝',
      unit: '斤',
      category: '食品',
      subCategory: '水果',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '羽毛球',
      unit: '个',
      category: '运动器具',
      subCategory: '用品',
      price: 3.00
    },
    {
      barcode: 'ITEM000003',
      name: '电池',
      unit: '个',
      category: '生活用品',
      subCategory: '电器',
      price: 3.00
    },
    {
      barcode: 'ITEM000004',
      name: '苹果',
      unit: '斤',
      category: '食品',
      subCategory: '水果',
      price: 3.00
    }
    ]
}
function loadPromotions() {
  return     [
    {
      type: 'BUY_THREE_GET_ONE_FREE',
      barcodes: [
        'ITEM000002',
        'ITEM000001'
      ]
    },
    {
      type: 'BUY_ELEVEN_GET_0.75',
      barcodes: [
        'ITEM000002',
        'ITEM000001'
      ]
    },
    {
      type: 'OTHER_PROMOTION',
      barcodes: [
        'ITEM000000',
        'ITEM000004'
      ]
    }
  ]
}

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
  for(let formattedTag of formattedTags){
    var barcode = formattedTag.barcode;
    var item = compare(result,barcode);
    if(item === null){
      result.push(formattedTag)
    }else{
     item.count +=  formattedTag.count ;
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
        category:item.category,
        subCategory:item.subCategory,
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
  for(let cartItem of cartItems){
    let saved = 0;
    for(let promotion of promotions){
      let haspromoted = false;
      for(let barcode of promotion.barcodes) {
        if (cartItem.barcode === barcode) {
          haspromoted = true;
        }
      }
      if(promotion.type === "BUY_ELEVEN_GET_0.75" && haspromoted){
        if(cartItem.count>=11){
          saved = cartItem.count*cartItem.price*0.25;
        }

      }
    }
     let payprice = cartItem.count*cartItem.price-saved;
      result.push({
        barcode:cartItem.barcode,
        name:cartItem.name,
        unit:cartItem.unit,
        price:cartItem.price,
        count:cartItem.count,
        category:cartItem.category,
        subCategory:cartItem.subCategory,
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
    if(promotion.saved === 0){
      receiptItems.push({
        name: promotion.name,
        unit: promotion.unit,
        category:promotion.category,
        subCategory:promotion.subCategory,
        price: promotion.price,
        count: promotion.count,
        payprice: promotion.payprice
      });
    }else{
      receiptItems.push({
        name: promotion.name,
        unit: promotion.unit,
        category:promotion.category,
        subCategory:promotion.subCategory,
        price: promotion.price,
        count: promotion.count,
        payprice: promotion.payprice,
        saved:promotion.saved
      });
    }

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
  let fovorString  = "";
  let fovorItems = [];
  for(let receiptItem of receiptItems.receiptItems){
    if(receiptItem.saved !== undefined && receiptItem.saved !== 0){
    receiptString += `名称:${receiptItem.name},数量:${receiptItem.count},单价:${receiptItem.price.toFixed(2)}(元),小计:${receiptItem.payprice.toFixed(2)}(元),优惠：${receiptItem.saved}`;
      let fovorItem = {name:receiptItem.name,count:receiptItem.count};
      fovorItems.push(fovorItem);
    }else{
      receiptString += `名称:${receiptItem.name},数量:${receiptItem.count},单价:${receiptItem.price.toFixed(2)}(元),小计:${receiptItem.payprice.toFixed(2)}(元)`;
    }
     receiptString += "\n";

  }
  for(let fovorItem of fovorItems){
    fovorString += `批发价出售商品：
    名称:${fovorItem.name},数量:${fovorItem.count}`;
    fovorString += "\n";
    fovorString += "---------------------";
  }
  const result = `*****<没钱赚商店>收据*****
    ${receiptString}---------------------
    ${fovorString}
    总计:${totalprice .toFixed(2)}(元)
    节省:${saved.toFixed(2)}(元)
    *******************`;
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
  let receiptString = printReceiptString(receiptItems);
  console.log(receiptString);

}
function print(){
  return "hello world!";
}

let tags = [
  'ITEM000000-12',
  'ITEM000002-2',
  'ITEM000003-2',
];
console.log(printReceipt(tags));
//let a = 2.153.toFixed(2);
//let b = parseFloat(a);
//console.log(typeof (b))
