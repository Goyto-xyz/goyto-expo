import { useRef, useState } from 'react';
import { Camera } from '@rnmapbox/maps';

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

function getDistance(
  [lng1, lat1]: [number, number],
  [lng2, lat2]: [number, number]
) {
  const R = 6371e3; // Earth radius in meters
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const deltaP = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) *
      Math.cos(p2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
