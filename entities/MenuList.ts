export interface SingleMenuData {
  Shop_Food_Seq: string;
  Shop_Food_Grp_Seq: string;
  /** 음식명 */
  Food_Nm: string;
  /** 음식점명 */
  Shop_Nm: string;
  /** 설명 */
  Food_Cont: string;
  Images: [{
    order: number;
    Image_Detail: {
      rectangle: {
        height: number;
        width: number;
        url: string;
      };
      squre: {
        height: number;
        width: number;
        url: string;
      };
      thumbnail: {
        height: number;
        width: number;
        url: string;
      };
    };
  }];
  Img_Url: string;
  Sold_Out: boolean;
  representative: boolean; // 대표  태그 여부
  Solo: boolean; // 1인분 태그 여부
  List_Shop_Food_Price_Grp: {
    Def_Price_Yn: 'Y' | 'N'; // 기본 금액 여부
    Max_Sel: string; // 최대 구매 수량
    Min_Sel: string; // 최소 구매 수량
    Shop_Food_Seq: string;
    Shop_Food_Grp_Seq: string;
    Shop_Food_Price_Grp_Nm: string; // 기본, 음료 필수 선택, 빵 필수 선택
    Shop_Food_Price_Grp_Seq: number;
    List_Shop_Food_Price: {
      Shop_Food_Price_Seq: string;
      Food_Price: string; // 기본 금액, 추가 금액
      Food_Price_Nm: string | null; // 추가 금액 명
      Sold_Out: boolean;
    }[];
  }[];
}

export interface NormalMenu {
  // 카테고리 (앱 최상단 카테고리)
  Shop_Food_Grp_Nm: string; // 세트, 대용량, 커피, 음료, 에이드, 주스, 빽스치노&스무디, 베이커리
  Shop_Food_Grp_Seq: string;
  Remark: string; // 짧은 설명
  List_Shop_Food: SingleMenuData[];
  Shop_Nm: string; // 음식점 명
}

interface MenuListDto {
  shop_info: {
    addr: string;
    Close_day: string;
    Review_Cnt: string;
    Shop_Intro: string;
    Shop_Nm: string;
    actualAddress: {
      address: string;
      latitude: number;
      longitude: number;
    };
    distanceTextPhrase: string; // 배달주소로부터 약 944m
  } | null;
  shop_menu: {
    menu_info: unknown; // 최소 주문 금액, 원산지, 각종 공지글
    menu_ord: {
      normal: NormalMenu[];
      rec: SingleMenuData[];
      set: [];
      solo: [];
    };
  };
}

export interface MenuListApiResponse {
  data: MenuListDto;
  message: string;
  serverDatetime: string;
  status: string;
}

export interface Menu {
  foodId: string;
  foodName: string;
  shopName: string;
  foodDescription: string;
  representative: boolean;
  soloServing: boolean;
  imgUrl: string;
  soldOut: boolean;
  foodPriceGroup: {
    priceGroupName: string;
    defaultPrice: boolean;
    maxCount: string;
    minCount: string;
    price: {
      priceName: string | null;
      price: string;
      soldOut: boolean;
    }[];
  }[];
}

export class MenuList {
  constructor(
    public shopId: string,
    public shopMenu: {
      menuInfo: any;
      menuList: {
        normal: {
          foodGroupName: string;
          foodGroupId: string;
          description: string;
          menuList: Menu[];
        }[];
        recommended: Menu[];
      };
    },
  ) {
  }

  static fromJson(json: MenuListDto): MenuList {
    return new MenuList(
      json.shop_info ? json.shop_info.Shop_Nm : '',
      {
        menuInfo: json.shop_menu.menu_info,
        menuList: {
          normal: json.shop_menu.menu_ord.normal.map(normal => ({
            foodGroupName: normal.Shop_Food_Grp_Nm,
            foodGroupId: normal.Shop_Food_Grp_Seq,
            description: normal.Remark,
            menuList: normal.List_Shop_Food.map((menu) => ({
              foodId: menu.Shop_Food_Seq,
              foodName: menu.Food_Nm,
              shopName: menu.Shop_Nm,
              foodDescription: menu.Food_Cont,
              representative: menu.representative,
              soloServing: menu.Solo,
              imgUrl: menu.Img_Url,
              soldOut: menu.Sold_Out,
              foodPriceGroup: menu.List_Shop_Food_Price_Grp.map((group) => ({
                priceGroupName: group.Shop_Food_Price_Grp_Nm,
                defaultPrice: group.Def_Price_Yn === 'Y',
                maxCount: group.Max_Sel,
                minCount: group.Min_Sel,
                price: group.List_Shop_Food_Price.map(price => ({
                  priceName: price.Food_Price_Nm,
                  price: price.Food_Price,
                  soldOut: price.Sold_Out,
                })),
              })),
            })),
          })),
          recommended: json.shop_menu.menu_ord.rec.map((menu) => ({
            foodId: menu.Shop_Food_Seq,
            foodName: menu.Food_Nm,
            shopName: menu.Shop_Nm,
            foodDescription: menu.Food_Cont,
            representative: menu.representative,
            soloServing: menu.Solo,
            imgUrl: menu.Img_Url,
            soldOut: menu.Sold_Out,
            foodPriceGroup: menu.List_Shop_Food_Price_Grp.map((group) => ({
              priceGroupName: group.Shop_Food_Price_Grp_Nm,
              defaultPrice: group.Def_Price_Yn === 'Y',
              maxCount: group.Max_Sel,
              minCount: group.Min_Sel,
              price: group.List_Shop_Food_Price.map(price => ({
                priceName: price.Food_Price_Nm,
                price: price.Food_Price,
                soldOut: price.Sold_Out,
              })),
            })),
          })),
        },
      },
    );
  }
}
