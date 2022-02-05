import { HStack, Image, Text, VStack } from '@dano-inc/design-system';
import { LineIconArrowRight } from '@dano-inc/react-icons';
import { Link } from 'remix';
import { formatPrice } from '~/features/common/internals/formatPrice';
import { SingleMenuData } from '~/getMenu';

export interface MenuProps {
  menu: SingleMenuData;
  isRecommended?: boolean;
}

export default function Menu({ menu, isRecommended }: MenuProps) {
  const params = new URLSearchParams();
  params.set('option', menu.Shop_Food_Seq);
  isRecommended && params.set('isRecommended', 'true');

  return (
    <Link to={`${menu.Shop_Food_Grp_Seq}/?${params}`}>
      <VStack
        p="16"
        css={{
          width: '100%',
          borderBottom: '1px solid $gray2',
          cursor: 'pointer',
        }}
      >
        <HStack gap="12" alignItems="center">
          {/** 이미지 */}
          {menu.Img_Url && (
            <VStack css={{ flex: 0.8 }}>
              <Image src={menu.Img_Url} css={{ borderRadius: '$small' }} />
            </VStack>
          )}
          <VStack gap="4" css={{ flex: 1.5 }} justifyContent="center">
            {/** 메뉴명 */}
            <HStack>
              <Text variant="heading5" wordBreak="keepAll" textColor="gray7">
                {menu.Food_Nm}
              </Text>
              {/** TODO : 품절인 경우 클릭 불가 */}
              {menu.Sold_Out && (
                <Text variant="heading5" ml="4" textColor="error">
                  품절
                </Text>
              )}
            </HStack>
            {/** 메뉴 설명 */}
            {menu.Food_Cont && (
              <Text
                variant="paragraph2"
                wordBreak="keepAll"
                textColor="gray4"
                css={{
                  height: '45px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  '-webkit-line-clamp': 2,
                  '-webkit-box-orient': 'vertical',
                }}
              >
                {menu.Food_Cont}
              </Text>
            )}
            {/** 가격 정보 */}
            <HStack>
              {menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                .Food_Price_Nm
                && !isRecommended && (
                <Text variant="paragraph1" wordBreak="keepAll">
                  {menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                    .Food_Price_Nm}
                  &nbsp; : &nbsp;
                </Text>
              )}
              <Text variant="paragraph1" wordBreak="keepAll">
                {`${
                  formatPrice(
                    parseInt(
                      menu.List_Shop_Food_Price_Grp[0].List_Shop_Food_Price[0]
                        .Food_Price,
                      10,
                    ),
                  )
                }원`}
              </Text>
            </HStack>
            {menu.representative && (
              <Text
                variant="small"
                css={{
                  background: '#F0EEE9',
                  color: '#A9805B',
                  width: 'fit-content',
                  padding: '2px 5px',
                  borderRadius: '$xsmall',
                }}
                textAlign="center"
              >
                대표
              </Text>
            )}
          </VStack>
          <VStack css={{ flex: 0.1 }}>
            <LineIconArrowRight />
          </VStack>
        </HStack>
      </VStack>
    </Link>
  );
}
