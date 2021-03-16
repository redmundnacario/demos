def centuryFromYear(year_number)
    str = year_number.to_s
    inner = str[2..3]
    num = inner.to_i
    
    res = year_number * 0.01
      
    if num > 0
        return res.to_i + 1
    else 
        return res.to_i
    end
end

puts centuryFromYear(1705)
puts centuryFromYear(1900)
puts centuryFromYear(1601)
puts centuryFromYear(2000)