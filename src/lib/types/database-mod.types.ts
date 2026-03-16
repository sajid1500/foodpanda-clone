import { MergeDeep } from "type-fest";
import { Database, Json } from "./database.types";
export type ModdedDatabase = MergeDeep<
  Database,
  {
    public: {
      Views: {
        restaurants_display: {
          Row: {
            banner_path: string;
            id: string;
            coordinates: {
              lat: number;
              lng: number;
            };
            logo_path: string;
            name: string;
            short_id: string;
          };
        };
        user_addresses_display: {
          Row: {
            id: string;
            user_id: string;
            address_line_1: string;
            address_line_2: string;
            city: string;
            coordinates: {
              lat: number;
              lng: number;
            };
            is_default: boolean;
            label: string;
            location: unknown;
            note: string;
            osm_id: number;
          };
        };
      };
    };
  }
>;
