import { Button } from '~/components/ui/button';

export interface AppButtonProps {
  originLink: string;
}

export default function AppButton({ originLink }: AppButtonProps) {
  const handleClick = () => {
    window.open(`https://baemin.me/${originLink}`);
  };
  return (
    <div className="h-stack justify-between items-center fixed p-4 w-full bottom-0 max-w-2xl bg-gradient-to-b from-white/0 to-white">
      <img
        className="rounded-lg w-16 cursor-pointer"
        src="/images/baemin.png"
        onClick={handleClick}
      />
      <Button
        onClick={handleClick}
      >
        앱에서 보기
      </Button>
    </div>
  );
}
