require 'set'


def findUniq(arr)
    arrUniq= Set.new(arr).to_a
    # puts arrUniq.count(1)
    result = []
    arrUniq.each { | x |
        result.append(x) if arr.count(x) == 1
    }
    return result
end

arr1 = [1,1,1,2,1,1]
arr2 = [0,0, 0.5, 0, 0]
arr3 = [1,1,2,3,4,4]
# puts arr1.count(1)
print findUniq(arr1)
puts ","
print findUniq(arr2)
puts ","
print findUniq(arr3)