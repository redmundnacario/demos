-- Get the counts film per store where the film_rate is less than 3 value/amount

select count(inventory_id)
from (
	select * 
	from inventory as i
	inner join film as f 
	on i.film_id  = f.film_id) as res
where res.rental_rate < 3
group by res.store_id;

-- solution by sir den

SELECT s.store_id, count(f.rental_rate)
FROM store as s
LEFT JOIN inventory as i ON s.store_id = i.store_id
LEFT JOIN film as f ON f.film_id = i.film_id
WHERE f.rental_rate < 3.00
GROUP BY s.store_id;

-- count
-- 1, 1516
-- 2, 1560