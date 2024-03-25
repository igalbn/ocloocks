extends Node2D

func _ready() -> void:

	print('Ocloocks')

func _process(delta: float) -> void:
	
	update_time()
	
func update_time() -> void:

	var time_obj = Time.get_time_dict_from_system()
	var hour_clock = time_obj.hour
	var minute_cluck = time_obj.minute
	var second_clock = time_obj.second
	var time_text =  "%02d:%02d:%02d" % [hour_clock,minute_cluck,second_clock]
	
	$ClockTime.text = str(time_text)
	
