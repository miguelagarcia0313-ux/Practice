// Run the setup after the HTML document has finished loading.
$(function () {
	let count = 0;

	// Listen for a click event and update the DOM with the new count.
	$('#countButton').on('click', function () {
		count += 1;
		$('#count').text(count);
		$('#countMessage').text(`The event fired ${count} time${count === 1 ? '' : 's'}.`);
	});

	// Add or remove a CSS class to change an element's appearance.
	$('#toggleButton').on('click', function () {
		$('#toggleDemo').toggleClass('is-active');
	});

	// jQuery selectors and methods can change text inside an element.
	$('#jqueryButton').on('click', function () {
		$('#jqueryOutput').text('jQuery selected this element and changed its text.');
	});

	// JSON.parse converts a JSON string into a JavaScript object.
	$('#jsonButton').on('click', function () {
		const jsonString = '{"topic":"JSON","questionCount":8,"ready":true}';
		const practiceData = JSON.parse(jsonString);
		$('#jsonOutput').text(`${practiceData.topic}: ${practiceData.questionCount} questions, ready = ${practiceData.ready}`);
	});

	// fetch makes an asynchronous API request without reloading the page.
	$('#apiButton').on('click', async function () {
		const button = $(this);
		button.prop('disabled', true).text('Loading...');
		$('#apiStatus').text('Request in progress...');

		try {
			// Wait for the server response, then convert the response body from JSON.
			const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const post = await response.json();
			$('#apiResult').html(`<span class="result-label">GET /posts/${post.id} · 200 OK</span><h3>${post.title}</h3><p>${post.body}</p>`);
			$('#apiStatus').text('Response received and rendered.');
		} catch (error) {
			// Handle network errors or unsuccessful HTTP responses.
			$('#apiResult').html('<span class="result-label">Request failed</span><h3>Could not reach the API.</h3><p>Check your connection and try again.</p>');
			$('#apiStatus').text(error.message);
		} finally {
			// Re-enable the button whether the request succeeds or fails.
			button.prop('disabled', false).html('Fetch another post <span>↗</span>');
		}
	});
});
