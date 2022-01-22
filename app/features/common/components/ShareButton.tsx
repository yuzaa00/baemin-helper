import { IconButton } from '@dano-inc/design-system';
import { LineIconShare } from '@dano-inc/react-icons';
import CopyToClipboard from 'react-copy-to-clipboard';

export interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  return (
    <CopyToClipboard text={url}>
      <IconButton pos='absolute' css={{ top: 0, right: 0 }}>
        <LineIconShare />
      </IconButton>
    </CopyToClipboard>
  );
}
