import { HStack } from '@dano-inc/design-system';
import { styled } from '@dano-inc/stitches-react';
import { Button } from '~/components/ui/button';

export interface AppButtonProps {
  originLink: string;
}

export default function AppButton({ originLink }: AppButtonProps) {
  const handleClick = () => {
    window.open(`https://baemin.me/${originLink}`);
  };
  return (
    <HStack
      justifyContent="spaceBetween"
      alignItems="center"
      pos="fixed"
      p="16"
      css={{
        width: '100%',
        bottom: 0,
        maxWidth: '640px',
        background: 'linear-gradient(rgba(255, 255, 255, 0), $white)',
      }}
    >
      <StyledImg src="/images/baemin.png" onClick={handleClick} />
      <Button
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
