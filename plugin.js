$.get("https://moodle.iitd.ac.in/user/profile.php?showallcourses=1", function(data) {
	const profile_page = $($.parseHTML(data));
	
	const tmp = profile_page.find("#region-main").find(".profile_tree").children().eq(1).find(".contentnode").find("ul").find("li").find("a");
	// in case someone finds a nicer way of getting this list, pray tell

	courses = []
	$.each(tmp, function(i, x) {
		const course_object = $(x);

		const course_details = course_object.text();
		const space_idx = course_details.indexOf(' ');
		const code = course_details.substr(0, space_idx);
		const name = course_details.substr(space_idx + 1);

		const course_url = course_object.attr("href");
		const course_number = new URLSearchParams(course_url).get('course');
		courses[i] = { 
			"code" : code,
			"name" : name,
			"id" : course_number
		}
	});

	// courses.sort(); // the courses are sorted in ascending order by default
	courses.reverse();

	var lbl_prefix = "label_3_";
	var lbl_start = 11;
	var url_prefix = "https://moodle.iitd.ac.in/course/view.php?id="
	
	var lbl_index = lbl_start;
	for (const course in courses) {
		var lbl = document.getElementById(lbl_prefix+lbl_index);
		if (!lbl) break;
		lbl.setAttribute("title", courses[course].name);
		lbl.innerHTML = courses[course].code;
		lbl.setAttribute("href", url_prefix+courses[course].id);
		lbl_index++;
	}
});