import cn from 'classnames';

// components
import { useUI } from '@components/context';
import { Modal, Notification } from '@components/ui';

export default function CommonLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { modalFlag, modalContent, notiFlag, closeNoti, notiContent } = useUI();

  return (
    <div className="relative h-full w-full">
      <main className={cn(className, 'relative h-full')}>{children}</main>

      <Modal show={modalFlag} {...modalContent} />
      <Notification show={notiFlag} close={closeNoti} {...notiContent} />
    </div>
  );
}
