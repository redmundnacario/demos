-- Get the counts film per store where the film_rate is less than 3 value/amount

select count(inventory_id)
from (
	select * 
	from inventory as i
	inner join film as f 
	on i.film_id  = f.film_id) as res
where res.rental_rate < 3
group by res.store_id;

-- count
-- 1, 1516
-- 2, 1560