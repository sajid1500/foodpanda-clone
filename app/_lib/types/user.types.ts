export interface UserAddress {
  id: string | number;
  placeId: string;
  addressLine1: string;
  city: string;
  addressLine2?: string;
  coords: {
    lat: number;
    lng: number;
  };
}
