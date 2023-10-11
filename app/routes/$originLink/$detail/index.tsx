import type { LoaderArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import Menu from '~/features/menu/components/Menu';
import { getMenu, NormalMenus } from '~/getMenu';

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = request.url;
  const response = await getMenu(params.originLink!, params.detail!);

  return {
    data: response,
    url,
    originLink: params.originLink,
  };
};

export const meta: MetaFunction = (
  { data },
) => {
  return {
    title: `배민 메뉴판 - ${data.data.Shop_Nm}`,
    'og:title': `${data.data.Shop_Nm}`,
    'og:description': '여기를 눌러 웹에서 손쉽게 메뉴를 확인해보세요!',
  };
};

export default function detail() {
  const { data } = useLoaderData<
    {
      data: NormalMenus;
    }
  >();
  return (
    <div className="h-stack justify-center">
      <div className="v-stack items-center w-full max-w-2xl">
        {data.List_Shop_Food.map((menu, i) => (
          <Menu
            menu={menu}
            key={`${menu.Shop_Food_Grp_Seq}-${menu.Shop_Food_Seq}`}
          />
        ))}
      </div>
    </div>
  );
}
