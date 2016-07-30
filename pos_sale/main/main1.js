/**
 * Created by SONY on 2016/7/22.
 */
function formatTags(tags){
  return tags.map((tag)=>{
    if(tag.includes('-')){
      let [barcode,count] = tag.split('-');
      return {barcode,count:parseFloat(count)}
    }else{
      return {barcode:tag, count:1}
    }
  });
}
function _getExistentElementByBarcode(array,barcode){
  return array.find( (arr)=> {return arr.barcode === barcode ;});
}
function countBarcodes(formattedTags){
  return formattedTags.reduce((result,formattedTag)=>{
    let existElement = _getExistentElementByBarcode(result,formattedTag.barcode);
    if(existElement){
      existElement.count += formattedTag.count;
    }else{
      result.push(formattedTag);
    }
    return result;
  },[]);
}
function  buildCartItems(countedBarcodes, allItems){
  return countedBarcodes.map(({barcode,count})=>{
    let {name,unit,price} = _getExistentElementByBarcode(allItems, barcode);
    return {barcode,name,unit,price,count};
  });
}
function _fixPrice(number){
  return parseFloat(number.toFixed(2))
}
function buildPromotedItems(cartItems, promotions){
  let currentPromotion = promotions.find((promotion)=>promotion.type="单品批发价出售")
  return cartItems.map((cartItem)=>{
    let haspromotioned = currentPromotion.barcodes.includes(cartItem.barcode)&&cartItem.count>10;
    let totalprice = cartItem.price*cartItem.count;
    let saved = haspromoted?totalprice*0.05:0;
    let payprice = totalprice-saved;
    return Object.assign({},cartItem,{
      payprice,
      saved:_fixPrice(saved)
    })
  })
}
function calculateTotalPrices(promotedItems){
  return promotedItems.reduce((result,{payprice,saved})=>{
      result.totalpayprice += payprice;
      result.totalsaved += saved;
      return result;
    },
    {totalpayprice:0,totalsaved:0})
}
function buildReceipt(promotedItems, totalPrices){
  let savedItems = promotedItems.filter((promotedItem)=>promotedItem.saved>0)
  .map(({name,count,unit})=>{return {name,count,unit}});
  return {
    promotedItems:promotedItems.map(({name,unit,price,count,payprice,saved})=>{
    return {name,unit,price,count,payprice,saved}
  }),
    savedItems,
    totalpayprice:totalPrices.totalPayPrice,
    totalsaved:totalPrices.totalSaved
  }
}
//function buildReceiptString(receipt){
//  let lines =["****<没钱赚商店>****"];
//  for(let{name,count,unit,price,payprice,saved} of receipt.promotedItems){
//
//  }
//}
//let allItems = loadAllItems();
//let countedBarcodes = [
//  {barcode: 'ITEM000000', count: 2},
//  {barcode: 'ITEM000001', count: 3}
//];
//console.log(buildCartItems(countedBarcodes, allItems));
