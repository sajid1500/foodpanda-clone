import { MergeDeep } from "type-fest";
import { Database } from "./database.types";
export type ModdedDatabase = MergeDeep<
  Database,
  {
    public: {
      Views: {
        restaurant_addresses_display: {
          Row: {
            address_line_1: string;
            address_line_2: string;
            city: string;
            created_at: string;
            house: string;
            id: string;
            is_default: boolean;
            label: string;
            latitude: number;
            location: unknown;
            longitude: number;
            note: string;
            place_id: string;
            restaurant_id: string;
            street: string;
          };
        };
        user_addresses_display: {
          Row: {
            address_line_1: string;
            address_line_2: string;
            city: string;
            coordinates: {
              lat: number;
              lng: number;
            };
            created_at: string;
            house: string;
            id: string;
            is_default: boolean;
            label: string;
            location: unknown;
            note: string;
            place_id: string;
            street: string;
            user_id: string;
          };
        };
      };
    };
  }
>;
