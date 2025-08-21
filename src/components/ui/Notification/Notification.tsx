import './Notification.scss';

import { useEffect, useState } from 'react';

import type { Alert } from '@/@types';

type NotificationProps = {
  alert: Alert;
};

export default function Notification({ alert }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  const { status, message } = alert;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // setAlert(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return <div className={`alert alert--${status} slide-down`}>{message}</div>;
}
