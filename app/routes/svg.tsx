import {
  AspectRatio,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from '@dano-inc/design-system';
import { styled } from '@dano-inc/stitches-react';
import { toSvg } from 'html-to-image';
import { useCallback, useRef } from 'react';

export default function Index() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const handleClick1 = useCallback(() => {
    if (ref1.current === null) {
      return;
    }

    toSvg(ref1.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'test1.svg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref1]);

  const handleClick2 = useCallback(() => {
    if (ref2.current === null) {
      return;
    }

    toSvg(ref2.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'test2.svg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref2]);

  return (
    <HStack justifyContent="center" css={{ margin: '$24 $10 $48' }}>
      <VStack gap="64" alignItems="center">
        <HStack gap="36" alignItems="center">
          <div ref={ref1}>
            <HStack justifyContent="center" alignItems="center" gap="10">
              <AspectRatio br="circle">
                <Image src="https://source.unsplash.com/100x100/?person" />
              </AspectRatio>
              <HStack>
                <Text variant="heading2" textColor="brightOrange">svg</Text>
              </HStack>
            </HStack>
          </div>
          <Button onClick={handleClick1}>
            download
          </Button>
        </HStack>
        <HStack gap="36" alignItems="center">
          <div ref={ref2}>
            <HStack justifyContent="center" alignItems="center" gap="10">
              <VStack>
                {/*dprint-ignore*/}
                <StyledText>
                🌞 Morning   214 commits  ███▌░░░░░░░░░░░░░░░░░  17.0%
                </StyledText>
                {/*dprint-ignore*/}
                <StyledText>
                🌆 Daytime   278 commits  ████▋░░░░░░░░░░░░░░░░  22.1%
                </StyledText>
                {/*dprint-ignore*/}
                <StyledText>
                🌃 Evening   381 commits  ██████▎░░░░░░░░░░░░░░  30.3%
                </StyledText>
                {/*dprint-ignore*/}
                <StyledText>
                🌙 Night     384 commits  ██████▍░░░░░░░░░░░░░░  30.5%
                </StyledText>
              </VStack>
            </HStack>
          </div>
          <Button onClick={handleClick2}>download</Button>
        </HStack>
      </VStack>
    </HStack>
  );
}

const StyledText = styled(Text, {
  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation',
  wordWrap: 'normal',
  whiteSpace: 'pre',
});
