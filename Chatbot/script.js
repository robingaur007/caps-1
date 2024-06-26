// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input');
const chatboxForm = document.querySelector('.chatbox-message-form');

textarea.addEventListener('input', function () {
	let line = textarea.value.split('\n').length;

	if (textarea.rows < 6 || line < 6) {
		textarea.rows = line;
	}

	if (textarea.rows > 1) {
		chatboxForm.style.alignItems = 'flex-end';
	} else {
		chatboxForm.style.alignItems = 'center';
	}
});

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle');
const chatboxMessage = document.querySelector('.chatbox-message-wrapper');

chatboxToggle.addEventListener('click', function () {
	chatboxMessage.classList.toggle('show');
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle');
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu');

dropdownToggle.addEventListener('click', function () {
	dropdownMenu.classList.toggle('show');
});

// Event delegation for closing dropdown menu
document.addEventListener('click', function (e) {
	if (!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
		dropdownMenu.classList.remove('show');
	}
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content');
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message');

chatboxForm.addEventListener('submit', function (e) {
	e.preventDefault();

	if (isValid(textarea.value)) {
		writeMessage();
		setTimeout(autoReply, 1000);
	}
});

function addZero(num) {
	return num < 10 ? '0' + num : num;
}

function writeMessage() {
	const today = new Date();
	let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`;
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
	chatboxForm.style.alignItems = 'center';
	textarea.rows = 1;
	textarea.focus();
	textarea.value = '';
	chatboxNoMessage.style.display = 'none';
	scrollBottom();
}

function autoReply() {
	const today = new Date();
	let userMessages = document.querySelectorAll('.chatbox-message-item.sent .chatbox-message-item-text');
	let lastUserMessage = userMessages[userMessages.length - 1].innerHTML.replace(/<br>/g, '\n').trim().toLowerCase(); // Convert to lowercase for case insensitive comparison

	let replyMessage;

	if (lastUserMessage === "how are you") {
		replyMessage = "I'm doing well, thanks for asking! How about you?";
	} else if (lastUserMessage === "i am also fine" || lastUserMessage === "fine" || lastUserMessage === "i am fine") {
		replyMessage = "That's great to hear! Is there anything specific you'd like to talk about or any questions on your mind today?";
	} else if (lastUserMessage === "hello","Hi") {
		replyMessage = "Hello! How’s your day going?";
	} else if (lastUserMessage === "what can you do") {
		replyMessage = "I'm here to chat with you, provide information, assist with tasks, and offer entertainment and support.";
	} else if (lastUserMessage === "who created you") {
		replyMessage = "I was created by Robin Gaur, a Programmer focused on Frontend Development.";
	} else if (lastUserMessage === "what is your purpose?") {
		replyMessage = "My purpose is to help you by answering questions, providing information, and assisting with various tasks.";
	} else {
		replyMessage = "Welcome to pragte.! <br>how may I help you";
	}

	let message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
				${replyMessage}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`;
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
	scrollBottom();
}

function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
	let text = value.replace(/\n/g, '');
	text = text.replace(/\s/g, '');

	return text.length > 0;
}