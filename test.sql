create or replace function public.place_order(
  p_restaurant_id uuid,
  p_delivery_address jsonb,
  p_restaurant_address jsonb,
  p_items jsonb,
  p_stripe_payment_id text,
  p_delivery_fee numeric default 33,
  p_payment_method text default 'stripe'
)
returns table (
  order_id uuid,
  total numeric,
  subtotal numeric,
  delivery_fee numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_order_id uuid;
  v_total numeric;
  v_subtotal numeric;
  v_requested_count integer;
  v_priced_count integer;
begin
  if v_user_id is null then
    raise exception 'User not authenticated';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'At least one order item is required';
  end if;

  with requested_items as (
    select *
    from jsonb_to_recordset(p_items) as item(
      menu_item_id uuid,
      quantity integer,
      notes text
    )
  ),
  priced_items as (
    select
      ri.menu_item_id,
      ri.quantity,
      coalesce(ri.notes, '') as notes,
      mi.name,
      mi.price as unit_price
    from requested_items ri
    join public.menu_items mi
      on mi.id = ri.menu_item_id
     and mi.restaurant_id = p_restaurant_id
     and mi.is_available = true
    where ri.quantity > 0
  )
  select
    (select count(*) from requested_items),
    (select count(*) from priced_items),
    coalesce(sum(quantity * unit_price), 0)
  into v_requested_count, v_priced_count, v_subtotal
  from priced_items;

  if v_requested_count <> v_priced_count then
    raise exception 'One or more items are invalid, unavailable, or do not belong to the restaurant';
  end if;

  insert into public.orders (
    restaurant_id,
    user_id,
    delivery_address,
    restaurant_address,
    delivery_fee,
    subtotal,
    total,
    status
  )
  values (
    p_restaurant_id,
    v_user_id,
    p_delivery_address,
    p_restaurant_address,
    p_delivery_fee,
    v_subtotal,
    v_subtotal + p_delivery_fee,
    'pending'
  )
  returning id, total into v_order_id, v_total;

  with requested_items as (
    select *
    from jsonb_to_recordset(p_items) as item(
      menu_item_id uuid,
      quantity integer,
      notes text
    )
  ),
  priced_items as (
    select
      ri.menu_item_id,
      ri.quantity,
      coalesce(ri.notes, '') as notes,
      mi.name,
      mi.price as unit_price
    from requested_items ri
    join public.menu_items mi
      on mi.id = ri.menu_item_id
     and mi.restaurant_id = p_restaurant_id
     and mi.is_available = true
    where ri.quantity > 0
  )
  insert into public.order_items (
    order_id,
    menu_item_id,
    quantity,
    name,
    unit_price,
    notes
  )
  select
    v_order_id,
    menu_item_id,
    quantity,
    name,
    unit_price,
    notes
  from priced_items;

  insert into public.payments (
    order_id,
    payment_method,
    amount,
    status,
    stripe_payment_id
  )
  values (
    v_order_id,
    p_payment_method,
    v_total,
    'pending',
    p_stripe_payment_id
  );

  return query
  select v_order_id, v_total, v_subtotal, p_delivery_fee;
end;
$$;