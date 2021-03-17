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

def century(year)
    converted_year = year / 100
    added_year = year % 100 == 0 ? 0 : 1

    converted_year + added_year
end

def centuryFromYear(year)
  return puts (year + 99) / 100
end

puts centuryFromYear(1705)
puts centuryFromYear(1900)
puts centuryFromYear(1601)
puts centuryFromYear(2000)