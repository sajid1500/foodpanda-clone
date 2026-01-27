-- create or replace function nearby_restaurants(lat float, long float)
returns table (* public.restaurants.*%TYPE, id public.restaurants.id%TYPE, name public.restaurants.restaurant_name%TYPE, lat float, long float, dist_meters float)
-- set search_path = ''
-- language sql
-- as $$
  select *, extensions.st_y(location::extensions.geometry) as lat, extensions.st_x(location::extensions.geometry/*  */) as lng, extensions.st_distance(location, extensions.st_point(-73.946713, 40.807313)::extensions.geography) as distance
  from public.restaurants
  order by location operator(extensions.<->) extensions.st_point(-73.946713, 40.807313)::extensions.geography;
-- $$;