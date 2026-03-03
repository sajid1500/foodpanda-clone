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
      };
    };
  }
>;
