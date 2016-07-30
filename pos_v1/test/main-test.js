'use strict';

describe('pos', () => {
  it("0.测试compare（）",()=>{
      let cartItems = [ { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3 ,
      count: 5 },
      {  barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5,
        count: 2 },
      {  barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15 ,
        count: 2 }];
    let barcode = "ITEM000002";
    let result =compare(cartItems,barcode);
    let ExceptItems =  {  barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5,
        count: 2 }
    expect(result).toEqual(ExceptItems);
  })
  it("1.测试getCountItems",()=>{
    let tags = [
      'ITEM000000',
      'ITEM000001-3',
      'ITEM000002-2',
      'ITEM000003-2'
    ];
    let result = getCountItems(tags);

    let expectTags =[
      { barcode: 'ITEM000000', count:1 },
      { barcode: 'ITEM000001', count: 3 },
      { barcode: 'ITEM000002', count: 2 },
      { barcode: 'ITEM000003', count: 2 } ];
     expect(result).toEqual(expectTags);
  });
  it("2.测试getCurrentBarcodes（）",()=>{
    let formattedTags =[
      { barcode: 'ITEM000000', count:1 },
      { barcode: 'ITEM000000', count: 3 },
      { barcode: 'ITEM000002', count: 2 },
      { barcode: 'ITEM000003', count: 2 } ];

    let result = getCurrentBarcodes(formattedTags);

    let  expectCountItems = [ { barcode: 'ITEM000000', count: 4 },
      { barcode: 'ITEM000002', count: 2 },
      { barcode: 'ITEM000003', count: 2 } ];

    expect(result).toEqual(expectCountItems);
  })
  it("3.测试getCartItems()",()=>{
    let countItems = [ { barcode: 'ITEM000000', count: 4 },
      { barcode: 'ITEM000002', count: 2 },
      { barcode: 'ITEM000003', count: 2 } ];
    let allItems = [
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
    let result = getCartItems(countItems,allItems);
    let expectCartItems = [ { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3 ,
      count: 4 },
      {  barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5,
        count: 2 },
      {  barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15 ,
        count: 2 }];
    expect(result).toEqual(expectCartItems);
  })
  it("4.测试getPromotionsItems（）",()=>{
    let cartItems = [ { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3 ,
      count: 5 },
      {  barcode: 'ITEM000002', name: '苹果', unit: '斤', price: 5.5,
        count: 2 },
      {  barcode: 'ITEM000003', name: '荔枝', unit: '斤', price: 15 ,
        count: 2 }];
    let promitions = [
      {
        type: 'BUY_TWO_GET_ONE_FREE',
        barcodes: [
          'ITEM000000',
          'ITEM000002',
          'ITEM000005'
        ]
      }
    ];
    let result = getPromotionsItems(cartItems,promitions);
    let exceptPromotionItems = [ { barcode: 'ITEM000000',
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
          count: 2,
          payprice: 30,
          saved: 0 } ]
      ;

    expect(result).toEqual(exceptPromotionItems);
  })
  it("5.测试getTotalprice()",()=>{
    let promotionsItems = [ { barcode: 'ITEM000000',
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
          count: 2,
          payprice: 30,
          saved: 0 } ];
    let result = getTotalprice(promotionsItems);
    let expectTotalPrice = { totalprice: 53, saved: 3 };
    expect(result).toEqual(expectTotalPrice);
  })
  it("6.测试getReceipt()",()=>{
    let promotionsItems = [ { barcode: 'ITEM000000',
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
        count: 2,
        payprice: 30,
        saved: 0 } ];
    let TotalPrice = { totalprice: 53, saved: 3 };
    let result = getReceipt(promotionsItems,TotalPrice);
    let expectreceiptItems ={ receiptItems:
      [ { name: '可口可乐', unit: '瓶', price: 3, count: 5, payprice: 12 },
        { name: '苹果', unit: '斤', price: 5.5, count: 2, payprice: 11 },
        { name: '荔枝', unit: '斤', price: 15, count: 2, payprice: 30 } ],
      totalprice: 53,
      saved: 3 };
    expect(result).toEqual(expectreceiptItems);
  })
  it("7.测试printReceiptString()",()=>{
    let receipt = { receiptItems:
      [ { name: '可口可乐', unit: '瓶', price: 3, count: 5, payprice: 12 },
        { name: '苹果', unit: '斤', price: 5.5, count: 2, payprice: 11 },
        { name: '荔枝', unit: '斤', price: 15, count: 1, payprice: 15 } ],
      totalprice: 38,
      saved: 3 };
    let result = printReceiptString(receipt);
    let expectReceipt = `*****<没钱赚商店>收据****
    名称:可口可乐,数量:5,单价:3.00(元),小计:12.00(元)
名称:苹果,数量:2,单价:5.50(元),小计:11.00(元)
名称:荔枝,数量:1,单价:15.00(元),小计:15.00(元)
---------------------
    总计:38.00(元)
    节省:3.00(元)
    **************
`;
    expect(result).toEqual(expectReceipt);
  });
//  it('should print text', () => {
//
//    const tags = [
//      'ITEM000001',
//      'ITEM000001',
//      'ITEM000001',
//      'ITEM000001',
//      'ITEM000001',
//      'ITEM000003-2',
//      'ITEM000005',
//      'ITEM000005',
//      'ITEM000005'
//    ];
//
//    spyOn(console, 'log');
//
//    printReceipt(tags);
//
//    const expectText = `***<没钱赚商店>收据***
//名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
//名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
//名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
//----------------------
//总计：51.00(元)
//节省：7.50(元)
//**********************`;
//
//    expect(console.log).toHaveBeenCalledWith(expectText);
//  });
})
;
