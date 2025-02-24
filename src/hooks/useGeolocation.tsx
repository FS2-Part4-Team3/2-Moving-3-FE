import { useCallback, useEffect, useState } from 'react';
import { LocationType } from '@/interfaces/Hooks/hookInerface';

export const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const setDefaultLocation = () => {
    const defaultLatitude = 37.579293849225756;
    const defaultLongitude = 126.97798076343491;
    setLocation({ latitude: defaultLatitude, longitude: defaultLongitude });
  };

  const showError = useCallback((error: any) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorMsg('사용자가 위치 정보를 제공하는 것을 거부했습니다.');
        setDefaultLocation();
        break;
      case error.POSITION_UNAVAILABLE:
        setErrorMsg('위치 정보를 사용할 수 없습니다.');
        break;
      case error.TIMEOUT:
        setErrorMsg('위치 정보를 가져오는 요청이 시간 초과되었습니다.');
        break;
      default:
        setErrorMsg('알 수 없는 오류가 발생했습니다.');
        break;
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setErrorMsg('이 브라우저는 위치 서비스를 지원하지 않습니다.');
      return;
    }

    setIsLoading(true);

    geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLoading(false);
      },
      err => showError(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }, [showError]);

  return {
    curLocation: location,
    isLoading,
    errorMsg,
  };
};
