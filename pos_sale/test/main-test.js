'use strict';

describe('pos', () => {
  it("0.测试compare（）",()=>{
      let cartItems = [ { barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', price: 3 ,
        category: '食品',subCategory: '碳酸饮料',count: 11 },
        {
          barcode: 'ITEM000001',
          name: '荔枝',
          unit: '斤',
          category: '食品',
          subCategory: '水果',
          price: 15
        },
        {
          barcode: 'ITEM000002',
          name: '羽毛球',
          unit: '个',
          category: '运动器具',
          subCategory: '用品',
          price: 5
        },];
    let barcode = "ITEM000002";
    let result =compare(cartItems,barcode);
    let ExceptItems =  {
      barcode: 'ITEM000002',
      name: '羽毛球',
      unit: '个',
      category: '运动器具',
      subCategory: '用品',
      price: 5
    }
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
    let countItems = [ { barcode: 'ITEM000000', count: 11 },
      { barcode: 'ITEM000002', count: 2 },
      { barcode: 'ITEM000003', count: 2 } ];
    let allItems =[
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
        price: 15
      },
      {
        barcode: 'ITEM000002',
        name: '羽毛球',
        unit: '个',
        category: '运动器具',
        subCategory: '用品',
        price:5
      },
      {
        barcode: 'ITEM000003',
        name: '电池',
        unit: '个',
        category: '生活用品',
        subCategory: '电器',
        price: 2.5
      },
      {
        barcode: 'ITEM000004',
        name: '苹果',
        unit: '斤',
        category: '食品',
        subCategory: '水果',
        price: 6.5
      }
    ];
    let result = getCartItems(countItems,allItems);
    let expectCartItems = [{barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料', price: 3.00,count:11
    }, {barcode: 'ITEM000002', name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,count:2},
      {barcode: 'ITEM000003',name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,count:2}];
    expect(result).toEqual(expectCartItems);
  })
  it("4.测试getPromotionsItems（）",()=>{
    let cartItems = [{barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料', price: 3.00,count:12
    }, {barcode: 'ITEM000002', name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,count:2},
      {barcode: 'ITEM000003',name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,count:2}];
    let promitions =  [
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
          'ITEM000000',
        ]
      },
      {
        type: 'OTHER_PROMOTION',
        barcodes: [
          'ITEM000003',
          'ITEM000004'
        ]
      }
    ];
    let result = getPromotionsItems(cartItems,promitions);
    let exceptPromotionItems = [{barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料',
      price: 3.0,count:12,payprice:27,saved:9
    }, {barcode: 'ITEM000002', name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,
      count:2,payprice:10,saved:0},
      {barcode: 'ITEM000003',name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,
        count:2,payprice:5,saved:0}];

    expect(result).toEqual(exceptPromotionItems);
  })
  it("5.测试getTotalprice()",()=>{
    let promotionsItems = [{barcode: 'ITEM000000', name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料',
      price: 3.0,count:12,payprice:27,saved:9
    }, {barcode: 'ITEM000002', name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,
      count:2,payprice:10,saved:0},
      {barcode: 'ITEM000003',name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,
        count:2,payprice:5,saved:0}];

    let result = getTotalprice(promotionsItems);
    let expectTotalPrice = { totalprice: 42, saved: 9};
    expect(result).toEqual(expectTotalPrice);
  })
  it("6.测试getReceipt()",()=>{
    let promotionsItems = [{ name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料',
      price: 3.0,count:12,payprice:27,saved:9
    }, { name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,
      count:2,payprice:10,saved:0},
      {name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,
        count:2,payprice:5,saved:0}];
    let TotalPrice = { totalprice: 42, saved: 9 };
    let result = getReceipt(promotionsItems,TotalPrice);
    let expectreceiptItems ={ receiptItems:
      [{ name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料',
        price: 3.0,count:12,payprice:27,saved:9
      }, { name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,
        count:2,payprice:10},
        {name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,
          count:2,payprice:5}],
      totalprice: 42,
      saved: 9};
    expect(result).toEqual(expectreceiptItems);
  })
 it("7.测试printReceiptString() has saved",()=>{
  let receipt ={ receiptItems:
    [ {name: '可口可乐', unit: '瓶', category: '食品', subCategory: '碳酸饮料',
      price: 3.0,count:12,payprice:27,saved:9
    },{ name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,
      count:2,payprice:10},
      {name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,
        count:2,payprice:5}],
    totalprice: 42,
    saved: 9};

   let result = printReceiptString(receipt);
  let expectReceipt = `*****<没钱赚商店>收据*****
    名称:可口可乐,数量:12,单价:3.00(元),小计:27.00(元),优惠：9
名称:羽毛球,数量:2,单价:5.00(元),小计:10.00(元)
名称:电池,数量:2,单价:2.50(元),小计:5.00(元)
---------------------
    批发价出售商品：
    名称:可口可乐,数量:12
---------------------
    总计:42.00(元)
    节省:9.00(元)
    *******************`;
    expect(result).toEqual(expectReceipt);
  });
//it("7.测试printReceiptString() no saved",()=>{
//   let receiptItems ={ receiptItems:
//     [ { name: '羽毛球', unit: '个', category: '运动器具', subCategory: '用品', price:5,
//       count:2,payprice:10},
//       {name: '电池', unit: '个', category: '生活用品', subCategory: '电器', price: 2.5,
//         count:2,payprice:5}],
//     totalprice: 15,
//     saved: 0};
//
//   let result = printReceiptString(receiptItems);
//   let expectReceipt = `*****<没钱赚商店>收据*****
//    名称:羽毛球,数量:2,单价:5.00(元),小计:10.00(元)
//名称:电池,数量:2,单价:2.50(元),小计:5.00(元)
//---------------------
//
//    总计:15.00(元)
//    节省:0.00(元)
//    *******************`;
//   expect(result).toEqual(expectReceipt);
//  });
//  it('should print text', () => {
//
//    const tags = [
//      'ITEM000000-12',
//      'ITEM000002-2',
//      'ITEM000003-2',
//    ];
//
//    spyOn(console, 'log');
//
//    printReceipt(tags);
//
//    const expectText = `*****<没钱赚商店>收据*****
//    名称:可口可乐,数量:12,单价:3.00(元),小计:27.00(元),优惠：9
//名称:羽毛球,数量:2,单价:5.00(元),小计:10.00(元)
//名称:电池,数量:2,单价:2.50(元),小计:5.00(元)
//---------------------
//    批发价出售商品：
//    名称:可口可乐,数量:12
//---------------------
//    总计:42.00(元)
//    节省:9.00(元)
//    *******************`;
//
//    expect(console.log).toHaveBeenCalledWith(expectText);
//  });
})
;
