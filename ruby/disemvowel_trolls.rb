

def disemvowel2(str_input)
    vowels = "aeiouAEIOU"
    arr = str_input.split("")
    arr2 = []
    arr.each.select{ | value | 
        if (vowels.include? value) == false
            arr2.append(value)
        end
    }
    puts arr2.join('')
end

str_ = "redmund nacario"

disemvowel2(str_)
