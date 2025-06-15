import { useRef, useState } from 'react';
import { Camera } from '@rnmapbox/maps';
import { getDistance } from '@/utils/geo';

export function useMapNavigation(userLocation: [number, number] | null) {
  const cameraRef = useRef<Camera>(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isAtUserLocation, setIsAtUserLocation] = useState(true);
  const [centerPinLocation, setCenterPinLocation] = useState<
    [number, number] | null
  >(null);

  const moveToUser = () => {
    if (userLocation && cameraRef.current) {
      cameraRef.current.flyTo(userLocation, 1000);
    }
  };

  const onUserLocationUpdate = (e: any) => {
    const coords = e.geometry?.coordinates;
    if (!coords) return;
    const center = [coords[0], coords[1]] as [number, number];

    setCenterPinLocation(center);

    if (isFollowing && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: center,
        zoomLevel: 14,
        animationDuration: 0
      });
    }
  };

  const onRegionIsChanging = (e: any) => {
    if (!userLocation) return;

    const coords = e.properties.center; // e.geometry?.coordinates;
    if (!coords) return;

    const center = [coords[0], coords[1]] as [number, number];
    const distance = getDistance(center, userLocation);
    const threshold = 50;

    const isNearUser = distance < threshold;
    setIsAtUserLocation(isNearUser);
  };

  const handleRegionChange = (e: any) => {
    if (!userLocation) return;

    const coords = e.geometry?.coordinates;
    if (!coords) return;

    const center = [coords[0], coords[1]] as [number, number];

    const distance = getDistance(center, userLocation);
    const threshold = 100; // meters

    const isNearUser = distance < threshold;

    setIsAtUserLocation(isNearUser);

    // Disable follow if map is moved
    if (!isNearUser && isFollowing) {
      setIsFollowing(false);
    }
  };

  return {
    cameraRef,
    isFollowing,
    isAtUserLocation,
    moveToUser,
    centerPinLocation,
    handleRegionChange,
    onRegionIsChanging,
    onUserLocationUpdate
  };
}
