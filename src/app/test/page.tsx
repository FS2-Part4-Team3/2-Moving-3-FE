'use client';

import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export default function SocketTestPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // 소켓 연결
    const newSocket = io('https://backend.moving.wiki', {
      auth: { token: accessToken },
      transports: ['websocket'],
    });

    // 연결 이벤트 핸들러
    newSocket.on('connect', () => {
      console.log('WebSocket 연결 성공');
      newSocket.emit('subscribe');
    });

    // 알림 수신 핸들러
    newSocket.on('notification', (data: any) => {
      console.log('알림 수신:', data);
      setNotifications(prev => [...prev, data]);
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket 연결 종료');
    });

    setSocket(newSocket);

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">소켓 테스트 페이지</h1>
      <div className="border p-4 rounded-lg min-h-[400px]">
        <h2 className="text-xl mb-2">수신된 알림</h2>
        {notifications.map((notification, index) => (
          <div key={index} className="border-b p-2">
            <pre>{JSON.stringify(notification, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
