import {
  Box,
  HDivider,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@dano-inc/design-system';
import { LineIconArrowLeft } from '@dano-inc/react-icons';
import { useNavigate, useParams } from 'remix';
import ShareButton from '~/features/common/components/ShareButton';
import { formatPrice } from '~/features/common/internals/formatPrice';
import { SingleMenuData } from '~/getMenu';

export interface MenuOptionProps {
  option: SingleMenuData;
  url: string;
}

export default function MenuOption({ option, url }: MenuOptionProps) {
  const navigate = useNavigate();
  const { originLink, detail } = useParams();

  const handleArrowClick = () => {
    if (detail === 'rec') {
      navigate(`/${originLink}`);
    } else {
      navigate(`/${originLink}/${detail}`);
    }
  };

  return (
    <VStack gap="16">
      <HStack pos="relative" css={{ width: '100%' }}>
        <IconButton
          pos="absolute"
          css={{ top: 0, left: 0 }}
          onClick={handleArrowClick}
        >
          <LineIconArrowLeft />
        </IconButton>
        <VStack alignItems="center">
          <Text
            variant="heading3"
            css={{
              '@small': {
                maxWidth: '200px',
              },
              '@medium': {
                maxWidth: '300px',
              },
            }}
            textAlign="center"
            wordBreak="keepAll"
            textColor="gray7"
          >
            {option.Food_Nm}
          </Text>
        </VStack>
        <ShareButton url={url} />
      </HStack>
      <VStack gap="12" css={{ flex: 1.5 }} px="16">
        <HStack justifyContent="center">
          <Text
            variant="paragraph4"
            wordBreak="keepAll"
            textAlign="center"
          >
            {option.Food_Cont}
          </Text>
        </HStack>
        {option.List_Shop_Food_Price_Grp.map((price, index) => (
          <Box key={`price-${index}-${price.Shop_Food_Seq}`}>
            {price.Def_Price_Yn === 'Y'
              ? (
                <VStack>
                  <HStack py="8" justifyContent="spaceBetween">
                    <Text
                      variant="heading6"
                      wordBreak="keepAll"
                      textColor="gray7"
                    >
                      {price.Shop_Food_Price_Grp_Nm}
                    </Text>
                    <Text
                      variant="paragraph1"
                      wordBreak="keepAll"
                      textColor="gray7"
                    >
                      {`${
                        formatPrice(
                          parseInt(
                            price.List_Shop_Food_Price[0].Food_Price,
                            10,
                          ),
                        )
                      } 원`}
                    </Text>
                  </HStack>
                  <HDivider />
                </VStack>
              )
              : (
                <VStack gap="10">
                  <HStack pt="10" alignItems="center">
                    <Text
                      variant="heading6"
                      wordBreak="keepAll"
                      mr="6"
                      textColor="gray7"
                    >
                      {price.Shop_Food_Price_Grp_Nm}
                    </Text>
                    {Number(price.Min_Sel) > 0 && (
                      <Text
                        variant="small"
                        mr="4"
                        textColor="error"
                      >
                        {`필수 ${price.Min_Sel}개`}
                      </Text>
                    )}
                    {Number(price.Min_Sel) !== Number(price.Max_Sel) && (
                      <Text variant="small">{`최대 ${price.Max_Sel}개`}</Text>
                    )}
                  </HStack>
                  <VStack gap="4" css={{ flex: 2 }}>
                    {price.List_Shop_Food_Price.map(subPrice => (
                      <VStack key={subPrice.Shop_Food_Price_Seq}>
                        <HStack py="8">
                          <HStack css={{ flex: 1 }} alignItems="center">
                            <Text
                              variant="paragraph2"
                              wordBreak="keepAll"
                              textColor="gray6"
                            >
                              {subPrice.Food_Price_Nm}
                            </Text>
                            {subPrice.Sold_Out && (
                              <Text
                                variant="paragraph4"
                                textColor="error"
                                ml={price.Def_Price_Yn === 'N'
                                  ? '8'
                                  : undefined}
                              >
                                품절
                              </Text>
                            )}
                          </HStack>
                          <Text
                            variant="paragraph2"
                            wordBreak="keepAll"
                            textColor="gray6"
                          >
                            {`+ ${
                              formatPrice(
                                parseInt(subPrice.Food_Price, 10),
                              )
                            } 원`}
                          </Text>
                        </HStack>
                        <HDivider />
                      </VStack>
                    ))}
                  </VStack>
                </VStack>
              )}
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
