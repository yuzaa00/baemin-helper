import { getShopId } from './getShopId';
import { menuApi } from './lib/api';

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
    distanceTextPhrase: string; // 배달주소로부터 약 944m
  };
  shop_menu: {
    menu_info: unknown; // 최소 주문 금액, 원산지, 각종 공지글
    menu_ord: {
      normal: NormalMenus[];
      rec: SingleMenuData[];
      set: [];
      solo: [];
    };
  };
}

export interface NormalMenus {
  // 카테고리 (앱 최상단 카테고리)
  Shop_Food_Grp_Nm: string; // 세트, 대용량, 커피, 음료, 에이드, 주스, 빽스치노&스무디, 베이커리
  Shop_Food_Grp_Seq: string;
  Remark: string; // 짧은 설명
  List_Shop_Food: SingleMenuData[];
  Shop_Nm: string; // 음식점 명
}

export interface Menus {
  data: MenuData;
  message: string;
  serverDatetime: string;
  status: string;
}

let menus: MenuData;

export const getMenus = async (params: string): Promise<MenuData> => {
  const shopId = await getShopId(params);

  const response = await menuApi.get(
    `https://shopdp-api.baemin.com/v8/shop/${shopId}/detail?adid=00000000-0000-0000-0000-000000000000&appver=11.13.1&campaignId=-1&carrier=45008&defaultreview=N&deviceModel=iPhone14%2C2&displayGroup=DEFAULT&dvc_uniq_id=6F456646-3497-4DF2-9663-1CBFA9215597&dvcid=OPUD70CB790C-F9A0-409F-98EF-2D5E5C064508&filter=&lat=37.54241331543683&lat4Distance=37.54241331543683&lng=126.9403147496142&lng4Distance=126.9403147496142&mem=151202002322`,
    {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    },
  );
  menus = response.data;
  return menus;
};

export const getMenu = async (
  originLink: string,
  menuId: string,
) => {
  if (!menus) {
    menus = await getMenus(originLink);
  }

  return {
    ...menus.shop_menu.menu_ord.normal.find((menus) =>
      menus.Shop_Food_Grp_Seq === menuId
    ),
    Shop_Nm: menus.shop_info.Shop_Nm,
  };
};

export const getMenuOption = async (
  params: string | undefined,
  option: string | undefined,
  isRec: boolean,
  originLink: string,
) => {
  if (!params || !option) return;

  if (!menus) {
    menus = await getMenus(originLink);
  }

  if (isRec) {
    return {
      ...menus.shop_menu.menu_ord.rec.find(
        menu => menu.Shop_Food_Seq === option,
      ),
      Shop_Nm: menus.shop_info.Shop_Nm,
    };
  }

  return {
    ...menus.shop_menu.menu_ord.normal
      .find(option => option.Shop_Food_Grp_Seq === params)
      ?.List_Shop_Food.find(menu => menu.Shop_Food_Seq === option),
    Shop_Nm: menus.shop_info.Shop_Nm,
  };
};
