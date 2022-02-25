import { HStack, VStack } from '@dano-inc/design-system';
import { useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import Menu from '~/features/menu/components/Menu';
import { getMenu, NormalMenus } from '~/getMenu';

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = request.url;
  const response = await getMenu(params.originLink!, params.detail!);

  return {
    data: response,
    url,
    originLink: params.originLink,
  };
};

export const meta: MetaFunction = (
  { data }: { data: { data: NormalMenus } },
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
    <HStack justifyContent="center">
      <VStack
        alignItems="center"
        css={{
          width: '100%',
          maxWidth: '640px',
        }}
      >
        {data.List_Shop_Food.map((menu, i) => (
          <Menu menu={menu} key={`${i.toString()}-${menu.Shop_Food_Seq}`} />
        ))}
      </VStack>
    </HStack>
  );
}
