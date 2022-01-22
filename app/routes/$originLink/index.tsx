import { LoaderFunction, useLoaderData } from 'remix';
import { getMenu, MenuData } from '~/getMenu';
import {
  VStack,
  Text,
  HStack,
  Tabs,
  Image,
  IconButton,
  Button,
} from '@dano-inc/design-system';
import Menu from '~/features/menu/components/Menu';
import { LineIconShare } from '@dano-inc/react-icons';
import ShareButton from '~/features/common/components/ShareButton';
import { getShopId } from '~/getShopId';

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = request.url;
  const response = await getMenu(params.originLink!);

  if (response.status !== 'SUCCESS') throw Error;
  return { data: response.data, url, originLink: params.originLink };
};

export default function Index() {
  const { data, url, originLink } =
    useLoaderData<{ data: MenuData; url: string; originLink: string }>();
  const { shop_info, shop_menu } = data;

  const handleClick = () => {
    window.open(`https://baemin.me/${originLink}`);
  };

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
        <HStack pos='relative' css={{ width: '100%' }}>
          <VStack alignItems='center'>
            <Text
              variant='heading3'
              css={{ maxWidth: '200px' }}
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
            <Tabs.List variant='default'>
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
            </Tabs.List>
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
        <HStack>
          <Button
            color='gray'
            fullWidth
            pos='fixed'
            css={{
              bottom: 0,
              borderRadius: '$sharp',
              maxWidth: '375px',
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
            onClick={handleClick}
          >
            앱으로 보기
          </Button>
        </HStack>
      </VStack>
    </HStack>
  );
}
