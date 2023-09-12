import { ChevronLeft } from 'lucide-react';
import { Separator } from '~/components/ui/separator';

import { useNavigate, useParams } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import ShareButton from '~/features/common/components/ShareButton';
import { formatPrice } from '~/features/common/internals/formatPrice';
import { SingleMenuData } from '~/getMenu';

export interface MenuOptionProps {
  option: SingleMenuData;
  url: string;
}

export default function MenuOption({ option, url }: MenuOptionProps) {
  const navigate = useNavigate();
  const { originLink, detail } = useParams();

  const handleArrowClick = () => {
    if (detail === 'rec') {
      navigate(`/${originLink}`);
    } else {
      navigate(`/${originLink}/${detail}`);
    }
  };

  return (
    <div className="v-stack gap-4 w-full">
      <div className="h-stack relative w-full justify-center">
        <Button
          variant="ghost"
          className="absolute top-0 left-0"
          onClick={handleArrowClick}
        >
          <ChevronLeft strokeWidth={1} />
        </Button>
        <div className="v-stack">
          <h3 className="text-2xl font-semibold text-center break-keep w-full max-sm:max-w-[200px]">
            {option.Food_Nm}
          </h3>
        </div>
        <ShareButton url={url} />
      </div>
      <div className="v-stack gap-3 flex-[1.5] px-4">
        <div className="h-stack justify-center">
          <p className="text-sm break-keep text-center">
            {option.Food_Cont}
          </p>
        </div>
        {option.List_Shop_Food_Price_Grp.map((price, index) => (
          <div
            className="flex"
            key={`price-${index}-${price.Shop_Food_Price_Grp_Seq}`}
          >
            {price.Def_Price_Yn === 'Y'
              ? (
                <div className="v-stack w-full">
                  <div className="h-stack py-2 justify-between">
                    <h6 className="font-semibold break-keep">
                      {price.Shop_Food_Price_Grp_Nm}
                    </h6>
                    <p className="break-keep">
                      {`${
                        formatPrice(
                          parseInt(
                            price.List_Shop_Food_Price[0].Food_Price,
                            10,
                          ),
                        )
                      } 원`}
                    </p>
                  </div>
                  <Separator />
                </div>
              )
              : (
                <div className="v-stack gap-2.5">
                  <div className="h-stack pt-2.5 items-center">
                    <h6 className="break-keep mr-1.5 font-semibold">
                      {price.Shop_Food_Price_Grp_Nm}
                    </h6>
                    {Number(price.Min_Sel) > 0 && (
                      <p className="text-xs mr-1 text-red-500">
                        {`필수 ${price.Min_Sel}개`}
                      </p>
                    )}
                    {Number(price.Min_Sel) !== Number(price.Max_Sel) && (
                      <p className="text-xs">{`최대 ${price.Max_Sel}개`}</p>
                    )}
                  </div>
                  <div className="v-stack gap-1 flex-[2]">
                    {price.List_Shop_Food_Price.map(subPrice => (
                      <div
                        className="v-stack"
                        key={subPrice.Shop_Food_Price_Seq}
                      >
                        <div className="h-stack py-2">
                          <div className="h-stack flex-[1] items-center">
                            <p className="break-keep">
                              {subPrice.Food_Price_Nm}
                            </p>
                            {subPrice.Sold_Out && (
                              <p
                                className={`text-red-500 ml-${
                                  price.Def_Price_Yn === 'N'
                                    ? '8'
                                    : undefined
                                }`}
                              >
                                품절
                              </p>
                            )}
                          </div>
                          <p className="break-keep">
                            {`+ ${
                              formatPrice(
                                parseInt(subPrice.Food_Price, 10),
                              )
                            } 원`}
                          </p>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
