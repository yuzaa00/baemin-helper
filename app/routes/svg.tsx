import {
  AspectRatio,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from '@dano-inc/design-system';
import { toSvg } from 'html-to-image';
import { useCallback, useRef } from 'react';

export default function Index() {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toSvg(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.svg';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <HStack justifyContent="center" css={{ margin: '$24 $10 $48' }}>
      <VStack gap="20">
        <div ref={ref}>
          <HStack justifyContent="center" alignItems="center" gap="10">
            <AspectRatio br="circle">
              <Image src="https://source.unsplash.com/100x100/?person" />
            </AspectRatio>
            <HStack>
              <Text variant="heading2" textColor="brightOrange">svg</Text>
            </HStack>
          </HStack>
        </div>
        <Button onClick={handleClick}>click</Button>
      </VStack>
    </HStack>
  );
}
