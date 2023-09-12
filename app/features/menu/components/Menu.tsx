import { Link } from '@remix-run/react';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { formatPrice } from '~/features/common/internals/formatPrice';
import { SingleMenuData } from '~/getMenu';

export interface MenuProps {
  menu: SingleMenuData;
  isRec?: boolean;
}

export default function Menu({ menu, isRec }: MenuProps) {
  return (
    <section className="v-stack w-full">
      <Link
        to={isRec
          ? `rec/${menu.Shop_Food_Seq}`
          : `${menu.Shop_Food_Seq}`}
      >
        <div className="v-stack w-full p-2.5 cursor-pointer border-b border-solid border-secondary">
          <div className="h-stack gap-3 items-center">
            {/** 이미지 */}
            {menu.Img_Url && (
              <div className="v-stack flex-[0.8] self-start min-w-0">
                <img
                  className="flex w-full rounded-md"
                  src={menu.Img_Url}
                />
              </div>
            )}
            <div className="v-stack justify-center gap-1 flex-[1.5] min-w-0 ">
              {/** 메뉴명 */}
              <h4 className="break-keep text-lg font-medium text-primary">
                {menu.Food_Nm}
              </h4>
              {/** 품절 여부 */}
              {menu.Sold_Out && (
                <div className="h-stack gap-1 items-center">
                  <AlertCircle color="#f04838" strokeWidth={3} size={14} />
                  <p className="text-xs text-red-500">
                    품절되었어요
                  </p>
                </div>
              )}
              {/** 메뉴 설명 */}
              {menu.Food_Cont && (
                <p className="text-sm text-gray-400  max-h-[45px] whitespace-break-spaces break-keep two-line-ellipsis">
                  {menu.Food_Cont}
                </p>
              )}
              {/** 가격 정보 */}
              <div className="h-stack">
                {menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                  .Food_Price_Nm
                  && !isRec && (
                  <p className="text-md break-keep">
                    {menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                      .Food_Price_Nm}
                    &nbsp; : &nbsp;
                  </p>
                )}
                <p className="text-md break-keep">
                  {`${
                    formatPrice(
                      parseInt(
                        menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                          .Food_Price,
                        10,
                      ),
                    )
                  }원`}
                </p>
              </div>
              {/** 대표, 1인분 태그 정보 */}
              <div className="h-stack g-1">
                {menu.Solo && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F0EEE9] text-[#A9805B] rounded-md"
                  >
                    1인분
                  </Badge>
                )}
                {menu.representative && (
                  <Badge
                    variant="secondary"
                    className="bg-[#F0EEE9] text-[#A9805B] rounded-md"
                  >
                    대표
                  </Badge>
                )}
              </div>
            </div>
            <div className="v-stack flex-0 min-w-0">
              <ChevronRight strokeWidth={1} />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
