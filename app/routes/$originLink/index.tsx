import type { LoaderFunction, MetaFunction } from 'remix';
import { useLoaderData } from 'remix';
import { getMenu, MenuData } from '~/getMenu';
import { VStack, Text, HStack, Tabs } from '@dano-inc/design-system';
import { styled } from '@dano-inc/stitches-react';
import Menu from '~/features/menu/components/Menu';
import ShareButton from '~/features/common/components/ShareButton';
import AppButton from '~/features/common/components/AppButton';

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = request.url;
  const response = await getMenu(params.originLink!);

  if (response.status !== 'SUCCESS') throw Error;
  return { data: response.data, url, originLink: params.originLink };
};

export const meta: MetaFunction = ({ data }: { data: { data: MenuData } }) => {
  return {
    'og:title':  `${data.data.shop_info.Shop_Nm}`,
    'og:description': '여기를 눌러 웹에서 손쉽게 메뉴를 확인해보세요!',
  };
};

export default function Index() {
  const { data, url, originLink } =
    useLoaderData<{ data: MenuData; url: string; originLink: string }>();
  const { shop_info, shop_menu } = data;

  return (
    <HStack justifyContent='center' css={{ margin: '$24 $10 94px' }}>
      <VStack
        alignItems='center'
        gap='16'
        css={{
          width: '100%',
          maxWidth: '640px',
          padding: '',
        }}
      >
        <HStack pos='relative' css={{ width: '100%' }}>
          {/** 가게 이름 */}
          <VStack alignItems='center'>
            <Text
              variant='heading3'
              css={{
                '@small': {
                  maxWidth: '200px',
                },
              }}
              textAlign='center'
              wordBreak='keepAll'
            >
              {shop_info.Shop_Nm}
            </Text>
          </VStack>
          <ShareButton url={url} />
        </HStack>
        <HStack css={{ width: '100%' }}>
          <Tabs.Root defaultValue='대표 메뉴' css={{ width: '100%' }}>
            <StyledTabsList variant='default'>
              {/** 대표 메뉴 (고정) */}
              <Tabs.Trigger value='대표 메뉴'>대표 메뉴</Tabs.Trigger>
              {/** 그 외 메뉴 */}
              {shop_menu.menu_ord.normal.map((menu, index) => (
                <Tabs.Trigger
                  value={menu.Shop_Food_Grp_Nm}
                  key={`tabs-${index}-${menu.Shop_Food_Grp_Nm}`}
                >
                  {menu.Shop_Food_Grp_Nm}
                </Tabs.Trigger>
              ))}
            </StyledTabsList>
            {/** 대표 메뉴 (고정) */}
            <Tabs.Content value='대표 메뉴' css={{ width: '100%' }}>
              {shop_menu.menu_ord.rec.map(menu => (
                <Menu menu={menu} key={menu.Shop_Food_Seq} isRecommended />
              ))}
            </Tabs.Content>
            {/** 그 외 메뉴 */}
            {shop_menu.menu_ord.normal.map((menu, index) => (
              <Tabs.Content
                value={menu.Shop_Food_Grp_Nm}
                key={`content-${index}-${menu.Shop_Food_Grp_Nm}`}
              >
                {menu.List_Shop_Food.map(subMenu => (
                  <Menu menu={subMenu} key={subMenu.Shop_Food_Seq} />
                ))}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </HStack>
        <AppButton originLink={originLink} />
      </VStack>
    </HStack>
  );
}

const StyledTabsList = styled(Tabs.List, {
  padding: '0 10px 10px',
  boxShadow: 'none',
  '> button': {
    border: '1px solid $gray3',
    borderRadius: '$circle',
    height: '40px',
    padding: '0 $12',
    marginRight: '$8 !important',
    '&[data-state="active"]': {
      boxShadow: 'none',
      color: '$white',
      backgroundColor: '#444444',
      border: 'none',
    },
  },
});
