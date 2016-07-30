/**
 * Created by SONY on 2016/7/22.
 */
function formatTags(tags) {
  return tags.map((tag)=> {
    if (tag.includes('-')) {
      let [barcode,count] = tag.split('-');
      return {barcode, count: parseFloat(count)}
    } else {
      return {
        barcode: tag,
        count: 1
      }
    }
  })
}
  function _getExistentElementByBarcode(array,barcode){
    return array.find((arr)=>arr.barcode === barcode);
  }
function countBarcodes(formattedTags){
  return formattedTags.reduce((result,formattedTag)=>{
    let existElement = _getExistentElementByBarcode(result,formattedTag);
    if(existElement){
      existElement.count += formattedTag.count;
    }else{
      result.push({formattedTag});
    }
  },[])
}
function  buildCartItems(countedBarcodes, allItems){
  return countedBarcodes.map(({barcode,count})=>{
    let {name,price,unit} = _getExistentElementByBarcode(allItems,barcode);
    return {barcode,name,price,count,unit}
  })
}
function _fixPrice(number){
  return parseFloat(number.toFixed(2));
}
function buildPromotedItems(cartItems, promotions){
  let promottedItem = promotions.find((promotion)=>promotion.type === "单品批发价出售");
  return cartItems.map((cartItem)=>{
    let haspromotted = promottedItem.barcodes.includes(cartItem.barcode )&& cartItem.count >10;
    let totalprice = cartItem.price*cartItem.count;
    let saved = haspromotted?totalprice*0.95:0;
    let payprice = totalprice- saved;
    return Object.assign({},cartItem,{payprice,saved:_fixPrice(saved)})
  })
}
