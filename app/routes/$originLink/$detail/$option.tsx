import type { LoaderArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import MenuOption from '~/features/menu/components/MenuOption';
import { getMenuOption } from '~/getMenu';

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = new URL(request.url);
  const isRec = params.detail === 'rec';

  const data = await getMenuOption(
    params.detail,
    params.option,
    isRec,
    params.originLink!,
  );
  return { data, url };
};

export const meta: MetaFunction = ({
  data,
}) => {
  return {
    title: `배민 메뉴판 - ${data.data.Shop_Nm}`,
    'og:title': `${data.data.Shop_Nm} - ${data.data.Food_Nm}`,
    'og:description': '여기를 눌러 웹에서 손쉽게 메뉴를 확인해보세요!',
  };
};

export default function detail() {
  const { data, url } = useLoaderData();

  return (
    <div className="h-stack justify-center w-full">
      <div className="v-stack items-center gap-4 w-full max-w-2xl">
        <MenuOption option={data} url={url} />
      </div>
    </div>
  );
}
