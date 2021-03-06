# Given an array a that contains only numbers in the range from 1 to a.length, find the first duplicate number for which the second occurrence has the minimal index. In other words, if there are more than 1 duplicated numbers, return the number for which the second occurrence has a smaller index than the second occurrence of the other number does. If there are no such elements, return -1.
# Example
# For a = [2, 1, 3, 5, 3, 2], the output should be firstDuplicate(a) = 3.
# There are 2 duplicates: numbers 2 and 3. The second occurrence of 3 has a smaller index than the second occurrence of 2 does, so the answer is 3.
# For a = [2, 2], the output should be firstDuplicate(a) = 2;
# For a = [2, 4, 3, 5, 1], the output should be firstDuplicate(a) = -1.
# Input/Output
# [input] array.integer a
# Guaranteed constraints:
# 1 ≤ a.length ≤ 105,
# 1 ≤ a[i] ≤ a.length.
# [output] integer
# The element in a that occurs in the array more than once and has the minimal index for its second occurrence. If there are no such elements, return -1.


a = [2, 1, 3, 5, 3, 2]
b = [2, 2]
c = [2, 4, 3, 5, 1]

def find_duplicate_first(arr)
    # duplicates = []
    dup_arr = []
    diff_arr = []
    arr.uniq.each{|value|
        indices = arr.each_index.select{ | i | arr[i] == value }
        if indices.length > 1
            diff = indices[-1] - indices[0]
            dup_arr.append(value)
            diff_arr.append(diff)
        end 
    } 
    # puts "#{value} #{indices} #{indices.length} #{diff} "

    if dup_arr.empty? == true
        return -1
    else
        min_value_index = diff_arr.rindex(diff_arr.min)
        return dup_arr[min_value_index]
        # return minimum diff
    end
end

puts find_duplicate_first(a)
puts find_duplicate_first(b)
puts find_duplicate_first(c)