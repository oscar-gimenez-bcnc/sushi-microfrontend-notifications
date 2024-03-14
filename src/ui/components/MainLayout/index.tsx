import { type IMessage } from '@/domain/models/IMessage';
import { useEffect, useState } from 'react';
import { eventEmitterNotification$ } from '@/eventEmitterBus';
import { eventRxJSNotification$ } from '@/eventRxJSBus';

const MainLayout: React.FC = () => {
  const [message, setMessage] = useState<IMessage | undefined>(undefined);

  // CUSTOM EVENT
  useEffect(() => {
    const handleCustomEvent = (e: Event): void => {
      const customEvent = e as CustomEvent<{ text: string }>;
      const myMessage: IMessage = { isOpen: true, content: `It comes from customEvent: ${customEvent.detail.text}` };
      setMessage(myMessage);

      setTimeout(() => {
        setMessage(undefined);
      }, 2000);
    };

    window.addEventListener('albumNotificationCustomEvent', handleCustomEvent);

    return () => {
      window.removeEventListener('albumNotificationCustomEvent', handleCustomEvent);
    };
  }, []);

  // EVENTEMITTER3
  useEffect(() => {
    const handleEventEmitter = (data: any): void => {
      const myMessage: IMessage = { isOpen: true, content: `It comes from eventEmitter: ${data.text}` };
      setMessage(myMessage);
      setTimeout(() => {
        setMessage(undefined);
      }, 2000);
    };

    if (window.eventBus !== undefined) {
      window.eventBus.on('albumNotificationEventEmitter', handleEventEmitter);
    }

    return () => {
      if (window.eventBus !== undefined) {
        window.eventBus.off('albumNotificationEventEmitter', handleEventEmitter);
      }
    };
  }, []);

  // EVENTEMITTER FEDERATED
  useEffect(() => {
    const handleEventEmitterFederated = (data: any): void => {
      const myMessage: IMessage = { isOpen: true, content: `It comes from eventEmitterFederated: ${data.text}` };
      setMessage(myMessage);
      setTimeout(() => {
        setMessage(undefined);
      }, 2000);
    };

    eventEmitterNotification$.on('albumNotificationEventEmitterFederated', handleEventEmitterFederated);

    return () => {
      eventEmitterNotification$.off('albumNotificationEventEmitterFederated', handleEventEmitterFederated);
    };
  }, []);

  // RxJS FEDERATED
  useEffect(() => {
    const subscription = eventRxJSNotification$.subscribe({
      next: (data: any) => {
        const myMessage: IMessage = { isOpen: true, content: `It comes from eventRxJSFederated: ${data.text}` };
        setMessage(myMessage);
        setTimeout(() => {
          setMessage(undefined);
        }, 2000);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (message === undefined) return null;

  return (
    <div className="toast toast-end toast-top">
      <div className="alert alert-info">
        <span>{message?.content}</span>
      </div>
    </div>
  );
};

export default MainLayout;
