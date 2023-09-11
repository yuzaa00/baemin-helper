import { HStack, Text, VStack } from '@dano-inc/design-system';
import { LineIconArrowRight } from '@dano-inc/react-icons';
import { LineIconError } from '@dano-inc/react-icons';
import { styled } from '@dano-inc/stitches-react';
import { Link } from '@remix-run/react';
import { formatPrice } from '~/features/common/internals/formatPrice';
import { SingleMenuData } from '~/getMenu';

export interface MenuProps {
  menu: SingleMenuData;
  isRec?: boolean;
}

export default function Menu({ menu, isRec }: MenuProps) {
  return (
    <VStack css={{ width: '100%' }}>
      <Link
        to={isRec
          ? `rec/${menu.Shop_Food_Seq}`
          : `${menu.Shop_Food_Seq}`}
      >
        <VStack
          p="10"
          css={{
            width: '100%',
            borderBottom: '1px solid $gray2',
            cursor: 'pointer',
          }}
        >
          <HStack gap="12" alignItems="center">
            {/** 이미지 */}
            {menu.Img_Url && (
              <VStack
                css={{ flex: 0.8, alignSelf: 'flex-start', minWidth: 0 }}
              >
                <StyledImg
                  src={menu.Img_Url}
                />
              </VStack>
            )}
            <VStack
              gap="4"
              css={{ flex: 1.5, minWidth: 0 }}
              justifyContent="center"
            >
              {/** 메뉴명 */}
              <Text variant="heading6" wordBreak="keepAll" textColor="gray7">
                {menu.Food_Nm}
              </Text>
              {/** 품절 여부 */}
              {menu.Sold_Out && (
                <HStack gap="4" alignItems="center">
                  <LineIconError color="#f04838" fontSize="12" />
                  <Text variant="small" textColor="error">
                    품절되었어요
                  </Text>
                </HStack>
              )}
              {/** 메뉴 설명 */}
              {menu.Food_Cont && (
                <Text
                  variant="paragraph3"
                  wordBreak="keepAll"
                  textColor="gray4"
                  css={{
                    whiteSpace: 'break-spaces',
                    visibility: 'visible',
                    wordBreak: 'break-all',
                    maxHeight: '45px',
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
                  && !isRec && (
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
              {/** 대표, 1인분 태그 정보 */}
              <HStack gap="4">
                {menu.Solo && (
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
                    1인분
                  </Text>
                )}
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
              </HStack>
            </VStack>
            <VStack css={{ flex: 0.1, minWidth: 0 }}>
              <LineIconArrowRight />
            </VStack>
          </HStack>
        </VStack>
      </Link>
    </VStack>
  );
}

const StyledImg = styled('img', {
  borderRadius: '$small',
  display: 'flex',
  width: '100%',
});
