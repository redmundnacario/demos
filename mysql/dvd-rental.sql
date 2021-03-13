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
on i.inventory_id = r.inventory_id;


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
or (first_name = 'Dan' and last_name = 'Streep')
order by title asc


-- Problem 2

select 
	concat(a.first_name, ' ', a.last_name) as fullname,
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
and c.name = 'Comedy'
order by fullname asc


-- Problem 3


-- sir den solution in problem 3
SELECT CONCAT(sf.first_name, ' ', sf.last_name) staff_full_name, count(cc.country_id) customer_count
FROM staff sf
LEFT JOIN store sr ON sf.store_id = sr.store_id
LEFT JOIN address a ON a.address_id = sr.address_id
LEFT JOIN city ON city.city_id = a.city_id
LEFT JOIN country ON country.country_id = city.country_id
LEFT JOIN (SELECT country.country_id
			FROM customer c
			LEFT JOIN address a ON a.address_id = c.address_id
			LEFT JOIN city ON city.city_id = a.city_id
			LEFT JOIN country ON country.country_id = city.country_id) cc ON cc.country_id = country.country_id
GROUP BY CONCAT(sf.first_name, ' ', sf.last_name)

-- my solution in problem 3
select 
	staff_name as staff_full_name,
	count(customer_id) as customer_count
from (

	select 
		customer_id,
		c3.country_id
	from customer as c
	left join address as a
	on c.address_id = a.address_id 
	left join city as c2
	on a.city_id = c2.city_id
	left join country as c3
	on c2.country_id = c3.country_id
	
	) as customer_summary
right join (

	select 
		concat(first_name, ' ', last_name) as staff_name,
		c2.country_id
	from staff as s
	left join address as a
	on s.address_id = a.address_id 
	left join city as c2
	on a.city_id = c2.city_id
	left join country as c3
	on c2.country_id = c3.country_id
	
	) as staff_summary
on customer_summary.country_id = staff_summary.country_id
group by staff_name


-- 4. Find the most popular film category per store (determined by the number of rentals)
-- Column => store_id, film_count, category_name
-- Answer => 2 rows

select distinct on (rr.store_id)
	last_value (rr.store_id) over wnd as store_id,
	last_value (rr.film_count) over wnd as film_count,
	last_value (rr.category_name) over wnd as category_name
from (
	select
		s.store_id as store_id, 
		count(r.rental_id) as film_count,
		c.name as category_name
	from category as c 
	left join film_category as fc on c.category_id = fc.category_id 
	left join film as f on f.film_id = fc.film_id 
	left join inventory as i on i.film_id = f.film_id 
	left join rental as r on r.inventory_id = i.inventory_id
	left join staff as s on s.staff_id = r.staff_id
	where s.store_id is not null 
	group by c.name, s.store_id
	) as rr
window wnd as (
	partition by rr.store_id order by film_count asc
	ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
)
-- source : https://stackoverflow.com/questions/586781/postgresql-fetch-the-row-which-has-the-max-value-for-a-column

select
	store_id,
	film_count,
	category_name
from (
	select
		s.store_id as store_id, 
		count(r.rental_id) as film_count,
		c.name as category_name,
		rank() over (
			partition by s.store_id 
			order by count(r.rental_id) desc
		) as category_rank
	from category as c 
	left join film_category as fc on c.category_id = fc.category_id 
	left join film as f on f.film_id = fc.film_id 
	left join inventory as i on i.film_id = f.film_id 
	left join rental as r on r.inventory_id = i.inventory_id
	left join staff as s on s.staff_id = r.staff_id
	where s.store_id is not null 
	group by c.name, s.store_id
	) as res
where category_rank = 1;

-- 5. Rank the top 5 actors per country (determined by the number rentals) sort by most popular to least popular
-- Column => country, actor_full_name, actor_rank, rent_count
-- Answer => 10 rows

select
	country,
	actor_full_name,
	actor_rank,
	rent_count
from (
	select
		country,
		concat(act.first_name, ' ', act.last_name) as actor_full_name,
		count(r.rental_id) as rent_count,
		ROW_NUMBER() over (PARTITION BY country ORDER BY count(r.rental_id) desc) as actor_rank,
		rank() over (
			PARTITION BY country 
			ORDER BY count(r.rental_id) desc
			) as actor_rank2
	from actor as act
	left join film_actor as fa on act.actor_id = fa.actor_id 
	left join film as f on fa.film_id = f.film_id
	left join inventory as i on i.film_id = f.film_id 
	left join rental as r on i.inventory_id = r.inventory_id
	left join staff as s on s.staff_id = r.staff_id 
	left join address as a on s.address_id = a.address_id 
	left join city as c2 on a.city_id = c2.city_id
	left join country as c3 on c2.country_id = c3.country_id
	group by 
		actor_full_name,
		country
	order by
		rent_count desc
	) as res 
where actor_rank <= 5 and country is not null
order by 
	country asc,
	actor_rank asc