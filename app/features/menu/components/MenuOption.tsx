import { HStack, VStack, Text, Image, HDivider } from '@dano-inc/design-system';
import { SingleMenuData } from '~/getMenu';

export interface MenuProps {
  menu: SingleMenuData;
}

export default function Menu({ menu }: MenuProps) {
  return (
    <VStack
      p='20'
      mt='20'
      gap='20'
      css={{ borderRadius: '$small' }}
      bgColor='gray1'
    >
      <HStack gap='20'>
        <VStack gap='12' css={{ flex: 1.5 }}>
          <HStack>
            <Text variant='heading5'>{menu.Food_Nm}</Text>
            {menu.Sold_Out && (
              <Text variant='heading5' ml='4' textColor='error'>
                품절
              </Text>
            )}
          </HStack>
          <Text variant='paragraph4' wordBreak='keepAll'>
            {menu.Food_Cont}
          </Text>
          {/** 옵션별 금액 */}
          {menu.List_Shop_Food_Price_Grp.map((price, index) => (
            <>
              <HStack key={`price-${index}-${price.Shop_Food_Seq}`}>
                <VStack css={{ flex: 0.5 }} mr='12'>
                  <Text variant='heading6' wordBreak='keepAll'>
                    {price.Shop_Food_Price_Grp_Nm}
                  </Text>
                  {price.Def_Price_Yn === 'N' && (
                    <VStack>
                      <Text variant='small'>{`최소 ${price.Min_Sel}개`}</Text>
                      <Text variant='small'>{`최대 ${price.Max_Sel}개`}</Text>
                    </VStack>
                  )}
                </VStack>
                <VStack gap='4' css={{ flex: 2 }}>
                  {price.List_Shop_Food_Price.map(subPrice => (
                    <HStack key={subPrice.Shop_Food_Price_Seq}>
                      <HStack css={{ flex: 1 }}>
                        <Text variant='paragraph1' wordBreak='keepAll'>
                          {subPrice.Food_Price_Nm}
                        </Text>
                        {subPrice.Sold_Out && (
                          <Text
                            variant='paragraph1'
                            textColor='error'
                            ml={price.Def_Price_Yn === 'N' ? '8' : undefined}
                          >
                            품절
                          </Text>
                        )}
                      </HStack>
                      <Text variant='paragraph1' wordBreak='keepAll'>
                        {price.Def_Price_Yn === 'N' && '+ '}
                        {subPrice.Food_Price}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </HStack>
              {index !== menu.List_Shop_Food_Price_Grp.length - 1 && (
                <HDivider />
              )}
            </>
          ))}
        </VStack>
        <VStack css={{ flex: 1 }}>
          <Image src={menu.Img_Url} css={{ borderRadius: '$small' }} />
        </VStack>
      </HStack>
    </VStack>
  );
}
