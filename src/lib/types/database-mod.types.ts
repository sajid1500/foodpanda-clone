import { MergeDeep } from "type-fest";
import { Database, Json } from "./database.types";
export type ModdedDatabase = MergeDeep<
  Database,
  {
    public: {
      Views: {
        restaurants_display: {
          Row: {
            average_rating: number;
            banner_path: string;
            coordinates: {
              lat: number;
              lng: number;
            };
            created_at: string;
            id: string;
            location: unknown;
            logo_path: string;
            name: string;
            slug: string;
          };
        };
        addresses_display: {
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
