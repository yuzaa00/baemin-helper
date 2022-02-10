import { HStack, VStack } from '@dano-inc/design-system';
import { useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction } from 'remix';
import MenuOption from '~/features/menu/components/MenuOption';
import { getMenuOption, SingleMenuData } from '~/getMenu';

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const isRec = url.searchParams.get('isRec');
  const option = url.searchParams.get('option')!;

  const data = await getMenuOption(
    params.detail,
    option,
    isRec,
    params.originLink!,
  );
  return { data, url };
};

export const meta: MetaFunction = ({
  data,
}: {
  data: { data: SingleMenuData };
}) => {
  return {
    'og:title': `${data.data.Shop_Nm} - ${data.data.Food_Nm}`,
    'og:description': '여기를 눌러 웹에서 손쉽게 메뉴를 확인해보세요!',
  };
};

export default function detail() {
  const { data, url } = useLoaderData();

  return (
    <HStack justifyContent="center" css={{ margin: '$24 $10 $48' }}>
      <VStack
        alignItems="center"
        gap="16"
        css={{
          width: '100%',
          maxWidth: '640px',
        }}
      >
        <MenuOption option={data} url={url} />
      </VStack>
    </HStack>
  );
}
