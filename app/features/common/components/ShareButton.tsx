import { IconButton } from '@dano-inc/design-system';
import { LineIconShare } from '@dano-inc/react-icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from '@dano-inc/design-system';

export interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const handleCopy = () => {
    toast.show('링크가 복사되었습니다!');
  };
  return (
    <CopyToClipboard text={url} onCopy={handleCopy}>
      <IconButton pos='absolute' css={{ top: 0, right: 0 }}>
        <LineIconShare />
      </IconButton>
    </CopyToClipboard>
  );
}
