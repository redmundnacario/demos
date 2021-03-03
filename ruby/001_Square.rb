
module GetRange
    def create_range_positive
        (1..number)
    end

    def create_range_negative
        (number..-1)
    end

    def create_range
        if number > 0
            return create_range_positive()
        elsif number < 0
            return create_range_negative()
        else 
            return [0]
        end
    end

    def display_range
        create_range.each {|item| puts item }
    end
end

module Square
    include GetRange

    def isSquare
        create_range.each{|item|
            # puts item
            if item == 0
                puts "false"
                return
            end

            if number == item * item
                puts "true"
                return
            end
        }
        puts "false"
        return
    end
end

class Number
    include Square
    attr_reader :number

    def initialize(number)
        @number = number
    end
end

number1 = Number.new(20)
puts number1.number
number1.isSquare

number2 = Number.new(-1)
puts number2.number
number2.isSquare

number3 = Number.new(0)
puts number3.number
number3.isSquare

number4 = Number.new(4)
puts number4.number
number4.isSquare

number4 = Number.new(9)
puts number4.number
number4.isSquare

number5 = Number.new(-4)
puts number5.number
number5.isSquare