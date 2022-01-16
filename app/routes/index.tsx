import { useLoaderData } from 'remix';
import { getMenu, MenuData } from '~/menu';
import { VStack, Text, HStack, Tabs, Image } from '@dano-inc/design-system';
import Menu from '~/features/menu/components/Menu';

export const loader = async () => {
  const response = await getMenu();
  if (response.status !== 'SUCCESS') throw Error;
  return response.data;
};

export default function Index() {
  const posts = useLoaderData<MenuData>();
  const { shop_info, shop_menu } = posts;

  return (
    <HStack justifyContent='center' m='24'>
      <VStack css={{ maxWidth: '640px' }} gap='16'>
        <Text variant='heading1'>{shop_info.Shop_Nm}</Text>
        <Tabs.Root defaultValue='대표 메뉴'>
          <Tabs.List variant='default'>
            <Tabs.Trigger value='대표 메뉴'>대표 메뉴</Tabs.Trigger>
            {shop_menu.menu_ord.normal.map((menu, index) => (
              <Tabs.Trigger
                value={menu.Shop_Food_Grp_Nm}
                key={`tabs-${index}-${menu.Shop_Food_Grp_Nm}`}
              >
                {menu.Shop_Food_Grp_Nm}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <Tabs.Content value='대표 메뉴'>
            {shop_menu.menu_ord.rec.map(menu => (
              <Menu menu={menu} key={menu.Shop_Food_Seq} />
            ))}
          </Tabs.Content>
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
      </VStack>
    </HStack>
  );
}
