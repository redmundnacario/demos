
def disemvowel(string)
    string.chars.map {|char| "aeiouAEIOU".include?(char) ? nil : char }.join
end

def disemboweled_trolls(str)
    puts str.tr 'aeiouAEIOU',''
end

def disemvowel(string)
    vowels = "aeiouAEIOU"
    return (string.chars - vowels.chars).join
end


puts disemvowel("This website is for losers LOL!")

disemboweled_trolls("troll comment jibberish!!! ")

# My solution
def disemvowel2(str_input)
    vowels = "aeiouAEIOU"
    arr = str_input.split("")
    arr2 = []
    arr.each { | value | 
        if (vowels.include? value) == false
            arr2.append(value)
        end
    }
    puts arr2.join('')
end

str_ = "redmund nacario"

disemvowel2(str_)
