# Activity:
# 1. Create a dictionary (hash) with 10 city names, where the city name (key) will be a string, and the area code would be the value.
# 2. Display the city names to the user for cities which are available in the dictionary
# 3. Get input from the user on the city name
# 4. Display area code based on user's city choice
# 5. Loop - keep the program running and prompt the user for new city names to lookup
# 6. Complete the two methods to lookup city names and to find area code based on city names
# #Starter template:
# dial_book = {
#   "newyork" => "212",
#   "newbrunswick" => "732",
#   "edison" => "908",
#   "plainsboro" => "609",
#   "sanfrancisco" => "301",
#   "miami" => "305",
#   "paloalto" => "650",
#   "evanston" => "847",
#   "orlando" => "407",
#   "lancaster" => "717"
# }
# # Get city names from the hash
# def get_city_names(somehash)
# # Write code here
# end
# # Get area code based on given hash and key
# def get_area_code(somehash, key)
# # Write code here
# end
# # Execution flow
# loop do
# # Write your program execution code here
# end

dial_book = {
  "newyork" => "212",
  "newbrunswick" => "732",
  "edison" => "908",
  "plainsboro" => "609",
  "sanfrancisco" => "301",
  "miami" => "305",
  "paloalto" => "650",
  "evanston" => "847",
  "orlando" => "407",
  "lancaster" => "717"
}

def get_city_names(cities)
    cities.each_with_index{ | (city , code), index|
        puts "#{index + 1}. #{city}"
    }
end

# Get area code based on given hash and key
def get_area_code(cities, city_name)
    puts "#{city_name}'s area code is #{cities[city_name.to_s]}"
end
# Execution flow
loop do
    puts "Choose your city from below! Just enter the correct city name."
    get_city_names(dial_book)
    city_name = gets.chomp.to_s
    get_area_code(dial_book, city_name)

    puts "Do you want to quit? Y or N"
    res = gets.chomp.to_s
    if res == "Y" or res == "y"
        break
    end
end

