import type { LoaderArgs } from '@remix-run/cloudflare';
import { Outlet, useNavigate, useParams } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import AppButton from '~/features/common/components/AppButton';
import ShareButton from '~/features/common/components/ShareButton';
import Menu from '~/features/menu/components/Menu';
import { getMenus, MenuData } from '~/getMenu';

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = request.url;
  const response = await getMenus(params.originLink!);

  return {
    data: response,
    url,
    originLink: params.originLink,
  };
};

export const meta = ({ data }: { data: { data: MenuData } }) => {
  return {
    title: `배민 메뉴판 - ${data.data.shop_info.Shop_Nm}`,
    'og:title': `${data.data.shop_info.Shop_Nm}`,
    'og:description': '여기를 눌러 웹에서 손쉽게 메뉴를 확인해보세요!',
  };
};

export default function Index() {
  const { data, url, originLink } = useLoaderData<
    {
      data: MenuData;
      url: string;
      originLink: string;
    }
  >();

  const { shop_info, shop_menu } = data;

  const navigate = useNavigate();
  const { detail, option } = useParams();

  return (
    <div className="h-stack justify-center mt-6 mx-2.5 mb-24">
      <div className="v-stack items-center gap-4 w-full max-w-2xl">
        {option
          ? <Outlet />
          : (
            <>
              <header className="relative w-full">
                {/** 가게 이름 */}
                <div className="v-stack items-center">
                  <h3 className="text-2xl font-semibold text-center break-keep w-full max-sm:max-w-[200px]">
                    {shop_info.Shop_Nm}
                  </h3>
                </div>
                <ShareButton url={url} />
              </header>
              <section className="h-stack w-full">
                <Tabs
                  defaultValue={''}
                  value={detail}
                  className="w-full"
                  onValueChange={navigate}
                >
                  <TabsList className="hide-scrollbar max-w-2xl overflow-scroll w-full">
                    {/** 대표 메뉴 (고정) */}
                    <TabsTrigger value="">대표 메뉴</TabsTrigger>
                    {/** 그 외 메뉴 */}
                    {shop_menu.menu_ord.normal.map((menu, index) => (
                      <TabsTrigger
                        value={menu.Shop_Food_Grp_Seq}
                        key={`tabs-${index}-${menu.Shop_Food_Grp_Nm}`}
                      >
                        {menu.Shop_Food_Grp_Nm}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {/** 대표 메뉴 (고정) */}
                  <TabsContent value="" className="w-full">
                    {shop_menu.menu_ord.rec.map(menu => (
                      <Menu
                        menu={menu}
                        key={`${menu.Shop_Food_Grp_Seq}-${menu.Shop_Food_Seq}`}
                        isRec
                      />
                    ))}
                  </TabsContent>
                  <Outlet />
                </Tabs>
              </section>
            </>
          )}
        <AppButton originLink={originLink} />
      </div>
    </div>
  );
}
