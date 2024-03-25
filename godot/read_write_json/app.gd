extends Node2D

func _ready() -> void:
	print('Ocloocks')
	# Change time color
	var colors_json = read_json_file("res://colors.json")
	$ClockTime.add_theme_color_override("font_color", colors_json.clock_color)
	# Write current time in JSON file
	write_json("res://save_data.json", {"time" : current_time_str()})
	
func _process(delta: float) -> void:
	update_time()

func current_time_str():
	var time_obj = Time.get_time_dict_from_system()
	var hour_clock = time_obj.hour
	var minute_cluck = time_obj.minute
	var second_clock = time_obj.second
	var time_text =  "%02d:%02d:%02d" % [hour_clock,minute_cluck,second_clock]	
	
	return	time_text
	
func update_time() -> void:
	$ClockTime.text = current_time_str()
	
func read_json_file(json_file_path):
	var file = FileAccess.open(json_file_path, FileAccess.READ)
	var content = file.get_as_text()
	var finish = JSON.parse_string(content)
	return finish
		
func write_json(json_file_path, data):
	print('save json')
	var json_data = JSON.stringify(data,"\t") # “\t” prettify json
	var file_access = FileAccess.open(json_file_path, FileAccess.WRITE)
	file_access.store_line(json_data)
	file_access.close()
	
	
