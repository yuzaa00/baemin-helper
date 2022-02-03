import { Box, Button, HStack, VStack } from '@dano-inc/design-system';
import { styled } from '@dano-inc/stitches-react';

export interface AppButtonProps {
  originLink: string;
}

export default function AppButton({ originLink }: AppButtonProps) {
  const handleClick = () => {
    window.open(`https://baemin.me/${originLink}`);
  };
  return (
    <HStack
      justifyContent='spaceBetween'
      alignItems='center'
      pos='fixed'
      p='16'
      css={{ width: '100%', bottom: 0, maxWidth: '640px' }}
    >
      <StyledImg src='/images/baemin.png' onClick={handleClick} />
      <Button
        size='large'
        css={{
          width: 'fit-content',
          height: 'fit-content',
          minHeight: 'fit-content',
          padding: '$6 $10 !important',
          background: '#444444',
        }}
        onClick={handleClick}
      >
        앱에서 보기
      </Button>
    </HStack>
  );
}

const StyledImg = styled('img', {
  borderRadius: '$medium',
  width: '60px',
  cursor: 'pointer',
});
