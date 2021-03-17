def formatStrNames(str_list)
    arr_out = ""
    length = str_list.length()
    str_list.each_with_index { | value, index |
        if index == 0
            arr_out = value[:name]
        elsif index == (length - 1)
            arr_out = arr_out+ " & " + value[:name]
        else
            arr_out = arr_out+ ", " + value[:name]
        end
    }
    puts arr_out
end

formatStrNames([{name: "Red"},{name: "Bert"}, {name: "Alex"}])
formatStrNames([{name: "Red"},{name: "Bert"}])
formatStrNames([{name: "Red"}])