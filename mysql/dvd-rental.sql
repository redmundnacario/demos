-- -- Database: dvdrental
-- 0. Display the number of unique inventory rented and the total number of inventory rented
-- Column => unique_inventory_rented, total_inventory_rented
-- Answer => 1 row

-- 1. List all the films of Dan Torn and Dan Streep. 
-- Column => film_title, release_year, and rating, and actor_full_name. 
-- Answer => 46 rows

-- 2. List all Comedy films of an actor whose last name starts with 'D'
-- Column => actor_full_name, film_title, category_name
-- Answer => 34 rows

-- 3. Determine the potential number of customers a store staff would serve (same country)
-- Column => staff_full_name, customer_count
-- Answer => 2 rows



-- Problem 0

select 
    count(distinct i.inventory_id) as unique_inventory_rented, 
    count(i.inventory_id) as total_rented
from inventory  as i
left join rental  as r
on i.inventory_id = r.inventory_id
where r.rental_date < r.return_date;


-- Problem 1

select 
	title as film_title, 
	release_year, 
	rating, 
	concat(first_name, ' ', last_name)
from actor as a
left join film_actor as fa
on a.actor_id = fa.actor_id
left join film as f
on fa.film_id  = f.film_id
where (first_name = 'Dan' and last_name = 'Torn') 
or (first_name = 'Dan' and last_name = 'Streep') ;


-- Problem 2


select 
	concat(a.first_name, ' ', a.last_name),
	f.title,
	c.name
from actor as a
left join film_actor as fa
on a.actor_id = fa.actor_id
left join film as f
on fa.film_id  = f.film_id
left join film_category as fc
on fa.film_id  = fc.film_id
left join category as c
on fc.category_id = c.category_id 
where a.last_name ilike 'D%'
and c.name = 'Comedy';