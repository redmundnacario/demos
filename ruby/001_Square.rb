
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
            if number == item * item
                puts "#{number} => true"
                return
            end
        }
        puts "#{number} => false"
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


number2 = Number.new(-1)
number2.isSquare

number3 = Number.new(0)
number3.isSquare

number4 = Number.new(3)
number4.isSquare

number4 = Number.new(4)
number4.isSquare

number5 = Number.new(25)
number5.isSquare

number6 = Number.new(26)
number6.isSquare