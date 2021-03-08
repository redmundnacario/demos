# Given a string s consisting of small English letters, find and return the first instance of a non-repeating character in it. If there is no such character, return '_'.
# Example
# For s = "abacabad", the output should be
# firstNotRepeatingCharacter(s) = 'c'.
# There are 2 non-repeating characters in the string: 'c' and 'd'. Return c since it appears in the string first.
# For s = "abacabaabacaba", the output should be
# firstNotRepeatingCharacter(s) = '_'.
# There are no characters in this string that do not repeat.
# Input/Output
# [input] string s
# A string that contains only lowercase English letters.
# Guaranteed constraints:
# 1 ≤ s.length ≤ 105.
# [output] char
# The first non-repeating character in s, or '_' if there are no characters that do not repeat


def find_non_repeating(str_input)
    arr = str_input.split("")
    arr.uniq.each{|value|
        indices = arr.each_index.select{ | i | arr[i] == value }
        if indices.length == 1
            return value
        end
    }
    return "_"
end

def first_not_repeating_character(string)
    string.each_char do |char|
        return char if string.downcase.count(char.downcase) < 2
    end
    return "_"
end

a = "abacabad"
b = "abacabaabacaba"
puts find_non_repeating(a)
puts find_non_repeating(b)