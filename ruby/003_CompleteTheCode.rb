# We have Laptop and Phone classes that need battery_level and battery_level= attribute accessor methods, a charge method, a boot method, and a check_cell_signal method. We also have a Computer class that only needs the boot method.
# See if you can create a PortableDevice module with a battery_level, battery_level= ,check_cell_signal, and charge method, and a ComputeDevice module with a boot method. You might want to set a default for battery_level
# Then, mix those modules into the Laptop, Phone, and Computer classes as appropriate. The Laptop and Phone classes should have battery_level, battery_level=, charge, boot, and check_cell_signal methods. The Computer class should have the boot method only.
module PortableDevice
    def charge
        @battery_level += 1
    end

    def check_cell_signal
        puts "Searching cell site..."
    end

    def battery_level
        @battery_level
    end

    def battery_level=(battery_level)
        @battery_level = battery_level
    end

end

module ComputeDevice
    def boot
        puts "Booting device..."
    end
end


class ElectronicDevice
    # attr_accessor :battery_level
    def initialize
      @battery_level = 0
    end
end

  
class Phone < ElectronicDevice
    include PortableDevice
    include ComputeDevice
end
class Laptop < ElectronicDevice
    include PortableDevice
    include ComputeDevice

end
class Computer < ElectronicDevice
    include ComputeDevice

end

iphone = Phone.new()
iphone.charge
puts iphone.battery_level
iphone.battery_level = 100
puts iphone.battery_level
iphone.check_cell_signal
iphone.boot

mac = Laptop.new()
mac.charge
mac.charge
puts mac.battery_level
mac.battery_level = 50
puts mac.battery_level
mac.check_cell_signal
mac.boot

imac = Computer.new()
imac.boot
# puts imac.battery_level