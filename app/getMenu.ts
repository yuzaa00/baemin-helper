export interface SingleMenuData {
  Shop_Food_Seq: string;
  Food_Nm: string; // 음식명
  Food_Cont: string; // 설명
  Images: [];
  Img_Url: string;
  Sold_Out: boolean;
  List_Shop_Food_Price_Grp: {
    Def_Price_Yn: 'Y' | 'N'; // 기본 금액 여부
    Max_Sel: string; // 최대 구매 수량
    Min_Sel: string; // 최소 구매 수량
    Shop_Food_Seq: string;
    Shop_Food_Price_Grp_Nm: string; // 기본, 음료 필수 선택, 빵 필수 선택
    List_Shop_Food_Price: {
      Shop_Food_Price_Seq: string;
      Food_Price: string; // 기본 금액, 추가 금액
      Food_Price_Nm: string | null; // 추가 금액 명
      Sold_Out: boolean;
    }[];
  }[];
}

export interface MenuData {
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
    distanceTextPhrase: string; //배달주소로부터 약 944m
  };
  shop_menu: {
    menu_info: {}; // 최소 주문 금액, 원산지, 각종 공지글
    menu_ord: {
      normal: {
        // 카테고리 (앱 최상단 카테고리)
        Shop_Food_Grp_Nm: string; // 세트, 대용량, 커피, 음료, 에이드, 주스, 빽스치노&스무디, 베이커리
        Remark: string; // 짧은 설명
        List_Shop_Food: SingleMenuData[];
      }[];
      rec: SingleMenuData[];
      set: [];
      solo: [];
    };
  };
}

export interface Menu {
  data: MenuData;
  message: string;
  serverDatetime: string;
  status: string;
}

export const getMenu = async (): Promise<Menu> => {
  const response = await fetch(
    'https://shopdp-api.baemin.com/v8/shop/13388278/detail?adid=00000000-0000-0000-0000-000000000000&appver=11.13.1&campaignId=-1&carrier=45008&defaultreview=N&deviceModel=iPhone14%2C2&displayGroup=DEFAULT&dvc_uniq_id=6F456646-3497-4DF2-9663-1CBFA9215597&dvcid=OPUD70CB790C-F9A0-409F-98EF-2D5E5C064508&filter=&lat=37.54241331543683&lat4Distance=37.54241331543683&lng=126.9403147496142&lng4Distance=126.9403147496142&mem=151202002322'
  );

  return response.json();
};
