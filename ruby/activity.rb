# Find the smallest integer in the array
# Given an array of integers your solution should find the smallest integer.
# For example:
# Given [34, 15, 88, 2] your solution will return 2
# Given [34, -345, -1, 100] your solution will return -345
# You can assume, for the purpose of this challenge, that the supplied array will not be empty.
# 7:34
# Note: Avoid using .min and .sort method
# rocket

arr1 = [34, 15, 88, 2]
arr2 = [34, -345, -1, 100]


def find_min(arr)
    min = nil
    arr.each_with_index{|x, index|

        if index==0 
            min = x
        else
            if min > x
                min = x    
            end
        end
    }
    return min
end

puts find_min(arr1)
puts find_min(arr2)