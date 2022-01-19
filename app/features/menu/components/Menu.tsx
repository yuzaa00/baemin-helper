import { HStack, VStack, Text, Image } from '@dano-inc/design-system';
import { Link } from 'remix';
import { SingleMenuData } from '~/getMenu';

export interface MenuProps {
  menu: SingleMenuData;
}

export default function Menu({ menu }: MenuProps) {
  console.log(menu);
  return (
    <Link to={menu.Shop_Food_Seq}>
      <VStack
        p='16'
        css={{
          width: '100%',
          borderBottom: '1px solid $gray2',
        }}
      >
        <HStack gap='12'>
          <VStack gap='4' css={{ flex: 1.5 }} justifyContent='center'>
            <HStack>
              <Text variant='heading5' wordBreak='keepAll'>
                {menu.Food_Nm}
              </Text>
              {menu.Sold_Out && (
                <Text variant='heading5' ml='4' textColor='error'>
                  품절
                </Text>
              )}
            </HStack>

            <Text variant='paragraph1' wordBreak='keepAll'>
              {
                menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                  .Food_Price
              }{' '}
              원
            </Text>
          </VStack>
          <VStack css={{ flex: 1 }}>
            <Image src={menu.Img_Url} css={{ borderRadius: '$small' }} />
          </VStack>
        </HStack>
      </VStack>
    </Link>
  );
}
