import { Share } from 'lucide-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';

export interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const { toast } = useToast();
  const handleCopy = () => {
    toast({ description: '링크가 복사되었습니다!' });
  };

  return (
    <CopyToClipboard text={`${url}/?utm_source=copy_link`} onCopy={handleCopy}>
      <Button variant="ghost" className="absolute top-0 right-0">
        <Share strokeWidth={1} />
      </Button>
    </CopyToClipboard>
  );
}
