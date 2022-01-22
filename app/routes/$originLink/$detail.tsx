import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getMenu, getMenuOption, MenuData } from '~/getMenu';
import { HStack, VStack, Text } from '@dano-inc/design-system';
import MenuOption from '~/features/menu/components/MenuOption';

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const isRecommended = url.searchParams.get('isRecommended');
  const option = url.searchParams.get('option')!;

  const data = await getMenuOption(
    params.detail,
    option,
    isRecommended,
    params.originLink!
  );
  return { data, url };
};

export default function detail() {
  const { data, url } = useLoaderData();

  return (
    <HStack justifyContent='center' css={{ margin: '$24 $10 $48' }}>
      <VStack
        alignItems='center'
        gap='16'
        css={{
          width: '100%',
          maxWidth: '375px',
        }}
      >
        <MenuOption option={data} url={url} />
      </VStack>
    </HStack>
  );
}
